import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaVideo,
  FaPhoneAlt,
  FaPaperPlane,
  FaEnvelope,
  FaCheckDouble,
  FaUser,
  FaAt,
} from "react-icons/fa";

export default function IMessageApp() {
  // ==============================
  // EMAILJS CONFIGURATION
  // ==============================

  const MY_EMAIL = "bikashdalapati09@gmail.com";
  const SERVICE_ID = "service_8h1ueni";
  const TEMPLATE_ID = "template_gwh23vg";
  const PUBLIC_KEY = "0Ri5ZPAZXH-9LkaEK";

  // ==============================
  // FORM STATES
  // ==============================

  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");

  const [isSending, setIsSending] = useState(false);

  // Initial greeting message content
  const initialGreetings = [
    "Hey! Thanks for checking out my OS portfolio. 👋",
    "Are you looking to hire a full-stack developer, or just browsing?",
  ];

  // ==============================
  // INITIAL CHAT MESSAGES STATE
  // ==============================

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: initialGreetings[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: 2,
      sender: "system",
      text: initialGreetings[1],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const messagesEndRef = useRef(null);

  // ==============================
  // AUTO SCROLL CHAT
  // ==============================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==============================
  // SEND EMAIL
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !visitorName.trim() ||
      !visitorEmail.trim() ||
      !visitorMessage.trim()
    ) {
      return;
    }

    setIsSending(true);

    const getTime = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    // Add visitor message to chat immediately
    const userMsg = {
      id: Date.now(),
      sender: "user",
      name: visitorName,
      email: visitorEmail,
      text: visitorMessage,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      // ==============================
      // EMAILJS SEND
      // ==============================

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: visitorName,
          from_email: visitorEmail,
          message: visitorMessage,
          to_email: MY_EMAIL,
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      // ==============================
      // SUCCESS MESSAGE
      // ==============================

      const successMessage = {
        id: Date.now() + 1,
        sender: "system",
        text: `Thanks for reaching out, ${visitorName}! Your message has been sent successfully. I'll get back to you shortly.`,
        time: getTime(),
      };

      setMessages((prev) => [...prev, successMessage]);

      // Clear form
      setVisitorName("");
      setVisitorEmail("");
      setVisitorMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);

      // ==============================
      // ERROR MESSAGE
      // ==============================

      const errorMessage = {
        id: Date.now() + 1,
        sender: "system",
        text: "Sorry, your message could not be sent. Please try again.",
        time: getTime(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  // ==============================
  // FORM VALIDATION
  // ==============================

  const isFormValid =
    visitorName.trim() &&
    visitorEmail.trim() &&
    visitorMessage.trim();

  // ==============================
  // UI
  // ==============================

  return (
    <div className="w-full h-full bg-[#121214] text-white flex flex-col md:flex-row font-sans overflow-hidden select-none border border-white/10 rounded-b-2xl shadow-2xl backdrop-blur-2xl">

      {/* ========================================= */}
      {/* LEFT SIDEBAR (FORM & MOBILE GREETINGS) */}
      {/* ========================================= */}

      <div className="w-full md:w-80 bg-[#1e1e24]/70 backdrop-blur-xl border-r border-white/10 flex flex-col h-full shrink-0">

        {/* Header */}
        {/* Header */}
<div className="pt-14 pb-3 pl-16 pr-4 md:py-4 md:px-4 border-b border-white/10 flex items-center justify-between shrink-0">
  <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
    IMESSAGE CONTACT
  </span>
</div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {/* Scrollable Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            
            {/* MOBILE ONLY GREETINGS HEADER */}
            <div className="block md:hidden space-y-2 mb-2">
              {initialGreetings.map((text, idx) => (
                <div
                  key={idx}
                  className="bg-[#25252b] text-zinc-100 p-3 rounded-2xl rounded-bl-xs text-xs border border-white/5 shadow-sm max-w-[90%]"
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="px-1 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Let's Connect
            </div>

            {/* NAME */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <FaUser className="text-[10px] text-[#007AFF]" />
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                disabled={isSending}
                className="w-full bg-[#121215]/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 outline-none focus:border-[#007AFF] transition-all disabled:opacity-50"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <FaAt className="text-[10px] text-[#007AFF]" />
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email..."
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                disabled={isSending}
                className="w-full bg-[#121215]/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 outline-none focus:border-[#007AFF] transition-all disabled:opacity-50"
              />
            </div>

            {/* MESSAGE */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <FaEnvelope className="text-[10px] text-[#007AFF]" />
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Enter your message..."
                value={visitorMessage}
                onChange={(e) => setVisitorMessage(e.target.value)}
                disabled={isSending}
                className="w-full bg-[#121215]/80 border border-white/10 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 outline-none focus:border-[#007AFF] transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* SEND BUTTON */}
            <div className="w-full flex items-center justify-center pt-2">
              <button
                type="submit"
                disabled={!isFormValid || isSending}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isFormValid && !isSending
                    ? "bg-[#007AFF] hover:bg-blue-500 text-white shadow-lg shadow-[#007AFF]/25 cursor-pointer"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60"
                }`}
              >
                {isSending ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-3 border-t border-white/10 text-center bg-[#18181c]/50 shrink-0">
            <span className="text-[10px] text-zinc-500 font-mono block w-full text-center">
              Direct Mailer • {MY_EMAIL}
            </span>
          </div>
        </form>
      </div>

      {/* ========================================= */}
      {/* RIGHT CHAT WINDOW (DESKTOP / MD+) */}
      {/* ========================================= */}

      <div className="hidden md:flex flex-1 flex-col bg-[#0d0d10] relative overflow-hidden">

        {/* CHAT TOOLBAR */}
        <div className="px-5 py-3 bg-[#18181c]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-white leading-tight">
                Bikash
              </span>
              <span className="text-[10px] text-zinc-400">
                Full-Stack Developer •{" "}
                <span className="text-emerald-400 font-medium">
                  Available
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#007AFF]">
            {/* DIRECT EMAIL */}
            <a
              href={`mailto:${MY_EMAIL}`}
              className="flex items-center justify-center gap-1.5 bg-[#007AFF] hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all"
            >
              <FaEnvelope className="text-xs" />
              <span>Direct Email</span>
            </a>

            {/* VIDEO */}
            <button
              type="button"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Video Call"
            >
              <FaVideo className="text-xs" />
            </button>

            {/* PHONE */}
            <button
              type="button"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Audio Call"
            >
              <FaPhoneAlt className="text-xs" />
            </button>
          </div>
        </div>

        {/* MESSAGE STREAM */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3">
          <div className="text-center my-1 flex items-center justify-center">
            <span className="text-[9px] text-zinc-500 bg-[#18181c] border border-white/5 px-3 py-1 rounded-full font-mono text-center">
              Messages typed will send directly to {MY_EMAIL}
            </span>
          </div>

          {/* MESSAGES */}
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                {/* USER NAME */}
                {isUser && (
                  <span className="text-[10px] text-zinc-400 mb-1 px-1">
                    {msg.name} ({msg.email})
                  </span>
                )}

                {/* MESSAGE BUBBLE */}
                <div
                  className={`max-w-[85%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-md relative ${
                    isUser
                      ? "bg-[#007AFF] text-white rounded-br-xs"
                      : "bg-[#25252b] text-zinc-100 rounded-bl-xs border border-white/5"
                  }`}
                >
                  <p>{msg.text}</p>

                  <div
                    className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                      isUser ? "text-blue-100" : "text-zinc-400"
                    }`}
                  >
                    <span>{msg.time}</span>

                    {isUser && (
                      <FaCheckDouble className="text-[9px]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}