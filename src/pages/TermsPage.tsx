import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { siteConfig } from '../data/site';
import { contentService } from '../services/contentService';
import { FileText, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('terms'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('terms'));
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Terms of Service | Aley Way Construction LLC"
        description="Terms of service, building disclaimers, and legal conditions governing custom residential construction services by Aley Way Construction LLC in Kansas."
        canonicalPath="/terms/"
        breadcrumbs={[{ name: 'Terms of Service', path: '/terms/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mt-6 mb-2">
            {data.eyebrow || 'Legal Terms & Architectural Agreement'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#f5f2eb]">
            {data.title || 'Terms of Service'}
          </h1>
          <p className="text-xs text-[#8e9099] uppercase tracking-wider mt-3">
            {data.effectiveDate || 'Effective Date: January 1, 2026 • Last Revised: March 2026'}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20 text-[#a8a9b0] text-sm font-light leading-relaxed space-y-12">
        <div className="p-6 bg-[#111216] border border-white/10 text-xs sm:text-sm text-[#d8d9de] flex items-start space-x-4">
          <FileText className="w-6 h-6 text-[#c5a880] shrink-0 mt-0.5" />
          <p>
            {data.summaryBoxText || `Please read these Terms of Service carefully before utilizing the digital services of ${siteConfig.legalName}. By accessing our platform, submitting project inquiries, or engaging with our interactive qualification tools, you acknowledge and agree to comply with the stipulations set forth herein.`}
          </p>
        </div>

        {data.sections && data.sections.length > 0 ? (
          data.sections.map((sec) => (
            <div key={sec.id}>
              <h2 className="font-serif text-2xl text-[#f5f2eb] mb-4">{sec.heading}</h2>
              <div className="whitespace-pre-line text-[#8e9099] space-y-2">
                {sec.content}
              </div>
            </div>
          ))
        ) : null}

        <div className="pt-6 border-t border-white/10">
          <h2 className="font-serif text-2xl text-[#f5f2eb] mb-4">Contact &amp; Legal Notices</h2>
          <p className="mb-6">
            For questions regarding these terms or formal contractual inquiries, please contact our principal office:
          </p>
          <div className="p-6 bg-[#111216] border border-white/10 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center space-x-3 text-[#f5f2eb] font-medium">
              <span>{siteConfig.legalName}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span>{siteConfig.address.full}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
              <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} className="hover:text-[#c5a880] transition-colors">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[#c5a880] transition-colors">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
