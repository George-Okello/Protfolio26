import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
  isDark: boolean;
}

const bootSequence = [
  "Initializing cognitive models...",
  "Loading neural architectures...",
  "Calibrating synaptic weights...",
  "Establishing secure connection..."
];

const brainPath = "M46 15 L31 15 L21 33 L33 33 L39 41 L17 41 L12 50 L17 59 L39 59 L33 67 L21 67 L31 85 L46 85 L46 77 L36 77 L30 67 L46 67 L46 59 L28 59 L23 50 L28 41 L46 41 L46 33 L30 33 L36 23 L46 23 Z";

export default function Loader({ onComplete, isDark }: LoaderProps) {
  const [stage, setStage] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Text cycling
    const textInterval = setInterval(() => {
      setTextIndex(prev => Math.min(prev + 1, bootSequence.length - 1));
    }, 800);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);

    // Sequence of animations
    const timer1 = setTimeout(() => setStage(1), 3500); // Finish loading
    const timer2 = setTimeout(() => {
      setStage(2);
      setTimeout(onComplete, 800); // Fade out and unmount
    }, 4200);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
            isDark ? "bg-[#050505] text-slate-300" : "bg-[#F8F9FA] text-slate-700"
          }`}
        >
          {/* Central brain animation */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#0ea5e9" : "#0284c7"} />
                  <stop offset="100%" stopColor={isDark ? "#14b8a6" : "#0d9488"} />
                </linearGradient>
                <linearGradient id="brain-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              <g id="brain-logo">
                {/* Left Half */}
                <motion.path
                  d={brainPath}
                  fill={progress >= 80 ? (isDark ? "url(#brain-grad)" : "url(#brain-grad-light)") : "transparent"}
                  stroke={isDark ? "url(#brain-grad)" : "url(#brain-grad-light)"}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ 
                    pathLength: Math.max(progress / 100, 0.05),
                    fillOpacity: progress >= 80 ? 1 : 0
                  }}
                  transition={{ 
                    pathLength: { duration: 0.3, ease: "linear" },
                    fillOpacity: { duration: 1.5, ease: "easeOut" }
                  }}
                />
                
                {/* Right Half */}
                <motion.path
                  d={brainPath}
                  transform="translate(100, 0) scale(-1, 1)"
                  fill={progress >= 80 ? (isDark ? "url(#brain-grad)" : "url(#brain-grad-light)") : "transparent"}
                  stroke={isDark ? "url(#brain-grad)" : "url(#brain-grad-light)"}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ 
                    pathLength: Math.max(progress / 100, 0.05),
                    fillOpacity: progress >= 80 ? 1 : 0
                  }}
                  transition={{ 
                    pathLength: { duration: 0.3, ease: "linear" },
                    fillOpacity: { duration: 1.5, ease: "easeOut" }
                  }}
                />
              </g>
            </svg>
            
            {/* Optional glowing effect underneath */}
            <motion.div 
              className={`absolute inset-0 rounded-full blur-3xl -z-10 ${
                isDark ? "bg-cyan-500/20" : "bg-amber-500/20"
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: progress >= 80 ? 1 : 0, scale: progress >= 80 ? 1.2 : 0.5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Boot sequence text */}
          <div className="h-6 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs md:text-sm font-mono tracking-widest uppercase opacity-80"
              >
                {bootSequence[textIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar container */}
          <div className={`w-64 md:w-80 h-px ${isDark ? "bg-white/10" : "bg-black/10"} relative overflow-hidden`}>
            {/* Progress bar fill */}
            <motion.div 
              className={`absolute top-0 left-0 bottom-0 ${isDark ? "bg-cyan-500" : "bg-amber-500"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Progress percentage */}
          <div className="mt-4 text-[10px] font-mono opacity-50 tracking-widest">
            {Math.min(progress, 100)}%
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
