import { useState } from "react";
import { publications, projects, magazines } from "../data";
import { AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  Database,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

function PublicationCard({
  pub,
  isExpanded,
  toggleExpand,
  isDark,
  index,
}: {
  pub: Publication;
  isExpanded: boolean;
  toggleExpand: () => void;
  isDark: boolean;
  index: number;
  key?: string;
}) {
  const paperTypeLabel =
    pub.type === "Conference" ? "Conference Paper" : "Research Paper";
  const readingTime = calculateReadingTime(pub.summary || pub.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(8px)", scale: 0.95, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1, rotateX: 0 }}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ perspective: "1000px" }}
    >
      <div
        onClick={toggleExpand}
        style={{
          transformStyle: "preserve-3d",
          transform: isExpanded
            ? "rotateX(2deg) rotateY(-2deg) scale(1.02)"
            : "rotateX(0deg) rotateY(0deg) scale(1)",
        }}
        className={`p-6 border transition-all duration-500 cursor-pointer hover:shadow-2xl ${
          isDark
            ? "border-white/10 hover:border-white/30 bg-[#1A1A1A] hover:bg-[#222]"
            : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-1 text-[9px] uppercase tracking-widest border ${
                  isDark ? "border-white/20" : "border-black/20"
                }`}
              >
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
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Expandable summary & External Link */}
        {isExpanded && (
          <div
            className={`mt-3 pt-3 border-t border-dashed flex flex-col gap-4 ${
              isDark ? "border-slate-800/40" : "border-slate-200"
            }`}
          >
            <p
              className={`text-xs leading-relaxed font-sans ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
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

function NeuralNetworkButton({
  href,
  isDark,
}: {
  href: string;
  isDark: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center px-8 py-4 font-mono text-[10px] uppercase tracking-widest font-semibold overflow-hidden border transition-all duration-300 ${
        isDark
          ? "border-emerald-500/40 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400"
          : "border-emerald-600/50 text-emerald-800 hover:text-emerald-900 bg-white hover:border-emerald-600 shadow-sm"
      }`}
    >
      {/* Neural nodes and connecting lines effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Nodes */}
        <div
          className={`absolute top-2 left-2 w-1.5 h-1.5 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
        ></div>
        <div
          className={`absolute bottom-2 left-6 w-1 h-1 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
        ></div>
        <div
          className={`absolute top-3 right-8 w-1 h-1 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
        ></div>
        <div
          className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
        ></div>

        {/* Lines */}
        <div
          className={`absolute top-2.5 left-2.5 w-4 h-[1px] origin-top-left rotate-45 ${isDark ? "bg-emerald-500/50" : "bg-emerald-600/30"}`}
        ></div>
        <div
          className={`absolute bottom-2 left-6 w-10 h-[1px] origin-bottom-left -rotate-12 ${isDark ? "bg-emerald-500/50" : "bg-emerald-600/30"}`}
        ></div>
        <div
          className={`absolute top-3 right-8 w-6 h-[1px] origin-top-right rotate-45 ${isDark ? "bg-emerald-500/50" : "bg-emerald-600/30"}`}
        ></div>
        <div
          className={`absolute bottom-2 right-2 w-6 h-[1px] origin-bottom-right -rotate-12 ${isDark ? "bg-emerald-500/50" : "bg-emerald-600/30"}`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 w-8 h-[1px] origin-center -translate-x-1/2 -translate-y-1/2 rotate-12 ${isDark ? "bg-emerald-500/50" : "bg-emerald-600/30"}`}
        ></div>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-out ${
          isDark ? "bg-emerald-500/10" : "bg-emerald-100/60"
        }`}
      />

      <span className="relative flex items-center gap-3 z-10">
        <Database className="w-4 h-4" />
        Explore Kaggle Notebooks
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}


function MagazineDropdown({ isDark, magazinesList }: { isDark: boolean, magazinesList: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!magazinesList || magazinesList.length === 0) return null;
  
  if (magazinesList.length === 1) {
    return (
      <div className="flex justify-end relative z-20">
         <a
          href={magazinesList[0].link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all w-fit ${
            isDark
              ? "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
              : "bg-black/5 hover:bg-black/10 text-black/80 border border-black/10"
          }`}
        >
          <span>Read {magazinesList[0].title}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex justify-end relative z-20">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all w-fit ${
            isDark
              ? "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
              : "bg-black/5 hover:bg-black/10 text-black/80 border border-black/10"
          }`}
        >
          <span>Read the Magazines</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-2 min-w-[200px] border rounded shadow-2xl overflow-hidden backdrop-blur-xl ${
                isDark ? "bg-[#1A1A1A]/90 border-white/10" : "bg-white/90 border-black/5"
              }`}
            >
              {magazinesList.map((mag) => (
                <a
                  key={mag.id}
                  href={mag.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-4 py-3 text-xs transition-colors border-b last:border-b-0 ${
                    isDark ? "border-white/5 hover:bg-white/5 text-white/90" : "border-black/5 hover:bg-black/5 text-black/90"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold font-serif">{mag.title}</span>
                    <span className="text-[9px] font-mono opacity-50 uppercase tracking-wider">{mag.date}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  isDark
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1.5 rounded-full border transition-all ${
          currentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''
        } ${
          isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/10 text-black'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-1.5 mx-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-mono transition-all ${
              currentPage === i + 1
                ? (isDark ? 'bg-orange-500 text-white border-transparent' : 'bg-orange-600 text-white border-transparent')
                : (isDark ? 'border-transparent hover:bg-white/10 text-white/70' : 'border-transparent hover:bg-black/10 text-black/70')
            } border`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1.5 rounded-full border transition-all ${
          currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : ''
        } ${
          isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/10 text-black'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function PublicationsList({ theme }: PublicationsListProps) {

  const [expandedPub, setExpandedPub] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  
  const [pubsPage, setPubsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const isDark = theme === "dark";

  const categories = [
    "All",
    "Neuroscience",
    "AI & ML",
    "Network Science",
    "Cognitive Science",
    "Social Impact",
    "Publications",
  ];

  const filteredProjects =
    filter === "All" || filter === "Publications"
      ? projects
      : projects.filter((p) => p.category === filter);

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
            onClick={() => { setFilter(cat); setPubsPage(1); setProjectsPage(1); }}
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
      <div className="grid grid-cols-1 gap-8">
        {/* Render publications if filter is "All" or "Publications" */}
        {(filter === "All" || filter === "Publications") && (
          <div className="space-y-6">
            <h4 id="publications-header" className={`scroll-mt-32 text-xl font-serif tracking-tight flex items-center justify-between border-b pb-3 mb-6 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <span>Selected Publications</span>
              <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                {publications.length} items
              </span>
            </h4>
            
            <div className="grid grid-cols-1 gap-4">
              {publications
                .slice((pubsPage - 1) * ITEMS_PER_PAGE, pubsPage * ITEMS_PER_PAGE)
                .map((pub, idx) => (
                  <PublicationCard
                    key={pub.id}
                    pub={pub}
                    isExpanded={expandedPub === pub.id}
                    toggleExpand={() => toggleExpandPub(pub.id)}
                    isDark={isDark}
                    index={idx}
                  />
              ))}
            </div>
            
            <PaginationControls
              currentPage={pubsPage}
              totalPages={Math.ceil(publications.length / ITEMS_PER_PAGE)}
              onPageChange={(page) => {
                setPubsPage(page);
                document.getElementById('publications-header')?.scrollIntoView({ behavior: 'smooth' });
              }}
              isDark={isDark}
            />
          </div>
        )}

        {/* Render empirical projects */}
        {filter !== "Publications" && (
          <div className="space-y-6 mt-8">
            <div id="empirical-projects-header" className={`scroll-mt-32 flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 mb-6 gap-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <h4 className="text-xl font-serif tracking-tight flex items-center gap-3">
                <span>Empirical Research & Core Implementations</span>
                <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest bg-slate-500/10 px-2 py-0.5 rounded">
                  {filteredProjects.length} items
                </span>
              </h4>
              
              {filter === "All" && <MagazineDropdown isDark={isDark} magazinesList={magazines} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects
                .slice((projectsPage - 1) * ITEMS_PER_PAGE, projectsPage * ITEMS_PER_PAGE)
                .map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 50, filter: "blur(8px)", rotateX: -15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0, scale: 1 }}
                  whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 0, rotateX: 0, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.1, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ perspective: "1000px" }}
                >
                  <div
                    style={{ transformStyle: "preserve-3d" }}
                    className={`p-6 sm:p-8 border flex flex-col justify-between transition-all duration-500 hover:shadow-2xl h-full ${
                      isDark
                        ? "border-white/10 hover:border-white/30 bg-[#1A1A1A] hover:bg-[#222]"
                        : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 text-[9px] uppercase tracking-widest border ${
                              isDark ? "border-white/20" : "border-black/20"
                            }`}
                          >
                            {p.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-50 ml-2">
                            <Clock className="w-3 h-3" />
                            <span>
                              {calculateReadingTime(
                                p.description + " " + p.details.join(" "),
                              )}{" "}
                              min read
                            </span>
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
                            <div
                              key={idx}
                              className={`p-2 rounded-xl ${isDark ? "bg-slate-950/60" : "bg-slate-50"}`}
                            >
                              <div className="text-[8px] font-mono text-slate-400 uppercase">
                                {m.label}
                              </div>
                              <div
                                className={`text-xs font-mono font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}
                              >
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Details list */}
                      <ul className="space-y-1.5 mt-4">
                        {p.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-[11px] opacity-70 leading-normal"
                          >
                            <span className="opacity-50">-</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-4 border-t border-slate-800/10">
                      {p.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 bg-slate-800/5 rounded border border-slate-800/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <PaginationControls
              currentPage={projectsPage}
              totalPages={Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)}
              onPageChange={(page) => {
                setProjectsPage(page);
                document.getElementById('empirical-projects-header')?.scrollIntoView({ behavior: 'smooth' });
              }}
              isDark={isDark}
            />
          </div>
        )}
      </div>

      {/* Kaggle Creative Banner */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`mt-16 md:col-span-2 relative overflow-hidden p-6 sm:p-8 md:p-12 border ${
            isDark
              ? "border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent"
              : "border-emerald-500/30 bg-gradient-to-r from-emerald-50 to-transparent"
          }`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-emerald-500 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500 animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 border rounded ${isDark ? "border-emerald-500/30 bg-emerald-500/10" : "border-emerald-300 bg-emerald-100/50"}`}
                >
                  <Database
                    className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                  />
                </div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
                >
                  More Explorations
                </span>
              </div>
              <h4 className="text-2xl font-serif tracking-tight mb-2">
                Data Science & Competitions
              </h4>
              <p className="text-sm font-light opacity-80 leading-relaxed">
                While my selected major works are detailed above, I also
                actively experiment with datasets, build predictive models, and
                share notebooks on Kaggle. Explore my other exploratory data
                analyses and competition entries.
              </p>
            </div>

            <NeuralNetworkButton
              href="https://www.kaggle.com/georgeokello/"
              isDark={isDark}
            />
          </div>
        </motion.div>
    </div>
  );
}
