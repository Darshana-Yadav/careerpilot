import React, { useState } from 'react';
import { ArrowRight, Check, FileText, Layers, Compass, Briefcase, MessageSquare } from 'lucide-react';

interface LandingViewProps {
  onStartAnalyze: () => void;
  onLoadDemo: () => void;
  onOpenSection: (view: string) => void;
}

const PIPELINE_STAGES = [
  {
    id: 'resume',
    step: '01',
    label: 'Resume Intelligence',
    agent: 'Resume Intelligence Agent',
    input: 'PDF, Image, or Text Resume',
    output: 'Verified JSON Profile (Education, Tech Stack, Projects, Missing Metrics)',
    summary:
      'Extracts structured competencies directly from multimodal documents without inventing credentials or fabricating metrics.',
  },
  {
    id: 'skills',
    step: '02',
    label: 'Skill Gap Analysis',
    agent: 'Target Role & Skill Gap Agents',
    input: 'Candidate Profile + Target Role / JD',
    output: 'Weighted Job-Fit Heuristic (35/20/15/10/10/5/5) + Prioritized Gaps',
    summary:
      'Compares current capabilities against Required, Important, and Nice-to-Have role benchmarks with transparent scoring.',
  },
  {
    id: 'roadmap',
    step: '03',
    label: 'Personalized Roadmap',
    agent: 'Personalized Roadmap Agent',
    input: 'Skill Gaps + Weekly Study Hours (5 to 20+ hrs/wk)',
    output: '6-Phase Execution Plan + 30-Day Quick Sprint',
    summary:
      'Generates a time-calibrated learning sequence from foundation consolidation to portfolio packaging and applications.',
  },
  {
    id: 'projects',
    step: '04',
    label: 'Business Projects',
    agent: 'AI Project Recommendation & Resume Agents',
    input: 'Target Role + Portfolio Gaps',
    output: 'Production Project Specs + ACTION+TECH+TASK+RESULT Bullets',
    summary:
      'Recommends commercial-grade projects (e.g., Retail Sales Intelligence Platform) rather than generic toy datasets.',
  },
  {
    id: 'interview',
    step: '05',
    label: 'Interview & Copilot',
    agent: 'Interview Prep Agent & CareerPilot Copilot',
    input: 'Resume Projects + Target Role + JD Gaps',
    output: 'Technical, Project-Based, Behavioral & HR Drills',
    summary:
      'Prepares you for live technical screens and deep-dive questions on the exact projects listed on your resume.',
  },
];

