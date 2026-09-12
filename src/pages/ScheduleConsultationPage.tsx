import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { LeadQualificationForm } from '../components/forms/LeadQualificationForm';
import { siteConfig } from '../data/site';
import { Phone, Calendar, Clock, CheckCircle } from 'lucide-react';

export const ScheduleConsultationPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Schedule a Custom Home Consultation | Aley Way Construction"
        description="Book your one-on-one custom home consultation with Derek and Xiochil Blades. Discuss land, architectural design, and open-book pricing."
        canonicalPath="/schedule-consultation/"
        breadcrumbs={[{ name: 'Schedule Consultation', path: '/schedule-consultation/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              One-on-One Session
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Schedule Your Consultation.
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-6">
              Share your project vision below, or call our office directly to speak with Derek or Xiochil Blades today.
            </p>

            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center space-x-2 text-sm text-[#c5a880] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Office: {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0b0d]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <LeadQualificationForm />
        </div>
      </section>
    </div>
  );
};
