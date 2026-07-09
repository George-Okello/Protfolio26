import React, { useEffect, useRef, useState } from "react";

interface NeuralCanvasProps {
  theme: "dark" | "light";
  activeTask?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalRadius: number;
  glow: number;
  color: string;
}

export default function NeuralCanvas({ theme, activeTask = "resting" }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const requestRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);

  // Track task intensity for signal frequencies
  const getIntensity = () => {
    switch (activeTask) {
      case "nback": return 2.2;
      case "switching": return 1.8;
      case "interpretable": return 1.4;
      case "resting":
      default: return 0.6;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width || 800, height: height || 400 });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Initialize nodes
  useEffect(() => {
    const nodeCount = Math.min(60, Math.floor((dimensions.width * dimensions.height) / 12000));
    const nodes: Node[] = [];
    const isDark = theme === "dark";

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2 + 1.5;
      nodes.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: radius,
        originalRadius: radius,
        glow: Math.random(),
        color: isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(15, 23, 42, 0.15)"
      });
    }

    nodesRef.current = nodes;
  }, [dimensions, theme]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const intensity = getIntensity();

      // Smooth mouse movement
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw background neural pathways
      const nodes = nodesRef.current;
      const connectionDistance = 110;

      // Draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            if (isDark) {
              // Dark mode uses subtle white/amber synapses
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * (0.6 + Math.sin(phase + i) * 0.4)})`;
            } else {
              // Light mode uses soft gray/amber synapses
              ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.4})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const mdx = n1.x - mouse.x;
        const mdy = n1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const malpha = (1 - mdist / 150) * 0.35;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark 
            ? `rgba(251, 146, 60, ${malpha})` 
            : `rgba(249, 115, 22, ${malpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Stimulate node size when mouse is close
          n1.radius = n1.originalRadius + (1 - mdist / 150) * 3;
        } else {
          n1.radius = n1.originalRadius + (n1.radius - n1.originalRadius) * 0.95;
        }

        // Move and draw nodes
        n1.x += n1.vx * (1 + intensity * 0.3);
        n1.y += n1.vy * (1 + intensity * 0.3);

        // Boundary checks
        if (n1.x < 0 || n1.x > dimensions.width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > dimensions.height) n1.vy *= -1;

        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = n1.radius > n1.originalRadius + 1
            ? "rgba(251, 146, 60, 0.9)"
            : "rgba(255, 255, 255, 0.7)";
          ctx.shadowColor = "rgba(251, 146, 60, 0.4)";
          ctx.shadowBlur = n1.radius > n1.originalRadius + 1 ? 8 : 0;
        } else {
          ctx.fillStyle = n1.radius > n1.originalRadius + 1
            ? "rgba(249, 115, 22, 0.9)"
            : "rgba(15, 23, 42, 0.3)";
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      // Draw simulated scrolling EEG Signal lines at the bottom
      phase += 0.05 * intensity;
      const waveHeight = 25;
      const waveY = dimensions.height - 40;
      ctx.beginPath();
      ctx.strokeStyle = isDark ? "rgba(251, 146, 60, 0.15)" : "rgba(249, 115, 22, 0.15)";
      ctx.lineWidth = 1.5;

      for (let x = 0; x < dimensions.width; x += 3) {
        // Compose synthetic EEG signal: Alpha (8-12Hz), Beta (12-30Hz), Gamma (30-100Hz) bands
        const alpha = Math.sin(x * 0.02 + phase) * 8;
        const beta = Math.sin(x * 0.07 - phase * 1.8) * 4;
        const gamma = Math.sin(x * 0.15 + phase * 2.5) * (intensity > 1.5 ? 3 : 1);
        const noise = (Math.random() - 0.5) * (intensity > 1.5 ? 2.5 : 1);
        const y = waveY + (alpha + beta + gamma + noise) * (0.3 + intensity * 0.5);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw active brain status label
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(15, 23, 42, 0.15)";
      ctx.fillText(
        `EEG SIGNAL BAND [ALPHA/BETA/GAMMA] | ESTIMATED COGNITIVE STATE: ${activeTask.toUpperCase()} (INTENSITY: ${intensity.toFixed(1)}x)`,
        20,
        dimensions.height - 12
      );

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, theme, activeTask]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 block cursor-crosshair"
        id="neural-interaction-canvas"
      />
    </div>
  );
}
