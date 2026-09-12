export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { label: 'Custom Homes', href: '/custom-homes/' },
  { label: 'Process', href: '/our-process/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'About', href: '/about/' },
  { label: 'Resources', href: '/resources/' },
];

export const footerNav = {
  build: [
    { label: 'Custom Homes', href: '/custom-homes/' },
    { label: 'Arbor Valley Community', href: '/projects/arbor-valley/' },
    { label: 'Our Process', href: '/our-process/' },
    { label: 'Featured Projects', href: '/projects/' },
    { label: 'Architectural Gallery', href: '/gallery/' },
  ],
  transparency: [
    { label: 'Open Book Pricing', href: '/open-book-pricing/' },
    { label: 'Financing & Loans', href: '/financing/' },
    { label: 'Building Resources', href: '/resources/' },
    { label: 'Homeowner Reviews', href: '/reviews/' },
    { label: 'Frequently Asked Questions', href: '/#faq' },
  ],
  locations: [
    { label: 'Wichita, KS Custom Homes', href: '/service-areas/wichita/' },
    { label: 'Valley Center, KS New Homes', href: '/service-areas/valley-center/' },
    { label: 'Service Areas Overview', href: '/service-areas/' },
    { label: 'Schedule Consultation', href: '/schedule-consultation/' },
    { label: 'Plan Your Home', href: '/contact/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
    { label: 'CRM & Client Portal', href: '/dashboard' },
  ]
};
