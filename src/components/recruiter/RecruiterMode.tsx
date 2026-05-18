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
        transition={{ delay: 2, duration: 0.6 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-2xl border border-[#ffaa00]/15 bg-[#ffaa00]/5 px-3 py-2 text-xs font-medium text-[#ffaa00]/80 shadow-xl shadow-[#ffaa00]/5 backdrop-blur-xl transition-all duration-500 hover:border-[#ffaa00]/30 hover:bg-[#ffaa00]/10 hover:text-[#ffaa00] hover:shadow-2xl hover:shadow-[#ffaa00]/10 sm:bottom-6 sm:left-6 sm:px-4 sm:py-2.5 sm:text-sm"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-[#050510]/90 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#0a0a14]/95 backdrop-blur-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.04] bg-[#0a0a18]/90 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#ffaa00]/15 bg-[#ffaa00]/5">
                    <BarChart3 size={14} className="text-[#ffaa00]/80" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">Recruiter Mode</div>
                    <div className="font-mono text-[10px] text-[#ffaa00]/60">
                      AI-Powered Fit Analysis
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-white/30 transition-all duration-300 hover:bg-white/5 hover:text-white/60"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {!analysis ? (
                  <div className="space-y-6">
                    {/* JD Input */}
                    <div>
                      <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                        Paste Job Description
                      </label>
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        rows={10}
                        className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-500 placeholder:text-white/20 focus:border-[#ffaa00]/15 focus:shadow-[0_0_20px_rgba(255,170,0,0.05)]"
                        placeholder="Paste the job description here to analyze fit..."
                      />
                    </div>

                    {/* File upload */}
                    <div className="flex items-center gap-4">
                      <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white/40 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.05]">
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffaa00]/20 bg-[#ffaa00]/8 px-6 py-3.5 text-sm font-medium text-[#ffaa00] transition-all duration-500 hover:border-[#ffaa00]/40 hover:bg-[#ffaa00]/15 hover:shadow-[0_0_30px_rgba(255,170,0,0.1)] disabled:opacity-20"
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
                    <div className="card-glass rounded-2xl p-8 text-center">
                      <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white/30">
                        Fit Score
                      </div>
                      <div className="relative mx-auto mb-4 h-36 w-36">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="6"
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
                            strokeWidth="6"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: '0 251.2' }}
                            animate={{
                              strokeDasharray: `${(analysis.fitScore / 100) * 251.2} 251.2`,
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white/90">
                            {analysis.fitScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="card-glass rounded-xl p-5">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#00ff88]/80">
                        <CheckCircle size={14} />
                        Strengths
                      </h4>
                      <ul className="space-y-2.5">
                        {analysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ff88]/50" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gaps */}
                    {analysis.gaps.length > 0 && (
                      <div className="card-glass rounded-xl p-5">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#ffaa00]/80">
                          <AlertTriangle size={14} />
                          Potential Gaps
                        </h4>
                        <ul className="space-y-2.5">
                          {analysis.gaps.map((g, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffaa00]/50" />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Matching */}
                    {analysis.matchingSkills.length > 0 && (
                      <div className="card-glass rounded-xl p-5">
                        <h4 className="mb-4 text-sm font-semibold text-[#00d4ff]/80">
                          Matching Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.matchingSkills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-[#00d4ff]/10 bg-[#00d4ff]/4 px-3 py-1 font-mono text-xs text-[#00d4ff]/70"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysis.matchingProjects.length > 0 && (
                      <div className="card-glass rounded-xl p-5">
                        <h4 className="mb-4 text-sm font-semibold text-[#00d4ff]/80">
                          Relevant Projects
                        </h4>
                        <ul className="space-y-2.5">
                          {analysis.matchingProjects.map((p) => (
                            <li key={p} className="flex items-center gap-2.5 text-sm text-white/50">
                              <FileText size={12} className="text-[#00d4ff]/40" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ATS PDF Download */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                        Generate ATS Resume
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                        {['Recruiter', 'Consulting', 'Technical'].map((type) => (
                          <button
                            key={type}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs text-white/40 transition-all duration-500 hover:border-[#00d4ff]/15 hover:bg-[#00d4ff]/[0.03] hover:text-[#00d4ff]/80"
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
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-sm text-white/40 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.05]"
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
