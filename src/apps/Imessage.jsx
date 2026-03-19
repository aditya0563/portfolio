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
