import { Experience, Project, Certification, Skill } from '@/types';

export const personalInfo = {
  name: 'Animesh Pandey',
  title: 'Senior GenAI Engineer',
  headline: 'Building Enterprise AI That Scales',
  email: 'p.animesh21@gmail.com',
  phone: '+91-8358843232',
  location: 'Bengaluru, India',
  linkedin: 'https://www.linkedin.com/in/animesh-pandey-3936a115a/',
  github: 'https://github.com/devanimesh1',
  domain: 'animeshpandey.in',
  summary:
    'Senior AI Engineer with 5+ years of experience designing and deploying production-grade conversational AI, voice automation, retrieval systems, and enterprise-scale AI applications across insurance, telecom, public sector, and enterprise customer experience domains.',
  coreExpertise: [
    'Conversational AI',
    'GCP',
    'Dialogflow CX',
    'Vertex AI',
    'Google Cloud Expert Services',
    'Voice AI',
    'AI Agents',
    'Agentic AI',
    'Prompt Engineering',
  ],
};

export const experiences: Experience[] = [
  {
    id: 'capgemini',
    company: 'Capgemini',
    role: 'Consultant – Applied AI (GCP)',
    location: 'Noida / Bengaluru',
    period: 'Jul 2025 – Present',
    startDate: '2025-07',
    endDate: 'present',
    description: [
      'Architect and scale production-grade, autonomous AI agent ecosystems and workflow automation platforms on Google Cloud Platform using Python, LangGraph, and Vertex AI.',
      'Delivered a highly robust, multilingual multi-channel chat and voice assistant infrastructure (Bell.ca) using GCP CCAI, optimizing operational agent dependency.',
      'Engineered highly accurate embedding pipelines and vector retrieval layers for secure enterprise knowledge graphs.',
    ],
    technologies: ['GCP', 'Vertex AI', 'LangGraph', 'Python', 'CCAI', 'Docker', 'Kubernetes'],
    color: '#00d4ff',
  },
  {
    id: 'quantiphi',
    company: 'Quantiphi Analytics',
    role: 'Senior Conversational AI / GenAI Engineer',
    location: 'Bengaluru',
    period: 'Mar 2024 – Jul 2025',
    startDate: '2024-03',
    endDate: '2025-07',
    description: [
      'Designed and evaluated production LLM-powered RAG retrieval assistants, incorporating Google FAQ Data Stores and precision prompt engineering to optimize semantic accuracy.',
      'Built enterprise conversational agents across Fintech, Insurance, and Telecom sectors using Dialogflow CX, Vertex AI, and CCAI, achieving a 28% increase in automated user containment.',
      'Developed a Generative AI user simulation training engine to model customer behaviors, optimizing onboarding environments.',
      'Integrated Twilio and Dialogflow telephony pipelines to deploy real-time voice bots featuring robust STT/TTS layers.',
    ],
    technologies: [
      'Dialogflow CX',
      'Vertex AI',
      'CCAI',
      'RAG',
      'LLM',
      'Twilio',
      'STT/TTS',
      'Python',
    ],
    color: '#00ff88',
  },
  {
    id: 'icici',
    company: 'ICICI Prudential Life Insurance',
    role: 'Software Development Consultant',
    location: 'Mumbai',
    period: 'May 2022 – May 2023',
    startDate: '2022-05',
    endDate: '2023-05',
    description: [
      'Modernized and refactored conversational NLP modules and chatbot frameworks (IBM Watson), mitigating dependency on live agents by 30%.',
      'Collaborated with cross-functional infrastructure teams to design user-focused conversation flows and custom analytical reporting systems.',
    ],
    technologies: ['IBM Watson', 'NLP', 'STT/TTS', 'Analytics', 'Chatbot Frameworks'],
    color: '#ffaa00',
  },
  {
    id: 'csm',
    company: 'CSM Technologies',
    role: 'Software Engineer – Emerging Technology',
    location: 'Bhubaneswar',
    period: 'Oct 2021 – Apr 2022',
    startDate: '2021-10',
    endDate: '2022-04',
    description: [
      'Developed and implemented multilingual government public grievance and student information chatbots (Janasunani, SAMS) integrating Dialogflow and Angular.',
    ],
    technologies: ['Dialogflow', 'Angular', 'Node.js', 'Multilingual NLP'],
    color: '#ff4466',
  },
  {
    id: 'axleweb',
    company: 'AxleWeb Technologies',
    role: 'Software Developer',
    location: 'Rewa, MP',
    period: 'Jul 2020 – Jul 2021',
    startDate: '2020-07',
    endDate: '2021-07',
    description: [
      'Built chatbot integrations across multiple communication channels including Slack, WhatsApp, FB Messenger using platforms like Dialogflow ES/CX, Engati, and Haptik.',
      'Facilitated seamless integration of chatbots across communication channels, enhancing reach and accessibility.',
    ],
    technologies: [
      'Dialogflow ES/CX',
      'Node.js',
      'WhatsApp API',
      'Twilio',
      'Slack',
      'FB Messenger',
    ],
    color: '#aa44ff',
  },
];

