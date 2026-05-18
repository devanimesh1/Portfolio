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

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function AILab() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="ai-lab" className="section-glow vibrant-bg-1 relative overflow-hidden bg-[#050510] py-16 sm:py-24 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-transparent to-[#0a0a18]/60" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          custom={0}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#00d4ff]/60 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]/80">
            AI Lab
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Experimental Playground
        </motion.h2>

        <motion.p
          custom={2}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 max-w-2xl text-sm text-white/35 sm:mb-16 sm:text-base lg:text-lg"
        >
          Interactive AI demos and experiments showcasing enterprise AI capabilities.
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              custom={3 + i}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="card-glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/5 transition-all duration-500 group-hover:border-[#00d4ff]/25 group-hover:bg-[#00d4ff]/10">
                  <Beaker size={18} className="text-[#00d4ff]/70" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-[#ffaa00]/15 bg-[#ffaa00]/5 px-3 py-1 font-mono text-[10px] text-[#ffaa00]/80">
                  <Lock size={10} />
                  Coming Soon
                </span>
              </div>

              <div className="mt-5">
                <span className="font-mono text-[10px] text-[#00d4ff]/50">{exp.category}</span>
                <h3 className="mt-1.5 text-lg font-bold text-white/80">{exp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/35">{exp.description}</p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-xs text-white/20 transition-all duration-500 group-hover:gap-2.5 group-hover:text-white/40">
                <span>Notify me when live</span>
                <ArrowRight size={12} />
              </div>

              {/* Disabled overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/30 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
