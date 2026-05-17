import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "ai-beauty-analysis",
    title: "AI-Based Beauty Analysis Web App",
    category: "Full Stack",
    tech: ["Flask", "OpenCV", "MediaPipe", "HTML/CSS/JS", "Python"],
    description: "A browser-accessible web app using webcam feed to analyze facial features in real time — providing personalized beauty feedback and smile detection. Built to explore practical OpenCV and MediaPipe pipelines within a Flask backend.",
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
    title: "Body Fitness Analysis App",
    category: "AI/ML",
    tech: ["Python", "MediaPipe", "OpenCV", "Streamlit"],
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
    title: "IoT Systems with ESP32 & Raspberry Pi",
    category: "IoT",
    tech: ["ESP32", "Raspberry Pi", "Arduino IDE", "MicroPython", "MQTT", "Python"],
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
    title: "Robocraft Competition Robot",
    category: "Robotics",
    tech: ["Arduino Uno", "HC-05 Bluetooth", "Ultrasonic Sensor", "L298N Motor Driver", "C++"],
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
    title: "Hand Gesture Recognition System",
    category: "AI/ML",
    tech: ["TensorFlow.js", "HandPose model", "Web Speech API", "HTML/CSS/JS"],
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