'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Shield,
  FileText,
  Award,
  Minimize2,
} from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { chatbotStarters } from '@/data/resume';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: Date;
}

const defaultResponses: Record<string, { answer: string; sources: string[] }> = {
  'voice ai': {
    answer:
      'Yes! Animesh has extensive Voice AI experience. He built the Bell.ca multilingual voice & chat assistant at Capgemini using GCP CCAI, and integrated Twilio and Dialogflow telephony pipelines at Quantiphi to deploy real-time voice bots with robust STT/TTS layers. He also built a Voice AI Copilot — a real-time speech assistant integrated with CRM and knowledge systems.',
    sources: ['Resume', 'LinkedIn'],
  },
  'vertex ai': {
    answer:
      'Absolutely. Animesh is a certified Google Cloud Vertex AI Engineer. At Capgemini, he architects production-grade AI agent ecosystems using Vertex AI and LangGraph. At Quantiphi, he designed LLM-powered RAG retrieval assistants using Vertex AI and built enterprise conversational agents with Vertex AI and CCAI, achieving a 28% increase in automated user containment.',
    sources: ['Resume', 'Certifications', 'LinkedIn'],
  },
  'enterprise': {
    answer:
      'Animesh has 5+ years leading enterprise AI deployments across fintech (ICICI Prudential), telecom (Bell.ca), insurance (Farmer\'s, Hub International), public sector (Government of Odisha), and pharma (Pfizer). He specializes in scaling production-grade conversational AI, agentic workflows, and RAG systems on GCP.',
    sources: ['Resume', 'LinkedIn'],
  },
  'telecom': {
    answer:
      'Animesh has significant telecom experience. At Capgemini, he delivered the Bell.ca multilingual multi-channel chat and voice assistant infrastructure using GCP CCAI, reducing agent dependency by 30%. At Quantiphi, he also worked on telecom projects including Ooredoo and Breezeline.',
    sources: ['Resume', 'LinkedIn'],
  },
  'architect': {
    answer:
      'Animesh is well-suited for AI architect roles. He currently architects production-grade, autonomous AI agent ecosystems at Capgemini. His experience spans designing multi-agent systems with planning layers, memory systems, and tool execution; engineering RAG pipelines with advanced embedding and ranking; and scaling enterprise conversational AI across multiple domains.',
    sources: ['Resume', 'LinkedIn', 'GitHub'],
  },
};

function findResponse(query: string): { answer: string; sources: string[] } {
  const lower = query.toLowerCase();
  for (const [key, value] of Object.entries(defaultResponses)) {
    if (lower.includes(key)) return value;
  }
  return {
    answer:
      "Based on Animesh's verified professional data: He is a Senior GenAI Engineer with 5+ years of experience in Conversational AI, GCP, Vertex AI, Dialogflow CX, Voice AI, and Agentic AI. He has delivered production deployments across fintech, telecom, healthcare, and public sector. Would you like to know about a specific area of his expertise?",
    sources: ['Resume', 'LinkedIn'],
  };
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 1500;
    setTimeout(() => {
      const response = findResponse(query);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const sourceIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    Resume: FileText,
    LinkedIn: FaLinkedinIn,
    GitHub: FaGithub,
    Certifications: Award,
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff] shadow-lg shadow-[#00d4ff]/10 backdrop-blur-sm transition-all hover:bg-[#00d4ff]/20 hover:shadow-xl hover:shadow-[#00d4ff]/20"
            aria-label="Open AI Chat"
          >
            <MessageSquare size={22} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00ff88]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-[#0d0d1a] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#00d4ff]/30 bg-[#00d4ff]/10">
                  <MessageSquare size={14} className="text-[#00d4ff]" />
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0d0d1a] bg-[#00ff88]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Talk to Animesh</div>
                  <div className="font-mono text-[10px] text-[#00ff88]">AI Assistant • Online</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.length === 0 && (
                <div className="space-y-4">
                  {/* Welcome */}
                  <div className="rounded-xl border border-white/5 bg-white/3 p-4 text-center">
                    <div className="mb-2 text-2xl">🤖</div>
                    <h3 className="mb-1 text-sm font-semibold text-white">
                      Talk to Animesh&apos;s AI
                    </h3>
                    <p className="text-xs text-white/40">
                      Ask about experience, skills, projects, or hiring.
                    </p>
                  </div>

                  {/* Trust badge */}
                  <div className="flex items-center gap-2 rounded-lg border border-[#00d4ff]/10 bg-[#00d4ff]/5 px-3 py-2">
                    <Shield size={12} className="shrink-0 text-[#00d4ff]" />
                    <span className="text-[10px] text-[#00d4ff]/80">
                      Responses are generated from verified professional data only.
                    </span>
                  </div>

                  {/* Starter prompts */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                      Suggested Questions
                    </span>
                    {chatbotStarters.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="block w-full rounded-lg border border-white/5 bg-white/3 px-4 py-2.5 text-left text-xs text-white/60 transition-all hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/5 hover:text-white/80"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-[#00d4ff]/10 text-white'
                        : 'border border-white/5 bg-white/3 text-white/80'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/5 pt-2">
                        {msg.sources.map((source) => {
                          const Icon = sourceIcons[source] || FileText;
                          return (
                            <span
                              key={source}
                              className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/40"
                            >
                              <Icon size={8} />
                              {source}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/5 bg-white/3 px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="h-2 w-2 rounded-full bg-[#00d4ff]/60"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-[#00d4ff]/60"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-[#00d4ff]/60"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-white/5 bg-[#0d0d1a] p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Animesh..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#00d4ff]/30"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20 disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
