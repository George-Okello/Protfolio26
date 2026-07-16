import { educations, certifications } from "../data";
import {
  GraduationCap,
  BookOpen,
  Orbit,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface EducationSpiralProps {
  theme: "dark" | "light";
}

export default function EducationSpiral({ theme }: EducationSpiralProps) {
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="relative py-24" id="academic-education" ref={containerRef}>
      {/* Visual background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 180]) }}
          className="w-[800px] h-[800px] border-[1px] border-current rounded-full"
        />
        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
          className="absolute w-[600px] h-[600px] border-[1px] border-current rounded-full"
        />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-orange-500/10 text-orange-600 dark:text-orange-400"
          >
            <Orbit className="w-6 h-6" />
          </motion.div>
          <h3 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
            Educational Trajectory
          </h3>
          <p className="text-xs font-mono uppercase tracking-widest opacity-60">
            Degrees & Specialized Certifications
          </p>
        </div>

        {/* Degrees Spiral */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-0 flex flex-col items-center mb-24">
          {educations.map((edu, idx) => {
            // Create a spiral offset effect
            const offsetX = idx % 2 === 0 ? -40 : 40;

            return (
              <motion.div
                key={edu.id}
                initial={{
                  opacity: 0,
                  x: offsetX,
                  y: 100,
                  rotateZ: idx % 2 === 0 ? -5 : 5,
                  scale: 0.95,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateZ: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                }}
                viewport={{ once: false, amount: 0.2, margin: "-10%" }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                  delay: idx * 0.1,
                }}
                className={`relative w-full md:w-[600px] p-6 sm:p-8 md:p-10 border transition-all duration-500 z-10 hover:z-20 ${
                  isDark
                    ? "bg-[#1A1A1A]/90 backdrop-blur-md border-white/10 hover:border-orange-500/30 hover:bg-[#222]/90 hover:shadow-2xl hover:shadow-orange-900/20"
                    : "bg-white/90 backdrop-blur-md border-black/5 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
                }`}
                style={{
                  // Stagger overlapping effect like a staircase
                  marginTop: idx === 0 ? 0 : "-40px",
                  marginLeft: idx % 2 === 0 ? "-5%" : "5%",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div
                    className={`p-4 rounded-xl shrink-0 ${isDark ? "bg-slate-900 border border-slate-800" : "bg-slate-50 border border-slate-200"}`}
                  >
                    <GraduationCap className="w-8 h-8 text-orange-500" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-2xl font-serif leading-tight mb-2">
                      {edu.degree}
                    </h4>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs font-mono uppercase tracking-widest opacity-70">
                        {edu.school}
                      </span>
                      <span className="opacity-30">•</span>
                      <span className="text-xs font-mono opacity-50">
                        {edu.location}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {edu.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-sm font-light leading-relaxed opacity-80 flex items-start gap-3"
                        >
                          <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 opacity-50 text-orange-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {edu.thesis && (
                      <div
                        className={`p-5 border-l-2 border-orange-500 ${isDark ? "bg-orange-500/5" : "bg-orange-50"}`}
                      >
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-2">
                          <BookOpen className="w-3.5 h-3.5" />
                          Thesis Focus
                        </div>
                        <div className="font-medium text-sm mb-1">
                          {edu.thesis.title}
                        </div>
                        <div className="text-xs opacity-70 leading-relaxed">
                          {edu.thesis.description}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-12 text-center">
            <h4 className="text-2xl font-serif tracking-tight">
              Specialized Certifications
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(8px)" }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                }}
                viewport={{ once: false, amount: 0.1, margin: "-10%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.15,
                }}
                className={`p-6 border flex flex-col gap-4 transition-colors ${
                  isDark
                    ? "bg-[#121212] border-white/5 hover:border-orange-500/30"
                    : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-orange-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-medium mb-2">{cert.title}</h5>
                  <p className="text-xs leading-relaxed opacity-60">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
