'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { projects } from '@/data/resume';
import { ExternalLink, ChevronRight, X } from 'lucide-react';

const domainColors: Record<string, string> = {
  Enterprise: '#00d4ff',
  Telecom: '#00ff88',
  'Insurance / Fintech': '#ffaa00',
  Government: '#ff4466',
};

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Projects() {
  const { ref, isInView } = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="section-glow relative overflow-hidden bg-[#050510] py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-transparent to-[#0a0a18]/60" />

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
            Enterprise Projects
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          Production Deployments
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const color = domainColors[project.domain] || '#00d4ff';
            return (
              <motion.div
                key={project.id}
                custom={2 + i}
                variants={sectionFade}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                onClick={() => setSelectedProject(project.id)}
                className="card-glass group cursor-pointer rounded-2xl p-6"
              >
                {/* Category badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] font-medium"
                    style={{
                      backgroundColor: `${color}08`,
                      color: color,
                      border: `1px solid ${color}18`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/25">{project.domain}</span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-white/90 transition-colors duration-500 group-hover:text-[#00d4ff]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-white/35">
                  {project.description}
                </p>

                {/* Impact */}
                <div className="mb-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/25">
                    Impact
                  </div>
                  <div className="mt-1 text-xs text-[#00ff88]/70">{project.impact}</div>
                </div>

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/[0.04] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/35"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-md border border-white/[0.04] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/35">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* View details */}
                <div className="flex items-center gap-1.5 text-xs text-[#00d4ff]/50 transition-all duration-500 group-hover:gap-2.5 group-hover:text-[#00d4ff]">
                  View Case Study
                  <ChevronRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-[#050510]/90 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.06] bg-[#0a0a18] p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-xl p-2 text-white/30 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-3 py-1 font-mono text-xs text-[#00d4ff]/80">
                  {selected.category}
                </span>
                <span className="font-mono text-xs text-white/25">{selected.domain}</span>
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">{selected.title}</h3>
              <p className="mb-6 leading-relaxed text-white/50">{selected.longDescription}</p>

              <div className="mb-6 rounded-xl border border-white/[0.04] bg-white/[0.02] p-5">
                <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-white/25">
                  Business Impact
                </div>
                <div className="text-sm text-[#00ff88]/80">{selected.impact}</div>
              </div>

              <div className="mb-6">
                <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white/25">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#00d4ff]/10 bg-[#00d4ff]/4 px-3 py-1 font-mono text-xs text-[#00d4ff]/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selected.liveUrl && (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-5 py-2.5 text-sm text-[#00d4ff] transition-all duration-500 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10"
                >
                  <ExternalLink size={14} />
                  View Live
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
