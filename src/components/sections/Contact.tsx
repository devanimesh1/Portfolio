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

export default function Contact() {
  const { ref, isInView } = useInView(0.1);
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
    <section id="contact" className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/50 via-transparent to-[#0d0d1a]/50" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-[#00d4ff]/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00d4ff]">
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Let&apos;s Build Together
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact info & availability */}
          <div className="lg:col-span-2">
            {/* Availability widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="neon-border mb-8 rounded-2xl bg-[#0d0d1a] p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#00ff88]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#00ff88]">
                  System Status: Available
                </span>
              </div>

              <div className="space-y-3">
                {availabilityItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{item.label}</span>
                    <span
                      className={`rounded-full px-3 py-0.5 font-mono text-[10px] ${
                        item.active
                          ? 'bg-[#00ff88]/10 text-[#00ff88]'
                          : 'bg-white/5 text-white/30'
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <a
                href={`https://wa.me/918358843232`}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-border flex items-center gap-4 rounded-xl bg-[#0d0d1a] p-4 transition-all hover:bg-[#141428]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#25D366]/20 bg-[#25D366]/10">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">WhatsApp</div>
                  <div className="font-mono text-xs text-white/40">Preferred • Fastest response</div>
                </div>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="neon-border flex items-center gap-4 rounded-xl bg-[#0d0d1a] p-4 transition-all hover:bg-[#141428]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00d4ff]/20 bg-[#00d4ff]/10">
                  <Mail size={18} className="text-[#00d4ff]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Email</div>
                  <div className="font-mono text-xs text-white/40">{personalInfo.email}</div>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="neon-border flex items-center gap-4 rounded-xl bg-[#0d0d1a] p-4 transition-all hover:bg-[#141428]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ffaa00]/20 bg-[#ffaa00]/10">
                  <Phone size={18} className="text-[#ffaa00]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Phone</div>
                  <div className="font-mono text-xs text-white/40">{personalInfo.phone}</div>
                </div>
              </a>

              <div className="flex gap-3 pt-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#0077B5]/30 hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <FaGithub size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-12 text-center">
                <CheckCircle size={48} className="mb-4 text-[#00ff88]" />
                <h3 className="mb-2 text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-sm text-white/50">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="neon-border rounded-2xl bg-[#0d0d1a] p-8">
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, company: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formState.role}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, role: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                      placeholder="Hiring for..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={formState.industry}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, industry: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                      placeholder="Your industry"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                      Timeline
                    </label>
                    <select
                      value={formState.timeline}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, timeline: e.target.value }))
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-[#00d4ff]/30"
                    >
                      <option value="" className="bg-[#0d0d1a]">Select timeline</option>
                      <option value="immediate" className="bg-[#0d0d1a]">Immediate</option>
                      <option value="1-2weeks" className="bg-[#0d0d1a]">1-2 weeks</option>
                      <option value="1month" className="bg-[#0d0d1a]">1 month</option>
                      <option value="flexible" className="bg-[#0d0d1a]">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
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
                        className={`rounded-lg px-4 py-2 text-xs capitalize transition-all ${
                          formState.preferredContact === method
                            ? 'border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]'
                            : 'border border-white/10 bg-white/5 text-white/40 hover:bg-white/8'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#00d4ff]/30 focus:bg-white/8"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-6 py-3 text-sm font-medium text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20"
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
