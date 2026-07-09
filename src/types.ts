export interface Project {
  id: string;
  title: string;
  category: "Neuroscience" | "AI & ML" | "Social Impact" | "Network Science" | "Cognitive Science";
  summary: string;
  description: string;
  metrics?: { label: string; value: string }[];
  details: string[];
  tech: string[];
  visualType?: "brain" | "language" | "agents" | "chart" | "network";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  type: "Research" | "Teaching" | "Professional" | "Service";
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  bullets: string[];
  thesis?: {
    title: string;
    description: string;
  };
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  period: string;
  description: string;
  link?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal?: string;
  status: "In Preparation" | "Under Review" | "Published" | "Accepted";
  type?: "Journal" | "Conference" | "Preprint";
  summary: string;
  link?: string;
}
