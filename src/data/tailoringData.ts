import { ServiceItem, GalleryPhoto, FabricGuide } from '../types';

export const STUDIO_INFO = {
  name: 'S.P. Garment',
  tagline: 'Ladies & Kids Tailor Shop',
  address: 'S.P Garment # 28, Horampalla, Minuwangoda, Western Province, Sri Lanka',
  phone: '011-2283254',
  phoneClean: '0112283254',
  mobile: '077-8778317',
  mobileClean: '0778778317',
  whatsapp: '+94 76 831 8149',
  whatsappRaw: '94768318149',
  mapsDirectUrl: 'https://maps.app.goo.gl/KamrRXZeXZKqi8Ff7',
  mapEmbedUrl: 'https://maps.google.com/maps?q=7.1860292,79.9751599&hl=en&z=17&output=embed',
  hours: [
    { day: 'Monday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Tuesday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Wednesday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Thursday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Friday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Saturday', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'Sunday', time: '09:30 — 17:30', openHour: 9.5, closeHour: 17.5 },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ladies-wear',
    category: 'ladies',
    categoryLabel: 'Ladies Wear',
    title: 'Ladies Wear Custom Tailoring',
    shortDesc: 'Saree blouses, dresses, trousers, skirts and party wear tailored precisely to your measurements.',
    leadTime: '3–7 days',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=75',
    popularItems: [
      'Saree Blouse (Princess cut, Padded, Boat neck, Deep back)',
      'A-line, Maxi and Casual Everyday Dresses',
      'Party Gowns and Evening Function Wear',
      'Palazzo, Cigarette and Wide-leg Trousers',
      'Pencil, Pleated and Wrap Skirts',
      'Traditional Salwar Kameez and Lehenga'
    ],
    details: 'From traditional saree blouses to modern western dresses, everything is tailored to your exact pattern for the most comfortable and flattering fit.'
  },
  {
    id: 'kids-wear',
    category: 'kids',
    categoryLabel: 'Kids Wear',
    title: 'Kids Frocks & Function Sets',
    shortDesc: 'Birthday frocks, party dresses, traditional outfits and school uniforms for your little ones.',
    leadTime: '3–5 days',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=75',
    popularItems: [
      'Flower Girl and Birthday Princess Frocks',
      'Comfortable Cotton Day Frocks and Rompers',
      'Matching Top & Skirt / Pant Sets',
      'Traditional Pattu Pavadai and Kids Sarees',
      'School Uniforms and Preschool Outfits',
      'Ceremony & Family Event Sets'
    ],
    details: 'Soft cotton lining is used throughout so nothing irritates delicate skin, finished to a clean standard that\u2019s comfortable for kids to wear all day.'
  },
  {
    id: 'custom-design',
    category: 'custom',
    categoryLabel: 'Custom Design',
    title: 'Pattern Drafting & Reference Sewing',
    shortDesc: 'Show us any photo or design idea — it will be tailored to match, fitted exactly to your measurements.',
    leadTime: '5–10 days',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=75',
    popularItems: [
      'Pattern drafting from a reference photo you provide',
      'Precise measurements taken for the best fit on your body',
      'Design adjustments and pattern modification',
      'Bridal Retinue and Bridesmaid Dresses',
      'Family Matching Theme Outfits',
      'Custom sewing to any special requirement'
    ],
    details: 'Matched to your chosen fabric and design, with the right lining and finishing, tailored to look exactly the way you pictured it.'
  },
  {
    id: 'alterations',
    category: 'alterations',
    categoryLabel: 'Alterations & Fitting',
    title: 'Fit Adjustments & Restyling',
    shortDesc: 'Hemming, waist and sleeve adjustments, zip replacements and all other alteration work.',
    leadTime: '1–3 days',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=75',
    popularItems: [
      'Dress and Trouser Hemming (length adjustment)',
      'Waist & Hip Resizing (loosening or tightening)',
      'Sleeve Slimming and Armhole Adjustment',
      'Concealed / Heavy-duty Zip Replacement',
      'Seam Reinforcement and Lining Repair',
      'Neckline Reshaping'
    ],
    details: 'Store-bought or previously tailored garments that don\u2019t fit quite right are altered and refitted to sit perfectly on your body.'
  },
  {
    id: 'finishing',
    category: 'finishing',
    categoryLabel: 'Finishing Details',
    title: 'Decorative Finishes & Finishing',
    shortDesc: 'Lace work, piping, frills, pleats and fabric-covered buttons — fine finishing touches.',
    leadTime: '2–4 days',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=75',
    popularItems: [
      'Full and Half Breathable Linings',
      'Tiered Ruffles, Frills and Pleats',
      'Bias Binding and Contrast Piping',
      'Lace Borders and Scalloped Hems',
      'Handmade Fabric Buttons and Bows',
      'Internal Boning and Bra Cup Fitting'
    ],
    details: 'Both the outside and inside of the garment are finished to a clean, thread-free standard with a premium neat-finish stitch quality.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Artisan Tailoring Atelier',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=75',
    caption: 'Pattern drafting and fabric cutting to exact measurements.',
    fabricType: 'Pure Linen & Raw Silk'
  },
  {
    id: 'gal-2',
    title: 'Bespoke Evening Gown',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=75',
    caption: 'An elegant evening gown with a pleated skirt.',
    fabricType: 'Silk Chiffon & Satin Lining'
  },
  {
    id: 'gal-3',
    title: 'Princess Birthday Frock',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=75',
    caption: 'A beautiful birthday frock with soft net and cotton lining.',
    fabricType: 'Soft Tulle & 100% Breathable Cotton'
  },
  {
    id: 'gal-4',
    title: 'Fine Lace & Edge Finishing',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=75',
    caption: 'Delicate lacework and clean, neat finishing.',
    fabricType: 'Chantilly Lace & Organza'
  },
  {
    id: 'gal-5',
    title: 'Hand-Tailored Floral Dress',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=75',
    caption: 'An A-line dress with a fitted waist belt.',
    fabricType: 'Printed Rayon & Soft Voile'
  },
  {
    id: 'gal-6',
    title: 'Little One Casual Outfit',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=75',
    caption: 'A little one\u2019s outfit finished with frill work.',
    fabricType: 'Handloom Cotton'
  },
  {
    id: 'gal-7',
    title: 'Fabric Inspection & Pattern Cut',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=75',
    caption: 'Checking the pattern carefully before cutting the fabric.',
    fabricType: 'Tailoring Shears & Pattern Board'
  },
  {
    id: 'gal-8',
    title: 'Traditional Saree Blouse Craft',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=75',
    caption: 'A saree blouse in a deep-back style.',
    fabricType: 'Brocade & Silk Tissue'
  },
  {
    id: 'gal-9',
    title: 'Tailored High-Waist Trouser',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=75',
    caption: 'A ladies\u2019 trouser with pleats and side pockets.',
    fabricType: 'Wool Blend Suiting'
  },
  {
    id: 'gal-10',
    title: 'Precision Sewing & Thread Work',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=75',
    caption: 'Durable, long-lasting, clean stitch finishing.',
    fabricType: 'Spun Polyester Threads'
  },
  {
    id: 'gal-11',
    title: 'School & Ceremony Uniform',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=75',
    caption: 'A neatly tailored school uniform.',
    fabricType: 'Durable Poplin & Twill'
  },
  {
    id: 'gal-12',
    title: 'Hand-Drafted Atelier Master Patterns',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=75',
    caption: 'Drafting a pattern fitted to each individual customer\u2019s measurements.',
    fabricType: 'Craft Drafting Paper'
  }
];

