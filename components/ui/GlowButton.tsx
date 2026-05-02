'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GlowButton({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
}: GlowButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    px-7 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.08em]
    rounded overflow-hidden cursor-pointer
    transition-all duration-400 ease-out
  `;

  const variants = {
    primary: `
      bg-matrix-green text-matrix-black
      hover:shadow-[0_0_20px_rgba(0,255,65,0.35),0_0_40px_rgba(0,255,65,0.1)]
    `,
    secondary: `
      bg-transparent text-gray-300
      border border-white/10
      hover:border-matrix-green/40 hover:text-matrix-green
      hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]
    `,
  };

  const content = (
    <motion.span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full"
        whileHover={{ translateX: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
}
