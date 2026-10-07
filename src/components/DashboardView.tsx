import React from 'react';
import {
  ArrowRight,
  Compass,
  FileCheck,
  Layers,
  Briefcase,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CareerIntelligenceState } from '../types/career';
import { SkillRadarChart } from './SkillRadarChart';

interface DashboardViewProps {
  state: CareerIntelligenceState;
  onNavigate: (view: string) => void;
  onOpenNextActionsModal: () => void;
  onAskCopilotQuestion: (question: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onNavigate,
  onOpenNextActionsModal,
  onAskCopilotQuestion,
}) => {
  const { profile, roleAnalysis, skillGap, roadmap, projects, resumeReport, readiness } = state;

  const matchedCount =
    skillGap.skills_already_have.length +
    Math.min(13, profile.technical_skills.length + profile.soft_skills.length);
  const gapCount =
    skillGap.high_priority_gaps.length + skillGap.skills_to_strengthen.length;
  const totalEvaluatedSkills = matchedCount + gapCount;

  const flagshipProject = projects[0] || {
    title: readiness.recommended_flagship_project,
    why_recommended:
      'Demonstrates SQL, data cleaning, dashboarding, and business decision-making aligned with your target role.',
    technologies: ['SQL', 'Python', 'Power BI'],
  };

  const completedRoadmapTasks = roadmap.phases
    .flatMap((p) => p.tasks)
    .filter((t) => t.completed).length;
  const totalRoadmapTasks = Math.max(
    1,
    roadmap.phases.flatMap((p) => p.tasks).length
  );

  return (
    <div className="space-y-6">
      {/* Top Executive Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono font-semibold text-blue-600">
            CAREERPILOT AI · EXECUTIVE INTELLIGENCE
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Your AI-Powered Career Intelligence System
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Candidate: <span className="font-semibold text-slate-800">{profile.name}</span> ·{' '}
            {profile.education_level} · {profile.experience_level}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenNextActionsModal}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What&apos;s My Next Best Action?</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('profile-setup')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Edit Profile / Target Role
          </button>
        </div>
      </div>

      {/* 4 Core Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Career Readiness */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Career Readiness</span>
            <span className="font-mono text-emerald-700 font-medium">Composite Index</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-mono text-3xl font-bold text-slate-900 tabular-nums">
              {readiness.overall_score}
            </span>
            <span className="font-mono text-sm text-slate-400 tabular-nums">/ 100</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${Math.min(100, readiness.overall_score)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Skills · Portfolio · Resume · Interview
          </p>
        </div>

        {/* Card 2: Target Role */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Target Role</span>
            <button
              type="button"
              onClick={() => onNavigate('profile-setup')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Change
            </button>
          </div>
          <div className="mt-3">
            <div className="text-xl font-bold text-slate-900 truncate">
              {profile.target_role}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Study Pace: <span className="font-mono font-semibold">{profile.weekly_hours}</span>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            {roleAnalysis.competencies.length} Competency Categories Mapped
          </p>
        </div>

        {/* Card 3: Skills Matched */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Skills Matched</span>
            <span className="font-mono text-slate-700 font-medium">Verified Profile</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-mono text-3xl font-bold text-slate-900 tabular-nums">
              {matchedCount}
            </span>
            <span className="font-mono text-sm text-slate-400 tabular-nums">
              / {totalEvaluatedSkills}
            </span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{
                width: `${Math.round((matchedCount / Math.max(1, totalEvaluatedSkills)) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Top: {readiness.top_strength}
          </p>
        </div>

        {/* Card 4: Skill Gaps */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Skill Gaps</span>
            <button
              type="button"
              onClick={() => onNavigate('skill-gap')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Inspect →
            </button>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-amber-700 tabular-nums">
              {gapCount}
            </span>
            <span className="text-xs text-slate-500">
              ({skillGap.high_priority_gaps.length} High Priority)
            </span>
          </div>
          <p className="text-xs font-medium text-slate-800 mt-2 truncate">
            Focus: {readiness.biggest_skill_gap}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Smallest high-impact skill set prioritized
          </p>
        </div>
      </div>

      {/* YOUR CAREER SNAPSHOT EXECUTIVE STRIP */}
      <div className="bg-slate-900 text-white rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 space-y-1.5 border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-6">
          <p className="text-xs font-mono text-blue-400">YOUR CAREER SNAPSHOT</p>
          <h2 className="text-lg font-bold tracking-wide">
            {profile.target_role} Readiness: {readiness.overall_score}/100
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {readiness.explanation}
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Top Strength</span>
            <span className="font-semibold text-emerald-400 text-sm mt-1 block">
              {readiness.top_strength}
            </span>
            <span className="text-slate-400 mt-1 block">
              {skillGap.skills_already_have.slice(0, 3).join(' · ')}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block">Biggest Skill Gap</span>
            <span className="font-semibold text-amber-400 text-sm mt-1 block">
              {readiness.biggest_skill_gap}
            </span>
            <span className="text-slate-400 mt-1 block">
              {skillGap.high_priority_gaps
                .slice(0, 2)
                .map((g) => g.skill)
                .join(' · ')}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block">Recommended Project</span>
            <span className="font-semibold text-white text-sm mt-1 block">
              {flagshipProject.title}
            </span>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-blue-400 hover:underline mt-1 inline-block cursor-pointer"
            >
              View Project Spec →
            </button>
          </div>

          <div>
            <span className="text-slate-400 block">Next Best Action</span>
            <span className="font-semibold text-blue-300 text-sm mt-1 block">
              {readiness.next_best_action_headline}
            </span>
            <button
              type="button"
              onClick={onOpenNextActionsModal}
              className="text-white hover:underline mt-1 inline-block font-medium cursor-pointer"
            >
              See Top 3 Actions →
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row: Skill Radar Chart + Career Readiness Sub-Dimensions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Radar Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Competency Radar: Current Profile vs. {profile.target_role}
              </h2>
              <p className="text-xs text-slate-500">
                Multi-axis comparison generated by Target Role Analysis Agent
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('skill-gap')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Full Gap Report →
            </button>
          </div>

          <SkillRadarChart data={roleAnalysis.radar_benchmarks} />
        </div>

        {/* Right: Career Readiness Sub-Dimensions + Resume & Interview Readiness */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Career Readiness Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Transparent 4-pillar index (Not a hiring probability guarantee)
              </p>
            </div>

            <div className="space-y-4 mt-4">
              {[
                {
                  label: 'Skill Readiness',
                  score: readiness.skill_readiness,
                  desc: `${skillGap.skills_already_have.length} core skills verified against ${profile.target_role}`,
                  actionView: 'skill-gap',
                },
                {
                  label: 'Portfolio Readiness',
                  score: readiness.portfolio_readiness,
                  desc: `${profile.projects.length} current projects · Upgrade with commercial KPI depth`,
                  actionView: 'projects',
                },
                {
                  label: 'Resume Readiness',
                  score: resumeReport.resume_strength_score || readiness.resume_readiness,
                  desc: `${resumeReport.problems_detected.length} formatting/outcome improvements identified`,
                  actionView: 'resume-analyzer',
                },
                {
                  label: 'Interview Readiness',
                  score: readiness.interview_readiness,
                  desc: `${state.interviewQuestions.length} role-specific & project drills ready`,
                  actionView: 'interview-prep',
                },
              ].map((dim) => (
                <div key={dim.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigate(dim.actionView)}
                      className="font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {dim.label} →
                    </button>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {dim.score} / 100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        dim.score >= 75
                          ? 'bg-emerald-600'
                          : dim.score >= 60
                          ? 'bg-blue-600'
                          : 'bg-amber-600'
                      }`}
                      style={{ width: `${Math.min(100, dim.score)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-900 block">
                Roadmap Execution Progress
              </span>
              <span className="text-slate-500">
                {completedRoadmapTasks} of {totalRoadmapTasks} milestone tasks completed
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="px-3 py-1.5 font-semibold text-blue-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              Update Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Strong Areas, Needs Improvement & High-Priority Gaps + Flagship Project */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Diagnostic Skill Matrix ({profile.target_role})
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('skill-gap')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              View Learning Sequences →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strong Areas (Verified)</span>
              </div>
              <ul className="space-y-1.5 text-emerald-950">
                {skillGap.skills_already_have.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-600 font-mono">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200/80 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Needs Improvement</span>
              </div>
              <ul className="space-y-1.5 text-amber-950">
                {skillGap.skills_to_strengthen.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-600 font-mono">△</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-900 mb-2.5">
              High Priority Gaps to Close First:
            </div>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
              {skillGap.high_priority_gaps.map((gap, index) => (
                <div
                  key={gap.skill}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-slate-50"
                >
                  <div>
                    <span className="font-mono font-bold text-blue-600 mr-2">
                      0{index + 1}.
                    </span>
                    <span className="font-bold text-slate-900">{gap.skill}</span>
                    <span className="text-slate-500 ml-2">
                      · {gap.category} · {gap.level}
                    </span>
                    <p className="text-slate-600 mt-1">{gap.why_it_matters}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onAskCopilotQuestion(
                        `How should I learn and build a project for ${gap.skill} for my ${profile.target_role} goal?`
                      )
                    }
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
                  >
                    Ask Copilot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Next 30 Days Sprint & Recommended Project */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recommended Flagship Project Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-blue-600">
                RECOMMENDED PORTFOLIO PROJECT
              </span>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                All {projects.length} Projects →
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              &ldquo;{flagshipProject.title}&rdquo;
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Why: </span>
              {flagshipProject.why_recommended}
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Stack: {flagshipProject.technologies.join(' · ')}
            </div>
          </div>

          {/* Next 30 Days Sprint Plan */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Next 30 Days Action Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Calibrated for {roadmap.weekly_hours}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('roadmap')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Full 6-Phase Roadmap →
              </button>
            </div>

            <div className="space-y-3">
              {roadmap.thirty_day_sprint.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-700">
                      {item.week}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {item.focus}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{item.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
