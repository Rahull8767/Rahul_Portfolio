import { useState, useRef } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Send, User, Mail } from "lucide-react";
import { motion } from "framer-motion";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export function EditingContactForm() {
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
    if (Date.now() - formStartRef.current < 2000) {
      setErrorMsg("Please take a moment to complete the form.");
      setStatus("error");
      return;
    }

    if (!values.name || !values.email || !values.message) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setErrorMsg("Please enter a valid email address.");
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
        subject: values.subject || "Portfolio Contact",
        message: values.message,
      }, publicKey);

      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", honeypot: "" });
      formStartRef.current = 0;
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <div className="w-full">
      <motion.form
        initial={{ opacity: 1, scale: 1 }}
        animate={status === "success" ? { opacity: 0.9, y: -5 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
        noValidate
      >
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="name" className="text-xs font-bold tracking-wider uppercase text-white/50">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={values.name}
              onChange={handleChange}
              onFocus={handleFocus}
              autoComplete="name"
              placeholder="Your Name"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a855f7] focus:outline-none focus:ring-1 focus:ring-[#a855f7] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-white/50">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange}
              onFocus={handleFocus}
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a855f7] focus:outline-none focus:ring-1 focus:ring-[#a855f7] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="subject" className="text-xs font-bold tracking-wider uppercase text-white/50">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="What is this regarding?"
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a855f7] focus:outline-none focus:ring-1 focus:ring-[#a855f7] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="message" className="text-xs font-bold tracking-wider uppercase text-white/50">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={values.message}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Tell me about your project..."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a855f7] focus:outline-none focus:ring-1 focus:ring-[#a855f7] transition-all resize-none"
          />
        </div>

        {status === "error" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <p>Message sent successfully. I'll get back to you as soon as possible!</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`mt-2 relative z-10 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all w-full
            ${status === "success" 
              ? "bg-green-500/20 text-green-400 border border-green-500/40" 
              : status === "loading"
              ? "bg-[#111] text-white/50 border border-white/10 cursor-not-allowed"
              : "bg-gradient-to-r from-[#a855f7] to-[#ec4899] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02]"
            }
          `}
        >
          {status === "success" ? (
            <>
              <CheckCircle className="w-4 h-4" /> Sent
            </>
          ) : status === "loading" ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.form>

      <div className="mt-8 text-center">
        <p className="text-xs text-white/40 mb-2">Prefer email?</p>
        <a 
          href="mailto:tembharerahul28@gmail.com"
          className="text-sm font-bold tracking-wider text-[#e0aaff] hover:text-white transition-colors"
        >
          tembharerahul28@gmail.com
        </a>
      </div>
    </div>
  );
}
