import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { mainNav } from '../../data/navigation';
import { siteConfig } from '../../data/site';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isItemActive = (href: string) => {
    const current = location.pathname.replace(/\/$/, '') || '/';
    const target = href.replace(/\/$/, '') || '/';
    return current === target;
  };

  const handleMobileNav = (to: string) => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    navigate(to);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-[#0e0f12]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none border-none"
            aria-label="Aley Way Construction Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/logo/logo.png"
              alt="Aley Way Construction"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 outline-none border-0 select-none"
              onError={(e) => {
                // Fallback to logo-white.svg if PNG fails
                const target = e.currentTarget;
                if (!target.src.endsWith('logo-white.svg')) {
                  target.src = '/logo/logo-white.svg';
                }
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-8">
            {mainNav.map((item) => {
              const isActive = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-colors duration-200 py-1 relative ${
                    isActive
                      ? 'text-[#c5a880] font-semibold'
                      : 'text-[#e5e5e0]/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#c5a880]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button href="/contact/" variant="primary" size="sm">
              {siteConfig.primaryCta}
            </Button>
          </div>

          {/* Mobile Navigation Trigger Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <Button
              href="/contact/"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex text-[10px] px-3.5 py-2"
            >
              Plan Home
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#f5f2eb] hover:text-[#c5a880] transition-colors cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              id="mobile-nav-trigger"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#f5f2eb]" />
              ) : (
                <Menu className="w-6 h-6 text-[#f5f2eb]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer using Portal (avoids parent CSS transform/backdrop-filter containment) */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-nav-drawer"
            className="lg:hidden fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0e0f12]">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none border-none"
                aria-label="Aley Way Construction Home"
              >
                <img
                  src="/logo/logo.png"
                  alt="Aley Way Construction"
                  className="h-9 sm:h-10 w-auto object-contain outline-none border-0 select-none"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('logo-white.svg')) {
                      target.src = '/logo/logo-white.svg';
                    }
                  }}
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#f5f2eb] hover:text-[#c5a880] transition-colors cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6 text-[#f5f2eb]" />
              </button>
            </div>

            {/* Scrollable Nav Content */}
            <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
              {/* Primary Links */}
              <nav className="flex flex-col space-y-2">
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#c5a880] block mb-1">
                  Navigation
                </span>
                {mainNav.map((item) => {
                  const isActive = isItemActive(item.href);
                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleMobileNav(item.href)}
                      className={`text-xl font-serif tracking-wide py-3 px-3 w-full text-left flex items-center justify-between border-b border-white/5 transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#c5a880] bg-white/5 font-medium'
                          : 'text-[#f5f2eb] hover:text-[#c5a880] hover:bg-white/[0.02]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c5a880]/70" />
                    </button>
                  );
                })}
              </nav>

              {/* Curated Communities & Pricing */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#6e7078] block mb-2">
                  Featured Highlights
                </span>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => handleMobileNav('/open-book-pricing/')}
                    className="p-3 bg-[#131418] border border-white/5 hover:border-[#c5a880]/40 text-[#d8d9de] hover:text-[#c5a880] transition-colors flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div>
                      <span className="font-medium text-sm text-[#f5f2eb] block">Open-Book Pricing</span>
                      <span className="text-xs text-[#8e9099]">Transparent cost breakdown</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMobileNav('/projects/arbor-valley/')}
                    className="p-3 bg-[#131418] border border-white/5 hover:border-[#c5a880]/40 text-[#d8d9de] hover:text-[#c5a880] transition-colors flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div>
                      <span className="font-medium text-sm text-[#f5f2eb] block">Arbor Valley Homesites</span>
                      <span className="text-xs text-[#8e9099]">Valley Center, KS &bull; USD 262</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMobileNav('/financing/')}
                    className="p-3 bg-[#131418] border border-white/5 hover:border-[#c5a880]/40 text-[#d8d9de] hover:text-[#c5a880] transition-colors flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div>
                      <span className="font-medium text-sm text-[#f5f2eb] block">Financing &amp; Loans</span>
                      <span className="text-xs text-[#8e9099]">Construction lending guidance</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                  </button>
                </div>
              </div>

              {/* Direct Office Contacts */}
              <div className="p-4 bg-[#111216] border border-white/10 space-y-2.5 text-xs text-[#a8a9b0]">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>{siteConfig.address.full}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                    className="hover:text-[#c5a880] transition-colors font-medium text-[#f5f2eb]"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-[#c5a880] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-white/10 bg-[#0e0f12] space-y-3">
              <Button
                href="/contact/"
                variant="primary"
                size="lg"
                className="w-full text-center py-3.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {siteConfig.primaryCta}
              </Button>
              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8e9099]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Derek &amp; Xiochil Blades &bull; Licensed Kansas General Contractor</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
