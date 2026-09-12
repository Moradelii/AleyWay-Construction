import { VideoItem } from '../types';

export const featuredVideos: VideoItem[] = [
  {
    id: 'video-01',
    title: 'The Foundation & Framing Process',
    description: 'A cinematic look at structural integrity, soil prep in Sedgwick County, and our engineering standards.',
    videoSrc: '/video/video-01.mp4',
    posterSrc: '/images/video-01-poster.webp',
    fallbackPosterUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    duration: '2:45',
  },
  {
    id: 'video-02',
    title: 'Craftsmanship in Detail: Millwork & Finishes',
    description: 'Exploring custom cabinetry, architectural trim, natural stone installations, and finish selections.',
    videoSrc: '/video/video-02.mp4',
    posterSrc: '/images/video-02-poster.webp',
    fallbackPosterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    duration: '3:12',
  },
  {
    id: 'video-03',
    title: 'Arbor Valley: Community & Site Tour',
    description: 'Walking the half-acre lots and peaceful terrain of our premier custom home community in Valley Center, Kansas.',
    videoSrc: '/video/video-03.mp4',
    posterSrc: '/images/video-03-poster.webp',
    fallbackPosterUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    duration: '4:08',
  },
];
