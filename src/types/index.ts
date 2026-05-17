export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  impact: string;
  domain: string;
  liveUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  url?: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  timeline: string;
  message: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
}

export interface AvailabilityStatus {
  consulting: boolean;
  fullTime: boolean;
  advisory: boolean;
  speaking: boolean;
}
