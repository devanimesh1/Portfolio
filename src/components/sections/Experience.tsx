'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { experiences } from '@/data/resume';

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Experience() {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="experience" className="section-glow relative overflow-hidden bg-[#050510] py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-transparent to-[#0a0a18]/60" />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          custom={0}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#00d4ff]/60 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]/80">
            Resume DNA Timeline
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          Career Evolution
        </motion.h2>

        {/* DNA Timeline */}
        <div className="relative">
          {/* Central strand */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/30 via-[#aa44ff]/15 to-transparent md:left-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={2 + i}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className={`relative mb-14 flex flex-col md:flex-row ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-6 z-10 md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${exp.color}30`,
                      `0 0 0 10px ${exp.color}00`,
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                  className="h-3.5 w-3.5 rounded-full border-2"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: `${exp.color}20`,
                  }}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div className="card-glass group rounded-2xl p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white/95">{exp.company}</h3>
                      <p className="text-sm text-[#00d4ff]/70">{exp.role}</p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-medium"
                      style={{
                        backgroundColor: `${exp.color}10`,
                        color: exp.color,
                        border: `1px solid ${exp.color}20`,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="mb-4 text-xs text-white/25">{exp.location}</p>

                  {/* Description */}
                  <ul className="mb-5 space-y-2.5">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-white/45">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: exp.color }}
                        />
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.04] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/35 transition-colors duration-300 hover:border-white/10 hover:text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          custom={8}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 flex items-center gap-6 card-glass rounded-2xl p-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/5">
            <span className="text-lg">🎓</span>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">B.E. Computer Science & Engineering</h4>
            <p className="text-sm text-white/35">LNCT Group of Colleges / LNCTE Bhopal • 2015–2019</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
