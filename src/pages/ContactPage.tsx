import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LeadQualificationForm } from '../components/forms/LeadQualificationForm';
import { siteConfig } from '../data/site';
import { contentService } from '../services/contentService';
import { Phone, Mail, Clock, MapPin, ShieldCheck, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('contact'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('contact'));
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Contact Aley Way Construction LLC | Wichita, KS"
        description="Connect with Derek and Xiochil Blades to discuss your custom home project in Wichita and Valley Center, KS. Office: 1333 N Broadway, #3, Wichita, KS 67214. Phone: 316-295-7838."
        canonicalPath="/contact/"
        breadcrumbs={[{ name: 'Contact', path: '/contact/' }]}
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Contact' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Direct Consultation'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed">
              {data.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 sm:py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 bg-[#111216] border border-white/10">
                <h2 className="font-serif text-2xl text-[#f5f2eb] mb-6">
                  Office &amp; Direct Line
                </h2>

                <div className="space-y-6 text-sm">
                  {/* Address */}
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block">
                        Headquarters &amp; Office
                      </span>
                      <span className="text-base text-[#f5f2eb] font-medium block leading-snug">
                        {siteConfig.legalName}
                      </span>
                      <p className="text-sm text-[#d8d9de] mt-1 leading-relaxed">
                        {data.streetAddress || siteConfig.address.street}<br />
                        {data.cityStateZip || `${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block">
                        Direct Phone
                      </span>
                      <a
                        href={`tel:${(data.phone || siteConfig.phone).replace(/[^0-9]/g, '')}`}
                        className="text-base text-[#f5f2eb] hover:text-[#c5a880] transition-colors font-medium"
                      >
                        {data.phoneDisplay || data.phone || siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${data.email || siteConfig.email}`}
                        className="text-base text-[#f5f2eb] hover:text-[#c5a880] transition-colors font-medium break-all"
                      >
                        {data.email || siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Consultation Hours */}
                  <div className="flex items-start space-x-3.5">
                    <Clock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block">
                        Consultation Hours
                      </span>
                      <span className="text-sm text-[#f5f2eb]">
                        {data.officeHours || siteConfig.hours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Networks */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#6e7078] block mb-3">
                    Connect on Social Media
                  </span>
                  <div className="flex items-center space-x-3">
                    <a
                      href={siteConfig.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#c5a880] text-xs text-[#a8a9b0] hover:text-[#c5a880] transition-colors flex items-center gap-2"
                      aria-label="Facebook Profile"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={siteConfig.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#c5a880] text-xs text-[#a8a9b0] hover:text-[#c5a880] transition-colors flex items-center gap-2"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={siteConfig.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-[#c5a880] text-xs text-[#a8a9b0] hover:text-[#c5a880] transition-colors flex items-center gap-2"
                      aria-label="YouTube Channel"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center space-x-3 text-xs text-[#a8a9b0]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>
                    Direct principal access. You speak directly with Derek &amp; Xiochil Blades.
                  </span>
                </div>
              </div>

              {/* Service Radius Card */}
              <div className="p-8 bg-[#111216] border border-white/5">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c5a880] uppercase block mb-2">
                  Building Enclave
                </span>
                <h3 className="font-serif text-xl text-[#f5f2eb] mb-2">
                  Arbor Valley Homesites
                </h3>
                <p className="text-xs text-[#8e9099] leading-relaxed mb-4">
                  Looking specifically for available half-acre lots in Valley Center? Inquire via the qualification form or request our current plat map.
                </p>
                <div className="text-xs text-[#c5a880] uppercase tracking-wider font-medium">
                  Valley Center USD 262 School District &bull; Sedgwick County
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Step Lead Qualification Funnel */}
            <div className="lg:col-span-7">
              <LeadQualificationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-[#08080a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-2">
                Location &amp; Service Area
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#f5f2eb]">
                Visit Aley Way Construction LLC
              </h2>
              <p className="text-xs sm:text-sm text-[#8e9099] mt-2">
                1333 N Broadway, #3, Wichita, KS, United States, 67214
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=1333+N+Broadway+%233+Wichita+KS+67214"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-wider text-[#c5a880] hover:text-white transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>

          {/* Map Container */}
          <div className="w-full overflow-hidden border border-white/10 shadow-2xl relative bg-[#111216]">
            <iframe
              title="Aley Way Construction LLC Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.520626601643!2d-97.33851322487736!3d37.70745571603628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87bae38034acc17f%3A0x5a121d189961bf67!2sAley%20Way%20Construction%20LLC!5e0!3m2!1ses!2shn!4v1788820058215!5m2!1ses!2shn"
              width="100%"
              height="450"
              style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[400px] sm:h-[480px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

