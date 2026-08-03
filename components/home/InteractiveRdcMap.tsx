'use client';

import { useEffect, useRef } from 'react';

const NODES = [
  { name: 'Frankfurt', x: 0.48, y: 0.3, primary: true, ping: '8ms' },
  { name: 'Virginia', x: 0.22, y: 0.35, primary: true, ping: '12ms' },
  { name: 'London', x: 0.44, y: 0.26, primary: true, ping: '6ms' },
  { name: 'Tokyo', x: 0.85, y: 0.38, primary: true, ping: '14ms' },
  { name: 'Singapore', x: 0.76, y: 0.58, primary: true, ping: '11ms' },
  { name: 'Sao Paulo', x: 0.3, y: 0.72, primary: false, ping: '18ms' },
  { name: 'Sydney', x: 0.88, y: 0.78, primary: false, ping: '22ms' },
  { name: 'Dubai', x: 0.58, y: 0.42, primary: false, ping: '10ms' },
  { name: 'Kinshasa', x: 0.52, y: 0.58, primary: true, ping: '9ms' },
] as const;

/** Edge network backdrop — same canvas on all viewports. */
export function InteractiveRdcMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let alive = true;

    const particles = Array.from({ length: 44 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0024,
      vy: (Math.random() - 0.5) * 0.0024,
      size: Math.random() * 1.8 + 0.9,
      alpha: Math.random() * 0.4 + 0.18,
    }));

    const resize = () => {
      const section = wrap.parentElement;
      const box = section?.getBoundingClientRect() ?? wrap.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(box.width));
      const nextH = Math.max(1, Math.round(box.height));
      if (nextW === w && nextH === h) return;
      w = nextW;
      h = nextH;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = () => {
      if (!alive) return;
      resize();
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const mobile = w < 640;
      t += 0.018;
      ctx.clearRect(0, 0, w, h);

      const wash = ctx.createRadialGradient(w * 0.5, h * 0.4, 8, w * 0.5, h * 0.4, Math.max(w, h) * 0.7);
      wash.addColorStop(0, mobile ? 'rgba(196,165,116,0.14)' : 'rgba(196,165,116,0.11)');
      wash.addColorStop(0.5, mobile ? 'rgba(92,61,46,0.14)' : 'rgba(92,61,46,0.12)');
      wash.addColorStop(1, 'rgba(26,20,16,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      const step = mobile ? 40 : 48;
      ctx.strokeStyle = mobile ? 'rgba(196,165,116,0.07)' : 'rgba(196,165,116,0.055)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.fillStyle = `rgba(196,165,116,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const pts = NODES.map((n) => ({ ...n, px: n.x * w, py: n.y * h }));
      const maxD = w * (mobile ? 0.55 : 0.46);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.px - b.px, a.py - b.py);
          if (d >= maxD) continue;
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.strokeStyle = `rgba(196,165,116,${(1 - d / maxD) * (mobile ? 0.32 : 0.28)})`;
          ctx.lineWidth = 1.15;
          ctx.stroke();

          const u = (Math.sin(t * 2 + i + j) + 1) / 2;
          ctx.fillStyle = 'rgba(232,220,200,0.85)';
          ctx.beginPath();
          ctx.arc(a.px + (b.px - a.px) * u, a.py + (b.py - a.py) * u, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const node of pts) {
        if (node.primary) {
          const aura = Math.sin(t * 2.6) * 5 + 13;
          ctx.beginPath();
          ctx.arc(node.px, node.py, aura, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(196,165,116,0.14)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.px, node.py, node.primary ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.primary ? '#E8DCC8' : '#C4A574';
        ctx.fill();
        ctx.strokeStyle = 'rgba(245,240,232,0.8)';
        ctx.lineWidth = 1.25;
        ctx.stroke();

        // Skip labels on very small screens so the title stays clean
        if (w >= 420) {
          ctx.font = '10px "IBM Plex Mono", ui-monospace, monospace';
          ctx.fillStyle = node.primary ? 'rgba(245,240,232,0.82)' : 'rgba(196,181,165,0.7)';
          const label = w < 560 ? node.name : `${node.name} (${node.ping})`;
          ctx.fillText(label, node.px + 9, node.py + 3);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const start = requestAnimationFrame(() => {
      resize();
      frame();
    });

    const ro = new ResizeObserver(resize);
    if (wrap.parentElement) ro.observe(wrap.parentElement);
    else ro.observe(wrap);
    window.addEventListener('orientationchange', resize);

    return () => {
      alive = false;
      cancelAnimationFrame(start);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('orientationchange', resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="oe-map-canvas absolute inset-0 block h-full w-full" />
    </div>
  );
}
