import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { contentService } from '../services/contentService';
import { Project } from '../types';
import { MapPin, Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // If Arbor Valley, redirect to dedicated arbor-valley page
  if (slug === 'arbor-valley') {
    return <Navigate to="/projects/arbor-valley/" replace />;
  }

  const [project, setProject] = useState<Project | undefined>(() => 
    slug ? contentService.getProjectBySlug(slug) : undefined
  );

  useEffect(() => {
    if (!slug) return;
    const update = () => {
      setProject(contentService.getProjectBySlug(slug));
    };
    update();
    const unsub = contentService.subscribe(update);
    return () => unsub();
  }, [slug]);

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-serif text-4xl text-[#f5f2eb] mb-4">Project Not Found</h1>
        <p className="text-sm text-[#8e9099] mb-8">The requested architectural portfolio piece could not be located.</p>
        <Button href="/projects/" variant="primary">Return to Projects</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title={`${project.title} | Custom Homes | Aley Way Construction`}
        description={project.description}
        canonicalPath={`/projects/${project.slug}/`}
        breadcrumbs={[
          { name: 'Projects', path: '/projects/' },
          { name: project.title, path: `/projects/${project.slug}/` },
        ]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Projects', href: '/projects/' },
              { label: project.title },
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase mb-3">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>{project.location}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-3">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl font-light text-[#c5a880] mb-6">
              {project.subtitle}
            </p>

            <p className="text-base sm:text-lg font-light text-[#8e9099] leading-relaxed mb-8">
              {project.description}
            </p>

            <Button href="/contact/" variant="primary" size="md">
              Inquire About a Similar Build
            </Button>
          </div>
        </div>
      </section>

      {/* Media & Specs */}
      <section className="py-20 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Main Hero Image */}
          <div className="border border-white/10 overflow-hidden aspect-[16/9] mb-16 bg-[#121317]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                Architectural Narrative
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#f5f2eb] mb-6">
                Design &amp; Execution Highlights
              </h2>
              <p className="text-sm sm:text-base font-light text-[#8e9099] leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <div className="space-y-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[#d8d9de]">
                    <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 bg-[#111216] border border-white/10">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c5a880] uppercase block mb-4">
                  Project Specifications
                </span>

                <div className="space-y-4">
                  {project.specs.map((s) => (
                    <div key={s.label} className="border-b border-white/5 pb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                        {s.label}
                      </span>
                      <span className="text-sm font-medium text-[#f5f2eb]">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {!project.hasVerifiedData && (
                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#8e9099] flex items-start space-x-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>Representative architectural design study based on regional custom home specifications.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Secondary Photo Grid */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((img, i) => (
                <div key={i} className="border border-white/10 overflow-hidden aspect-[4/3] bg-[#121317]">
                  <img
                    src={img}
                    alt={`${project.title} detail capture ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
