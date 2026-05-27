import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Grid,
  Moon,
  RotateCw,
  AlertTriangle,
  Image as ImageIcon,
  Check,
  X,
  Share2,
} from "lucide-react";

export default function IOSCameraApp() {
  const [facingMode, setFacingMode] = useState("environment"); // "user" (front) or "environment" (back)
  const [cameraMode, setCameraMode] = useState("PHOTO");
  const [zoom, setZoom] = useState("1x");
  const [flash, setFlash] = useState(true);
  
  const [capturedImage, setCapturedImage] = useState(null); // Preview state
  const [errorMessage, setErrorMessage] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Helper to completely stop active camera stream
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
  };

  // Improved stream request handling for mobile camera flipping
  const startCamera = async (modeToUse = facingMode) => {
    setErrorMessage("");
    stopStream();

    let constraints = {
      video: {
        facingMode: { exact: modeToUse },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    };

    try {
      // 1. Try exact facing mode first
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      applyStream(stream);
    } catch (err) {
      console.warn("Exact facingMode failed, trying ideal constraint...", err);
      try {
        // 2. Try ideal facing mode fallback
        const idealStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: modeToUse },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        applyStream(idealStream);
      } catch (fallbackErr) {
        console.warn("Ideal facingMode failed, searching device IDs directly...", fallbackErr);
        
        // 3. Device ID Enumeration Fallback (Guarantees back/front switch on mobile web)
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter((d) => d.kind === "videoinput");

          if (videoDevices.length > 0) {
            // Find target camera by label keyword or pick index
            const targetDevice = videoDevices.find((device) =>
              modeToUse === "environment"
                ? device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear")
                : device.label.toLowerCase().includes("front")
            ) || videoDevices[0];

            const deviceStream = await navigator.mediaDevices.getUserMedia({
              video: { deviceId: { exact: targetDevice.deviceId } },
              audio: false,
            });
            applyStream(deviceStream);
          } else {
            throw new Error("No video devices found.");
          }
        } catch (finalErr) {
          console.error("Camera switch completely failed:", finalErr);
          setErrorMessage("Unable to switch camera.");
        }
      }
    }
  };

  const applyStream = (stream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  // Trigger camera switch
  const toggleCamera = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  useEffect(() => {
    startCamera();
    return () => stopStream();
  }, []);

  // Capture current video frame
  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-between items-center relative overflow-hidden select-none font-sans">
      
      {/* 1. TOP HEADER BAR */}
      <div className="w-full px-5 pt-12 pb-3 pl-15 flex justify-between items-center z-20">
        <div className="bg-zinc-800/80 backdrop-blur-md px-3  py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/10 flex items-center gap-1">
          <span>JPEG</span>
          <span className="text-[10px] text-zinc-400">24</span>
        </div>

        <div className="bg-zinc-800/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-4 border border-white/10">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Moon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setFlash(!flash)}
            className={`transition-colors ${flash ? "text-yellow-400" : "text-zinc-400"}`}
          >
