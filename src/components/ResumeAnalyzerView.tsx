import React, { useState } from 'react';
import {
  FileCheck,
  AlertTriangle,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CandidateProfile, ResumeImprovementReport } from '../types/career';

interface ResumeAnalyzerViewProps {
  profile: CandidateProfile;
  resumeReport: ResumeImprovementReport;
  onNavigateToSetup: () => void;
}

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  profile,
  resumeReport,
  onNavigateToSetup,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Score Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-2">
          <p className="text-xs font-medium text-blue-600">
            Agent 8 · Resume Improvement &amp; ATS Optimization Agent
          </p>
          <h1 className="text-xl font-bold text-slate-900">
            Resume Audit &amp; Impact Quantification Report
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            {resumeReport.score_rationale}
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            AI Safety Verification: All suggested bullet rewrites use only projects and technologies already present in your uploaded resume. Never invents employers, certifications, or fabricated percentages.
          </p>
        </div>

        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
          <span className="text-xs font-semibold text-slate-500 block">
            RESUME STRENGTH SCORE
          </span>
          <div className="font-mono text-4xl font-bold text-blue-600 tabular-nums mt-1">
            {resumeReport.resume_strength_score}
            <span className="text-lg text-slate-400">/100</span>
          </div>
          <div className="mt-3 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${resumeReport.resume_strength_score}%` }}
            />
          </div>
          <button
            type="button"
            onClick={onNavigateToSetup}
            className="text-xs font-semibold text-blue-600 hover:underline mt-3 inline-block cursor-pointer"
          >
            Upload Revised Resume →
          </button>
        </div>
      </div>

      {/* Customized Professional Summary */}
      <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-blue-400">
              CUSTOMIZED PROFESSIONAL SUMMARY · {profile.target_role.toUpperCase()}
            </span>
            <h2 className="text-base font-bold mt-0.5">
              Role-Targeted Executive Summary
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              handleCopy('summary', resumeReport.customized_professional_summary)
            }
            className="self-start px-3.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === 'summary' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Summary</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-slate-100 leading-relaxed bg-slate-800/80 border border-slate-700 rounded-lg p-4">
          {resumeReport.customized_professional_summary}
        </p>
      </div>

      {/* Problems Detected & Why Suggestions Matter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Problems Detected */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              Problems Detected ({resumeReport.problems_detected.length})
            </h2>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            {resumeReport.problems_detected.map((prob, idx) => (
              <li
                key={idx}
                className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-lg leading-relaxed"
              >
                <span className="font-mono font-bold text-amber-800 mr-1.5">
                  0{idx + 1}.
                </span>
                {prob}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Improvement Suggestions (Explaining WHY each matters) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Prioritized Improvement Suggestions &amp; Why They Matter
            </h2>
            <p className="text-xs text-slate-500">
              Every recommendation includes recruiter/ATS context and a concrete correction step
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {resumeReport.improvement_suggestions.map((sug, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {sug.issue}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {sug.category}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Why it matters: </strong>
                  {sug.why_it_matters}
                </p>
                <p className="text-blue-800 font-medium leading-relaxed pt-1 border-t border-slate-200/70">
                  <strong>Action to take: </strong>
                  {sug.action_to_take}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bullet Point Rewrites: ACTION + TECHNOLOGY + TASK + RESULT */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Verified Bullet Rewrites (ACTION + TECHNOLOGY + TASK + RESULT Formula)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generated strictly from the projects and experience already present on your resume without fabricating outcomes.
          </p>
        </div>

        <div className="space-y-4">
          {resumeReport.bullet_rewrites.map((item, idx) => {
            const copyId = `bullet-${idx}`;
            return (
              <div
                key={idx}
                className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-500 font-medium block">
                      Original Resume Context:
                    </span>
                    <p className="text-slate-600 italic mt-0.5">
                      &ldquo;{item.original_context}&rdquo;
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(copyId, item.improved_bullet)}
                    className="self-start shrink-0 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === copyId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Improved Bullet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 bg-white border border-blue-200 rounded-lg">
                  <span className="text-[11px] font-mono font-bold text-blue-600 block mb-1">
                    IMPROVED HIGH-IMPACT BULLET
                  </span>
                  <p className="text-slate-900 font-semibold text-sm leading-relaxed">
                    • {item.improved_bullet}
                  </p>
                </div>

                {/* Formula Decomposition Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-2.5 bg-white border border-slate-200/80 rounded-md">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block">
                      1. ACTION VERB
                    </span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {item.formula_breakdown.action}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200/80 rounded-md">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block">
                      2. TECHNOLOGY
                    </span>
                    <span className="font-semibold text-blue-700 mt-0.5 block">
                      {item.formula_breakdown.technology}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200/80 rounded-md">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block">
                      3. ANALYTICAL TASK
                    </span>
                    <span className="text-slate-700 mt-0.5 block">
                      {item.formula_breakdown.task}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200/80 rounded-md">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block">
                      4. VERIFIED RESULT
                    </span>
                    <span className="text-emerald-800 font-medium mt-0.5 block">
                      {item.formula_breakdown.result}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
