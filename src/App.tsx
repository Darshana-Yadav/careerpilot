/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserCheck,
  FileSearch,
  Layers,
  Compass,
  Briefcase,
  FileCheck,
  MessageSquare,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  CheckCircle2,
  Home,
} from 'lucide-react';
import {
  CandidateProfile,
  CareerIntelligenceState,
  CopilotMessage,
  ProjectRecommendation,
  StudyHoursOption,
  TargetRoleName,
} from './types/career';
import { INITIAL_DEMO_STATE } from './lib/demoData';
import { computeCareerReadiness } from './lib/scoringEngine';
import {
  analyzeJobDescriptionWithAgent,
  askCareerPilotCopilot,
  parseResumeWithAgent,
  runFullCareerIntelligencePipeline,
} from './services/careerApi';
import { LandingView } from './components/LandingView';
import { ProfileSetupView } from './components/ProfileSetupView';
import { DashboardView } from './components/DashboardView';
import { JobAnalyzerView } from './components/JobAnalyzerView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { ProjectsView } from './components/ProjectsView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { CopilotView } from './components/CopilotView';

type ActiveViewId =
  | 'landing'
  | 'profile-setup'
  | 'dashboard'
  | 'job-analyzer'
  | 'skill-gap'
  | 'roadmap'
  | 'projects'
  | 'resume-analyzer'
  | 'interview-prep'
  | 'copilot';

