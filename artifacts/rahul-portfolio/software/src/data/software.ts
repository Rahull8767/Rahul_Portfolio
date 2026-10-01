import { SoftwareProject } from "../types";

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
    githubUrl: "#",
    liveUrl: "#",
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
    ],
    githubUrl: "#"
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
    ],
    githubUrl: "#"
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
    ],
    githubUrl: "#"
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
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  }
];
