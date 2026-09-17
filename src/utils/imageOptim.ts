// Builds a `srcSet` + `sizes` pair so mobile devices download an
// appropriately small image instead of a flat desktop-sized one.
// Only rewrites images.unsplash.com URLs (they support a `w=` resize
// param); any other host — including custom Cloudflare R2 photos —
// is returned untouched, since we can't safely resize those.

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

const UNSPLASH_HOST = 'images.unsplash.com';

export function buildResponsiveImage(
  url: string,
  widths: number[],
  sizes: string
): ResponsiveImage {
  if (!url) return { src: url };

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== UNSPLASH_HOST) {
      return { src: url };
    }

    const srcSet = widths
      .map((w) => {
        const variant = new URL(url);
        variant.searchParams.set('w', String(w));
        return `${variant.toString()} ${w}w`;
      })
      .join(', ');

    return { src: url, srcSet, sizes };
  } catch {
    // Malformed URL (e.g. a relative path some custom image might use) — just pass it through.
    return { src: url };
  }
}
