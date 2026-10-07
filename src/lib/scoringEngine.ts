import {
  CandidateProfile,
  CareerReadinessScore,
  LearningRoadmap,
  ResumeImprovementReport,
  SkillGapReport,
  TargetRoleAnalysis,
  WeightedCategoryScore,
} from '../types/career';

export const JOB_FIT_WEIGHTS = [
  { category: 'Technical Skills', weight: 35 },
  { category: 'Relevant Experience', weight: 20 },
  { category: 'Projects', weight: 15 },
  { category: 'Education', weight: 10 },
  { category: 'Tools/Technologies', weight: 10 },
  { category: 'Soft Skills', weight: 5 },
  { category: 'Domain Knowledge', weight: 5 },
] as const;

/**
 * Normalizes and validates a weighted breakdown array so that it strictly
 * follows the transparent 35/20/15/10/10/5/5 heuristic and calculates an exact
 * weighted sum from 0 to 100.
 */
export function computeTransparentJobFitScore(
  rawBreakdown: Partial<WeightedCategoryScore>[]
): {
  overall_fit_score: number;
  weighted_breakdown: WeightedCategoryScore[];
} {
  const normalized: WeightedCategoryScore[] = JOB_FIT_WEIGHTS.map((spec) => {
    const found = rawBreakdown.find(
      (item) =>
        item.category?.toLowerCase().includes(spec.category.toLowerCase().split('/')[0]) ||
        spec.category.toLowerCase().includes(item.category?.toLowerCase() || '___')
    );

    const score = Math.max(0, Math.min(100, Math.round(found?.score ?? 65)));
    const weighted_points = Number(((score * spec.weight) / 100).toFixed(1));

    return {
      category: spec.category,
      weight: spec.weight,
      score,
      weighted_points,
      explanation:
        found?.explanation ||
        `Evaluated against ${spec.category.toLowerCase()} requirements (${spec.weight}% weight).`,
    };
  });

  const total = Math.round(
    normalized.reduce((acc, item) => acc + item.weighted_points, 0)
  );

  return {
    overall_fit_score: Math.max(0, Math.min(100, total)),
    weighted_breakdown: normalized,
  };
}

/**
 * Computes the overall Career Readiness Score (0-100) combining:
 * - Skill readiness (35%)
 * - Portfolio readiness (25%)
 * - Resume readiness (20%)
 * - Interview readiness (20%)
 * Plus dynamic task completion adjustments from the Learning Roadmap.
 */
export function computeCareerReadiness(
  profile: CandidateProfile,
  skillGap: SkillGapReport,
  roadmap: LearningRoadmap,
  resumeReport: ResumeImprovementReport,
  baseOverride?: Partial<CareerReadinessScore>
): CareerReadinessScore {
  const matchedCount = skillGap.skills_already_have.length;
  const gapCount =
    skillGap.skills_to_strengthen.length + skillGap.high_priority_gaps.length;
  const totalSkills = Math.max(1, matchedCount + gapCount);

  // Calculate roadmap completion boost
  const allTasks = roadmap.phases.flatMap((p) => p.tasks);
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const roadmapCompletionRatio =
    allTasks.length > 0 ? completedTasks / allTasks.length : 0;

  const rawSkillScore = Math.min(
    96,
    Math.round((matchedCount / totalSkills) * 88 + 14 + roadmapCompletionRatio * 10)
  );

  const projectCount = profile.projects.length;
  const rawPortfolioScore = Math.min(
    95,
    Math.round(Math.min(projectCount * 28, 70) + (profile.experience.length > 0 ? 15 : 4) + roadmapCompletionRatio * 12)
  );

  const rawResumeScore = Math.min(
    98,
    Math.round((resumeReport.resume_strength_score || 72) + roadmapCompletionRatio * 6)
  );

  const rawInterviewScore = Math.min(
    95,
    Math.round(
      (rawSkillScore * 0.45 + rawPortfolioScore * 0.35 + 15) +
        roadmapCompletionRatio * 12
    )
  );

  const skill_readiness = baseOverride?.skill_readiness ?? rawSkillScore;
  const portfolio_readiness = baseOverride?.portfolio_readiness ?? rawPortfolioScore;
  const resume_readiness = baseOverride?.resume_readiness ?? rawResumeScore;
  const interview_readiness = baseOverride?.interview_readiness ?? rawInterviewScore;

  // Apply live task completion boost on top if user checks off tasks
  const taskBoost = Math.round(roadmapCompletionRatio * 8);

  const overall_score = Math.min(
    99,
    Math.round(
      skill_readiness * 0.35 +
        portfolio_readiness * 0.25 +
        resume_readiness * 0.2 +
        interview_readiness * 0.2 +
        (baseOverride ? taskBoost * 0.5 : 0)
    )
  );

  const dimensions = [
    { name: 'technical skills', val: skill_readiness },
    { name: 'portfolio depth', val: portfolio_readiness },
    { name: 'resume impact & metrics', val: resume_readiness },
    { name: 'interview readiness', val: interview_readiness },
  ];
  const sorted = [...dimensions].sort((a, b) => b.val - a.val);
  const strongest = sorted[0].name;
  const weakest = sorted[sorted.length - 1].name;

  const topStrengthText =
    baseOverride?.top_strength ||
    (profile.technical_skills.slice(0, 2).join(' + ') || 'Core Analytical Foundation');

  const biggestGapText =
    baseOverride?.biggest_skill_gap ||
    (skillGap.high_priority_gaps[0]?.skill || 'Advanced Domain & BI Architecture');

  return {
    overall_score,
    skill_readiness,
    portfolio_readiness,
    resume_readiness,
    interview_readiness,
    explanation:
      baseOverride?.explanation ||
      `Your strongest area is ${strongest} (${sorted[0].val}/100). Your biggest improvement opportunity is ${weakest} (${sorted[sorted.length - 1].val}/100). Note: This index reflects preparation completeness across core competencies and does not represent an objective probability of employment.`,
    top_strength: topStrengthText,
    biggest_skill_gap: biggestGapText,
    recommended_flagship_project:
      baseOverride?.recommended_flagship_project ||
      'Retail Sales Intelligence Platform',
    next_best_action_headline:
      baseOverride?.next_best_action_headline ||
      `Build one end-to-end ${topStrengthText.split('+')[0].trim()} + ${biggestGapText} project with quantified business KPIs.`,
  };
}

/**
 * Helper to compute how many required/important skills are matched vs total
 */
export function computeSkillMatchCounts(
  skillGap: SkillGapReport,
  roleAnalysis: TargetRoleAnalysis
): { matched: number; total: number; gaps: number } {
  const matched = skillGap.skills_already_have.length + Math.ceil(skillGap.skills_to_strengthen.length * 0.5);
  const gaps = skillGap.high_priority_gaps.length + Math.floor(skillGap.skills_to_strengthen.length * 0.5);
  const total = Math.max(matched + gaps, roleAnalysis.competencies.length);
  return {
    matched,
    total,
    gaps: skillGap.high_priority_gaps.length + skillGap.skills_to_strengthen.length,
  };
}
