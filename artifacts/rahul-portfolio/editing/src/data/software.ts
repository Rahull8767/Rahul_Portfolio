import { SoftwareProject } from "../types";

export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  media: {
    type: "video" | "image";
    src: string;
    poster?: string;
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "aerialeye",
    title: "AerialEYE",
    category: "AI / IoT / Computer Vision",
    description: "AI-powered drone system for road inspection, environmental monitoring and real-time location tracking.",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=2097&auto=format&fit=crop",
    },
    technologies: ["Flutter", "Python", "YOLO", "ESP32", "GPS", "Computer Vision"],
    githubUrl: "https://github.com/Rahull8767",
    caseStudyUrl: "/software/projects/aerialeye",
    featured: true
  },
  {
    id: "renewable-monitoring",
    title: "Renewable Energy Monitoring System",
    category: "IoT / Energy / Cloud",
    description: "Microgrid monitoring system integrating sensors for predictive maintenance and real-time energy analytics.",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop",
    },
    technologies: ["ESP32", "MQTT", "LoRa", "ThingsBoard", "Firebase", "Predictive Maintenance"],
    githubUrl: "https://github.com/Rahull8767",
    featured: true
  },
  {
    id: "smart-room",
    title: "Smart Room",
    category: "IoT / Automation",
    description: "Automated smart environment with real-time telemetry, remote toggles, and seamless mobile integration.",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
    },
    technologies: ["ESP32", "Flutter", "Wi-Fi", "MQTT", "Firebase"],
    githubUrl: "https://github.com/Rahull8767",
    featured: true
  },
  {
    id: "ai-beauty-analysis",
    title: "AI Beauty Analysis",
    category: "Computer Vision",
    description: "A browser-accessible web app using webcam feed to analyze facial features in real time.",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop",
    },
    technologies: ["Flask", "OpenCV", "MediaPipe", "Python"],
    githubUrl: "https://github.com/Rahull8767",
    featured: true
  }
];

export const softwareProjects: SoftwareProject[] = [
  {
    id: "ai-beauty-analysis",
    slug: "ai-beauty-analysis",
    title: "AI-Based Beauty Analysis",
    category: "Computer Vision",
    tech: ["Flask", "OpenCV", "MediaPipe"],
    description: "A browser-accessible web app using webcam feed to analyze facial features in real time — providing personalized beauty feedback and smile detection.",
    features: [
      "Real-time webcam processing",
      "Facial landmark detection",
      "Smile detection algorithm",
      "Dynamic compliment/feedback system"
    ],
    challenge: "Synchronizing webcam frame rates with Flask's response streaming without dropping frames.",
    lesson: "Learned to optimize OpenCV pipelines for low-latency web delivery.",
    featured: true
  },
  {
    id: "body-fitness-analysis",
    slug: "body-fitness-analysis",
    title: "Body Fitness Analysis",
    category: "AI/ML",
    tech: ["Python", "MediaPipe", "OpenCV"],
    description: "A pose estimation app using MediaPipe BlazePose to analyze body posture and calculate a fitness score based on joint angles and symmetry.",
    features: [
      "Real-time pose landmark tracking",
      "Joint angle computation",
      "Fitness scoring algorithm",
      "Visual feedback overlay"
    ]
  },
  {
    id: "iot-systems",
    slug: "iot-systems",
    title: "IoT Systems",
    category: "IoT",
    tech: ["ESP32", "Sensors", "MQTT"],
    description: "A collection of IoT prototypes built during coursework and independent exploration, including sensor data logging, home automation triggers, and real-time dashboard integration.",
    features: [
      "Multi-sensor integration (temperature, humidity, PIR)",
      "MQTT publish/subscribe",
      "Real-time data handling",
      "Automation logic"
    ]
  },
  {
    id: "robocraft",
    slug: "robocraft",
    title: "Robocraft Robot",
    category: "Embedded Systems",
    tech: ["Arduino", "C++", "HC-05"],
    description: "An autonomous/semi-autonomous robot built for a college Robocraft competition. Bluetooth remote control with onboard obstacle detection.",
    features: [
      "Bluetooth-controlled movement",
      "Real-time obstacle detection and auto-stop",
      "Dual motor control",
      "Custom chassis"
    ]
  },
  {
    id: "gesture-recognition",
    slug: "gesture-recognition",
    title: "Hand Gesture AI",
    category: "AI/ML",
    tech: ["TensorFlow.js", "HandPose"],
    description: "A browser-native gesture recognition app mapping hand gestures to text and speech output. No backend required.",
    features: [
      "Real-time hand landmark detection",
      "Gesture-to-text mapping",
      "Text-to-speech output",
      "No-install browser use"
    ],
    featured: true
  }
];
