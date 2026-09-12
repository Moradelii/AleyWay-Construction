import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Facebook, Instagram, Youtube } from 'lucide-react';
import { footerNav } from '../../data/navigation';
import { siteConfig } from '../../data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080a] border-t border-white/10 text-[#a8a9b0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col space-y-5">
            <Link
              to="/"
              className="flex items-center group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none border-none"
              aria-label="Aley Way Construction Home"
            >
              <img
                src="/logo/logo.png"
                alt="Aley Way Construction"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 outline-none border-0 select-none"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('logo-white.svg')) {
                    target.src = '/logo/logo-white.svg';
                  }
                }}
              />
            </Link>

            <p className="text-sm font-light text-[#8e9099] max-w-md leading-relaxed">
              {siteConfig.supportingText} Serving Wichita, Valley Center, and South Central Kansas with principal-led craftsmanship and open-book transparency.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-[#c5a880]">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Licensed General Contractor &bull; Kansas Residential Builder</span>
            </div>

            <div className="text-xs text-[#6e7078]">
              Principals: Derek Blades &amp; Xiochil Blades
            </div>

            {/* Social Networks */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#8e9099] hover:text-[#c5a880] hover:border-[#c5a880] transition-colors"
                aria-label="Follow Aley Way Construction on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#8e9099] hover:text-[#c5a880] hover:border-[#c5a880] transition-colors"
                aria-label="Follow Aley Way Construction on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#8e9099] hover:text-[#c5a880] hover:border-[#c5a880] transition-colors"
                aria-label="Subscribe to Aley Way Construction on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Architecture & Homes */}
          <div>
            <h3 className="text-xs uppercase font-medium tracking-[0.2em] text-[#f5f2eb] mb-5">
              Custom Homes
            </h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              {footerNav.build.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-[#c5a880] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency & Process */}
          <div>
            <h3 className="text-xs uppercase font-medium tracking-[0.2em] text-[#f5f2eb] mb-5">
              Transparency
            </h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              {footerNav.transparency.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-[#c5a880] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div>
            <h3 className="text-xs uppercase font-medium tracking-[0.2em] text-[#f5f2eb] mb-5">
              Contact &amp; Office
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center space-x-2.5 hover:text-[#c5a880] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center space-x-2.5 hover:text-[#c5a880] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="pt-3">
                <Link
                  to="/contact/"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#c5a880] hover:text-white uppercase tracking-wider font-medium"
                >
                  <span>Start Qualification Form</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6e7078] gap-4">
          <div>
            &copy; 2026 AleyWay Construction LLC. All rights reserved. | By:{' '}
            <a
              href="https://www.mora-grafics-studio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8e9099] hover:text-[#c5a880] transition-colors underline underline-offset-4"
            >
              Mora-Grafic's Studio
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/privacy/" className="hover:text-[#a8a9b0] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms/" className="hover:text-[#a8a9b0] transition-colors">
              Terms of Service
            </Link>
            <Link to="/dashboard" className="hover:text-[#c5a880] transition-colors flex items-center gap-1">
              <span>CRM Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
