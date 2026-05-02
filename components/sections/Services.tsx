'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import GlowCard from '@/components/ui/GlowCard';
import ScrollReveal from '@/components/effects/ScrollReveal';

const services = [
  {
    id: 'SYS.001',
    name: 'Performance Marketing',
    description:
      'Data-driven paid media campaigns across Meta, Google, and programmatic channels. We optimize for ROAS, not vanity metrics.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ['Meta Ads', 'Google Ads', 'ROAS Optimization'],
  },
  {
    id: 'SYS.002',
    name: 'SEO & Content Systems',
    description:
      'Technical SEO architecture and content systems that compound over time. We build organic traffic engines, not just blog posts.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ['Technical SEO', 'Content Strategy', 'Link Building'],
  },
  {
    id: 'SYS.003',
    name: 'Automation Funnels',
    description:
      'End-to-end funnel architecture with automated nurture sequences, retargeting logic, and conversion optimization baked in.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16v3l-6 5v5l-4 3V12L4 7V4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ['Email Automation', 'Landing Pages', 'A/B Testing'],
  },
  {
    id: 'SYS.004',
    name: 'WhatsApp & CRM Marketing',
    description:
      'Direct-to-customer messaging infrastructure. WhatsApp Business API, CRM integration, and conversational commerce flows.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ['WhatsApp API', 'CRM Integration', 'Chat Flows'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="System.Modules"
          title="Growth Modules"
          subtitle="Each module is a self-contained growth system. Deploy individually or stack for exponential impact."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <GlowCard className="h-full">
                {/* Module ID */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-matrix-green/50 tracking-widest">
                    {service.id}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-matrix-green/40 animate-glow-pulse" />
                </div>

                {/* Icon */}
                <div className="text-matrix-green mb-4">
                  {service.icon}
                </div>

                {/* Name */}
                <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-3">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 font-body leading-[1.7] mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-1 rounded border border-matrix-green/15 text-matrix-green/60 bg-matrix-green/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
