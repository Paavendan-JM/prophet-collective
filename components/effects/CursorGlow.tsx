'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        el.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      el.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      el.style.opacity = '1';
    };

    // Smooth follow with requestAnimationFrame instead of React state
    const animate = () => {
      const dx = posRef.current.x - currentRef.current.x;
      const dy = posRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * 0.15;
      currentRef.current.y += dy * 0.15;

      el.style.transform = `translate(${currentRef.current.x - 200}px, ${currentRef.current.y - 200}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[9998]"
      style={{
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(0, 255, 65, 0.04) 0%, rgba(0, 255, 65, 0.015) 30%, transparent 65%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
