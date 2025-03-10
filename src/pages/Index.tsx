
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

const Index = () => {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add scroll reveal animation for sections
    const revealElements = document.querySelectorAll('.reveal-slow');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      // Clean up observers
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <PricingSection />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
