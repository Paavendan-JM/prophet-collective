'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/effects/ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', requirement: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      console.log('Form submitted:', formData);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="System.Connect"
          title="Ready to Deploy?"
          subtitle="Initiate your growth system. We respond within 24 hours."
        />

        <ScrollReveal>
          <div className="terminal">
            <div className="terminal-header">
              <span className="terminal-dot bg-red-500" />
              <span className="terminal-dot bg-yellow-500" />
              <span className="terminal-dot bg-green-500" />
              <span className="ml-3 text-xs text-gray-500 font-mono">new_project.init</span>
            </div>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 md:p-12 text-center"
              >
                <div className="text-matrix-green text-5xl mb-4">✓</div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  Transmission Received
                </h3>
                <p className="text-sm font-body text-gray-400">
                  Our team will initiate contact within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-matrix-green/60 mb-2">
                    <span className="text-matrix-green">{'>'}</span> name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-gray-300 placeholder-gray-600 focus:outline-none focus:border-matrix-green/30 focus:shadow-[0_0_15px_rgba(0,255,65,0.06)] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-matrix-green/60 mb-2">
                    <span className="text-matrix-green">{'>'}</span> email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email..."
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-gray-300 placeholder-gray-600 focus:outline-none focus:border-matrix-green/30 focus:shadow-[0_0_15px_rgba(0,255,65,0.06)] transition-all"
                  />
                </div>

                {/* Requirement */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-matrix-green/60 mb-2">
                    <span className="text-matrix-green">{'>'}</span> requirement
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    placeholder="Describe your project or growth challenge..."
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 text-sm font-body text-gray-300 placeholder-gray-600 focus:outline-none focus:border-matrix-green/30 focus:shadow-[0_0_15px_rgba(0,255,65,0.06)] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-matrix-green text-matrix-black font-heading text-[13px] font-semibold uppercase tracking-[0.08em] rounded-lg cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-matrix-black border-t-transparent rounded-full"
                      />
                      Transmitting...
                    </span>
                  ) : (
                    'Deploy Inquiry →'
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