export const projects: Project[] = [
  {
    id: 'agentic-platform',
    title: 'Enterprise Agentic AI Platform',
    description:
      'Multi-agent systems with deterministic planning, memory, tool execution, and evaluation pipelines.',
    longDescription:
      'Built multi-agent systems featuring deterministic planning layers, short/long-term memory systems, dynamic tool execution, and programmatic performance evaluation pipelines optimized for complex enterprise logic loops.',
    technologies: ['Vertex AI', 'LangGraph', 'Python', 'Multi-Agent', 'GCP'],
    category: 'Agentic AI',
    impact: 'Enterprise-scale autonomous AI workflows',
    domain: 'Enterprise',
  },
  {
    id: 'rag-pipeline',
    title: 'Enterprise Knowledge & Retrieval Assistant',
    description:
      'High-throughput semantic search ecosystem over enterprise compliance document bases.',
    longDescription:
      'Engineered a high-throughput semantic search ecosystem over enterprise compliance document bases. Implemented dense embeddings, advanced token splitting strategies, chunk optimization, and dynamic ranking models via Vertex AI Search.',
    technologies: ['RAG', 'Vertex AI Search', 'Embeddings', 'Vector DB', 'Python'],
    category: 'RAG',
    impact: 'High-accuracy enterprise document retrieval',
    domain: 'Enterprise',
  },
  {
    id: 'bell-ca',
    title: 'Bell.ca Multilingual Voice & Chat Assistant',
    description:
      'Multilingual multi-channel chat and voice assistant infrastructure for Bell Canada telecom.',
    longDescription:
      'Delivered a highly robust, multilingual multi-channel chat and voice assistant infrastructure using GCP CCAI, optimizing operational agent dependency for one of Canada\'s largest telecom providers.',
    technologies: ['GCP CCAI', 'Dialogflow CX', 'Voice AI', 'STT/TTS', 'Multilingual'],
    category: 'Voice AI',
    impact: '30% reduction in agent dependency',
    domain: 'Telecom',
  },
  {
    id: 'icici-bot',
    title: 'ICICI Prudential Chatbot Modernization',
    description:
      'NLP module modernization and chatbot framework refactoring for India\'s leading life insurance company.',
    longDescription:
      'Modernized and refactored conversational NLP modules and chatbot frameworks (IBM Watson), mitigating dependency on live agents by 30%. Designed user-focused conversation flows and custom analytical reporting systems.',
    technologies: ['IBM Watson', 'NLP', 'Analytics', 'Chatbot Frameworks'],
    category: 'Conversational AI',
    impact: '30% reduction in live agent dependency',
    domain: 'Insurance / Fintech',
    liveUrl: 'https://www.iciciprulife.com',
  },
  {
    id: 'janasunani',
    title: 'Janasunani Government Grievance Portal',
    description:
      'Multilingual government public grievance chatbot for Government of Odisha.',
    longDescription:
      'Developed and implemented multilingual government public grievance chatbot (Janasunani) integrating Dialogflow and Angular for the Government of Odisha, handling citizen complaints and grievance tracking.',
    technologies: ['Dialogflow', 'Angular', 'Node.js', 'Multilingual NLP'],
    category: 'Public Sector',
    impact: 'Automated citizen grievance processing',
    domain: 'Government',
    liveUrl: 'https://janasunani.odisha.gov.in',
  },
  {
    id: 'voice-copilot',
    title: 'Voice AI Copilot',
    description:
      'Real-time speech assistant integrated with CRM and knowledge systems.',
    longDescription:
      'Built a real-time voice AI copilot integrated with CRM and knowledge systems, featuring robust STT/TTS layers and telephony integration via Twilio and Dialogflow.',
    technologies: ['Voice AI', 'STT/TTS', 'Twilio', 'Dialogflow', 'CRM Integration'],
    category: 'Voice AI',
    impact: 'Real-time voice assistance for enterprise',
    domain: 'Enterprise',
  },
];

