export type TargetRoleName =
  | 'Data Analyst'
  | 'Data Scientist'
  | 'AI Engineer'
  | 'Machine Learning Engineer'
  | 'AI Product Manager'
  | 'Business Analyst'
  | 'Product Analyst'
  | 'Data Engineer'
  | 'Generative AI Developer'
  | string;

export type StudyHoursOption = '5 hours/week' | '10 hours/week' | '15 hours/week' | '20+ hours/week';

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  outcomes?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface CandidateProfile {
  name: string;
  headline: string;
  education_level: string;
  experience_level: string;
  target_role: TargetRoleName;
  weekly_hours: StudyHoursOption;
  career_goal: string;
  education: EducationItem[];
  technical_skills: string[];
  soft_skills: string[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: string[];
  achievements: string[];
  technologies: string[];
  strengths: string[];
  missing_information: string[];
  raw_resume_text?: string;
  resume_file_name?: string;
}

export type CompetencyImportance = 'Required' | 'Important' | 'Nice to Have';

export type CompetencyCategoryName =
  | 'Programming'
  | 'Data'
  | 'Databases'
  | 'Statistics'
  | 'Machine Learning'
  | 'Generative AI'
  | 'Cloud'
  | 'Visualization'
  | 'Product/business skills'
  | 'Communication'
  | 'Domain knowledge'
  | 'Interview readiness';

export interface RoleCompetencyItem {
  category: CompetencyCategoryName;
  skills: string[];
  importance: CompetencyImportance;
  rationale: string;
}

export interface TargetRoleAnalysis {
  role: string;
  overview: string;
  disclaimer: string;
  competencies: RoleCompetencyItem[];
  radar_benchmarks: {
    axis: string;
    candidate_score: number;
    target_benchmark: number;
  }[];
}

export interface WeightedCategoryScore {
  category: string;
  weight: number; // e.g., 35 for 35%
  score: number; // 0 to 100
  weighted_points: number;
  explanation: string;
}

export interface JobDescriptionAnalysis {
  id: string;
  job_title: string;
  company_name: string;
  raw_text: string;
  analyzed_at: string;
  overall_fit_score: number;
  score_explanation: string;
  weighted_breakdown: WeightedCategoryScore[];
  strong_matches: string[];
  partial_matches: string[];
  skill_gaps: string[];
  missing_requirements: string[];
  extracted_details: {
    required_skills: string[];
    preferred_skills: string[];
    years_of_experience: string;
    education_requirements: string;
    responsibilities: string[];
    technologies: string[];
    soft_skills: string[];
    domain_requirements: string[];
    keywords: string[];
    potential_gaps: string[];
  };
  recommended_preparation: string[];
}

export interface SkillGapDetail {
  skill: string;
  category: string;
  priority: 'High' | 'Medium';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  why_it_matters: string;
  learning_sequence: string[];
  practical_project: string;
  interview_topic: string;
}

export interface SkillGapReport {
  skills_already_have: string[];
  skills_to_strengthen: string[];
  high_priority_gaps: SkillGapDetail[];
  summary_note: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface RoadmapPhase {
  phase_number: number;
  phase_title: string;
  goal: string;
  skills: string[];
  tasks: RoadmapTask[];
  project: string;
  estimated_time: string;
  completion_criteria: string;
}

export interface LearningRoadmap {
  weekly_hours: StudyHoursOption;
  total_estimated_weeks: number;
  phases: RoadmapPhase[];
  thirty_day_sprint: {
    week: string;
    focus: string;
    deliverable: string;
  }[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  business_problem: string;
  difficulty: 'Beginner-Intermediate' | 'Intermediate' | 'Advanced';
  technologies: string[];
  dataset_requirements: string;
  ai_component: string;
  expected_output: string;
  resume_bullet_suggestion: string;
  skills_demonstrated: string[];
  why_recommended: string;
}

export interface ResumeImprovementSuggestion {
  issue: string;
  category: 'Project Descriptions' | 'Measurable Outcomes' | 'Summary' | 'Keywords' | 'Formatting & Clarity';
  why_it_matters: string;
  action_to_take: string;
}

export interface BulletRewriteItem {
  original_context: string;
  improved_bullet: string;
  formula_breakdown: {
    action: string;
    technology: string;
    task: string;
    result: string;
  };
}

export interface ResumeImprovementReport {
  resume_strength_score: number;
  score_rationale: string;
  customized_professional_summary: string;
  problems_detected: string[];
  improvement_suggestions: ResumeImprovementSuggestion[];
  bullet_rewrites: BulletRewriteItem[];
}

export interface InterviewQuestionItem {
  id: string;
  category: 'Technical' | 'Project-Based' | 'Behavioral' | 'HR';
  topic: string;
  question: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced';
  what_interviewer_is_testing: string;
  key_points_to_include: string[];
  example_answer_structure: string;
}

export interface NextBestActionItem {
  priority: number;
  title: string;
  impact_area: string;
  estimated_effort: string;
  why_now: string;
  concrete_step: string;
}

export interface CareerReadinessScore {
  overall_score: number; // 0-100
  skill_readiness: number;
  portfolio_readiness: number;
  resume_readiness: number;
  interview_readiness: number;
  explanation: string;
  top_strength: string;
  biggest_skill_gap: string;
  recommended_flagship_project: string;
  next_best_action_headline: string;
}

export interface AgentLogEntry {
  id: string;
  step: string;
  agent: string;
  status: 'completed' | 'running' | 'pending';
  timestamp: string;
  detail: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggested_followups?: string[];
}

export interface CareerIntelligenceState {
  isDemoMode: boolean;
  hasAnalyzed: boolean;
  profile: CandidateProfile;
  roleAnalysis: TargetRoleAnalysis;
  skillGap: SkillGapReport;
  roadmap: LearningRoadmap;
  projects: ProjectRecommendation[];
  resumeReport: ResumeImprovementReport;
  interviewQuestions: InterviewQuestionItem[];
  jobAnalyses: JobDescriptionAnalysis[];
  activeJobAnalysisId: string;
  readiness: CareerReadinessScore;
  nextBestActions: NextBestActionItem[];
  agentLogs: AgentLogEntry[];
}
