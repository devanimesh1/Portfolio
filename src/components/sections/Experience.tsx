'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { experiences } from '@/data/resume';

export default function Experience() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/50 via-transparent to-[#0d0d1a]/50" />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-[#00d4ff]/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00d4ff]">
            Resume DNA Timeline
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Career Evolution
        </motion.h2>

        {/* DNA Timeline */}
        <div className="relative">
          {/* Central DNA strand */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/50 via-[#00d4ff]/20 to-transparent md:left-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className={`relative mb-12 flex flex-col md:flex-row ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-6 z-10 md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${exp.color}40`,
                      `0 0 0 8px ${exp.color}00`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: `${exp.color}30`,
                  }}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div className="neon-border group rounded-2xl bg-[#0d0d1a] p-6 transition-all duration-300 hover:bg-[#141428]">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                      <p className="text-sm text-[#00d4ff]/80">{exp.role}</p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-medium"
                      style={{
                        backgroundColor: `${exp.color}15`,
                        color: exp.color,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="mb-4 text-xs text-white/30">{exp.location}</p>

                  {/* Description */}
                  <ul className="mb-4 space-y-2">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-white/50">
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
                        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40"
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex items-center gap-6 rounded-2xl border border-white/5 bg-[#0d0d1a] p-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/5">
            <span className="text-lg">🎓</span>
          </div>
          <div>
            <h4 className="font-semibold text-white">B.E. Computer Science & Engineering</h4>
            <p className="text-sm text-white/40">LNCT Group of Colleges / LNCTE Bhopal • 2015–2019</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
