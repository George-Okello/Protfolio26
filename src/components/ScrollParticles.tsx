import { useEffect, useRef } from "react";

export default function ScrollParticles({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta;
      
      // Spawn particles proportional to scroll speed
      const count = Math.min(Math.abs(delta) / 4, 15);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: delta > 0 ? canvas.height + 10 : -10, // Spawn from the edge
          vx: (Math.random() - 0.5) * 1.5,
          vy: -delta * (Math.random() * 0.05 + 0.01), // Move in the direction of scroll
          life: 0,
          maxLife: Math.random() * 80 + 40,
          size: Math.random() * 2 + 1,
        });
      }
      
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDarkTheme = document.documentElement.classList.contains("dark");
      // Monochromatic palette
      const baseColor = isDarkTheme ? "255, 255, 255" : "15, 23, 42"; 

      // Ambient slow-spawning particles
      if (Math.random() < 0.2) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: Math.random() * 150 + 50,
          size: Math.random() * 1.5 + 0.5,
        });
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        // Add current scroll velocity to drift
        p.y -= scrollVelocity * 0.08;
        // Slight organic float
        p.x += Math.sin(p.life / 20) * 0.2;
        
        const progress = p.life / p.maxLife;
        const opacity = Math.sin(progress * Math.PI) * (isDarkTheme ? 0.3 : 0.2); // Smooth fade in and out

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.fill();
      });

      scrollVelocity *= 0.92; // Dampen velocity

      // Cleanup dead particles
      particles = particles.filter(p => p.life < p.maxLife && p.y > -100 && p.y < canvas.height + 100);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