export const LandingView: React.FC<LandingViewProps> = ({
  onStartAnalyze,
  onLoadDemo,
  onOpenSection,
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const activeStage = PIPELINE_STAGES[selectedStageIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4 Nav Links) — Zone 3 (2 Primary Actions) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 lg:px-12 py-4 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
        >
          CareerPilot AI
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#pipeline" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Agent Pipeline
          </a>
          <a href="#capabilities" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Capabilities
          </a>
          <a href="#scoring" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Scoring Heuristic
          </a>
          <button
            type="button"
            onClick={() => onOpenSection('dashboard')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Live Workspace
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadDemo}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Load Demo Profile
          </button>
          <button
            type="button"
            onClick={onStartAnalyze}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Analyze My Career
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Proposition & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-medium text-slate-500">
                Welcome to CareerPilot AI · Let&apos;s discover how job-ready you are
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.08]">
                Your Career. Analyzed by AI.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Turn your resume, skills and career goals into a personalized roadmap for becoming job-ready. Built on a 10-agent multimodal career intelligence architecture with explainable job-fit scoring.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onStartAnalyze}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
                >
                  <span>Analyze My Career</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onLoadDemo}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Try Demo (B.Tech Data Science → Data Analyst)
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-6 text-xs text-slate-600">
                <div>
                  <div className="font-mono font-semibold text-base text-slate-900 tabular-nums">
                    10 Specialized Agents
                  </div>
                  <div className="mt-0.5">Structured JSON orchestration</div>
                </div>
                <div>
                  <div className="font-mono font-semibold text-base text-slate-900 tabular-nums">
                    PDF · Image · Text
                  </div>
                  <div className="mt-0.5">Multimodal resume &amp; JD parsing</div>
                </div>
                <div>
                  <div className="font-mono font-semibold text-base text-slate-900 tabular-nums">
                    100% Explainable
                  </div>
                  <div className="mt-0.5">Zero fabricated resume claims</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Career Snapshot Preview */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs text-slate-500">Sample Output Preview · Data Analyst Track</p>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    Your Career Snapshot
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Career Readiness</span>
                  <span className="font-mono text-2xl font-bold text-blue-600 tabular-nums">
                    76/100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-slate-500 block">Target Role</span>
                  <span className="font-semibold text-slate-900 text-sm mt-1 block">
                    Data Analyst
                  </span>
                  <span className="text-slate-500 mt-1 block font-mono tabular-nums">
                    18 / 25 Core Skills Matched
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-slate-500 block">Top Strength</span>
                  <span className="font-semibold text-emerald-700 text-sm mt-1 block">
                    SQL + Python
                  </span>
                  <span className="text-slate-500 mt-1 block">
                    Pandas · Data Cleaning · Excel
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 shrink-0">High-Priority Gaps:</span>
                  <span className="font-medium text-amber-800 text-right">
                    1. Advanced SQL · 2. Power BI (DAX) · 3. Statistical Case Analysis
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Recommended Project:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    Retail Sales Intelligence Platform
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Next Best Action:</span>
                  <span className="font-medium text-blue-700 text-right">
                    Build one end-to-end SQL + Power BI project
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onLoadDemo}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Full Interactive Demo Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Pipeline Section: From Resume -> Skill Analysis -> Roadmap -> Projects -> Interview */}
        <section id="pipeline" className="bg-white border-y border-slate-200 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-semibold text-blue-600">
                Multi-Agent Reasoning Architecture
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                From Resume → Skill Analysis → Roadmap → Projects → Interview
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Select any stage in the agentic pipeline below to inspect how CareerPilot AI transforms raw candidate inputs into verified career strategy.
              </p>
            </div>

            {/* Interactive 5-Stage Pipeline Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isSelected = idx === selectedStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageIndex(idx)}
                    className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className={isSelected ? 'text-blue-400' : 'text-slate-500'}>
                        Stage {stage.step}
                      </span>
                      {idx < PIPELINE_STAGES.length - 1 && (
                        <span className={isSelected ? 'text-slate-400' : 'text-slate-400'}>→</span>
                      )}
                    </div>
                    <div className="font-semibold text-sm truncate">{stage.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-2">
                <p className="text-xs font-mono text-blue-600">
                  Stage {activeStage.step} · {activeStage.agent}
                </p>
                <h3 className="text-xl font-bold text-slate-900">{activeStage.label}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{activeStage.summary}</p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <span className="text-xs text-slate-500 block">Agent Input</span>
                  <span className="text-sm font-semibold text-slate-900 mt-1 block">
                    {activeStage.input}
                  </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <span className="text-xs text-slate-500 block">Structured JSON Output</span>
                  <span className="text-sm font-semibold text-blue-700 mt-1 block">
                    {activeStage.output}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Feature Cards (Asymmetric Bento Grid) */}
        <section id="capabilities" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold text-blue-600">Core Platform Modules</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Engineered Like a Career Analyst, Not a Generic Chatbot
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500">01. Intelligence</span>
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Career Analysis</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Multimodal parsing of PDF, image, and text resumes alongside pasted or screenshotted job descriptions. Extracts verified technical skills, project depth, and missing resume metrics without hallucinating experience.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Resume + JD Multimodal Engine</span>
                <button
                  type="button"
                  onClick={onStartAnalyze}
                  className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Upload Resume →
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500">02. Diagnostics</span>
                  <Layers className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Skill Gap Intelligence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Compares your current profile against 12 competency categories (Programming, SQL, Statistics, ML, GenAI, BI, Cloud, Business Strategy) and isolates the smallest set of skills that produces maximum career lift.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Required · Important · Nice to Have</span>
                <button
                  type="button"
                  onClick={() => {
                    onLoadDemo();
                    onOpenSection('skill-gap');
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Inspect Gaps →
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500">03. Execution</span>
                  <Compass className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Personalized Career Roadmap</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adapts to your weekly study availability (5, 10, 15, or 20+ hours/week) across 6 structured phases, complete with commercial portfolio project specs, ACTION+TECH+TASK+RESULT bullet rewrites, and interview drills.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">6 Phases + 30-Day Sprint</span>
                <button
                  type="button"
                  onClick={() => {
                    onLoadDemo();
                    onOpenSection('roadmap');
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  View Roadmap →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Transparent Scoring Methodology Section */}
        <section id="scoring" className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold text-blue-600">Explainable Heuristics</p>
              <h2 className="text-2xl font-bold text-slate-900">
                Transparent Job-Fit &amp; Readiness Scoring
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                CareerPilot AI never presents opaque numbers or claims guaranteed employment probabilities. Every Job-Fit Score is computed from an auditable 7-factor weighted rubric with line-by-line evidence from your resume.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Distinguishes Strong Match, Partial Match, Skill Gap, and Missing Requirements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Side-by-side Multi-Job Comparison matrix across target roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Editable candidate profile with full human-in-the-loop control</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="text-xs font-semibold text-slate-500 mb-3">
                Standard Job-Fit Heuristic Weights (100% Total)
              </div>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
                {[
                  { name: 'Technical Skills', weight: '35%', desc: 'Core programming, query languages, and analytical methods' },
                  { name: 'Relevant Experience', weight: '20%', desc: 'Internships, work history, or academic leadership alignment' },
                  { name: 'Projects', weight: '15%', desc: 'Complexity, real-world business problem alignment, and outcomes' },
                  { name: 'Education', weight: '10%', desc: 'Degree specialization and quantitative coursework' },
                  { name: 'Tools / Technologies', weight: '10%', desc: 'BI platforms, databases, cloud warehouses, and frameworks' },
                  { name: 'Soft Skills', weight: '5%', desc: 'Stakeholder communication, teamwork, and structured problem solving' },
                  { name: 'Domain Knowledge', weight: '5%', desc: 'Industry KPIs, commercial awareness, and vertical context' },
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-12 px-4 py-2.5 text-xs items-center">
                    <div className="col-span-4 font-semibold text-slate-900">{row.name}</div>
                    <div className="col-span-2 font-mono font-semibold text-blue-600 tabular-nums">
                      {row.weight}
                    </div>
                    <div className="col-span-6 text-slate-600">{row.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-800">CareerPilot AI</span> · Agentic AI Career Intelligence &amp; Job Application Assistant
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onStartAnalyze}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Profile Setup
          </button>
          <button
            type="button"
            onClick={onLoadDemo}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Load Demo Mode
          </button>
        </div>
      </footer>
    </div>
  );
};
