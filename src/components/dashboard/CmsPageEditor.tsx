import React, { useState, useEffect, useRef } from 'react';
import {
  contentService,
  CmsDatabase,
  ProcessPhase,
  FounderMember,
  ContactFormField,
  PricingPillar,
  LegalSection,
} from '../../services/contentService';
import { Project, ResourceArticle } from '../../types';
import { mediaService } from '../../services/mediaService';
import { optimizeImageFile } from '../../services/imageStorage';
import { CmsImageField } from './CmsImageField';
import {
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  Sliders,
  Layers,
  Sparkles,
  HelpCircle,
  Eye,
  AlertTriangle,
  FolderOpen,
  Copy,
  Check
} from 'lucide-react';

type PageKey =
  | 'home'
  | 'customHomes'
  | 'process'
  | 'projects'
  | 'project-arbor-valley'
  | 'project-cedar-ridge'
  | 'project-prairie-view'
  | 'gallery'
  | 'about'
  | 'resources'
  | 'contact'
  | 'openBookPricing'
  | 'privacy'
  | 'terms';

export interface SectionSaveButtonProps {
  onSave: () => void;
  label?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const SectionSaveButton: React.FC<SectionSaveButtonProps> = ({
  onSave,
  label = 'Guardar',
  className = '',
  size = 'sm',
}) => {
  const [justSaved, setJustSaved] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2400);
  };

  if (justSaved) {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 bg-[#c5a880] text-[#0e0f12] font-semibold uppercase tracking-wider transition-all select-none shadow-sm ${
          size === 'xs'
            ? 'px-2.5 py-1 text-[10px]'
            : size === 'md'
            ? 'px-5 py-2 text-xs'
            : 'px-3.5 py-1.5 text-xs'
        } ${className}`}
      >
        <CheckCircle2 className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>¡Guardado!</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center space-x-1.5 bg-[#c5a880] hover:bg-[#b0936b] text-[#0e0f12] font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 ${
        size === 'xs'
          ? 'px-2.5 py-1 text-[10px]'
          : size === 'md'
          ? 'px-5 py-2 text-xs'
          : 'px-3.5 py-1.5 text-xs'
      } ${className}`}
      title="Guardar cambios de esta sección o elemento"
    >
      <Save className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label}</span>
    </button>
  );
};

