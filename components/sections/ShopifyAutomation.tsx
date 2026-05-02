'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/effects/ScrollReveal';

const modules = [
  {
    id: 'SHOP.01',
    name: 'Abandoned Cart Recovery',
    description: 'Multi-channel recovery flows that trigger within minutes. WhatsApp, email, and SMS sequences coordinated to maximize cart conversion.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'SHOP.02',
    name: 'WhatsApp Commerce',
    description: 'Shopify-integrated WhatsApp flows for order updates, review collection, repeat purchase nudges, and conversational selling.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'SHOP.03',
    name: 'Email Lifecycle Flows',
    description: 'Klaviyo-style automated sequences: welcome series, post-purchase, winback, VIP tiers, and browse abandonment — all data-driven.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'SHOP.04',
    name: 'Upsell & Cross-sell',
    description: 'Intelligent product recommendation engine with post-purchase upsells, bundle offers, and dynamic discount logic.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'SHOP.05',
    name: 'Customer Segmentation',
    description: 'RFM-based segmentation that auto-classifies customers into cohorts. Target high-value, at-risk, and dormant segments with precision.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Flow diagram steps
const flowSteps = [
  { label: 'User Visit', short: 'Visit' },
  { label: 'Add to Cart', short: 'Cart' },
  { label: 'Exit Intent', short: 'Exit' },
  { label: 'Trigger Flow', short: 'Trigger' },
  { label: 'Recovery', short: 'Recover' },
  { label: 'Upsell', short: 'Upsell' },
];

export default function ShopifyAutomation() {
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: '-80px' });
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  return (
    <section id="shopify" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="System.Shopify"
          title="Shopify Automation Systems"
          subtitle="Automate your revenue engine. From cart recovery to customer lifecycle — every touchpoint, systematized."
        />

        {/* Flow Diagram */}
        <ScrollReveal className="mb-20">
          <div ref={flowRef} className="relative">
            {/* Label */}
            <div className="text-center mb-8">
              <span className="font-mono text-[10px] text-matrix-green/40 tracking-[0.3em] uppercase">
                Recovery Flow Architecture
              </span>
            </div>

            {/* Flow nodes */}
            <div className="flex items-center justify-between gap-0 overflow-x-auto pb-4">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-shrink-0">
                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={flowInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 * i, ease: 'easeOut' }}
                    className="relative group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border border-matrix-green/15 bg-matrix-green/[0.03] flex items-center justify-center relative overflow-hidden cursor-default">
                      {/* Sequential glow animation */}
                      <motion.div
                        className="absolute inset-0 bg-matrix-green/10 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={flowInView ? { opacity: [0, 0.5, 0] } : {}}
                        transition={{
                          duration: 0.6,
                          delay: 0.8 + i * 0.3,
                          ease: 'easeInOut',
                        }}
                      />
                      <span className="font-heading text-[10px] md:text-[11px] font-semibold text-white relative z-10">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Label */}
                    <p className="text-[9px] md:text-[10px] font-mono text-gray-500 text-center mt-2.5 whitespace-nowrap">
                      <span className="hidden md:inline">{step.label}</span>
                      <span className="md:hidden">{step.short}</span>
                    </p>
                    {/* Glow ring on hover */}
                    <div className="absolute -inset-1 rounded-xl border border-matrix-green/0 group-hover:border-matrix-green/20 transition-colors duration-300" />
                  </motion.div>

                  {/* Connector */}
                  {i < flowSteps.length - 1 && (
                    <motion.div
                      className="w-6 md:w-10 h-[1px] mx-1 md:mx-2 relative flex-shrink-0"
                      initial={{ scaleX: 0 }}
                      animate={flowInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                      style={{ originX: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-matrix-green/30 to-matrix-green/10" />
                      {/* Animated pulse along the line */}
                      <motion.div
                        className="absolute top-0 left-0 w-2 h-full bg-matrix-green/60 rounded-full"
                        animate={flowInView ? { left: ['0%', '100%'] } : {}}
                        transition={{
                          duration: 1.2,
                          delay: 1.5 + i * 0.3,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Automation Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <ScrollReveal key={mod.id} delay={i * 0.08}>
              <motion.div
                onMouseEnter={() => setHoveredModule(i)}
                onMouseLeave={() => setHoveredModule(null)}
                className="glass-card rounded-xl p-5 h-full relative overflow-hidden group"
              >
                {/* Top bar accent */}
                <motion.div
                  className="absolute top-0 left-0 h-[1px] bg-matrix-green/40"
                  initial={{ width: 0 }}
                  animate={hoveredModule === i ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg border border-matrix-green/10 bg-matrix-green/[0.04] flex items-center justify-center text-matrix-green flex-shrink-0 group-hover:border-matrix-green/25 transition-colors duration-300">
                    {mod.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* ID + Name */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-mono text-[9px] text-matrix-green/35 tracking-widest">{mod.id}</span>
                    </div>
                    <h3 className="font-heading text-[15px] font-semibold text-white mb-2 leading-tight">
                      {mod.name}
                    </h3>
                    <p className="text-[13px] font-body text-gray-500 leading-[1.65]">
                      {mod.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
