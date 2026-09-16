import { ServiceItem, GalleryPhoto, FabricGuide } from '../types';

export const STUDIO_INFO = {
  name: 'S.P. Garment',
  tagline: 'Custom Tailoring for Ladies & Kids',
  address: '#28, Horampalla, Minuwangoda, Western Province, Sri Lanka',
  phone: '011-2283254',
  phoneClean: '0112283254',
  whatsapp: '+94 76 831 8149',
  whatsappRaw: '94768318149',
  hours: [
    { day: 'Monday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Tuesday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Wednesday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Thursday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Friday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Saturday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Sunday', time: '09:30 — 17:30', openHour: 9.5, closeHour: 17.5 },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.5!2d79.88!3d7.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTAnMTIuMCJOIDc5wrA1Mic0OC4wIkU!5e0!3m2!1sen!2slk!4v1',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ladies-wear',
    category: 'ladies',
    categoryLabel: 'Ladies Wear',
    title: 'Custom Ladies Tailoring',
    shortDesc: 'Bespoke dresses, saree blouses, trousers, evening wear, and everyday silhouettes made to your exact measurements.',
    leadTime: '3–7 Days',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Saree Blouses (Princess cut, padded, boat neck)',
      'A-line, Maxi & Midi Everyday Dresses',
      'Party Gowns & Cocktail Evening Wear',
      'Palazzo & Tailored Cigarette Pants',
      'Pencil, Pleated & Wrap Skirts',
      'Traditional Salwar & Lehenga Choli'
    ],
    details: 'From timeless Sri Lankan saree blouses with reinforced lining to contemporary Western dresses, our patterns are drawn from your body contours for a comfortable, flattering fit.'
  },
  {
    id: 'kids-wear',
    category: 'kids',
    categoryLabel: 'Kids Wear',
    title: 'Kids Frocks & Occasion Sets',
    shortDesc: 'Delightful dresses, birthday frocks, little suits, and durable school uniforms crafted with skin-friendly fabrics and room to grow.',
    leadTime: '3–5 Days',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Flower Girl & Princess Birthday Frocks',
      'Breathable Cotton Day Dresses & Rompers',
      'Coordinated Top & Skirt / Pant Sets',
      'Traditional Pattu Pavadai & Teen Sarees',
      'Preschool & School Uniforms',
      'Festive & Ceremony Ensembles'
    ],
    details: 'Tailored with soft cotton inner linings, covered inner seams to protect sensitive skin, and gentle elastication where movement is needed.'
  },
  {
    id: 'custom-design',
    category: 'custom',
    categoryLabel: 'Custom Design',
    title: 'Pattern Drafting & Photo References',
    shortDesc: 'Bring a photo from Pinterest, Instagram, or a magazine. We draft original master patterns and sew it to life.',
    leadTime: '5–10 Days',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Custom Pattern Creation from Customer Reference',
      'Precision In-Studio Body Measurements',
      'Pattern Modifications & Silhouette Redesign',
      'Bridal Retinue & Bridesmaid Garments',
      'Family Matching Theme Outfits',
      'High-Complexity Bespoke Sewing'
    ],
    details: 'We evaluate fabric drape, recommend lining weights, and conduct pre-stitch reviews so your garment matches the intended inspiration.'
  },
  {
    id: 'alterations',
    category: 'alterations',
    categoryLabel: 'Alterations & Repair',
    title: 'Precision Fit Adjustments & Restyling',
    shortDesc: 'Professional resizing, hem take-ups, sleeve narrowing, concealed zipper installations, and fine repairs for your favorite garments.',
    leadTime: '1–3 Days',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Dress & Trouser Hem Shortening or Lengthening',
      'Waist & Hip Resizing (Take in / Let out)',
      'Sleeve Slimming & Armhole Reshaping',
      'Heavy-duty & Concealed Zip Replacements',
      'Seam Reinforcement & Lining Repair',
      'Neckline Restyling & Modesty Panels'
    ],
    details: 'Never discard a quality garment when expert tailoring can restore its shape and make it fit like custom couture.'
  },
  {
    id: 'finishing',
    category: 'finishing',
    categoryLabel: 'Finishing Details',
    title: 'Decorative Finishes & Embellishments',
    shortDesc: 'Handcrafted lace appliques, French piping, satin borders, delicate ruffles, boning, and custom fabric-covered buttons.',
    leadTime: '2–4 Days',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Full & Half Breathable Linings',
      'Tiered Ruffles, Frills & Gathered Pleats',
      'Fine Bias Binding & Contrast Piping',
      'Lace Borders & Scalloped Hems',
      'Custom Fabric-Covered Buttons & Bows',
      'Internal Corsetry Boning & Bra Cup Inserts'
    ],
    details: 'The difference between ordinary sewing and high-craft tailoring lies in the inner finishing and decorative edge work.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Artisan Tailoring Atelier',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80',
    caption: 'Measuring and drafting bespoke patterns for custom ladies occasion wear.',
    fabricType: 'Pure Linen & Raw Silk'
  },
  {
    id: 'gal-2',
    title: 'Bespoke Evening Gown',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'Emerald evening gown with tailored bodice and flowing pleated skirt.',
    fabricType: 'Silk Chiffon & Satin Lining'
  },
  {
    id: 'gal-3',
    title: 'Princess Birthday Frock',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80',
    caption: 'Handcrafted pastel birthday frock with multi-layered tulle and cotton base.',
    fabricType: 'Soft Tulle & 100% Breathable Cotton'
  },
  {
    id: 'gal-4',
    title: 'Fine Lace & Edge Finishing',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1000&auto=format&fit=crop&q=80',
    caption: 'Intricate floral lace trim and delicate blind-hem stitch details.',
    fabricType: 'Chantilly Lace & Organza'
  },
  {
    id: 'gal-5',
    title: 'Hand-Tailored Floral Dress',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&auto=format&fit=crop&q=80',
    caption: 'Custom silhouette A-line day dress with tailored waist tie and sweetheart collar.',
    fabricType: 'Printed Rayon & Soft Voile'
  },
  {
    id: 'gal-6',
    title: 'Little One Casual Outfit',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop&q=80',
    caption: 'Comfortable play dress with shoulder flutter frills and covered back buttons.',
    fabricType: 'Handloom Cotton'
  },
  {
    id: 'gal-7',
    title: 'Fabric Inspection & Pattern Cut',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80',
    caption: 'Aligning fabric grains and pattern matching before scissors touch cloth.',
    fabricType: 'Tailoring Shears & Pattern Board'
  },
  {
    id: 'gal-8',
    title: 'Traditional Saree Blouse Craft',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80',
    caption: 'Bespoke deep back blouse with handmade dori ties and beaded latkans.',
    fabricType: 'Brocade & Silk Tissue'
  },
  {
    id: 'gal-9',
    title: 'Tailored High-Waist Trouser',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'Sharp front pleats with hidden side pockets and reinforced waistband.',
    fabricType: 'Wool Blend Suiting'
  },
  {
    id: 'gal-10',
    title: 'Precision Sewing & Thread Work',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1000&auto=format&fit=crop&q=80',
    caption: 'Lockstitch detailing, French seams, and edge piping for heirloom durability.',
    fabricType: 'Spun Polyester Threads'
  },
  {
    id: 'gal-11',
    title: 'School & Ceremony Uniform',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop&q=80',
    caption: 'Smart pleated school uniform with neat point collar and deep hem allowance.',
    fabricType: 'Durable Poplin & Twill'
  },
  {
    id: 'gal-12',
    title: 'Hand-Drafted Atelier Master Patterns',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'Tailor curves and individual customer measurement charts kept on record.',
    fabricType: 'Craft Drafting Paper'
  }
];

