'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { personalInfo, availability } from '@/data/resume';
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  CheckCircle,
} from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const sectionFade = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const inputClass = 'w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-500 placeholder:text-white/20 focus:border-[#00d4ff]/20 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,212,255,0.05)]';

export default function Contact() {
  const { ref, isInView } = useInView(0.05);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    timeline: '',
    message: '',
    preferredContact: 'email' as 'whatsapp' | 'email' | 'phone',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const availabilityItems = [
    { label: 'Consulting', active: availability.consulting },
    { label: 'Full-time', active: availability.fullTime },
    { label: 'Advisory', active: availability.advisory },
    { label: 'Speaking', active: availability.speaking },
  ];

  return (
    <section id="contact" className="section-glow aurora-bg relative overflow-hidden bg-[#050510] py-16 sm:py-24 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-transparent to-[#0a0a18]/60" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          custom={0}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#00d4ff]/60 to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]/80">
            Contact
          </span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={sectionFade}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10 text-2xl font-bold text-white sm:mb-16 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Let&apos;s Build Together
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact info & availability */}
          <div className="lg:col-span-2">
            {/* Availability widget */}
            <motion.div
              custom={2}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="card-glass mb-8 rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-2.5">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#00ff88]/80">
                  System Status: Available
                </span>
              </div>

              <div className="space-y-3.5">
                {availabilityItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/50">{item.label}</span>
                    <span
                      className={`rounded-full px-3 py-0.5 font-mono text-[10px] ${
                        item.active
                          ? 'bg-[#00ff88]/8 text-[#00ff88]/80'
                          : 'bg-white/4 text-white/25'
                      }`}
                    >
                      {item.active ? 'OPEN' : 'CLOSED'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact channels */}
            <motion.div
              custom={3}
              variants={sectionFade}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-3"
            >
              <a
                href={`https://wa.me/918358843232`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass flex items-center gap-4 rounded-xl p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#25D366]/15 bg-[#25D366]/5">
                  <MessageCircle size={18} className="text-[#25D366]/80" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">WhatsApp</div>
                  <div className="font-mono text-[11px] text-white/30">Preferred • Fastest response</div>
                </div>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="card-glass flex items-center gap-4 rounded-xl p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d4ff]/15 bg-[#00d4ff]/5">
                  <Mail size={18} className="text-[#00d4ff]/80" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">Email</div>
                  <div className="font-mono text-[11px] text-white/30">{personalInfo.email}</div>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="card-glass flex items-center gap-4 rounded-xl p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffaa00]/15 bg-[#ffaa00]/5">
                  <Phone size={18} className="text-[#ffaa00]/80" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">Phone</div>
                  <div className="font-mono text-[11px] text-white/30">{personalInfo.phone}</div>
                </div>
              </a>

              <div className="flex gap-3 pt-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/40 transition-all duration-500 hover:border-[#0077B5]/20 hover:bg-[#0077B5]/5 hover:text-[#0077B5]"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/40 transition-all duration-500 hover:border-white/15 hover:bg-white/5 hover:text-white"
                >
                  <FaGithub size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            custom={4}
            variants={sectionFade}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="card-glass flex h-full flex-col items-center justify-center rounded-2xl border-[#00ff88]/10 p-8 text-center sm:p-12">
                <CheckCircle size={48} className="mb-4 text-[#00ff88]/80" />
                <h3 className="mb-2 text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-sm text-white/40">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, company: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formState.role}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, role: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="Hiring for..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={formState.industry}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, industry: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="Your industry"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                      Timeline
                    </label>
                    <select
                      value={formState.timeline}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, timeline: e.target.value }))
                      }
                      className={inputClass}
                    >
                      <option value="" className="bg-[#0a0a18]">Select timeline</option>
                      <option value="immediate" className="bg-[#0a0a18]">Immediate</option>
                      <option value="1-2weeks" className="bg-[#0a0a18]">1-2 weeks</option>
                      <option value="1month" className="bg-[#0a0a18]">1 month</option>
                      <option value="flexible" className="bg-[#0a0a18]">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                    Preferred Contact
                  </label>
                  <div className="flex gap-2">
                    {(['whatsapp', 'email', 'phone'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setFormState((s) => ({ ...s, preferredContact: method }))
                        }
                        className={`rounded-xl px-4 py-2.5 text-xs capitalize transition-all duration-500 ${
                          formState.preferredContact === method
                            ? 'border border-[#00d4ff]/20 bg-[#00d4ff]/8 text-[#00d4ff]'
                            : 'border border-white/[0.06] bg-white/[0.03] text-white/35 hover:border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-white/30">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/8 px-6 py-3.5 text-sm font-medium text-[#00d4ff] transition-all duration-500 hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
