'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function NeuralCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const trailX = useMotionValue(0);
  const trailY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const trailSpringX = useSpring(trailX, { damping: 40, stiffness: 120 });
  const trailSpringY = useSpring(trailY, { damping: 40, stiffness: 120 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }>>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);

      if (Math.random() > 0.6) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: 30 + Math.random() * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, trailX, trailY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.6})`;
        ctx.fill();
        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative">
          <div className="h-4 w-4 rounded-full border border-[#00d4ff]/60 bg-[#00d4ff]/10" />
          <div className="absolute inset-[-4px] rounded-full bg-[#00d4ff]/5 blur-sm" />
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9997] hidden md:block"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="h-8 w-8 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5" />
      </motion.div>
    </>
  );
}
