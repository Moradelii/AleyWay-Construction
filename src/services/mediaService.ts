import { MediaItem, VideoItem } from '../types';
import { galleryItems as defaultGalleryItems } from '../data/gallery';
import { featuredVideos as defaultVideos } from '../data/videos';

const IMAGES_STORAGE_KEY = 'aleyway_crm_images';
const VIDEOS_STORAGE_KEY = 'aleyway_crm_videos';

type MediaChangeCallback = () => void;
const subscribers: Set<MediaChangeCallback> = new Set();

function notifySubscribers() {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error('Error notifying media subscriber:', e);
    }
  });
}

export const mediaService = {
  subscribe(callback: MediaChangeCallback): () => void {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  getImages(): MediaItem[] {
    try {
      const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // storage failed
    }
    return [...defaultGalleryItems];
  },

  saveImages(items: MediaItem[]): void {
    try {
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or unavailable for images:', e);
    }
    notifySubscribers();
  },

  addImage(itemData: Omit<MediaItem, 'id'> & { id?: string }): MediaItem {
    const images = this.getImages();
    const id = itemData.id || `img-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem: MediaItem = {
      ...itemData,
      id,
      filename: itemData.filename || `${id}.webp`,
      url: itemData.url,
      fallbackUrl: itemData.fallbackUrl || itemData.url,
      alt: itemData.alt || itemData.caption || 'Aley Way Architectural Media',
      caption: itemData.caption || '',
      category: itemData.category || 'exterior',
      width: itemData.width || 1400,
      height: itemData.height || 933,
      aspectRatio: itemData.aspectRatio || '3/2',
    };

    const updated = [newItem, ...images];
    this.saveImages(updated);
    return newItem;
  },

  updateImage(id: string, updates: Partial<MediaItem>): MediaItem | null {
    const images = this.getImages();
    let updatedItem: MediaItem | null = null;
    const updated = images.map((img) => {
      if (img.id === id) {
        updatedItem = { ...img, ...updates };
        return updatedItem;
      }
      return img;
    });

    if (updatedItem) {
      this.saveImages(updated);
    }
    return updatedItem;
  },

  deleteImage(id: string): boolean {
    const images = this.getImages();
    const filtered = images.filter((img) => img.id !== id);
    if (filtered.length !== images.length) {
      this.saveImages(filtered);
      return true;
    }
    return false;
  },

  getVideos(): VideoItem[] {
    try {
      const stored = localStorage.getItem(VIDEOS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // storage failed
    }
    // Enrich defaults with category if missing
    return defaultVideos.map((v, i) => ({
      ...v,
      category: v.category || (i === 0 ? 'foundation_framing' : i === 1 ? 'finishes_millwork' : 'arbor_valley'),
      project: v.project || 'Valley Center, KS',
    }));
  },

  saveVideos(items: VideoItem[]): void {
    try {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or unavailable for videos:', e);
    }
    notifySubscribers();
  },

  addVideo(videoData: Omit<VideoItem, 'id'> & { id?: string }): VideoItem {
    const videos = this.getVideos();
    const id = videoData.id || `vid-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newVideo: VideoItem = {
      ...videoData,
      id,
      title: videoData.title || 'Aley Way Field Video',
      description: videoData.description || '',
      videoSrc: videoData.videoSrc,
      posterSrc: videoData.posterSrc || '/images/hero-poster.svg',
      fallbackPosterUrl: videoData.fallbackPosterUrl || videoData.posterSrc || '/images/hero-poster.svg',
      duration: videoData.duration || '0:00',
      category: videoData.category || 'construction_process',
      project: videoData.project || 'Wichita / Valley Center',
    };

    const updated = [newVideo, ...videos];
    this.saveVideos(updated);
    return newVideo;
  },

  updateVideo(id: string, updates: Partial<VideoItem>): VideoItem | null {
    const videos = this.getVideos();
    let updatedVideo: VideoItem | null = null;
    const updated = videos.map((vid) => {
      if (vid.id === id) {
        updatedVideo = { ...vid, ...updates };
        return updatedVideo;
      }
      return vid;
    });

    if (updatedVideo) {
      this.saveVideos(updated);
    }
    return updatedVideo;
  },

  deleteVideo(id: string): boolean {
    const videos = this.getVideos();
    const filtered = videos.filter((vid) => vid.id !== id);
    if (filtered.length !== videos.length) {
      this.saveVideos(filtered);
      return true;
    }
    return false;
  },

  resetToDefaults(): void {
    try {
      localStorage.removeItem(IMAGES_STORAGE_KEY);
      localStorage.removeItem(VIDEOS_STORAGE_KEY);
    } catch {
      // ignore
    }
    notifySubscribers();
  },
};
