import { CloudflareConfig, R2FileItem } from '../types';

export const CLOUDFLARE_CONFIG_KEY = 'spg_cloudflare_config';
export const CLOUDFLARE_SYNC_EVENT = 'spg_cloudflare_synced';

/**
 * Retrieves the configured Cloudflare Worker URL and settings.
 */
export function getCloudflareConfig(): CloudflareConfig {
  if (typeof window === 'undefined') return { workerUrl: '' };
  try {
    const raw = localStorage.getItem(CLOUDFLARE_CONFIG_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return { workerUrl: '' };
}

/**
 * Saves Cloudflare Worker configuration to storage.
 */
export function saveCloudflareConfig(config: CloudflareConfig): void {
  const cleanUrl = (config.workerUrl || '').trim().replace(/\/+$/, '');
  const data: CloudflareConfig = {
    ...config,
    workerUrl: cleanUrl,
  };
  localStorage.setItem(CLOUDFLARE_CONFIG_KEY, JSON.stringify(data));
}

/**
 * Fetches remote configuration (password hash, custom images) from Cloudflare Worker.
 */
export async function fetchRemoteCloudflareConfig(): Promise<{
  success: boolean;
  passwordHash?: string;
  images?: Record<string, string>;
  error?: string;
}> {
  const config = getCloudflareConfig();
  if (!config.workerUrl) {
    return { success: false, error: 'Cloudflare Worker URL is not configured' };
  }

  try {
    const res = await fetch(`${config.workerUrl}/api/config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiSecret ? { 'X-Admin-Secret': config.apiSecret } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Worker responded with HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      passwordHash: data.passwordHash,
      images: data.images || {},
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to connect to Cloudflare Worker',
    };
  }
}

/**
 * Pushes new password hash to Cloudflare Worker.
 */
export async function pushRemotePasswordHash(newHash: string): Promise<boolean> {
  const config = getCloudflareConfig();
  if (!config.workerUrl) return false;

  try {
    const res = await fetch(`${config.workerUrl}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiSecret ? { 'X-Admin-Secret': config.apiSecret } : {}),
      },
      body: JSON.stringify({ newHash }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to push password hash to Cloudflare:', err);
    return false;
  }
}

/**
 * Pushes updated custom images map to Cloudflare Worker.
 */
export async function pushRemoteCustomImages(images: Record<string, string>): Promise<boolean> {
  const config = getCloudflareConfig();
  if (!config.workerUrl) return false;

  try {
    const res = await fetch(`${config.workerUrl}/api/images/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiSecret ? { 'X-Admin-Secret': config.apiSecret } : {}),
      },
      body: JSON.stringify({ images }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to push images to Cloudflare:', err);
    return false;
  }
}

/**
 * Fetches list of images uploaded to the Cloudflare R2 bucket.
 */
export async function fetchR2FilesList(): Promise<{ success: boolean; files?: R2FileItem[]; error?: string }> {
  const config = getCloudflareConfig();
  if (!config.workerUrl) {
    return { success: false, error: 'Worker URL is not set' };
  }

  try {
    const res = await fetch(`${config.workerUrl}/api/r2/list`, {
      method: 'GET',
      headers: {
        ...(config.apiSecret ? { 'X-Admin-Secret': config.apiSecret } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to list R2 files (HTTP ${res.status})`);
    }

    const data = await res.json();
    return { success: true, files: data.files || [] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to list R2 files' };
  }
}

/**
 * Uploads an image directly to Cloudflare R2 bucket via Worker.
 */
export async function uploadImageToR2(file: File): Promise<{ success: boolean; file?: R2FileItem; error?: string }> {
  const config = getCloudflareConfig();
  if (!config.workerUrl) {
    return { success: false, error: 'Worker URL is not set' };
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${config.workerUrl}/api/r2/upload`, {
      method: 'POST',
      headers: {
        ...(config.apiSecret ? { 'X-Admin-Secret': config.apiSecret } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed (HTTP ${res.status})`);
    }

    const data = await res.json();
    return { success: true, file: data.file };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to upload image to R2' };
  }
}
