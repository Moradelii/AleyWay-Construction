import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { contentService } from '../../services/contentService';
import { Button } from '../ui/Button';
import { trackEvent } from '../../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [heroData, setHeroData] = useState(() => contentService.getPage('home').hero);

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setHeroData(contentService.getPage('home').hero);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !videoWrapperRef.current || !textContentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Scroll-driven cinematic sequence without scroll-hijacking pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Text subtly moves upward & fades slightly
      tl.to(textContentRef.current, {
        y: -60,
        opacity: 0.2,
        ease: 'power1.out',
      }, 0);

      // Video scale decreases smoothly from full-bleed to framed architectural card
      tl.to(videoWrapperRef.current, {
        scale: 0.92,
        borderRadius: '16px',
        ease: 'power2.inOut',
      }, 0);
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('trust-strip');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0b0d] flex items-center justify-center"
      aria-label="Welcome to Aley Way Construction"
    >
      {/* Video & Poster Container */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden origin-center transition-all duration-700 will-change-transform shadow-2xl"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover select-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroData.bgPosterUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"}
        >
          {/* Main video source specified in blueprint */}
          <source src={heroData.bgVideoUrl || "/video/hero-house.mp4"} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Sophisticated dark gradient overlays for maximum typographic contrast */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0e11]/20 to-[#0d0e11]/70" />
      </div>

      {/* Hero Content Overlay */}
      <div
        ref={textContentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center pt-16 sm:pt-20"
      >
        {/* Architectural Sub-header / Eyebrow (restrained, single line) */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 border border-white/15 bg-black/30 backdrop-blur-sm mb-6 sm:mb-8 text-[#f5f2eb]">
          <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#e5e5e0]">
            {heroData.eyebrow}
          </span>
        </div>

        {/* H1 Primary Brand Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#f5f2eb] tracking-tight leading-[1.08] max-w-4xl">
          {heroData.titleLine1} <span className="italic font-light text-[#c5a880]">{heroData.titleItalic}</span>
        </h1>

        {/* Supporting text */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl font-light text-[#d8d9de] max-w-2xl leading-relaxed">
          {heroData.supportingText}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center">
          <Button
            href={heroData.primaryCtaLink || "/contact/"}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto group"
            onClick={() => trackEvent('hero_cta_click', { button: 'primary_plan_your_home' })}
          >
            <span>{heroData.primaryCtaText || siteConfig.primaryCta}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button
            href={heroData.secondaryCtaLink || "/custom-homes/"}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => trackEvent('hero_cta_click', { button: 'secondary_explore_homes' })}
          >
            {heroData.secondaryCtaText || siteConfig.secondaryCta}
          </Button>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <button
        onClick={handleScrollDown}
        aria-label="Scroll to discover content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 text-[#a8a9b0] hover:text-[#c5a880] transition-colors cursor-pointer"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
