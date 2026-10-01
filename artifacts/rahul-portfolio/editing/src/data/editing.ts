import { EditingProject } from "../types";

export const editingProjects: EditingProject[] = [
  {
    id: "motion-reel-2023",
    slug: "motion-reel-2023",
    title: "Cinematic Narrative",
    category: "Cinematic Edit",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    description: "TODO: Add real project description. A compilation of motion graphics and visual storytelling.",
    tools: ["After Effects", "Premiere Pro"]
  },
  {
    id: "cinematic-automotive",
    slug: "cinematic-automotive",
    title: "Automotive Documentary",
    category: "Cinematic Edit",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    description: "TODO: Add real project description. High-energy automotive sequence focused on rhythm and pacing.",
    tools: ["Premiere Pro", "DaVinci Resolve"]
  },
  {
    id: "tech-brand-promo",
    slug: "tech-brand-promo",
    title: "Tech Brand Promo",
    category: "Reels",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    description: "TODO: Add real project description. Dynamic short-form promo designed for social media impact.",
    tools: ["After Effects", "Photoshop"]
  },
  {
    id: "event-recap",
    slug: "event-recap",
    title: "Festival Event Recap",
    category: "Reels",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    description: "TODO: Add real project description. Fast-paced event coverage editing.",
    tools: ["Premiere Pro"]
  }
];

export interface FeaturedWorkItem {
  id: string;
  title: string;
  category: string;
  video: string;
  poster?: string;
}

export const featuredWorks: FeaturedWorkItem[] = [
  {
    id: "bhagyalaxmi-reel",
    title: "BHAGYALAXMI",
    category: "REEL",
    video: "https://res.cloudinary.com/anhalsoa/video/upload/v1790769784/Bhagyalaxmi_2nd_reel.mp4",
  },
  {
    id: "bhagyalaxmi-long-reel",
    title: "BHAGYALAXMI",
    category: "LONG REEL",
    video: "/assets/videos/Bhagyalaxmi_Long_Reel(english).mp4",
  },
  {
    id: "rg-edit",
    title: "RG",
    category: "EDIT",
    video: "https://res.cloudinary.com/anhalsoa/video/upload/v1790770367/RG.mp4",
  },
  {
    id: "creative-reel",
    title: "CREATIVE",
    category: "REEL",
    video: "https://res.cloudinary.com/anhalsoa/video/upload/v1790769721/reeelll.mp4",
  },
  {
    id: "anime-edit",
    title: "ANIME EDIT",
    category: "MOTION GRAPHICS",
    video: "https://res.cloudinary.com/anhalsoa/video/upload/v1790769565/anime_1_2.mp4",
  }
];
