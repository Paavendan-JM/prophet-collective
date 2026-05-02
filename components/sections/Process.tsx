'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/effects/ScrollReveal';

const steps = [
  {
    id: '01',
    name: 'Discovery',
    description: 'Deep audit of your current systems, market position, and growth bottlenecks.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '02',
    name: 'Strategy',
    description: 'Custom growth blueprint combining paid, organic, and automation channels.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '03',
    name: 'Execution',
    description: 'Rapid deployment of campaigns, funnels, and automation sequences.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '04',
    name: 'Scale',
    description: 'Optimize, automate, and scale what works. Eliminate what doesn\'t.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const tools = [
  'Meta Business Suite', 'Google Ads', 'GA4',
  'HubSpot', 'Klaviyo', 'WhatsApp API',
  'Zapier', 'Semrush', 'Ahrefs',
  'Figma', 'Webflow', 'Vercel',
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="System.Process"
          title="Deployment Pipeline"
          subtitle="A battle-tested 4-phase process from audit to scale."
        />

        <div ref={ref} className="relative mb-24">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-matrix-green/0 via-matrix-green/40 to-matrix-green/0"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                className="text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full border border-white/10 bg-black flex items-center justify-center mb-4 relative">
                  <div className="text-matrix-green">{step.icon}</div>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-matrix-green/20"
                    animate={isInView ? {
                      boxShadow: ['0 0 0px rgba(0,255,65,0)', '0 0 15px rgba(0,255,65,0.3)', '0 0 0px rgba(0,255,65,0)'],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-matrix-green/40 tracking-widest">PHASE {step.id}</span>
                <h3 className="font-heading text-lg font-semibold text-white mt-1 mb-2">{step.name}</h3>
                <p className="text-xs font-body text-gray-500 leading-[1.7]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="font-heading text-lg font-semibold text-white mb-2">Tech Arsenal</h3>
            <p className="text-xs font-mono text-gray-500">Tools & platforms in our stack</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-[11px] font-body px-4 py-2 rounded-full border border-white/[0.06] text-gray-500 bg-white/[0.02] hover:text-matrix-green hover:border-matrix-green/25 transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
