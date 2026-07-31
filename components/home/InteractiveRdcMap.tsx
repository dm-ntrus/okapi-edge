'use client';

import React, { useEffect, useRef } from 'react';

/** Global edge network — gold / chestnut on Forêt Okapi dark. */
export const InteractiveRdcMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodes = [
      { name: 'Frankfurt Edge-01', x: 0.48, y: 0.3, primary: true, ping: '8ms' },
      { name: 'US-East (Virginia)', x: 0.22, y: 0.35, primary: true, ping: '12ms' },
      { name: 'London Core-02', x: 0.44, y: 0.26, primary: true, ping: '6ms' },
      { name: 'Tokyo Edge-04', x: 0.85, y: 0.38, primary: true, ping: '14ms' },
      { name: 'Singapore Hub', x: 0.76, y: 0.58, primary: true, ping: '11ms' },
      { name: 'Sao Paulo Edge', x: 0.3, y: 0.72, primary: false, ping: '18ms' },
      { name: 'Sydney Hub', x: 0.88, y: 0.78, primary: false, ping: '22ms' },
      { name: 'Dubai Edge Node', x: 0.58, y: 0.42, primary: false, ping: '10ms' },
      { name: 'Central Africa Hub', x: 0.52, y: 0.58, primary: true, ping: '9ms' },
    ];

    const particles = Array.from({ length: 52 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.45 + 0.2,
    }));

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseTime += 0.02;

      const wash = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        20,
        width * 0.5,
        height * 0.42,
        Math.max(width, height) * 0.7,
      );
      wash.addColorStop(0, 'rgba(196, 165, 116, 0.08)');
      wash.addColorStop(0.5, 'rgba(92, 61, 46, 0.12)');
      wash.addColorStop(1, 'rgba(26, 20, 16, 0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(196, 165, 116, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(196, 165, 116, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const nodeCoords = nodes.map((n) => ({
        ...n,
        px: n.x * width,
        py: n.y * height,
      }));

      for (let i = 0; i < nodeCoords.length; i++) {
        for (let j = i + 1; j < nodeCoords.length; j++) {
          const n1 = nodeCoords[i];
          const n2 = nodeCoords[j];
          const dist = Math.hypot(n1.px - n2.px, n1.py - n2.py);

          if (dist < width * 0.45) {
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            const lineAlpha = (1 - dist / (width * 0.45)) * 0.28;
            ctx.strokeStyle = `rgba(196, 165, 116, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            const pulsePos = (Math.sin(pulseTime * 2 + i + j) + 1) / 2;
            const pulseX = n1.px + (n2.px - n1.px) * pulsePos;
            const pulseY = n1.py + (n2.py - n1.py) * pulsePos;

            ctx.fillStyle = '#E8DCC8';
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      nodeCoords.forEach((node) => {
        if (node.primary) {
          const aura = Math.sin(pulseTime * 3) * 6 + 14;
          ctx.beginPath();
          ctx.arc(node.px, node.py, aura, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(196, 165, 116, 0.16)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.px, node.py, aura * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(232, 220, 200, 0.12)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.px, node.py, node.primary ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = node.primary ? '#E8DCC8' : '#C4A574';
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 240, 232, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.fillStyle = node.primary ? '#F5F0E8' : '#C4B5A5';
        ctx.fillText(`${node.name} (${node.ping})`, node.px + 10, node.py + 4);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-75">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
