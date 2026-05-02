'use client';

import { useEffect, useRef } from 'react';

// Simplex noise implementation (compact, no dependencies)
class SimplexNoise {
  private perm: Uint8Array;
  private grad3: number[][];

  constructor(seed = Math.random()) {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
    ];
    this.perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // Seed-based shuffle
    let s = seed * 2147483647;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = Math.floor((s / 2147483647) * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  noise2D(x: number, y: number): number {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = x - X0, y0 = y - Y0;

    let i1: number, j1: number;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;

    const ii = i & 255, jj = j & 255;
    let n0 = 0, n1 = 0, n2 = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      const gi0 = this.perm[ii + this.perm[jj]] % 12;
      n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
      n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
      n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2);
    }

    return 70 * (n0 + n1 + n2);
  }
}

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  layer: number; // 0=far, 1=mid, 2=near
  thickness: number;
  speed: number;
}

const LAYER_CONFIG = [
  { count: 120, speed: 0.3, thickness: 0.5, opacity: 0.15, blur: true },  // far
  { count: 80, speed: 0.6, thickness: 1.0, opacity: 0.35, blur: false },  // mid
  { count: 50, speed: 1.0, thickness: 1.8, opacity: 0.6, blur: false },   // near
];

const MOBILE_LAYER_CONFIG = [
  { count: 40, speed: 0.3, thickness: 0.5, opacity: 0.12, blur: false },
  { count: 30, speed: 0.5, thickness: 1.0, opacity: 0.25, blur: false },
  { count: 20, speed: 0.8, thickness: 1.5, opacity: 0.45, blur: false },
];

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
    const noise = new SimplexNoise(42);
    const layerConfig = isMobile ? MOBILE_LAYER_CONFIG : LAYER_CONFIG;

    let w = 0, h = 0;
    let particles: Particle[] = [];
    let time = 0;

    const createParticle = (layer: number): Particle => {
      const config = layerConfig[layer];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        prevX: 0, prevY: 0,
        vx: 0, vy: 0,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 300,
        layer,
        thickness: config.thickness * (0.5 + Math.random() * 0.5),
        speed: config.speed * (0.7 + Math.random() * 0.6),
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      for (let l = 0; l < layerConfig.length; l++) {
        for (let i = 0; i < layerConfig[l].count; i++) {
          particles.push(createParticle(l));
        }
      }
    };

    resize();

    const draw = () => {
      // Fade trail (creates motion blur / streak effect)
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.92)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      time += 0.003;
      const noiseScale = 0.002;
      const noiseScale2 = 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const config = layerConfig[p.layer];

        p.prevX = p.x;
        p.prevY = p.y;

        // Multi-octave noise for organic, non-repeating flow
        const n1 = noise.noise2D(p.x * noiseScale + time, p.y * noiseScale + time * 0.5);
        const n2 = noise.noise2D(p.x * noiseScale2 + 100 + time * 0.7, p.y * noiseScale2 + 100);
        const angle = (n1 + n2 * 0.5) * Math.PI * 2.5;

        // Velocity with momentum (smooth, organic feel)
        p.vx += Math.cos(angle) * p.speed * 0.3;
        p.vy += Math.sin(angle) * p.speed * 0.3;
        p.vx *= 0.96; // Damping
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Soft lifecycle fade
        const lifeFrac = p.life / p.maxLife;
        const lifeFade = lifeFrac < 0.1
          ? lifeFrac / 0.1
          : lifeFrac > 0.85
            ? (1 - lifeFrac) / 0.15
            : 1;

        // Respawn if dead or offscreen
        if (p.life >= p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          const np = createParticle(p.layer);
          // Spawn from edges for natural flow
          const edge = Math.random();
          if (edge < 0.25) np.x = -5;
          else if (edge < 0.5) np.x = w + 5;
          else if (edge < 0.75) np.y = -5;
          else np.y = h + 5;
          np.prevX = np.x;
          np.prevY = np.y;
          np.life = 0;
          particles[i] = np;
          continue;
        }

        // Draw streak
        const alpha = config.opacity * lifeFade;
        if (alpha < 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow bloom on near-layer particles
        if (p.layer === 2 && alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.thickness * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      // Reset composite mode for next frame's fade
      ctx.globalCompositeOperation = 'source-over';

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}
