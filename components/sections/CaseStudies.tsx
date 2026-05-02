'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/effects/ScrollReveal';

const caseStudies = [
  {
    client: 'E-Commerce D2C Brand',
    industry: 'Fashion & Lifestyle',
    challenge: 'Scaling ad spend profitably beyond ₹10L/month',
    metrics: [
      { label: 'Revenue Growth', value: 340, suffix: '%' },
      { label: 'ROAS Achieved', value: 8, suffix: '.4x' },
      { label: 'CAC Reduction', value: 62, suffix: '%' },
    ],
    systems: ['Meta Ads', 'Funnel Automation', 'WhatsApp Retargeting'],
    color: 'from-matrix-green/20 to-transparent',
  },
  {
    client: 'SaaS Platform',
    industry: 'B2B Technology',
    challenge: 'Generating qualified demo requests at scale',
    metrics: [
      { label: 'Lead Volume', value: 500, suffix: '%', prefix: '+' },
      { label: 'Cost Per Lead', value: 73, suffix: '%', prefix: '-' },
      { label: 'Demo Conversion', value: 28, suffix: '%' },
    ],
    systems: ['Google Ads', 'SEO', 'CRM Integration'],
    color: 'from-emerald-500/20 to-transparent',
  },
  {
    client: 'EdTech Startup',
    industry: 'Online Education',
    challenge: 'Building a predictable enrollment pipeline',
    metrics: [
      { label: 'Enrollments/Month', value: 2400, suffix: '+' },
      { label: 'Revenue', value: 5, suffix: 'Cr+', prefix: '₹' },
      { label: 'Funnel Efficiency', value: 4, suffix: '.2x' },
    ],
    systems: ['Performance Marketing', 'Automation Funnels', 'WhatsApp'],
    color: 'from-green-400/20 to-transparent',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="System.Output"
          title="Deployment Results"
          subtitle="Real systems. Real metrics. Zero fluff."
        />

        <div className="space-y-8">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.client} delay={i * 0.15}>
              <div className="glass-card rounded-xl p-6 md:p-8 relative overflow-hidden">
                {/* Background gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${study.color}`} />

                <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                  {/* Left: Client Info */}
                  <div>
                    <span className="text-[10px] font-mono text-matrix-green/50 tracking-widest uppercase">
                      Case Study #{String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mt-2 mb-1">
                      {study.client}
                    </h3>
                    <p className="text-xs font-mono text-gray-500 mb-4">{study.industry}</p>
                    <p className="text-sm font-body text-gray-400 leading-[1.7] mb-4">
                      <span className="text-matrix-green/60 font-mono text-xs">Challenge:</span>{' '}{study.challenge}
                    </p>

                    {/* Systems used */}
                    <div className="flex flex-wrap gap-2">
                      {study.systems.map((sys) => (
                        <span
                          key={sys}
                          className="text-[10px] font-mono px-2 py-1 rounded border border-matrix-green/15 text-matrix-green/60 bg-matrix-green/5"
                        >
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center p-4 rounded-lg bg-black/40">
                        <div className="text-2xl md:text-3xl font-bold neon-text mb-2">
                          <Counter
                            end={metric.value}
                            prefix={metric.prefix}
                            suffix={metric.suffix}
                            duration={2}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
