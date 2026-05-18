'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { personalInfo } from '@/data/resume';
import { MapPin, Zap, Globe, Brain } from 'lucide-react';

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About() {
  const { ref, isInView } = useInView(0.15);

  const highlights = [
    {
      icon: Brain,
      title: 'Conversational AI Expert',
      desc: 'Dialogflow CX, IBM Watson, CCAI — enterprise-scale chatbot & voice systems.',
    },
    {
      icon: Zap,
      title: 'Agentic AI Pioneer',
      desc: 'Multi-agent systems with LangGraph, Vertex AI — autonomous enterprise workflows.',
    },
    {
      icon: Globe,
      title: 'GCP Specialist',
      desc: 'Google Cloud Expert Services, Cloud Run, Vertex AI Search & Conversation.',
    },
    {
      icon: MapPin,
      title: 'Cross-Domain Delivery',
      desc: 'Fintech, Telecom, Healthcare, Insurance, Public Sector — production deployments.',
    },
  ];

  return (
    <section id="about" className="section-glow aurora-bg relative overflow-hidden bg-[#050510] py-16 sm:py-24 lg:py-36">
      <div className="absolute inset-0 grid-bg opacity-15" />

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
            About
          </span>
        </motion.div>

        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.h2
              custom={1}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-6 text-2xl font-bold leading-tight text-white sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Engineering AI Systems
              <br />
              <span className="text-white/30">That Scale in Production</span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-6 text-sm leading-relaxed text-white/45 sm:mb-8 sm:text-base lg:text-lg"
            >
              {personalInfo.summary}
            </motion.p>

            <motion.div
              custom={3}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2"
            >
              {personalInfo.coreExpertise.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#00d4ff]/10 bg-[#00d4ff]/4 px-3.5 py-1.5 font-mono text-[11px] text-[#00d4ff]/70 transition-all duration-300 hover:border-[#00d4ff]/25 hover:bg-[#00d4ff]/8"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={2 + i}
                variants={sectionFade}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="card-glass group rounded-2xl p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/5 transition-all duration-500 group-hover:border-[#00d4ff]/25 group-hover:bg-[#00d4ff]/10 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]">
                  <item.icon
                    size={18}
                    className="text-[#00d4ff]/70 transition-all duration-500 group-hover:text-[#00d4ff]"
                  />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white/90">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/35">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
