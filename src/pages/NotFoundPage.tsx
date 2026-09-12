import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Button } from '../components/ui/Button';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 bg-[#07080a] text-[#f5f2eb]">
      <SEOHead
        title="Page Not Found | Aley Way Construction"
        description="The architectural page or resource you are looking for has been moved or does not exist."
      />

      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-white/5 border border-white/10 text-[#c5a880] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-3">
          Error 404 &bull; Page Not Found
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#f5f2eb] mb-4">
          Architectural Deviation.
        </h1>

        <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-8">
          The blueprint or page coordinate you requested could not be located. It may have been relocated or updated as our project portfolio expands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>
          <Button href="/projects/" variant="secondary" size="md" className="w-full sm:w-auto">
            <span>Explore Portfolio</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
