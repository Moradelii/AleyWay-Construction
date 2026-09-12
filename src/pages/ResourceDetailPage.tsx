import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { contentService } from '../services/contentService';
import { ResourceArticle } from '../types';
import { Clock, ArrowRight, ArrowLeft, Calendar, Share2, ShieldCheck } from 'lucide-react';
import { FinalCTA } from '../components/sections/FinalCTA';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<ResourceArticle[]>(() => contentService.getPage('resources'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setArticles(contentService.getPage('resources'));
    });
    return () => unsub();
  }, []);

  const article = articles.find((r) => r.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-serif text-4xl text-[#f5f2eb] mb-4">Guide Not Found</h1>
        <p className="text-sm text-[#8e9099] mb-8">The requested construction guide could not be located.</p>
        <Button href="/resources/" variant="primary">Browse All Guides</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title={`${article.title} | Aley Way Construction`}
        description={article.summary}
        canonicalPath={`/resources/${article.slug}/`}
        breadcrumbs={[
          { name: 'Resources', path: '/resources/' },
          { name: article.title, path: `/resources/${article.slug}/` },
        ]}
      />

      <article>
        {/* Header */}
        <header className="py-16 sm:py-24 bg-[#0d0e11] border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <Breadcrumbs
              items={[
                { label: 'Resources', href: '/resources/' },
                { label: article.category },
              ]}
            />

            <div className="mt-6">
              <div className="flex items-center space-x-4 text-xs tracking-wider uppercase text-[#c5a880] mb-4">
                <span>{article.category}</span>
                <span>&bull;</span>
                <div className="flex items-center space-x-1 text-[#8e9099]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
                <span>&bull;</span>
                <span className="text-[#8e9099]">{article.publishedDate}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb] mb-6">
                {article.title}
              </h1>

              <p className="text-lg sm:text-xl font-light text-[#8e9099] leading-relaxed">
                {article.summary}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 -mt-8 sm:-mt-12 mb-16 relative z-10">
          <div className="aspect-[16/9] overflow-hidden border border-white/10 bg-[#121317]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20">
          <div className="prose prose-invert max-w-none text-[#d8d9de] text-base sm:text-lg font-light leading-relaxed space-y-6">
            {(Array.isArray(article.content) ? article.content : article.content.split('\n\n')).map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] font-normal pt-8 pb-2 border-b border-white/10">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] font-normal pt-10 pb-3 border-b border-white/10">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-[#a8a9b0] leading-relaxed font-light">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Byline */}
          <div className="mt-16 p-6 sm:p-8 bg-[#111216] border border-white/10 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#6e7078] block">
                Published by
              </span>
              <span className="text-sm font-medium text-[#f5f2eb]">
                Derek &amp; Xiochil Blades &bull; Aley Way Construction LLC
              </span>
              <p className="text-xs text-[#8e9099] font-light mt-0.5">
                Principal builders in Wichita &amp; Valley Center, KS.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/resources/"
              className="inline-flex items-center text-xs tracking-wider uppercase text-[#c5a880] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to All Guides</span>
            </Link>
          </div>
        </div>
      </article>

      <FinalCTA />
    </div>
  );
};
