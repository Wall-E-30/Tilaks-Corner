import { useEffect, useRef } from 'react';

export default function WarpTransition({ isWarping, onWarpComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isWarping) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Generate radial stars
    const starCount = 200;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      size: Math.random() * 2 + 1
    }));

    let animId;
    let startTime = performance.now();
    const duration = 750; // ms

    const render = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.fillStyle = 'rgba(5, 6, 15, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= 18 + progress * 40;
        if (star.z <= 0) star.z = width;

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Warp trail stretch
        const prevZ = star.z + 30 + progress * 50;
        const prevK = 250 / prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        ctx.strokeStyle = `rgba(237, 235, 250, ${0.4 + progress * 0.5})`;
        ctx.lineWidth = star.size * (1 + progress);
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      if (progress < 1) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        onWarpComplete();
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isWarping, onWarpComplete]);

  if (!isWarping) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(5, 6, 15, 0.7)'
      }}
    />
  );
}
