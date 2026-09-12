import { useEffect } from 'react';
import { siteConfig } from '../../data/site';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemas?: object[];
  breadcrumbs?: Array<{ name: string; path: string }>;
  noIndex?: boolean;
  robotsDirective?: string;
}

export const SEOHead = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/images/gallery/gallery-01.webp',
  schemas = [],
  breadcrumbs,
  noIndex = false,
  robotsDirective,
}: SEOHeadProps) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Robots directive for Section 44 & 62
    const robotsContent = robotsDirective || (noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('robots', robotsContent);

    // 3. Update Canonical link
    const canonicalUrl = `https://aleyway.com${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Structured Data (JSON-LD)
    const existingScripts = document.querySelectorAll('script[data-seo="aleyway-schema"]');
    existingScripts.forEach(s => s.remove());

    const baseOrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
      '@id': 'https://aleyway.com/#organization',
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: 'https://aleyway.com',
      logo: 'https://aleyway.com/logo/logo.svg',
      telephone: siteConfig.phone,
      email: siteConfig.email,
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wichita',
        addressRegion: 'KS',
        postalCode: '67202',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Wichita', containedInPlace: { '@type': 'State', name: 'Kansas' } },
        { '@type': 'City', name: 'Valley Center', containedInPlace: { '@type': 'State', name: 'Kansas' } },
        { '@type': 'AdministrativeArea', name: 'Sedgwick County' }
      ],
      founder: siteConfig.founders.map(f => ({
        '@type': 'Person',
        name: f.name,
        jobTitle: f.role,
      })),
      knowsAbout: [
        'Custom Home Construction',
        'Residential Architecture',
        'Open Book Pricing',
        'Arbor Valley Community Development',
        'Foundation Engineering in Kansas Soils'
      ]
    };

    const allSchemas = [baseOrganizationSchema, ...schemas];

    if (breadcrumbs && breadcrumbs.length > 0) {
      allSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((bc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: bc.name,
          item: `https://aleyway.com${bc.path}`
        }))
      });
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'aleyway-schema');
    script.textContent = JSON.stringify(allSchemas);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, schemas, breadcrumbs]);

  return null;
};
