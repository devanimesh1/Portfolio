'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { personalInfo } from '@/data/resume';
import { MapPin, Zap, Globe, Brain } from 'lucide-react';

export default function About() {
  const { ref, isInView } = useInView(0.2);

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
    <section id="about" className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-[#00d4ff]/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00d4ff]">
            About
          </span>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 text-3xl font-bold text-white sm:text-4xl"
            >
              Engineering AI Systems
              <br />
              <span className="text-white/40">That Scale in Production</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-base leading-relaxed text-white/60"
            >
              {personalInfo.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {personalInfo.coreExpertise.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-3 py-1 font-mono text-xs text-[#00d4ff]/80"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="neon-border group rounded-2xl bg-[#0d0d1a] p-6 transition-all duration-300"
              >
                <item.icon
                  size={24}
                  className="mb-4 text-[#00d4ff] opacity-60 transition-opacity group-hover:opacity-100"
                />
                <h3 className="mb-2 text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/40">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
