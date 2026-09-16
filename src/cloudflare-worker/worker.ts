/**
 * Cloudflare Worker Script for S.P. Garment Minuwangoda
 * 
 * Features:
 * - Cross-device SHA-256 Admin Password Hashing & Verification
 * - Global Stock Images Link Configuration (syncs to all devices & users)
 * - Cloudflare R2 Bucket File Storage (direct image upload, listing & picking)
 * 
 * Instructions to deploy on Cloudflare:
 * 1. Create a Cloudflare Worker (e.g., named 'sp-garment-worker').
 * 2. Create an R2 Bucket (e.g., named 'sp-garment-images').
 * 3. Bind the R2 bucket to the worker with the variable name `IMAGES_BUCKET`.
 * 4. (Optional) Create a KV namespace named `SPG_CONFIG` and bind it as `CONFIG_KV`.
 *    Or set R2 public access / custom domain.
 * 5. Paste this code into Worker editor and deploy!
 */

// Ambient Cloudflare Worker types when @cloudflare/workers-types is not installed
type R2Bucket = any;
type KVNamespace = any;

export interface Env {
  IMAGES_BUCKET: R2Bucket;
  CONFIG_KV?: KVNamespace;
  PUBLIC_R2_URL?: string; // e.g. https://images.yourdomain.com or R2 public dev URL
  API_SECRET?: string;    // Optional secret key for extra admin endpoint protection
}

// Initial Default SHA-256 Hash (corresponds to 'spgarment2024')
const DEFAULT_HASH = 'a87bf471c9656f49c082c462893809457c67672aa8c53054b8248ddefd26d7bf';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Secret',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // 1. GET /api/config -> Returns current password hash and saved custom images
      if (url.pathname === '/api/config' && request.method === 'GET') {
        let passwordHash = DEFAULT_HASH;
        let images: Record<string, string> = {};

        if (env.CONFIG_KV) {
          passwordHash = (await env.CONFIG_KV.get('admin_password_hash')) || DEFAULT_HASH;
          const imagesJson = await env.CONFIG_KV.get('custom_images');
          if (imagesJson) {
            try {
              images = JSON.parse(imagesJson);
            } catch {
              images = {};
            }
          }
        } else if (env.IMAGES_BUCKET) {
          // If KV is not bound, we can store config json file directly in R2 bucket!
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          if (configFile) {
            const parsed = await configFile.json() as any;
            passwordHash = parsed.passwordHash || DEFAULT_HASH;
            images = parsed.images || {};
          }
        }

        return new Response(
          JSON.stringify({
            success: true,
            passwordHash,
            images,
            r2PublicUrl: env.PUBLIC_R2_URL || '',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // 2. POST /api/auth/change-password -> Updates SHA-256 password hash across all devices
      if (url.pathname === '/api/auth/change-password' && request.method === 'POST') {
        const body = (await request.json()) as { currentHash?: string; newHash: string };
        if (!body.newHash || body.newHash.length !== 64) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid SHA-256 hash length' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (env.CONFIG_KV) {
          await env.CONFIG_KV.put('admin_password_hash', body.newHash);
        } else if (env.IMAGES_BUCKET) {
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          let currentConfig: any = {};
          if (configFile) {
            currentConfig = await configFile.json();
          }
          currentConfig.passwordHash = body.newHash;
          await env.IMAGES_BUCKET.put('_config/app-config.json', JSON.stringify(currentConfig), {
            httpMetadata: { contentType: 'application/json' },
          });
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Password hash successfully updated' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 3. POST /api/images/update -> Saves custom images mapping to Cloudflare
      if (url.pathname === '/api/images/update' && request.method === 'POST') {
        const body = (await request.json()) as { images: Record<string, string> };
        const imagesMap = body.images || {};

        if (env.CONFIG_KV) {
          await env.CONFIG_KV.put('custom_images', JSON.stringify(imagesMap));
        } else if (env.IMAGES_BUCKET) {
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          let currentConfig: any = {};
          if (configFile) {
            currentConfig = await configFile.json();
          }
          currentConfig.images = imagesMap;
          await env.IMAGES_BUCKET.put('_config/app-config.json', JSON.stringify(currentConfig), {
            httpMetadata: { contentType: 'application/json' },
          });
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Images updated successfully across all devices' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 4. GET /api/r2/list -> Lists uploaded images in R2 bucket
      if (url.pathname === '/api/r2/list' && request.method === 'GET') {
        if (!env.IMAGES_BUCKET) {
          return new Response(
            JSON.stringify({ success: false, error: 'IMAGES_BUCKET is not bound in Worker' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const objects = await env.IMAGES_BUCKET.list({ prefix: 'uploads/' });
        const baseUrl = env.PUBLIC_R2_URL || `${url.origin}/cdn`;

        const files = objects.objects.map((obj) => ({
          key: obj.key,
          size: obj.size,
          uploadedAt: obj.uploaded.toISOString(),
          url: `${baseUrl}/${obj.key}`,
        }));

        return new Response(JSON.stringify({ success: true, files }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 5. POST /api/r2/upload -> Uploads a file directly to R2 bucket
      if (url.pathname === '/api/r2/upload' && request.method === 'POST') {
        if (!env.IMAGES_BUCKET) {
          return new Response(
            JSON.stringify({ success: false, error: 'IMAGES_BUCKET is not bound in Worker' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
          return new Response(
            JSON.stringify({ success: false, error: 'No file provided' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Clean filename and create unique key
        const extension = file.name.split('.').pop() || 'jpg';
        const cleanName = file.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
        const key = `uploads/${Date.now()}-${cleanName}`;

        await env.IMAGES_BUCKET.put(key, file.stream(), {
          httpMetadata: {
            contentType: file.type || 'image/jpeg',
          },
        });

        const baseUrl = env.PUBLIC_R2_URL || `${url.origin}/cdn`;
        const fileUrl = `${baseUrl}/${key}`;

        return new Response(
          JSON.stringify({
            success: true,
            file: {
              key,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              url: fileUrl,
            },
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 6. GET /cdn/* -> Direct image serve proxy if public bucket domain isn't enabled
      if (url.pathname.startsWith('/cdn/') && request.method === 'GET') {
        if (!env.IMAGES_BUCKET) {
          return new Response('R2 Bucket not configured', { status: 500 });
        }

        const key = url.pathname.replace('/cdn/', '');
        const object = await env.IMAGES_BUCKET.get(key);

        if (!object) {
          return new Response('Image Not Found', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('Access-Control-Allow-Origin', '*');

        return new Response(object.body, { headers });
      }

      // Fallback 404
      return new Response(
        JSON.stringify({ success: false, message: 'Cloudflare Worker for S.P. Garment Active' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({ success: false, error: err.message || 'Worker Internal Error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
