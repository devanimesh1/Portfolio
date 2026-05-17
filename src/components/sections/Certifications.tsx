'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { certifications } from '@/data/resume';
import { Award } from 'lucide-react';

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Certifications() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="certifications" className="section-glow aurora-bg relative overflow-hidden bg-[#050510] py-36">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          custom={0}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#00d4ff]/60 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]/80">
            Certifications
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          Professional Credentials
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              custom={2 + i}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="card-glass group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Scan line on hover */}
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 1, ease: 'linear' }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/[0.03] to-transparent"
              />

              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/5 transition-all duration-500 group-hover:border-[#00d4ff]/25 group-hover:bg-[#00d4ff]/10 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]">
                  <Award size={18} className="text-[#00d4ff]/70 transition-colors duration-500 group-hover:text-[#00d4ff]" />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-semibold text-white/90">{cert.title}</h3>
                  <p className="text-xs text-white/35">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-[10px] text-[#00d4ff]/50">{cert.date}</p>
                </div>
              </div>

              {/* Verification badge */}
              <div className="mt-4 flex items-center gap-1.5">
                <div className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
                </div>
                <span className="font-mono text-[10px] text-[#00ff88]/50">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
