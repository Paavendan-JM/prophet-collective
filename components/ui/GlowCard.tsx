'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useCallback } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
}

export default function GlowCard({
  children,
  className = '',
  tiltIntensity = 4,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);

    // Update CSS variables for radial glow position
    if (glowRef.current) {
      glowRef.current.style.setProperty('--gx', `${((xPos + 0.5) * 100).toFixed(1)}%`);
      glowRef.current.style.setProperty('--gy', `${((yPos + 0.5) * 100).toFixed(1)}%`);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`
        glass-card rounded-xl p-6 relative overflow-hidden
        group cursor-default
        ${className}
      `}
    >
      {/* Radial glow that follows the cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), rgba(0, 255, 65, 0.06), transparent 50%)',
        }}
      />
      {/* Inner light border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-matrix-green/[0.08]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
