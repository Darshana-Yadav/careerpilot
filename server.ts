import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import {
  buildResumeExtractionPrompt,
  buildFullCareerIntelligencePrompt,
  buildJobDescriptionAnalysisPrompt,
  buildCopilotPrompt,
} from './src/lib/promptTemplates.ts';
import { computeTransparentJobFitScore } from './src/lib/scoringEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_NAME = 'gemini-3.8-flash';

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please verify your API key in Settings > Secrets.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support base64 PDF and image uploads up to 25MB
  app.use(express.json({ limit: '25mb' }));

  // ============================================================================
  // AGENT 1: RESUME INTELLIGENCE AGENT (Multimodal PDF / Image / Text)
  // ============================================================================
  app.post('/api/agents/parse-resume', async (req, res) => {
    try {
      const { rawText, fileBase64, mimeType, fileName } = req.body;
      if (!rawText && !fileBase64) {
        res.status(400).json({
          error: 'Please provide resume text or upload a PDF/image file.',
        });
        return;
      }

      const ai = getGenAIClient();
      const parts: any[] = [];

      if (fileBase64 && mimeType) {
        parts.push({
          inlineData: {
            data: fileBase64,
            mimeType,
          },
        });
      }

      parts.push({
        text: buildResumeExtractionPrompt(rawText),
      });

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              is_readable: {
                type: Type.BOOLEAN,
                description: 'True if the resume contains readable candidate information.',
              },
              unreadable_reason: {
                type: Type.STRING,
                description: 'If is_readable is false, explain why the document could not be parsed.',
              },
              name: { type: Type.STRING },
              headline: { type: Type.STRING },
              education_level: { type: Type.STRING },
              experience_level: { type: Type.STRING },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    degree: { type: Type.STRING },
                    institution: { type: Type.STRING },
                    year: { type: Type.STRING },
                    details: { type: Type.STRING },
                  },
                  required: ['degree', 'institution', 'year'],
                },
              },
              technical_skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              soft_skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    technologies: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    outcomes: { type: Type.STRING },
                  },
                  required: ['title', 'description', 'technologies'],
                },
              },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    role: { type: Type.STRING },
                    company: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    highlights: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['role', 'company', 'duration', 'highlights'],
                },
              },
              certifications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              achievements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              technologies: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              missing_information: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              extracted_raw_text: {
                type: Type.STRING,
                description: 'Clean text summary of the resume content.',
              },
            },
            required: [
              'is_readable',
              'name',
              'education_level',
              'experience_level',
              'education',
              'technical_skills',
              'soft_skills',
              'projects',
              'experience',
              'certifications',
              'achievements',
              'technologies',
              'strengths',
              'missing_information',
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response received from Resume Intelligence Agent.');
      }

      const parsed = JSON.parse(text.trim());
      if (parsed.is_readable === false) {
        res.status(422).json({
          error:
            parsed.unreadable_reason ||
            'The uploaded resume appears unreadable or does not contain recognizable career profile information. Please upload a clear PDF, image, or text resume.',
        });
        return;
      }

      res.json({
        profile: {
          ...parsed,
          resume_file_name: fileName || 'Uploaded_Resume',
          raw_resume_text: rawText || parsed.extracted_raw_text || '',
        },
      });
    } catch (error: any) {
      console.error('Error in /api/agents/parse-resume:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Failed to parse resume with Gemini API. Please check your file or try again.',
      });
    }
  });

  // ============================================================================
  // MULTI-AGENT FULL CAREER INTELLIGENCE PIPELINE (Agents 2, 5, 6, 7, 8, 9)
  // ============================================================================
  app.post('/api/agents/full-analysis', async (req, res) => {
    try {
      const { profile, targetRole, weeklyHours } = req.body;
      if (!profile || !targetRole) {
        res.status(400).json({
          error: 'Candidate profile and target role are required.',
        });
        return;
      }

      const ai = getGenAIClient();
      const prompt = buildFullCareerIntelligencePrompt(
        JSON.stringify(profile, null, 2),
        targetRole,
        weeklyHours || profile.weekly_hours || '10 hours/week'
      );

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              roleAnalysis: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  overview: { type: Type.STRING },
                  disclaimer: { type: Type.STRING },
                  competencies: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        category: { type: Type.STRING },
                        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                        importance: { type: Type.STRING },
                        rationale: { type: Type.STRING },
                      },
                      required: ['category', 'skills', 'importance', 'rationale'],
                    },
                  },
                  radar_benchmarks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        axis: { type: Type.STRING },
                        candidate_score: { type: Type.NUMBER },
                        target_benchmark: { type: Type.NUMBER },
                      },
                      required: ['axis', 'candidate_score', 'target_benchmark'],
                    },
                  },
                },
                required: ['role', 'overview', 'disclaimer', 'competencies', 'radar_benchmarks'],
              },
              skillGap: {
                type: Type.OBJECT,
                properties: {
                  skills_already_have: { type: Type.ARRAY, items: { type: Type.STRING } },
                  skills_to_strengthen: { type: Type.ARRAY, items: { type: Type.STRING } },
                  high_priority_gaps: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        skill: { type: Type.STRING },
                        category: { type: Type.STRING },
                        priority: { type: Type.STRING },
                        level: { type: Type.STRING },
                        why_it_matters: { type: Type.STRING },
                        learning_sequence: { type: Type.ARRAY, items: { type: Type.STRING } },
                        practical_project: { type: Type.STRING },
                        interview_topic: { type: Type.STRING },
                      },
                      required: [
                        'skill',
                        'category',
                        'priority',
                        'level',
                        'why_it_matters',
                        'learning_sequence',
                        'practical_project',
                        'interview_topic',
                      ],
                    },
                  },
                  summary_note: { type: Type.STRING },
                },
                required: [
                  'skills_already_have',
                  'skills_to_strengthen',
                  'high_priority_gaps',
                  'summary_note',
                ],
              },
              roadmap: {
                type: Type.OBJECT,
                properties: {
                  weekly_hours: { type: Type.STRING },
                  total_estimated_weeks: { type: Type.NUMBER },
                  thirty_day_sprint: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        week: { type: Type.STRING },
                        focus: { type: Type.STRING },
                        deliverable: { type: Type.STRING },
                      },
                      required: ['week', 'focus', 'deliverable'],
                    },
                  },
                  phases: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        phase_number: { type: Type.NUMBER },
                        phase_title: { type: Type.STRING },
                        goal: { type: Type.STRING },
                        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                        tasks: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              id: { type: Type.STRING },
                              title: { type: Type.STRING },
                              completed: { type: Type.BOOLEAN },
                            },
                            required: ['id', 'title', 'completed'],
                          },
                        },
                        project: { type: Type.STRING },
                        estimated_time: { type: Type.STRING },
                        completion_criteria: { type: Type.STRING },
                      },
                      required: [
                        'phase_number',
                        'phase_title',
                        'goal',
                        'skills',
                        'tasks',
                        'project',
                        'estimated_time',
                        'completion_criteria',
                      ],
                    },
                  },
                },
                required: ['weekly_hours', 'total_estimated_weeks', 'thirty_day_sprint', 'phases'],
              },
              projects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    business_problem: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                    dataset_requirements: { type: Type.STRING },
                    ai_component: { type: Type.STRING },
                    expected_output: { type: Type.STRING },
                    resume_bullet_suggestion: { type: Type.STRING },
                    skills_demonstrated: { type: Type.ARRAY, items: { type: Type.STRING } },
                    why_recommended: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'title',
                    'business_problem',
                    'difficulty',
                    'technologies',
                    'dataset_requirements',
                    'ai_component',
                    'expected_output',
                    'resume_bullet_suggestion',
                    'skills_demonstrated',
                    'why_recommended',
                  ],
                },
              },
              resumeReport: {
                type: Type.OBJECT,
                properties: {
                  resume_strength_score: { type: Type.NUMBER },
                  score_rationale: { type: Type.STRING },
                  customized_professional_summary: { type: Type.STRING },
                  problems_detected: { type: Type.ARRAY, items: { type: Type.STRING } },
                  improvement_suggestions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        issue: { type: Type.STRING },
                        category: { type: Type.STRING },
                        why_it_matters: { type: Type.STRING },
                        action_to_take: { type: Type.STRING },
                      },
                      required: ['issue', 'category', 'why_it_matters', 'action_to_take'],
                    },
                  },
                  bullet_rewrites: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        original_context: { type: Type.STRING },
                        improved_bullet: { type: Type.STRING },
                        formula_breakdown: {
                          type: Type.OBJECT,
                          properties: {
                            action: { type: Type.STRING },
                            technology: { type: Type.STRING },
                            task: { type: Type.STRING },
                            result: { type: Type.STRING },
                          },
                          required: ['action', 'technology', 'task', 'result'],
                        },
                      },
                      required: ['original_context', 'improved_bullet', 'formula_breakdown'],
                    },
                  },
                },
                required: [
                  'resume_strength_score',
                  'score_rationale',
                  'customized_professional_summary',
                  'problems_detected',
                  'improvement_suggestions',
                  'bullet_rewrites',
                ],
              },
              interviewQuestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    question: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    what_interviewer_is_testing: { type: Type.STRING },
                    key_points_to_include: { type: Type.ARRAY, items: { type: Type.STRING } },
                    example_answer_structure: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'category',
                    'topic',
                    'question',
                    'difficulty',
                    'what_interviewer_is_testing',
                    'key_points_to_include',
                    'example_answer_structure',
                  ],
                },
              },
              readiness: {
                type: Type.OBJECT,
                properties: {
                  skill_readiness: { type: Type.NUMBER },
                  portfolio_readiness: { type: Type.NUMBER },
                  resume_readiness: { type: Type.NUMBER },
                  interview_readiness: { type: Type.NUMBER },
                  explanation: { type: Type.STRING },
                  top_strength: { type: Type.STRING },
                  biggest_skill_gap: { type: Type.STRING },
                  recommended_flagship_project: { type: Type.STRING },
                  next_best_action_headline: { type: Type.STRING },
                },
                required: [
                  'skill_readiness',
                  'portfolio_readiness',
                  'resume_readiness',
                  'interview_readiness',
                  'explanation',
                  'top_strength',
                  'biggest_skill_gap',
                  'recommended_flagship_project',
                  'next_best_action_headline',
                ],
              },
              nextBestActions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    priority: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    impact_area: { type: Type.STRING },
                    estimated_effort: { type: Type.STRING },
                    why_now: { type: Type.STRING },
                    concrete_step: { type: Type.STRING },
                  },
                  required: [
                    'priority',
                    'title',
                    'impact_area',
                    'estimated_effort',
                    'why_now',
                    'concrete_step',
                  ],
                },
              },
            },
            required: [
              'roleAnalysis',
              'skillGap',
              'roadmap',
              'projects',
              'resumeReport',
              'interviewQuestions',
              'readiness',
              'nextBestActions',
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from Multi-Agent Career Intelligence Pipeline.');
      }

      const parsed = JSON.parse(text.trim());
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/agents/full-analysis:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Failed to run multi-agent career analysis. Please try again.',
      });
    }
  });

  // ============================================================================
  // AGENT 3 & 4: JOB DESCRIPTION ANALYZER & TRANSPARENT SCORING ENGINE
  // ============================================================================
  app.post('/api/agents/analyze-jd', async (req, res) => {
    try {
      const { profile, jdText, fileBase64, mimeType } = req.body;
      if (!profile || (!jdText && !fileBase64)) {
        res.status(400).json({
          error: 'Please provide a job description text or screenshot image.',
        });
        return;
      }

      const ai = getGenAIClient();
      const parts: any[] = [];

      if (fileBase64 && mimeType) {
        parts.push({
          inlineData: {
            data: fileBase64,
            mimeType,
          },
        });
      }

      parts.push({
        text: buildJobDescriptionAnalysisPrompt(
          JSON.stringify(profile, null, 2),
          jdText || ''
        ),
      });

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              job_title: { type: Type.STRING },
              company_name: { type: Type.STRING },
              extracted_jd_text: { type: Type.STRING },
              score_explanation: { type: Type.STRING },
              weighted_breakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    weight: { type: Type.NUMBER },
                    score: { type: Type.NUMBER },
                    explanation: { type: Type.STRING },
                  },
                  required: ['category', 'weight', 'score', 'explanation'],
                },
              },
              strong_matches: { type: Type.ARRAY, items: { type: Type.STRING } },
              partial_matches: { type: Type.ARRAY, items: { type: Type.STRING } },
              skill_gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
              missing_requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              extracted_details: {
                type: Type.OBJECT,
                properties: {
                  required_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  preferred_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  years_of_experience: { type: Type.STRING },
                  education_requirements: { type: Type.STRING },
                  responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  soft_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  domain_requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  potential_gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: [
                  'required_skills',
                  'preferred_skills',
                  'years_of_experience',
                  'education_requirements',
                  'responsibilities',
                  'technologies',
                  'soft_skills',
                  'domain_requirements',
                  'keywords',
                  'potential_gaps',
                ],
              },
              recommended_preparation: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'job_title',
              'company_name',
              'score_explanation',
              'weighted_breakdown',
              'strong_matches',
              'partial_matches',
              'skill_gaps',
              'missing_requirements',
              'extracted_details',
              'recommended_preparation',
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from Job Description Analysis Agent.');
      }

      const raw = JSON.parse(text.trim());
      const { overall_fit_score, weighted_breakdown } =
        computeTransparentJobFitScore(raw.weighted_breakdown || []);

      res.json({
        analysis: {
          id: `jd-${Date.now()}`,
          job_title: raw.job_title || 'Analyzed Target Role',
          company_name: raw.company_name || 'Target Employer',
          raw_text: jdText || raw.extracted_jd_text || 'Uploaded JD Image',
          analyzed_at: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          overall_fit_score,
          score_explanation: raw.score_explanation,
          weighted_breakdown,
          strong_matches: raw.strong_matches || [],
          partial_matches: raw.partial_matches || [],
          skill_gaps: raw.skill_gaps || [],
          missing_requirements: raw.missing_requirements || [],
          extracted_details: raw.extracted_details,
          recommended_preparation: raw.recommended_preparation || [],
        },
      });
    } catch (error: any) {
      console.error('Error in /api/agents/analyze-jd:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Failed to analyze job description. Please try again.',
      });
    }
  });

  // ============================================================================
  // AGENT 10: CAREERPILOT COPILOT (Profile-Aware Career Strategist)
  // ============================================================================
  app.post('/api/agents/copilot', async (req, res) => {
    try {
      const { contextSummary, message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }

      const ai = getGenAIClient();
      const prompt = buildCopilotPrompt(
        JSON.stringify(contextSummary, null, 2),
        message,
        history || []
      );

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description:
                  'Structured, high-signal markdown response grounded in the candidate profile.',
              },
              suggested_followups: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2 to 3 specific follow-up questions the user can click next.',
              },
            },
            required: ['reply', 'suggested_followups'],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from CareerPilot Copilot.');
      }

      res.json(JSON.parse(text.trim()));
    } catch (error: any) {
      console.error('Error in /api/agents/copilot:', error);
      res.status(500).json({
        error:
          error?.message ||
          'CareerPilot Copilot encountered an error. Please try again.',
      });
    }
  });

  // ============================================================================
  // VITE DEV MIDDLEWARE OR STATIC PROD ASSETS
  // ============================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerPilot AI server running on http://localhost:${PORT}`);
  });
}

startServer();