export const FABRIC_GUIDES: FabricGuide[] = [
  {
    garment: 'Traditional Saree Blouse',
    category: 'Ladies',
    fabricRequirement: '0.8 to 1.0 Meter (Standard 44" width)',
    recommendedFabrics: ['Raw Silk', 'Cotton Brocade', 'Velvet', 'Chanderi'],
    tip: 'If requesting long elbow sleeves or princess cuts with heavy borders, bring 1.0 to 1.2 meters.'
  },
  {
    garment: 'A-Line Knee-Length Dress',
    category: 'Ladies',
    fabricRequirement: '2.0 to 2.5 Meters (44"–54" width)',
    recommendedFabrics: ['Linen', 'Cotton Twill', 'Crepe', 'Rayon Viscose'],
    tip: 'Bring 0.5m extra if you desire wide flared sleeves, a matching belt, or pockets.'
  },
  {
    garment: 'Floor-Length Maxi / Gown',
    category: 'Ladies',
    fabricRequirement: '3.5 to 4.5 Meters',
    recommendedFabrics: ['Chiffon', 'Georgette', 'Satin', 'Modal Silk'],
    tip: 'Full circular flares require at least 4 meters. Don’t forget 3m of matching soft lining.'
  },
  {
    garment: 'Tailored Cigarette or Palazzo Pants',
    category: 'Ladies',
    fabricRequirement: '2.0 to 2.25 Meters',
    recommendedFabrics: ['Cotton Stretch', 'Linen Blend', 'Heavy Crepe', 'Wool Blend'],
    tip: 'Ensure the fabric has slight mechanical give or 2% elastane for maximum seated comfort.'
  },
  {
    garment: 'Kids Party / Birthday Frock (Age 3–8)',
    category: 'Kids',
    fabricRequirement: '1.5 to 2.0 Meters Main + 1.0m Net/Tulle',
    recommendedFabrics: ['Satin Silk', 'Organza', 'Soft Cotton Poplin'],
    tip: 'We always recommend bringing 100% natural cotton for the inner body lining to prevent itching.'
  },
  {
    garment: 'Kids Casual Day Dress / Set (Age 1–5)',
    category: 'Kids',
    fabricRequirement: '1.0 to 1.25 Meters',
    recommendedFabrics: ['Printed Cotton', 'Muslin', 'Linen-Cotton'],
    tip: 'Pre-wash pure cotton fabrics before bringing them in so initial shrinkage does not affect fit.'
  }
];
