/**
 * Single source of truth for all portfolio content.
 * Update text/links here — every section reads from this file.
 */

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
}

export interface ExperienceItem {
  company: string;
  url?: string;
  roles: string;
  /** ISO date the role(s) started */
  start: string;
  /** ISO date the role(s) ended; omit for current role */
  end?: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
  current?: boolean;
}

export interface SkillGroup {
  title: string;
  accent?: boolean;
  skills: string[];
}

export interface ProjectItem {
  title: string;
  blurb: string;
  stack: string[];
  href?: string;
}

export interface RepoItem {
  name: string;
  description: string;
  url: string;
}

export interface StatItem {
  /** numeric target for the count-up animation */
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** when true the value is computed live (years of experience) */
  live?: boolean;
}

/** The day Padmanabhan entered the IT field — drives the live experience counter. */
export const CAREER_START = '2018-08-09';

export const PROFILE = {
  name: 'Padmanabhan Elango Manivannan',
  shortName: 'Padmanabhan',
  nickname: 'Prathick',
  titles: ['Senior Software Engineer', 'Forward Deployed Engineer', 'AI Engineer'],
  tagline: 'Engineering extraordinary product delivery — now building production AI.',
  location: 'Chennai, India',
  relocation: 'Open to relocation across Canada',
  email: 'paddhu.xd96@gmail.com',
  phone: '+91 97915 28298',
  resumeUrl: 'assets/Padmanabhan_Manivannan_Resume.pdf',
  availability: 'Open to AI / Forward Deployed / Software Engineer roles',
} as const;

