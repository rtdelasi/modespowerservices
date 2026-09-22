import { createClient } from './client';

export type StorageBucket = 'gallery' | 'projects' | 'team' | 'media' | 'settings';

export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  folder = ''
): Promise<{ path: string; publicUrl: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    if (folder) formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return { path: '', publicUrl: '', error: errData.error || `Upload failed with status ${response.status}` };
    }

    const data = await response.json();
    if (!data.publicUrl) {
      return { path: '', publicUrl: '', error: data.error || 'No public URL returned' };
    }

    return { path: data.path, publicUrl: data.publicUrl };
  } catch (err: any) {
    console.error('Storage upload exception:', err);
    return { path: '', publicUrl: '', error: err.message || 'Upload failed' };
  }
}

export async function deleteStorageFile(bucket: StorageBucket, path: string): Promise<boolean> {
  try {
    if (!path) return true;

    // If path is a remote URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
      if (!path.includes('supabase.co')) {
        return true;
      }
      // Extract file path from Supabase storage public URL
      const urlParts = path.split(`/storage/v1/object/public/${bucket}/`);
      if (urlParts.length > 1) {
        path = urlParts[1];
      }
    }

    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      console.warn(`Failed to delete file ${path} from bucket ${bucket}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Storage delete exception:', err);
    return false;
  }
}
