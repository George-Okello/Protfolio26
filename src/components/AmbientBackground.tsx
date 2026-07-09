import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AmbientBackground({ isDark }: { isDark: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Noise Overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isDark ? "opacity-[0.25]" : "opacity-[0.1]"}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Playful Gradient Blobs */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-60 mix-blend-screen" : "opacity-30 mix-blend-multiply"}`}>
        <motion.div
          animate={{
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-10%", "5%", "0%"],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${
            isDark ? "bg-indigo-600/30" : "bg-purple-300/40"
          }`}
        />
        <motion.div
          animate={{
            x: ["0%", "-15%", "10%", "0%"],
            y: ["0%", "10%", "-15%", "0%"],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full blur-[120px] ${
            isDark ? "bg-cyan-600/20" : "bg-blue-300/40"
          }`}
        />
        <motion.div
          animate={{
            x: ["0%", "5%", "-10%", "0%"],
            y: ["0%", "20%", "-5%", "0%"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[120px] ${
            isDark ? "bg-purple-600/20" : "bg-amber-200/40"
          }`}
        />
      </div>
    </div>
  );
}
