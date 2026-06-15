"use client";

import { profile } from "@/data/portfolio";
import { MapPin, Mail, Code, Briefcase, MessageSquare, Send, Image } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WelcomeBanner } from "@/components/ui/WelcomeBanner";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const SUGGESTED_MESSAGE_HOME = "Hi Aditya, I came across your portfolio and was really impressed by your work with monorepos and full-stack architectures. I'd love to connect and discuss some potential opportunities!";
const SUGGESTED_MESSAGE_HIRE = "Hi Aditya, I am currently looking for a full-stack developer and your profile caught my eye. Are you available for a quick chat about a potential role?";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  // Pre-fill name and email from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("visitorName");
    const savedEmail = localStorage.getItem("visitorEmail");
    if (savedName || savedEmail) {
      setFormData((prev) => ({
        ...prev,
        ...(savedName ? { name: savedName } : {}),
        ...(savedEmail ? { email: savedEmail } : {}),
      }));
    }

    // Check if user navigated from a specific referral source
    const searchParams = new URLSearchParams(window.location.search);
    const ref = searchParams.get("ref");
    if (ref === "home") {
      setActiveSuggestion(SUGGESTED_MESSAGE_HOME);
    } else if (ref === "hire") {
      setActiveSuggestion(SUGGESTED_MESSAGE_HIRE);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Persist name and email to localStorage for the WelcomeBanner
    if (name === "name") {
      localStorage.setItem("visitorName", value);
    } else if (name === "email") {
      localStorage.setItem("visitorEmail", value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    {
      label: "GitHub",
      icon: Code,
      href: profile.githubUrl,
    },
    {
      label: "LinkedIn",
      icon: Briefcase,
      href: profile.linkedinUrl,
    },
    {
      label: "X",
      icon: MessageSquare,
      href: profile.twitterUrl,
    },
    {
      label: "LeetCode",
      icon: Image,
      href: profile.leetcodeUrl,
    },
  ];

  return (
    <>
      <WelcomeBanner pageKey="contact" />
      {/* Header */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <h2 className="font-display-lg text-3xl md:text-4xl lg:text-[48px] leading-tight font-bold text-on-surface">
          Let&apos;s Build Something Together.
        </h2>
      </motion.div>

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-2xl"
      >
        Reach out to discuss projects, monorepo architectures, or just to say
        hi.
      </motion.p>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Contact Form Card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl bg-[#161616] border border-white/5 p-6 md:p-8"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.08),transparent_60%)] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10">
            {/* Name + Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={activeSuggestion || "Tell me about your project..."}
                value={formData.message}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Tab" && formData.message === "" && activeSuggestion) {
                    e.preventDefault();
                    setFormData((prev) => ({ ...prev, message: activeSuggestion }));
                  }
                }}
                required
                rows={6}
                className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-surface-container-high border border-white/10 text-on-surface font-label-sm text-label-sm py-3 px-6 rounded-lg font-bold hover:bg-surface-container-highest hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-on-surface/30 border-t-on-surface rounded-full animate-spin" />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  ✓ Sent!
                </>
              ) : (
                <>
                  Send Message
                  <Send
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Side Info */}
        <div className="flex flex-col gap-6">
          {/* Location Card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-[#161616] border border-white/5 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">
                  Location
                </p>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  {profile.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl bg-[#161616] border border-white/5 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-body-md text-body-md text-on-surface font-medium hover:text-primary transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Connect Card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl bg-[#161616] border border-white/5 p-5"
          >
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-center mb-4">
              Connect
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-container border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group/social"
                  >
                    <Icon
                      size={20}
                      className="text-on-surface-variant group-hover/social:text-primary transition-colors"
                    />
                    <span className="font-label-sm text-xs text-on-surface-variant group-hover/social:text-on-surface transition-colors">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
