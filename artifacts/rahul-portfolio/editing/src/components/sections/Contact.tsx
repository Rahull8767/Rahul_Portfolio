import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    emailjs?: {
      send: (serviceId: string, templateId: string, params: Record<string, string>, publicKey: string) => Promise<{ status: number; text: string }>;
    };
  }
}

const SOCIALS = [
  { icon: Mail, label: "Email", href: "mailto:tembharerahul28@gmail.com", value: "tembharerahul28@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/Rahull8767", value: "github.com/Rahull8767" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rahultembhare/", value: "Connect on LinkedIn" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/i.am_rahulllll/", value: "@i.am_rahulllll" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const formStartRef = useRef<number>(0);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFocus = () => {
    if (formStartRef.current === 0) formStartRef.current = Date.now();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (values.honeypot) return;
    if (Date.now() - formStartRef.current < 3000) {
      setErrorMsg("Please take a moment to complete the form.");
      setStatus("error");
      return;
    }

    if (!values.name || !values.email || !values.subject || values.message.length < 20) {
      setErrorMsg("Please fill all fields. Message must be at least 20 characters.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS not configured");
      }

      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(serviceId, templateId, {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      }, publicKey);

      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", honeypot: "" });
      formStartRef.current = 0;
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try emailing me directly.");
    }
  };

  return (
    <section id="contact" className="py-24 px-4" aria-labelledby="contact-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2">curl -X POST /contact</p>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Let's Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-sm">
              I'm actively looking for software engineering internships, IoT and AI/ML opportunities, and project collaborations. Whether you have a question or just want to say hello — my inbox is always open.
            </p>

            <div className="space-y-3">
              {SOCIALS.map(({ icon: Icon, label, href, value }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-primary/30 hover:shadow-[0_0_12px_rgba(0,245,255,0.08)] transition-all duration-200 group"
                  aria-label={`${label}: ${value}`}
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_8px_rgba(0,245,255,0.3)] transition-all">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm text-foreground font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 space-y-4"
              aria-label="Contact form"
              noValidate
            >
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={values.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all font-sans"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all font-sans"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground mb-1.5">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={values.subject}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Internship opportunity / Project collaboration / etc."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all font-sans"
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5">Message * (min 20 chars)</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Tell me about the opportunity or project..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all resize-none font-sans"
                  data-testid="input-message"
                />
                <p className={`text-xs mt-1 font-mono ${values.message.length >= 20 ? "text-green-400/70" : "text-muted-foreground/50"}`}>
                  {values.message.length} / 20+ characters
                </p>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5" role="alert">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  status === "success"
                    ? "bg-green-500/20 border border-green-500/40 text-green-400 shadow-[0_0_16px_rgba(74,222,128,0.2)]"
                    : status === "loading"
                    ? "bg-primary/10 border border-primary/30 text-primary/60 cursor-not-allowed"
                    : "bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 hover:shadow-[0_0_18px_rgba(0,245,255,0.3)]"
                }`}
                data-testid="button-send-message"
              >
                {status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : status === "loading" ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
