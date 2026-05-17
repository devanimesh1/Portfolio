'use client';

import { personalInfo } from '@/data/resume';
import { Mail } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#050510] py-14">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-[#0a0a18]/30" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#00d4ff]/10 bg-[#00d4ff]/5">
              <span className="font-mono text-xs font-bold text-[#00d4ff]/80">AP</span>
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">{personalInfo.name}</div>
              <div className="font-mono text-[10px] text-white/25">{personalInfo.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 transition-all duration-500 hover:text-[#0077B5]"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 transition-all duration-500 hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white/20 transition-all duration-500 hover:text-[#00d4ff]"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-mono text-[10px] text-white/15">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>
            <div className="mt-1.5 font-mono text-[10px] text-white/[0.08]">
              Built with Next.js, TypeScript & AI
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
