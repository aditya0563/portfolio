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
            <Zap className="w-4 h-4 fill-current" />
          </button>

          <button className="text-zinc-400 hover:text-white transition-colors">
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. VIEWFINDER AREA WITH LIVE FEED & RETICLE */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${
            facingMode === "user" ? "scale-x-[-1]" : ""
          }`}
        />

        {/* Yellow Focus Reticle Overlay */}
        <div className="absolute w-44 h-44 border border-yellow-400/80 pointer-events-none flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-0.5 bg-yellow-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-0.5 bg-yellow-400" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-0.5 bg-yellow-400" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2 w-0.5 bg-yellow-400" />
        </div>

        {errorMessage && (
          <div className="absolute bg-black/80 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* 3. CAMERA CONTROLS BAR */}
      <div className="w-full bg-black/90 pb-8 pt-2 flex flex-col items-center gap-5 z-20">
        
        {/* Zoom Selector (.5, 1x, 2) */}
        <div className="flex items-center gap-6">
          {[" .5 ", "1x", "2"].map((val) => {
            const isSelected = zoom === val.trim();
            return (
              <button
                key={val}
                onClick={() => setZoom(val.trim())}
                className={`text-xs font-semibold transition-all ${
                  isSelected
                    ? "w-8 h-8 rounded-full bg-zinc-800 text-yellow-400 flex items-center justify-center border border-yellow-400/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>

        {/* Shutter Button Row */}
        <div className="w-full px-8 flex items-center justify-between">
          
          {/* Gallery Thumbnail */}
          <button
            onClick={() => capturedImage && setIsPreviewOpen(true)}
            className="w-12 h-12 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
          >
            {capturedImage ? (
              <img src={capturedImage} alt="Thumbnail" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-zinc-500" />
            )}
          </button>

          {/* Shutter Button */}
          <button
            onClick={takePhoto}
            className="w-18 h-18 rounded-full border-4 border-zinc-700/80 flex items-center justify-center active:scale-90 transition-transform cursor-pointer p-0.5"
          >
            <div className="w-full h-full bg-white rounded-full shadow-inner" />
          </button>

          {/* Camera Flip Button */}
          <button
            onClick={toggleCamera}
            className="w-12 h-12 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer"
          >
            <RotateCw className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="bg-zinc-900/90 border border-white/10 p-1 rounded-full flex items-center gap-1 mt-1">
          <button
            onClick={() => setCameraMode("VIDEO")}
            className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all ${
              cameraMode === "VIDEO" ? "bg-zinc-800 text-yellow-400" : "text-zinc-400"
            }`}
          >
            VIDEO
          </button>
          <button
            onClick={() => setCameraMode("PHOTO")}
            className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all ${
              cameraMode === "PHOTO" ? "bg-zinc-800 text-yellow-400" : "text-zinc-400"
            }`}
          >
            PHOTO
          </button>
        </div>
      </div>

      {/* 4. FULLSCREEN PHOTO PREVIEW MODAL */}
      {capturedImage && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 animate-in fade-in duration-200">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white pt-6">
            <button
              onClick={() => setCapturedImage(null)}
              className="p-2.5 bg-zinc-800/80 rounded-full border border-white/10 text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">Photo Preview</span>
            <button className="p-2.5 bg-zinc-800/80 rounded-full border border-white/10 text-zinc-300 hover:text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Captured Image Display */}
          <div className="relative w-full max-w-sm aspect-[3/4] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl my-auto">
            <img src={capturedImage} alt="Captured photo" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Confirmation Bar */}
          <div className="flex justify-around items-center pb-6">
            <button
              onClick={() => setCapturedImage(null)}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs rounded-full border border-white/10 transition-colors"
            >
              Retake
            </button>
            <button
              onClick={() => setCapturedImage(null)}
              className="px-8 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-full transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Photo
            </button>
          </div>

        </div>
      )}

    </div>
  );
}