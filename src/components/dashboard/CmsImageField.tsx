import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Trash2, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { optimizeImageFile } from '../../services/imageStorage';

interface CmsImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onSave?: () => void;
  placeholder?: string;
  description?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | 'square';
  previewHeight?: string;
}

export const CmsImageField: React.FC<CmsImageFieldProps> = ({
  label,
  value,
  onChange,
  onSave,
  placeholder = 'https://... o pega el enlace directo de la imagen',
  description,
  aspectRatio = '16/9',
  previewHeight = 'h-24 sm:h-28',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localInfo, setLocalInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLocalDataUrl = typeof value === 'string' && value.startsWith('data:image/');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await optimizeImageFile(file, 1400, 0.82);
      onChange(result.dataUrl);
      setLocalInfo(`${result.filename} (${result.sizeKb} KB, ${result.width}x${result.height}px - WebP)`);
    } catch (err) {
      console.error('Error optimizando imagen:', err);
      // Fallback to raw data url if canvas fails
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (typeof uploadEvent.target?.result === 'string') {
          onChange(uploadEvent.target.result);
          setLocalInfo(`${file.name} (cargado local)`);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyLink = () => {
    if (!value) return;
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="space-y-2 pt-2 pb-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs uppercase tracking-wider text-[#c5a880] font-medium flex items-center space-x-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{label}</span>
        </label>
        {description && (
          <span className="text-[11px] text-[#8e9099] font-light">{description}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 p-3 bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
        {/* Preview Thumbnail */}
        <div className={`relative ${previewHeight} w-full sm:w-40 bg-black border border-white/15 shrink-0 overflow-hidden group flex items-center justify-center`}>
          {value ? (
            <>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white bg-black/80 px-2 py-0.5 font-mono">Vista Previa</span>
              </div>
            </>
          ) : (
            <div className="text-center p-2 text-[#8e9099]">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
              <span className="text-[10px] block">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Controls and Route / URL field */}
        <div className="flex-1 w-full space-y-2.5">
          {/* Main URL/Enlace Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#8e9099] uppercase">
                Ruta / Enlace de la Imagen:
              </span>
              {isLocalDataUrl && (
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 font-mono flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{localInfo || '✓ Imagen Local Optimizada'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setLocalInfo(null);
                }}
                placeholder={placeholder}
                className="flex-1 bg-[#0a0b0e] border border-white/15 p-2 text-xs text-[#f5f2eb] font-mono focus:border-[#c5a880] focus:outline-none truncate"
                title={value}
              />

              {value && (
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copiar ruta/enlace de la imagen"
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-xs text-[#8e9099] hover:text-white border border-white/10 cursor-pointer flex items-center space-x-1 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] hidden sm:inline">Copiar</span>
                    </>
                  )}
                </button>
              )}

              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setLocalInfo(null);
                  }}
                  title="Quitar imagen"
                  className="p-2 bg-white/5 hover:bg-red-500/20 text-[#8e9099] hover:text-red-400 border border-white/10 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons: Upload from local file or quick save */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
            <div className="flex items-center gap-2">
              <label
                className={`px-3 py-1.5 bg-[#c5a880] hover:bg-[#b0936b] text-[#0e0f12] text-xs font-medium uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 shadow transition-all ${
                  isUploading ? 'opacity-70 pointer-events-none' : ''
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Optimizando...' : 'Subir desde Archivo Local'}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <span className="text-[11px] text-[#8e9099]">
                o escribe/pega un enlace URL directo (HTTPS)
              </span>
            </div>

            {onSave && (
              <button
                type="button"
                onClick={onSave}
                className="text-[11px] text-[#c5a880] hover:underline uppercase tracking-wider cursor-pointer font-mono"
              >
                Guardar Sección &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
