export type LeadScore = 'HOT' | 'QUALIFIED' | 'NURTURE' | 'LOW_PRIORITY';

export interface LeadSubmission {
  id: string;
  createdAt: string;
  location: string;
  ownsLand: 'yes' | 'under_contract' | 'looking' | 'no';
  landDetails?: string;
  projectType: 'custom_home' | 'arbor_valley' | 'acreage_estate' | 'other';
  investmentRange: string;
  timeline: 'immediate' | '1_3_months' | '3_6_months' | '6_12_months' | 'exploring';
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'text';
  projectDescription: string;
  score: LeadScore;
  scoreReasons: string[];
  status: 'new' | 'contacted' | 'consultation_scheduled' | 'proposal' | 'archived' | 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'MEETING_SCHEDULED' | 'PROPOSAL_SENT' | 'WON' | 'LOST' | 'ARCHIVED';
  notes?: string[];
}

export type Lead = LeadSubmission;

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  fallbackUrl: string;
  alt: string;
  caption: string;
  category: 'exterior' | 'interior' | 'kitchen' | 'living' | 'craftsmanship' | 'framing' | 'arbor_valley' | string;
  project?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  isPlaceholder?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  fallbackPosterUrl?: string;
  duration?: string;
  category?: string;
  project?: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  type: string;
  description: string;
  longDescription: string;
  heroImage: string;
  images: string[];
  specs: ProjectSpec[];
  highlights: string[];
  status: 'available' | 'completed' | 'in_development';
  isFeatured?: boolean;
  hasVerifiedData: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  rating?: number;
  year?: string;
  source: string;
  isPlaceholderNote?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string; // AEO direct snippet
  fullAnswer: string;
  category: 'pricing' | 'process' | 'custom_homes' | 'arbor_valley' | 'financing' | 'service_areas';
}

export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  description: string;
  subdivisions: string[];
  featuredProject?: string;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  summary?: string;
  image?: string;
  content: string[] | string;
  category: 'Building' | 'Financing' | 'Design' | 'Land' | 'Wichita' | 'Homeownership';
  readTime: string;
  publishedDate: string;
  relatedSlugs?: string[];
  keyTakeaways?: string[];
}

export type CRMRole = 'Super Admin' | 'Admin' | 'Editor' | 'Sales' | 'Viewer';

export interface CRMUser {
  id: string;
  name: string;
  email: string;
  role: CRMRole;
  avatarUrl?: string;
}
