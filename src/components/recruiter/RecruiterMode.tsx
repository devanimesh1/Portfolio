'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Download,
  Sparkles,
} from 'lucide-react';
import { skills, projects } from '@/data/resume';

interface AnalysisResult {
  fitScore: number;
  strengths: string[];
  gaps: string[];
  matchingProjects: string[];
  matchingSkills: string[];
}

function analyzeJD(jdText: string): AnalysisResult {
  const lower = jdText.toLowerCase();
  const matchingSkills = skills
    .filter((s) => lower.includes(s.name.toLowerCase()))
    .map((s) => s.name);

  const matchingProjectsList = projects
    .filter((p) =>
      p.technologies.some((t) => lower.includes(t.toLowerCase())) ||
      lower.includes(p.domain.toLowerCase())
    )
    .map((p) => p.title);

  const strengths: string[] = [];
  const gaps: string[] = [];

  if (lower.includes('gcp') || lower.includes('google cloud'))
    strengths.push('Strong GCP expertise with 5+ years');
  if (lower.includes('conversational ai') || lower.includes('chatbot'))
    strengths.push('Deep conversational AI experience across industries');
  if (lower.includes('voice') || lower.includes('stt') || lower.includes('tts'))
    strengths.push('Production voice AI deployment experience');
  if (lower.includes('vertex') || lower.includes('gemini'))
    strengths.push('Certified Vertex AI Engineer');
  if (lower.includes('rag') || lower.includes('retrieval'))
    strengths.push('Enterprise RAG pipeline architecture');
  if (lower.includes('agent') || lower.includes('agentic'))
    strengths.push('Multi-agent system design and deployment');
  if (lower.includes('python')) strengths.push('Strong Python development skills');
  if (lower.includes('langchain') || lower.includes('langgraph'))
    strengths.push('LangChain/LangGraph orchestration experience');

  if (lower.includes('aws') && !lower.includes('gcp'))
    gaps.push('Primary cloud experience is GCP (limited AWS)');
  if (lower.includes('azure'))
    gaps.push('No Azure experience listed');
  if (lower.includes('react') || lower.includes('frontend'))
    gaps.push('Backend/AI focused — limited frontend experience');
  if (lower.includes('java ') || lower.includes('scala'))
    gaps.push('Primary language is Python, not Java/Scala');

  if (strengths.length === 0) strengths.push('Broad AI/ML experience applicable to this role');
  if (gaps.length === 0) gaps.push('No significant gaps identified');

  const fitScore = Math.min(
    98,
    Math.max(45, 50 + strengths.length * 8 + matchingSkills.length * 3 - gaps.length * 5)
  );

  return {
    fitScore,
    strengths,
    gaps,
    matchingProjects: matchingProjectsList,
    matchingSkills,
  };
}

export default function RecruiterMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [jdText, setJdText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeJD(jdText));
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setJdText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <>
      {/* Trigger in navbar or floating */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-[#ffaa00]/30 bg-[#ffaa00]/10 px-4 py-2.5 text-sm font-medium text-[#ffaa00] shadow-lg backdrop-blur-sm transition-all hover:bg-[#ffaa00]/20"
      >
        <Sparkles size={16} />
        <span className="hidden sm:inline">Recruiter Mode</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a14]"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0d0d1a] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ffaa00]/30 bg-[#ffaa00]/10">
                    <BarChart3 size={14} className="text-[#ffaa00]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Recruiter Mode</div>
                    <div className="font-mono text-[10px] text-[#ffaa00]">
                      AI-Powered Fit Analysis
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {!analysis ? (
                  <div className="space-y-6">
                    {/* JD Input */}
                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white/40">
                        Paste Job Description
                      </label>
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        rows={10}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#ffaa00]/30"
                        placeholder="Paste the job description here to analyze fit..."
                      />
                    </div>

                    {/* File upload */}
                    <div className="flex items-center gap-4">
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition-all hover:bg-white/8">
                        <Upload size={14} />
                        Upload JD (.txt)
                        <input
                          type="file"
                          accept=".txt,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={!jdText.trim() || isAnalyzing}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffaa00]/30 bg-[#ffaa00]/10 px-6 py-3 text-sm font-medium text-[#ffaa00] transition-all hover:bg-[#ffaa00]/20 disabled:opacity-30"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Sparkles size={16} />
                          </motion.div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Analyze Fit
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Fit Score */}
                    <div className="rounded-2xl border border-white/5 bg-[#0d0d1a] p-6 text-center">
                      <div className="mb-2 font-mono text-xs uppercase tracking-wider text-white/40">
                        Fit Score
                      </div>
                      <div className="relative mx-auto mb-4 h-32 w-32">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="8"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={
                              analysis.fitScore >= 80
                                ? '#00ff88'
                                : analysis.fitScore >= 60
                                ? '#ffaa00'
                                : '#ff4466'
                            }
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: '0 251.2' }}
                            animate={{
                              strokeDasharray: `${(analysis.fitScore / 100) * 251.2} 251.2`,
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">
                            {analysis.fitScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="rounded-xl border border-white/5 bg-[#0d0d1a] p-5">
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#00ff88]">
                        <CheckCircle size={14} />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ff88]/60" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gaps */}
                    {analysis.gaps.length > 0 && (
                      <div className="rounded-xl border border-white/5 bg-[#0d0d1a] p-5">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#ffaa00]">
                          <AlertTriangle size={14} />
                          Potential Gaps
                        </h4>
                        <ul className="space-y-2">
                          {analysis.gaps.map((g, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffaa00]/60" />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Matching */}
                    {analysis.matchingSkills.length > 0 && (
                      <div className="rounded-xl border border-white/5 bg-[#0d0d1a] p-5">
                        <h4 className="mb-3 text-sm font-semibold text-[#00d4ff]">
                          Matching Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.matchingSkills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-3 py-1 font-mono text-xs text-[#00d4ff]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysis.matchingProjects.length > 0 && (
                      <div className="rounded-xl border border-white/5 bg-[#0d0d1a] p-5">
                        <h4 className="mb-3 text-sm font-semibold text-[#00d4ff]">
                          Relevant Projects
                        </h4>
                        <ul className="space-y-2">
                          {analysis.matchingProjects.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm text-white/60">
                              <FileText size={12} className="text-[#00d4ff]/60" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ATS PDF Download */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-white/40">
                        Generate ATS Resume
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {['Recruiter', 'Consulting', 'Technical'].map((type) => (
                          <button
                            key={type}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60 transition-all hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/5 hover:text-[#00d4ff]"
                          >
                            <Download size={12} />
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setAnalysis(null);
                        setJdText('');
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/60 transition-all hover:bg-white/8"
                    >
                      Analyze Another JD
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
