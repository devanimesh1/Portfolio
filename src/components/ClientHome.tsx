'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import AILab from '@/components/sections/AILab';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';

const NeuralCursor = dynamic(
  () => import('@/components/interactions/NeuralCursor'),
  { ssr: false }
);
const ChatBot = dynamic(
  () => import('@/components/chatbot/ChatBot'),
  { ssr: false }
);
const RecruiterMode = dynamic(
  () => import('@/components/recruiter/RecruiterMode'),
  { ssr: false }
);

export default function ClientHome() {
  return (
    <main className="noise-bg relative min-h-screen bg-black">
      <NeuralCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <AILab />
      <Blog />
      <Contact />
      <Footer />
      <ChatBot />
      <RecruiterMode />
    </main>
  );
}
