import { ServiceArea } from '../types';

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'wichita',
    name: 'Wichita, Kansas',
    county: 'Sedgwick County',
    description: 'Custom residential construction for acreage parcels, infill luxury homesites, and private master-planned enclaves throughout Wichita and its perimeter communities.',
    subdivisions: [
      'East Wichita Perimeter Acreages',
      'West Wichita Estates',
      'Northwest Sedgwick County Acreage',
      'Custom Infill & Private Parcels'
    ],
    featuredProject: 'the-cedar-ridge-residence',
  },
  {
    slug: 'valley-center',
    name: 'Valley Center, Kansas',
    county: 'Sedgwick County',
    description: 'Home of our premier custom neighborhood, Arbor Valley, as well as custom home building on private rural homesteads throughout USD 262.',
    subdivisions: [
      'Arbor Valley Community (Half-Acre Lots)',
      'Valley Center Rural Homesteads',
      'McLaughlin Area Acreages',
      'Private USD 262 Sites'
    ],
    featuredProject: 'arbor-valley',
  },
];
