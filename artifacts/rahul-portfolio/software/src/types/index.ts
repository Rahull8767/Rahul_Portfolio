export interface SoftwareProject {
  id: string;
  slug: string;
  title: string;
  category: "AI/ML" | "IoT" | "Full Stack" | "Robotics" | "Computer Vision" | "Embedded Systems" | "Automation";
  tech: string[];
  description: string;
  features: string[];
  challenge?: string;
  lesson?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface EditingProject {
  id: string;
  slug: string;
  title: string;
  category: "Reels" | "Short Form" | "Cinematic Edit" | "Motion Graphics" | "VFX";
  year: string;
  thumbnail: string;
  video?: string;
  description: string;
  tools: string[];
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