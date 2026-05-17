'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Briefcase, Mail } from 'lucide-react';
import { personalInfo } from '@/data/resume';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}

function AIPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      className="relative"
    >
      <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
        {/* Outer glow ring */}
        <div className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-[#00d4ff]/20 via-transparent to-[#00d4ff]/20 blur-xl" />

        {/* Animated rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-10px] rounded-full border border-[#00d4ff]/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-25px] rounded-full border border-[#00d4ff]/10"
          style={{ borderStyle: 'dashed' }}
        />

        {/* Portrait container */}
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#00d4ff]/30 bg-gradient-to-br from-[#0d0d1a] to-[#1a1a2e]">
          {/* AI scan line effect */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-x-0 z-10 h-1 bg-gradient-to-b from-transparent via-[#00d4ff]/40 to-transparent"
          />

          {/* Portrait placeholder with AI visualization */}
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl font-bold text-[#00d4ff]/40 sm:text-7xl lg:text-8xl"
              >
                AP
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
            </div>
          </div>

          {/* HUD overlay elements */}
          <div className="absolute left-4 top-4 font-mono text-[10px] text-[#00d4ff]/40">
            <div>SYS.ACTIVE</div>
            <div>AI.READY</div>
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#00d4ff]/40">
            <div>v5.0</div>
            <div>GCP.LINKED</div>
          </div>
        </div>

        {/* Floating data points */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute h-2 w-2 rounded-full bg-[#00d4ff]/50"
            style={{
              top: `${20 + i * 20}%`,
              left: i % 2 === 0 ? '-5%' : '100%',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <ParticleField />
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-4 py-1.5"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ff88]" />
              <span className="font-mono text-xs tracking-wider text-[#00d4ff]">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {personalInfo.name}
              <br />
              <span className="text-gradient">
                {personalInfo.headline}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4 font-mono text-lg tracking-wider text-[#00d4ff]/80"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8 max-w-lg text-base leading-relaxed text-white/50"
            >
              5+ years shipping production AI across fintech, telecom, healthcare & public sector.
              Specializing in GCP, Vertex AI, Dialogflow CX, and Agentic AI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#chatbot"
                className="group flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 px-6 py-3 text-sm font-medium text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20 hover:shadow-lg hover:shadow-[#00d4ff]/10"
              >
                <MessageSquare size={16} />
                Talk to My AI
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10"
              >
                <Briefcase size={16} />
                View Enterprise Projects
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10"
              >
                <Mail size={16} />
                Hire / Contact
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8"
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '28%', label: 'Containment Boost' },
                { value: '30%', label: 'Agent Dependency Cut' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* AI Portrait */}
          <div className="order-1 flex justify-center lg:order-2">
            <AIPortrait />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-[#00d4ff]/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
