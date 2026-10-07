import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Columns,
  Plus,
} from 'lucide-react';
import { CandidateProfile, JobDescriptionAnalysis } from '../types/career';
import { SAMPLE_JOB_DESCRIPTIONS } from '../lib/demoData';

interface JobAnalyzerViewProps {
  profile: CandidateProfile;
  jobAnalyses: JobDescriptionAnalysis[];
  activeJobId: string;
  isAnalyzingJd: boolean;
  onSelectJobId: (id: string) => void;
  onAnalyzeNewJd: (params: { jdText?: string; file?: File }) => Promise<void>;
}

export const JobAnalyzerView: React.FC<JobAnalyzerViewProps> = ({
  profile,
  jobAnalyses,
  activeJobId,
  isAnalyzingJd,
  onSelectJobId,
  onAnalyzeNewJd,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [jdTextInput, setJdTextInput] = useState<string>('');
  const [jdImageFile, setJdImageFile] = useState<File | null>(null);
  const [showNewJdForm, setShowNewJdForm] = useState<boolean>(false);

  const activeJob =
    jobAnalyses.find((j) => j.id === activeJobId) ||
    jobAnalyses[0] ||
    SAMPLE_JOB_DESCRIPTIONS[0];

  const handleRunAnalysis = async () => {
    if (!jdTextInput.trim() && !jdImageFile) return;
    await onAnalyzeNewJd({
      jdText: jdTextInput,
      file: jdImageFile || undefined,
    });
    setJdTextInput('');
    setJdImageFile(null);
    setShowNewJdForm(false);
    setViewMode('single');
  };

  // Compute comparison aggregates for Section 24 (Job Comparison)
  const sortedByFit = [...jobAnalyses].sort(
    (a, b) => b.overall_fit_score - a.overall_fit_score
  );
  const bestMatchJob = sortedByFit[0];

  // Common skills across all analyzed jobs
  const allSkillLists = jobAnalyses.map((j) =>
    j.extracted_details.required_skills.map((s) => s.toLowerCase())
  );
  const commonSkills =
    jobAnalyses.length > 0
      ? jobAnalyses[0].extracted_details.required_skills.filter((skill) =>
          allSkillLists.every((list) =>
            list.some(
              (item) =>
                item.includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(item)
            )
          )
        )
      : ['SQL', 'Python'];

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-600">
            Agent 3 (Job Description Analysis) &amp; Agent 4 (Transparent Job-Fit Engine)
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Job Description Intelligence &amp; Multi-Role Fit Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates pasted JD text or JD screenshots using a transparent 35/20/15/10/10/5/5 weighted heuristic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Single JD Deep-Dive
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Compare Jobs ({jobAnalyses.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowNewJdForm(!showNewJdForm)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showNewJdForm ? 'Close JD Analyzer Input' : 'Analyze New Job Description'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible / Prominent New Job Description Multimodal Input Panel */}
      {showNewJdForm && (
        <div className="bg-white border border-blue-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Paste Job Description or Upload JD Screenshot
              </h2>
              <p className="text-xs text-slate-500">
                Comparing against Candidate Profile: <span className="font-semibold text-slate-800">{profile.name}</span> ({profile.technical_skills.slice(0, 5).join(', ')})
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setJdTextInput(SAMPLE_JOB_DESCRIPTIONS[0].raw_text)
              }
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Paste Sample Data Analyst JD
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
              <textarea
                rows={7}
                value={jdTextInput}
                onChange={(e) => setJdTextInput(e.target.value)}
                placeholder="Paste the complete Job Description here (Responsibilities, Required Skills, Preferred Qualifications, Years of Experience)..."
                className="w-full rounded-lg border border-slate-300 p-3 text-xs font-mono text-slate-800 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between gap-3">
              <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer flex flex-col items-center justify-center bg-slate-50/60">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.pdf"
                  onChange={(e) =>
                    setJdImageFile(e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <Upload className="w-5 h-5 text-blue-600 mb-1.5" />
                <span className="text-xs font-semibold text-slate-900">
                  {jdImageFile
                    ? `Attached: ${jdImageFile.name}`
                    : 'Or Upload Screenshot of Job Description'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  PNG, JPG, WEBP, or PDF supported via Gemini Multimodal
                </span>
              </label>

              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzingJd || (!jdTextInput.trim() && !jdImageFile)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzingJd ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculating Transparent Job Fit...</span>
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    <span>Calculate Job-Fit Score &amp; Gaps</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selector Bar for Analyzed Jobs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-1">
          Analyzed Roles:
        </span>
        {jobAnalyses.map((job, idx) => {
          const isSelected = job.id === activeJob.id && viewMode === 'single';
          return (
            <button
              key={job.id}
              type="button"
              onClick={() => {
                onSelectJobId(job.id);
                setViewMode('single');
              }}
              className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>
                Job {String.fromCharCode(65 + idx)} — {job.job_title.split('—')[0].trim()}
              </span>
              <span
                className={`font-mono font-bold tabular-nums ${
                  isSelected
                    ? 'text-blue-300'
                    : job.overall_fit_score >= 75
                    ? 'text-emerald-700'
                    : job.overall_fit_score >= 65
                    ? 'text-blue-700'
                    : 'text-amber-700'
                }`}
              >
                {job.overall_fit_score}%
              </span>
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: SINGLE JOB DESCRIPTION DEEP-DIVE */}
      {viewMode === 'single' && (
        <div className="space-y-6">
          {/* Top Fit Summary Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs text-slate-500">
                {activeJob.company_name} · Experience Req: {activeJob.extracted_details.years_of_experience} · Education: {activeJob.extracted_details.education_requirements}
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeJob.job_title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeJob.score_explanation}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Methodology Note: Weighted competency heuristic (0–100). This score highlights alignment and preparation priorities—it does not represent an actual probability of getting hired.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-500 block">
                OVERALL JOB FIT SCORE
              </span>
              <div className="font-mono text-4xl font-bold text-blue-600 tabular-nums mt-1">
                {activeJob.overall_fit_score}%
              </div>
              <div className="mt-3 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    activeJob.overall_fit_score >= 75
                      ? 'bg-emerald-600'
                      : activeJob.overall_fit_score >= 65
                      ? 'bg-blue-600'
                      : 'bg-amber-600'
                  }`}
                  style={{ width: `${activeJob.overall_fit_score}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                {activeJob.overall_fit_score >= 75
                  ? 'Strong Candidate Alignment'
                  : activeJob.overall_fit_score >= 65
                  ? 'Moderate Match — Targeted Prep Advised'
                  : 'Stretch Role — Close Core Gaps First'}
              </span>
            </div>
          </div>

          {/* 4-Column Match Classification (Strong Match / Partial Match / Skill Gap / Missing Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800">Strong Match</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <ul className="space-y-1.5 text-slate-800">
                {activeJob.strong_matches.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-blue-800">Partial / Moderate Match</span>
                <span className="font-mono text-blue-600 font-bold">△</span>
              </div>
              <ul className="space-y-1.5 text-slate-800">
                {activeJob.partial_matches.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-blue-600 font-bold">△</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-amber-800">Skill Gap</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <ul className="space-y-1.5 text-slate-800">
                {activeJob.skill_gaps.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-amber-600 font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-red-800">Missing Requirement</span>
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <ul className="space-y-1.5 text-slate-800">
                {activeJob.missing_requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-red-600 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transparent Weighted Scoring Breakdown Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Transparent Job-Fit Scoring Heuristic Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Weighted competency score across 7 transparent factors totaling 100%
                </p>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-50 text-[11px] font-semibold text-slate-500">
                  <div className="col-span-3">Category</div>
                  <div className="col-span-2 text-right">Weight</div>
                  <div className="col-span-2 text-right">Raw Score</div>
                  <div className="col-span-5 pl-4">Evidence &amp; Explanation</div>
                </div>
                {activeJob.weighted_breakdown.map((row) => (
                  <div
                    key={row.category}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 px-4 py-3 text-xs items-center hover:bg-slate-50/70"
                  >
                    <div className="md:col-span-3 font-semibold text-slate-900">
                      {row.category}
                    </div>
                    <div className="md:col-span-2 md:text-right font-mono text-slate-600 tabular-nums">
                      {row.weight}%
                    </div>
                    <div className="md:col-span-2 md:text-right font-mono font-bold text-blue-600 tabular-nums">
                      {row.score}/100
                    </div>
                    <div className="md:col-span-5 md:pl-4 text-slate-600 leading-relaxed">
                      {row.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted JD Intelligence & Tailored Prep */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Extracted Job Description Intelligence
              </h3>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">
                  Key Responsibilities
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {activeJob.extracted_details.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    ATS Keywords
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {activeJob.extracted_details.keywords.join(' · ')}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    Domain &amp; Soft Skills
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {[
                      ...activeJob.extracted_details.domain_requirements,
                      ...activeJob.extracted_details.soft_skills,
                    ].join(' · ')}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg space-y-2">
                <span className="font-bold text-blue-950 block">
                  Recommended Preparation for This Role
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-blue-900">
                  {activeJob.recommended_preparation.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ADVANCED FEATURE — MULTI-JOB COMPARISON (Section 24) */}
      {viewMode === 'compare' && (
        <div className="space-y-6">
          {/* Best Match & Common Skills Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-6">
              <span className="text-xs font-mono text-emerald-400">
                MULTI-JOB COMPARISON SUMMARY
              </span>
              <h2 className="text-lg font-bold mt-1">
                Best Match: {bestMatchJob.job_title} ({bestMatchJob.overall_fit_score}% Fit)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Comparison is strictly grounded in your current profile and the {jobAnalyses.length} supplied job descriptions.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Common Skills Across All Roles</span>
                <span className="font-semibold text-white mt-1 block">
                  {commonSkills.length > 0
                    ? commonSkills.join(' · ')
                    : 'SQL · Python · Quantitative Analysis'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Strategic Preparation Advice</span>
                <span className="text-slate-200 mt-1 block">
                  Target <span className="font-semibold text-emerald-400">{bestMatchJob.job_title.split('—')[0]}</span> roles immediately while building portfolio depth for stretch roles.
                </span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Job Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {jobAnalyses.map((job, idx) => {
              const isBest = job.id === bestMatchJob.id;
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-xl border p-6 flex flex-col justify-between space-y-5 ${
                    isBest ? 'border-blue-600' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-mono text-slate-500">
                          Job {String.fromCharCode(65 + idx)} · {job.company_name}
                          {isBest ? ' · BEST MATCH' : ''}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {job.job_title}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-2xl font-bold text-blue-600 tabular-nums">
                          {job.overall_fit_score}%
                        </span>
                        <span className="text-[11px] text-slate-400 block">Fit</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-semibold text-emerald-800 block">
                          ✓ Strong Matches
                        </span>
                        <p className="text-slate-700 mt-0.5">
                          {job.strong_matches.join(' · ')}
                        </p>
                      </div>

                      <div>
                        <span className="font-semibold text-amber-800 block">
                          ! Primary Skill Gaps
                        </span>
                        <p className="text-slate-700 mt-0.5">
                          {job.skill_gaps.join(' · ')}
                        </p>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-800 block">
                          Unique Role Requirements
                        </span>
                        <p className="text-slate-600 mt-0.5">
                          {[
                            ...job.extracted_details.preferred_skills,
                            ...job.missing_requirements,
                          ]
                            .slice(0, 3)
                            .join(' · ')}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="font-semibold text-blue-900 block">
                          Recommended Preparation
                        </span>
                        <p className="text-slate-600 mt-0.5">
                          {job.recommended_preparation[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectJobId(job.id);
                      setViewMode('single');
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Inspect Full Breakdown →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
