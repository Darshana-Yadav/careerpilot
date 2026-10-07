import React from 'react';
import {
  CheckSquare,
  Square,
  Clock,
  Target,
  Award,
  RefreshCw,
} from 'lucide-react';
import { LearningRoadmap, StudyHoursOption } from '../types/career';

interface RoadmapViewProps {
  targetRole: string;
  roadmap: LearningRoadmap;
  isRegenerating: boolean;
  onChangeStudyHours: (hours: StudyHoursOption) => void;
  onToggleTask: (phaseNumber: number, taskId: string) => void;
  onRegenerateRoadmap: () => void;
}

const HOURS_OPTIONS: StudyHoursOption[] = [
  '5 hours/week',
  '10 hours/week',
  '15 hours/week',
  '20+ hours/week',
];

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  targetRole,
  roadmap,
  isRegenerating,
  onChangeStudyHours,
  onToggleTask,
  onRegenerateRoadmap,
}) => {
  const allTasks = roadmap.phases.flatMap((p) => p.tasks);
  const completedCount = allTasks.filter((t) => t.completed).length;
  const totalCount = Math.max(1, allTasks.length);
  const completionPct = Math.round((completedCount / totalCount) * 100);

  // Calculate dynamic duration multiplier based on selected hours
  const getMultiplier = (hours: StudyHoursOption) => {
    if (hours === '5 hours/week') return 1.8;
    if (hours === '10 hours/week') return 1.0;
    if (hours === '15 hours/week') return 0.7;
    return 0.5;
  };

  const multiplier = getMultiplier(roadmap.weekly_hours);
  const adjustedTotalWeeks = Math.max(
    3,
    Math.round((roadmap.total_estimated_weeks || 8) * multiplier)
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Weekly Study Hours Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-600">
            Agent 6 · Personalized Learning &amp; Execution Roadmap Agent
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            6-Phase Career Roadmap for {targetRole}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Estimated Timeline: <span className="font-mono font-semibold text-slate-800">~{adjustedTotalWeeks} Weeks</span> at <span className="font-mono font-semibold text-blue-600">{roadmap.weekly_hours}</span> · Check off tasks to update your Career Readiness Score.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Interactive Weekly Hours Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {HOURS_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChangeStudyHours(opt)}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  roadmap.weekly_hours === opt
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onRegenerateRoadmap}
            disabled={isRegenerating}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate with AI</span>
          </button>
        </div>
      </div>

      {/* Overall Roadmap Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">
              Milestone Task Completion ({completedCount} / {totalCount} Tasks)
            </span>
            <span className="font-mono font-bold text-blue-600 tabular-nums">
              {completionPct}% Complete
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-200"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 30-Day Quick Sprint Overview */}
      <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-blue-400">
              NEXT 30 DAYS SPRINT
            </span>
            <h2 className="text-base font-bold mt-0.5">
              Immediate 4-Week Execution Schedule
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Pace: {roadmap.weekly_hours}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {roadmap.thirty_day_sprint.map((sprint, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-800/90 border border-slate-700 rounded-lg space-y-1.5"
            >
              <span className="font-mono font-bold text-blue-400 block">
                {sprint.week}
              </span>
              <div className="font-semibold text-white text-sm">
                {sprint.focus}
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                {sprint.deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Structured Phases */}
      <div className="space-y-4">
        {roadmap.phases.map((phase) => {
          const phaseCompletedCount = phase.tasks.filter((t) => t.completed).length;
          const isPhaseComplete =
            phase.tasks.length > 0 && phaseCompletedCount === phase.tasks.length;

          return (
            <div
              key={phase.phase_number}
              className={`bg-white border rounded-xl p-6 space-y-4 ${
                isPhaseComplete ? 'border-emerald-300' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-bold text-blue-600">
                      0{phase.phase_number}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {phase.estimated_time}
                    </span>
                    <span>·</span>
                    <span>
                      Skills: <strong className="text-slate-800">{phase.skills.join(' · ')}</strong>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {phase.phase_title}
                  </h3>
                </div>

                <div className="text-xs font-mono font-semibold text-slate-600 shrink-0">
                  {phaseCompletedCount}/{phase.tasks.length} Tasks Done
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                {/* Left: Goal & Interactive Tasks */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Phase Goal: </span>
                      <span className="text-slate-600">{phase.goal}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="font-bold text-slate-800 block">
                      Actionable Tasks (Click to mark complete):
                    </span>
                    {phase.tasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => onToggleTask(phase.phase_number, task.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start gap-2.5 cursor-pointer ${
                          task.completed
                            ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                            : 'bg-slate-50 border-slate-200/80 text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className="leading-relaxed">{task.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Phase Project & Completion Criteria */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                    <span className="text-slate-500 font-semibold block">
                      Phase Deliverable / Mini-Project
                    </span>
                    <div className="text-sm font-bold text-slate-900">
                      {phase.project}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-200/80 rounded-lg space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-950">
                      <Award className="w-3.5 h-3.5 text-blue-600" />
                      <span>Completion Criteria</span>
                    </div>
                    <p className="text-blue-900 leading-relaxed">
                      {phase.completion_criteria}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
