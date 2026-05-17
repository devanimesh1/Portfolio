'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass border-b border-white/[0.04] shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 transition-all duration-500 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/10 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
            <span className="font-mono text-sm font-bold text-[#00d4ff]">AP</span>
          </div>
          <span className="hidden text-sm font-medium tracking-wider text-white/60 transition-colors duration-300 group-hover:text-white/90 sm:block">
            ANIMESH PANDEY
          </span>
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative px-4 py-2 text-[13px] text-white/50 transition-colors duration-300 hover:text-white"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-5 py-2 text-[13px] font-medium text-[#00d4ff] transition-all duration-500 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] md:block"
          >
            Hire Me
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-white/60 transition-all duration-300 hover:border-white/15 hover:bg-white/8 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-t border-white/[0.04] md:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block rounded-xl px-4 py-3 text-sm text-white/50 transition-all duration-300 hover:bg-white/4 hover:text-white"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-5 py-3 text-center text-sm font-medium text-[#00d4ff] transition-all duration-300 hover:bg-[#00d4ff]/10"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
