import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { projects } from '../../data/projects';
import { Button } from '../ui/Button';

export const FeaturedProjectsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0a0b0d] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
              Homes We&rsquo;ve Built.
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href="/projects/" variant="outline" size="sm" className="group">
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Editorial Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col bg-[#111216] border border-white/5 group hover:border-[#c5a880]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Image Frame with subtle hover zoom */}
              <Link to={`/projects/${project.slug}/`} className="relative overflow-hidden aspect-[4/3] block bg-[#18191f]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-medium bg-black/60 backdrop-blur-md text-[#c5a880] border border-white/15">
                    {project.status === 'available' ? 'Homesites Available' : 'Completed Residence'}
                  </span>
                </div>
              </Link>

              {/* Editorial Meta & Content */}
              <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-[#8e9099] mb-2">
                    <MapPin className="w-3 h-3 text-[#c5a880]" />
                    <span>{project.location}</span>
                    <span>&bull;</span>
                    <span>{project.type}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors mb-3">
                    <Link to={`/projects/${project.slug}/`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}/`}
                    className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  {!project.hasVerifiedData && (
                    <span className="text-[10px] text-[#555660] italic tracking-wider">
                      Design Study
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
