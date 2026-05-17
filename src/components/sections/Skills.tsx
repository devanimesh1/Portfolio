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

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Skills() {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="skills" className="section-glow aurora-bg relative overflow-hidden bg-[#050510] py-36">
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
            AI Skill Cloud
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          Technical Arsenal
        </motion.h2>

        <div className="space-y-14">
          {categories.map((cat, catIndex) => {
            const categorySkills = skills.filter((s) => s.category === cat.key);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={cat.key}
                custom={2 + catIndex}
                variants={sectionFade}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}40` }}
                  />
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                    {cat.label}
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + catIndex * 0.08 + skillIndex * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="card-glass group rounded-xl p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-white/85">{skill.name}</span>
                        <span
                          className="font-mono text-[11px]"
                          style={{ color: `${cat.color}99` }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1.2,
                            delay: 0.5 + catIndex * 0.08 + skillIndex * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${cat.color}20, ${cat.color}80)`,
                            boxShadow: `0 0 8px ${cat.color}20`,
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
