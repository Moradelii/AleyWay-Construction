# Aley Way Construction LLC — Developer & Maintenance Guide

This document provides a comprehensive operational guide for managing, updating, and extending the digital authority and lead-generation platform for **Aley Way Construction LLC**.

---

## 1. Project Overview & Tech Stack

- **Framework**: React 18+ with TypeScript & Vite
- **Styling**: Tailwind CSS with custom architectural dark theme palette (`#0d0e11`, `#111216`, `#c5a880`, `#f5f2eb`)
- **Animation**: GSAP + ScrollTrigger (cinematic scroll orchestration) & Framer Motion (`motion/react`)
- **Icons**: `lucide-react`
- **Routing**: Client-side SPA routing (`react-router-dom`)
- **SEO & Schema**: Custom `SEOHead` component injecting JSON-LD schema (LocalBusiness, Organization, BreadcrumbList)

---

## 2. Directory Structure

```text
├── public/
│   ├── logo/
│   │   ├── logo.png           <-- High-resolution transparent official logo
│   │   └── logo.svg           <-- Vector source logo
│   ├── video/
│   │   ├── hero-house.mp4     <-- Cinematic hero background video
│   │   ├── video-01.mp4       <-- Featured project showcase video 1
│   │   ├── video-02.mp4       <-- Featured project showcase video 2
│   │   └── video-03.mp4       <-- Featured project showcase video 3
│   └── images/
│       ├── gallery/           <-- 18 high-resolution architectural gallery images
│       └── blueprints/        <-- Floorplans and technical diagrams
├── src/
│   ├── components/
│   │   ├── layout/            <-- Header, Footer, Mobile Navigation
│   │   ├── sections/          <-- Hero, ProcessSection, PricingSection, etc.
│   │   ├── seo/               <-- SEOHead & JSON-LD injectors
│   │   └── ui/                <-- Button, Modal, Lightbox, Breadcrumbs
│   ├── data/
│   │   ├── site.ts            <-- SINGLE SOURCE OF TRUTH (Contact, Address, Socials)
│   │   ├── gallery.ts         <-- Editorial 18-image gallery dataset & metadata
│   │   ├── arborValley.ts     <-- Arbor Valley lot map & spec home models
│   │   └── pricing.ts         <-- Tiered pricing & open-book line-item breakdown
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx      <-- Founder bios & on-site craftsmanship imagery
│   │   ├── ProcessPage.tsx    <-- 9-stage sequence with architectural backgrounds
│   │   ├── ArborValleyPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── ContactPage.tsx    <-- Lead qualification & Google Map embed
│   │   ├── PrivacyPage.tsx    <-- Formal Kansas privacy policy
│   │   └── TermsPage.tsx      <-- Construction agreement disclaimers
│   ├── App.tsx
│   └── main.tsx
└── metadata.json              <-- Platform metadata and capabilities
```

---

## 3. Centralized Site Configuration (`src/data/site.ts`)

All business details, contact information, phone numbers, email addresses, and social media handles are centralized in `src/data/site.ts`. Updating this file updates the entire site consistently:

```typescript
export const siteConfig = {
  name: 'Aley Way Construction LLC',
  legalName: 'Aley Way Construction LLC',
  phone: '316-295-7838',
  email: 'info@aleyway.com',
  address: {
    street: '1333 N Broadway, #3',
    city: 'Wichita',
    state: 'KS',
    zip: '67214',
    country: 'United States',
    full: '1333 N Broadway, #3, Wichita, KS, United States, 67214',
  },
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61558261444350',
    instagram: 'https://www.instagram.com/aleywayconstuction/',
    youtube: 'https://www.youtube.com/@CRSSX569',
  },
  // ...
};
```

---

## 4. Logo & Media Replacement Procedures

### Official Logo
- **File path**: `/public/logo/logo.png`
- Transparent PNG format is used in `/src/components/layout/Header.tsx` and `/src/components/layout/Footer.tsx`.
- Recommended dimension: at least 800px wide with transparent background (`alpha channel`).

### Hero Video & Featured Videos
- **Hero Video**: `/public/video/hero-house.mp4`
- **Featured Videos**: `/public/video/video-01.mp4`, `/public/video/video-02.mp4`, `/public/video/video-03.mp4`
- Video formats should be encoded in standard H.264/AAC MP4 for broad browser and mobile compatibility.

### Process & About Background Imagery
- Background images for the 9-stage sequence are configured in `/src/pages/ProcessPage.tsx` under the `steps` array.
- The featured craftsmanship image on the About page is maintained in `/src/pages/AboutPage.tsx`.

---

## 5. Google Map Configuration

The interactive Google Maps embed is located in `/src/pages/ContactPage.tsx`. To replace or update the map location:
1. Navigate to Google Maps and locate the target address.
2. Click **Share** -> **Embed a map**.
3. Copy the `src` attribute URL and update the `iframe` tag in `/src/pages/ContactPage.tsx`.

---

## 6. Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (binds to port 3000)
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```

---

## 7. Credits & Copyright

- **Copyright**: &copy; 2026 Aley Way Construction LLC. All rights reserved.
- **Digital Production Partner**: [Mora-Grafic's Studio](https://www.mora-grafics-studio.com/)
