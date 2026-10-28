export interface ProcessedImageResult {
  blob: Blob;
  width: number;
  height: number;
  blurDataUrl: string;
}

/**
 * Resizes an image file in the browser:
 * - Max 2000px on the longest edge
 * - Converts to WebP format at ~0.82 quality
 * - Reads final width and height
 * - Generates a 16px blur placeholder base64 data URL
 */
export async function processImageForUpload(file: File): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpe?g|png|webp)$/i)) {
      return reject(new Error('Supported image formats are JPEG, PNG, and WebP.'));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        if (naturalWidth === 0 || naturalHeight === 0) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error('Invalid image dimensions.'));
        }

        // 1. Calculate resized dimensions (max 2000px long edge)
        const maxEdge = Math.max(naturalWidth, naturalHeight);
        const scale = maxEdge > 2000 ? 2000 / maxEdge : 1;
        const targetWidth = Math.round(naturalWidth * scale);
        const targetHeight = Math.round(naturalHeight * scale);

        // 2. Draw resized image onto canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error('Canvas 2D context is not available.'));
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // 3. Create 16px blur placeholder
        const blurCanvas = document.createElement('canvas');
        let tinyW = 16;
        let tinyH = 16;
        if (naturalWidth >= naturalHeight) {
          tinyW = 16;
          tinyH = Math.max(1, Math.round(16 * (naturalHeight / naturalWidth)));
        } else {
          tinyH = 16;
          tinyW = Math.max(1, Math.round(16 * (naturalWidth / naturalHeight)));
        }
        blurCanvas.width = tinyW;
        blurCanvas.height = tinyH;
        const blurCtx = blurCanvas.getContext('2d');
        let blurDataUrl = '';
        if (blurCtx) {
          blurCtx.imageSmoothingEnabled = true;
          blurCtx.imageSmoothingQuality = 'medium';
          blurCtx.drawImage(img, 0, 0, tinyW, tinyH);
          blurDataUrl = blurCanvas.toDataURL('image/webp', 0.6) || blurCanvas.toDataURL('image/jpeg', 0.6);
        }

        // 4. Convert main canvas to WebP Blob at 0.82 quality
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (!blob) {
              return reject(new Error('WebP encoding failed.'));
            }
            resolve({
              blob,
              width: targetWidth,
              height: targetHeight,
              blurDataUrl,
            });
          },
          'image/webp',
          0.82
        );
      } catch (err: any) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image file.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads a processed WebP blob to the projects bucket with progress reporting:
 * Destination path: {projectId}/{timestamp}-{index}.webp
 */
export function uploadProjectImageBlob({
  blob,
  projectId,
  index,
  timestamp,
  onProgress,
}: {
  blob: Blob;
  projectId: string;
  index: number;
  timestamp: number;
  onProgress: (percent: number) => void;
}): Promise<{ url: string; path: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fileName = `${timestamp}-${index}.webp`;
    const filePath = `${projectId}/${fileName}`;

    const formData = new FormData();
    const webpFile = new File([blob], fileName, { type: 'image/webp' });
    formData.append('file', webpFile);
    formData.append('bucket', 'projects');
    formData.append('filePath', filePath);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.min(100, Math.round((e.loaded / e.total) * 100));
        onProgress(percent);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.publicUrl) {
            resolve({ url: data.publicUrl, path: data.path || filePath });
          } else {
            reject(new Error(data.error || 'Server returned empty public URL.'));
          }
        } catch {
          reject(new Error('Invalid response from upload server.'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData.error || `Upload failed with HTTP ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with HTTP ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during file upload. Check your connection and retry.'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload was cancelled.'));
    });

    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
}
