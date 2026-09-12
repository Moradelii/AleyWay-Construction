import { projects as defaultProjects } from '../data/projects';
import { resources as defaultResources } from '../data/resources';
import { siteConfig } from '../data/site';
import { Project, ResourceArticle } from '../types';

const CMS_STORAGE_KEY = 'aleyway_cms_content_v1';

export interface HomePageContent {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleItalic: string;
    supportingText: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    bgVideoUrl: string;
    bgPosterUrl: string;
  };
  trustStrip: {
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  brandIntro: {
    eyebrow: string;
    title: string;
    quote: string;
    body1: string;
    body2: string;
    foundersNote: string;
    imageUrl: string;
  };
  customHomesPreview: {
    eyebrow: string;
    title: string;
    description: string;
    card1Title: string;
    card1Text: string;
    card1Image: string;
    card2Title: string;
    card2Text: string;
    card2Image: string;
    card3Title: string;
    card3Text: string;
    card3Image: string;
  };
  openBookPreview: {
    eyebrow: string;
    title: string;
    description: string;
    point1Title: string;
    point1Text: string;
    point2Title: string;
    point2Text: string;
    point3Title: string;
    point3Text: string;
  };
  arborValleyPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
    imageUrl: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonText: string;
    secondaryButtonText: string;
  };
}

export interface CustomHomesPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroImage: string;
  sections: Array<{
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    category?: string;
  }>;
  architecturalStandardsTitle: string;
  architecturalStandardsText: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

export interface ProcessPhase {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  happens: string;
  decide: string;
  handles: string;
  next: string;
  image: string;
}

export interface ProcessPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroBgImage: string;
  phases: ProcessPhase[];
}

export interface GalleryPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  description: string;
  categories: Array<{ id: string; label: string; value: string }>;
}

export interface FounderMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroBgImage: string;
  storyEyebrow: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  founders: FounderMember[];
  values: Array<{ id: string; title: string; description: string }>;
}

export interface ContactFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  enabled: boolean;
  placeholder?: string;
}

export interface ContactPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  streetAddress: string;
  cityStateZip: string;
  officeHours: string;
  directConsultationTitle: string;
  directConsultationText: string;
  formTitle: string;
  formSubtitle: string;
  formFields: ContactFormField[];
}

export interface PricingPillar {
  id: string;
  title: string;
  desc: string;
}

export interface OpenBookPricingPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroImage: string;
  introTitle: string;
  introDescription: string;
  pillars: PricingPillar[];
  auditQuestions: string[];
  fixedFeeExplanation: string;
}

export interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

export interface LegalPageContent {
  title: string;
  eyebrow: string;
  effectiveDate: string;
  summaryBoxText: string;
  sections: LegalSection[];
}

export interface CmsDatabase {
  home: HomePageContent;
  customHomes: CustomHomesPageContent;
  process: ProcessPageContent;
  projects: Project[];
  gallery: GalleryPageContent;
  about: AboutPageContent;
  resources: ResourceArticle[];
  contact: ContactPageContent;
  openBookPricing: OpenBookPricingPageContent;
  privacy: LegalPageContent;
  terms: LegalPageContent;
}

