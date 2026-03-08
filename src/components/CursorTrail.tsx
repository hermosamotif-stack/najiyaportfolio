import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const points: { x: number; y: number; age: number }[] = [];
    let mouse = { x: -100, y: -100 };
    let raf: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const move = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.length > 50) points.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;
        const life = 1 - p.age / 60;
        if (life <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }
        const radius = life * 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(220, 80%, 50%, ${life * 0.4})`;
        ctx.fill();
      }

      // Glow at mouse
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
      gradient.addColorStop(0, "hsla(220, 80%, 50%, 0.15)");
      gradient.addColorStop(1, "hsla(220, 80%, 50%, 0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    />
  );
};

export default CursorTrail;