export const certifications: Certification[] = [
  {
    id: 'gcp-vertex',
    title: 'Google Cloud Vertex AI Engineering',
    issuer: 'Google Cloud',
    date: '2024',
    icon: '🔷',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI Systems',
    issuer: 'Google Cloud',
    date: '2024',
    icon: '🤖',
  },
  {
    id: 'genai-leader',
    title: 'Google Generative AI Leader',
    issuer: 'Google',
    date: '2024',
    icon: '⭐',
  },
  {
    id: 'prompt-eng',
    title: 'Advanced Prompt Engineering',
    issuer: 'LinkedIn Learning',
    date: '2024',
    icon: '📝',
  },
  {
    id: 'conv-design',
    title: 'Google Conversation Design Fundamentals',
    issuer: 'Google',
    date: '2023',
    icon: '💬',
  },
  {
    id: 'pm-launchpad',
    title: 'Product Management Launchpad',
    issuer: 'Airtribe',
    date: '2023',
    icon: '🚀',
  },
];

export const skills: Skill[] = [
  { name: 'Vertex AI', category: 'AI/ML', level: 95 },
  { name: 'Gemini', category: 'AI/ML', level: 90 },
  { name: 'Dialogflow CX', category: 'AI/ML', level: 95 },
  { name: 'LangChain', category: 'AI/ML', level: 88 },
  { name: 'LangGraph', category: 'AI/ML', level: 85 },
  { name: 'RAG', category: 'AI/ML', level: 92 },
  { name: 'Prompt Engineering', category: 'AI/ML', level: 95 },
  { name: 'Agentic AI', category: 'AI/ML', level: 88 },
  { name: 'Multi-Agent Systems', category: 'AI/ML', level: 85 },
  { name: 'NLP', category: 'AI/ML', level: 90 },
  { name: 'Python', category: 'Programming', level: 92 },
  { name: 'Node.js', category: 'Programming', level: 85 },
  { name: 'TypeScript', category: 'Programming', level: 80 },
  { name: 'SQL', category: 'Programming', level: 78 },
  { name: 'REST APIs', category: 'Programming', level: 90 },
  { name: 'GCP', category: 'Cloud', level: 93 },
  { name: 'Cloud Run', category: 'Cloud', level: 85 },
  { name: 'Docker', category: 'Cloud', level: 82 },
  { name: 'Kubernetes', category: 'Cloud', level: 78 },
  { name: 'CCAI', category: 'Cloud', level: 90 },
  { name: 'AWS', category: 'Cloud', level: 70 },
  { name: 'Voice AI', category: 'Speech', level: 90 },
  { name: 'STT/TTS', category: 'Speech', level: 88 },
  { name: 'Twilio', category: 'Speech', level: 85 },
  { name: 'WhatsApp API', category: 'Integration', level: 85 },
  { name: 'Slack', category: 'Integration', level: 80 },
  { name: 'CI/CD', category: 'DevOps', level: 80 },
  { name: 'MLOps', category: 'DevOps', level: 78 },
];

export const availability = {
  consulting: true,
  fullTime: true,
  advisory: true,
  speaking: true,
};

export const chatbotStarters = [
  'Has Animesh built Voice AI systems?',
  'Has he worked with Vertex AI?',
  'Can he lead enterprise GenAI transformation?',
  'Show telecom projects.',
  'Is he a fit for our AI architect role?',
];
