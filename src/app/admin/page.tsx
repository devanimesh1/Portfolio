'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  LogIn,
  LayoutDashboard,
  Briefcase,
  Award,
  Code,
  FileText,
  Image,
  Link2,
  MessageSquare,
  Settings,
  Plus,
  Edit3,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { experiences, projects, certifications, skills } from '@/data/resume';

type Tab =
  | 'dashboard'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'blogs'
  | 'media'
  | 'links'
  | 'chatbot'
  | 'prompts';

const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: Briefcase },
  { key: 'experience', label: 'Experience', icon: FileText },
  { key: 'skills', label: 'Skills', icon: Code },
  { key: 'certifications', label: 'Certifications', icon: Award },
  { key: 'blogs', label: 'Blogs', icon: FileText },
  { key: 'media', label: 'Media', icon: Image },
  { key: 'links', label: 'Links', icon: Link2 },
  { key: 'chatbot', label: 'Chatbot Docs', icon: MessageSquare },
  { key: 'prompts', label: 'Prompts', icon: Settings },
];

function LoginPanel({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00d4ff]/20 bg-[#00d4ff]/5">
            <Lock size={24} className="text-[#00d4ff]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="mt-2 text-sm text-white/40">
            Firebase Auth • Single Admin
          </p>
        </div>

        <div className="neon-border rounded-2xl bg-[#0d0d1a] p-6">
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff]/30"
              placeholder="admin@animeshpandey.in"
            />
          </div>
          <div className="mb-6">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/40">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#00d4ff]/30"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={onLogin}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-6 py-3 text-sm font-medium text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20"
          >
            <LogIn size={16} />
            Sign In
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Connect Firebase Auth for production authentication
        </p>
      </motion.div>
    </div>
  );
}

function DashboardView() {
  const stats = [
    { label: 'Projects', value: projects.length, color: '#00d4ff' },
    { label: 'Experiences', value: experiences.length, color: '#00ff88' },
    { label: 'Skills', value: skills.length, color: '#ffaa00' },
    { label: 'Certifications', value: certifications.length, color: '#aa44ff' },
  ];

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-white">Dashboard</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-[#0d0d1a] p-5"
          >
            <div className="mb-1 font-mono text-xs uppercase tracking-wider text-white/30">
              {stat.label}
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/5 bg-[#0d0d1a] p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Add New Project',
            'Update Experience',
            'Upload Chatbot Document',
            'Edit Blog Post',
          ].map((action) => (
            <button
              key={action}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/3 px-4 py-3 text-sm text-white/60 transition-all hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/5 hover:text-white"
            >
              <Plus size={14} />
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrudTable({
  title,
  items,
  columns,
}: {
  title: string;
  items: Array<Record<string, string | string[]>>;
  columns: string[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="flex items-center gap-2 rounded-lg border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-4 py-2 text-xs text-[#00d4ff] transition-all hover:bg-[#00d4ff]/20">
          <Plus size={14} />
          Add New
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-[#0d0d1a]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30"
                >
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-white/30">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                className="border-b border-white/3 transition-colors hover:bg-white/3"
              >
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-sm text-white/60">
                    {Array.isArray(item[col.toLowerCase()])
                      ? (item[col.toLowerCase()] as string[]).join(', ')
                      : (item[col.toLowerCase()] as string) || '—'}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/5 hover:text-[#00d4ff]">
                      <Edit3 size={12} />
                    </button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/5 hover:text-[#ff4466]">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginPanel onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return (
          <CrudTable
            title="Projects"
            items={projects.map((p) => ({
              title: p.title,
              category: p.category,
              domain: p.domain,
              technologies: p.technologies,
            }))}
            columns={['Title', 'Category', 'Domain']}
          />
        );
      case 'experience':
        return (
          <CrudTable
            title="Experience"
            items={experiences.map((e) => ({
              company: e.company,
              role: e.role,
              period: e.period,
              location: e.location,
            }))}
            columns={['Company', 'Role', 'Period']}
          />
        );
      case 'skills':
        return (
          <CrudTable
            title="Skills"
            items={skills.map((s) => ({
              name: s.name,
              category: s.category,
              level: String(s.level),
            }))}
            columns={['Name', 'Category', 'Level']}
          />
        );
      case 'certifications':
        return (
          <CrudTable
            title="Certifications"
            items={certifications.map((c) => ({
              title: c.title,
              issuer: c.issuer,
              date: c.date,
            }))}
            columns={['Title', 'Issuer', 'Date']}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Settings size={24} className="text-white/30" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {tabs.find((t) => t.key === activeTab)?.label}
            </h3>
            <p className="text-sm text-white/40">
              Connect Firebase to enable CRUD operations for this section.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-white/5 bg-[#0a0a14] transition-all duration-300 ${
          sidebarOpen ? 'w-60' : 'w-16'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          {sidebarOpen && (
            <span className="font-mono text-xs font-bold text-[#00d4ff]">ADMIN</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-1.5 text-white/40 hover:bg-white/5"
          >
            <ChevronRight
              size={14}
              className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <nav className="space-y-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-[#00d4ff]/10 text-[#00d4ff]'
                  : 'text-white/40 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <tab.icon size={16} />
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{renderContent()}</main>
    </div>
  );
}
