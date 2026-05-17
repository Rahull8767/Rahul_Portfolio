export interface Project {
  id: string;
  title: string;
  category: "AI/ML" | "IoT" | "Full Stack" | "Robotics" | "All";
  tech: string[];
  description: string;
  features: string[];
  challenge?: string;
  lesson?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration?: string;
  description: string;
  type: "leadership" | "participation";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}