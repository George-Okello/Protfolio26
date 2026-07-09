import React, { useEffect, useRef, useState } from "react";
import { Sliders, RotateCcw, HelpCircle, Activity } from "lucide-react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GenerativeArtProps {
  theme: "dark" | "light";
}

export default function GenerativeArt({ theme }: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 320 });
  
  // Swarm parameters
  const [cohesion, setCohesion] = useState(0.015);
  const [alignment, setAlignment] = useState(0.04);
  const [separation, setSeparation] = useState(0.05);
  const [swarmSize, setSwarmSize] = useState(80);
  
  const boidsRef = useRef<Boid[]>([]);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  // Handle Resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width || 600, height: height || 320 });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Initialize Swarm
  useEffect(() => {
    const boids: Boid[] = [];
    for (let i = 0; i < swarmSize; i++) {
      boids.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      });
    }
    boidsRef.current = boids;
  }, [dimensions, swarmSize]);

  // Main Boids Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    const updateBoids = () => {
      const boids = boidsRef.current;
      const width = dimensions.width;
      const height = dimensions.height;

      const visualRange = 45;
      const minDistance = 15; // Distance to keep between boids
      const speedLimit = 4;

      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        let centerX = 0;
        let centerY = 0;
        let numNeighbors = 0;

        let avgVx = 0;
        let avgVy = 0;

        let closeDx = 0;
        let closeDy = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const other = boids[j];

          const dx = b.x - other.x;
          const dy = b.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < visualRange) {
            // Separation calculations
            if (dist < minDistance) {
              closeDx += b.x - other.x;
              closeDy += b.y - other.y;
            }

            // Cohesion calculations
            centerX += other.x;
            centerY += other.y;

            // Alignment calculations
            avgVx += other.vx;
            avgVy += other.vy;

            numNeighbors++;
          }
        }

        if (numNeighbors > 0) {
          // Cohesion rule: fly toward average position of neighbors
          centerX = centerX / numNeighbors;
          centerY = centerY / numNeighbors;
          b.vx += (centerX - b.x) * cohesion;
          b.vy += (centerY - b.y) * cohesion;

          // Alignment rule: align velocity with neighbors
          avgVx = avgVx / numNeighbors;
          avgVy = avgVy / numNeighbors;
          b.vx += (avgVx - b.vx) * alignment;
          b.vy += (avgVy - b.vy) * alignment;
        }

        // Separation rule: steer away from boids that are too close
        b.vx += closeDx * separation;
        b.vy += closeDy * separation;

        // Interaction: steer away from mouse (repeller)
        const mouse = mouseRef.current;
        if (mouse.active) {
          const mdx = b.x - mouse.x;
          const mdy = b.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100) {
            b.vx += (mdx / mdist) * 0.8;
            b.vy += (mdy / mdist) * 0.8;
          }
        }

        // Keep inside boundaries
        const margin = 20;
        const turnFactor = 0.15;
        if (b.x < margin) b.vx += turnFactor;
        if (b.x > width - margin) b.vx -= turnFactor;
        if (b.y < margin) b.vy += turnFactor;
        if (b.y > height - margin) b.vy -= turnFactor;

        // Limit speed
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > speedLimit) {
          b.vx = (b.vx / speed) * speedLimit;
          b.vy = (b.vy / speed) * speedLimit;
        }

        // Move boid
        b.x += b.vx;
        b.y += b.vy;
      }
    };

    const drawBoids = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const boids = boidsRef.current;
      const isDark = theme === "dark";

      // Draw mouse repeller range if active
      const mouse = mouseRef.current;
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? "rgba(245, 158, 11, 0.08)" : "rgba(249, 115, 22, 0.06)";
        ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.02)" : "rgba(249, 115, 22, 0.01)";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(245, 158, 11, 0.6)" : "rgba(249, 115, 22, 0.6)";
        ctx.fill();
      }

      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        const angle = Math.atan2(b.vy, b.vx);

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);

        // Draw boid as a sleek, futuristic triangular chevron
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, -3.5);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3.5);
        ctx.closePath();

        if (isDark) {
          ctx.fillStyle = i === 0 
            ? "rgba(249, 115, 22, 1)" // Swarm leader highlighted
            : `rgba(255, 255, 255, ${0.45 + (i % 5) * 0.1})`;
          ctx.shadowColor = "rgba(249, 115, 22, 0.2)";
          ctx.shadowBlur = i === 0 ? 6 : 0;
        } else {
          ctx.fillStyle = i === 0 
            ? "rgba(249, 115, 22, 1)" 
            : `rgba(15, 23, 42, ${0.5 + (i % 5) * 0.15})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.restore();
      }
    };

    const render = () => {
      updateBoids();
      drawBoids();
      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, theme, cohesion, alignment, separation]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const resetSwarm = () => {
    setCohesion(0.015);
    setAlignment(0.04);
    setSeparation(0.05);
    const boids = boidsRef.current;
    for (let i = 0; i < boids.length; i++) {
      boids[i].x = Math.random() * dimensions.width;
      boids[i].y = Math.random() * dimensions.height;
      boids[i].vx = (Math.random() - 0.5) * 4;
      boids[i].vy = (Math.random() - 0.5) * 4;
    }
  };

  return (
    <div className={`p-5 rounded-2xl border ${
      theme === "dark" 
        ? "bg-slate-900/40 border-slate-800" 
        : "bg-white border-slate-200"
    }`} id="computational-generative-art">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 pb-2 border-b border-dashed border-slate-800/10 gap-2">
        <div>
          <h4 className="text-sm font-mono font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
            Swarm Intelligence Flocking Simulation
          </h4>
          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
            Demonstrating Emergent Collective Behavior (Separation, Alignment, Cohesion)
          </p>
        </div>
        <button
          onClick={resetSwarm}
          className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-slate-800/10 hover:bg-slate-800/5 transition-all text-slate-400"
          id="btn-reset-swarm"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Canvas stage */}
        <div 
          ref={containerRef} 
          className={`md:col-span-8 h-64 rounded-xl relative overflow-hidden ${
            theme === "dark" ? "bg-slate-950" : "bg-slate-50 border border-slate-100"
          }`}
        >
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 block cursor-crosshair"
            id="swarm-canvas"
          />
          <span className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-400 pointer-events-none uppercase">
            Click/Hover to attract & disperse swarm
          </span>
        </div>

        {/* Sliders */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Cohesion (Attraction)</span>
              <span className="text-amber-500">{(cohesion * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.05"
              step="0.001"
              value={cohesion}
              onChange={(e) => setCohesion(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Alignment (Velocity Matching)</span>
              <span className="text-amber-500">{(alignment * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.1"
              step="0.005"
              value={alignment}
              onChange={(e) => setAlignment(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Separation (Anti-Collision)</span>
              <span className="text-amber-500">{(separation * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.15"
              step="0.005"
              value={separation}
              onChange={(e) => setSeparation(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800/10">
            <div className="text-[10px] font-mono text-slate-400 leading-relaxed">
              <strong>Emergency Dynamics:</strong> Simple local interactions create synchronous flocking behaviors with no global coordinate planner. This models trust dynamics and emergent communication.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
