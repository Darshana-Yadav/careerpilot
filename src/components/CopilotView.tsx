import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  RefreshCw,
  User,
  Bot,
  Trash2,
} from 'lucide-react';
import { CareerIntelligenceState, CopilotMessage } from '../types/career';

interface CopilotViewProps {
  state: CareerIntelligenceState;
  messages: CopilotMessage[];
  isSending: boolean;
  onSendMessage: (message: string) => Promise<void>;
  onClearChat: () => void;
}

const STARTER_PROMPTS = [
  'What should I learn next?',
  'Which skill gap should I prioritize?',
  'Is my resume suitable for this role?',
  'What project should I build?',
  'How can I improve my SQL?',
  'What questions might I be asked about my project?',
  'Create a 4-week preparation plan.',
];

export const CopilotView: React.FC<CopilotViewProps> = ({
  state,
  messages,
  isSending,
  onSendMessage,
  onClearChat,
}) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    setInput('');
    await onSendMessage(trimmed);
  };

  const handlePromptClick = async (promptText: string) => {
    if (isSending) return;
    await onSendMessage(promptText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar Context Panel */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-blue-600">
              Agent 10 · Profile-Grounded Strategist
            </p>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">
              CareerPilot Copilot
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Grounded in your active profile, extracted resume projects, target role competencies, and job-fit scores.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="font-semibold text-slate-900">
              Active Context Loaded:
            </div>
            <div className="text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Candidate:</span>{' '}
                <strong className="text-slate-800">{state.profile.name}</strong>
              </div>
              <div>
                <span className="text-slate-400">Target Role:</span>{' '}
                <strong className="text-blue-700">{state.profile.target_role}</strong>
              </div>
              <div>
                <span className="text-slate-400">Readiness Score:</span>{' '}
                <strong className="font-mono text-slate-900">
                  {state.readiness.overall_score}/100
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Resume Projects:</span>{' '}
                <span className="text-slate-700">
                  {state.profile.projects.map((p) => p.title).join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Priority Gaps:</span>{' '}
                <span className="text-amber-800 font-medium">
                  {state.skillGap.high_priority_gaps.map((g) => g.skill).join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">
              Strategic Prompt Starters:
            </span>
            <div className="flex flex-col gap-1.5">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isSending}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Main Copilot Conversation Workspace */}
      <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl flex flex-col h-[680px]">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                CareerPilot Copilot Session
              </h2>
              <p className="text-[11px] text-slate-500">
                Uses {state.profile.name}&apos;s verified resume &amp; {state.profile.target_role} roadmap
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearChat}
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Thread</span>
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  isUser ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-blue-50 border border-blue-200 text-blue-700'
                  }`}
                >
                  {isUser ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed space-y-3 ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {!isUser &&
                    msg.suggested_followups &&
                    msg.suggested_followups.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                        {msg.suggested_followups.map((followup, idx) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={isSending}
                            onClick={() => handlePromptClick(followup)}
                            className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
                          >
                            {followup} →
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 p-3 bg-slate-50 rounded-lg border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>
                CareerPilot Copilot is analyzing your {state.profile.target_role} profile...
              </span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about your ${state.profile.target_role} roadmap, resume bullets, SQL gaps, or projects...`}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
