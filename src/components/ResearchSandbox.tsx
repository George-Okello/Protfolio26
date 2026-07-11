import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Languages, Users, Sliders, Play, RotateCcw, AlertCircle, Sparkles } from "lucide-react";

interface ResearchSandboxProps {
  theme: "dark" | "light";
  onTaskChange?: (task: string) => void;
}

export default function ResearchSandbox({ theme, onTaskChange }: ResearchSandboxProps) {
  const [activeTab, setActiveTab] = useState<"eeg" | "bilingual" | "marl" | "biases">("eeg");
  const isDark = theme === "dark";

  // State for Widget 1: EEG Simulator
  const [eegTask, setEegTask] = useState<"resting" | "nback" | "switching" | "interpretable">("resting");
  const [modelType, setModelType] = useState<"CNN" | "LSTM" | "Transformer">("Transformer");
  const [confidence, setConfidence] = useState(0.85);
  const [stimulusActive, setStimulusActive] = useState(false);

  const handleStimulus = () => {
    if (eegTask === "resting") return;
    setStimulusActive(true);
    setConfidence(prev => Math.min(0.99, prev + 0.15));
    setTimeout(() => setStimulusActive(false), 800);
  };

  // State for Widget 2: Bilingual Dynamics
  const [inputText, setInputText] = useState("Currently engaged in machine learning research.");
  const [saccCost, setSaccCost] = useState(0.12);
  const [switchTrajectory, setSwitchTrajectory] = useState<number[]>(Array(15).fill(0.1));

  const injectCodeSwitch = () => {
    const injections = [" y colaborando", " con profesores", " en proyectos", " de inteligencia artificial", " el modelo de redes"];
    const randomInjection = injections[Math.floor(Math.random() * injections.length)];
    setInputText(prev => prev + randomInjection);
  };

  // State for Widget 3: Multi-Agent Trust Playground
  const [noisyObservations, setNoisyObservations] = useState(true);
  const [agentArchitecture, setAgentArchitecture] = useState<"Standard DQN" | "LSTM-DQN">("LSTM-DQN");
  const [coordinationRate, setCoordinationRate] = useState(85);
  const [trustLevel, setTrustLevel] = useState(78);
  const [agentStatus, setAgentStatus] = useState<"Searching" | "Coordinating" | "Converged" | "Desynchronized">("Coordinating");
  const [networkOutage, setNetworkOutage] = useState(false);

  const triggerNetworkOutage = () => {
    setNetworkOutage(true);
    setTimeout(() => setNetworkOutage(false), 2000);
  };

  // State for Widget 4: Cognitive Biases
  const [activeBias, setActiveBias] = useState<"Normal" | "Loss-Averse" | "Anchoring" | "Confirmation" | "Optimistic">("Loss-Averse");
  const [expandedBias, setExpandedBias] = useState<boolean>(false);
  const [winRate, setWinRate] = useState(85);
  const [explorationRate, setExplorationRate] = useState(30);
  const [biasStatus, setBiasStatus] = useState("Converging");
  const [feedbackActive, setFeedbackActive] = useState(false);

  const triggerFeedback = () => {
    setFeedbackActive(true);
    setTimeout(() => setFeedbackActive(false), 1500);
  };

  // Handle active task propagation to parent canvas background
  useEffect(() => {
    if (onTaskChange) {
      onTaskChange(eegTask);
    }
  }, [eegTask, onTaskChange]);

  // Widget 1: Simulate metrics on change
  useEffect(() => {
    let baseConf = 0.65;
    if (modelType === "Transformer") baseConf = 0.84;
    else if (modelType === "LSTM") baseConf = 0.76;

    const noise = (Math.random() - 0.5) * 0.08;
    const taskImpact = eegTask === "resting" ? 0.05 : eegTask === "nback" ? -0.04 : 0.01;
    setConfidence(Math.min(0.99, Math.max(0.4, baseConf + noise + taskImpact)));
  }, [eegTask, modelType]);

  // Widget 2: Calculate fake but highly logical sACC cost based on bilingual density
  useEffect(() => {
    const spanishWords = ["y", "colaborando", "con", "profesores", "en", "proyectos", "avanzados", "el", "la", "de", "inteligencia", "artificial", "que", "es"];
    const textLower = inputText.toLowerCase();
    const words = textLower.split(/[\s,.]+/).filter(Boolean);
    
    let switches = 0;
    let lastIsSpanish = false;

    if (words.length > 0) {
      lastIsSpanish = spanishWords.includes(words[0]);
      for (let i = 1; i < words.length; i++) {
        const currentIsSpanish = spanishWords.includes(words[i]);
        if (currentIsSpanish !== lastIsSpanish) {
          switches++;
          lastIsSpanish = currentIsSpanish;
        }
      }
    }

    // Switch cost model: base cost + switches * 0.18 + density factors
    const switchFactor = Math.min(0.95, 0.1 + (switches * 0.15));
    const finalCost = textLower.length === 0 ? 0 : Math.min(0.98, 0.08 + switchFactor + (words.length * 0.005));
    setSaccCost(finalCost);

    // Generate simulated ACC response trajectory over time
    const trajectory = [];
    let current = 0.1;
    for (let i = 0; i < 15; i++) {
      const stepCost = (i > 3 && i < 11) ? finalCost * (1 + Math.sin((i - 4) * 0.4) * 0.3) : 0.1 + Math.random() * 0.05;
      trajectory.push(stepCost);
    }
    setSwitchTrajectory(trajectory);
  }, [inputText]);

  // Widget 3: Multi-Agent simulation states loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const runSimulation = () => {
      if (networkOutage) {
        setCoordinationRate(Math.floor(Math.random() * 15));
        setTrustLevel(Math.max(0, trustLevel - 20));
        setAgentStatus("Desynchronized");
        return;
      }

      let baseCoord = 45;
      let baseTrust = 30;

      if (agentArchitecture === "LSTM-DQN") {
        baseCoord = noisyObservations ? 82 : 94;
        baseTrust = noisyObservations ? 76 : 91;
      } else {
        // Standard DQN under noisy conditions performs terribly
        baseCoord = noisyObservations ? 28 : 64;
        baseTrust = noisyObservations ? 19 : 58;
      }

      setCoordinationRate(prev => Math.min(100, Math.max(5, baseCoord + Math.floor((Math.random() - 0.5) * 8))));
      setTrustLevel(prev => Math.min(100, Math.max(5, baseTrust + Math.floor((Math.random() - 0.5) * 6))));

      // Map status
      if (baseCoord > 80) setAgentStatus("Converged");
      else if (baseCoord > 50) setAgentStatus("Coordinating");
      else setAgentStatus("Searching");
    };

    runSimulation();
    interval = setInterval(runSimulation, 1500);

    return () => clearInterval(interval);
  }, [noisyObservations, agentArchitecture, networkOutage, trustLevel]);

  // Widget 4: Cognitive Biases simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const runSimulation = () => {
      let winR = 50;
      let expR = 50;
      let status = "Learning";

      if (activeBias === "Normal") { winR = 85; expR = 40; status = "Converged"; }
      else if (activeBias === "Loss-Averse") { winR = 92; expR = 30; status = "Optimal Avoidance"; }
      else if (activeBias === "Anchoring") { winR = 65; expR = 15; status = "Stuck (Local Optima)"; }
      else if (activeBias === "Confirmation") { winR = 40; expR = 10; status = "Failed to Learn"; }
      else if (activeBias === "Optimistic") { winR = 90; expR = 80; status = "High Exploration"; }

      if (feedbackActive) {
        if (activeBias === "Normal" || activeBias === "Optimistic") expR = 95; // highly responsive
        else if (activeBias === "Confirmation") { winR -= 10; status = "Rejecting Feedback"; } // stubborn
        else if (activeBias === "Anchoring") { expR += 5; } // barely reacts
      }

      setWinRate(Math.min(100, Math.max(0, winR + Math.floor((Math.random() - 0.5) * 5))));
      setExplorationRate(Math.min(100, Math.max(0, expR + Math.floor((Math.random() - 0.5) * 5))));
      setBiasStatus(status);
    };

    runSimulation();
    interval = setInterval(runSimulation, 1500);

    return () => clearInterval(interval);
  }, [activeBias, feedbackActive]);

  const selectSampleText = (text: string) => {
    setInputText(text);
  };

  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${
      isDark 
        ? "bg-slate-900/60 border-slate-800 backdrop-blur-md" 
        : "bg-white border-slate-200 shadow-sm"
    }`} id="research-interactive-sandbox">
      
      {/* Section Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono rounded-full ${
              activeTab === "eeg" ? (isDark ? "bg-orange-500/10 text-orange-400" : "bg-orange-500/10 text-orange-700") :
              activeTab === "bilingual" ? (isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-700") :
              activeTab === "marl" ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500/10 text-emerald-700") :
              (isDark ? "bg-violet-500/10 text-violet-400" : "bg-violet-500/10 text-violet-700")
            }`}>
              <motion.span 
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className={`w-2 h-2 rounded-full ${
                activeTab === "eeg" ? "bg-orange-500" :
                activeTab === "bilingual" ? "bg-blue-500" :
                activeTab === "marl" ? "bg-emerald-500" :
                "bg-violet-500"
              }`} />
              Interactive Lab
            </span>
            <span className="text-xs font-mono text-slate-400">SEED-VIG & sACC Simulators</span>
          </div>
          <h3 className={`text-2xl font-sans font-medium tracking-tight ${
            isDark ? "text-white" : "text-slate-950"
          }`}>
            Computational Cognitive Sandbox
          </h3>
          <p className={`text-sm mt-1 max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Interact directly with George&apos;s primary research focus areas. Toggle parameters, feed real text, and evaluate cognitive metrics in real-time.
          </p>
        </div>

        {/* Tab Controls */}
        <div className={`flex w-full xl:w-auto overflow-x-auto hide-scrollbar shrink-0 p-1 rounded-xl ${isDark ? "bg-slate-950 border border-slate-800" : "bg-slate-100 border border-slate-200"}`}>
          <button
            onClick={() => setActiveTab("eeg")}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "eeg"
                ? isDark ? "bg-slate-800 text-amber-400" : "bg-white text-orange-600 shadow-xs font-medium"
                : "text-slate-400 hover:text-slate-600"
            }`}
            id="tab-eeg-sim"
          >
            <Brain className="w-3.5 h-3.5" />
            EEG Classifier
          </button>
          <button
            onClick={() => setActiveTab("bilingual")}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "bilingual"
                ? isDark ? "bg-slate-800 text-amber-400" : "bg-white text-orange-600 shadow-xs font-medium"
                : "text-slate-400 hover:text-slate-600"
            }`}
            id="tab-bilingual-sim"
          >
            <Languages className="w-3.5 h-3.5" />
            sACC Switching
          </button>
          <button
            onClick={() => setActiveTab("marl")}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "marl"
                ? isDark ? "bg-slate-800 text-amber-400" : "bg-white text-orange-600 shadow-xs font-medium"
                : "text-slate-400 hover:text-slate-600"
            }`}
            id="tab-marl-sim"
          >
            <Users className="w-3.5 h-3.5" />
            MARL Trust
          </button>
          <button
            onClick={() => setActiveTab("biases")}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "biases"
                ? isDark ? "bg-slate-800 text-amber-400" : "bg-white text-orange-600 shadow-xs font-medium"
                : "text-slate-400 hover:text-slate-600"
            }`}
            id="tab-biases-sim"
          >
            <Sparkles className="w-3.5 h-3.5" />
            RL Biases
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[420px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: EEG CLASSIFIER */}
          {activeTab === "eeg" && (
            <motion.div
              key="eeg-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Controls Column */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h4 className={`text-sm font-mono font-medium mb-3 uppercase tracking-wider ${
                    isDark ? "text-amber-400" : "text-orange-600"
                  }`}>
                    01. Active Cognitive Tasks
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "resting", label: "Resting State", desc: "Minimal cognitive load baseline" },
                      { id: "interpretable", label: "Cardiac LIME/SHAP", desc: "Analyzing explainable decision paths" },
                      { id: "switching", label: "Bilingual Code-Switch", desc: "High-demand language transition" },
                      { id: "nback", label: "Visual N-Back Task", desc: "DQN-robustness under severe load" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setEegTask(t.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          eegTask === t.id
                            ? isDark 
                              ? "bg-slate-950/80 border-amber-500/50 shadow-xs shadow-amber-500/5 text-white" 
                              : "bg-orange-50/85 border-orange-500/50 text-slate-950 font-medium"
                            : isDark
                              ? "bg-slate-950/20 border-slate-800 hover:bg-slate-950/40 text-slate-400"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <div className="text-xs font-sans font-medium">{t.label}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-mono font-medium mb-3 uppercase tracking-wider ${
                    isDark ? "text-amber-400" : "text-orange-600"
                  }`}>
                    02. Neural Model Selection
                  </h4>
                  <div className="flex gap-2">
                    {["CNN", "LSTM", "Transformer"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setModelType(m as any)}
                        className={`flex-1 py-2 text-xs font-mono rounded-lg border transition-all ${
                          modelType === m
                            ? isDark
                              ? "bg-amber-500/10 border-amber-500/60 text-amber-400 font-medium"
                              : "bg-orange-500/10 border-orange-500/60 text-orange-600 font-semibold"
                            : isDark
                              ? "border-slate-800 text-slate-400 hover:text-slate-400"
                              : "border-slate-200 text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visualization/Output Column */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-dashed border-slate-800/20">
                    <span className="text-xs font-mono text-slate-400">SEED-VIG EXPERIMENTATION ENGINE</span>
                    <span className="text-xs font-mono flex items-center gap-1.5 text-emerald-500 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      SYSTEM STATUS: ONLINE
                    </span>
                  </div>

                  {/* Brain Map Channel Activation representation */}
                  <div className="flex flex-col md:flex-row items-center gap-6 py-4">
                    <div className="w-full md:w-1/2 flex justify-center relative">
                      {/* SVG Stylized Brain Top View */}
                      <svg viewBox="0 0 120 120" className="w-40 h-40 opacity-80" style={{ transform: "scale(1.15)" }}>
                        <g stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.25)"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          {/* Brain outline */}
                          <path d="M 60,8 C 45,5 25,12 18,30 C 10,48 10,70 20,88 C 30,105 45,112 60,110 C 75,112 90,105 100,88 C 110,70 110,48 102,30 C 95,12 75,5 60,8 Z" fill={isDark ? "rgba(15,23,42,0.4)" : "rgba(248,250,252,0.8)"} />
                          
                          {/* Central longitudinal fissure */}
                          <path d="M 60,8 Q 58,15 60,25 Q 62,35 60,45 Q 58,55 60,65 Q 62,75 60,85 Q 58,95 60,110" />

                          {/* Sulci/Gyri lines left */}
                          <path d="M 18,30 C 25,25 35,35 45,25" />
                          <path d="M 12,45 C 20,40 30,55 45,45" />
                          <path d="M 11,60 C 25,60 25,75 40,65" />
                          <path d="M 15,75 C 25,80 30,70 45,80" />
                          <path d="M 23,92 C 30,90 35,100 45,95" />
                          <path d="M 30,15 C 35,25 45,15 55,20" />
                          <path d="M 35,40 C 45,45 50,35 55,50" />
                          <path d="M 30,65 C 40,55 50,65 55,60" />
                          <path d="M 35,85 C 45,85 50,95 55,85" />

                          {/* Sulci/Gyri lines right */}
                          <path d="M 102,30 C 95,25 85,35 75,25" />
                          <path d="M 108,45 C 100,40 90,55 75,45" />
                          <path d="M 109,60 C 95,60 95,75 80,65" />
                          <path d="M 105,75 C 95,80 90,70 75,80" />
                          <path d="M 97,92 C 90,90 85,100 75,95" />
                          <path d="M 90,15 C 85,25 75,15 65,20" />
                          <path d="M 85,40 C 75,45 70,35 65,50" />
                          <path d="M 90,65 C 80,55 70,65 65,60" />
                          <path d="M 85,85 C 75,85 70,95 65,85" />
                        </g>

                        {/* Chip / Circuit Board Overlaid on bottom half */}
                        <g transform="translate(0, 5)">
                          <rect x="40" y="60" width="40" height="40" rx="4" fill={isDark ? "#0f172a" : "#ffffff"} stroke={isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.9)"} strokeWidth="1.5" />
                          {/* Chip core */}
                          <rect x="52" y="72" width="16" height="16" rx="2" fill={isDark ? "#334155" : "#1e293b"} />
                          
                          {/* circuit lines connecting to brain */}
                          <g stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.6)"} strokeWidth="1" fill="none">
                            <path d="M 40,65 L 30,65 L 25,60" />
                            <path d="M 40,75 L 30,75 L 20,80" />
                            <path d="M 40,85 L 25,85 L 20,95" />

                            <path d="M 80,65 L 90,65 L 95,60" />
                            <path d="M 80,75 L 90,75 L 100,80" />
                            <path d="M 80,85 L 95,85 L 100,95" />

                            <path d="M 50,60 L 50,45 L 45,40" />
                            <path d="M 60,60 L 60,45 L 60,35" />
                            <path d="M 70,60 L 70,45 L 75,40" />

                            <path d="M 50,100 L 50,105 L 45,108" />
                            <path d="M 60,100 L 60,108" />
                            <path d="M 70,100 L 70,105 L 75,108" />
                          </g>

                          {/* circuit lines on board */}
                          <g stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)"} strokeWidth="1" fill="none">
                            <path d="M 45,64 L 50,64 L 50,72 M 45,96 L 50,96 L 50,88 M 75,64 L 70,64 L 70,72 M 75,96 L 70,96 L 70,88" />
                            <circle cx="45" cy="64" r="1" fill={isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.6)"} />
                            <circle cx="45" cy="96" r="1" fill={isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.6)"} />
                            <circle cx="75" cy="64" r="1" fill={isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.6)"} />
                            <circle cx="75" cy="96" r="1" fill={isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.6)"} />
                          </g>
                        </g>

                        {/* Active Nodes on Brain */}
                        <motion.circle cx="60" cy="22" r="5" fill={eegTask === "nback" ? "rgb(249, 115, 22)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "nback" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        <motion.circle cx="35" cy="45" r="5" fill={eegTask === "switching" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "switching" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        <motion.circle cx="85" cy="45" r="5" fill={eegTask === "switching" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "switching" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        <motion.circle cx="25" cy="70" r="5" fill={eegTask === "interpretable" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "interpretable" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        <motion.circle cx="95" cy="70" r="5" fill={eegTask === "interpretable" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "interpretable" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        <motion.circle cx="60" cy="80" r="5" fill={eegTask === "nback" ? "rgb(249, 115, 22)" : "rgba(156, 163, 175, 0.4)"} initial={{ opacity: 1, scale: 1 }} animate={eegTask === "nback" ? { scale: stimulusActive ? 1.8 : [1, 1.3, 1], opacity: [1, 0.8, 1] } : { scale: 1, opacity: 1 }} transition={{ duration: stimulusActive ? 0.2 : 1.5, repeat: stimulusActive ? 0 : Infinity }} />
                        
                        {/* Connection curves depending on task */}
                        {eegTask !== "resting" && (
                          <motion.path
                            d={eegTask === "nback" ? "M 60,22 Q 60,50 60,80" : eegTask === "switching" ? "M 35,45 Q 60,60 85,45" : "M 25,70 Q 60,50 95,70"}
                            fill="none"
                            stroke={eegTask === "nback" ? "rgba(249, 115, 22, 0.8)" : "rgba(245, 158, 11, 0.8)"}
                            strokeWidth={stimulusActive ? "4" : "2"}
                            strokeDasharray="4 8"
                            animate={{ strokeDashoffset: [24, 0] }}
                            transition={{ duration: stimulusActive ? 0.3 : 0.8, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </svg>
                      {/* Explanatory pointers */}
                      <span className="absolute text-[8px] font-mono text-slate-400 top-2 left-2">FRONTAL (Fz)</span>
                      <span className="absolute text-[8px] font-mono text-slate-400 bottom-2 right-2">OCCIPITAL (Oz)</span>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>COGNITIVE LOAD ESTIMATE</span>
                          <span className={`font-medium ${eegTask === "nback" ? "text-orange-500" : eegTask === "resting" ? "text-slate-400" : "text-amber-500"}`}>
                            {eegTask === "resting" ? "MINIMAL" : eegTask === "interpretable" ? "MODERATE" : "HIGH-ALERT"}
                          </span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-200"}`}>
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              eegTask === "resting" 
                                ? "bg-slate-400" 
                                : eegTask === "interpretable" 
                                  ? "bg-amber-400" 
                                  : "bg-orange-500 animate-pulse"
                            }`}
                            style={{ 
                              width: eegTask === "resting" ? "20%" : eegTask === "interpretable" ? "52%" : eegTask === "switching" ? "74%" : "91%" 
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className={`p-2.5 rounded-xl ${isDark ? "bg-slate-950" : "bg-white border border-slate-100"}`}>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">MODEL CONFIDENCE</div>
                          <div className={`text-base font-mono font-medium mt-0.5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                            {(confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className={`p-2.5 rounded-xl ${isDark ? "bg-slate-950" : "bg-white border border-slate-100"}`}>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">FEATURE MAP TRUST</div>
                          <div className="text-base font-mono font-medium text-emerald-500 mt-0.5">
                            {modelType === "Transformer" ? "EXCELLENT" : "AVERAGE"}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={handleStimulus}
                        disabled={eegTask === "resting" || stimulusActive}
                        className={`w-full py-2.5 mt-2 rounded-xl text-xs font-mono font-medium transition-all ${
                          eegTask === "resting" 
                            ? "opacity-50 cursor-not-allowed bg-slate-800/50 text-slate-500" 
                            : stimulusActive 
                              ? "bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                              : isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                        }`}
                      >
                        {stimulusActive ? ">>> SIGNAL BURST ACTIVE <<<" : "TRIGGER COGNITIVE STIMULUS"}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed pt-2 border-t border-slate-800/10 mt-2">
                    <AlertCircle className="inline w-3 h-3 mr-1 -mt-0.5" />
                    <strong>George&apos;s Findings:</strong> Transformers map attention directly onto temporal and frontal electrode groupings, verifying neural substrates for cognitive switching. Overperforms standard CNN/LSTM models by 7-12% on average.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BILINGUAL SWITCHING */}
          {activeTab === "bilingual" && (
            <motion.div
              key="bilingual-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className={`text-sm font-mono font-medium mb-2 uppercase tracking-wider ${
                    isDark ? "text-amber-400" : "text-orange-600"
                  }`}>
                    Interactive ACC Estimator
                  </h4>
                  <p className={`text-xs mb-3 ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                    Type a bilingual mixed-language sentence to simulate the Anterior Cingulate Cortex control costs. Switch between Spanish words to observe cost spikes.
                  </p>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className={`w-full h-20 p-3 text-xs font-sans rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                      isDark 
                        ? "bg-slate-950 border-slate-800 text-slate-200" 
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                    placeholder="Type sentence here..."
                  />
                  <div className={`mt-2 p-3 min-h-[3rem] rounded-xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                    <div className="text-[9px] font-mono text-slate-400 mb-1.5 uppercase flex justify-between items-center">
                      <span>Live Lexical Parser</span>
                      <button 
                        onClick={injectCodeSwitch}
                        className={`px-2 py-0.5 rounded text-[8px] transition-colors ${isDark ? "bg-slate-800 hover:bg-slate-700 text-amber-400" : "bg-slate-100 hover:bg-slate-200 text-orange-600"}`}
                      >
                        + INJECT CODE-SWITCH
                      </button>
                    </div>
                    <div className="text-xs font-sans flex flex-wrap gap-x-1 gap-y-1.5">
                      {inputText.split(/([\s,.]+)/).map((word, i) => {
                        const SPANISH_WORDS = ["y", "colaborando", "con", "profesores", "en", "proyectos", "avanzados", "el", "la", "de", "inteligencia", "artificial", "que", "es", "modelo", "redes"];
                        const isSpanish = SPANISH_WORDS.includes(word.toLowerCase().trim());
                        if (word.trim() === "") return <span key={i} className="whitespace-pre">{word}</span>;
                        return (
                          <span key={i} className={`px-1 rounded transition-colors duration-300 ${isSpanish ? (isDark ? "bg-amber-500/20 text-amber-400" : "bg-orange-500/20 text-orange-700 font-medium") : (isDark ? "text-slate-300" : "text-slate-600")}`}>
                            {word}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">TRY HIGH-DEMAND CASE SAMPLES:</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      {
                        label: "Monolingual Control (English)",
                        text: "Currently engaged in machine learning research and academic publication at the university."
                      },
                      {
                        label: "Medium Switch Density",
                        text: "Currently engaged in machine learning research y colaborando con profesores on advanced projects."
                      },
                      {
                        label: "High Cognitive Control (Frequent Switches)",
                        text: "Collaborating con profesores en proyectos de inteligencia artificial utilizing neural processing models."
                      }
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectSampleText(sample.text)}
                        className={`text-left p-2.5 rounded-lg border text-xs font-sans transition-all ${
                          inputText === sample.text
                            ? isDark
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                              : "bg-orange-500/10 border-orange-500/30 text-orange-600"
                            : isDark
                              ? "bg-slate-950/20 border-slate-900 hover:bg-slate-950/40 text-slate-400"
                              : "bg-slate-100/50 border-slate-200 hover:bg-slate-200 text-slate-600"
                        }`}
                      >
                        <span className="font-medium font-mono text-[10px] block">{sample.label}</span>
                        <span className="text-[10px] text-slate-400 truncate block mt-0.5">{sample.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-dashed border-slate-800/20">
                    <span className="text-xs font-mono text-slate-400">ANTERIOR CINGULATE CORTEX (sACC) MODEL</span>
                    <span className="text-xs font-mono text-orange-500 font-medium">TRAJECTORY PLOT</span>
                  </div>

                  {/* Simulated trajectory graph using SVG */}
                  <div className="h-32 w-full flex items-end relative pb-4 pt-2">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                      <div className="w-full h-[1px] bg-slate-500" />
                      <div className="w-full h-[1px] bg-slate-500" />
                      <div className="w-full h-[1px] bg-slate-500" />
                    </div>

                    <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      {/* Plot path */}
                      <motion.path
                        animate={{ d: `M ${switchTrajectory.map((val, idx) => `${(idx * 300) / 14},${100 - val * 90}`).join(" L ")}` }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        fill="none"
                        stroke={isDark ? "rgb(245, 158, 11)" : "rgb(249, 115, 22)"}
                        strokeWidth="2.5"
                      />
                      {/* Dots on points */}
                      {switchTrajectory.map((val, idx) => (
                        <motion.circle
                          key={idx}
                          animate={{ cx: (idx * 300) / 14, cy: 100 - val * 90 }}
                          transition={{ type: "spring", stiffness: 40, damping: 15 }}
                          r="4"
                          fill={isDark ? "rgb(251, 146, 60)" : "rgb(249, 115, 22)"}
                        />
                      ))}
                    </svg>

                    <span className="absolute text-[8px] font-mono text-slate-400 bottom-0 left-0">START</span>
                    <span className="absolute text-[8px] font-mono text-slate-400 bottom-0 right-0">END OF SENTENCE</span>
                    <span className="absolute text-[8px] font-mono text-slate-400 top-0 left-0">1.0 sACC ACTIVATION</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/10">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">PEAK ACC CONTROL DEMAND</div>
                      <div className="text-xl font-mono font-medium text-slate-200 mt-1 flex items-center gap-2">
                        <span className={isDark ? "text-amber-400" : "text-orange-600"}>
                          {saccCost.toFixed(3)}
                        </span>
                        <span className="text-xs font-mono text-slate-400">(sACC Units)</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">SWITCH TRAJECTORY PATH</div>
                      <div className={`text-xs font-sans font-medium mt-2 ${saccCost > 0.4 ? "text-amber-500" : "text-emerald-500"}`}>
                        {saccCost > 0.6 
                          ? "Continuous High Cognitive Control" 
                          : saccCost > 0.3 
                            ? "Symmetric Transition Swapping" 
                            : "Stable Monolingual Trajectory"}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed mt-4 pt-2 border-t border-slate-800/10">
                    <strong>George&apos;s Insight:</strong> Multilingual BERT layers verify that code-switching is not an abrupt jump, but rather a smooth continuous activation shift across the Anterior Cingulate Cortex, presenting symmetrical control costs.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MARL TRUST */}
          {activeTab === "marl" && (
            <motion.div
              key="marl-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className={`text-sm font-mono font-medium mb-3 uppercase tracking-wider ${
                    isDark ? "text-amber-400" : "text-orange-600"
                  }`}>
                    Partial Observability Model
                  </h4>
                  <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                    Evaluate multi-agent reinforcement learning (MARL) cooperation dynamics. Under noisy conditions, agents require memory to build stable trust hierarchies.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-800/10">
                      <div>
                        <span className="text-xs font-sans font-medium block">Noisy Environmental Observations</span>
                        <span className="text-[10px] font-mono text-slate-400">Simulate sensory/packet loss</span>
                      </div>
                      <button
                        onClick={() => setNoisyObservations(!noisyObservations)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors ${
                          noisyObservations ? "bg-amber-500" : "bg-slate-400"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          noisyObservations ? "translate-x-5" : "translate-x-0"
                        }`} />
                      </button>
                    </div>

                    <button
                      onClick={triggerNetworkOutage}
                      disabled={networkOutage}
                      className={`w-full py-2 rounded-xl text-[10px] font-mono font-medium transition-all ${
                        networkOutage 
                          ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(243,24,96,0.5)]" 
                          : isDark ? "bg-slate-800 hover:bg-slate-700 text-rose-400" : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200"
                      }`}
                    >
                      {networkOutage ? "!!! SEVERE NETWORK OUTAGE !!!" : "SIMULATE NETWORK OUTAGE SPIKE"}
                    </button>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">AGENT ARCHITECTURE</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "Standard DQN", desc: "No sequence memory" },
                          { id: "LSTM-DQN", desc: "LSTM credit assignment" }
                        ].map((arch) => (
                          <button
                            key={arch.id}
                            onClick={() => setAgentArchitecture(arch.id as any)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              agentArchitecture === arch.id
                                ? isDark
                                  ? "bg-amber-500/10 border-amber-500/60 text-amber-400"
                                  : "bg-orange-500/10 border-orange-500/60 text-orange-600 font-semibold"
                                : isDark
                                  ? "bg-slate-950/20 border-slate-800 hover:bg-slate-950/40 text-slate-400"
                                  : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600"
                            }`}
                          >
                            <div className="text-xs font-sans font-medium">{arch.id}</div>
                            <div className="text-[9px] font-mono text-slate-400 mt-0.5">{arch.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid visual column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-dashed border-slate-800/20">
                    <span className="text-xs font-mono text-slate-400">SOCIAL HIERARCHIES REAL-TIME AGENT MAP</span>
                    <span className="text-xs font-mono flex items-center gap-1 text-slate-400 font-medium">
                      STATE: 
                      <span className={`font-mono text-[10px] ${agentStatus === "Converged" ? "text-emerald-500" : "text-amber-500"}`}>
                        {agentStatus}
                      </span>
                    </span>
                  </div>

                  {/* 2D Grid Representation of Agents Cooperating */}
                  <div className={`h-36 w-full rounded-xl overflow-hidden relative flex items-center justify-center ${
                    isDark ? "bg-slate-950" : "bg-white border border-slate-100"
                  }`}>
                    {/* Simulated Agent Nodes dancing around */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-10 pointer-events-none">
                      {Array(18).fill(0).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-slate-400" />
                      ))}
                    </div>

                    <div className="relative w-full h-full">
                      {/* Render 3 moving agents with CSS animations representing Reinforcement Learning agents */}
                      <motion.div
                        animate={{
                          x: agentStatus === "Desynchronized" ? [20, -10, 80, -20] : agentStatus === "Converged" ? [40, 60, 50, 40] : [20, 110, 50, 20],
                          y: agentStatus === "Desynchronized" ? [10, 150, -50, 40] : agentStatus === "Converged" ? [30, 40, 35, 30] : [10, 70, 30, 10],
                          scale: agentStatus === "Desynchronized" ? [1, 0.5, 1.5, 1] : 1
                        }}
                        transition={{ repeat: Infinity, duration: agentStatus === "Desynchronized" ? 1 : 6, ease: "easeInOut" }}
                        className={`absolute w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${agentStatus === "Desynchronized" ? "bg-rose-500" : "bg-orange-500"}`}
                      >
                        <span className="text-[7px] text-white font-mono">A1</span>
                      </motion.div>

                      <motion.div
                        animate={{
                          x: agentStatus === "Desynchronized" ? [240, 300, 100, 350] : agentStatus === "Converged" ? [180, 160, 170, 180] : [240, 150, 200, 240],
                          y: agentStatus === "Desynchronized" ? [20, -80, 160, -20] : agentStatus === "Converged" ? [35, 45, 40, 35] : [20, 80, 50, 20],
                          scale: agentStatus === "Desynchronized" ? [1, 1.5, 0.5, 1] : 1
                        }}
                        transition={{ repeat: Infinity, duration: agentStatus === "Desynchronized" ? 0.8 : 5, ease: "easeInOut" }}
                        className={`absolute w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${agentStatus === "Desynchronized" ? "bg-rose-500" : "bg-amber-500"}`}
                      >
                        <span className="text-[7px] text-white font-mono">A2</span>
                      </motion.div>

                      <motion.div
                        animate={{
                          x: agentStatus === "Desynchronized" ? [120, 10, 250, 120] : agentStatus === "Converged" ? [110, 115, 108, 110] : [120, 60, 180, 120],
                          y: agentStatus === "Desynchronized" ? [90, 180, -30, 90] : agentStatus === "Converged" ? [80, 90, 85, 80] : [90, 30, 40, 90],
                          scale: agentStatus === "Desynchronized" ? [1.5, 0.5, 1, 1] : 1
                        }}
                        transition={{ repeat: Infinity, duration: agentStatus === "Desynchronized" ? 1.2 : 7, ease: "easeInOut" }}
                        className={`absolute w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${agentStatus === "Desynchronized" ? "bg-rose-500" : "bg-yellow-500"}`}
                      >
                        <span className="text-[7px] text-white font-mono">A3</span>
                      </motion.div>

                      {/* Line connecting nodes under converged state */}
                      {agentStatus === "Converged" && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <line x1="50" y1="35" x2="170" y2="40" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="170" y1="40" x2="110" y2="85" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="110" y1="85" x2="50" y2="35" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/10">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">COORDINATION RATE</div>
                      <div className={`text-xl font-mono font-medium mt-1 ${coordinationRate > 70 ? "text-emerald-500" : coordinationRate > 40 ? "text-amber-500" : "text-rose-500"}`}>
                        {coordinationRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">MUTUAL TRUST INDEX</div>
                      <div className={`text-xl font-mono font-medium mt-1 ${trustLevel > 70 ? "text-emerald-500" : trustLevel > 40 ? "text-amber-500" : "text-rose-500"}`}>
                        {trustLevel}%
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed mt-4 pt-2 border-t border-slate-800/10">
                    <strong>George&apos;s Finding:</strong> Robustness testing proves that Standard DQN drops coordination to 28% under partial observation noise. LSTM-DQN variants bypass noise limitations by forming stable temporal credit representations (p = 0.0034).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: COGNITIVE BIASES IN RL */}
          {activeTab === "biases" && (
            <motion.div
              key="biases-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className={`text-sm font-mono font-medium mb-3 uppercase tracking-wider ${
                    isDark ? "text-amber-400" : "text-orange-600"
                  }`}>
                    Human-Like RL Agents
                  </h4>
                  <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                    Evaluate multi-armed bandit agents modeled with classic human cognitive biases to observe how irrational heuristic behaviors impact decision-making.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">SELECT AGENT BIAS PROFILE</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {[
                          { id: "Normal", desc: "Standard Epsilon-Greedy", detail: "A standard agent that balances exploration and exploitation without subjective weightings." },
                          { id: "Loss-Averse", desc: "Penalizes losses heavily", detail: "Inspired by Prospect Theory. Weighs failures (0) more negatively than successes (1)." },
                          { id: "Anchoring", desc: "Overvalues initial results", detail: "Gives disproportionate weight to early experiences. Can get stuck if early pulls are bad." },
                          { id: "Confirmation", desc: "Ignores conflicting data", detail: "Only updates beliefs when new feedback agrees with expectations. Often clings to false beliefs." },
                          { id: "Optimistic", desc: "Overestimates initial values", detail: "Starts by assuming every arm is great, simulating overconfidence. Fuels early exploration." }
                        ].map((bias) => (
                          <div key={bias.id} className="flex flex-col">
                            <button
                              onClick={() => {
                                setActiveBias(bias.id as any);
                                setExpandedBias(false);
                              }}
                              className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                activeBias === bias.id
                                  ? isDark
                                    ? "bg-amber-500/10 border-amber-500/60 text-amber-400"
                                    : "bg-orange-500/10 border-orange-500/60 text-orange-600 font-semibold"
                                  : isDark
                                    ? "bg-slate-950/20 border-slate-800 hover:bg-slate-950/40 hover:border-slate-700 text-slate-400"
                                    : "bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-slate-300 text-slate-600"
                              }`}
                            >
                              <div className="text-xs font-sans font-medium">{bias.id}</div>
                              <div className="text-[9px] font-mono text-slate-400 mt-0.5">{bias.desc}</div>
                            </button>
                            {activeBias === bias.id && (
                              <AnimatePresence>
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2 pb-1 px-1">
                                    <p className={`text-[10px] leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                                      {expandedBias ? bias.detail : `${bias.detail.substring(0, 45)}...`}
                                    </p>
                                    <button 
                                      onClick={() => setExpandedBias(!expandedBias)}
                                      className={`text-[9px] uppercase tracking-wider font-mono mt-1.5 transition-colors ${isDark ? "text-amber-500/70 hover:text-amber-400" : "text-orange-600/70 hover:text-orange-600"}`}
                                    >
                                      {expandedBias ? "- Show Less" : "+ Read More"}
                                    </button>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={triggerFeedback}
                        disabled={feedbackActive}
                        className={`w-full py-2.5 rounded-xl text-[10px] font-mono font-medium transition-all ${
                          feedbackActive 
                            ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                            : isDark ? "bg-slate-800 hover:bg-slate-700 text-blue-400" : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                        }`}
                      >
                        {feedbackActive ? ">> FEEDBACK INJECTED <<" : "INJECT ENVIRONMENTAL FEEDBACK SHOCK"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-dashed border-slate-800/20">
                    <span className="text-xs font-mono text-slate-400">MULTI-ARMED BANDIT SIMULATION</span>
                    <span className="text-xs font-mono flex items-center gap-1 text-slate-400 font-medium">
                      STATUS: 
                      <span className={`font-mono text-[10px] ${
                        biasStatus.includes("Failed") || biasStatus.includes("Stuck") 
                          ? "text-rose-500" 
                          : biasStatus.includes("Convergence") || biasStatus === "Optimal Avoidance" || biasStatus === "Converged"
                            ? "text-emerald-500" 
                            : "text-amber-500"
                      }`}>
                        {biasStatus}
                      </span>
                    </span>
                  </div>

                  <div className={`h-36 w-full rounded-xl overflow-hidden relative flex flex-col items-center justify-center ${
                    isDark ? "bg-slate-950" : "bg-white border border-slate-100"
                  }`}>
                    {/* Visualizer bars for Win Rate & Exploration Rate */}
                    <div className="w-full px-8 space-y-6 z-10 relative">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                          <span>WIN RATE (REWARD EXPLOITATION)</span>
                          <span className={`font-medium ${winRate > 80 ? "text-emerald-500" : winRate > 50 ? "text-amber-500" : "text-rose-500"}`}>{winRate}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden bg-slate-800/20">
                          <motion.div 
                            className={`h-full ${winRate > 80 ? "bg-emerald-500" : winRate > 50 ? "bg-amber-500" : "bg-rose-500"}`}
                            animate={{ width: `${winRate}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-2">
                          <span>EXPLORATION RATE</span>
                          <span className={`font-medium ${explorationRate > 60 ? "text-blue-400" : "text-slate-400"}`}>{explorationRate}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden bg-slate-800/20">
                          <motion.div 
                            className="h-full bg-blue-500"
                            animate={{ width: `${explorationRate}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Shock visualizer effect */}
                    <AnimatePresence>
                      {feedbackActive && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.5, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5 }}
                          className="absolute inset-0 bg-blue-500/20 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 leading-relaxed mt-4 pt-4 border-t border-slate-800/10">
                    <strong>George&apos;s Finding:</strong> 
                    {activeBias === "Normal" && " The standard agent balances exploration and exploitation efficiently over time."}
                    {activeBias === "Loss-Averse" && " Loss aversion helps agents ditch low-reward arms faster, speeding up convergence to optimal strategies."}
                    {activeBias === "Anchoring" && " Anchoring on early poor rewards causes agents to get stuck in local optima, unable to unlearn first impressions."}
                    {activeBias === "Confirmation" && " Confirmation bias is detrimental, as agents cling to false beliefs and reject corrective feedback."}
                    {activeBias === "Optimistic" && " Optimism bias fuels early exploration, helping the agent find the best arm faster than a neutral approach."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