export const FABRIC_GUIDES: FabricGuide[] = [
  {
    garment: 'Traditional Saree Blouse',
    category: 'Ladies',
    fabricRequirement: '0.8 to 1.0 meters (Standard 44" width)',
    recommendedFabrics: ['Raw Silk', 'Cotton Brocade', 'Velvet', 'Chanderi'],
    tip: 'For elbow-length sleeves or a princess cut, bringing about 1.2 meters is best.'
  },
  {
    garment: 'A-Line Knee-Length Dress',
    category: 'Ladies',
    fabricRequirement: '2.0 to 2.5 meters (44"–54" width)',
    recommendedFabrics: ['Linen', 'Cotton Twill', 'Crepe', 'Rayon Viscose'],
    tip: 'If you want wider sleeves or a fitted belt, bring an extra half meter (0.5m) as well.'
  },
  {
    garment: 'Floor-Length Maxi / Gown',
    category: 'Ladies',
    fabricRequirement: '3.5 to 4.5 meters',
    recommendedFabrics: ['Chiffon', 'Georgette', 'Satin', 'Modal Silk'],
    tip: 'About 4 meters is needed for a wide flare. Bring a separate 3 meters or so for the inner lining.'
  },
  {
    garment: 'Tailored Cigarette or Palazzo Pants',
    category: 'Ladies',
    fabricRequirement: '2.0 to 2.25 meters',
    recommendedFabrics: ['Cotton Stretch', 'Linen Blend', 'Heavy Crepe', 'Wool Blend'],
    tip: 'A fabric with a bit of stretch is best for comfortable everyday wear.'
  },
  {
    garment: 'Kids Party / Birthday Frock (ages 3–8)',
    category: 'Kids',
    fabricRequirement: '1.5–2.0m Main Fabric + 1.0m Net/Tulle',
    recommendedFabrics: ['Satin Silk', 'Organza', 'Soft Cotton Poplin'],
    tip: 'Bring 100% cotton fabric for the inner lining so it\u2019s comfortable for a child to wear.'
  },
  {
    garment: 'Kids Casual Day Dress / Set (ages 1–5)',
    category: 'Kids',
    fabricRequirement: '1.0 to 1.25 meters',
    recommendedFabrics: ['Printed Cotton', 'Muslin', 'Linen-Cotton'],
    tip: 'Washing cotton fabric before sewing helps prevent the garment from shrinking afterward.'
  }
];
