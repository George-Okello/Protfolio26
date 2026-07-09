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

  // State for Widget 2: Bilingual Dynamics
  const [inputText, setInputText] = useState("Currently engaged in machine learning research.");
  const [saccCost, setSaccCost] = useState(0.12);
  const [switchTrajectory, setSwitchTrajectory] = useState<number[]>(Array(15).fill(0.1));

  // State for Widget 3: Multi-Agent Trust Playground
  const [noisyObservations, setNoisyObservations] = useState(true);
  const [agentArchitecture, setAgentArchitecture] = useState<"Standard DQN" | "LSTM-DQN">("LSTM-DQN");
  const [coordinationRate, setCoordinationRate] = useState(85);
  const [trustLevel, setTrustLevel] = useState(78);
  const [agentStatus, setAgentStatus] = useState<"Searching" | "Coordinating" | "Converged">("Coordinating");

  // State for Widget 4: Cognitive Biases
  const [activeBias, setActiveBias] = useState<"Normal" | "Loss-Averse" | "Anchoring" | "Confirmation" | "Optimistic">("Loss-Averse");
  const [expandedBias, setExpandedBias] = useState<boolean>(false);
  const [winRate, setWinRate] = useState(85);
  const [explorationRate, setExplorationRate] = useState(30);
  const [biasStatus, setBiasStatus] = useState("Converging");

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

      setCoordinationRate(Math.min(100, Math.max(5, baseCoord + Math.floor((Math.random() - 0.5) * 8))));
      setTrustLevel(Math.min(100, Math.max(5, baseTrust + Math.floor((Math.random() - 0.5) * 6))));

      // Map status
      if (baseCoord > 80) setAgentStatus("Converged");
      else if (baseCoord > 50) setAgentStatus("Coordinating");
      else setAgentStatus("Searching");
    };

    runSimulation();
    interval = setInterval(runSimulation, 2500);

    return () => clearInterval(interval);
  }, [noisyObservations, agentArchitecture]);

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

      setWinRate(Math.min(100, Math.max(0, winR + Math.floor((Math.random() - 0.5) * 5))));
      setExplorationRate(Math.min(100, Math.max(0, expR + Math.floor((Math.random() - 0.5) * 5))));
      setBiasStatus(status);
    };

    runSimulation();
    interval = setInterval(runSimulation, 2500);

    return () => clearInterval(interval);
  }, [activeBias]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 text-xs font-mono rounded-full ${
              isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-500/10 text-amber-700"
            }`}>
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
        <div className={`flex overflow-x-auto hide-scrollbar shrink-0 p-1 rounded-xl ${isDark ? "bg-slate-950 border border-slate-800" : "bg-slate-100 border border-slate-200"}`}>
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
                      <svg viewBox="0 0 120 120" className="w-40 h-40 opacity-80">
                        {/* Outlines */}
                        <path
                          d="M 60,10 C 25,10 15,35 15,60 C 15,85 28,110 60,110 C 92,110 105,85 105,60 C 105,35 95,10 60,10 Z"
                          fill="none"
                          stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.12)"}
                          strokeWidth="2"
                        />
                        <path
                          d="M 60,10 C 60,10 50,45 60,60 C 70,75 60,110 60,110"
                          fill="none"
                          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"}
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        {/* Active EEG Nodes (Frontal, Parietal, Occipital, Temporal) */}
                        <circle cx="60" cy="22" r="5" fill={eegTask === "nback" ? "rgb(249, 115, 22)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        <circle cx="40" cy="45" r="5" fill={eegTask === "switching" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        <circle cx="80" cy="45" r="5" fill={eegTask === "switching" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        <circle cx="35" cy="75" r="5" fill={eegTask === "interpretable" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        <circle cx="85" cy="75" r="5" fill={eegTask === "interpretable" ? "rgb(245, 158, 11)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        <circle cx="60" cy="95" r="5" fill={eegTask === "nback" ? "rgb(249, 115, 22)" : "rgba(156, 163, 175, 0.4)"} className="transition-all" />
                        
                        {/* Connection curves depending on task */}
                        {eegTask !== "resting" && (
                          <path
                            d={eegTask === "nback" ? "M 60,22 Q 60,60 60,95" : "M 40,45 Q 60,60 80,45"}
                            fill="none"
                            stroke="rgba(249, 115, 22, 0.5)"
                            strokeWidth="1.5"
                            className="animate-pulse"
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
                    className={`w-full h-24 p-3 text-xs font-sans rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                      isDark 
                        ? "bg-slate-950 border-slate-800 text-slate-200" 
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                    placeholder="Type sentence here..."
                  />
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
                      <path
                        d={`M ${switchTrajectory.map((val, idx) => `${(idx * 300) / 14},${100 - val * 90}`).join(" L ")}`}
                        fill="none"
                        stroke={isDark ? "rgb(245, 158, 11)" : "rgb(249, 115, 22)"}
                        strokeWidth="2.5"
                        className="transition-all duration-300"
                      />
                      {/* Dots on points */}
                      {switchTrajectory.map((val, idx) => (
                        <circle
                          key={idx}
                          cx={(idx * 300) / 14}
                          cy={100 - val * 90}
                          r="3"
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
                          x: agentStatus === "Converged" ? [40, 60, 50, 40] : [20, 110, 50, 20],
                          y: agentStatus === "Converged" ? [30, 40, 35, 30] : [10, 70, 30, 10]
                        }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="absolute w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center shadow-xs"
                      >
                        <span className="text-[7px] text-white font-mono">A1</span>
                      </motion.div>

                      <motion.div
                        animate={{
                          x: agentStatus === "Converged" ? [180, 160, 170, 180] : [240, 150, 200, 240],
                          y: agentStatus === "Converged" ? [35, 45, 40, 35] : [20, 80, 50, 20]
                        }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="absolute w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shadow-xs"
                      >
                        <span className="text-[7px] text-white font-mono">A2</span>
                      </motion.div>

                      <motion.div
                        animate={{
                          x: agentStatus === "Converged" ? [110, 115, 108, 110] : [120, 60, 180, 120],
                          y: agentStatus === "Converged" ? [80, 90, 85, 80] : [90, 30, 40, 90]
                        }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                        className="absolute w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center shadow-xs"
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    <div className="w-full px-8 space-y-6">
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
