import { useEffect, useState } from 'react';
import { StockImageItem } from '../types';

export const STOCK_IMAGES_STORAGE_KEY = 'spg_custom_images';
export const IMAGES_UPDATED_EVENT = 'spg_images_updated';

export const STOCK_IMAGE_DEFINITIONS: StockImageItem[] = [
  // Hero Section
  {
    id: 'hero_main',
    section: 'Hero Section',
    positionName: 'Hero Section - Atelier & Measuring Showcase',
    description: 'Main feature portrait banner photo displayed on the top right hero showcase',
    defaultUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:5 or Portrait (e.g. 1000x1250px)',
  },

  // Services Section
  {
    id: 'service_ladies-wear',
    section: 'Services Section',
    positionName: 'Services - Ladies Wear (කාන්තා ඇඳුම්)',
    description: 'Card photo for Custom Dresses, Evening Gowns, Saree Blouses & Skirts',
    defaultUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    recommendedAspect: 'Landscape / Aspect 16:10 or 4:3 (e.g. 800x500px)',
  },
  {
    id: 'service_kids-wear',
    section: 'Services Section',
    positionName: 'Services - Kids Frocks & Sets (ළමා ඇඳුම්)',
    description: 'Card photo for Birthday Frocks, Ceremony Dresses, Girls & Boys Outfits',
    defaultUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
    recommendedAspect: 'Landscape / Aspect 16:10 or 4:3 (e.g. 800x500px)',
  },
  {
    id: 'service_custom-design',
    section: 'Services Section',
    positionName: 'Services - Custom Design & Pattern (අභිරුචි මෝස්තර)',
    description: 'Card photo for Pattern Drafting, bespoke cuts, styling from photos',
    defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    recommendedAspect: 'Landscape / Aspect 16:10 or 4:3 (e.g. 800x500px)',
  },
  {
    id: 'service_alterations',
    section: 'Services Section',
    positionName: 'Services - Alterations & Fitting (ඇඳුම් වෙනස් කිරීම්)',
    description: 'Card photo for Resizing, zippers, shortening & garment repairs',
    defaultUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80',
    recommendedAspect: 'Landscape / Aspect 16:10 or 4:3 (e.g. 800x500px)',
  },
  {
    id: 'service_finishing',
    section: 'Services Section',
    positionName: 'Services - Finishing & Details (උසස් මැහුම් නිමාව)',
    description: 'Card photo for Lace edge work, piping, lining & neat hem stitches',
    defaultUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
    recommendedAspect: 'Landscape / Aspect 16:10 or 4:3 (e.g. 800x500px)',
  },

  // Gallery Section
  {
    id: 'gal-1',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 01 - Artisan Tailoring Atelier',
    description: 'Pattern drafting, shears cutting & workbench setup (Custom Atelier)',
    defaultUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-2',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 02 - Bespoke Evening Gown',
    description: 'Pleated skirt evening gown creation (Ladies Wear)',
    defaultUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-3',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 03 - Princess Birthday Frock',
    description: 'Soft tulle and cotton lining birthday frock (Kids Frocks)',
    defaultUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-4',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 04 - Fine Lace & Edge Finishing',
    description: 'Chantilly lace & organza edging showcase (Finishing Details)',
    defaultUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-5',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 05 - Hand-Tailored Floral Dress',
    description: 'A-line floral dress with belt (Ladies Wear)',
    defaultUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-6',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 06 - Little One Casual Outfit',
    description: 'Handloom cotton casual outfit with frills (Kids Frocks)',
    defaultUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-7',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 07 - Fabric Inspection & Pattern Cut',
    description: 'Pattern inspection on tailoring board (Custom Atelier)',
    defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-8',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 08 - Traditional Saree Blouse Craft',
    description: 'Deep back brocade saree blouse (Ladies Wear)',
    defaultUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-9',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 09 - Tailored High-Waist Trouser',
    description: 'Ladies tailored trouser with pleats (Ladies Wear)',
    defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-10',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 10 - Precision Sewing & Thread Work',
    description: 'Close up sewing needle and durable stitch (Finishing Details)',
    defaultUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-11',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 11 - School & Ceremony Uniform',
    description: 'Neatly stitched school uniform (Kids Frocks)',
    defaultUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
  {
    id: 'gal-12',
    section: 'Gallery Section',
    positionName: 'Gallery Photo 12 - Hand-Drafted Atelier Master Patterns',
    description: 'Bespoke customer master drafting on craft paper (Custom Atelier)',
    defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    recommendedAspect: 'Aspect 4:3 or 1:1 (e.g. 1000x800px)',
  },
];

/**
 * Loads custom image URLs stored in localStorage.
 */
export function getCustomImagesMap(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STOCK_IMAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Gets effective image URL (custom URL if set, or fallback default).
 */
export function getCustomImageUrl(id: string, fallbackDefault?: string): string {
  const customMap = getCustomImagesMap();
  if (customMap[id] && customMap[id].trim().length > 0) {
    return customMap[id].trim();
  }

  if (fallbackDefault) return fallbackDefault;

  const def = STOCK_IMAGE_DEFINITIONS.find((img) => img.id === id);
  return def ? def.defaultUrl : '';
}

/**
 * Saves a single custom image URL and notifies listeners.
 */
export function saveCustomImageUrl(id: string, url: string): void {
  const current = getCustomImagesMap();
  const trimmed = url.trim();

  if (trimmed) {
    current[id] = trimmed;
  } else {
    delete current[id];
  }

  localStorage.setItem(STOCK_IMAGES_STORAGE_KEY, JSON.stringify(current));
  notifyImageChange();
}

/**
 * Saves multiple custom image URLs at once.
 */
export function saveMultipleCustomImages(updates: Record<string, string>): void {
  const current = getCustomImagesMap();
  for (const [id, url] of Object.entries(updates)) {
    const trimmed = (url || '').trim();
    if (trimmed) {
      current[id] = trimmed;
    } else {
      delete current[id];
    }
  }

  localStorage.setItem(STOCK_IMAGES_STORAGE_KEY, JSON.stringify(current));
  notifyImageChange();
}

/**
 * Resets a single image back to default.
 */
export function resetCustomImageUrl(id: string): void {
  const current = getCustomImagesMap();
  delete current[id];
  localStorage.setItem(STOCK_IMAGES_STORAGE_KEY, JSON.stringify(current));
  notifyImageChange();
}

/**
 * Resets all images back to factory stock defaults.
 */
export function resetAllCustomImages(): void {
  localStorage.removeItem(STOCK_IMAGES_STORAGE_KEY);
  notifyImageChange();
}

function notifyImageChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(IMAGES_UPDATED_EVENT));
  }
}

/**
 * React hook that subscribes to image updates.
 * Returns the latest custom image mapping and a helper `getImage(id, fallback)`.
 */
export function useCustomImages() {
  const [customMap, setCustomMap] = useState<Record<string, string>>(() => getCustomImagesMap());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomMap(getCustomImagesMap());
    };

    window.addEventListener(IMAGES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(IMAGES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getImage = (id: string, fallback?: string): string => {
    if (customMap[id] && customMap[id].trim()) {
      return customMap[id].trim();
    }
    if (fallback) return fallback;
    const def = STOCK_IMAGE_DEFINITIONS.find((img) => img.id === id);
    return def ? def.defaultUrl : '';
  };

  return { customMap, getImage };
}
