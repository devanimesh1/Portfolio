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

export default function Projects() {
  const { ref, isInView } = useInView(0.1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="relative overflow-hidden bg-black py-32">
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
            Enterprise Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Production Deployments
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const color = domainColors[project.domain] || '#00d4ff';
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                onClick={() => setSelectedProject(project.id)}
                className="neon-border group cursor-pointer rounded-2xl bg-[#0d0d1a] p-6 transition-all duration-300 hover:bg-[#141428]"
              >
                {/* Category badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] font-medium"
                    style={{
                      backgroundColor: `${color}10`,
                      color: color,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/30">{project.domain}</span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-[#00d4ff]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-white/40">
                  {project.description}
                </p>

                {/* Impact */}
                <div className="mb-4 rounded-lg bg-white/3 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                    Impact
                  </div>
                  <div className="mt-1 text-xs text-[#00ff88]/80">{project.impact}</div>
                </div>

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* View details */}
                <div className="flex items-center gap-1 text-xs text-[#00d4ff]/60 transition-colors group-hover:text-[#00d4ff]">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d1a] p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1 font-mono text-xs text-[#00d4ff]">
                  {selected.category}
                </span>
                <span className="font-mono text-xs text-white/30">{selected.domain}</span>
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">{selected.title}</h3>
              <p className="mb-6 leading-relaxed text-white/60">{selected.longDescription}</p>

              <div className="mb-6 rounded-xl border border-white/5 bg-white/3 p-4">
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-white/30">
                  Business Impact
                </div>
                <div className="text-sm text-[#00ff88]">{selected.impact}</div>
              </div>

              <div className="mb-6">
                <div className="mb-2 font-mono text-xs uppercase tracking-wider text-white/30">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-3 py-1 font-mono text-xs text-[#00d4ff]/80"
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-5 py-2 text-sm text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20"
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
