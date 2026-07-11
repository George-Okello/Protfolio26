import { useState } from "react";
import { publications, projects } from "../data";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Clock } from "lucide-react";
import { Publication } from "../types";
import { motion } from "motion/react";

interface PublicationsListProps {
  theme: "dark" | "light";
}

function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

function PublicationCard({ pub, isExpanded, toggleExpand, isDark, index }: { pub: Publication, isExpanded: boolean, toggleExpand: () => void, isDark: boolean, index: number, key?: string }) {
  const paperTypeLabel = pub.type === "Conference" ? "Conference Paper" : "Research Paper";
  const readingTime = calculateReadingTime(pub.summary || pub.title);

  return (
    <motion.div 
      variants={itemVariants}
      style={{ perspective: "1000px" }}
    >
      <div
        onClick={toggleExpand}
        style={{ 
          transformStyle: "preserve-3d",
          transform: isExpanded ? "rotateX(2deg) rotateY(-2deg) scale(1.02)" : "rotateX(0deg) rotateY(0deg) scale(1)"
        }}
        className={`p-6 border transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:rotate-x-2 hover:-rotate-y-2 hover:shadow-2xl ${
          isDark
            ? "border-white/10 hover:border-white/30 bg-[#1A1A1A] hover:bg-[#222]"
            : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 text-[9px] uppercase tracking-widest border ${
                isDark ? "border-white/20" : "border-black/20"
              }`}>
                {pub.status}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-50">
                <span>{paperTypeLabel}</span>
                <span className="opacity-50">•</span>
                <Clock className="w-3 h-3" />
                <span>{readingTime} min read</span>
              </span>
            </div>
            <h5 className="text-lg font-serif tracking-tight mt-3">
              {pub.title}
            </h5>
            <p className="text-[10px] uppercase tracking-widest opacity-70 mt-2">
              {pub.authors}
            </p>
          </div>

          <div className="text-slate-400 p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {/* Expandable summary & External Link */}
        {isExpanded && (
          <div className={`mt-3 pt-3 border-t border-dashed flex flex-col gap-4 ${
            isDark ? "border-slate-800/40" : "border-slate-200"
          }`}>
            <p className={`text-xs leading-relaxed font-sans ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {pub.summary}
            </p>
            
            <div className="flex justify-end">
              <a 
                href={pub.link || "#"}
                target={pub.link ? "_blank" : "_self"}
                rel={pub.link ? "noopener noreferrer" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!pub.link) e.preventDefault(); // Prevent navigation if no link
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${
                  pub.link 
                    ? isDark
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-black/5 hover:bg-black/10 text-black"
                    : isDark
                      ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                      : "bg-black/5 text-black/30 cursor-not-allowed border border-black/5"
                }`}
              >
                <span>{pub.link ? "View Paper" : "DOI / Link Pending"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PublicationsList({ theme }: PublicationsListProps) {
  const [expandedPub, setExpandedPub] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const isDark = theme === "dark";

  const categories = ["All", "Neuroscience", "AI & ML", "Social Impact", "Publications"];

  const filteredProjects = filter === "All" || filter === "Publications"
    ? projects
    : projects.filter(p => p.category === filter);

  const toggleExpandPub = (id: string) => {
    setExpandedPub(expandedPub === id ? null : id);
  };

  return (
    <div className="space-y-8" id="publications-and-projects-portfolio">
      {/* Category selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/10 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 border rounded-full text-[10px] uppercase tracking-widest transition-all ${
              filter === cat
                ? isDark
                  ? "border-[#F7F7F7] bg-[#F7F7F7] text-[#121212]"
                  : "border-[#121212] bg-[#121212] text-[#F7F7F7]"
                : isDark
                  ? "border-transparent hover:border-[#F7F7F7]/30 text-[#F7F7F7]/70"
                  : "border-transparent hover:border-[#121212]/30 text-[#121212]/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects / Publications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Render publications if filter is "All" or "Publications" */}
        {(filter === "All" || filter === "Publications") && (
          <div className="md:col-span-2 space-y-8">
            
            {/* Conference Papers Section */}
            {publications.filter(p => p.type === "Conference").length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest mb-3 opacity-50 italic">
                  Conference Papers
                </h4>
                <motion.div 
                  className="grid grid-cols-1 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {publications.filter(p => p.type === "Conference").map((pub, idx) => (
                    <PublicationCard 
                      key={pub.id} 
                      pub={pub} 
                      isExpanded={expandedPub === pub.id} 
                      toggleExpand={() => toggleExpandPub(pub.id)} 
                      isDark={isDark} 
                      index={idx}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Academic Publications & Preprints */}
            <div>
              <h4 className="text-[10px] uppercase tracking-widest mb-3 opacity-50 italic">
                Academic Publications & Preprints
              </h4>
              
              <motion.div 
                className="grid grid-cols-1 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {publications.filter(p => p.type !== "Conference").map((pub, idx) => (
                  <PublicationCard 
                    key={pub.id} 
                    pub={pub} 
                    isExpanded={expandedPub === pub.id} 
                    toggleExpand={() => toggleExpandPub(pub.id)} 
                    isDark={isDark} 
                    index={idx}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Render empirical projects */}
        {filter !== "Publications" && (
          <div className="md:col-span-2 space-y-4">
            {filter === "All" && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h4 className="text-[10px] uppercase tracking-widest opacity-50 italic mb-0">
                  Empirical Research & Core Implementations
                </h4>
                <a 
                  href="https://online.anyflip.com/ckosy/cscn/mobile/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all w-fit ${
                    isDark 
                      ? "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10" 
                      : "bg-black/5 hover:bg-black/10 text-black/80 border border-black/10"
                  }`}
                >
                  <span>Read the Full Magazine</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredProjects.map((p, idx) => (
                <motion.div 
                  key={p.id} 
                  variants={itemVariants}
                  style={{ perspective: "1000px" }}
                >
                  <div
                    style={{ transformStyle: "preserve-3d" }}
                    className={`p-8 border flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 hover:rotate-y-2 hover:shadow-2xl h-full ${
                      isDark
                        ? "border-white/10 hover:border-white/30 bg-[#1A1A1A] hover:bg-[#222]"
                        : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
                    }`}
                  >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-widest border ${
                          isDark ? "border-white/20" : "border-black/20"
                        }`}>
                          {p.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-50 ml-2">
                          <Clock className="w-3 h-3" />
                          <span>{calculateReadingTime(p.description + " " + p.details.join(" "))} min read</span>
                        </span>
                      </div>
                      <BookOpen className="w-4 h-4 text-slate-400" />
                    </div>

                    <h5 className="text-xl font-serif tracking-tight mt-4">
                      {p.title}
                    </h5>
                    
                    <p className="text-xs mt-3 leading-relaxed opacity-80 font-light">
                      {p.description}
                    </p>

                    {/* Metrics list */}
                    {p.metrics && p.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {p.metrics.map((m, idx) => (
                          <div key={idx} className={`p-2 rounded-xl ${isDark ? "bg-slate-950/60" : "bg-slate-50"}`}>
                            <div className="text-[8px] font-mono text-slate-400 uppercase">{m.label}</div>
                            <div className={`text-xs font-mono font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Details list */}
                    <ul className="space-y-1.5 mt-4">
                      {p.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] opacity-70 leading-normal">
                            <span className="opacity-50">—</span>
                            <span>{detail}</span>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-4 border-t border-slate-800/10">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 bg-slate-800/5 rounded border border-slate-800/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
