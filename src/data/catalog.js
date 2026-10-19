const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Prendas base. El precio final = precio del diseño + precio base de la prenda (+ ubicación). */
export const GARMENTS = [
  { id: 'camiseta', name: 'Camiseta oversize', detail: 'Algodón peinado 240 g/m²', basePrice: 45000 },
  { id: 'camiseta-vintage', name: 'Camiseta lavado vintage', detail: 'Algodón ring-spun con lavado mineral', basePrice: 52000 },
  { id: 'crewneck', name: 'Buzo crewneck', detail: 'Algodón perchado 320 g/m²', basePrice: 85000 },
  { id: 'hoodie', name: 'Hoodie premium', detail: 'Algodón orgánico con forro 380 g/m²', basePrice: 105000 },
  { id: 'tote', name: 'Tote bag', detail: 'Lona de algodón 320 g/m²', basePrice: 18000 },
];

export const COLORS = [
  { id: 'negro', name: 'Negro', hex: '#1c1c1c' },
  { id: 'blanco-hueso', name: 'Blanco hueso', hex: '#f1ede4' },
  { id: 'gris-carbon', name: 'Gris carbón', hex: '#4a4a4a' },
  { id: 'arena', name: 'Arena', hex: '#d6c7ad' },
  { id: 'verde-oliva', name: 'Verde oliva', hex: '#59603f' },
  { id: 'azul-noche', name: 'Azul noche', hex: '#1f2a3a' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export const SIZE_GUIDE = [
  { size: 'XS', chest: 48, length: 68 },
  { size: 'S', chest: 51, length: 70 },
  { size: 'M', chest: 54, length: 73 },
  { size: 'L', chest: 58, length: 76 },
  { size: 'XL', chest: 62, length: 79 },
  { size: '2XL', chest: 66, length: 82 },
];

export const PLACEMENTS = [
  { id: 'frente', name: 'Frente', detail: '30 × 40 cm', priceDelta: 0 },
  { id: 'espalda', name: 'Espalda', detail: '35 × 45 cm', priceDelta: 6000 },
  { id: 'pecho', name: 'Pecho izquierdo', detail: '10 × 10 cm', priceDelta: 0 },
];

export const CATEGORIES = [
  { id: 'linea-continua', name: 'Línea continua', image: img('photo-1521572267360-ee0c2909d518', 600) },
  { id: 'botanico', name: 'Botánico', image: img('photo-1556905055-8f358a7a47b2', 600) },
  { id: 'tipografico', name: 'Tipográfico', image: img('photo-1503342217505-b0a15ec3261c', 600) },
  { id: 'geometrico', name: 'Geométrico', image: img('photo-1578587018452-892bacefd3f2', 600) },
  { id: 'zen', name: 'Zen', image: img('photo-1583743814966-8936f5b7be1a', 600) },
];

export const SEED_CREATORS = [
  {
    id: 'c1',
    name: 'Atelier Minimal',
    handle: '@atelierminimal',
    city: 'Medellín',
    avatar: img('photo-1507003211169-0a1dd7228f2d', 200),
    banner: img('photo-1541701494587-cb58502866ab', 1600),
    bio: 'Líneas limpias, tipografía suiza y composiciones botánicas contemporáneas. Cada pieza parte de un boceto a mano.',
    specialties: ['Botánico', 'Tipografía'],
    rating: 4.9,
    salesCount: 384,
    verified: true,
    responseTime: 'Responde en menos de 2 h',
  },
  {
    id: 'c2',
    name: 'Studio Kanso',
    handle: '@studiokanso',
    city: 'Bogotá',
    avatar: img('photo-1534528741775-53994a69daeb', 200),
    banner: img('photo-1579783902614-a3fb3927b675', 1600),
    bio: 'Trazo zen japonés, arte de una sola línea y sobriedad monocromática. Diseños pensados para durar.',
    specialties: ['Línea continua', 'Zen'],
    rating: 5.0,
    salesCount: 520,
    verified: true,
    responseTime: 'Responde en menos de 1 h',
  },
  {
    id: 'c3',
    name: 'Mono Typo Lab',
    handle: '@monotypo',
    city: 'Cali',
    avatar: img('photo-1517841905240-472988babdf9', 200),
    banner: img('photo-1509198397868-475647b2a1e5', 1600),
    bio: 'Editorialismo gráfico, grillas asimétricas y declaraciones de autor en blanco y negro.',
    specialties: ['Tipográfico'],
    rating: 4.8,
    salesCount: 295,
    verified: true,
    responseTime: 'Responde en menos de 3 h',
  },
  {
    id: 'c4',
    name: 'Forma & Espacio',
    handle: '@forma.espacio',
    city: 'Bogotá',
    avatar: img('photo-1494790108377-be9c29b29330', 200),
    banner: img('photo-1550684848-fac1c5b4e853', 1600),
    bio: 'Geometría arquitectónica, curvas orgánicas y paletas neutras tierra y carbón.',
    specialties: ['Geométrico'],
    rating: 4.7,
    salesCount: 210,
    verified: false,
    responseTime: 'Responde en menos de 4 h',
  },
];

export const SEED_PRODUCTS = [
  {
    id: 'p1',
    title: 'Figura en línea continua',
    creatorId: 'c2',
    category: 'linea-continua',
    designPrice: 32000,
    garments: ['camiseta', 'camiseta-vintage', 'crewneck', 'hoodie', 'tote'],
    colors: ['blanco-hueso', 'negro', 'arena'],
    images: [img('photo-1521572267360-ee0c2909d518'), img('photo-1579783902614-a3fb3927b675')],
    description: 'Una figura humana dibujada sin levantar el trazo. Serigrafía tacto cero con tinta base agua en negro carbón.',
    technique: 'Serigrafía tacto cero, tinta base agua',
    tags: ['línea', 'figura', 'monocromo'],
    rating: 4.9,
    reviews: 94,
    createdAt: '2026-08-20',
  },
  {
    id: 'p2',
    title: 'Geometría botánica Nº 4',
    creatorId: 'c1',
    category: 'botanico',
    designPrice: 38000,
    garments: ['hoodie', 'crewneck', 'camiseta'],
    colors: ['gris-carbon', 'blanco-hueso', 'verde-oliva'],
    images: [img('photo-1556905055-8f358a7a47b2'), img('photo-1607604276583-eef5d076aa5f')],
    description: 'Flora silvestre contenida en una retícula arquitectónica. Acabado mate y relieve sutil.',
    technique: 'Impresión DTG con acabado mate',
    tags: ['flores', 'naturaleza', 'retícula'],
    rating: 4.8,
    reviews: 68,
    createdAt: '2026-07-14',
  },
  {
    id: 'p3',
    title: 'Grilla suiza 1968',
    creatorId: 'c3',
    category: 'tipografico',
    designPrice: 35000,
    garments: ['camiseta-vintage', 'camiseta', 'tote'],
    colors: ['negro', 'gris-carbon', 'blanco-hueso'],
    images: [img('photo-1503342217505-b0a15ec3261c'), img('photo-1541701494587-cb58502866ab')],
    description: 'Tipografía grotesca sobre una grilla matemática asimétrica, inspirada en los carteles suizos de los 60.',
    technique: 'Estampado por descarga (discharge)',
    tags: ['suizo', 'editorial', 'cartel'],
    rating: 5.0,
    reviews: 112,
    createdAt: '2026-06-02',
  },
  {
    id: 'p4',
    title: 'Ensō',
    creatorId: 'c2',
    category: 'zen',
    designPrice: 30000,
    garments: ['camiseta', 'hoodie'],
    colors: ['negro', 'blanco-hueso'],
    images: [img('photo-1583743814966-8936f5b7be1a'), img('photo-1618005182384-a83a8bd57fbe')],
    description: 'El círculo zen trazado en un solo gesto de pincel: equilibrio, vacío y fuerza.',
    technique: 'Serigrafía tacto cero, tinta base agua',
    tags: ['círculo', 'pincel', 'japón'],
    rating: 4.8,
    reviews: 47,
    createdAt: '2026-09-10',
  },
  {
    id: 'p5',
    title: 'Arco y sombra',
    creatorId: 'c4',
    category: 'geometrico',
    designPrice: 36000,
    garments: ['crewneck', 'hoodie', 'camiseta'],
    colors: ['arena', 'azul-noche', 'blanco-hueso'],
    images: [img('photo-1578587018452-892bacefd3f2'), img('photo-1550684848-fac1c5b4e853')],
    description: 'Estudio de luz y sombra sobre arcos, en planos monocromáticos terrosos.',
    technique: 'Serigrafía en tintas ecológicas',
    tags: ['arquitectura', 'arco', 'tierra'],
    rating: 4.7,
    reviews: 35,
    createdAt: '2026-05-22',
  },
  {
    id: 'p6',
    title: 'Less is more',
    creatorId: 'c3',
    category: 'tipografico',
    designPrice: 26000,
    garments: ['tote', 'camiseta'],
    colors: ['blanco-hueso', 'negro'],
    images: [img('photo-1544816155-12df9643f363')],
    description: 'Homenaje tipográfico al modernismo. Ideal sobre lona cruda de alta densidad.',
    technique: 'Serigrafía artesanal',
    tags: ['bauhaus', 'frase', 'modernismo'],
    rating: 4.9,
    reviews: 78,
    createdAt: '2026-04-30',
  },
  {
    id: 'p7',
    title: 'Hojas de olivo',
    creatorId: 'c1',
    category: 'botanico',
    designPrice: 34000,
    garments: ['camiseta', 'tote', 'crewneck'],
    colors: ['arena', 'blanco-hueso', 'verde-oliva'],
    images: [img('photo-1576566588028-4147f3842f27')],
    description: 'Una rama de olivo en trazo fino, ubicada con mucho aire alrededor.',
    technique: 'Impresión DTG de alta definición',
    tags: ['olivo', 'rama', 'fino'],
    rating: 4.6,
    reviews: 21,
    createdAt: '2026-10-10',
  },
  {
    id: 'p8',
    title: 'Horizonte mínimo',
    creatorId: 'c4',
    category: 'geometrico',
    designPrice: 32000,
    garments: ['camiseta', 'hoodie'],
    colors: ['azul-noche', 'gris-carbon', 'blanco-hueso'],
    images: [img('photo-1620799140408-edc6dcb6d633')],
    description: 'Una línea, un círculo y un horizonte. La composición más simple de la colección.',
    technique: 'Serigrafía tacto cero',
    tags: ['sol', 'horizonte', 'círculo'],
    rating: 4.7,
    reviews: 18,
    createdAt: '2026-10-05',
  },
];

export const PROJECT_TYPES = [
  { id: 'ilustracion', name: 'Ilustración desde cero', description: 'Un diseño original creado a partir de tu idea.' },
  { id: 'adaptacion', name: 'Adaptar un diseño existente', description: 'Cambios de color, texto o composición de una pieza publicada.' },
  { id: 'marca', name: 'Marca, evento o grupo', description: 'Piezas para varias prendas: emprendimientos, colegios, eventos.' },
];

export const BUDGETS = [
  { id: '60000-100000', label: '$ 60.000 – $ 100.000' },
  { id: '100000-180000', label: '$ 100.000 – $ 180.000' },
  { id: '180000-350000', label: '$ 180.000 – $ 350.000' },
  { id: '350000+', label: 'Más de $ 350.000' },
];

export const SEED_REQUESTS = [
  {
    id: 'req_seed_1',
    buyerId: 'u_demo_buyer',
    buyerName: 'Sofía Morales',
    buyerEmail: 'comprador@vipwear.co',
    creatorId: 'c2',
    projectType: 'ilustracion',
    garment: 'Camiseta oversize',
    quantity: 2,
    budget: '100000-180000',
    deadline: '2026-11-05',
    description:
      'Quiero una rama de olivo en trazo continuo con una frase corta en tipografía sobria, para la espalda de dos camisetas blanco hueso.',
    reference: '',
    status: 'pendiente',
    response: '',
    createdAt: '2026-10-16T15:20:00-05:00',
  },
];

export const DEPARTMENTS = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
  'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila',
  'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada',
];

export const PAYMENT_METHODS = [
  { id: 'pse', name: 'PSE', description: 'Débito desde tu cuenta bancaria' },
  { id: 'tarjeta', name: 'Tarjeta crédito o débito', description: 'Visa, Mastercard, American Express' },
  { id: 'nequi', name: 'Nequi', description: 'Paga desde la app con tu celular' },
  { id: 'contraentrega', name: 'Pago contra entrega', description: 'Disponible en ciudades principales' },
];

export const HERO_IMAGES = {
  main: img('photo-1521572267360-ee0c2909d518', 1200),
  secondary: img('photo-1583743814966-8936f5b7be1a', 700),
  auth: img('photo-1503342217505-b0a15ec3261c', 1400),
};

export const getGarment = (id) => GARMENTS.find((g) => g.id === id);
export const getColor = (id) => COLORS.find((c) => c.id === id);
export const getPlacement = (id) => PLACEMENTS.find((p) => p.id === id);
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const getProjectType = (id) => PROJECT_TYPES.find((p) => p.id === id);
export const getBudget = (id) => BUDGETS.find((b) => b.id === id);
