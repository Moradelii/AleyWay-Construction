import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { siteConfig } from '../data/site';
import { Check, ShieldCheck, HeartHandshake, Compass, HardHat } from 'lucide-react';
import { contentService } from '../services/contentService';

export const AboutPage: React.FC = () => {
  const [data, setData] = useState(() => contentService.getPage('about'));

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getPage('about'));
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <SEOHead
        title="About Aley Way Construction | Derek & Xiochil Blades"
        description="Meet Derek & Xiochil Blades, founders of Aley Way Construction LLC. Personalized custom home building, open-book transparency, and craftsmanship in Wichita & Valley Center, KS."
        canonicalPath="/about/"
        breadcrumbs={[{ name: 'About', path: '/about/' }]}
      />

      {/* Hero Header with subtle background */}
      <section className="relative py-20 sm:py-28 bg-[#0d0e11] border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none scale-105"
          style={{ backgroundImage: `url('${data.storyImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11] via-[#0d0e11]/90 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'About' }]} />

          <div className="max-w-3xl mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              {data.heroEyebrow || 'Leadership & Ethos'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f5f2eb] mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-xl font-light text-[#8e9099] leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story with Image */}
      <section className="py-20 bg-[#0a0b0d] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-2">
                Origin &amp; Foundation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] leading-tight">
                {data.storyTitle}
              </h2>
              <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                {data.storyP1}
              </p>
              <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                {data.storyP2}
              </p>
              <div className="pt-2 text-xs text-[#c5a880] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c5a880]" />
                <span>Headquarters: 1333 N Broadway, #3, Wichita, KS 67214</span>
              </div>
            </div>

            {/* Featured Image in About */}
            <div className="lg:col-span-7">
              <div className="relative group overflow-hidden border border-white/10 shadow-2xl bg-[#111216]">
                <img
                  src={"/images/about/about.png"}
                  alt="Aley Way Construction on-site structural precision and timber framing in Kansas"
                  className="w-full h-80 sm:h-96 object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash.com')) {
                      target.src = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1400&q=85';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#f5f2eb]">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#c5a880] block">
                      
                    </span>
                    <span className="font-medium text-sm">
                      
                    </span>
                  </div>
                  <span className="text-[10px] bg-black/60 px-2.5 py-1 border border-white/10 uppercase tracking-wider text-[#a8a9b0]">
                    Derek and Xiochil Blades
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders: Derek Blades & Xiochil Blades */}
      <section className="py-24 bg-[#0e0f12]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
              Principal Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f2eb]">
              Meet Derek &amp; Xiochil Blades.
            </h2>
            <p className="mt-3 text-sm font-light text-[#8e9099]">
              Co-founders directly guiding on-site craftsmanship and client communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {(data.founders && data.founders.length > 0 ? data.founders : [
              {
                id: 'derek-blades',
                name: 'Derek Blades',
                role: 'Co-Founder & General Contractor',
                bio: 'Directs on-site craftsmanship, construction methodology, trade partner management, structural engineering compliance, and open-book cost control.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
              },
              {
                id: 'xiochil-blades',
                name: 'Xiochil Blades',
                role: 'Co-Founder & Client Experience',
                bio: 'Oversees homeowner collaboration, architectural selections, schedule transparency, finish specification, and client communication.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
              },
            ]).map((founder, idx) => {
              const isDerek = idx === 0 || founder.name.toLowerCase().includes('derek');
              const IconComponent = isDerek ? HardHat : HeartHandshake;
              const defaultFallbackImg = isDerek
                ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85'
                : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85';
              const specialtyBadge = isDerek
                ? 'General Contractor & Field Direction'
                : 'Client Experience & Selections';
              const verificationText = isDerek
                ? 'Verified Principal Bio • Licensed General Contractor'
                : 'Verified Principal Bio • Architectural Selections Lead';

              return (
                <div
                  key={founder.id || `founder-${idx}`}
                  className="bg-[#121317] border border-white/10 hover:border-[#c5a880]/40 transition-colors flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  <div>
                    {/* Founder Portrait Image */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-black/80 border-b border-white/10">
                      <img
                        src={founder.image || defaultFallbackImg}
                        alt={`Fotografía de ${founder.name}`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultFallbackImg;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121317] via-transparent to-transparent opacity-85 pointer-events-none" />
                      
                      {/* Floating Role Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] uppercase font-mono tracking-wider px-3 py-1 bg-black/85 backdrop-blur-sm border border-white/15 text-[#c5a880] shadow-sm">
                          {specialtyBadge}
                        </span>
                      </div>

                      {/* Icon overlay on corner */}
                      <div className="absolute bottom-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#121317]/90 backdrop-blur-sm border border-white/15 text-[#c5a880]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bio and Details */}
                    <div className="p-8">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] mb-1">
                        {founder.name}
                      </h3>
                      <span className="text-xs text-[#c5a880] font-medium tracking-wider uppercase block mb-4">
                        {founder.role}
                      </span>
                      <p className="text-sm font-light text-[#8e9099] leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>
                  </div>

                  {/* Verification Footer */}
                  <div className="px-8 pb-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6e7078]">
                    <span className="italic">{verificationText}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880]/70 font-mono">
                      Aley Way Principal
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Philosophy & Why Aley Way */}
      <section className="py-24 bg-[#0a0b0d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                Core Ethos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-6">
                Our Philosophy.
              </h2>
              <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                We believe that true craftsmanship is impossible without financial honesty. An open-book budget removes the adversarial friction between client and builder, turning what is usually a stressful negotiation into a united partnership focused purely on architectural excellence.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-[#d8d9de]">
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Transparent itemized accounting with zero hidden markups</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Direct builder contact without intermediary project managers</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Intentional build capacity to safeguard jobsite quality</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                The Difference
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f2eb] mb-6">
                Why Aley Way.
              </h2>
              <p className="text-sm font-light text-[#8e9099] leading-relaxed mb-6">
                From developing our premier neighborhood enclaves like Arbor Valley to constructing custom architectural residences on private Kansas acreage, we respect the gravity of building a family home.
              </p>
              <div className="p-6 bg-[#111216] border border-white/10">
                <div className="flex items-center space-x-3 text-sm font-medium text-[#f5f2eb] mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#c5a880]" />
                  <span>Principal Accountability on Every Project</span>
                </div>
                <p className="text-xs text-[#8e9099] font-light leading-relaxed">
                  When you call Aley Way, you speak with Derek or Xiochil. That level of personal responsibility is rare in modern construction, and it is the bedrock of our reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};
