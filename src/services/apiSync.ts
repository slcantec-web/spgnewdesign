import { CloudflareConfig, EnquiryRecord } from '../types';
import { setStoredPasswordHash, getStoredPasswordHash } from '../utils/security';
import { saveCloudflareConfig, getCloudflareConfig } from './cloudflareService';
import { saveMultipleCustomImages } from './imageManager';

export const SERVER_SYNC_EVENT = 'spg_server_synced';

export interface RemoteServerConfig {
  success: boolean;
  passwordHash?: string;
  cloudflareConfig?: CloudflareConfig;
  customImages?: Record<string, string>;
  hasCustomPassword?: boolean;
  error?: string;
}

/**
 * Fetches the master active configuration (password hash, Cloudflare config, custom images)
 * from the central server API, ensuring all devices (PC, mobile, tablet) share the identical state.
 */
export async function syncFromServer(): Promise<RemoteServerConfig> {
  try {
    const res = await fetch('/api/admin/config', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data.success) {
      // 1. Synchronize password hash
      if (data.passwordHash && data.passwordHash.length === 64) {
        setStoredPasswordHash(data.passwordHash);
      }

      // 2. Synchronize Cloudflare settings if present
      if (data.cloudflareConfig && data.cloudflareConfig.workerUrl) {
        const localCf = getCloudflareConfig();
        if (!localCf.workerUrl || localCf.workerUrl !== data.cloudflareConfig.workerUrl) {
          saveCloudflareConfig(data.cloudflareConfig);
        }
      }

      // 3. Synchronize custom images map
      if (data.customImages && Object.keys(data.customImages).length > 0) {
        saveMultipleCustomImages(data.customImages);
      }

      // Dispatch event to notify components of fresh synchronized state
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(SERVER_SYNC_EVENT, { detail: data }));
      }

      return data;
    }
    return { success: false, error: 'Failed to retrieve server configuration' };
  } catch (err: any) {
    // Return gracefully so offline mode continues seamlessly
    return { success: false, error: err.message || 'Network error' };
  }
}

/**
 * Sends newly updated password hash to the central server so all other devices
 * receive the update immediately.
 */
export async function updateServerPassword(
  newHash: string,
  currentPassword?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const currentHash = getStoredPasswordHash();
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newHash,
        currentPassword,
        currentHash,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || `HTTP ${res.status}` };
    }

    // Set local cache as well
    setStoredPasswordHash(newHash);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to communicate with server' };
  }
}

/**
 * Resets password to the default setup hash on the central server.
 */
export async function resetServerPassword(): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || `HTTP ${res.status}` };
    }
    if (data.passwordHash) {
      setStoredPasswordHash(data.passwordHash);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to reset password on server' };
  }
}

/**
 * Synchronizes Cloudflare Worker settings or custom images to the central server
 * so they are immediately available on mobile and other devices.
 */
export async function syncConfigToServer(params: {
  cloudflareConfig?: CloudflareConfig;
  customImages?: Record<string, string>;
}): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/sync-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Retrieves all stored customer enquiries from the server.
 */
export async function fetchServerEnquiries(): Promise<EnquiryRecord[]> {
  try {
    const res = await fetch('/api/admin/enquiries', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.enquiries) ? data.enquiries : [];
  } catch {
    return [];
  }
}

/**
 * Posts a newly submitted customer enquiry to the server.
 */
export async function submitServerEnquiry(enquiry: EnquiryRecord): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Clears customer enquiries on the server.
 */
export async function clearServerEnquiries(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/enquiries', {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}
