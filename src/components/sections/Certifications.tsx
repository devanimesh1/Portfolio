'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { certifications } from '@/data/resume';
import { Award } from 'lucide-react';

export default function Certifications() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="certifications" className="relative overflow-hidden bg-black py-32">
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
            Certifications
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Professional Credentials
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="neon-border group relative overflow-hidden rounded-2xl bg-[#0d0d1a] p-6 transition-all duration-300 hover:bg-[#141428]"
            >
              {/* Scan line on hover */}
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8 }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/5 to-transparent"
              />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-xl transition-all group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/10">
                  <Award size={20} className="text-[#00d4ff]" />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-semibold text-white">{cert.title}</h3>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-[10px] text-[#00d4ff]/60">{cert.date}</p>
                </div>
              </div>

              {/* Verification badge */}
              <div className="mt-4 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
                <span className="font-mono text-[10px] text-[#00ff88]/60">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