export const SOCIALS: SocialLink[] = [
  { id: 'github', label: 'GitHub', handle: '@prathick96', url: 'https://github.com/prathick96' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/prathick96', url: 'https://www.linkedin.com/in/prathick96' },
  { id: 'twitter', label: 'X / Twitter', handle: '@prathick96', url: 'https://twitter.com/prathick96' },
  { id: 'instagram', label: 'Instagram', handle: '@prathick.xd', url: 'https://www.instagram.com/prathick.xd/' },
  { id: 'facebook', label: 'Facebook', handle: '/prathick96', url: 'https://facebook.com/prathick96' },
  { id: 'email', label: 'Email', handle: PROFILE.email, url: `mailto:${PROFILE.email}` },
];

export const ABOUT: string[] = [
  'I am a Senior Software Engineer and Forward Deployed Engineer with 7+ years spanning on-site product delivery, solutions engineering, and L2/L3 application support. I have installed, configured, and commissioned a proprietary enterprise platform at customer sites across the USA and Peru — owning environment preparation, networking, SSO, security, go-live support, and operator training.',
  'My edge is the rare combination of deep technical delivery and human customer engagement: calm under customer-critical, floor-down conditions, and able to communicate clearly across cultures and languages. In Peru I bridged a complete English–Spanish language barrier to deliver an installation end to end.',
  'Today I am channeling that delivery instinct into AI — shipping RAG pipelines, agentic workflows, and Model Context Protocol (MCP) integrations in Python and Node.js. This is the next step of a deliberate transition: using AI to build AI, and pairing it with field-proven product delivery.',
];

export const STATS: StatItem[] = [
  { value: 7, suffix: '+', label: 'Years in IT', live: true },
  { value: 4, label: 'On-site enterprise deployments' },
  { value: 6, suffix: '+', label: 'Countries supported under SLA' },
  { value: 3, label: 'Production AI projects shipping' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Light & Wonder',
    roles: 'Senior Software Engineer',
    start: '2022-01-01',
    location: 'Chennai, India · On-site across USA & Peru',
    current: true,
    summary:
      'Forward-deployed product delivery and L2/L3 support for the Slot Data System (SDS), a proprietary casino slot-management platform.',
    highlights: [
      'Led end-to-end on-site delivery of SDS across 4 enterprise deployments in the USA (Miami, Las Vegas, Texas) and Peru (Lima) — preparing customer environments, configuring DHCP scopes for device connectivity, and integrating customer LDAP for SSO logins.',
      'Designed and deployed an SSL/TLS certificate-expiry monitoring service that polls every application server and alerts stakeholders ahead of expiry — rolled out across multiple customer sites, preventing expired-certificate outages.',
      'Owned go-live technical support through customer-critical windows, resolving floor-down incidents with minimal disruption to live casino operations.',
      'Trained casino operations staff and managers, making customer teams self-sufficient from day one; in Peru, bridged a complete English–Spanish language barrier to deliver the installation.',
      'Delivered SLA-bound support to casinos across the USA, Canada, South America, Australia, New Zealand, and South Africa, consistently meeting KPI targets.',
    ],
    tags: ['On-site Delivery', 'LDAP / SSO', 'SSL/TLS', 'Networking', 'L2/L3 Support', 'SQL'],
  },
  {
    company: 'Hexaware Technologies',
    roles: 'Application Lead Support Engineer',
    start: '2020-04-01',
    end: '2021-12-31',
    location: 'Chennai, India',
    summary:
      'Led L3 support and maintenance of the payment gateway for the Liverpool Victoria (LV=) Insurance e-commerce platform.',
    highlights: [
      'First in the account to introduce an agile workflow; facilitated Scrum ceremonies and stepped up as Lead Engineer, backfilling a senior (G6) resource.',
      'Drove quarterly releases for the Travel Insurance application and maintained configuration-change records.',
      'Recognised with the ACE Award for outstanding performance (May 2020).',
    ],
    tags: ['L3 Support', 'Payment Gateway', 'Agile / Scrum', 'Release Management'],
  },
  {
    company: 'Hexaware Technologies',
    roles: 'Java Developer',
    start: '2019-01-01',
    end: '2020-04-01',
    location: 'Chennai, India',
    summary:
      'Built and deployed an end-to-end Spring MVC application and an online portal validation system on a microservice architecture.',
    highlights: [
      'Developed and unit-tested microservices with JUnit and Mockito (J2EE, JIRA, Git).',
      'Recognised with the SPOT Award (December 2019).',
    ],
    tags: ['Java / J2EE', 'Spring MVC', 'Microservices', 'JUnit / Mockito'],
  },
  {
    company: 'Hexaware Technologies',
    roles: 'Associate Software Engineer Trainee',
    start: '2018-08-09',
    end: '2018-12-31',
    location: 'Chennai, India',
    summary:
      'Full-stack trainee; designed and deployed an end-to-end Spring MVC application following agile, serving as Scrum master.',
    highlights: [
      'Entered the IT field on 9 August 2018 — the start of the journey this site counts in real time.',
    ],
    tags: ['Full-stack', 'Spring MVC', 'Scrum Master'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: 'AI / LLM Engineering',
    accent: true,
    skills: [
      'RAG (Retrieval-Augmented Generation)',
      'Agentic AI & agent orchestration',
      'Model Context Protocol (MCP)',
      'Prompt engineering',
      'LLM evaluation',
      'Vector databases & embeddings',
      'n8n',
    ],
  },
  {
    title: 'Languages',
    skills: ['Python', 'Node.js', 'JavaScript / TypeScript', 'Java / Java EE', 'SQL', 'Bash'],
  },
  {
    title: 'Deployment & Integration',
    skills: ['On-site implementation', 'LDAP / SSO', 'DHCP configuration', 'SSL/TLS & certificates', 'REST APIs', 'JBoss / WildFly EAP', 'Spring MVC', 'Microservices'],
  },
  {
    title: 'Support & Infrastructure',
    skills: ['Linux', 'Networking', 'Multi-server environments', 'L2 / L3 support', 'SLA management', 'Incident response', 'Root-cause analysis'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Docker', 'Git', 'CI/CD'],
  },
  {
    title: 'Ways of Working',
    skills: ['Agile / Scrum', 'Customer training', 'Stakeholder management', 'Technical documentation', 'Cross-cultural communication'],
  },
];

export const AI_PROJECTS: ProjectItem[] = [
  {
    title: 'Agentic Workflow Automation',
    blurb:
      'Multi-step AI agents orchestrated with n8n and LLM APIs, using MCP servers to connect models to external tools and data sources for real task automation.',
    stack: ['n8n', 'LLM APIs', 'MCP', 'Node.js'],
  },
  {
    title: 'RAG Knowledge Assistant',
    blurb:
      'A Python retrieval-augmented generation pipeline over private document sets with vector embeddings, returning grounded, cited answers.',
    stack: ['Python', 'Vector DB', 'Embeddings', 'RAG'],
  },
  {
    title: 'LLM Tooling & Integrations',
    blurb:
      'Node.js services exposing custom MCP tools, with prompt design and evaluation to improve output reliability and tool-calling accuracy.',
    stack: ['Node.js', 'MCP', 'Prompt Eng.', 'LLM Eval'],
  },
];

export const FEATURED_REPOS: RepoItem[] = [
  {
    name: 'orange-doors',
    description: 'A front-end project exploring interactive UI patterns.',
    url: 'https://github.com/prathick96/orange-doors',
  },
  {
    name: 'blog-app-frontend',
    description: 'React front-end for a full-stack blogging application.',
    url: 'https://github.com/prathick96/blog-app-frontend',
  },
  {
    name: 'profile-forms-react-app',
    description: 'React app for dynamic, validated profile forms.',
    url: 'https://github.com/prathick96/profile-forms-react-app',
  },
];

export const ALL_REPOS_URL = 'https://github.com/prathick96?tab=repositories';

export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'AI Work' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * Web3Forms access key. These keys are designed to be embedded client-side.
 * Provide it via a `.env` file (VITE_WEB3FORMS_KEY=...) or paste it directly below.
 */
export const WEB3FORMS_ACCESS_KEY: string =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? '';
