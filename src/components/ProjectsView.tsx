import React, { useState } from 'react';
import {
  Briefcase,
  Database,
  Sparkles,
  Copy,
  Check,
  Plus,
  MessageSquare,
} from 'lucide-react';
import { ProjectRecommendation } from '../types/career';

interface ProjectsViewProps {
  targetRole: string;
  projects: ProjectRecommendation[];
  onAddProjectToProfile: (project: ProjectRecommendation) => void;
  onAskCopilot: (question: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  targetRole,
  projects,
  onAddProjectToProfile,
  onAskCopilot,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleCopyBullet = (id: string, bullet: string) => {
    navigator.clipboard.writeText(bullet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddToProfile = (proj: ProjectRecommendation) => {
    onAddProjectToProfile(proj);
    setAddedIds((prev) => ({ ...prev, [proj.id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-600">
            Agent 7 · AI Portfolio Project Recommendation Agent
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Business-Value Portfolio Architecture for {targetRole}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Prioritizes end-to-end commercial impact and progressive complexity over generic classroom datasets.
          </p>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.map((proj, index) => {
          const isCopied = copiedId === proj.id;
          const isAdded = addedIds[proj.id];

          return (
            <div
              key={proj.id || index}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
            >
              {/* Top Title & Difficulty */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs text-slate-500">
                    Project 0{index + 1} · Difficulty:{' '}
                    <span className="font-semibold text-slate-900">
                      {proj.difficulty}
                    </span>{' '}
                    · Skills: {proj.skills_demonstrated.join(' · ')}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    {proj.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onAskCopilot(
                        `Create a step-by-step technical architecture and database schema for building the "${proj.title}" project.`
                      )
                    }
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>Get Architecture Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddToProfile(proj)}
                    disabled={isAdded}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Profile</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to My Projects</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Why Recommended & Business Problem */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Business Problem Addressed
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {proj.business_problem}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Why This Project Matters for Your Profile
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {proj.why_recommended}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      Technologies &amp; Stack
                    </span>
                    <p className="font-mono text-slate-700">
                      {proj.technologies.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Dataset Requirements, AI Component & Expected Output */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Database className="w-3.5 h-3.5 text-blue-600" />
                      <span>Dataset Requirements</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {proj.dataset_requirements}
                    </p>
                  </div>

                  <div className="p-3.5 bg-blue-50/50 border border-blue-200/80 rounded-lg space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-950">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>2026 AI &amp; Automation Component</span>
                    </div>
                    <p className="text-blue-900 leading-relaxed">
                      {proj.ai_component}
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Expected Portfolio Deliverable</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {proj.expected_output}
                    </p>
                  </div>
                </div>
              </div>

              {/* Copyable Resume Bullet Suggestion */}
              <div className="p-4 bg-slate-900 text-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] text-blue-400 block">
                    SUGGESTED RESUME BULLET (ACTION + TECHNOLOGY + TASK + RESULT)
                  </span>
                  <p className="text-slate-100 leading-relaxed font-medium">
                    &ldquo;{proj.resume_bullet_suggestion}&rdquo;
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyBullet(proj.id || String(index), proj.resume_bullet_suggestion)
                  }
                  className="shrink-0 px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
