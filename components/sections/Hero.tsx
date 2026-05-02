'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import GlowButton from '@/components/ui/GlowButton';

const FlowField = dynamic(() => import('@/components/ui/FlowField'), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Flow Field Background */}
      <FlowField />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-transparent to-black" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* System label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-matrix-green/15 bg-matrix-green/[0.04] text-matrix-green/80 text-[11px] font-body tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-matrix-green animate-glow-pulse" />
            Systems Operational
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-7"
        >
          We Engineer{' '}
          <span className="neon-text-subtle">Growth Systems</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-body text-[15px] md:text-base text-gray-400 max-w-xl mx-auto leading-[1.7] mb-12"
        >
          Performance marketing infrastructure for brands that refuse to be ordinary.
          We don&apos;t do campaigns — we build revenue machines.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton href="#contact" variant="primary">
            Start Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </GlowButton>
          <GlowButton href="#case-studies" variant="secondary">
            View Case Studies
          </GlowButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-body text-gray-600 tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-matrix-green/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
