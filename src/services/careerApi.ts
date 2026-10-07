import {
  CandidateProfile,
  JobDescriptionAnalysis,
  StudyHoursOption,
  TargetRoleName,
} from '../types/career';

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

export async function parseResumeWithAgent(params: {
  rawText?: string;
  file?: File;
}): Promise<Partial<CandidateProfile>> {
  let fileBase64: string | undefined;
  let mimeType: string | undefined;
  let rawText = params.rawText || '';

  if (params.file) {
    const file = params.file;
    if (
      file.type === 'text/plain' ||
      file.name.endsWith('.txt') ||
      file.name.endsWith('.md')
    ) {
      const textContent = await fileToText(file);
      rawText = rawText ? `${rawText}\n\n${textContent}` : textContent;
    } else {
      fileBase64 = await fileToBase64(file);
      mimeType = file.type || 'application/pdf';
    }
  }

  const response = await fetch('/api/agents/parse-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rawText,
      fileBase64,
      mimeType,
      fileName: params.file?.name,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to parse resume.');
  }

  return data.profile;
}

export async function runFullCareerIntelligencePipeline(params: {
  profile: CandidateProfile;
  targetRole: TargetRoleName;
  weeklyHours: StudyHoursOption;
}) {
  const response = await fetch('/api/agents/full-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to execute career intelligence pipeline.');
  }

  return data;
}

export async function analyzeJobDescriptionWithAgent(params: {
  profile: CandidateProfile;
  jdText?: string;
  file?: File;
}): Promise<JobDescriptionAnalysis> {
  let fileBase64: string | undefined;
  let mimeType: string | undefined;

  if (params.file) {
    fileBase64 = await fileToBase64(params.file);
    mimeType = params.file.type || 'image/png';
  }

  const response = await fetch('/api/agents/analyze-jd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile: params.profile,
      jdText: params.jdText,
      fileBase64,
      mimeType,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to analyze job description.');
  }

  return data.analysis;
}

export async function askCareerPilotCopilot(params: {
  contextSummary: any;
  message: string;
  history: { role: string; content: string }[];
}): Promise<{ reply: string; suggested_followups: string[] }> {
  const response = await fetch('/api/agents/copilot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to get response from CareerPilot Copilot.');
  }

  return data;
}
