import { ServiceItem, GalleryPhoto, FabricGuide } from '../types';

export const STUDIO_INFO = {
  name: 'S.P. Garment',
  tagline: 'Ladies & Kids Tailor Shop',
  sinhalaTagline: 'කාන්තා සහ ළමා ඇඳුම් මැහුම් සේවය',
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
    { day: 'සඳුදා (Monday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'අඟහරුවාදා (Tuesday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'බදාදා (Wednesday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'බ්‍රහස්පතින්දා (Thursday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'සිකුරාදා (Friday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'සෙනසුරාදා (Saturday)', time: '08:30 — 17:30', openHour: 8.5, closeHour: 17.5 },
    { day: 'ඉරිදා (Sunday)', time: '09:30 — 17:30', openHour: 9.5, closeHour: 17.5 },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ladies-wear',
    category: 'ladies',
    categoryLabel: 'Ladies Wear',
    title: 'Ladies Wear Custom Tailoring',
    shortDesc: 'ඔබේ මිනුමටම ගැලපෙන සාරි හැට්ට, ගවුම්, කලිසම්, සායවල් සහ Party Wear ඉතා පිළිවෙළට මසා දෙනු ලැබේ.',
    leadTime: 'දින 3–7 අතර',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Saree Blouse (Princess cut, Padded, Boat neck, Deep back)',
      'A-line, Maxi සහ Casual Everyday ගවුම්',
      'Party Gowns සහ Evening Function ඇඳුම්',
      'Palazzo, Cigarette සහ Wide-leg Trousers (කලිසම්)',
      'Pencil, Pleated සහ Wrap Skirts (සාය)',
      'Traditional Salwar Kameez සහ Lehenga'
    ],
    details: 'සාම්ප්‍රදායික සාරි හැට්ටයේ සිට නවීන Western Dresses දක්වා, ඔබට වඩාත්ම සුවපහසු ලෙස සහ අලංකාරව ගැලපෙන පරිදි නියමිත pattern අනුව මසා දෙනු ලැබේ.'
  },
  {
    id: 'kids-wear',
    category: 'kids',
    categoryLabel: 'Kids Wear',
    title: 'Kids Frocks & Function Sets',
    shortDesc: 'පුංචි බබාලගේ Birthday Frocks, Party Dresses, සාම්ප්‍රදායික ඇඳුම් සහ පාසල් නිල ඇඳුම් (Uniforms).',
    leadTime: 'දින 3–5 අතර',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Flower Girl සහ Birthday Princess Frocks',
      'සුවපහසු Cotton Day Frocks සහ Rompers',
      'Matching Top & Skirt / Pant Sets',
      'Traditional Pattu Pavadai සහ ළමා සාරි',
      'School Uniforms සහ පෙරපාසල් ඇඳුම්',
      'Ceremony & Family Event Sets'
    ],
    details: 'කුඩා දරුවන්ට ඇඳීමට අපහසු නොවන සේ ඇතුළතට මෘදු Cotton Lining දමා, සමට නොදැනෙන පරිදි ඉතා පිරිසිදු නිමාවකින් මසනු ලැබේ.'
  },
  {
    id: 'custom-design',
    category: 'custom',
    categoryLabel: 'Custom Design',
    title: 'Pattern Drafting & Reference Sewing',
    shortDesc: 'ඔබ කැමති ඕනෑම Photo එකක් හෝ ඩිසයින් එකක් අපිට පෙන්වන්න. ඒ ආකාරයෙන්ම ඔබේ මිනුමට ගැලපෙන සේ මසා දෙනු ලැබේ.',
    leadTime: 'දින 5–10 අතර',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'ඔබ ලබාදෙන Photo එකට අනුව Pattern සකස් කිරීම',
      'ඔබේ සිරුරට වඩාත්ම ගැලපෙන ලෙස නියමිත මිනුම් ලබාගැනීම',
      'Design වෙනස්කම් සහ Pattern Modification',
      'Bridal Retinue සහ Bridesmaid Dresses',
      'Family Matching Theme Outfits',
      'විශේෂ අවශ්‍යතා අනුව කැමති පරිදි ඇඳුම් මැසීම'
    ],
    details: 'ඔබ තෝරාගත් රෙදි වර්ගයට හා ඩිසයින් එකට ගැලපෙන පරිදි, අවශ්‍ය Lining සහ Finishing යොදා ඔබ බලාපොරොත්තු වන පෙනුමෙන්ම මසා දෙනු ලැබේ.'
  },
  {
    id: 'alterations',
    category: 'alterations',
    categoryLabel: 'Alterations & Fitting',
    title: 'Fit Adjustments & Restyling',
    shortDesc: 'ඇඳුම් වල උස අඩු වැඩි කිරීම, ඉණ හා අත් හරිගැස්වීම, අලුතින් Zip දැමීම ඇතුළු සියලුම Alteration කටයුතු.',
    leadTime: 'දින 1–3 අතර',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Dress සහ Trouser Hemming (උස අඩු වැඩි කිරීම)',
      'Waist & Hip Resizing (ඉණ බුරුල් කිරීම හෝ තද කිරීම)',
      'Sleeve Slimming සහ Armhole වෙනස් කිරීම',
      'Concealed / Heavy-duty Zip දැමීම',
      'මැහුම් ශක්තිමත් කිරීම සහ Lining අලුත්වැඩියාව',
      'Neckline (කර) හැඩය වෙනස් කිරීම'
    ],
    details: 'කඩෙන් ගත් හෝ කලින් මසන ලද ඇඳුම් ඔබේ ඇඟට හරි යන්නේ නැත්නම්, ඒවා පිළිවෙළට සකසා (alterations) ඇඟට ගැලපෙන සේ හරිගස්වා දෙනු ලැබේ.'
  },
  {
    id: 'finishing',
    category: 'finishing',
    categoryLabel: 'Finishing Details',
    title: 'Decorative Finishes & Finishing',
    shortDesc: 'Lace ඇල්ලීම, Piping, Frills, Pleats සහ Fabric Buttons වැනි සියුම් මැහුම් නිමාවන්.',
    leadTime: 'දින 2–4 අතර',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
    popularItems: [
      'Full සහ Half Breathable Linings දැමීම',
      'Tiered Ruffles, Frills සහ Pleats වැඩ',
      'Bias Binding සහ Contrast Piping',
      'Lace Borders සහ Scalloped Hems',
      'Handmade Fabric Buttons සහ Bows',
      'Internal Boning සහ Bra Cups සවිකිරීම'
    ],
    details: 'ඇඳුමේ පිටත මෙන්ම ඇතුළත ද නූල් නොඇදෙන සේ පිරිසිදුව, උසස් මැහුම් නිමාවකින් (Neat Finishing) යුතුව මසා දෙනු ලැබේ.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Artisan Tailoring Atelier',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80',
    caption: 'නියමිත මිනුම් අනුව pattern සහ රෙදි කපන ආකාරය.',
    fabricType: 'Pure Linen & Raw Silk'
  },
  {
    id: 'gal-2',
    title: 'Bespoke Evening Gown',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'Pleated Skirt එකක් සහිත අලංකාර Evening Gown එකක්.',
    fabricType: 'Silk Chiffon & Satin Lining'
  },
  {
    id: 'gal-3',
    title: 'Princess Birthday Frock',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1000&auto=format&fit=crop&q=80',
    caption: 'Soft Net හා Cotton Lining සහිත ලස්සන Birthday Frock එකක්.',
    fabricType: 'Soft Tulle & 100% Breathable Cotton'
  },
  {
    id: 'gal-4',
    title: 'Fine Lace & Edge Finishing',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1000&auto=format&fit=crop&q=80',
    caption: 'සියුම් Lace වැඩ හා පිරිසිදු මැහුම් නිමාව.',
    fabricType: 'Chantilly Lace & Organza'
  },
  {
    id: 'gal-5',
    title: 'Hand-Tailored Floral Dress',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&auto=format&fit=crop&q=80',
    caption: 'ඉණට belt එකක් සහිත A-line Dress එකක්.',
    fabricType: 'Printed Rayon & Soft Voile'
  },
  {
    id: 'gal-6',
    title: 'Little One Casual Outfit',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop&q=80',
    caption: 'Frill වැඩ සහිත කුඩා දරුවෙකුගේ ඇඳුමක්.',
    fabricType: 'Handloom Cotton'
  },
  {
    id: 'gal-7',
    title: 'Fabric Inspection & Pattern Cut',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&auto=format&fit=crop&q=80',
    caption: 'රෙදි කැපීමට පෙර pattern එක නිවැරදිව පරීක්ෂා කර බැලීම.',
    fabricType: 'Tailoring Shears & Pattern Board'
  },
  {
    id: 'gal-8',
    title: 'Traditional Saree Blouse Craft',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80',
    caption: 'Deep Back විලාසිතාවේ සාරි හැට්ටයක් (Saree Blouse).',
    fabricType: 'Brocade & Silk Tissue'
  },
  {
    id: 'gal-9',
    title: 'Tailored High-Waist Trouser',
    category: 'ladies',
    categoryName: 'Ladies Wear',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'Pleats හා side pockets සහිත කාන්තා කලිසමක් (Trouser).',
    fabricType: 'Wool Blend Suiting'
  },
  {
    id: 'gal-10',
    title: 'Precision Sewing & Thread Work',
    category: 'details',
    categoryName: 'Finishing Details',
    url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1000&auto=format&fit=crop&q=80',
    caption: 'කල්පවතින ශක්තිමත් පිරිසිදු මැහුම් නිමාව.',
    fabricType: 'Spun Polyester Threads'
  },
  {
    id: 'gal-11',
    title: 'School & Ceremony Uniform',
    category: 'kids',
    categoryName: 'Kids Frocks',
    url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop&q=80',
    caption: 'පිළිවෙළට මසන ලද පාසල් නිල ඇඳුමක්.',
    fabricType: 'Durable Poplin & Twill'
  },
  {
    id: 'gal-12',
    title: 'Hand-Drafted Atelier Master Patterns',
    category: 'custom',
    categoryName: 'Custom Atelier',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
    caption: 'එක් එක් කෙනාගේ මිනුම් වලට ගැලපෙන ලෙස pattern ඇඳීම.',
    fabricType: 'Craft Drafting Paper'
  }
];

