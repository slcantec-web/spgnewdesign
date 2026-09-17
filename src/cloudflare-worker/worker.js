/**
 * Cloudflare Worker Script for S.P. Garment Minuwangoda (Standard JavaScript ES Module)
 * 
 * Works directly in Cloudflare Worker Online Editor (worker.js) without any build step.
 * 
 * Setup in Cloudflare Dashboard:
 * 1. Workers & Pages -> Create Worker (e.g. sp-garment-worker)
 * 2. Settings -> Variables -> R2 Bucket Bindings:
 *    - Variable name: IMAGES_BUCKET
 *    - R2 Bucket: select your bucket (e.g. sp-garment-images)
 * 3. (Optional but recommended) Settings -> Variables -> KV Namespace Bindings:
 *    - Variable name: CONFIG_KV
 *    - KV Namespace: create/select one (e.g. spg-config)
 *    Binding this enables both faster config reads and the rate limiter
 *    on the password-change endpoint below.
 * 4. (Optional) Settings -> Variables -> Environment Variables:
 *    - PUBLIC_R2_URL: your custom domain or pub-xxx.r2.dev URL (optional)
 * 5. Paste this code directly into the editor and click "Deploy"!
 */

// Initial Default SHA-256 Hash for 'spgarment2024'
const DEFAULT_HASH = 'a87bf471c9656f49c082c462893809457c67672aa8c53054b8248ddefd26d7bf';

// All KV keys this Worker touches are prefixed with this, so the same KV
// namespace can safely be shared with other, unrelated Cloudflare Worker
// projects without their keys colliding with (and silently overwriting)
// this project's password hash, images, or rate-limit counters.
const KV_PREFIX = 'spg:';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Secret',
};

// --- Rate limiting for /api/auth/change-password ---
// Workers don't keep reliable in-memory state between requests (each
// request can land on a fresh isolate), so this uses KV as the shared
// counter store, keyed per client IP with a sliding window.
// If CONFIG_KV isn't bound, rate limiting is silently skipped rather than
// failing the request — bind CONFIG_KV (see setup notes above) to enable it.
const RATE_LIMIT_WINDOW_SEC = 15 * 60; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 10;

async function checkRateLimit(env, request, bucketName) {
  if (!env.CONFIG_KV) {
    // No KV bound — can't track attempts across requests, so allow through.
    return { limited: false };
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `${KV_PREFIX}ratelimit:${bucketName}:${ip}`;
  const now = Date.now();

  let bucket = null;
  try {
    const raw = await env.CONFIG_KV.get(key);
    if (raw) bucket = JSON.parse(raw);
  } catch {
    bucket = null;
  }

  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_SEC * 1000) {
    bucket = { count: 1, windowStart: now };
    await env.CONFIG_KV.put(key, JSON.stringify(bucket), { expirationTtl: RATE_LIMIT_WINDOW_SEC });
    return { limited: false };
  }

  bucket.count += 1;
  const retryAfterSec = Math.max(
    1,
    Math.ceil((RATE_LIMIT_WINDOW_SEC * 1000 - (now - bucket.windowStart)) / 1000)
  );

  if (bucket.count > RATE_LIMIT_MAX_ATTEMPTS) {
    return { limited: true, retryAfterSec };
  }

  await env.CONFIG_KV.put(key, JSON.stringify(bucket), { expirationTtl: retryAfterSec });
  return { limited: false };
}

function rateLimitedResponse(retryAfterSec) {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Too many password attempts from this device. Please wait before trying again.',
      retryAfterSeconds: retryAfterSec,
    }),
    {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': String(retryAfterSec) },
    }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // 1. GET /api/config -> Returns current password hash and saved custom images
      if (url.pathname === '/api/config' && request.method === 'GET') {
        let passwordHash = DEFAULT_HASH;
        let images = {};

        if (env.CONFIG_KV) {
          passwordHash = (await env.CONFIG_KV.get(`${KV_PREFIX}admin_password_hash`)) || DEFAULT_HASH;
          const imagesJson = await env.CONFIG_KV.get(`${KV_PREFIX}custom_images`);
          if (imagesJson) {
            try {
              images = JSON.parse(imagesJson);
            } catch {
              images = {};
            }
          }
        } else if (env.IMAGES_BUCKET) {
          // If KV is not bound, store config JSON directly inside R2 bucket!
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          if (configFile) {
            try {
              const parsed = await configFile.json();
              passwordHash = parsed.passwordHash || DEFAULT_HASH;
              images = parsed.images || {};
            } catch {
              // fallback
            }
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
        const rateCheck = await checkRateLimit(env, request, 'change-password');
        if (rateCheck.limited) {
          return rateLimitedResponse(rateCheck.retryAfterSec);
        }

        const body = await request.json();
        if (!body.newHash || body.newHash.length !== 64) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid SHA-256 hash length' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (env.CONFIG_KV) {
          await env.CONFIG_KV.put(`${KV_PREFIX}admin_password_hash`, body.newHash);
        } else if (env.IMAGES_BUCKET) {
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          let currentConfig = {};
          if (configFile) {
            try {
              currentConfig = await configFile.json();
            } catch {
              currentConfig = {};
            }
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
        const body = await request.json();
        const imagesMap = body.images || {};

        if (env.CONFIG_KV) {
          await env.CONFIG_KV.put(`${KV_PREFIX}custom_images`, JSON.stringify(imagesMap));
        } else if (env.IMAGES_BUCKET) {
          const configFile = await env.IMAGES_BUCKET.get('_config/app-config.json');
          let currentConfig = {};
          if (configFile) {
            try {
              currentConfig = await configFile.json();
            } catch {
              currentConfig = {};
            }
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

        const files = (objects.objects || []).map((obj) => ({
          key: obj.key,
          size: obj.size,
          uploadedAt: obj.uploaded ? obj.uploaded.toISOString() : new Date().toISOString(),
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
        const file = formData.get('file');

        if (!file) {
          return new Response(
            JSON.stringify({ success: false, error: 'No file provided' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Clean filename and create unique key
        const cleanName = (file.name || 'photo.jpg').replace(/[^a-zA-Z0-9_.-]/g, '_').toLowerCase();
        const key = `uploads/${Date.now()}-${cleanName}`;

        await env.IMAGES_BUCKET.put(key, file.stream ? file.stream() : file, {
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

      // 6. GET /cdn/* -> Direct image serve proxy from R2
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
        if (typeof object.writeHttpMetadata === 'function') {
          object.writeHttpMetadata(headers);
        } else if (object.httpMetadata && object.httpMetadata.contentType) {
          headers.set('Content-Type', object.httpMetadata.contentType);
        }
        if (object.httpEtag) {
          headers.set('etag', object.httpEtag);
        }
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('Access-Control-Allow-Origin', '*');

        return new Response(object.body, { headers });
      }

      // Default Health/Info response
      return new Response(
        JSON.stringify({
          success: true,
          service: 'S.P. Garment Cloudflare Worker & R2 API',
          endpoints: [
            'GET /api/config',
            'POST /api/auth/change-password',
            'POST /api/images/update',
            'GET /api/r2/list',
            'POST /api/r2/upload',
            'GET /cdn/:key',
          ],
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, error: err.message || 'Worker Internal Error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
