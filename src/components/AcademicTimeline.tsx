import { useState, useMemo } from "react";
import { experiences, awards } from "../data";
import { Award, MapPin, Layers, Sparkles, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AcademicTimelineProps {
  theme: "dark" | "light";
}

type FilterType = "all" | "research" | "industry" | "service";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

export default function AcademicTimeline({ theme }: AcademicTimelineProps) {
  const isDark = theme === "dark";
  const [filter, setFilter] = useState<FilterType>("all");

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "Full Journey" },
    { id: "research", label: "Teaching & Research" },
    { id: "industry", label: "Industry" },
    { id: "service", label: "Service & Volunteer" }
  ];

  const chronologicalIds = [
    { id: "exp-knls-vol", type: "exp", category: "service", year: "2020" },
    { id: "exp-psc-support", type: "exp", category: "industry", year: "2021" },
    { id: "exp-strath-ds", type: "exp", category: "research", year: "2022" },
    { id: "award-mozilla-grant", type: "award", category: "research", year: "2023" },
    { id: "exp-strath-bi", type: "exp", category: "industry", year: "2023 - 2025" },
    { id: "exp-strath-inst", type: "exp", category: "research", year: "2024" },
    { id: "exp-nd-vr", type: "exp", category: "research", year: "2024" },
    { id: "exp-cultivate-vol", type: "exp", category: "service", year: "2024" },
    { id: "award-innovate-africa", type: "award", category: "research", year: "2024" },
    { id: "exp-apu-ra", type: "exp", category: "research", year: "2025" },
    { id: "exp-re-pca", type: "exp", category: "industry", isCurrent: true, year: "Current" },
  ];

  const groupedItems = useMemo(() => {
    const filtered = chronologicalIds
      .filter((item) => filter === "all" || item.category === filter)
      .map((config) => {
        const data = config.type === "award" 
          ? awards.find(a => a.id === config.id)
          : experiences.find(e => e.id === config.id);
        
        return { ...config, data };
      })
      .filter(item => item.data);

    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(item => {
      if (!groups[item.year]) groups[item.year] = [];
      groups[item.year].push(item);
    });

    const sortedYears = Object.keys(groups).sort((a, b) => {
      if (a === "Current") return 1;
      if (b === "Current") return -1;
      const valA = parseInt(a);
      const valB = parseInt(b);
      if (valA === valB) {
        return a.length - b.length;
      }
      return valA - valB;
    });

    return sortedYears.map(year => ({
      year,
      items: groups[year]
    }));
  }, [filter]);

  const renderCard = (config: any, index: number, totalInYear: number, key: string) => {
    const item = config.data;
    const isAward = config.type === "award";

    const spanClass = (totalInYear % 2 !== 0 && index === totalInYear - 1) || config.isCurrent
      ? "md:col-span-2" 
      : "col-span-1";

    if (isAward) {
      return (
        <motion.div
          key={key}
          layout
          variants={itemVariants}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className={`relative p-6 md:p-8 border flex flex-col justify-between ${spanClass} ${
            isDark 
              ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 backdrop-blur-md" 
              : "border-amber-200/60 bg-gradient-to-br from-amber-50/40 to-white hover:from-amber-50/80 hover:to-white shadow-sm hover:shadow-md"
          } transition-all duration-500 overflow-hidden group`}
        >
          {/* Decorative background blur */}
          <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${isDark ? "bg-amber-500/10 group-hover:bg-amber-500/20" : "bg-amber-400/20 group-hover:bg-amber-400/30"}`} />
          
          {/* Creative Premium Award Seal */}
          <div className="absolute top-0 right-0 p-6 pointer-events-none overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500">
            <div className="relative flex items-center justify-center w-24 h-24">
              <div className={`absolute inset-0 rounded-full border-2 border-dashed ${isDark ? 'border-amber-500/30' : 'border-amber-400/60'} animate-[spin_12s_linear_infinite]`} />
              <div className={`absolute inset-2 rounded-full border ${isDark ? 'border-amber-500/20' : 'border-amber-300/60'} animate-[spin_8s_linear_infinite_reverse]`} />
              <div className={`absolute inset-4 rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/10' : 'bg-amber-100/60'}`}>
                <Award className={`w-8 h-8 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
              </div>
            </div>
          </div>

          <div className="flex flex-col relative z-10 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded flex items-center justify-center ${isDark ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-100/50 border border-amber-200"}`}>
                <Award className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
              </div>
              <div className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${isDark ? "text-amber-400/80" : "text-amber-600/80"}`}>
                {item.period} • Award
              </div>
            </div>
            
            <h5 className={`text-xl md:text-2xl font-serif tracking-tight leading-snug mb-3 transition-colors duration-300 ${isDark ? "group-hover:text-amber-400" : "group-hover:text-amber-700"}`}>
              {item.title}
            </h5>
            <p className={`text-[10px] uppercase tracking-widest mb-5 font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {item.issuer}
            </p>
            <p className={`text-sm font-light leading-relaxed mb-8 flex-1 w-5/6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {item.description}
            </p>
            {item.link && (
              <a
                href={`https://${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono transition-all w-fit px-4 py-2 rounded border mt-auto ${
                  isDark 
                    ? "text-amber-400/90 border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-300" 
                    : "text-amber-700/90 border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                }`}
              >
                <span>Visit Official Challenge Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={key}
        layout
        variants={itemVariants}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`p-6 md:p-8 border flex flex-col ${spanClass} ${
          isDark 
            ? "border-white/10 hover:border-white/30 bg-[#1A1A1A] hover:bg-[#222]" 
            : "border-slate-200 border-b-[3px] border-b-slate-300/70 hover:border-b-slate-400 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.1)]"
        } transition-all duration-300 group`}
      >
        <div className="flex flex-col mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-medium ${
              isDark ? "bg-slate-900 border border-slate-800 text-slate-300" : "bg-white border border-slate-200 text-slate-700"
            }`}>
              {item.period}
            </span>
            <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
              config.category === "research" ? "text-amber-500" : config.category === "industry" ? "text-indigo-500" : "text-emerald-500"
            }`}>
              {config.category === "research" ? "Research & Teaching" : 
               config.category === "industry" ? "Professional" : 
               "Service & Volunteer"}
            </span>
            {config.isCurrent && (
              <span className="px-2.5 py-1 border border-indigo-500/50 text-indigo-500 bg-indigo-500/10 rounded text-[9px] uppercase tracking-widest font-bold ml-auto">
                Current Role
              </span>
            )}
          </div>
          <h5 className="text-xl md:text-2xl font-serif tracking-tight leading-snug">
            {item.role || item.title}
          </h5>
          <p className="text-[11px] uppercase tracking-widest opacity-60 mt-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
            {item.company || item.issuer}
          </p>
        </div>

        <ul className="space-y-3 mt-auto pt-4 border-t border-current border-opacity-10">
          {item.bullets?.map((bullet: string, bIdx: number) => (
            <li key={bIdx} className="text-sm font-light leading-relaxed opacity-80 flex items-start gap-3">
              <span className="opacity-50 mt-1 shrink-0 text-current">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <div className="w-full relative" id="academic-professional-chronology">
      
      {/* Timeline Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/10 dark:border-white/10 pb-6 mb-16">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-2 border rounded-full text-[11px] uppercase tracking-widest transition-all ${
              filter === f.id
                ? isDark
                  ? "border-[#F7F7F7] bg-[#F7F7F7] text-[#121212]"
                  : "border-[#121212] bg-[#121212] text-[#F7F7F7]"
                : isDark
                  ? "border-transparent hover:border-[#F7F7F7]/30 text-[#F7F7F7]/70"
                  : "border-transparent hover:border-[#121212]/30 text-[#121212]/70"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Year-grouped timeline */}
      <div className="space-y-24">
        <AnimatePresence mode="popLayout">
          {groupedItems.map((group) => (
            <motion.div
              layout
              key={group.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 relative"
            >
              {/* Year Marker */}
              <div className="md:w-32 shrink-0">
                <div className="sticky top-32 flex flex-col items-start pt-2">
                  <span className={`text-4xl md:text-5xl font-serif font-light ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {group.year}
                  </span>
                  <div className={`mt-4 w-12 h-[1px] ${
                    isDark ? "bg-slate-700" : "bg-slate-300"
                  }`} />
                </div>
              </div>
              
              {/* Cards Grid */}
              <motion.div 
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <AnimatePresence mode="popLayout">
                  {group.items.map((item, idx) => 
                    renderCard(item, idx, group.items.length, item.id)
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
