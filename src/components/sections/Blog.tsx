'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Building Production RAG Pipelines with Vertex AI',
    excerpt: 'A deep dive into designing and deploying enterprise-grade RAG systems on GCP.',
    category: 'RAG',
    readTime: '8 min',
    date: 'Coming Soon',
    status: 'draft',
  },
  {
    title: 'Multi-Agent Systems: From Theory to Production',
    excerpt: 'How to orchestrate autonomous AI agents for complex enterprise workflows.',
    category: 'Agentic AI',
    readTime: '12 min',
    date: 'Coming Soon',
    status: 'draft',
  },
  {
    title: 'Voice AI Architecture for Enterprise Contact Centers',
    excerpt: 'Designing scalable voice AI solutions with CCAI and Dialogflow CX.',
    category: 'Voice AI',
    readTime: '10 min',
    date: 'Coming Soon',
    status: 'draft',
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Blog() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="blog" className="section-glow relative overflow-hidden bg-[#050510] py-36">
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
            Tech Blog
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          Insights & Writing
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              custom={2 + i}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="card-glass group rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#00d4ff]/10 bg-[#00d4ff]/4 px-3 py-1 font-mono text-[10px] text-[#00d4ff]/70">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-white/25">
                  <Clock size={12} />
                  <span className="font-mono text-[10px]">{post.readTime}</span>
                </div>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-[#00d4ff]/30" />
                <span className="font-mono text-[10px] text-white/25">{post.date}</span>
              </div>

              <h3 className="mb-3 text-lg font-bold text-white/80 transition-colors duration-500 group-hover:text-white">{post.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-white/35">{post.excerpt}</p>

              <div className="flex items-center gap-1.5 text-xs text-white/20 transition-all duration-500 group-hover:gap-2.5 group-hover:text-white/40">
                <span>Read article</span>
                <ArrowRight size={12} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
