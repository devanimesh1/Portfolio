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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 shadow-2xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#00d4ff]/30 bg-[#00d4ff]/10">
            <span className="font-mono text-sm font-bold text-[#00d4ff]">AP</span>
            <div className="absolute inset-0 rounded-lg bg-[#00d4ff]/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="hidden text-sm font-medium tracking-wider text-white/80 sm:block">
            ANIMESH PANDEY
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#00d4ff] transition-all duration-300 hover:w-3/4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-5 py-2 text-sm font-medium text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20 md:block"
          >
            Hire Me
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
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
            className="glass border-t border-white/5 md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-5 py-3 text-center text-sm font-medium text-[#00d4ff]"
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
