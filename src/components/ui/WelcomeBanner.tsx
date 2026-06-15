"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. We added a pageKey prop (defaults to "home")
export function WelcomeBanner({ pageKey = "home" }: { pageKey?: string }) {
  const [name, setName] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("visitorName");
    
    // 2. We use the pageKey to create a unique session ID for each page
    const sessionKey = `hasSeenWelcome_${pageKey}`;
    const hasSeenWelcome = sessionStorage.getItem(sessionKey);

    if (storedName && !hasSeenWelcome) {
      setName(storedName);
      setIsVisible(true);
      
      // 3. Flag that they've seen it on THIS specific page
      sessionStorage.setItem(sessionKey, "true");
    }
  }, [pageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !name) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex items-center justify-between gap-4 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm px-5 py-3"
      >
        <p className="font-body-md text-body-md text-on-surface">
          Welcome back,{" "}
          <span className="font-semibold text-primary">{name}</span>!
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss welcome banner"
          className="shrink-0 p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}