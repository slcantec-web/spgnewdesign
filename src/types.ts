export interface ServiceItem {
  id: string;
  category: 'ladies' | 'kids' | 'custom' | 'alterations' | 'finishing';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  leadTime: string;
  popularItems: string[];
  image: string;
  details: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'ladies' | 'kids' | 'custom' | 'details';
  categoryName: string;
  url: string;
  caption: string;
  fabricType: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

export interface FabricGuide {
  garment: string;
  category: 'Ladies' | 'Kids';
  fabricRequirement: string;
  recommendedFabrics: string[];
  tip: string;
}

export interface StockImageItem {
  id: string;
  section: 'Hero Section' | 'Services Section' | 'Gallery Section';
  positionName: string;
  description: string;
  defaultUrl: string;
  recommendedAspect?: string;
}
