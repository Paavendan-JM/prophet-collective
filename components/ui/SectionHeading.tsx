'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {label && (
        <span className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-matrix-green/50 mb-4">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
        {title}
      </h2>
      {/* Accent line */}
      <div className={`mt-5 ${align === 'center' ? 'mx-auto' : ''}`}>
        <motion.div
          className="h-[1.5px] w-12 bg-gradient-to-r from-matrix-green to-transparent"
          initial={{ scaleX: 0, originX: align === 'center' ? 0.5 : 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
      {subtitle && (
        <p className="mt-5 text-[14px] md:text-[15px] text-gray-500 max-w-lg mx-auto font-body leading-[1.7]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
