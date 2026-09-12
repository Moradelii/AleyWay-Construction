/**
 * Aley Way Construction - Image Optimization & Storage Service
 * Handles client-side image compression, local caching, and quota-safe persistence.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  filename: string;
  sizeKb: number;
  width: number;
  height: number;
  format: string;
}

/**
 * Compresses an image file using an HTML5 Canvas to guarantee lightweight
 * storage (typically 40KB - 90KB instead of 5MB - 12MB raw base64).
 * This prevents localStorage QuotaExceededError and keeps the app fast.
 */
export async function optimizeImageFile(
  file: File,
  maxDimension: number = 1400,
  quality: number = 0.82
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src !== 'string') {
        return reject(new Error('Failed to read image file.'));
      }

      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Maintain aspect ratio while bounding to maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not obtain canvas 2D context'));
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg if unsupported
        let format = 'image/webp';
        let dataUrl = canvas.toDataURL(format, quality);

        if (!dataUrl.startsWith('data:image/webp')) {
          format = 'image/jpeg';
          dataUrl = canvas.toDataURL(format, quality);
        }

        // Approximate size in KB
        const head = dataUrl.indexOf(',');
        const sizeBytes = Math.round(((dataUrl.length - head) * 3) / 4);
        const sizeKb = Math.round(sizeBytes / 1024);

        // Clean filename for reference
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9-_]/g, '-')
          .toLowerCase();

        const ext = format === 'image/webp' ? 'webp' : 'jpg';
        const finalFilename = `${cleanName || 'image'}-${Date.now().toString(36)}.${ext}`;

        resolve({
          dataUrl,
          filename: finalFilename,
          sizeKb,
          width,
          height,
          format,
        });
      };

      img.onerror = () => {
        reject(new Error('Could not load image into canvas'));
      };

      img.src = src;
    };

    reader.onerror = () => {
      reject(new Error('Error reading local file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Returns a human-friendly display label for an image path/enlace.
 * If it is a web URL, returns the URL.
 * If it is a base64 data URI, returns a clean descriptive label indicating local image.
 */
export function getDisplayImagePath(url: string, fallbackFilename?: string): string {
  if (!url) return '';
  if (url.startsWith('data:image/')) {
    // Detect type
    const mime = url.substring(5, url.indexOf(';')) || 'image/webp';
    const ext = mime.split('/')[1] || 'img';
    const sizeEstKb = Math.round((url.length * 3) / 4 / 1024);
    return fallbackFilename
      ? `[Archivo Local: ${fallbackFilename} (~${sizeEstKb} KB)]`
      : `[Imagen Local Optimizada: .${ext} (~${sizeEstKb} KB)]`;
  }
  return url;
}
