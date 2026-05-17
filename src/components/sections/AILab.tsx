'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Beaker, Lock, ArrowRight } from 'lucide-react';

const experiments = [
  {
    title: 'Multi-Agent Orchestration Demo',
    description: 'Live demo of autonomous AI agents collaborating on enterprise tasks.',
    status: 'coming-soon',
    category: 'Agentic AI',
  },
  {
    title: 'Voice AI Playground',
    description: 'Interactive STT/TTS demo with real-time conversation.',
    status: 'coming-soon',
    category: 'Voice AI',
  },
  {
    title: 'RAG Pipeline Visualizer',
    description: 'See how enterprise documents are chunked, embedded, and retrieved.',
    status: 'coming-soon',
    category: 'RAG',
  },
  {
    title: 'Prompt Engineering Workshop',
    description: 'Interactive prompt engineering exercises with Gemini.',
    status: 'coming-soon',
    category: 'Prompt Engineering',
  },
];

export default function AILab() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="ai-lab" className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/50 via-transparent to-[#0d0d1a]/50" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-[#00d4ff]/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00d4ff]">
            AI Lab
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 text-3xl font-bold text-white sm:text-4xl"
        >
          Experimental Playground
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 max-w-2xl text-base text-white/40"
        >
          Interactive AI demos and experiments showcasing enterprise AI capabilities.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="neon-border group relative overflow-hidden rounded-2xl bg-[#0d0d1a] p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/5">
                  <Beaker size={18} className="text-[#00d4ff]" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-[#ffaa00]/20 bg-[#ffaa00]/5 px-3 py-1 font-mono text-[10px] text-[#ffaa00]">
                  <Lock size={10} />
                  Coming Soon
                </span>
              </div>

              <div className="mt-4">
                <span className="font-mono text-[10px] text-[#00d4ff]/60">{exp.category}</span>
                <h3 className="mt-1 text-lg font-bold text-white/80">{exp.title}</h3>
                <p className="mt-2 text-sm text-white/40">{exp.description}</p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs text-white/20">
                <span>Notify me when live</span>
                <ArrowRight size={12} />
              </div>

              {/* Disabled overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