const NAV_ITEMS: { id: ActiveViewId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Career Dashboard', icon: LayoutDashboard },
  { id: 'profile-setup', label: 'Resume & Target Role', icon: UserCheck },
  { id: 'job-analyzer', label: 'JD Fit & Comparison', icon: FileSearch },
  { id: 'skill-gap', label: 'Skill Gap Intelligence', icon: Layers },
  { id: 'roadmap', label: 'Learning Roadmap', icon: Compass },
  { id: 'projects', label: 'Project Recommendations', icon: Briefcase },
  { id: 'resume-analyzer', label: 'Resume Analyzer', icon: FileCheck },
  { id: 'interview-prep', label: 'Interview Preparation', icon: MessageSquare },
  { id: 'copilot', label: 'CareerPilot Copilot', icon: Sparkles },
];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveViewId>('landing');
  const [careerState, setCareerState] = useState<CareerIntelligenceState>(INITIAL_DEMO_STATE);

  // Loading & UI states
  const [isParsingResume, setIsParsingResume] = useState<boolean>(false);
  const [isRunningFullAnalysis, setIsRunningFullAnalysis] = useState<boolean>(false);
  const [isAnalyzingJd, setIsAnalyzingJd] = useState<boolean>(false);
  const [isCopilotSending, setIsCopilotSending] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Expandable "AI Reasoning Pipeline" (Section 23) & "What's My Next Best Action?" Modal (Section 25)
  const [showPipelineDrawer, setShowPipelineDrawer] = useState<boolean>(false);
  const [showNextActionsModal, setShowNextActionsModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // CareerPilot Copilot conversation history
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello ${INITIAL_DEMO_STATE.profile.name}! I am CareerPilot Copilot, your profile-aware AI career strategist.\n\nI have loaded your ${INITIAL_DEMO_STATE.profile.education_level} profile, your target role (${INITIAL_DEMO_STATE.profile.target_role}), your 2 current projects (Sales Dashboard & Customer Churn Analysis), and your 3 high-priority skill gaps (Advanced SQL, Power BI Data Modeling, and Statistical Case Analysis).\n\nHow would you like to accelerate your job readiness today?`,
      timestamp: 'Ready',
      suggested_followups: [
        'What should I learn next?',
        'Which skill gap should I prioritize?',
        'Create a 4-week preparation plan.',
      ],
    },
  ]);

  const appendAgentLog = (step: string, agent: string, detail: string) => {
    setCareerState((prev) => ({
      ...prev,
      agentLogs: [
        {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          step,
          agent,
          status: 'completed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detail,
        },
        ...prev.agentLogs.slice(0, 11),
      ],
    }));
  };

  // Load Demo Profile handler (Section 17)
  const handleLoadDemoProfile = () => {
    setCareerState(INITIAL_DEMO_STATE);
    setErrorBanner(null);
    setActiveView('dashboard');
  };

  // Update Candidate Profile & recalculate readiness deterministically
  const handleUpdateProfile = (updatedProfile: CandidateProfile) => {
    setCareerState((prev) => {
      const updatedReadiness = computeCareerReadiness(
        updatedProfile,
        prev.skillGap,
        prev.roadmap,
        prev.resumeReport
      );
      return {
        ...prev,
        isDemoMode: false,
        profile: updatedProfile,
        readiness: updatedReadiness,
      };
    });
  };

  // Agent 1: Parse Resume (Multimodal PDF / Image / Text)
  const handleParseResume = async (params: { rawText?: string; file?: File }) => {
    setIsParsingResume(true);
    setErrorBanner(null);
    try {
      const extracted = await parseResumeWithAgent(params);
      setCareerState((prev) => {
        const mergedProfile: CandidateProfile = {
          ...prev.profile,
          name: extracted.name || prev.profile.name,
          headline: extracted.headline || prev.profile.headline,
          education_level: extracted.education_level || prev.profile.education_level,
          experience_level: extracted.experience_level || prev.profile.experience_level,
          education: extracted.education || prev.profile.education,
          technical_skills: extracted.technical_skills || prev.profile.technical_skills,
          soft_skills: extracted.soft_skills || prev.profile.soft_skills,
          projects: extracted.projects || prev.profile.projects,
          experience: extracted.experience || prev.profile.experience,
          certifications: extracted.certifications || prev.profile.certifications,
          achievements: extracted.achievements || prev.profile.achievements,
          technologies: extracted.technologies || prev.profile.technologies,
          strengths: extracted.strengths || prev.profile.strengths,
          missing_information: extracted.missing_information || prev.profile.missing_information,
          raw_resume_text: extracted.raw_resume_text || params.rawText || prev.profile.raw_resume_text,
          resume_file_name: extracted.resume_file_name || params.file?.name || 'Uploaded Resume',
        };
        return {
          ...prev,
          isDemoMode: false,
          profile: mergedProfile,
        };
      });
      appendAgentLog(
        'Resume analyzed & skills extracted',
        'Agent 1 · Resume Intelligence Agent',
        `Extracted ${extracted.technical_skills?.length || 0} technical skills and ${extracted.projects?.length || 0} projects.`
      );
    } catch (err: any) {
      setErrorBanner(err?.message || 'Could not parse resume. Please check the file or text.');
      throw err;
    } finally {
      setIsParsingResume(false);
    }
  };

  // Multi-Agent Full Career Analysis Pipeline (Agents 2, 5, 6, 7, 8, 9)
  const handleRunFullAnalysis = async (
    targetRole: TargetRoleName,
    weeklyHours: StudyHoursOption
  ) => {
    setIsRunningFullAnalysis(true);
    setErrorBanner(null);
    try {
      const updatedProfile: CandidateProfile = {
        ...careerState.profile,
        target_role: targetRole,
        weekly_hours: weeklyHours,
      };

      const result = await runFullCareerIntelligencePipeline({
        profile: updatedProfile,
        targetRole,
        weeklyHours,
      });

      const computedReadiness = computeCareerReadiness(
        updatedProfile,
        result.skillGap,
        result.roadmap,
        result.resumeReport,
        result.readiness
      );

      const nowTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      setCareerState((prev) => ({
        ...prev,
        isDemoMode: false,
        hasAnalyzed: true,
        profile: updatedProfile,
        roleAnalysis: result.roleAnalysis,
        skillGap: result.skillGap,
        roadmap: result.roadmap,
        projects: result.projects,
        resumeReport: result.resumeReport,
        interviewQuestions: result.interviewQuestions,
        readiness: computedReadiness,
        nextBestActions: result.nextBestActions || prev.nextBestActions,
        agentLogs: [
          {
            id: `log-full-1-${Date.now()}`,
            step: 'Resume analyzed',
            agent: 'Agent 1 · Resume Intelligence Agent',
            status: 'completed',
            timestamp: nowTime,
            detail: `Verified ${updatedProfile.technical_skills.length} skills & ${updatedProfile.projects.length} projects for ${updatedProfile.name}.`,
          },
          {
            id: `log-full-2-${Date.now()}`,
            step: 'Target role identified & requirements mapped',
            agent: 'Agent 2 · Target Role Analysis Agent',
            status: 'completed',
            timestamp: nowTime,
            detail: `Mapped ${result.roleAnalysis.competencies.length} competency categories for ${targetRole}.`,
          },
          {
            id: `log-full-3-${Date.now()}`,
            step: 'Skill gaps identified',
            agent: 'Agent 5 · Skill Gap Agent',
            status: 'completed',
            timestamp: nowTime,
            detail: `Isolated ${result.skillGap.high_priority_gaps.length} high-priority skill gaps.`,
          },
          {
            id: `log-full-4-${Date.now()}`,
            step: 'Roadmap, projects & interview prep generated',
            agent: 'Agents 6, 7, 8 & 9 · Execution Pipeline',
            status: 'completed',
            timestamp: nowTime,
            detail: `Built 6-phase roadmap (${weeklyHours}), ${result.projects.length} projects, and ${result.interviewQuestions.length} interview questions.`,
          },
        ],
      }));

      setActiveView('dashboard');
    } catch (err: any) {
      setErrorBanner(
        err?.message || 'Multi-agent analysis encountered an issue. Please try again.'
      );
    } finally {
      setIsRunningFullAnalysis(false);
    }
  };

  // Agent 3 & 4: Analyze Job Description
  const handleAnalyzeNewJd = async (params: { jdText?: string; file?: File }) => {
    setIsAnalyzingJd(true);
    setErrorBanner(null);
    try {
      const analysis = await analyzeJobDescriptionWithAgent({
        profile: careerState.profile,
        jdText: params.jdText,
        file: params.file,
      });

      setCareerState((prev) => ({
        ...prev,
        jobAnalyses: [analysis, ...prev.jobAnalyses],
        activeJobAnalysisId: analysis.id,
      }));

      appendAgentLog(
        'Job description analyzed & scored',
        'Agents 3 & 4 · JD Fit Scoring Engine',
        `Evaluated "${analysis.job_title}" — Overall Fit: ${analysis.overall_fit_score}%.`
      );
    } catch (err: any) {
      setErrorBanner(err?.message || 'Failed to analyze job description.');
    } finally {
      setIsAnalyzingJd(false);
    }
  };

  // Toggle Roadmap Task Completion & dynamically recalculate Career Readiness
  const handleToggleRoadmapTask = (phaseNumber: number, taskId: string) => {
    setCareerState((prev) => {
      const updatedPhases = prev.roadmap.phases.map((phase) => {
        if (phase.phase_number !== phaseNumber) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        };
      });

      const updatedRoadmap = {
        ...prev.roadmap,
        phases: updatedPhases,
      };

      const updatedReadiness = computeCareerReadiness(
        prev.profile,
        prev.skillGap,
        updatedRoadmap,
        prev.resumeReport,
        prev.readiness
      );

      return {
        ...prev,
        roadmap: updatedRoadmap,
        readiness: updatedReadiness,
      };
    });
  };

  // Change Study Hours on Roadmap
  const handleChangeStudyHours = (hours: StudyHoursOption) => {
    setCareerState((prev) => ({
      ...prev,
      profile: { ...prev.profile, weekly_hours: hours },
      roadmap: { ...prev.roadmap, weekly_hours: hours },
    }));
  };

  // Add Recommended Project to Candidate Profile
  const handleAddProjectToProfile = (proj: ProjectRecommendation) => {
    setCareerState((prev) => {
      const updatedProfile: CandidateProfile = {
        ...prev.profile,
        projects: [
          ...prev.profile.projects,
          {
            title: proj.title,
            description: proj.business_problem,
            technologies: proj.technologies,
            outcomes: proj.expected_output,
          },
        ],
      };
      const updatedReadiness = computeCareerReadiness(
        updatedProfile,
        prev.skillGap,
        prev.roadmap,
        prev.resumeReport
      );
      return {
        ...prev,
        profile: updatedProfile,
        readiness: updatedReadiness,
      };
    });
  };

  // CareerPilot Copilot Message Handler
  const handleSendCopilotMessage = async (question: string) => {
    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCopilotMessages((prev) => [...prev, userMsg]);
    setIsCopilotSending(true);

    try {
      const contextSummary = {
        candidate_profile: careerState.profile,
        target_role: careerState.profile.target_role,
        career_readiness: careerState.readiness,
        skill_gaps: careerState.skillGap,
        roadmap_summary: {
          weekly_hours: careerState.roadmap.weekly_hours,
          thirty_day_sprint: careerState.roadmap.thirty_day_sprint,
        },
        recommended_projects: careerState.projects.map((p) => ({
          title: p.title,
          technologies: p.technologies,
          business_problem: p.business_problem,
        })),
        resume_strength_score: careerState.resumeReport.resume_strength_score,
        resume_problems: careerState.resumeReport.problems_detected,
      };

      const historyPayload = copilotMessages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const result = await askCareerPilotCopilot({
        contextSummary,
        message: question,
        history: historyPayload,
      });

      const assistantMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggested_followups: result.suggested_followups,
      };

      setCopilotMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const fallbackMsg: CopilotMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content: `Based on your current **${careerState.profile.target_role}** profile (Readiness: **${careerState.readiness.overall_score}/100**):\n\n1. **Immediate Priority Skill Gap**: Focus on **${careerState.skillGap.high_priority_gaps[0]?.skill || 'Advanced SQL'}** — ${careerState.skillGap.high_priority_gaps[0]?.why_it_matters || ''}\n2. **Flagship Portfolio Project**: Build the **${careerState.projects[0]?.title || 'Retail Sales Intelligence Platform'}** using ${careerState.projects[0]?.technologies.join(', ')}.\n3. **Resume Upgrade**: Apply the ACTION + TECHNOLOGY + TASK + RESULT bullet rewrites in the Resume Analyzer tab to lift your score from ${careerState.resumeReport.resume_strength_score}/100.`,
        timestamp: 'Offline Strategist',
        suggested_followups: [
          'Which skill gap should I prioritize?',
          'What project should I build?',
        ],
      };
      setCopilotMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsCopilotSending(false);
    }
  };

  const handleJumpToCopilotWithQuestion = (question: string) => {
    setActiveView('copilot');
    handleSendCopilotMessage(question);
  };

  // Render Landing Page if activeView === 'landing'
  if (activeView === 'landing') {
    return (
      <LandingView
        onStartAnalyze={() => setActiveView('profile-setup')}
        onLoadDemo={handleLoadDemoProfile}
        onOpenSection={(view) => setActiveView(view as ActiveViewId)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Left Sidebar (260px Fixed Width) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[264px] lg:shrink-0 bg-white border-r border-slate-200 sticky top-0 h-screen justify-between">
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              type="button"
              onClick={() => setActiveView('landing')}
              className="text-left cursor-pointer group"
            >
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors block">
                CareerPilot AI
              </span>
              <span className="text-[11px] text-slate-500 block">
                Agentic Career Intelligence
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('landing')}
              title="Return to Landing Page"
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Active Candidate Mini Summary */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Readiness Index</span>
              <span className="font-mono font-bold text-blue-600 tabular-nums">
                {careerState.readiness.overall_score}/100
              </span>
            </div>
            <div className="font-bold text-slate-900 truncate">
              {careerState.profile.name}
            </div>
            <div className="text-slate-600 truncate">
              Target: <strong className="text-slate-900">{careerState.profile.target_role}</strong>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Demo & Regenerate Actions */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50/50">
          <button
            type="button"
            onClick={() =>
              handleRunFullAnalysis(
                careerState.profile.target_role,
                careerState.profile.weekly_hours
              )
            }
            disabled={isRunningFullAnalysis}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRunningFullAnalysis ? 'animate-spin' : ''}`}
            />
            <span>
              {isRunningFullAnalysis ? 'Analyzing Profile...' : 'Regenerate AI Analysis'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleLoadDemoProfile}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Reset / Load Demo Profile
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Workspace Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="text-xs text-slate-500 truncate">
              <span className="font-semibold text-slate-900">CareerPilot AI</span>
              <span className="mx-2">/</span>
              <span>
                {NAV_ITEMS.find((n) => n.id === activeView)?.label || 'Workspace'}
              </span>
              <span className="hidden sm:inline mx-2">·</span>
              <span className="hidden sm:inline text-slate-600">
                {careerState.isDemoMode ? 'Demo Profile Active' : 'Custom Profile Active'}
              </span>
            </div>
          </div>

          {/* Right Header Controls: AI Reasoning Pipeline + Next Best Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowPipelineDrawer(!showPipelineDrawer)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Reasoning Pipeline ({careerState.agentLogs.length})</span>
              {showPipelineDrawer ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowNextActionsModal(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">What&apos;s My Next Best Action?</span>
              <span className="sm:hidden">Next Action</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 23: Expandable "AI Reasoning Pipeline" (High-level Agent Activity Log) */}
        {showPipelineDrawer && (
          <div className="bg-slate-900 text-white border-b border-slate-800 px-6 lg:px-8 py-5">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-400">
                    AGENTIC AI REASONING PIPELINE (HIGH-LEVEL EXECUTION TRACE)
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Displays verified agent milestones without exposing private internal chain-of-thought.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPipelineDrawer(false)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {careerState.agentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-800/90 border border-slate-700 rounded-lg space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-400">
                        ✓ {log.step}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {log.timestamp}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-300">
                      {log.agent}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {log.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Loading Overlay Bar when Full Multi-Agent Pipeline is Running */}
        {isRunningFullAnalysis && (
          <div className="bg-blue-600 text-white px-6 py-2.5 text-xs font-medium flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>
              Orchestrating CareerPilot AI Agents (Target Role Analysis → Skill Gap Engine → 6-Phase Roadmap → Portfolio Projects → Resume &amp; Interview Prep)...
            </span>
          </div>
        )}

        {/* Main Viewport Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
          {activeView === 'dashboard' && (
            <DashboardView
              state={careerState}
              onNavigate={(view) => setActiveView(view as ActiveViewId)}
              onOpenNextActionsModal={() => setShowNextActionsModal(true)}
              onAskCopilotQuestion={handleJumpToCopilotWithQuestion}
            />
          )}

          {activeView === 'profile-setup' && (
            <ProfileSetupView
              profile={careerState.profile}
              roleAnalysis={careerState.roleAnalysis}
              isParsingResume={isParsingResume}
              isRunningFullAnalysis={isRunningFullAnalysis}
              errorMessage={errorBanner}
              onUpdateProfile={handleUpdateProfile}
              onParseResume={handleParseResume}
              onRunFullAnalysis={handleRunFullAnalysis}
              onLoadDemo={handleLoadDemoProfile}
            />
          )}

          {activeView === 'job-analyzer' && (
            <JobAnalyzerView
              profile={careerState.profile}
              jobAnalyses={careerState.jobAnalyses}
              activeJobId={careerState.activeJobAnalysisId}
              isAnalyzingJd={isAnalyzingJd}
              onSelectJobId={(id) =>
                setCareerState((prev) => ({ ...prev, activeJobAnalysisId: id }))
              }
              onAnalyzeNewJd={handleAnalyzeNewJd}
            />
          )}

          {activeView === 'skill-gap' && (
            <SkillGapView
              profile={careerState.profile}
              skillGap={careerState.skillGap}
              onNavigate={(view) => setActiveView(view as ActiveViewId)}
              onAskCopilot={handleJumpToCopilotWithQuestion}
            />
          )}

          {activeView === 'roadmap' && (
            <RoadmapView
              targetRole={careerState.profile.target_role}
              roadmap={careerState.roadmap}
              isRegenerating={isRunningFullAnalysis}
              onChangeStudyHours={handleChangeStudyHours}
              onToggleTask={handleToggleRoadmapTask}
              onRegenerateRoadmap={() =>
                handleRunFullAnalysis(
                  careerState.profile.target_role,
                  careerState.profile.weekly_hours
                )
              }
            />
          )}

          {activeView === 'projects' && (
            <ProjectsView
              targetRole={careerState.profile.target_role}
              projects={careerState.projects}
              onAddProjectToProfile={handleAddProjectToProfile}
              onAskCopilot={handleJumpToCopilotWithQuestion}
            />
          )}

          {activeView === 'resume-analyzer' && (
            <ResumeAnalyzerView
              profile={careerState.profile}
              resumeReport={careerState.resumeReport}
              onNavigateToSetup={() => setActiveView('profile-setup')}
            />
          )}

          {activeView === 'interview-prep' && (
            <InterviewPrepView
              targetRole={careerState.profile.target_role}
              questions={careerState.interviewQuestions}
              onAskCopilot={handleJumpToCopilotWithQuestion}
            />
          )}

          {activeView === 'copilot' && (
            <CopilotView
              state={careerState}
              messages={copilotMessages}
              isSending={isCopilotSending}
              onSendMessage={handleSendCopilotMessage}
              onClearChat={() =>
                setCopilotMessages([
                  {
                    id: `reset-${Date.now()}`,
                    role: 'assistant',
                    content: `Conversation reset. I have your ${careerState.profile.target_role} profile and skill gap analysis ready. What would you like to focus on next?`,
                    timestamp: 'Now',
                    suggested_followups: [
                      'What should I learn next?',
                      'Which skill gap should I prioritize?',
                      'Create a 4-week preparation plan.',
                    ],
                  },
                ])
              }
            />
          )}
        </main>
      </div>

      {/* Section 25: "What's My Next Best Action?" Modal */}
      {showNextActionsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-600">
                  HIGH-IMPACT PRIORITIZATION ENGINE
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Your Top 3 Next Best Actions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designed to prevent roadmap overwhelm—focus exclusively on these 3 actions for maximum {careerState.profile.target_role} lift.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNextActionsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {careerState.nextBestActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-slate-900 text-sm">
                      <span className="font-mono text-blue-600 mr-2">
                        0{action.priority || idx + 1}.
                      </span>
                      {action.title}
                    </div>
                    <span className="font-mono text-[11px] text-emerald-700 font-semibold">
                      {action.impact_area} · {action.estimated_effort}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Why now: </strong>
                    {action.why_now}
                  </p>
                  <p className="text-blue-900 font-medium leading-relaxed pt-1 border-t border-slate-200/70">
                    <strong>Concrete step: </strong>
                    {action.concrete_step}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowNextActionsModal(false);
                  handleJumpToCopilotWithQuestion(
                    'Help me break down my #1 Next Best Action into a day-by-day checklist for this week.'
                  );
                }}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Break down Action #1 in CareerPilot Copilot →
              </button>

              <button
                type="button"
                onClick={() => setShowNextActionsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
