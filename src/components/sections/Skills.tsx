'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { skills } from '@/data/resume';

const categories = [
  { key: 'AI/ML', label: 'AI & Machine Learning', color: '#00d4ff' },
  { key: 'Programming', label: 'Programming', color: '#00ff88' },
  { key: 'Cloud', label: 'Cloud & Infrastructure', color: '#ffaa00' },
  { key: 'Speech', label: 'Speech & Voice', color: '#ff4466' },
  { key: 'Integration', label: 'Integrations', color: '#aa44ff' },
  { key: 'DevOps', label: 'DevOps', color: '#44aaff' },
];

export default function Skills() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="skills" className="relative overflow-hidden bg-black py-32">
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
            AI Skill Cloud
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Technical Arsenal
        </motion.h2>

        <div className="space-y-12">
          {categories.map((cat, catIndex) => {
            const categorySkills = skills.filter((s) => s.category === cat.key);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">
                    {cat.label}
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + catIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="neon-border group rounded-xl bg-[#0d0d1a] p-4 transition-all duration-300 hover:bg-[#141428]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: cat.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-1 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05,
                            ease: 'easeOut',
                          }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${cat.color}40, ${cat.color})`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
