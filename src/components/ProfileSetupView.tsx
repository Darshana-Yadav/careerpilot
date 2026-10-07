import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import {
  CandidateProfile,
  StudyHoursOption,
  TargetRoleAnalysis,
  TargetRoleName,
} from '../types/career';
import { AVAILABLE_TARGET_ROLES, SAMPLE_RESUME_TEXT } from '../lib/demoData';

interface ProfileSetupViewProps {
  profile: CandidateProfile;
  roleAnalysis: TargetRoleAnalysis;
  isParsingResume: boolean;
  isRunningFullAnalysis: boolean;
  errorMessage: string | null;
  onUpdateProfile: (updated: CandidateProfile) => void;
  onParseResume: (params: { rawText?: string; file?: File }) => Promise<void>;
  onRunFullAnalysis: (role: TargetRoleName, hours: StudyHoursOption) => Promise<void>;
  onLoadDemo: () => void;
  initialSubTab?: 'upload' | 'profile' | 'role';
}

const STUDY_HOURS: StudyHoursOption[] = [
  '5 hours/week',
  '10 hours/week',
  '15 hours/week',
  '20+ hours/week',
];

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  profile,
  roleAnalysis,
  isParsingResume,
  isRunningFullAnalysis,
  errorMessage,
  onUpdateProfile,
  onParseResume,
  onRunFullAnalysis,
  onLoadDemo,
  initialSubTab = 'upload',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upload' | 'profile' | 'role'>(initialSubTab);
  const [resumeTextInput, setResumeTextInput] = useState<string>(
    profile.raw_resume_text || SAMPLE_RESUME_TEXT
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customRoleInput, setCustomRoleInput] = useState<string>('');
  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [newSoftSkillInput, setNewSoftSkillInput] = useState<string>('');
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');
  const [newProjectDesc, setNewProjectDesc] = useState<string>('');
  const [newProjectTech, setNewProjectTech] = useState<string>('');
  const [importanceFilter, setImportanceFilter] = useState<string>('All');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExtractResume = async () => {
    await onParseResume({
      rawText: resumeTextInput,
      file: selectedFile || undefined,
    });
    setActiveSubTab('profile');
  };

  const handleAddTechSkill = () => {
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (!profile.technical_skills.includes(trimmed)) {
      onUpdateProfile({
        ...profile,
        technical_skills: [...profile.technical_skills, trimmed],
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveTechSkill = (skill: string) => {
    onUpdateProfile({
      ...profile,
      technical_skills: profile.technical_skills.filter((s) => s !== skill),
    });
  };

  const handleAddSoftSkill = () => {
    const trimmed = newSoftSkillInput.trim();
    if (!trimmed) return;
    if (!profile.soft_skills.includes(trimmed)) {
      onUpdateProfile({
        ...profile,
        soft_skills: [...profile.soft_skills, trimmed],
      });
    }
    setNewSoftSkillInput('');
  };

  const handleAddProject = () => {
    if (!newProjectTitle.trim() || !newProjectDesc.trim()) return;
    const techs = newProjectTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onUpdateProfile({
      ...profile,
      projects: [
        ...profile.projects,
        {
          title: newProjectTitle.trim(),
          description: newProjectDesc.trim(),
          technologies: techs.length > 0 ? techs : ['Python', 'SQL'],
        },
      ],
    });
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectTech('');
  };

  const handleRemoveProject = (index: number) => {
    onUpdateProfile({
      ...profile,
      projects: profile.projects.filter((_, idx) => idx !== index),
    });
  };

  const filteredCompetencies = roleAnalysis.competencies.filter((c) =>
    importanceFilter === 'All' ? true : c.importance === importanceFilter
  );

  return (
    <div className="space-y-6">
      {/* Top Step Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Agent 1 (Resume Intelligence) &amp; Agent 2 (Target Role Analysis)
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Candidate Profile, Multimodal Resume &amp; Target Role Setup
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveSubTab('upload')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Resume Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('profile')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'profile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Edit Extracted Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('role')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'role'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Target Role &amp; Hours
            </button>
          </div>

          <button
            type="button"
            onClick={onLoadDemo}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Load Demo Profile
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs text-red-900">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Resume / Analysis Alert</span>
            <p className="mt-0.5 text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* SUB-TAB 1: MULTIMODAL RESUME UPLOAD */}
      {activeSubTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Upload Resume (PDF, Image, or Text)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gemini Multimodal AI reads PDFs, resume screenshots, or raw text and extracts verified skills without inventing data.
                </p>
              </div>
            </div>

            {/* Multimodal File Dropzone */}
            <label className="block border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60">
              <input
                type="file"
                accept=".pdf,image/png,image/jpeg,image/webp,.txt,.md"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-900">
                {selectedFile
                  ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                  : 'Click to upload PDF, PNG/JPG Resume Image, or TXT file'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF documents, scanned resume images, and plain text files
              </p>
            </label>

            {selectedFile && (
              <div className="flex items-center justify-between px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <span className="font-medium truncate">
                  Ready for Multimodal Extraction: {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-blue-700 hover:underline font-semibold ml-3 cursor-pointer"
                >
                  Clear File
                </button>
              </div>
            )}

            {/* Text Area Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Or Paste / Edit Resume Text Directly
                </label>
                <button
                  type="button"
                  onClick={() => setResumeTextInput(SAMPLE_RESUME_TEXT)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Reset to Sample B.Tech Data Science Resume
                </button>
              </div>
              <textarea
                rows={11}
                value={resumeTextInput}
                onChange={(e) => setResumeTextInput(e.target.value)}
                placeholder="Paste your full resume text here (Education, Technical Skills, Projects, Internships, Certifications)..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleExtractResume}
                disabled={isParsingResume}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                {isParsingResume ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running Agent 1: Extracting Resume Intelligence...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Run Resume Intelligence Agent</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('role')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Target Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Current Structured JSON Snapshot */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Agent 1 Output · Structured Candidate Profile
                </h3>
                <p className="text-xs text-slate-500">
                  Source: {profile.resume_file_name || 'Current Profile'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('profile')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Edit Fields →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-slate-500 block">Candidate &amp; Degree</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {profile.name}
                  </span>
                  <span className="text-slate-600 mt-0.5 block">
                    {profile.education_level}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-slate-500 block">Experience Level</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {profile.experience_level}
                  </span>
                  <span className="text-blue-700 font-medium mt-0.5 block">
                    Target: {profile.target_role}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">
                  Extracted Technical Skills ({profile.technical_skills.length})
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {profile.technical_skills.join(' · ') || 'None detected'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">
                  Extracted Projects ({profile.projects.length})
                </span>
                <div className="space-y-2">
                  {profile.projects.map((p, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                      <div className="font-semibold text-slate-900">{p.title}</div>
                      <div className="text-slate-600 mt-0.5">{p.description}</div>
                      <div className="text-slate-500 mt-1 font-mono text-[11px]">
                        Tech: {p.technologies.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {profile.missing_information.length > 0 && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                  <span className="font-semibold text-amber-900 block mb-1">
                    Missing or Unclear Information Detected by Agent 1
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    {profile.missing_information.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: EDIT EXTRACTED CANDIDATE PROFILE (HUMAN-IN-THE-LOOP) */}
      {activeSubTab === 'profile' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Verify &amp; Edit Extracted Candidate Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI Safety Guarantee: You have full control to edit, add, or remove any extracted skill, education detail, or project before running downstream career agents.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubTab('role')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Save &amp; Select Target Role →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Education Level
              </label>
              <input
                type="text"
                value={profile.education_level}
                onChange={(e) =>
                  onUpdateProfile({ ...profile, education_level: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Experience Level
              </label>
              <select
                value={profile.experience_level}
                onChange={(e) =>
                  onUpdateProfile({ ...profile, experience_level: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Fresher (0 Years Formal Work Experience)">
                  Fresher (0 Years Formal Work Experience)
                </option>
                <option value="Internship Experience (3–12 Months)">
                  Internship Experience (3–12 Months)
                </option>
                <option value="Junior Professional (1–2 Years)">
                  Junior Professional (1–2 Years)
                </option>
                <option value="Mid-Level (2–4 Years)">Mid-Level (2–4 Years)</option>
                <option value="Career Switcher">Career Switcher</option>
              </select>
            </div>
          </div>

          {/* Technical Skills Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-800">
                Technical Skills (Click any skill to remove, or add below)
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.technical_skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleRemoveTechSkill(skill)}
                    title="Click to remove skill"
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-800 rounded-md border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{skill}</span>
                    <span className="text-slate-400">×</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTechSkill()}
                  placeholder="Add technical skill (e.g., Tableau, PySpark, dbt)..."
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTechSkill}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Soft Skills Editor */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-800">
                Soft &amp; Business Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.soft_skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      onUpdateProfile({
                        ...profile,
                        soft_skills: profile.soft_skills.filter((s) => s !== skill),
                      })
                    }
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-800 rounded-md border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{skill}</span>
                    <span className="text-slate-400">×</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSoftSkillInput}
                  onChange={(e) => setNewSoftSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSoftSkill()}
                  placeholder="Add soft skill (e.g., Stakeholder Storytelling)..."
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSoftSkill}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Projects Editor */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-800">
              Candidate Projects ({profile.projects.length})
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Remove project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 mt-1">{proj.description}</p>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-200/60">
                    Technologies: {proj.technologies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Project Row */}
            <div className="p-4 bg-slate-50/60 border border-slate-200 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-3">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  New Project Title
                </label>
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g., E-Commerce Cohort Pipeline"
                  className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs"
                />
              </div>
              <div className="md:col-span-5">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Description &amp; Findings
                </label>
                <input
                  type="text"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="What problem did you solve and how?"
                  className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Technologies (comma-sep)
                </label>
                <input
                  type="text"
                  value={newProjectTech}
                  onChange={(e) => setNewProjectTech(e.target.value)}
                  placeholder="SQL, Python, Power BI"
                  className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="w-full py-1.5 px-3 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800 cursor-pointer"
                >
                  + Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TARGET ROLE & STUDY COMMITMENT + COMPETENCY MATRIX */}
      {activeSubTab === 'role' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Select Target Career Role &amp; Weekly Study Availability
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose a target role and weekly study budget, then trigger the Multi-Agent Career Intelligence Pipeline.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRunFullAnalysis(profile.target_role, profile.weekly_hours)}
                disabled={isRunningFullAnalysis}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
              >
                {isRunningFullAnalysis ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running 10-Agent Career Analysis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze &amp; Generate Career Action Plan</span>
                  </>
                )}
              </button>
            </div>

            {/* Study Hours Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-800">
                Available Weekly Study &amp; Project Hours
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STUDY_HOURS.map((option) => {
                  const isSelected = profile.weekly_hours === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onUpdateProfile({ ...profile, weekly_hours: option })}
                      className={`py-2.5 px-4 text-xs font-mono font-semibold rounded-lg border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Role Grid */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-800">
                  Select Target Career Role (Current: <span className="text-blue-600">{profile.target_role}</span>)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customRoleInput}
                    onChange={(e) => setCustomRoleInput(e.target.value)}
                    placeholder="Or enter custom role..."
                    className="rounded-lg border border-slate-300 px-3 py-1 text-xs"
                  />
                  {customRoleInput.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateProfile({
                          ...profile,
                          target_role: customRoleInput.trim(),
                        });
                        setCustomRoleInput('');
                      }}
                      className="px-3 py-1 text-xs font-semibold bg-slate-900 text-white rounded-lg cursor-pointer"
                    >
                      Set Role
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {AVAILABLE_TARGET_ROLES.map((item) => {
                  const isSelected = profile.target_role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() =>
                        onUpdateProfile({ ...profile, target_role: item.role })
                      }
                      className={`text-left p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-600'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{item.category}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">
                          {item.role}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.tagline}
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-500 border-t border-slate-200/70 pt-2">
                        {item.core_focus.join(' · ')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Agent 2: Target Role Competency Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  Agent 2 · Target Role Competency Matrix
                </p>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Competency Categories for {roleAnalysis.role}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl">
                  {roleAnalysis.disclaimer}
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
                {['All', 'Required', 'Important', 'Nice to Have'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setImportanceFilter(tier)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      importanceFilter === tier
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
              <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-50 text-[11px] font-semibold text-slate-500">
                <div className="col-span-3">Competency Category</div>
                <div className="col-span-2">Tier</div>
                <div className="col-span-3">Representative Skills</div>
                <div className="col-span-4">Industry Rationale</div>
              </div>
              {filteredCompetencies.map((comp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 px-4 py-3 text-xs items-start hover:bg-slate-50/70 transition-colors"
                >
                  <div className="md:col-span-3 font-semibold text-slate-900">
                    {comp.category}
                  </div>
                  <div className="md:col-span-2">
                    <span
                      className={`font-semibold ${
                        comp.importance === 'Required'
                          ? 'text-blue-700'
                          : comp.importance === 'Important'
                          ? 'text-emerald-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {comp.importance}
                    </span>
                  </div>
                  <div className="md:col-span-3 text-slate-800">
                    {comp.skills.join(' · ')}
                  </div>
                  <div className="md:col-span-4 text-slate-600 leading-relaxed">
                    {comp.rationale}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