const defaultInitialContent: CmsDatabase = {
  home: {
    hero: {
      eyebrow: 'Custom Home Builder • Wichita & Valley Center, KS',
      titleLine1: "Build a Home That's",
      titleItalic: 'Truly Yours.',
      supportingText: siteConfig.supportingText,
      primaryCtaText: 'Plan Your Home',
      primaryCtaLink: '/contact/',
      secondaryCtaText: 'Explore Our Homes',
      secondaryCtaLink: '/projects/',
      bgVideoUrl: '/video/hero-house.mp4',
      bgPosterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    },
    trustStrip: {
      stat1Number: '100%',
      stat1Label: 'Open-Book Invoicing & Receipts',
      stat2Number: '20+',
      stat2Label: 'Arbor Valley Half-Acre Sites',
      stat3Number: 'Direct',
      stat3Label: 'Principal Oversight & Contact',
      stat4Number: 'Sedgwick',
      stat4Label: 'County Soil-Engineered Builds',
    },
    brandIntro: {
      eyebrow: 'The Aley Way Philosophy',
      title: 'Building Without Secrets.',
      quote: '“We founded Aley Way Construction because custom homebuilding should feel like a trusted partnership, not an adversarial negotiation.”',
      body1: 'Too many homebuilders conceal subcontractor pricing behind opaque allowances and inflated change orders. When selections deviate from a generic catalog, homeowners are handed unexpected surcharges.',
      body2: 'Derek and Xiochil Blades run Aley Way Construction with open-book transparency. You see every subcontractor quote, wholesale material receipt, and trade discount. Our builder fee is fixed and clear upfront.',
      foundersNote: 'Derek & Xiochil Blades — Founders & Principal Builders',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    },
    customHomesPreview: {
      eyebrow: 'Bespoke Residential',
      title: 'Crafted for Kansas Living.',
      description: 'We don’t modify mass-builder plans. We design from a blank canvas to honor natural light, wind patterns, and family lifestyle.',
      card1Title: 'Site & Orientation Planning',
      card1Text: 'Engineered for optimal daylight, natural shade, and Sedgwick County soil characteristics.',
      card1Image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      card2Title: 'Authentic Materials & Millwork',
      card2Text: 'Rift-sawn white oak, native Kansas limestone, standing seam metal accents, and durable high-efficiency envelopes.',
      card2Image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85',
      card3Title: 'Living Flow & Proportions',
      card3Text: 'Sightlines connecting open living pavilions with private retreat wings, drop zones, and sculleries.',
      card3Image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
    },
    openBookPreview: {
      eyebrow: 'Financial Transparency',
      title: 'Open-Book Pricing Explained.',
      description: 'You pay actual subcontractor invoices and wholesale material tickets, plus a transparent builder management fee.',
      point1Title: 'Actual Subcontractor Bids',
      point1Text: 'You review genuine unedited bids from framers, electricians, plumbers, and trim carpenters.',
      point2Title: 'Zero Hidden Markups',
      point2Text: 'Trade volume discounts and supplier rebates are passed 100% through to you.',
      point3Title: 'Transparent Builder Fee',
      point3Text: 'Our compensation is established as an agreed management fee—no conflicting incentives.',
    },
    arborValleyPreview: {
      eyebrow: 'Flagship Enclave',
      title: 'Arbor Valley Enclave.',
      subtitle: 'Valley Center, Kansas • 20+ Half-Acre Homesites',
      description: 'Countryside tranquility paired with seamless Wichita connectivity. Dedicated lots engineered for basements, walkouts, or slab-on-grade foundations.',
      stats: [
        { label: 'Homesites', value: '20+ Custom Lots' },
        { label: 'Lot Size', value: '~0.50 Acre Each' },
        { label: 'Schools', value: 'Valley Center USD 262' },
        { label: 'Pricing', value: 'Open-Book Cost Plus' },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    },
    finalCta: {
      eyebrow: 'Direct Consultation',
      title: 'Ready to Plan Your Custom Home?',
      subtitle: 'Schedule a discovery session directly with Derek and Xiochil Blades to review your land, vision, and open-book budget.',
      buttonText: 'Schedule Consultation',
      secondaryButtonText: 'Explore Arbor Valley',
    },
  },

  customHomes: {
    heroTitle: 'Custom Homes Crafted for How You Truly Live.',
    heroSubtitle: 'Bespoke residential architecture, engineered foundations, and uncompromising craft in Wichita & Valley Center, KS.',
    heroEyebrow: 'Residential Architecture',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    sections: [
      {
        id: 'what-custom-means',
        title: 'What Custom Means',
        tagline: 'Tailored Without Compromise',
        description: 'At Aley Way Construction, custom does not mean modifying three paint colors on a mass-builder plan book. Custom means designing from a blank sheet of trace paper, calibrated around your property’s solar orientation, topography, and the specific daily rhythms of your family.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        category: 'Philosophy',
      },
      {
        id: 'design-space-planning',
        title: 'Design & Space Planning',
        tagline: 'Living Flow, Natural Light & Proportions',
        description: 'We prioritize sightlines that connect indoor living rooms with the open Kansas horizon. Ceilings are dimensioned for volume, windows are positioned for cross-ventilation, and functional zones (sculleries, drop zones, acoustics) are designed intentionally.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        category: 'Architecture',
      },
      {
        id: 'materials-finish',
        title: 'Materials & Finish Quality',
        tagline: 'Authentic Textures Built for Longevity',
        description: 'We favor authentic regional materials: hand-selected native Kansas limestone, rift-sawn white oak millwork, standing-seam metal accents, and commercial-grade waterproof underlayments that withstand Midwest hail and freeze-thaw cycles.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
        category: 'Materials',
      },
      {
        id: 'foundation-integrity',
        title: 'Construction & Foundation Integrity',
        tagline: 'Engineered for Sedgwick County Soils',
        description: 'Kansas clay can cause severe foundation movement if not engineered properly. We perform soil analysis for every homesite, utilizing reinforced poured concrete footings, deep gravel backfills, and robust waterproofing membranes.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=85',
        category: 'Engineering',
      },
      {
        id: 'builder-communication',
        title: 'Direct Builder Communication',
        tagline: 'No Middlemen or Runaround',
        description: 'Derek and Xiochil Blades manage your project directly. You receive weekly photo digests, live schedule updates, and clear approval checkpoints before any trade begins work.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
        category: 'Service',
      },
    ],
    architecturalStandardsTitle: 'Our Architectural Standards',
    architecturalStandardsText: 'Every Aley Way home undergoes rigorous structural engineering, thermodynamic analysis, and trade quality audits before key turnover.',
    ctaTitle: 'Ready to Design Your Home?',
    ctaSubtitle: 'Discuss your lot, layout vision, and budget directly with principals Derek and Xiochil.',
  },

  process: {
    heroTitle: 'A Structured, Transparent Building Journey.',
    heroSubtitle: 'From initial vision and homesite evaluation through design, open-book budgeting, and turnkey handover.',
    heroEyebrow: 'The 8-Phase Methodology',
    heroBgImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2000&q=85',
    phases: [
      {
        id: 'phase-01',
        num: '01',
        title: 'Discovery',
        subtitle: 'Clarifying Your Vision & Parameters',
        happens: 'We sit down with you for an in-depth conversation regarding your lifestyle, functional needs, preferred aesthetic direction, and anticipated total investment.',
        decide: 'Your preferred architectural aesthetic, essential room count, square-footage target, and comfort range for the total build budget.',
        handles: 'Pre-qualification evaluation, budget alignment review, and initial project feasibility assessment in Sedgwick County.',
        next: 'Site evaluation on your land or selecting an available homesite in Arbor Valley.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-02',
        num: '02',
        title: 'Land Evaluation',
        subtitle: 'Analyzing the Ground Underfoot',
        happens: 'We walk your prospective parcel or Arbor Valley lot to evaluate soil conditions, drainage swales, solar angles, utility connections, and building envelope orientation.',
        decide: 'Final selection of homesite, preferred house orientation facing sunrise/sunset, and desired driveway positioning.',
        handles: 'Site visits, zoning setback checks, utility availability coordination, and preliminary foundation type guidance.',
        next: 'Collaborative architectural design and floorplan development.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-03',
        num: '03',
        title: 'Architectural Design',
        subtitle: 'Translating Living Rhythms to Blueprints',
        happens: 'Developing customized 2D floorplans and 3D exterior elevations. We refine proportions, room adjacencies, window placements, and ceiling heights.',
        decide: 'Interior layout flow, kitchen island dimensions, electrical layouts, window package style, and roofline profiles.',
        handles: 'Drafting coordination, structural engineering review, and local municipal building code compliance.',
        next: 'Compiling line-by-line open-book budget estimates.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-04',
        num: '04',
        title: 'Open-Book Budgeting',
        subtitle: 'Real Invoices & Zero Concealed Markups',
        happens: 'We solicit genuine bids from vetted local trade partners (excavation, concrete, framing, MEP, finishes) and compile a comprehensive itemized cost sheet.',
        decide: 'Finish allowances (cabinets, countertops, plumbing fixtures, flooring) and value-engineering trade-offs.',
        handles: 'Subcontractor scoping, volume material pricing discounts passed through to you, and establishing the fixed builder management fee.',
        next: 'Securing construction loan approval and closing.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-05',
        num: '05',
        title: 'Financing & Loan Closing',
        subtitle: 'Establishing the Draw Schedule',
        happens: 'Your lender reviews the itemized budget, specifications, and plans to issue loan commitment. We coordinate closing documents and the draw milestone schedule.',
        decide: 'Selection of lending partner and loan structure (construction-to-permanent vs. standalone).',
        handles: 'Providing line-item specifications, builder licensing verification, insurance certificates, and draw milestone calendars to the bank.',
        next: 'Permitting and physical site excavation.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-06',
        num: '06',
        title: 'Pre-Construction & Permitting',
        subtitle: 'Securing Approvals Before Shovels Move',
        happens: 'Submitting engineering calculations and stamped plan sets to municipal building departments. Finalizing subcontractor trade agreements.',
        decide: 'Final sign-off on construction documents and color selection schedules.',
        handles: 'Building permit procurement, HOA architectural review submissions, utility service orders, and site survey stakes.',
        next: 'Excavation and foundation pour.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-07',
        num: '07',
        title: 'The Build Phase',
        subtitle: 'Craftsmanship in Motion',
        happens: 'From foundation pour and framing to mechanical rough-ins, drywall, and custom millwork installations. Derek Blades personally conducts regular on-site inspections.',
        decide: 'Weekly finish selections, low-voltage walkthrough placement, and fixture approvals.',
        handles: 'Daily trade management, quality control audits, municipal milestone inspections, and weekly photographic digests.',
        next: 'Punch list and final cleaning.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'phase-08',
        num: '08',
        title: 'Punch List & Move-In',
        subtitle: 'Flawless Finish & Key Handover',
        happens: 'Comprehensive room-by-room punch list inspection alongside you. We test every mechanical component and thoroughly detail the home.',
        decide: 'Final approval of cosmetic details, key handover date, and initial warranty walkthrough schedule.',
        handles: 'Certificate of Occupancy procurement, deep professional cleaning, mechanical operation manuals binder, and keys handover.',
        next: 'Enjoying your custom home backed by warranty support.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },

  projects: defaultProjects,

  gallery: {
    heroTitle: 'Architectural Gallery & Field Archive.',
    heroSubtitle: 'A curated visual record of custom craftsmanship, framing tolerances, millwork, and living spaces.',
    heroEyebrow: 'Visual Portfolio',
    description: 'Explore high-resolution photography and jobsite video recordings documenting the construction standards of Aley Way Construction.',
    categories: [
      { id: 'all', label: 'All Details', value: 'all' },
      { id: 'exterior', label: 'Exteriors', value: 'exterior' },
      { id: 'interior', label: 'Interiors', value: 'interior' },
      { id: 'kitchen', label: 'Kitchen & Living', value: 'kitchen' },
      { id: 'craftsmanship', label: 'Craftsmanship & Framing', value: 'craftsmanship' },
    ],
  },

  about: {
    heroTitle: 'Built by People Who Care About the Details.',
    heroSubtitle: 'Aley Way Construction LLC was established on a single foundational premise: homeowners should never feel like an anonymous project number.',
    heroEyebrow: 'Leadership & Ethos',
    heroBgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    storyEyebrow: 'Origin & Foundation',
    storyTitle: 'Our Story.',
    storyParagraph1: 'In the Kansas residential construction market, building a custom home too often degenerates into a frustrating tug-of-war: cryptic allowances, surprise change orders, and layers of sales representatives separating the client from the person actually swinging the hammer.',
    storyParagraph2: 'Derek and Xiochil Blades founded Aley Way Construction LLC to restore trust and clarity to custom homebuilding. By managing an intentional volume of residential builds each year across Wichita, Valley Center, and Sedgwick County, Aley Way ensures that every project receives direct, principal-led leadership from site walk to move-in.',
    storyImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    founders: [
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
    ],
    values: [
      {
        id: 'val-1',
        title: 'Open-Book Transparency',
        description: 'You see actual invoices and trade bids. No concealed builder markups, no surprise fees.',
      },
      {
        id: 'val-2',
        title: 'Principal Leadership',
        description: 'Derek & Xiochil lead every phase directly. You talk to the decision-makers.',
      },
      {
        id: 'val-3',
        title: 'Regional Soil & Structural Integrity',
        description: 'Engineering specifically calibrated for Kansas clay soil, wind shear, and weather cycles.',
      },
    ],
  },

  resources: defaultResources,

  contact: {
    heroTitle: 'Let’s Talk About Your Home.',
    heroSubtitle: 'Every inquiry is reviewed directly by founders Derek and Xiochil Blades. We look forward to exploring your land, architecture, and timeline.',
    heroEyebrow: 'Direct Consultation',
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    email: siteConfig.email,
    streetAddress: siteConfig.address.street,
    cityStateZip: `${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`,
    officeHours: siteConfig.hours,
    directConsultationTitle: 'Direct Consultation Guarantee',
    directConsultationText: 'We do not employ high-pressure sales reps. Your initial conversation is a relaxed, educational discussion directly with Derek or Xiochil Blades.',
    formTitle: 'Project Discovery & Qualification',
    formSubtitle: 'Complete this brief questionnaire to help us prepare for our initial conversation.',
    formFields: [
      { id: 'f-location', name: 'location', label: 'Anticipated Build Location', type: 'text', required: true, enabled: true, placeholder: 'e.g. Valley Center, East Wichita, Butler County' },
      { id: 'f-land', name: 'ownsLand', label: 'Do You Currently Own Land?', type: 'select', required: true, enabled: true },
      { id: 'f-projectType', name: 'projectType', label: 'Project Type', type: 'select', required: true, enabled: true },
      { id: 'f-budget', name: 'investmentRange', label: 'Anticipated Investment Range', type: 'select', required: true, enabled: true },
      { id: 'f-timeline', name: 'timeline', label: 'Target Construction Timeline', type: 'select', required: true, enabled: true },
      { id: 'f-fullName', name: 'fullName', label: 'Full Name', type: 'text', required: true, enabled: true, placeholder: 'Your Name' },
      { id: 'f-email', name: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'you@example.com' },
      { id: 'f-phone', name: 'phone', label: 'Phone Number', type: 'tel', required: true, enabled: true, placeholder: '(316) 000-0000' },
      { id: 'f-description', name: 'projectDescription', label: 'Project Vision / Special Requirements', type: 'textarea', required: false, enabled: true, placeholder: 'Tell us about your home vision, architectural style, or specific needs...' },
    ],
  },

  openBookPricing: {
    heroTitle: 'Open-Book Pricing Explained.',
    heroSubtitle: 'How real-time subcontractor invoices, wholesale materials, and an agreed builder management fee remove the adversarial tension from custom building.',
    heroEyebrow: 'Radical Financial Transparency',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=85',
    introTitle: 'Why Transparent Building Protects Your Budget',
    introDescription: 'Under our open-book model, every subcontract, material invoice, and labor ticket is 100% visible to you. You pay actual hard construction costs plus an agreed, transparent professional builder management fee.',
    pillars: [
      {
        id: 'p-1',
        title: 'What Open Book Pricing Means',
        desc: 'In a traditional lump-sum contract, a builder rolls all trade costs, materials, and profit margins into an opaque single number. Under our open-book model, every subcontract, material invoice, and labor ticket is 100% visible to you.',
      },
      {
        id: 'p-2',
        title: 'What You See',
        desc: 'You receive access to raw, itemized subcontractor quotes (framers, electricians, plumbers, roofers), actual invoices from lumberyards and stone fabricators, and digital tracking of every dollar spent.',
      },
      {
        id: 'p-3',
        title: 'What’s Included',
        desc: 'Full project management, comprehensive site supervision by Derek Blades, selections guidance with Xiochil Blades, municipal permitting coordination, structural engineering reviews, and warranty service.',
      },
      {
        id: 'p-4',
        title: 'Realistic Allowances',
        desc: 'We never insert artificially deflated allowance placeholders simply to make an initial estimate look artificially low. We collaborate with you before contract execution to specify genuine fixtures.',
      },
      {
        id: 'p-5',
        title: 'Transparent Change Orders',
        desc: 'If you choose to alter a finish or modify a room layout during framing, there are no punitive administrative markups. You pay the verified net difference in labor and materials.',
      },
      {
        id: 'p-6',
        title: 'Hard Construction Costs',
        desc: 'All volume pricing rebates and supplier discounts secured through our trade relationships in Sedgwick County are passed directly to you, rather than retained by the builder as silent profit.',
      },
      {
        id: 'p-7',
        title: 'Fixed Builder Management Fee',
        desc: 'Our fee is established upfront as a defined professional fee. This aligns our motivations completely with yours: our goal is to build the highest quality home at the best verified trade price.',
      },
    ],
    auditQuestions: [
      'Can I review the original, unedited subcontractor quotes for major trades (concrete, framing, mechanicals)?',
      'Do you pass through trade discounts and wholesale supplier pricing directly to the client?',
      'How are builder fees calculated—are they a transparent fixed management fee or an undisclosed markup?',
      'What happens if an allowance line-item comes in under budget? Do I receive 100% of the savings?',
      'How are change orders priced during active construction? Are there punitive administrative penalty fees?',
    ],
    fixedFeeExplanation: 'Our compensation is established as an agreed-upon builder fee, not a percentage that increases when you choose higher-end finishes.',
  },

  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Data Governance & Consumer Trust',
    effectiveDate: 'Effective Date: January 1, 2026 • Last Revised: March 2026',
    summaryBoxText: 'At Aley Way Construction LLC, we respect your privacy as a prospective homeowner. We never sell, rent, monetize, or disclose your personal contact information to external lead brokers, third-party marketing networks, or unsolicited telemarketers.',
    sections: [
      {
        id: 'sec-1',
        heading: '1. Information We Collect',
        content: 'We collect personal information directly when you voluntarily engage with our digital consultation funnel, submit inquiries on our website, or communicate directly with our team. This data includes contact identifiers (name, email, phone, mailing address), project specifications (budget range, square footage, room counts, move-in timeline), site & parcel data (land status, location in Sedgwick County), and technical analytics.',
      },
      {
        id: 'sec-2',
        heading: '2. How We Use Your Information',
        content: 'Information provided to Aley Way Construction LLC is utilized strictly for legitimate business purposes associated with custom residential homebuilding: direct project evaluation, site feasibility assessments, initial consultation scheduling with Derek & Xiochil Blades, preliminary open-book cost ranges, and fulfilling municipal permitting and trade partner coordination requirements.',
      },
      {
        id: 'sec-3',
        heading: '3. Telephone, Voice & SMS Communication Consent',
        content: 'By supplying your telephone number through our contact form or qualification questionnaire, you consent to receive direct telephone communications and SMS text messages from principals of Aley Way Construction LLC regarding your homebuilding inquiry. You may opt out at any time by replying STOP.',
      },
      {
        id: 'sec-4',
        heading: '4. Data Security & Storage Architecture',
        content: 'We employ modern organizational, administrative, and technical measures designed to protect your submitted data from unauthorized access, accidental alteration, or disclosure.',
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    eyebrow: 'Legal Terms & Architectural Agreement',
    effectiveDate: 'Effective Date: January 1, 2026 • Last Revised: March 2026',
    summaryBoxText: 'Please read these Terms of Service carefully before utilizing the digital services of Aley Way Construction LLC. By accessing our platform, submitting project inquiries, or engaging with our interactive qualification tools, you acknowledge and agree to comply with the stipulations set forth herein.',
    sections: [
      {
        id: 'sec-1',
        heading: '1. Scope of Digital Services',
        content: 'This website serves as an architectural portfolio, educational resource, and initial digital intake funnel for custom homebuilding clients in Wichita, Valley Center, and Sedgwick County, Kansas. The content provided is designed to inform homeowners about our principal-led philosophy, open-book pricing transparency, building processes, and homesite opportunities.',
      },
      {
        id: 'sec-2',
        heading: '2. Non-Binding Nature of Online Estimates',
        content: 'All cost calculations, pricing tiers, square-footage estimates, timeline projections, and sample line items displayed on this website or generated via our qualification tools are preliminary and informational only. Formal construction commitments are finalized exclusively through a written, bilateral Kansas Residential Construction Agreement.',
      },
      {
        id: 'sec-3',
        heading: '3. Intellectual Property Rights',
        content: 'All architectural designs, floor plans, custom elevations, renderings, video footage, photographs, and written materials displayed on this website are the proprietary property of Aley Way Construction LLC or its licensors.',
      },
      {
        id: 'sec-4',
        heading: '4. Limitation of Liability',
        content: 'To the fullest extent permitted under applicable Kansas state law, Aley Way Construction LLC shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of this digital portal.',
      },
    ],
  },
};

type Subscriber = () => void;
const subscribers: Set<Subscriber> = new Set();

export const contentService = {
  getAll(): CmsDatabase {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (!stored) return defaultInitialContent;
      const parsed = JSON.parse(stored);
      return {
        home: { ...defaultInitialContent.home, ...(parsed.home || {}) },
        customHomes: { ...defaultInitialContent.customHomes, ...(parsed.customHomes || {}) },
        process: { ...defaultInitialContent.process, ...(parsed.process || {}) },
        projects: parsed.projects && parsed.projects.length ? parsed.projects : defaultInitialContent.projects,
        gallery: { ...defaultInitialContent.gallery, ...(parsed.gallery || {}) },
        about: {
          ...defaultInitialContent.about,
          ...(parsed.about || {}),
          founders: (parsed.about?.founders && Array.isArray(parsed.about.founders) && parsed.about.founders.length > 0)
            ? parsed.about.founders.map((f: any, idx: number) => {
                const def = defaultInitialContent.about.founders[idx] || defaultInitialContent.about.founders[0];
                return {
                  id: f.id || def.id,
                  name: f.name || def.name,
                  role: f.role || def.role,
                  bio: f.bio || def.bio,
                  image: f.image || def.image,
                };
              })
            : defaultInitialContent.about.founders,
        },
        resources: parsed.resources && parsed.resources.length ? parsed.resources : defaultInitialContent.resources,
        contact: { ...defaultInitialContent.contact, ...(parsed.contact || {}) },
        openBookPricing: { ...defaultInitialContent.openBookPricing, ...(parsed.openBookPricing || {}) },
        privacy: { ...defaultInitialContent.privacy, ...(parsed.privacy || {}) },
        terms: { ...defaultInitialContent.terms, ...(parsed.terms || {}) },
      };
    } catch {
      return defaultInitialContent;
    }
  },

  saveAll(data: CmsDatabase): void {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage quota limit reached or unavailable during CMS saveAll:', e);
      try {
        // Attempt secondary save after warning
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
      } catch (err2) {
        console.error('Critical storage quota exceeded during saveAll:', err2);
      }
    }
    this.notify();
  },

  getPage<K extends keyof CmsDatabase>(pageKey: K): CmsDatabase[K] {
    const all = this.getAll();
    return all[pageKey];
  },

  updatePage<K extends keyof CmsDatabase>(pageKey: K, update: Partial<CmsDatabase[K]>): void {
    const all = this.getAll();
    all[pageKey] = {
      ...(all[pageKey] as any),
      ...update,
    };
    this.saveAll(all);
  },

  // Projects CRUD
  getProjects(): Project[] {
    return this.getAll().projects;
  },

  getProject(slug: string): Project | undefined {
    return this.getProjects().find((p) => p.slug === slug);
  },

  getProjectBySlug(slug: string): Project | undefined {
    return this.getProject(slug);
  },

  addProject(project: Project): void {
    this.saveProject(project);
  },

  saveProject(project: Project): void {
    const all = this.getAll();
    const index = all.projects.findIndex((p) => p.slug === project.slug);
    if (index >= 0) {
      all.projects[index] = project;
    } else {
      all.projects.push(project);
    }
    this.saveAll(all);
  },

  deleteProject(slug: string): void {
    const all = this.getAll();
    all.projects = all.projects.filter((p) => p.slug !== slug);
    this.saveAll(all);
  },

  // Resources CRUD
  getResources(): ResourceArticle[] {
    return this.getAll().resources;
  },

  getResource(slug: string): ResourceArticle | undefined {
    return this.getResources().find((r) => r.slug === slug);
  },

  addResource(resource: ResourceArticle): void {
    this.saveResource(resource);
  },

  saveResource(resource: ResourceArticle): void {
    const all = this.getAll();
    const index = all.resources.findIndex((r) => r.slug === resource.slug);
    if (index >= 0) {
      all.resources[index] = resource;
    } else {
      all.resources.push(resource);
    }
    this.saveAll(all);
  },

  deleteResource(slug: string): void {
    const all = this.getAll();
    all.resources = all.resources.filter((r) => r.slug !== slug);
    this.saveAll(all);
  },

  // Reset to original blueprint defaults
  resetPage(pageKey: keyof CmsDatabase): void {
    const all = this.getAll();
    (all[pageKey] as any) = JSON.parse(JSON.stringify(defaultInitialContent[pageKey]));
    this.saveAll(all);
  },

  resetAll(): void {
    localStorage.removeItem(CMS_STORAGE_KEY);
    this.notify();
  },

  subscribe(callback: Subscriber): () => void {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  },

  notify(): void {
    subscribers.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Content subscription error', err);
      }
    });
  },
};
