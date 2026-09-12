import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { contentService } from '../services/contentService';
import { Project } from '../types';
import { ArrowRight, MapPin, ShieldAlert } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';

export const ProjectsPage: React.FC = () => {
  const [projectList, setProjectList] = useState<Project[]>(() => contentService.getProjects());

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setProjectList(contentService.getProjects());
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Projects | Aley Way Construction"
        description="Explore custom home developments and architectural residences built by Aley Way Construction in Wichita and Valley Center, KS."
        canonicalPath="/projects/"
        breadcrumbs={[{ name: 'Projects', path: '/projects/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Projects' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Residential Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Homes We&rsquo;ve Built.
            </h1>
            <p className="text-base sm:text-lg font-light text-[#8e9099] leading-relaxed">
              Every home reflects the unique lifestyles of the families inside it. Browse our community developments and architectural custom residences across Sedgwick County.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {projectList.map((project, idx) => (
            <div
              key={project.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#111216] border border-white/5 hover:border-[#c5a880]/30 transition-all p-6 sm:p-8 items-center"
            >
              <div className="lg:col-span-7">
                <Link to={`/projects/${project.slug}/`} className="block overflow-hidden aspect-[16/10] bg-[#18191f] group">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#c5a880] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{project.location}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-3">
                    <Link to={`/projects/${project.slug}/`} className="hover:text-[#c5a880] transition-colors">
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#a8a9b0] uppercase tracking-wider mb-4">
                    {project.type}
                  </p>

                  <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5 mb-6">
                    {project.specs.slice(0, 4).map((s) => (
                      <div key={s.label}>
                        <span className="text-[10px] text-[#6e7078] uppercase tracking-wider block">
                          {s.label}
                        </span>
                        <span className="text-xs font-medium text-[#f5f2eb]">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to={`/projects/${project.slug}/`}
                    className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-[#c5a880] hover:text-white transition-colors"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>

                  {!project.hasVerifiedData && (
                    <span className="text-[10px] text-[#555660] italic">
                      Architectural Case Study
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
