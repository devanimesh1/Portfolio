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

export default function Blog() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="blog" className="relative overflow-hidden bg-black py-32">
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
            Tech Blog
          </span>
        </motion.div>

        <div className="mb-16 flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Insights & Writing
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="neon-border group rounded-2xl bg-[#0d0d1a] p-6 transition-all duration-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-3 py-1 font-mono text-[10px] text-[#00d4ff]/80">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-white/30">
                  <Clock size={12} />
                  <span className="font-mono text-[10px]">{post.readTime}</span>
                </div>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-[#00d4ff]/40" />
                <span className="font-mono text-[10px] text-white/30">{post.date}</span>
              </div>

              <h3 className="mb-3 text-lg font-bold text-white/80">{post.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/40">{post.excerpt}</p>

              <div className="flex items-center gap-1 text-xs text-white/20">
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
