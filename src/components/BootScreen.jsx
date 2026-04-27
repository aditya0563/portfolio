import React, { memo } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const BootScreen = () => {
  return (
    <motion.div
      key="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6 pointer-events-none"
    >
      <motion.img 
        src={logo} 
        alt="Logo" 
