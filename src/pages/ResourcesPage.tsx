import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { contentService } from '../services/contentService';
import { ResourceArticle } from '../types';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';

export const ResourcesPage: React.FC = () => {
  const [articles, setArticles] = useState<ResourceArticle[]>(() => contentService.getPage('resources'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setArticles(contentService.getPage('resources'));
    });
    return () => unsub();
  }, []);
  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="Custom Home Guides & Resources | Aley Way Construction"
        description="Comprehensive Kansas custom homebuilding guides: land selection in Sedgwick County, building costs in Wichita, foundation comparisons, and open-book pricing."
        canonicalPath="/resources/"
        breadcrumbs={[{ name: 'Resources', path: '/resources/' }]}
      />

      <section className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Resources' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Knowledge &amp; Advisory
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              Guides for Building a Custom Home.
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed">
              Objective, in-depth architectural and construction guides written from decades of hands-on building experience in South Central Kansas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0b0d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col bg-[#111216] border border-white/5 hover:border-[#c5a880]/30 transition-all group overflow-hidden"
              >
                <Link to={`/resources/${article.slug}/`} className="block aspect-[16/10] overflow-hidden bg-[#18191f]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                <div className="p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#8e9099] mb-3">
                      <span className="text-[#c5a880] font-medium">{article.category}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#6e7078]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h2 className="font-serif text-2xl font-normal text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors mb-3 leading-snug">
                      <Link to={`/resources/${article.slug}/`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <Link
                      to={`/resources/${article.slug}/`}
                      className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-[#f5f2eb] group-hover:text-[#c5a880] transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
