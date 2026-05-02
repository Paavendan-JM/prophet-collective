'use client';

import { useEffect, useRef, useCallback } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const columnsRef = useRef<Column[]>([]);

  const initColumns = useCallback((width: number, fontSize: number) => {
    const columnCount = Math.floor(width / fontSize);
    const cols: Column[] = [];
    for (let i = 0; i < columnCount; i++) {
      const length = Math.floor(Math.random() * 15) + 5;
      const chars: string[] = [];
      for (let j = 0; j < length; j++) {
        chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }
      cols.push({
        x: i * fontSize,
        y: Math.random() * -1000,
        speed: Math.random() * 2 + 1,
        chars,
        length,
      });
    }
    return cols;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 14 : 16;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      columnsRef.current = initColumns(window.innerWidth, fontSize);
    };

    resize();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const columns = columnsRef.current;
      const height = canvas.height / dpr;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        for (let j = 0; j < col.chars.length; j++) {
          const charY = col.y + j * fontSize;
          if (charY < 0 || charY > height) continue;

          const alpha = j === col.chars.length - 1
            ? 1
            : Math.max(0.1, (j / col.chars.length) * 0.6);

          if (j === col.chars.length - 1) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00FF41';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.font = `${fontSize}px 'Space Mono', monospace`;
          ctx.fillText(col.chars[j], col.x, charY);
        }

        ctx.shadowBlur = 0;
        col.y += col.speed * fontSize * 0.15;

        if (col.y - col.length * fontSize > height) {
          col.y = Math.random() * -500 - 100;
          col.speed = Math.random() * 2 + 1;
          // Randomize some characters
          for (let j = 0; j < col.chars.length; j++) {
            if (Math.random() > 0.7) {
              col.chars[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initColumns]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
