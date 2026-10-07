import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { CandidateProfile, SkillGapReport } from '../types/career';

interface SkillGapViewProps {
  profile: CandidateProfile;
  skillGap: SkillGapReport;
  onNavigate: (view: string) => void;
  onAskCopilot: (question: string) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  profile,
  skillGap,
  onNavigate,
  onAskCopilot,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-600">
            Agent 5 · Skill Gap Intelligence Agent
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Current Profile vs. {profile.target_role} Requirements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {skillGap.summary_note}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Open Personalized Roadmap →
          </button>
        </div>
      </div>

      {/* Top Comparison Row: Skills You Already Have vs. Skills to Strengthen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills You Already Have */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Skills You Already Have ({skillGap.skills_already_have.length})
              </h2>
            </div>
            <span className="text-xs text-emerald-700 font-medium">
              Verified on Resume
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {skillGap.skills_already_have.map((skill, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-emerald-600 font-bold">✓</span>
                  <span className="font-semibold">{skill}</span>
                </div>
                <span className="text-slate-500">Matches {profile.target_role} Core</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Strengthen */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                Skills to Strengthen ({skillGap.skills_to_strengthen.length})
              </h2>
            </div>
            <span className="text-xs text-amber-700 font-medium">
              Foundational → Production Depth
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {skillGap.skills_to_strengthen.map((skill, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between gap-4 text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-amber-600 font-bold">△</span>
                  <span className="font-semibold">{skill}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAskCopilot(
                      `How can I strengthen my ${skill} from basic to production level for a ${profile.target_role} role?`
                    )
                  }
                  className="text-blue-600 hover:underline font-medium shrink-0 cursor-pointer"
                >
                  Study Plan →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Priority Gaps Deep-Dive */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            High-Priority Skill Gaps (Smallest High-Leverage Set)
          </h2>
          <p className="text-xs text-slate-500">
            Each gap includes why it matters, target mastery level, learning sequence, practical project, and interview topic.
          </p>
        </div>

        <div className="space-y-4">
          {skillGap.high_priority_gaps.map((gap, index) => (
            <div
              key={gap.skill}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs text-slate-500">
                    Priority 0{index + 1} · {gap.category} · Target Level:{' '}
                    <span className="font-semibold text-slate-800">{gap.level}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {gap.skill}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onAskCopilot(
                      `Give me a 7-day intensive study and practice plan for ${gap.skill}.`
                    )
                  }
                  className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ask Copilot to Coach Me on This</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                {/* Left: Why it matters & Learning Sequence */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Why It Matters for {profile.target_role}
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {gap.why_it_matters}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Suggested Learning Sequence</span>
                    </div>
                    <ol className="space-y-1.5 text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                      {gap.learning_sequence.map((step, i) => (
                        <li key={i} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right: Practical Project & Interview Preparation Topic */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Suggested Practical Project</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {gap.practical_project}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-200/80 rounded-lg space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-blue-950">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>Suggested Interview Preparation Topic</span>
                    </div>
                    <p className="text-blue-900 leading-relaxed">
                      {gap.interview_topic}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