export const FABRIC_GUIDES: FabricGuide[] = [
  {
    garment: 'Traditional Saree Blouse (සාරි හැට්ටය)',
    category: 'Ladies',
    fabricRequirement: 'මීටර් 0.8 සිට 1.0 දක්වා (Standard 44" පළල)',
    recommendedFabrics: ['Raw Silk', 'Cotton Brocade', 'Velvet', 'Chanderi'],
    tip: 'වැලමිට ළඟට දිග අත් හෝ Princess Cut සඳහා නම් මීටර් 1.2ක් පමණ රැගෙන ඒම වඩාත් සුදුසුයි.'
  },
  {
    garment: 'A-Line Knee-Length Dress (දණහිස දක්වා)',
    category: 'Ladies',
    fabricRequirement: 'මීටර් 2.0 සිට 2.5 දක්වා (44"–54" පළල)',
    recommendedFabrics: ['Linen', 'Cotton Twill', 'Crepe', 'Rayon Viscose'],
    tip: 'අත් පළල් කර මසන්නේ නම් හෝ belt එකක් අවශ්‍ය නම් තවත් මීටර් භාගයක් (0.5m) අමතරව රැගෙන ඒම වඩාත් සුදුසුයි.'
  },
  {
    garment: 'Floor-Length Maxi / Gown (බිම ගෑවෙන දිග)',
    category: 'Ladies',
    fabricRequirement: 'මීටර් 3.5 සිට 4.5 දක්වා',
    recommendedFabrics: ['Chiffon', 'Georgette', 'Satin', 'Modal Silk'],
    tip: 'පළල් Flare එකක් අවශ්‍ය නම් මීටර් 4ක් පමණ අවශ්‍ය වේ. ඇතුළත lining එක සඳහා වෙනම මීටර් 3ක් පමණ රැගෙන එන්න.'
  },
  {
    garment: 'Tailored Cigarette or Palazzo Pants (කලිසම්)',
    category: 'Ladies',
    fabricRequirement: 'මීටර් 2.0 සිට 2.25 දක්වා',
    recommendedFabrics: ['Cotton Stretch', 'Linen Blend', 'Heavy Crepe', 'Wool Blend'],
    tip: 'ඇඳීමට පහසු වීම සඳහා මදක් ඇදෙන සුළු (stretch) රෙදි වර්ග තෝරාගැනීම වඩාත් සුදුසුයි.'
  },
  {
    garment: 'Kids Party / Birthday Frock (අවුරුදු 3–8)',
    category: 'Kids',
    fabricRequirement: 'මීටර් 1.5–2.0 Main Fabric + 1.0m Net/Tulle',
    recommendedFabrics: ['Satin Silk', 'Organza', 'Soft Cotton Poplin'],
    tip: 'දරුවාට ඇඳීමට අපහසු නොවන සේ ඇතුළත lining එක සඳහා 100% Cotton රෙදි රැගෙන ඒම වඩාත් සුදුසුයි.'
  },
  {
    garment: 'Kids Casual Day Dress / Set (අවුරුදු 1–5)',
    category: 'Kids',
    fabricRequirement: 'මීටර් 1.0 සිට 1.25 දක්වා',
    recommendedFabrics: ['Printed Cotton', 'Muslin', 'Linen-Cotton'],
    tip: 'Cotton රෙදි මසන්නට කලින් වතුර දමා වේලා ගැනීමෙන් (wash කර ගැනීමෙන්) පසුව ඇඳුම හැකිලීම වළක්වා ගත හැක.'
  }
];
