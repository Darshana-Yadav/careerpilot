import React, { useState } from 'react';
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { InterviewQuestionItem } from '../types/career';

interface InterviewPrepViewProps {
  targetRole: string;
  questions: InterviewQuestionItem[];
  onAskCopilot: (question: string) => void;
}

const CATEGORIES = ['All', 'Technical', 'Project-Based', 'Behavioral', 'HR'] as const;

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({
  targetRole,
  questions,
  onAskCopilot,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    [questions[0]?.id || 'iq-tech-1']: true,
    [questions[3]?.id || 'iq-proj-1']: true,
  });
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [practicedIds, setPracticedIds] = useState<Record<string, boolean>>({});

  const filteredQuestions = questions.filter((q) =>
    selectedCategory === 'All' ? true : q.category === selectedCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePracticed = (id: string) => {
    setPracticedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const practicedCount = Object.values(practicedIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header & Category Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-600">
            Agent 9 · Personalized Interview Preparation Agent
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Role, Project &amp; Behavioral Interview Simulator ({targetRole})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tailored to your resume projects, target role competencies, and identified skill gaps · Practiced:{' '}
            <span className="font-mono font-semibold text-slate-800">
              {practicedCount}/{questions.length}
            </span>
          </p>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((item, idx) => {
          const isExpanded = !!expandedIds[item.id];
          const isPracticed = !!practicedIds[item.id];
          const draft = draftAnswers[item.id] || '';

          return (
            <div
              key={item.id || idx}
              className={`bg-white border rounded-xl overflow-hidden transition-colors ${
                isPracticed ? 'border-emerald-300' : 'border-slate-200'
              }`}
            >
              {/* Question Header Row */}
              <div className="p-5 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="text-left flex-1 space-y-1.5 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-bold text-blue-600">
                      Q0{idx + 1}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-800">
                      {item.category}
                    </span>
                    <span>·</span>
                    <span>{item.topic}</span>
                    <span>·</span>
                    <span
                      className={`font-medium ${
                        item.difficulty === 'Advanced'
                          ? 'text-amber-700'
                          : item.difficulty === 'Intermediate'
                          ? 'text-blue-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.question}
                  </h3>
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => togglePracticed(item.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isPracticed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isPracticed ? 'Practiced' : 'Mark Practiced'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                    aria-label="Toggle question details"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Answer Blueprint & Practice Scratchpad */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <span className="font-bold text-slate-900 block mb-1">
                          What the Interviewer is Testing
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {item.what_interviewer_is_testing}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 block mb-1.5">
                          Key Points to Include
                        </span>
                        <ul className="space-y-1.5 text-slate-700">
                          {item.key_points_to_include.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="font-mono text-blue-600 font-bold">
                                •
                              </span>
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                        <span className="font-bold text-slate-900 block">
                          Recommended Answer Structure (Non-Fabricated Framework)
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {item.example_answer_structure}
                        </p>
                      </div>

                      {/* Practice Scratchpad */}
                      <div className="space-y-2">
                        <label className="font-bold text-slate-800 block">
                          Practice Your Answer Outline:
                        </label>
                        <textarea
                          rows={3}
                          value={draft}
                          onChange={(e) =>
                            setDraftAnswers((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          placeholder="Draft your key talking points or SQL logic here..."
                          className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onAskCopilot(
                                draft.trim()
                                  ? `Please evaluate my practice answer for the interview question: "${item.question}". My draft answer is: "${draft}". Point out strengths and what technical or business detail to add.`
                                  : `Walk me through a concrete, high-scoring example answer structure for the interview question: "${item.question}" based on my current resume profile.`
                              )
                            }
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>
                              {draft.trim()
                                ? 'Critique My Answer in Copilot'
                                : 'Coach Me on This Question in Copilot'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
