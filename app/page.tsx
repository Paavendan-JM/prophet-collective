'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import ShopifyAutomation from '@/components/sections/ShopifyAutomation';
import CaseStudies from '@/components/sections/CaseStudies';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

const CursorGlow = dynamic(() => import('@/components/effects/CursorGlow'), {
  ssr: false,
});

const GridOverlay = dynamic(() => import('@/components/effects/GridOverlay'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CursorGlow />
      <GridOverlay />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ShopifyAutomation />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