export const CmsPageEditor: React.FC = () => {
  const [activePage, setActivePage] = useState<PageKey>('home');
  const [data, setData] = useState<CmsDatabase>(contentService.getAll());
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('arbor-valley');
  const [selectedResourceSlug, setSelectedResourceSlug] = useState<string>('open-book-pricing-explained');

  useEffect(() => {
    const unsub = contentService.subscribe(() => {
      setData(contentService.getAll());
    });
    return () => unsub();
  }, []);

  const handleSave = (pageNameLabel: string) => {
    contentService.saveAll(data);
    setSaveSuccess(`¡${pageNameLabel} guardado correctamente! Los cambios ya están visibles en la web.`);
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const handleResetPage = (pageKey: keyof CmsDatabase, label: string) => {
    if (window.confirm(`¿Estás seguro de restablecer ${label} al contenido original de diseño?`)) {
      contentService.resetPage(pageKey);
      setData(contentService.getAll());
      setSaveSuccess(`${label} restablecido a los valores iniciales.`);
      setTimeout(() => setSaveSuccess(null), 4000);
    }
  };

  // Helper for uploading local image files, optimizing and converting to lightweight base64/WebP
  const handleLocalImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const opt = await optimizeImageFile(file, 1400, 0.82);
      onUploaded(opt.dataUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (typeof uploadEvent.target?.result === 'string') {
          onUploaded(uploadEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Page Selector Bar */}
      <div className="bg-[#111216] border border-white/10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-[#c5a880]" />
              <h2 className="font-serif text-2xl text-[#f5f2eb]">
                Gestor de Contenidos y Páginas (CMS)
              </h2>
            </div>
            <p className="text-xs text-[#8e9099] mt-1">
              Edita textos, imágenes de portada, fondos, listas, especificaciones y formularios en todas las páginas de Aley Way Construction.
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center space-x-2 bg-[#c5a880]/15 border border-[#c5a880] text-[#c5a880] px-4 py-2 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveSuccess}</span>
            </div>
          )}
        </div>

        {/* Page Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: 'home', label: 'Home (Inicio)', path: '/' },
            { id: 'customHomes', label: 'Custom Homes', path: '/custom-homes/' },
            { id: 'process', label: 'Process (8 Fases & Fondos)', path: '/process/' },
            { id: 'projects', label: 'Projects (Todos)', path: '/projects/' },
            { id: 'project-arbor-valley', label: 'Arbor Valley', path: '/projects/arbor-valley/' },
            { id: 'project-cedar-ridge', label: 'Cedar Ridge', path: '/projects/the-cedar-ridge-residence/' },
            { id: 'project-prairie-view', label: 'Prairie View', path: '/projects/the-prairie-view-estate/' },
            { id: 'gallery', label: 'Gallery (Textos)', path: '/gallery/' },
            { id: 'about', label: 'About (Derek & Xiochil)', path: '/about/' },
            { id: 'resources', label: 'Resources (Artículos)', path: '/resources/' },
            { id: 'contact', label: 'Contact (Formulario)', path: '/contact/' },
            { id: 'openBookPricing', label: 'Open-Book Pricing', path: '/open-book-pricing/' },
            { id: 'privacy', label: 'Privacy Policy', path: '/privacy/' },
            { id: 'terms', label: 'Terms of Service', path: '/terms/' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as PageKey)}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                activePage === item.id
                  ? 'bg-[#c5a880] text-[#0e0f12] border-[#c5a880] font-medium shadow-md'
                  : 'bg-black/30 text-[#8e9099] border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          PAGE 1: HOME PAGE EDITOR
         ========================================================================= */}
      {activePage === 'home' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">Página: Home (Inicio)</span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('home', 'Home')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Home')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* Section: Cinematic Hero */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                  1. Hero Principal (Textos e Imagen de Fondo)
                </h3>
                <span className="text-[10px] text-[#8e9099] font-normal">Pantalla de entrada al sitio</span>
              </div>
              <SectionSaveButton onSave={() => handleSave('Hero Principal (Home)')} label="Guardar Hero" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Etiqueta Superior (Eyebrow)</label>
                <input
                  type="text"
                  value={data.home.hero.eyebrow}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, hero: { ...data.home.hero, eyebrow: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Titular Principal (Línea 1)</label>
                <input
                  type="text"
                  value={data.home.hero.titleLine1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, hero: { ...data.home.hero, titleLine1: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Titular Destacado (Cursiva Dorada)</label>
                <input
                  type="text"
                  value={data.home.hero.titleItalic}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, hero: { ...data.home.hero, titleItalic: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#c5a880] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Texto de Botón Principal</label>
                <input
                  type="text"
                  value={data.home.hero.primaryCtaText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, hero: { ...data.home.hero, primaryCtaText: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase">Párrafo Descriptivo de Apoyo</label>
              <textarea
                rows={3}
                value={data.home.hero.supportingText}
                onChange={(e) =>
                  setData({
                    ...data,
                    home: { ...data.home, hero: { ...data.home.hero, supportingText: e.target.value } },
                  })
                }
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            {/* Hero Background Image */}
            <CmsImageField
              label="Poster / Imagen de Portada del Hero (Home)"
              value={data.home.hero.bgPosterUrl}
              onChange={(url) =>
                setData({
                  ...data,
                  home: {
                    ...data.home,
                    hero: { ...data.home.hero, bgPosterUrl: url },
                  },
                })
              }
              onSave={() => handleSave('Hero (Home)')}
              description="Sube una foto arquitectónica desde tu carpeta local o pega un enlace directo. Se optimiza automáticamente."
            />
          </div>

          {/* Section: Brand Intro / Philosophy */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                2. Filosofía y Cita de los Fundadores (Derek &amp; Xiochil)
              </h3>
              <SectionSaveButton onSave={() => handleSave('Filosofía (Home)')} label="Guardar Sección" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título de Sección</label>
                <input
                  type="text"
                  value={data.home.brandIntro.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, brandIntro: { ...data.home.brandIntro, title: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Firma / Crédito</label>
                <input
                  type="text"
                  value={data.home.brandIntro.foundersNote}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, brandIntro: { ...data.home.brandIntro, foundersNote: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase">Cita Destacada (Quote)</label>
              <textarea
                rows={2}
                value={data.home.brandIntro.quote}
                onChange={(e) =>
                  setData({
                    ...data,
                    home: { ...data.home, brandIntro: { ...data.home.brandIntro, quote: e.target.value } },
                  })
                }
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#c5a880] font-serif focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Párrafo 1</label>
                <textarea
                  rows={3}
                  value={data.home.brandIntro.body1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, brandIntro: { ...data.home.brandIntro, body1: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Párrafo 2</label>
                <textarea
                  rows={3}
                  value={data.home.brandIntro.body2}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, brandIntro: { ...data.home.brandIntro, body2: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb] focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            <CmsImageField
              label="Fotografía de la Sección Arquitectónica (Brand Intro)"
              value={data.home.brandIntro.imageUrl}
              onChange={(url) =>
                setData({
                  ...data,
                  home: {
                    ...data.home,
                    brandIntro: { ...data.home.brandIntro, imageUrl: url },
                  },
                })
              }
              onSave={() => handleSave('Filosofía (Home)')}
              description="Fotografía principal del manifiesto de diseño y fundadores en la página de inicio."
            />
          </div>

          {/* Section: Final CTA */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                3. Llamado a la Acción Final (Final CTA)
              </h3>
              <SectionSaveButton onSave={() => handleSave('CTA Final (Home)')} label="Guardar Sección" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título</label>
                <input
                  type="text"
                  value={data.home.finalCta.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, finalCta: { ...data.home.finalCta, title: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Texto de Botón</label>
                <input
                  type="text"
                  value={data.home.finalCta.buttonText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      home: { ...data.home, finalCta: { ...data.home.finalCta, buttonText: e.target.value } },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
              <textarea
                rows={2}
                value={data.home.finalCta.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    home: { ...data.home, finalCta: { ...data.home.finalCta, subtitle: e.target.value } },
                  })
                }
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 2: CUSTOM HOMES PAGE EDITOR
         ========================================================================= */}
      {activePage === 'customHomes' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">Página: Custom Homes</span>
              <a
                href="/custom-homes/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('customHomes', 'Custom Homes')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Custom Homes')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* Hero Header */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Cabecera &amp; Hero
              </h3>
              <SectionSaveButton onSave={() => handleSave('Hero (Custom Homes)')} label="Guardar Hero" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título Principal</label>
                <input
                  type="text"
                  value={data.customHomes.heroTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      customHomes: { ...data.customHomes, heroTitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={data.customHomes.heroSubtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      customHomes: { ...data.customHomes, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <CmsImageField
              label="Imagen Hero de Portada (Custom Homes)"
              value={data.customHomes.heroImage}
              onChange={(url) =>
                setData({
                  ...data,
                  customHomes: { ...data.customHomes, heroImage: url },
                })
              }
              onSave={() => handleSave('Hero (Custom Homes)')}
              description="Imagen de fondo o portada para la página de Construcción Personalizada."
            />
          </div>

          {/* Sections List (Pilares de Custom Homes: Agregar, Editar, Borrar, Imagen local, Guardar) */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Secciones &amp; Pilares de Construcción ({data.customHomes.sections.length})
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newSection = {
                      id: `sec-${Date.now()}`,
                      title: 'Nuevo Pilar Arquitectónico',
                      tagline: 'Descripción Breve',
                      description: 'Detalle de la metodología y materiales de construcción.',
                      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
                      category: 'Arquitectura',
                    };
                    setData({
                      ...data,
                      customHomes: {
                        ...data.customHomes,
                        sections: [...data.customHomes.sections, newSection],
                      },
                    });
                  }}
                  className="px-3 py-1.5 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Sección</span>
                </button>
                <SectionSaveButton onSave={() => handleSave('Pilares (Custom Homes)')} label="Guardar Pilares" />
              </div>
            </div>

            <div className="space-y-6">
              {data.customHomes.sections.map((sec, idx) => (
                <div key={sec.id} className="p-5 bg-black/40 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-[#c5a880]">Pilar #{idx + 1}</span>
                    <div className="flex items-center space-x-3">
                      <SectionSaveButton
                        onSave={() => handleSave(`Pilar #${idx + 1} (${sec.title})`)}
                        label="Guardar Pilar"
                        size="xs"
                      />
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar pilar "${sec.title}"?`)) {
                            setData({
                              ...data,
                              customHomes: {
                                ...data.customHomes,
                                sections: data.customHomes.sections.filter((s) => s.id !== sec.id),
                              },
                            });
                          }
                        }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Borrar</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Título</label>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => {
                          const updated = [...data.customHomes.sections];
                          updated[idx].title = e.target.value;
                          setData({ ...data, customHomes: { ...data.customHomes, sections: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Subtítulo / Tagline</label>
                      <input
                        type="text"
                        value={sec.tagline}
                        onChange={(e) => {
                          const updated = [...data.customHomes.sections];
                          updated[idx].tagline = e.target.value;
                          setData({ ...data, customHomes: { ...data.customHomes, sections: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Categoría</label>
                      <input
                        type="text"
                        value={sec.category || ''}
                        onChange={(e) => {
                          const updated = [...data.customHomes.sections];
                          updated[idx].category = e.target.value;
                          setData({ ...data, customHomes: { ...data.customHomes, sections: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#8e9099] uppercase">Descripción Completa</label>
                    <textarea
                      rows={3}
                      value={sec.description}
                      onChange={(e) => {
                        const updated = [...data.customHomes.sections];
                        updated[idx].description = e.target.value;
                        setData({ ...data, customHomes: { ...data.customHomes, sections: updated } });
                      }}
                      className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                    />
                  </div>

                  {/* Image field with CmsImageField */}
                  <CmsImageField
                    label={`Imagen del Pilar: ${sec.title}`}
                    value={sec.image}
                    onChange={(url) => {
                      const updated = [...data.customHomes.sections];
                      updated[idx].image = url;
                      setData({ ...data, customHomes: { ...data.customHomes, sections: updated } });
                    }}
                    onSave={() => handleSave(`Pilar (${sec.title})`)}
                    description="Fotografía o render arquitectónico para este pilar de diseño."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 3: PROCESS PAGE EDITOR (Textos e imágenes de background)
         ========================================================================= */}
      {activePage === 'process' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Process (8 Fases e Imágenes de Background)
              </span>
              <a
                href="/process/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('process', 'Process')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Process')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* Hero Header & Background Image */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Cabecera &amp; Background del Hero de Proceso
              </h3>
              <SectionSaveButton onSave={() => handleSave('Cabecera (Process)')} label="Guardar Cabecera" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título Principal</label>
                <input
                  type="text"
                  value={data.process.heroTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      process: { ...data.process, heroTitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={data.process.heroSubtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      process: { ...data.process, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <CmsImageField
              label="Imagen de Background del Header (Process)"
              value={data.process.heroBgImage}
              onChange={(url) =>
                setData({
                  ...data,
                  process: { ...data.process, heroBgImage: url },
                })
              }
              onSave={() => handleSave('Cabecera (Process)')}
              description="Fondo arquitectónico con opacidad que enmarca el encabezado de la página de proceso."
            />
          </div>

          {/* 8 Phases List with background images */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                  Fases del Proceso ({data.process.phases.length} Fases)
                </h3>
                <p className="text-xs text-[#8e9099]">
                  Edita títulos, subtítulos, textos de lo que sucede, decisiones, entregables e imagen de fondo para cada fase.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newNum = String(data.process.phases.length + 1).padStart(2, '0');
                    const newPhase: ProcessPhase = {
                      id: `phase-${Date.now()}`,
                      num: newNum,
                      title: `Nueva Fase ${newNum}`,
                      subtitle: 'Descripción breve de la etapa',
                      happens: 'Lo que sucede en esta etapa de obra.',
                      decide: 'Las decisiones clave del propietario.',
                      handles: 'Las tareas técnicas asumidas por Derek y Xiochil.',
                      next: 'Siguiente hito del proyecto.',
                      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                    };
                    setData({
                      ...data,
                      process: {
                        ...data.process,
                        phases: [...data.process.phases, newPhase],
                      },
                    });
                  }}
                  className="px-3 py-1.5 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Fase</span>
                </button>
                <SectionSaveButton onSave={() => handleSave('Fases (Process)')} label="Guardar Fases" />
              </div>
            </div>

            <div className="space-y-6">
              {data.process.phases.map((ph, idx) => (
                <div key={ph.id} className="p-5 bg-black/40 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm px-2 py-0.5 bg-[#c5a880] text-[#0e0f12] font-semibold">
                        {ph.num}
                      </span>
                      <span className="text-sm font-medium text-[#f5f2eb]">{ph.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SectionSaveButton
                        onSave={() => handleSave(`Fase ${ph.num} (${ph.title})`)}
                        label="Guardar Fase"
                        size="xs"
                      />
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar fase ${ph.num} "${ph.title}"?`)) {
                            setData({
                              ...data,
                              process: {
                                ...data.process,
                                phases: data.process.phases.filter((p) => p.id !== ph.id),
                              },
                            });
                          }
                        }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Borrar</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Número</label>
                      <input
                        type="text"
                        value={ph.num}
                        onChange={(e) => {
                          const updated = [...data.process.phases];
                          updated[idx].num = e.target.value;
                          setData({ ...data, process: { ...data.process, phases: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] text-[#8e9099] uppercase">Título de la Fase</label>
                      <input
                        type="text"
                        value={ph.title}
                        onChange={(e) => {
                          const updated = [...data.process.phases];
                          updated[idx].title = e.target.value;
                          setData({ ...data, process: { ...data.process, phases: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#8e9099] uppercase">Subtítulo</label>
                    <input
                      type="text"
                      value={ph.subtitle}
                      onChange={(e) => {
                        const updated = [...data.process.phases];
                        updated[idx].subtitle = e.target.value;
                        setData({ ...data, process: { ...data.process, phases: updated } });
                      }}
                      className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Qué sucede (What Happens)</label>
                      <textarea
                        rows={3}
                        value={ph.happens}
                        onChange={(e) => {
                          const updated = [...data.process.phases];
                          updated[idx].happens = e.target.value;
                          setData({ ...data, process: { ...data.process, phases: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8e9099] uppercase">Lo que tú decides (What You Decide)</label>
                      <textarea
                        rows={3}
                        value={ph.decide}
                        onChange={(e) => {
                          const updated = [...data.process.phases];
                          updated[idx].decide = e.target.value;
                          setData({ ...data, process: { ...data.process, phases: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                      />
                    </div>
                  </div>

                  {/* Phase Background Image with CmsImageField */}
                  <CmsImageField
                    label={`Imagen de Background - ${ph.num}: ${ph.title}`}
                    value={ph.image}
                    onChange={(url) => {
                      const updated = [...data.process.phases];
                      updated[idx].image = url;
                      setData({ ...data, process: { ...data.process, phases: updated } });
                    }}
                    onSave={() => handleSave(`Fase (${ph.num})`)}
                    description="Imagen arquitectónica de fondo representativa de esta fase."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 4: PROJECTS (LISTA GENERAL & CREAR PROYECTO)
         ========================================================================= */}
      {activePage === 'projects' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Projects (Biblioteca Completa)
              </span>
              <a
                href="/projects/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const newProj: Project = {
                    slug: `new-project-${Date.now()}`,
                    title: 'Nuevo Proyecto Residencial',
                    subtitle: 'Modern Kansas Custom Home',
                    location: 'Wichita, Kansas',
                    type: 'Custom Single-Family Home',
                    description: 'Descripción arquitectónica del proyecto y características constructivas.',
                    longDescription: 'Memoria técnica completa sobre la orientación solar, acabados y acabados open-book.',
                    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
                    images: [
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
                    ],
                    specs: [
                      { label: 'Living Space', value: '3,200 Finished Sq Ft' },
                      { label: 'Bedrooms / Baths', value: '4 Beds / 3.5 Baths' },
                      { label: 'Garage', value: '3-Car Attached' },
                    ],
                    highlights: ['Construcción a medida', 'Open-book cost control'],
                    status: 'available',
                    isFeatured: true,
                    hasVerifiedData: false,
                  };
                  contentService.addProject(newProj);
                  setSelectedProjectSlug(newProj.slug);
                  setSaveSuccess(`¡Proyecto "${newProj.title}" creado! Ahora puedes editarlo.`);
                  setTimeout(() => setSaveSuccess(null), 4000);
                }}
                className="px-4 py-1.5 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Proyecto Nuevo</span>
              </button>
              <SectionSaveButton onSave={() => handleSave('Proyectos')} label="Guardar Proyectos" />
            </div>
          </div>

          {/* Projects selector & quick links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects.map((proj) => (
              <div
                key={proj.slug}
                className="p-5 bg-[#111216] border border-white/10 flex flex-col justify-between hover:border-[#c5a880]/50 transition-all space-y-4"
              >
                <div className="aspect-[16/9] bg-black overflow-hidden relative">
                  <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[10px] text-[#c5a880] uppercase tracking-wider font-mono">
                    {proj.slug}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-lg text-[#f5f2eb]">{proj.title}</h4>
                  <p className="text-xs text-[#8e9099] line-clamp-2 mt-1">{proj.description}</p>
                  <div className="flex items-center justify-between text-[11px] mt-2 font-mono">
                    <span className="text-[#c5a880]">{proj.location}</span>
                    <span className="text-[#8e9099] uppercase text-[10px] bg-white/5 px-2 py-0.5">{proj.type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
                  <button
                    onClick={() => {
                      if (proj.slug === 'arbor-valley') setActivePage('project-arbor-valley');
                      else if (proj.slug === 'the-cedar-ridge-residence') setActivePage('project-cedar-ridge');
                      else if (proj.slug === 'the-prairie-view-estate') setActivePage('project-prairie-view');
                      else {
                        setSelectedProjectSlug(proj.slug);
                        setActivePage('project-cedar-ridge'); // uses general project detail editor
                      }
                    }}
                    className="text-xs uppercase tracking-wider text-[#c5a880] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Editar &rarr;</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <SectionSaveButton
                      onSave={() => handleSave(`Proyecto (${proj.title})`)}
                      label="Guardar"
                      size="xs"
                    />
                    <button
                      onClick={() => {
                        if (confirm(`¿Estás seguro de eliminar el proyecto "${proj.title}"?`)) {
                          contentService.deleteProject(proj.slug);
                          setSaveSuccess(`Proyecto eliminado.`);
                          setTimeout(() => setSaveSuccess(null), 3000);
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Eliminar Proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 5, 6, 7: SPECIFIC PROJECTS EDITORS (Arbor Valley, Cedar Ridge, Prairie View)
         ========================================================================= */}
      {(activePage === 'project-arbor-valley' ||
        activePage === 'project-cedar-ridge' ||
        activePage === 'project-prairie-view') && (
        <ProjectIndividualEditor
          slug={
            activePage === 'project-arbor-valley'
              ? 'arbor-valley'
              : activePage === 'project-cedar-ridge'
              ? 'the-cedar-ridge-residence'
              : 'the-prairie-view-estate'
          }
          onSave={() => handleSave('Proyecto')}
          onLocalUpload={handleLocalImageUpload}
        />
      )}

      {/* =========================================================================
          PAGE 8: GALLERY TEXTOS Y CATEGORÍAS
         ========================================================================= */}
      {activePage === 'gallery' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Gallery (Textos, Categorías, Archivo)
              </span>
              <a
                href="/gallery/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('gallery', 'Gallery')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Gallery')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Textos de Portada de la Galería
              </h3>
              <SectionSaveButton onSave={() => handleSave('Portada (Gallery)')} label="Guardar Portada" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título Principal</label>
                <input
                  type="text"
                  value={data.gallery.heroTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      gallery: { ...data.gallery, heroTitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={data.gallery.heroSubtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      gallery: { ...data.gallery, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase">Párrafo Descriptivo</label>
              <textarea
                rows={3}
                value={data.gallery.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    gallery: { ...data.gallery, description: e.target.value },
                  })
                }
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
              />
            </div>
          </div>

          {/* Integrated Gallery Photos Manager */}
          <GalleryPhotosManagerInline />
        </div>
      )}

      {/* =========================================================================
          PAGE 9: ABOUT PAGE (Derek & Xiochil, Historia, Valores)
         ========================================================================= */}
      {activePage === 'about' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: About (Derek &amp; Xiochil Blades)
              </span>
              <a
                href="/about/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('about', 'About')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('About')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* Hero Header & Background Image */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Cabecera &amp; Background del Header
              </h3>
              <SectionSaveButton onSave={() => handleSave('Cabecera (About)')} label="Guardar Cabecera" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título Principal</label>
                <input
                  type="text"
                  value={data.about.heroTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, heroTitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={data.about.heroSubtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <CmsImageField
              label="Imagen de Background del Header (About)"
              value={data.about.heroBgImage}
              onChange={(url) =>
                setData({
                  ...data,
                  about: { ...data.about, heroBgImage: url },
                })
              }
              onSave={() => handleSave('Cabecera (About)')}
              description="Fondo de la portada de la página Sobre Nosotros."
            />
          </div>

          {/* Founders (Derek & Xiochil): Editar textos, biografías y fotos locales */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Perfiles de los Fundadores
              </h3>
              <SectionSaveButton onSave={() => handleSave('Fundadores (About)')} label="Guardar Fundadores" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.about.founders.map((f, idx) => (
                <div key={f.id} className="p-5 bg-black/40 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-[#c5a880]">Fundador #{idx + 1}</span>
                    <SectionSaveButton
                      onSave={() => handleSave(`Perfil (${f.name})`)}
                      label="Guardar Perfil"
                      size="xs"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-16 h-16 rounded-full object-cover border border-[#c5a880]"
                    />
                    <div className="flex-1">
                      <label className="text-[10px] text-[#8e9099] uppercase">Nombre</label>
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => {
                          const updated = [...data.about.founders];
                          updated[idx].name = e.target.value;
                          setData({ ...data, about: { ...data.about, founders: updated } });
                        }}
                        className="w-full bg-[#111216] border border-white/10 p-2 text-sm text-[#f5f2eb] font-serif"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#8e9099] uppercase">Cargo / Rol</label>
                    <input
                      type="text"
                      value={f.role}
                      onChange={(e) => {
                        const updated = [...data.about.founders];
                        updated[idx].role = e.target.value;
                        setData({ ...data, about: { ...data.about, founders: updated } });
                      }}
                      className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#c5a880]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#8e9099] uppercase">Biografía Profesional</label>
                    <textarea
                      rows={4}
                      value={f.bio}
                      onChange={(e) => {
                        const updated = [...data.about.founders];
                        updated[idx].bio = e.target.value;
                        setData({ ...data, about: { ...data.about, founders: updated } });
                      }}
                      className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                    />
                  </div>

                  {/* Photo with CmsImageField */}
                  <CmsImageField
                    label={`Fotografía de Perfil: ${f.name}`}
                    value={f.image}
                    onChange={(url) => {
                      const updated = [...data.about.founders];
                      updated[idx].image = url;
                      setData({ ...data, about: { ...data.about, founders: updated } });
                    }}
                    onSave={() => handleSave(`Perfil (${f.name})`)}
                    previewHeight="h-20 w-20 rounded-full"
                    description="Foto de alta calidad de los fundadores Derek o Xiochil Blades."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 10: RESOURCES / JOURNAL (Agregar, Editar, Borrar artículos)
         ========================================================================= */}
      {activePage === 'resources' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Resources (Artículos &amp; Guías)
              </span>
              <a
                href="/resources/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  const newArt: ResourceArticle = {
                    slug: `article-${Date.now()}`,
                    title: 'Nueva Guía de Construcción Residencial',
                    excerpt: 'Resumen conciso sobre costos, licencias o diseño arquitectónico en Sedgwick County.',
                    summary: 'Resumen de valor técnico para propietarios.',
                    category: 'Building',
                    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=85',
                    readTime: '5 min read',
                    publishedDate: 'March 2026',
                    keyTakeaways: ['Punto clave 1', 'Punto clave 2', 'Punto clave 3'],
                    content: [
                      'Primer párrafo del artículo explicando el contexto de construcción.',
                      'Segundo párrafo detallando las buenas prácticas constructivas.',
                    ],
                  };
                  contentService.addResource(newArt);
                  setSelectedResourceSlug(newArt.slug);
                  setSaveSuccess(`¡Artículo "${newArt.title}" creado!`);
                  setTimeout(() => setSaveSuccess(null), 3000);
                }}
                className="px-4 py-1.5 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Artículo</span>
              </button>
              <SectionSaveButton onSave={() => handleSave('Artículos (Resources)')} label="Guardar Artículos" />
            </div>
          </div>

          <div className="space-y-6">
            {data.resources.map((art, idx) => (
              <div key={art.slug} className="p-6 bg-[#111216] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-[#c5a880] uppercase">{art.category}</span>
                    <span className="text-xs text-[#8e9099]">/{art.slug}/</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SectionSaveButton
                      onSave={() => handleSave(`Artículo (${art.title})`)}
                      label="Guardar Artículo"
                      size="xs"
                    />
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar artículo "${art.title}"?`)) {
                          contentService.deleteResource(art.slug);
                          setSaveSuccess('Artículo eliminado.');
                          setTimeout(() => setSaveSuccess(null), 3000);
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Borrar</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[11px] text-[#8e9099] uppercase">Título del Artículo</label>
                    <input
                      type="text"
                      value={art.title}
                      onChange={(e) => {
                        const updated = [...data.resources];
                        updated[idx].title = e.target.value;
                        contentService.saveResource(updated[idx]);
                      }}
                      className="w-full bg-black/40 border border-white/10 p-2.5 text-sm text-[#f5f2eb]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#8e9099] uppercase">Categoría</label>
                    <input
                      type="text"
                      value={art.category}
                      onChange={(e) => {
                        const updated = [...data.resources];
                        updated[idx].category = e.target.value;
                        contentService.saveResource(updated[idx]);
                      }}
                      className="w-full bg-black/40 border border-white/10 p-2.5 text-sm text-[#f5f2eb]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#8e9099] uppercase">Extracto / Resumen (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={art.excerpt}
                    onChange={(e) => {
                      const updated = [...data.resources];
                      updated[idx].excerpt = e.target.value;
                      contentService.saveResource(updated[idx]);
                    }}
                    className="w-full bg-black/40 border border-white/10 p-2.5 text-xs text-[#f5f2eb]"
                  />
                </div>

                {/* Article Cover Image with CmsImageField */}
                <CmsImageField
                  label={`Imagen de Portada del Artículo: ${art.title}`}
                  value={art.image}
                  onChange={(url) => {
                    const updated = [...data.resources];
                    updated[idx].image = url;
                    contentService.saveResource(updated[idx]);
                    setData({ ...data, resources: updated });
                  }}
                  onSave={() => handleSave(`Artículo (${art.title})`)}
                  description="Fotografía de portada para este artículo del blog o guía de construcción."
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 11: CONTACT & FORMULARIO (Editar Formulario, Teléfono, Oficina)
         ========================================================================= */}
      {activePage === 'contact' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Contact (Editar Formulario y Datos de Contacto)
              </span>
              <a
                href="/contact/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('contact', 'Contact')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Contact')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                1. Información Directa de Contacto
              </h3>
              <SectionSaveButton onSave={() => handleSave('Información de Contacto')} label="Guardar Contacto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Teléfono Directo</label>
                <input
                  type="text"
                  value={data.contact.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, phone: e.target.value, phoneDisplay: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Correo Electrónico</label>
                <input
                  type="text"
                  value={data.contact.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, email: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Horario de Atención</label>
                <input
                  type="text"
                  value={data.contact.officeHours}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, officeHours: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Dirección (Calle)</label>
                <input
                  type="text"
                  value={data.contact.streetAddress}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, streetAddress: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Ciudad, Estado y Código Postal</label>
                <input
                  type="text"
                  value={data.contact.cityStateZip}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contact: { ...data.contact, cityStateZip: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>
          </div>

          {/* Form Configuration (Editar Formulario) */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                2. Configuración de Campos del Formulario de Calificación
              </h3>
              <SectionSaveButton onSave={() => handleSave('Formulario de Contacto')} label="Guardar Formulario" />
            </div>

            <div className="space-y-4">
              {data.contact.formFields.map((field, idx) => (
                <div key={field.id} className="p-4 bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-[#c5a880] uppercase">Campo #{idx + 1}</span>
                      <span className="text-xs text-[#8e9099]">({field.name})</span>
                    </div>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const updated = [...data.contact.formFields];
                        updated[idx].label = e.target.value;
                        setData({ ...data, contact: { ...data.contact, formFields: updated } });
                      }}
                      className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                    />
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <label className="flex items-center space-x-2 text-xs text-[#8e9099] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => {
                          const updated = [...data.contact.formFields];
                          updated[idx].required = e.target.checked;
                          setData({ ...data, contact: { ...data.contact, formFields: updated } });
                        }}
                        className="rounded bg-black border-white/20 text-[#c5a880]"
                      />
                      <span>Obligatorio</span>
                    </label>

                    <label className="flex items-center space-x-2 text-xs text-[#8e9099] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={(e) => {
                          const updated = [...data.contact.formFields];
                          updated[idx].enabled = e.target.checked;
                          setData({ ...data, contact: { ...data.contact, formFields: updated } });
                        }}
                        className="rounded bg-black border-white/20 text-[#c5a880]"
                      />
                      <span>Activo</span>
                    </label>

                    <SectionSaveButton
                      onSave={() => handleSave(`Campo (${field.label})`)}
                      label="Guardar"
                      size="xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 12: OPEN BOOK PRICING
         ========================================================================= */}
      {activePage === 'openBookPricing' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                Página: Open-Book Pricing
              </span>
              <a
                href="/open-book-pricing/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
              >
                <span>Ver página en vivo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleResetPage('openBookPricing', 'Open-Book Pricing')}
                className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
              <button
                onClick={() => handleSave('Open-Book Pricing')}
                className="px-5 py-1.5 text-xs font-medium uppercase bg-[#c5a880] text-[#0e0f12] hover:bg-[#b0936b] flex items-center space-x-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Textos de Cabecera e Introducción
              </h3>
              <SectionSaveButton onSave={() => handleSave('Cabecera (Open-Book Pricing)')} label="Guardar Cabecera" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Título Principal</label>
                <input
                  type="text"
                  value={data.openBookPricing.heroTitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openBookPricing: { ...data.openBookPricing, heroTitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={data.openBookPricing.heroSubtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openBookPricing: { ...data.openBookPricing, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#8e9099] uppercase">Explicación del Honorario Fijo (Fixed Builder Fee)</label>
              <textarea
                rows={3}
                value={data.openBookPricing.fixedFeeExplanation}
                onChange={(e) =>
                  setData({
                    ...data,
                    openBookPricing: { ...data.openBookPricing, fixedFeeExplanation: e.target.value },
                  })
                }
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
              />
            </div>
          </div>

          {/* Pillars List */}
          <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
                Pilares y Cláusulas del Modelo Open-Book ({data.openBookPricing.pillars.length})
              </h3>
              <SectionSaveButton onSave={() => handleSave('Pilares (Open-Book Pricing)')} label="Guardar Pilares" />
            </div>
            <div className="space-y-4">
              {data.openBookPricing.pillars.map((pil, idx) => (
                <div key={pil.id} className="p-4 bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#c5a880] uppercase">Pilar #{idx + 1}</span>
                    <SectionSaveButton
                      onSave={() => handleSave(`Pilar (${pil.title})`)}
                      label="Guardar"
                      size="xs"
                    />
                  </div>
                  <input
                    type="text"
                    value={pil.title}
                    onChange={(e) => {
                      const updated = [...data.openBookPricing.pillars];
                      updated[idx].title = e.target.value;
                      setData({ ...data, openBookPricing: { ...data.openBookPricing, pillars: updated } });
                    }}
                    className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb] font-medium"
                  />
                  <textarea
                    rows={2}
                    value={pil.desc}
                    onChange={(e) => {
                      const updated = [...data.openBookPricing.pillars];
                      updated[idx].desc = e.target.value;
                      setData({ ...data, openBookPricing: { ...data.openBookPricing, pillars: updated } });
                    }}
                    className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 13 & 14: PRIVACY POLICY & TERMS OF SERVICE
         ========================================================================= */}
      {(activePage === 'privacy' || activePage === 'terms') && (
        <LegalPageEditor
          legalType={activePage}
          onSave={() => handleSave(activePage === 'privacy' ? 'Privacy Policy' : 'Terms of Service')}
          onReset={() => handleResetPage(activePage, activePage === 'privacy' ? 'Privacy Policy' : 'Terms')}
        />
      )}

      {/* Floating Bottom Quick-Save Bar for any active CMS page */}
      {activePage !== 'privacy' && activePage !== 'terms' && !activePage.startsWith('project-') && (
        <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between p-4 bg-[#111216]/95 backdrop-blur border border-[#c5a880]/30 shadow-2xl gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="text-xs text-[#d8d9de]">
              Editando página: <strong className="text-[#f5f2eb] capitalize">{activePage.replace('-', ' ')}</strong>. Cada sección y elemento tiene su botón de guardar.
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleResetPage(activePage, activePage)}
              className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
            <SectionSaveButton
              onSave={() => handleSave(activePage)}
              label={`Guardar Todo (${activePage})`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponent for individual project editing (Arbor Valley, Cedar Ridge, Prairie View)
interface ProjectEditorProps {
  slug: string;
  onSave: () => void;
  onLocalUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64Url: string) => void
  ) => void;
}

const ProjectIndividualEditor: React.FC<ProjectEditorProps> = ({ slug, onSave }) => {
  const project = contentService.getProject(slug);
  const [current, setCurrent] = useState<Project | null>(project || null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(contentService.getProject(slug) || null);
  }, [slug]);

  if (!current) {
    return (
      <div className="p-8 bg-[#111216] border border-white/10 text-center">
        <p className="text-sm text-[#8e9099]">Proyecto no encontrado.</p>
      </div>
    );
  }

  const handleUpdate = () => {
    if (current) {
      contentService.saveProject(current);
      onSave();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
            Proyecto: {current.title}
          </span>
          <a
            href={`/projects/${current.slug}/`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
          >
            <span>Ver página en vivo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <SectionSaveButton onSave={handleUpdate} label="Guardar Proyecto" />
        </div>
      </div>

      <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
            Datos Generales del Proyecto
          </h3>
          <SectionSaveButton onSave={handleUpdate} label="Guardar Datos Generales" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Título</label>
            <input
              type="text"
              value={current.title}
              onChange={(e) => setCurrent({ ...current, title: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Subtítulo</label>
            <input
              type="text"
              value={current.subtitle}
              onChange={(e) => setCurrent({ ...current, subtitle: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Ubicación</label>
            <input
              type="text"
              value={current.location}
              onChange={(e) => setCurrent({ ...current, location: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Tipo de Proyecto</label>
            <input
              type="text"
              value={current.type}
              onChange={(e) => setCurrent({ ...current, type: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-[#8e9099] uppercase">Descripción Corta</label>
          <textarea
            rows={2}
            value={current.description}
            onChange={(e) => setCurrent({ ...current, description: e.target.value })}
            className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-[#8e9099] uppercase">Memoria Arquitectónica Larga</label>
          <textarea
            rows={4}
            value={current.longDescription || ''}
            onChange={(e) => setCurrent({ ...current, longDescription: e.target.value })}
            className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
          />
        </div>

        {/* Hero Image Field */}
        <CmsImageField
          label="Imagen Hero de Portada del Proyecto"
          value={current.heroImage}
          onChange={(newUrl) => {
            const updated = { ...current, heroImage: newUrl };
            setCurrent(updated);
            contentService.saveProject(updated);
          }}
          onSave={handleUpdate}
          placeholder="https://... o sube una imagen de portada"
          description="Aparece como portada y fondo principal en la página de este proyecto residencial."
        />

        {/* Gallery Images with Visible Route/URL and Optimized Upload */}
        <div className="pt-6 border-t border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-xs text-[#c5a880] uppercase tracking-wider font-semibold">
                Galería de Fotos del Proyecto ({current.images?.length || 0} imágenes)
              </h4>
              <p className="text-[11px] text-[#8e9099] mt-0.5">
                Agrega nuevas imágenes por URL o subiendo un archivo local optimizado. Cada imagen muestra su ruta exacta.
              </p>
            </div>
            <SectionSaveButton onSave={handleUpdate} label="Guardar Galería" size="sm" />
          </div>

          {/* Form to add a new photo to the gallery */}
          <div className="p-4 bg-black/50 border border-[#c5a880]/30 space-y-3">
            <span className="text-xs uppercase font-medium text-[#f5f2eb] block">
              Agregar Nueva Foto a la Galería
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="https://... escribe o pega la ruta/enlace de la imagen"
                className="flex-1 bg-[#0a0b0e] border border-white/15 p-2.5 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880]"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newGalleryUrl.trim()) return;
                  const updated = {
                    ...current,
                    images: [...(current.images || []), newGalleryUrl.trim()],
                  };
                  setCurrent(updated);
                  contentService.saveProject(updated);
                  setNewGalleryUrl('');
                }}
                disabled={!newGalleryUrl.trim()}
                className="px-4 py-2 bg-[#c5a880] disabled:opacity-40 text-[#0e0f12] text-xs font-semibold uppercase hover:bg-[#b0936b] cursor-pointer whitespace-nowrap"
              >
                Agregar Enlace
              </button>
              <label className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#f5f2eb] font-medium uppercase cursor-pointer flex items-center justify-center space-x-1.5 whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Archivo Local</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const opt = await optimizeImageFile(file, 1400, 0.82);
                      const updated = {
                        ...current,
                        images: [...(current.images || []), opt.dataUrl],
                      };
                      setCurrent(updated);
                      contentService.saveProject(updated);
                    } catch (err) {
                      console.error('Error optimizing image', err);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* List of current gallery images with visible route/enlace fields */}
          <div className="space-y-3">
            {(current.images || []).map((imgUrl, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="w-20 h-16 bg-black border border-white/10 overflow-hidden shrink-0">
                  <img
                    src={imgUrl}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                <div className="flex-1 w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono text-[#c5a880] uppercase">
                      Foto #{i + 1} — Ruta / Enlace de la Imagen:
                    </label>
                    <span className="text-[10px] text-[#8e9099]">
                      {imgUrl.startsWith('data:') ? 'Archivo local optimizado' : 'URL Externa'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => {
                      const updatedImages = [...(current.images || [])];
                      updatedImages[i] = e.target.value;
                      const updated = { ...current, images: updatedImages };
                      setCurrent(updated);
                      contentService.saveProject(updated);
                    }}
                    className="w-full bg-[#07080a] border border-white/15 p-2 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880] truncate"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(imgUrl);
                      setCopiedIndex(i);
                      setTimeout(() => setCopiedIndex(null), 2000);
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 text-xs text-[#d8d9de] border border-white/10"
                    title="Copiar ruta"
                  >
                    {copiedIndex === i ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <label
                    className="p-2 bg-white/5 hover:bg-white/10 text-xs text-[#d8d9de] border border-white/10 cursor-pointer"
                    title="Reemplazar por archivo local"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const opt = await optimizeImageFile(file, 1400, 0.82);
                          const updatedImages = [...(current.images || [])];
                          updatedImages[i] = opt.dataUrl;
                          const updated = { ...current, images: updatedImages };
                          setCurrent(updated);
                          contentService.saveProject(updated);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      const filtered = (current.images || []).filter((_, idx) => idx !== i);
                      const updated = { ...current, images: filtered };
                      setCurrent(updated);
                      contentService.saveProject(updated);
                    }}
                    className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 cursor-pointer"
                    title="Eliminar foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {(current.images || []).length === 0 && (
              <div className="p-6 bg-black/20 border border-white/10 text-center text-xs text-[#8e9099]">
                No hay fotos en la galería de este proyecto. Agrega una arriba.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
        <span className="text-xs text-[#8e9099]">Guarda todos los cambios realizados en este proyecto.</span>
        <SectionSaveButton onSave={handleUpdate} label="Guardar Proyecto Completo" />
      </div>
    </div>
  );
};

// Subcomponent for managing Gallery photos directly within the CMS Page Editor
const GalleryPhotosManagerInline: React.FC = () => {
  const [images, setImages] = useState(mediaService.getImages());
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('exterior');
  const [newUrl, setNewUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const unsub = mediaService.subscribe(() => {
      setImages(mediaService.getImages());
    });
    return () => unsub();
  }, []);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const titleText = newTitle.trim() || 'Foto de Galería Aley Way';
    mediaService.addImage({
      filename: `gallery-${Date.now()}.webp`,
      caption: titleText,
      alt: titleText,
      category: newCategory,
      url: newUrl.trim(),
      fallbackUrl: newUrl.trim(),
    });

    setNewUrl('');
    setNewTitle('');
    setFeedback('¡Foto añadida exitosamente a la galería!');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleUploadLocal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const opt = await optimizeImageFile(file, 1400, 0.82);
      setNewUrl(opt.dataUrl);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      setFeedback(`Archivo cargado y optimizado en formato WebP (${opt.sizeKb} KB). Puedes ver la ruta en el campo.`);
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error(err);
      setFeedback('Error al procesar la imagen local');
    }
  };

  const handleUrlChange = (id: string, url: string) => {
    mediaService.updateImage(id, { url, fallbackUrl: url });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar la foto "${title}"?`)) {
      mediaService.deleteImage(id);
      setFeedback('Foto eliminada de la galería.');
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const categories = [
    { value: 'all', label: 'Todas las Categorías' },
    { value: 'exterior', label: 'Exteriores & Fachadas' },
    { value: 'interior', label: 'Interiores & Detalles' },
    { value: 'kitchen', label: 'Cocinas & Gabinetes' },
    { value: 'living', label: 'Salas & Áreas Sociales' },
    { value: 'bath', label: 'Baños Principales' },
    { value: 'pool', label: 'Piscinas & Terrazas' },
    { value: 'kansas', label: 'Kansas & Entorno' },
  ];

  const filteredImages = filterCategory === 'all'
    ? images
    : images.filter((img) => img.category === filterCategory);

  return (
    <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
            Fotos de la Galería ({images.length} fotos registradas)
          </h3>
          <p className="text-xs text-[#8e9099] mt-0.5">
            Agrega nuevas imágenes por URL o sube archivos locales optimizados. Cada foto muestra su enlace editable.
          </p>
        </div>
        {feedback && (
          <span className="text-xs bg-[#c5a880]/20 border border-[#c5a880]/40 text-[#c5a880] px-3 py-1 animate-fade-in">
            {feedback}
          </span>
        )}
      </div>

      {/* Agregar Nueva Foto */}
      <form onSubmit={handleAddImage} className="p-4 bg-black/60 border border-[#c5a880]/30 space-y-4">
        <span className="text-xs uppercase font-medium text-[#c5a880] block">
          + Agregar Nueva Imagen a la Galería
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] text-[#8e9099] uppercase">Título o Pie de Foto</label>
            <input
              type="text"
              placeholder="Ej: Fachada Oeste Arbor Valley..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[#0a0b0e] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[#8e9099] uppercase">Categoría</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-[#0a0b0e] border border-white/15 p-2.5 text-xs text-[#f5f2eb] focus:outline-none focus:border-[#c5a880]"
            >
              {categories.filter((c) => c.value !== 'all').map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-[#8e9099] uppercase">
            Ruta / Enlace Directo de la Imagen (URL o archivo local)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="https://images.unsplash.com/... o presiona 'Subir Imagen Local'"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1 bg-[#0a0b0e] border border-white/15 p-2.5 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880]"
            />
            <label className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#f5f2eb] font-medium uppercase cursor-pointer flex items-center justify-center space-x-1.5 whitespace-nowrap">
              <Upload className="w-3.5 h-3.5" />
              <span>Subir Imagen Local</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadLocal}
              />
            </label>
            <button
              type="submit"
              disabled={!newUrl.trim()}
              className="px-5 py-2.5 bg-[#c5a880] disabled:opacity-40 text-[#0e0f12] text-xs font-semibold uppercase hover:bg-[#b0936b] cursor-pointer whitespace-nowrap shadow-sm"
            >
              Guardar Foto
            </button>
          </div>
        </div>

        {newUrl && (
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <img
              src={newUrl}
              alt="Vista previa"
              className="w-16 h-12 object-cover border border-white/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="text-xs text-[#8e9099] overflow-hidden">
              <span className="text-[#f5f2eb] block font-medium">Vista previa lista</span>
              <span className="truncate block font-mono text-[11px] max-w-md">
                {newUrl.startsWith('data:') ? 'Archivo local optimizado (WebP)' : newUrl}
              </span>
            </div>
          </div>
        )}
      </form>

      {/* Filtro por Categoría */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="text-xs uppercase text-[#8e9099]">Listado de Imágenes ({filteredImages.length})</span>
        <div className="flex items-center space-x-2">
          <label className="text-[11px] text-[#8e9099]">Filtrar:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-black/40 border border-white/10 px-2 py-1 text-xs text-[#f5f2eb]"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Imágenes con Ruta Visible */}
      <div className="space-y-3">
        {filteredImages.map((img) => {
          const displayTitle = img.caption || img.alt || img.filename || 'Foto de Galería';
          return (
            <div
              key={img.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="w-20 h-16 bg-black border border-white/10 overflow-hidden shrink-0">
                <img
                  src={img.url}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>

              <div className="flex-1 w-full space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f2eb]">
                    {displayTitle}
                  </span>
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-wider bg-[#c5a880]/10 px-2 py-0.5">
                    {img.category || 'general'}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <label className="text-[10px] text-[#8e9099] uppercase font-mono">
                    Ruta / Enlace Directo (URL):
                  </label>
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => handleUrlChange(img.id, e.target.value)}
                    className="w-full bg-[#07080a] border border-white/15 p-2 text-xs text-[#f5f2eb] font-mono focus:outline-none focus:border-[#c5a880] truncate"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(img.url);
                    setCopiedId(img.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 text-xs text-[#d8d9de] border border-white/10 cursor-pointer"
                  title="Copiar enlace"
                >
                  {copiedId === img.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <label
                  className="p-2 bg-white/5 hover:bg-white/10 text-xs text-[#d8d9de] border border-white/10 cursor-pointer"
                  title="Reemplazar por archivo local"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const opt = await optimizeImageFile(file, 1400, 0.82);
                        handleUrlChange(img.id, opt.dataUrl);
                        setFeedback(`Foto "${displayTitle}" actualizada.`);
                        setTimeout(() => setFeedback(null), 2500);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => handleDelete(img.id, displayTitle)}
                  className="p-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 cursor-pointer"
                  title="Eliminar foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredImages.length === 0 && (
          <div className="p-8 bg-black/20 border border-white/10 text-center text-xs text-[#8e9099]">
            No hay imágenes en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
};

// Subcomponent for Privacy Policy and Terms of Service Editor
interface LegalEditorProps {
  legalType: 'privacy' | 'terms';
  onSave: () => void;
  onReset: () => void;
}

const LegalPageEditor: React.FC<LegalEditorProps> = ({ legalType, onSave, onReset }) => {
  const [data, setData] = useState(contentService.getPage(legalType));

  useEffect(() => {
    setData(contentService.getPage(legalType));
  }, [legalType]);

  const handleUpdate = () => {
    contentService.updatePage(legalType, data);
    onSave();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between p-4 bg-[#111216] border border-white/10">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
            {legalType === 'privacy' ? 'Página: Privacy Policy' : 'Página: Terms of Service'}
          </span>
          <a
            href={`/${legalType}/`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#8e9099] hover:text-white inline-flex items-center space-x-1 underline"
          >
            <span>Ver página en vivo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onReset}
            className="px-3 py-1.5 text-xs text-[#8e9099] hover:text-white bg-white/5 border border-white/10 flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>
          <SectionSaveButton onSave={handleUpdate} label="Guardar Cambios" />
        </div>
      </div>

      <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
            Cabecera Legal
          </h3>
          <SectionSaveButton onSave={handleUpdate} label="Guardar Cabecera" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Título del Documento</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#8e9099] uppercase">Fecha de Efectividad</label>
            <input
              type="text"
              value={data.effectiveDate}
              onChange={(e) => setData({ ...data, effectiveDate: e.target.value })}
              className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-[#8e9099] uppercase">Declaración Destacada (Summary Box)</label>
          <textarea
            rows={3}
            value={data.summaryBoxText}
            onChange={(e) => setData({ ...data, summaryBoxText: e.target.value })}
            className="w-full bg-black/40 border border-white/10 p-3 text-sm text-[#f5f2eb]"
          />
        </div>
      </div>

      {/* Legal Clauses / Sections: Agregar, Editar, Borrar */}
      <div className="p-6 bg-[#111216] border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5f2eb]">
            Cláusulas &amp; Secciones ({data.sections.length})
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const newSec: LegalSection = {
                  id: `sec-${Date.now()}`,
                  heading: `${data.sections.length + 1}. Nueva Cláusula Legal`,
                  content: 'Texto legal detallado para esta sección.',
                };
                setData({ ...data, sections: [...data.sections, newSec] });
              }}
              className="px-3 py-1.5 bg-[#c5a880] text-[#0e0f12] text-xs font-medium uppercase flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Cláusula</span>
            </button>
            <SectionSaveButton onSave={handleUpdate} label="Guardar Cláusulas" />
          </div>
        </div>

        <div className="space-y-4">
          {data.sections.map((sec, idx) => (
            <div key={sec.id} className="p-4 bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#c5a880] uppercase">Sección #{idx + 1}</span>
                <div className="flex items-center space-x-2">
                  <SectionSaveButton
                    onSave={handleUpdate}
                    label="Guardar"
                    size="xs"
                  />
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar cláusula "${sec.heading}"?`)) {
                        setData({ ...data, sections: data.sections.filter((s) => s.id !== sec.id) });
                      }
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Borrar</span>
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={sec.heading}
                onChange={(e) => {
                  const updated = [...data.sections];
                  updated[idx].heading = e.target.value;
                  setData({ ...data, sections: updated });
                }}
                className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb] font-medium"
              />

              <textarea
                rows={4}
                value={sec.content}
                onChange={(e) => {
                  const updated = [...data.sections];
                  updated[idx].content = e.target.value;
                  setData({ ...data, sections: updated });
                }}
                className="w-full bg-[#111216] border border-white/10 p-2 text-xs text-[#f5f2eb]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
