'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import TerminalText from '@/components/ui/TerminalText';
import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/effects/ScrollReveal';

const stats = [
  { value: 150, suffix: '+', label: 'Clients Deployed' },
  { value: 50, prefix: '₹', suffix: 'Cr+', label: 'Revenue Generated' },
  { value: 12, suffix: 'x', label: 'Average ROAS' },
  { value: 98, suffix: '%', label: 'Client Retention' },
];

const terminalLines = [
  'Initializing Prophet Collective...',
  'We are not marketers. We are system architects.',
  'Born from the intersection of data science and creative strategy.',
  'Every campaign is a system. Every funnel is infrastructure.',
  'We reverse-engineer growth, then automate it.',
  'Our clients don\'t just grow — they scale exponentially.',
  'System ready. Awaiting deployment...',
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="System.About"
          title="We Build Growth Infrastructure"
          subtitle="Not another agency. A performance engineering collective."
        />

        {/* Terminal */}
        <ScrollReveal className="mb-16">
          <TerminalText lines={terminalLines} typingSpeed={25} />
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-lg border border-matrix-green/10 bg-matrix-green/[0.02]">
                <div className="text-3xl md:text-4xl font-bold neon-text mb-2">
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
