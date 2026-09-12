import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Video,
  Plus,
  Edit3,
  Trash2,
  Eye,
  UploadCloud,
  X,
  Check,
  Search,
  Film,
  FolderOpen,
  RotateCcw,
  Play,
  Tag,
  AlertTriangle,
  FileCheck,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { MediaItem, VideoItem } from '../../types';
import { mediaService } from '../../services/mediaService';
import { optimizeImageFile } from '../../services/imageStorage';

type MediaTypeFilter = 'ALL' | 'IMAGE' | 'VIDEO';

interface UnifiedMediaAsset {
  id: string;
  type: 'image' | 'video';
  title: string;
  description: string;
  category: string;
  project?: string;
  src: string;
  poster?: string;
  duration?: string;
  filename: string;
  dateAdded?: string;
}

export const MediaAssetsManager: React.FC = () => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<UnifiedMediaAsset | null>(null);
  const [deletingAsset, setDeletingAsset] = useState<UnifiedMediaAsset | null>(null);
  const [previewAsset, setPreviewAsset] = useState<UnifiedMediaAsset | null>(null);

  // Form states for Add / Edit
  const [formType, setFormType] = useState<'image' | 'video'>('image');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('exterior');
  const [formCustomCategory, setFormCustomCategory] = useState<string>('');
  const [formProject, setFormProject] = useState<string>('');
  const [formDuration, setFormDuration] = useState<string>('');
  const [formMediaSrc, setFormMediaSrc] = useState<string>('');
  const [formPosterSrc, setFormPosterSrc] = useState<string>('');
  const [formFilename, setFormFilename] = useState<string>('');
  const [formFileSize, setFormFileSize] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  // Load media from service
  const loadMedia = () => {
    setImages(mediaService.getImages());
    setVideos(mediaService.getVideos());
  };

  useEffect(() => {
    loadMedia();
    const unsubscribe = mediaService.subscribe(() => {
      loadMedia();
    });
    return () => unsubscribe();
  }, []);

  // Pre-defined categories
  const standardCategories = [
    { value: 'exterior', label: 'Exterior & Fachadas' },
    { value: 'interior', label: 'Interiores & Estilo' },
    { value: 'kitchen', label: 'Cocinas Gourmet' },
    { value: 'living', label: 'Salas & Pavellones' },
    { value: 'framing', label: 'Estructura & Cimientos' },
    { value: 'craftsmanship', label: 'Artesanía & Acabados' },
    { value: 'arbor_valley', label: 'Arbor Valley Community' },
    { value: 'drone_tour', label: 'Tomas Aéreas / Drone' },
    { value: 'walkthrough', label: 'Recorridos Virtuales' },
    { value: 'custom', label: '+ Otra categoría personalizada...' },
  ];

  // Convert images and videos into unified list
  const unifiedAssets: UnifiedMediaAsset[] = [
    ...images.map((img) => ({
      id: img.id,
      type: 'image' as const,
      title: img.alt || img.caption || img.filename,
      description: img.caption || '',
      category: img.category || 'exterior',
      project: img.project || 'Aley Way Project',
      src: img.fallbackUrl || img.url,
      poster: img.fallbackUrl || img.url,
      filename: img.filename,
    })),
    ...videos.map((vid) => ({
      id: vid.id,
      type: 'video' as const,
      title: vid.title,
      description: vid.description,
      category: vid.category || 'walkthrough',
      project: vid.project || 'Valley Center, KS',
      src: vid.videoSrc,
      poster: vid.posterSrc || vid.fallbackPosterUrl || '/images/hero-poster.svg',
      duration: vid.duration || '2:30',
      filename: vid.videoSrc.split('/').pop() || `${vid.id}.mp4`,
    })),
  ];

  // Extract all unique categories present in library
  const availableCategories = Array.from(
    new Set(unifiedAssets.map((a) => a.category.toLowerCase()))
  );

  // Filter assets
  const filteredAssets = unifiedAssets.filter((asset) => {
    // Type filter
    if (typeFilter === 'IMAGE' && asset.type !== 'image') return false;
    if (typeFilter === 'VIDEO' && asset.type !== 'video') return false;

    // Category filter
    if (selectedCategory !== 'ALL' && asset.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asset.title.toLowerCase().includes(q);
      const matchDesc = asset.description.toLowerCase().includes(q);
      const matchCat = asset.category.toLowerCase().includes(q);
      const matchProj = (asset.project || '').toLowerCase().includes(q);
      const matchFile = asset.filename.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat || matchProj || matchFile;
    }

    return true;
  });

  // Handle local file selection (Images & Videos)
  const handleFileProcess = (file: File) => {
    setFormError('');
    const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|ogg|mov)$/i);
    const isImage = file.type.startsWith('image/') || file.name.match(/\.(webp|jpg|jpeg|png|svg|avif|gif)$/i);

    if (!isVideo && !isImage) {
      setFormError('Por favor selecciona un archivo de imagen (PNG, JPG, WEBP, SVG) o video (MP4, WEBM, MOV).');
      return;
    }

    // Set auto type if currently adding
    if (isVideo) {
      setFormType('video');
    } else {
      setFormType('image');
    }

    setFormFilename(file.name);
    // Format file size
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    setFormFileSize(`${sizeInMb} MB`);

    if (!formTitle) {
      // Clean filename for default title
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setFormTitle(cleanName);
    }

    if (isImage) {
      optimizeImageFile(file, 1400, 0.82)
        .then((opt) => {
          setFormMediaSrc(opt.dataUrl);
          setFormPosterSrc(opt.dataUrl);
          setFormFileSize(`${opt.sizeKb} KB (WebP Optimizado)`);
          setFormFilename(opt.filename);
        })
        .catch(() => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setFormMediaSrc(result);
            if (!formPosterSrc) setFormPosterSrc(result);
          };
          reader.readAsDataURL(file);
        });
    } else {
      // Read video file
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormMediaSrc(result);
      };
      reader.onerror = () => {
        const objectUrl = URL.createObjectURL(file);
        setFormMediaSrc(objectUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Open Add Modal
  const openAddModal = (defaultMediaType: 'image' | 'video' = 'image') => {
    setFormType(defaultMediaType);
    setFormTitle('');
    setFormDescription('');
    setFormCategory('exterior');
    setFormCustomCategory('');
    setFormProject('Arbor Valley');
    setFormDuration('2:45');
    setFormMediaSrc('');
    setFormPosterSrc('');
    setFormFilename('');
    setFormFileSize('');
    setFormError('');
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (asset: UnifiedMediaAsset) => {
    setEditingAsset(asset);
    setFormType(asset.type);
    setFormTitle(asset.title);
    setFormDescription(asset.description);
    
    // Check if category is standard or custom
    const isStandard = standardCategories.some((c) => c.value === asset.category.toLowerCase());
    if (isStandard) {
      setFormCategory(asset.category.toLowerCase());
      setFormCustomCategory('');
    } else {
      setFormCategory('custom');
      setFormCustomCategory(asset.category);
    }

    setFormProject(asset.project || '');
    setFormDuration(asset.duration || '2:30');
    setFormMediaSrc(asset.src);
    setFormPosterSrc(asset.poster || '');
    setFormFilename(asset.filename);
    setFormFileSize('');
    setFormError('');
  };

  // Save new media asset
  const handleSaveNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formMediaSrc) {
      setFormError('Es necesario seleccionar o subir un archivo desde tu carpeta local.');
      return;
    }
    if (!formTitle.trim()) {
      setFormError('Por favor ingresa un título para el recurso.');
      return;
    }

    const finalCategory =
      formCategory === 'custom' && formCustomCategory.trim()
        ? formCustomCategory.trim()
        : formCategory;

    if (formType === 'image') {
      mediaService.addImage({
        filename: formFilename || `asset-${Date.now()}.webp`,
        url: formMediaSrc,
        fallbackUrl: formMediaSrc,
        alt: formTitle.trim(),
        caption: formDescription.trim(),
        category: finalCategory,
        project: formProject.trim() || 'Aley Way Custom Project',
        width: 1400,
        height: 933,
        aspectRatio: '3/2',
      });
    } else {
      mediaService.addVideo({
        title: formTitle.trim(),
        description: formDescription.trim(),
        videoSrc: formMediaSrc,
        posterSrc: formPosterSrc || '/images/hero-poster.svg',
        fallbackPosterUrl: formPosterSrc || '/images/hero-poster.svg',
        duration: formDuration.trim() || '2:30',
        category: finalCategory,
        project: formProject.trim() || 'Valley Center, KS',
      });
    }

    setIsAddModalOpen(false);
  };

  // Save edited media asset
  const handleSaveEditAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;

    if (!formTitle.trim()) {
      setFormError('Por favor ingresa un título válido.');
      return;
    }

    const finalCategory =
      formCategory === 'custom' && formCustomCategory.trim()
        ? formCustomCategory.trim()
        : formCategory;

    if (editingAsset.type === 'image') {
      mediaService.updateImage(editingAsset.id, {
        alt: formTitle.trim(),
        caption: formDescription.trim(),
        category: finalCategory,
        project: formProject.trim(),
        url: formMediaSrc,
        fallbackUrl: formMediaSrc,
        filename: formFilename || editingAsset.filename,
      });
    } else {
      mediaService.updateVideo(editingAsset.id, {
        title: formTitle.trim(),
        description: formDescription.trim(),
        category: finalCategory,
        project: formProject.trim(),
        duration: formDuration.trim(),
        videoSrc: formMediaSrc,
        posterSrc: formPosterSrc,
        fallbackPosterUrl: formPosterSrc,
      });
    }

    setEditingAsset(null);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!deletingAsset) return;

    if (deletingAsset.type === 'image') {
      mediaService.deleteImage(deletingAsset.id);
    } else {
      mediaService.deleteVideo(deletingAsset.id);
    }
    setDeletingAsset(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Action Bar */}
      <div className="bg-[#111216] border border-white/10 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#c5a880] mb-1">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>CRM Media Asset Library &bull; Curaduría y Publicación</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#f5f2eb]">
              Gestión de Imágenes y Videos Arquitectónicos
            </h2>
            <p className="text-xs text-[#8e9099] mt-1">
              Administra descripciones, categorías y subidas locales de fotografía y video de obra.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => openAddModal('image')}
              className="px-4 py-2.5 bg-[#c5a880] text-[#0e0f12] text-xs uppercase tracking-wider font-medium hover:bg-[#d8be96] flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Imagen</span>
            </button>

            <button
              onClick={() => openAddModal('video')}
              className="px-4 py-2.5 bg-[#1b1e26] border border-[#c5a880]/40 text-[#c5a880] text-xs uppercase tracking-wider font-medium hover:bg-[#c5a880]/10 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>Agregar Video</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('¿Restaurar la biblioteca predeterminada de fotos y videos de Aley Way?')) {
                  mediaService.resetToDefaults();
                }
              }}
              title="Restaurar recursos originales"
              className="p-2.5 bg-black/40 border border-white/10 text-[#8e9099] hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar: Type tabs, category pills & search */}
        <div className="pt-4 border-t border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Media Type Tabs */}
          <div className="flex items-center space-x-1 bg-black/40 p-1 border border-white/10 rounded-sm">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                typeFilter === 'ALL'
                  ? 'bg-white/10 text-[#f5f2eb] font-medium'
                  : 'text-[#8e9099] hover:text-white'
              }`}
            >
              Todos ({unifiedAssets.length})
            </button>
            <button
              onClick={() => setTypeFilter('IMAGE')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors cursor-pointer ${
                typeFilter === 'IMAGE'
                  ? 'bg-[#c5a880] text-[#0e0f12] font-medium'
                  : 'text-[#8e9099] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Fotos ({images.length})</span>
            </button>
            <button
              onClick={() => setTypeFilter('VIDEO')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors cursor-pointer ${
                typeFilter === 'VIDEO'
                  ? 'bg-[#c5a880] text-[#0e0f12] font-medium'
                  : 'text-[#8e9099] hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos ({videos.length})</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Category Dropdown */}
            <div className="flex items-center space-x-2">
              <Tag className="w-3.5 h-3.5 text-[#8e9099] shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#07080a] border border-white/10 px-3 py-1.5 text-xs text-[#d8d9de] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="ALL">Todas las Categorías</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#6e7078] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por descripción, título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#07080a] border border-white/10 pl-9 pr-3 py-1.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-[#6e7078] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid Display */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 text-center bg-[#111216] border border-white/5 space-y-3">
          <FolderOpen className="w-10 h-10 text-[#6e7078] mx-auto stroke-1" />
          <p className="text-sm text-[#8e9099]">
            No se encontraron recursos multimedia con los filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setTypeFilter('ALL');
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-[#c5a880] underline cursor-pointer"
          >
            Limpiar filtros de búsqueda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#111216] border border-white/10 hover:border-[#c5a880]/50 flex flex-col justify-between transition-all duration-300"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                {asset.type === 'video' ? (
                  <div className="w-full h-full relative">
                    <img
                      src={asset.poster}
                      alt={asset.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setPreviewAsset(asset)}
                        className="w-11 h-11 rounded-full bg-[#c5a880] text-[#0e0f12] flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                        title="Reproducir video"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                    {asset.duration && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[10px] text-white font-mono rounded-sm">
                        {asset.duration}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full relative cursor-pointer" onClick={() => setPreviewAsset(asset)}>
                    <img
                      src={asset.src}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 bg-black/70 text-[#f5f2eb] rounded-full">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Top badges */}
                <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-xs shadow-md ${
                      asset.type === 'video'
                        ? 'bg-[#c5a880] text-[#0e0f12]'
                        : 'bg-black/80 border border-white/20 text-[#f5f2eb]'
                    }`}
                  >
                    {asset.type === 'video' ? 'Video' : 'Imagen'}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 bg-[#0e0f12]/90 border border-[#c5a880]/30 text-[#c5a880] text-[9px] uppercase tracking-wider font-medium">
                    {asset.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-[#6e7078] font-mono">
                    <span className="truncate max-w-[150px]">{asset.filename}</span>
                    {asset.project && <span className="text-[#c5a880]/80">{asset.project}</span>}
                  </div>

                  <h3 className="font-serif text-sm font-medium text-[#f5f2eb] line-clamp-1 group-hover:text-[#c5a880] transition-colors">
                    {asset.title}
                  </h3>

                  {/* Descripción Section */}
                  <div className="bg-[#07080a] p-2.5 border border-white/5 rounded-xs">
                    <span className="text-[9px] uppercase tracking-wider text-[#6e7078] block mb-1">
                      Descripción
                    </span>
                    <p className="text-xs text-[#a8a9b0] font-light line-clamp-2 leading-relaxed">
                      {asset.description || 'Sin descripción asignada.'}
                    </p>
                  </div>
                </div>

                {/* Card Actions: Editar & Borrar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewAsset(asset)}
                    className="text-[11px] text-[#8e9099] hover:text-[#f5f2eb] flex items-center space-x-1 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ver</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(asset)}
                      className="px-2.5 py-1 bg-white/5 hover:bg-[#c5a880]/15 text-[#d8d9de] hover:text-[#c5a880] border border-white/10 hover:border-[#c5a880]/40 text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                      title="Editar descripción y categoría"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => setDeletingAsset(asset)}
                      className="p-1 text-[#8e9099] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer rounded-xs"
                      title="Borrar recurso"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: AGREGAR RECURSO DESDE LOCAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111216] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#8e9099] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs uppercase tracking-wider text-[#c5a880] flex items-center space-x-1.5 mb-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Nuevo Recurso Multimedia</span>
              </div>
              <h3 className="font-serif text-2xl text-[#f5f2eb]">
                Subir desde Carpeta en Local
              </h3>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveNewAsset} className="space-y-5">
              {/* Selector de Tipo (Imagen vs Video) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormType('image')}
                  className={`p-3 border text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    formType === 'image'
                      ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] font-medium'
                      : 'bg-[#07080a] border-white/10 text-[#8e9099] hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Imagen / Fotografía</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormType('video')}
                  className={`p-3 border text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    formType === 'video'
                      ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] font-medium'
                      : 'bg-[#07080a] border-white/10 text-[#8e9099] hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video de Obra</span>
                </button>
              </div>

              {/* Drag and drop local upload zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                  isDragging
                    ? 'border-[#c5a880] bg-[#c5a880]/10'
                    : formMediaSrc
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-white/15 bg-[#07080a] hover:border-white/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={formType === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {formMediaSrc ? (
                  <div className="space-y-3 w-full">
                    <div className="aspect-[16/9] max-h-48 mx-auto overflow-hidden bg-black relative border border-white/10">
                      {formType === 'image' ? (
                        <img
                          src={formMediaSrc}
                          alt="Vista previa"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video
                          src={formMediaSrc}
                          controls
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-xs text-emerald-400">
                      <FileCheck className="w-4 h-4" />
                      <span>{formFilename} ({formFileSize})</span>
                    </div>
                    <p className="text-[11px] text-[#8e9099]">
                      Haz clic o arrastra otro archivo para reemplazar.
                    </p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-[#c5a880] stroke-1" />
                    <div>
                      <span className="text-sm text-[#f5f2eb] font-medium block">
                        Selecciona o arrastra un archivo desde tu carpeta local
                      </span>
                      <span className="text-xs text-[#8e9099] mt-1 block">
                        {formType === 'image'
                          ? 'Formatos compatibles: WEBP, JPG, PNG, SVG, AVIF'
                          : 'Formatos compatibles: MP4, WEBM, MOV'}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#c5a880] inline-block">
                      Explorar archivos del equipo
                    </span>
                  </>
                )}
              </div>

              {/* Ruta / Enlace Directo (URL) */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#c5a880] block">
                  Ruta / Enlace Directo de la Imagen o Video (URL)
                </label>
                <input
                  type="text"
                  placeholder="https://... o ruta generada al subir archivo local"
                  value={formMediaSrc}
                  onChange={(e) => {
                    setFormMediaSrc(e.target.value);
                    if (formType === 'image' && !formPosterSrc) {
                      setFormPosterSrc(e.target.value);
                    }
                  }}
                  className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880] truncate"
                />
                <p className="text-[10px] text-[#8e9099]">
                  Puedes escribir o pegar una URL HTTPS externa, o subir un archivo local arriba.
                </p>
              </div>

              {/* Título & Proyecto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                    Título / Nombre del Recurso *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Fachada Principal Prairie — Lote 12"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                    Proyecto / Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Arbor Valley, Valley Center, KS"
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Categoría Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#8e9099] block">
                  Categoría Arquitectónica *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  >
                    {standardCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  {formCategory === 'custom' && (
                    <input
                      type="text"
                      required
                      placeholder="Escribe el nombre de la categoría..."
                      value={formCustomCategory}
                      onChange={(e) => setFormCustomCategory(e.target.value)}
                      className="bg-[#07080a] border border-[#c5a880] p-2.5 text-xs text-[#f5f2eb] focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Video Specific: Duración y Poster opcional */}
              {formType === 'video' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                      Duración Estimada
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 2:45"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                      Imagen Poster / Miniatura (Opcional)
                    </label>
                    <button
                      type="button"
                      onClick={() => posterInputRef.current?.click()}
                      className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#c5a880] text-left hover:border-[#c5a880] truncate cursor-pointer"
                    >
                      {formPosterSrc ? 'Miniatura local seleccionada ✓' : 'Subir imagen para miniatura...'}
                    </button>
                    <input
                      ref={posterInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setFormPosterSrc(event.target?.result as string);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* Descripción Textarea */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                  Descripción Arquitectónica / Caption *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe los detalles constructivos, materiales empleados (ej. roble blanco, revestimientos de cedro, cimentación) o el alcance del proyecto..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#07080a] border border-white/15 p-3 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880] leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 text-xs text-[#8e9099] hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c5a880] text-[#0e0f12] text-xs uppercase tracking-wider font-semibold hover:bg-[#d8be96] cursor-pointer shadow-md"
                >
                  Guardar y Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR RECURSO */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111216] border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setEditingAsset(null)}
              className="absolute top-5 right-5 text-[#8e9099] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs uppercase tracking-wider text-[#c5a880] flex items-center space-x-1.5 mb-1">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Recurso Multimedia</span>
              </div>
              <h3 className="font-serif text-2xl text-[#f5f2eb]">
                Actualizar Información y Categoría
              </h3>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEditAsset} className="space-y-5">
              {/* Preview & File Replacement Option */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#07080a] border border-white/10">
                <div className="w-32 h-20 bg-black shrink-0 overflow-hidden border border-white/10">
                  {editingAsset.type === 'video' ? (
                    <img
                      src={formPosterSrc || editingAsset.poster}
                      alt={formTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={formMediaSrc || editingAsset.src}
                      alt={formTitle}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow text-xs space-y-1 text-center sm:text-left">
                  <span className="text-[#f5f2eb] font-medium block">
                    Archivo actual: {editingAsset.filename}
                  </span>
                  <span className="text-[#8e9099] block">
                    Tipo: {editingAsset.type === 'video' ? 'Video de Obra' : 'Fotografía Arquitectónica'}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#c5a880] hover:underline inline-block pt-1 cursor-pointer"
                  >
                    Reemplazar por archivo local...
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={editingAsset.type === 'video' ? 'video/*' : 'image/*'}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Ruta / Enlace Directo (URL) */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#c5a880] block">
                  Ruta / Enlace Directo (URL)
                </label>
                <input
                  type="text"
                  value={formMediaSrc}
                  onChange={(e) => setFormMediaSrc(e.target.value)}
                  className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880] truncate"
                />
              </div>

              {/* Título & Proyecto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                    Título / Texto Alt *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                    Proyecto / Ubicación
                  </label>
                  <input
                    type="text"
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Categoría Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#8e9099] block">
                  Categoría Arquitectónica *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  >
                    {standardCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  {formCategory === 'custom' && (
                    <input
                      type="text"
                      required
                      placeholder="Nombre de la categoría..."
                      value={formCustomCategory}
                      onChange={(e) => setFormCustomCategory(e.target.value)}
                      className="bg-[#07080a] border border-[#c5a880] p-2.5 text-xs text-[#f5f2eb] focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Video Specific if video */}
              {editingAsset.type === 'video' && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                    Duración (ej. 3:12)
                  </label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              )}

              {/* Descripción Textarea */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9099] block mb-1">
                  Descripción / Caption *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#07080a] border border-white/15 p-3 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880] leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 text-xs text-[#8e9099] hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c5a880] text-[#0e0f12] text-xs uppercase tracking-wider font-semibold hover:bg-[#d8be96] cursor-pointer shadow-md"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR BORRADO */}
      {deletingAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111216] border border-rose-500/30 w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-400">
              <div className="p-2 bg-rose-500/10 rounded-full">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#f5f2eb]">
                ¿Eliminar este recurso?
              </h3>
            </div>

            <p className="text-xs text-[#8e9099] leading-relaxed">
              Estás a punto de borrar permanentemente el archivo{' '}
              <strong className="text-[#f5f2eb] font-medium">&ldquo;{deletingAsset.title}&rdquo;</strong> de la biblioteca multimedia del CRM.
            </p>

            <div className="p-3 bg-[#07080a] border border-white/5 flex items-center space-x-3">
              <div className="w-12 h-12 bg-black shrink-0 overflow-hidden">
                <img
                  src={deletingAsset.poster || deletingAsset.src}
                  alt={deletingAsset.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs truncate">
                <span className="text-[#f5f2eb] block truncate font-medium">{deletingAsset.title}</span>
                <span className="text-[#c5a880] text-[10px] uppercase">{deletingAsset.category}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeletingAsset(null)}
                className="px-4 py-2 bg-white/5 border border-white/10 text-xs text-[#8e9099] hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Confirmar Borrado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VISTA PREVIA FULLSCREEN */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0f13] border border-white/15 w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl relative">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#111216]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-mono">
                  {previewAsset.category} &bull; {previewAsset.type.toUpperCase()}
                </span>
                <h3 className="font-serif text-lg text-[#f5f2eb]">{previewAsset.title}</h3>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="text-[#8e9099] hover:text-white p-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player / Image Viewer */}
            <div className="bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden relative">
              {previewAsset.type === 'video' ? (
                <video
                  src={previewAsset.src}
                  poster={previewAsset.poster}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[60vh] object-contain"
                />
              ) : (
                <img
                  src={previewAsset.src}
                  alt={previewAsset.title}
                  className="w-full h-full max-h-[60vh] object-contain"
                />
              )}
            </div>

            {/* Footer with Description */}
            <div className="p-6 bg-[#111216] border-t border-white/10 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#6e7078] block">
                Descripción Completa
              </span>
              <p className="text-xs text-[#d8d9de] font-light leading-relaxed">
                {previewAsset.description || 'Sin descripción detallada.'}
              </p>
              {previewAsset.project && (
                <div className="text-[11px] text-[#c5a880] pt-1">
                  Ubicación / Proyecto: {previewAsset.project}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
