'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Briefcase, Mail, ArrowDown } from 'lucide-react';
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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.3 + 0.05,
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
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 150)})`;
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
      transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]">
        {/* Ambient glow */}
        <div className="absolute inset-[-40px] rounded-full bg-[#00d4ff]/5 blur-3xl" />
        <div className="absolute inset-[-20px] rounded-full bg-[#aa44ff]/3 blur-2xl" />

        {/* Animated orbital rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-15px] rounded-full border border-[#00d4ff]/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-30px] rounded-full border border-[#aa44ff]/8"
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-45px] rounded-full border border-white/3"
        />

        {/* Portrait container */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-[#00d4ff]/20 bg-gradient-to-br from-[#0a0a18] via-[#12122a] to-[#0a0a18]">
          {/* Scan line */}
          <motion.div
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
            className="absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent"
          />

          {/* Portrait placeholder */}
          <div className="flex h-full w-full items-center justify-center">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-gradient text-6xl font-bold sm:text-7xl lg:text-8xl"
              style={{ WebkitTextFillColor: 'unset', opacity: 0.4 }}
            >
              AP
            </motion.div>
          </div>

          {/* HUD elements */}
          <div className="absolute left-5 top-5 font-mono text-[9px] text-[#00d4ff]/30 leading-relaxed">
            <div>SYS.ACTIVE</div>
            <div>AI.READY</div>
          </div>
          <div className="absolute bottom-5 right-5 font-mono text-[9px] text-[#00d4ff]/30 leading-relaxed text-right">
            <div>v5.0</div>
            <div>GCP.LINKED</div>
          </div>

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-60" />
        </div>

        {/* Floating orbs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full"
            style={{
              width: 4 + i * 1.5,
              height: 4 + i * 1.5,
              background: i % 2 === 0 ? 'rgba(0, 212, 255, 0.4)' : 'rgba(170, 68, 255, 0.4)',
              top: `${15 + i * 18}%`,
              left: i % 2 === 0 ? '-8%' : '103%',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="aurora-bg relative flex min-h-screen items-center overflow-hidden bg-[#050510]"
    >
      {/* Background layers */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <ParticleField />
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/40 to-[#050510]" />
      </motion.div>

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#00d4ff]/3 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#aa44ff]/3 blur-[100px]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#00d4ff]/15 bg-[#00d4ff]/5 px-4 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-5 sm:py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#00d4ff]/90 sm:text-[11px]">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-4 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              {personalInfo.name}
              <br />
              <span className="text-gradient-warm">
                {personalInfo.headline}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mb-2 font-mono text-sm tracking-wider text-[#00d4ff]/70 sm:mb-3 sm:text-base lg:text-lg"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mb-6 max-w-lg text-sm leading-relaxed text-white/40 sm:mb-10 sm:text-base lg:text-lg"
            >
                            5+ years shipping production AI across fintech, telecom, insurance & public sector.
                            Specializing in GCP, Vertex AI, Dialogflow CX, and Agentic AI systems.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#chatbot"
                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-6 py-3 text-sm font-medium text-[#00d4ff] backdrop-blur-sm transition-all duration-500 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] sm:px-7 sm:py-3.5"
              >
                <MessageSquare size={16} />
                Talk to My AI
              </a>
              <a
                href="#projects"
                className="flex items-center justify-center gap-2.5 rounded-full border border-white/8 bg-white/4 px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/8 hover:text-white sm:px-7 sm:py-3.5"
              >
                <Briefcase size={16} />
                View Projects
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 rounded-full border border-white/8 bg-white/4 px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/8 hover:text-white sm:px-7 sm:py-3.5"
              >
                <Mail size={16} />
                Hire / Contact
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 sm:mt-14 sm:gap-8 sm:pt-8"
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '28%', label: 'Containment Boost' },
                { value: '30%', label: 'Agent Dependency Cut' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] text-white/30 sm:mt-1.5 sm:text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

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
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
          <ArrowDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
