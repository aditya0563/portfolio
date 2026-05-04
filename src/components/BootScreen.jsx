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
        className="w-20 h-20 object-contain"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="h-full bg-white rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default memo(BootScreen);