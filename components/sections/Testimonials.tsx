'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const testimonials = [
  {
    quote: 'Prophet Collective didn\'t just run our ads — they re-engineered our entire acquisition system. Our ROAS went from 2x to 8x in 90 days.',
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    company: 'StyleVault',
  },
  {
    quote: 'The level of strategic depth is unmatched. They think in systems, not campaigns. Our lead pipeline is now fully automated and predictable.',
    name: 'Priya Sharma',
    role: 'VP of Marketing',
    company: 'CloudSync Technologies',
  },
  {
    quote: 'We went from spending ₹2L/month with zero tracking to a fully optimized ₹15L/month machine with clear attribution on every rupee.',
    name: 'Rohit Kapoor',
    role: 'Co-founder',
    company: 'LearnPath Academy',
  },
  {
    quote: 'Their WhatsApp automation alone generated 40% of our monthly revenue. The team operates like an extension of our company.',
    name: 'Sneha Reddy',
    role: 'Head of Growth',
    company: 'FreshBasket D2C',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          label="System.Feedback"
          title="Client Transmissions"
          subtitle="What our deployed partners have to say."
        />

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="glass-card rounded-xl p-8 md:p-12 text-center"
            >
              {/* Quote */}
              <div className="text-matrix-green/15 text-5xl font-serif leading-none mb-6">&ldquo;</div>
              <p className="text-[15px] md:text-lg text-gray-300 font-body leading-[1.75] mb-8 max-w-2xl mx-auto">
                {testimonials[current].quote}
              </p>
              <div>
                <p className="font-heading text-sm font-semibold text-white">
                  {testimonials[current].name}
                </p>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  {testimonials[current].role}, {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-matrix-green/30 hover:text-matrix-green transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'bg-matrix-green w-6' : 'bg-matrix-green/20 hover:bg-matrix-green/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-matrix-green/30 hover:text-matrix-green transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
