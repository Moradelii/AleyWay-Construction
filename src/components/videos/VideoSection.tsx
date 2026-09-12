import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { VideoItem } from '../../types';
import { trackEvent } from '../../utils/analytics';

export const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [id: string]: boolean }>({});
  const [isMuted, setIsMuted] = useState<{ [id: string]: boolean }>({
    'video-01': true,
    'video-02': true,
    'video-03': true,
  });
  const videoRefs = useRef<{ [id: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    setVideos(mediaService.getVideos());
    const unsub = mediaService.subscribe(() => {
      setVideos(mediaService.getVideos());
    });
    return () => unsub();
  }, []);

  const togglePlay = (video: VideoItem) => {
    const el = videoRefs.current[video.id];
    if (!el) return;

    if (el.paused) {
      el.play().catch(() => {
        // Autoplay policy or video not yet present
      });
      setIsPlaying((prev) => ({ ...prev, [video.id]: true }));
      setActiveVideoId(video.id);
      trackEvent('video_play', { videoId: video.id, title: video.title });
    } else {
      el.pause();
      setIsPlaying((prev) => ({ ...prev, [video.id]: false }));
    }
  };

  const toggleMute = (id: string) => {
    const el = videoRefs.current[id];
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted((prev) => ({ ...prev, [id]: el.muted }));
  };

  const toggleFullscreen = (id: string) => {
    const el = videoRefs.current[id];
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0e0f12] text-[#f5f2eb] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 pb-8 border-b border-white/10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
            Cinematic Overview
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f5f2eb]">
            See the Work in Motion.
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light text-[#8e9099] leading-relaxed">
            Witness the craftsmanship, structural framing tolerances, and peaceful setting of Arbor Valley in motion.
          </p>
        </div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((item) => {
            const playing = isPlaying[item.id];
            const muted = isMuted[item.id] ?? true;

            return (
              <div
                key={item.id}
                className="flex flex-col bg-[#121317] border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Video container */}
                <div className="relative aspect-video bg-black overflow-hidden group">
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={item.videoSrc}
                    poster={item.fallbackPosterUrl}
                    playsInline
                    muted={muted}
                    loop
                    className="w-full h-full object-cover"
                    onEnded={() => {
                      setIsPlaying((prev) => ({ ...prev, [item.id]: false }));
                      trackEvent('video_complete', { videoId: item.id });
                    }}
                  />

                  {/* Play/Pause overlay */}
                  <div
                    onClick={() => togglePlay(item)}
                    className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      playing ? 'bg-transparent hover:bg-black/40' : 'bg-black/50'
                    }`}
                  >
                    <button
                      aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-[#f5f2eb] text-[#0e0f12] hover:bg-[#c5a880] transition-transform duration-300 transform group-hover:scale-110 shadow-lg cursor-pointer"
                    >
                      {playing ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* On-screen controls bar */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleMute(item.id)}
                        className="p-1.5 text-white/80 hover:text-white transition-colors"
                        aria-label={muted ? 'Unmute video' : 'Mute video'}
                      >
                        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="text-[10px] tracking-wider text-[#a8a9b0] uppercase">
                        {item.duration}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFullscreen(item.id)}
                      className="p-1.5 text-white/80 hover:text-white transition-colors"
                      aria-label="View video in fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-xl font-normal text-[#f5f2eb] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-[#8e9099] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] tracking-wider uppercase text-[#c5a880]">
                    <span>Aley Way Field Production</span>
                    <span className="text-[#6e7078]">HD Video</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
