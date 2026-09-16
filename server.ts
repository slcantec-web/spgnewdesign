import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'studio-store.json');

// Default initial master SHA-256 hash for "spgarment2024"
const DEFAULT_ADMIN_HASH = 'a87bf471c9656f49c082c462893809457c67672aa8c53054b8248ddefd26d7bf';

interface StudioStore {
  passwordHash: string;
  cloudflareConfig: {
    workerUrl: string;
    apiSecret?: string;
    publicR2Domain?: string;
  };
  customImages: Record<string, string>;
  enquiries: Array<{
    id: string;
    name: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
  }>;
  updatedAt: string;
}

// In-memory store initialized from disk
let store: StudioStore = {
  passwordHash: DEFAULT_ADMIN_HASH,
  cloudflareConfig: {
    workerUrl: '',
    apiSecret: '',
    publicR2Domain: '',
  },
  customImages: {},
  enquiries: [],
  updatedAt: new Date().toISOString(),
};

function initStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      store = {
        passwordHash: parsed.passwordHash || DEFAULT_ADMIN_HASH,
        cloudflareConfig: parsed.cloudflareConfig || { workerUrl: '', apiSecret: '', publicR2Domain: '' },
        customImages: parsed.customImages || {},
        enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
      console.log(`[Store] Loaded persistent data. Active password hash: ${store.passwordHash.slice(0, 10)}...`);
    } else {
      saveStore();
    }
  } catch (err) {
    console.error('[Store] Error loading store file, using default', err);
  }
}

function saveStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    store.updatedAt = new Date().toISOString();
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Store] Error saving store file', err);
  }
}

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

async function startServer() {
  initStore();
  const app = express();

  app.use(express.json({ limit: '5mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 1. GET /api/admin/config -> Returns synced password hash, config, and images across all devices
  app.get('/api/admin/config', (req, res) => {
    res.json({
      success: true,
      passwordHash: store.passwordHash || DEFAULT_ADMIN_HASH,
      cloudflareConfig: store.cloudflareConfig,
      customImages: store.customImages,
      hasCustomPassword: store.passwordHash !== DEFAULT_ADMIN_HASH,
      updatedAt: store.updatedAt,
    });
  });

  // 2. POST /api/admin/change-password -> Updates password across all devices
  app.post('/api/admin/change-password', (req, res) => {
    try {
      const { currentPassword, currentHash, newPassword, newHash } = req.body;

      let targetNewHash = newHash;
      if (!targetNewHash && newPassword) {
        if (newPassword.length < 6) {
          return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
        }
        targetNewHash = sha256(newPassword);
      }

      if (!targetNewHash || targetNewHash.trim().length !== 64) {
        return res.status(400).json({ success: false, error: 'Invalid SHA-256 hash provided.' });
      }

      // Verify current password if provided
      if (currentPassword) {
        const checkHash = sha256(currentPassword);
        if (checkHash.toLowerCase() !== store.passwordHash.toLowerCase()) {
          return res.status(401).json({ success: false, error: 'Current password is incorrect.' });
        }
      } else if (currentHash) {
        if (currentHash.toLowerCase() !== store.passwordHash.toLowerCase()) {
          return res.status(401).json({ success: false, error: 'Current password hash mismatch.' });
        }
      }

      store.passwordHash = targetNewHash.trim().toLowerCase();
      saveStore();

      console.log(`[Auth] Admin password changed successfully. Synced to all devices.`);
      return res.json({
        success: true,
        message: 'Password updated and synchronized across all devices!',
        passwordHash: store.passwordHash,
      });
    } catch (err: any) {
      console.error('[Auth] Password change error', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to update password' });
    }
  });

  // 3. POST /api/admin/reset-password -> Reset to initial default hash
  app.post('/api/admin/reset-password', (req, res) => {
    store.passwordHash = DEFAULT_ADMIN_HASH;
    saveStore();
    console.log(`[Auth] Admin password reset to default setup hash.`);
    return res.json({
      success: true,
      message: 'Password reset to default setup hash across all devices.',
      passwordHash: DEFAULT_ADMIN_HASH,
    });
  });

  // 4. POST /api/admin/sync-config -> Save Cloudflare settings or custom images
  app.post('/api/admin/sync-config', (req, res) => {
    try {
      const { cloudflareConfig, customImages } = req.body;
      if (cloudflareConfig) {
        store.cloudflareConfig = {
          ...store.cloudflareConfig,
          ...cloudflareConfig,
        };
      }
      if (customImages && typeof customImages === 'object') {
        store.customImages = {
          ...store.customImages,
          ...customImages,
        };
      }
      saveStore();
      return res.json({ success: true, message: 'Settings synchronized across all devices.' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || 'Failed to sync config' });
    }
  });

  // 5. GET /api/admin/enquiries -> Get all customer enquiries
  app.get('/api/admin/enquiries', (req, res) => {
    return res.json({
      success: true,
      enquiries: store.enquiries || [],
    });
  });

  // 6. POST /api/admin/enquiries -> Save an enquiry record
  app.post('/api/admin/enquiries', (req, res) => {
    try {
      const { name, phone, service, message, createdAt, id } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ success: false, error: 'Name and phone are required.' });
      }

      const newRecord = {
        id: id || 'enq_' + Date.now(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        service: String(service || 'General Enquiry').trim(),
        message: String(message || '').trim(),
        createdAt: createdAt || new Date().toISOString(),
      };

      store.enquiries.unshift(newRecord);
      // Keep up to 200 recent enquiries
      store.enquiries = store.enquiries.slice(0, 200);
      saveStore();

      return res.json({ success: true, enquiry: newRecord });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || 'Failed to save enquiry' });
    }
  });

  // 7. DELETE /api/admin/enquiries -> Clear enquiries
  app.delete('/api/admin/enquiries', (req, res) => {
    store.enquiries = [];
    saveStore();
    return res.json({ success: true, message: 'Enquiries cleared.' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
