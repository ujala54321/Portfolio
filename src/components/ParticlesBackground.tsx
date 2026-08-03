import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }[] = [];

    const colorsDark = ['#a855f7', '#ec4899', '#38bdf8', '#818cf8'];
    const colorsLight = ['#7c3aed', '#db2777', '#0284c7', '#4f46e5'];

    const colors = theme === 'dark' ? colorsDark : colorsLight;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(168, 85, 247, ${0.12 * (1 - dist / 120)})`
                : `rgba(124, 58, 237, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render & update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background radial gradient & glow effects */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#030712]' : 'bg-[#f8fafc]'
        }`}
      />
      
      {/* Animated subtle grid */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-grid-pattern opacity-40' : 'bg-grid-pattern-light opacity-30'
        }`}
      />

      {/* Neon Purple ambient glow top-right */}
      <div
        className={`absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full filter blur-[130px] pointer-events-none transition-opacity duration-700 animate-pulse-glow ${
          theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-300/40'
        }`}
      />

      {/* Pink/Sky ambient glow center-left */}
      <div
        className={`absolute bottom-1/3 left-10 w-[450px] h-[450px] rounded-full filter blur-[140px] pointer-events-none transition-opacity duration-700 ${
          theme === 'dark' ? 'bg-pink-900/20' : 'bg-pink-200/40'
        }`}
      />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-70" />
    </div>
  );
};
