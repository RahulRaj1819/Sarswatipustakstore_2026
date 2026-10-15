import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // Academic & NCERT Books
  {
    id: 'prod-001',
    sku: 'NCERT-SCI-10',
    name: 'NCERT Science Textbook for Class 10',
    slug: 'ncert-science-textbook-class-10',
    category: 'school-ncert',
    subcategory: 'Class 10',
    description: 'Official NCERT Science textbook for CBSE and State Board Class 10 students. Covers Physics, Chemistry, and Biology chapters with illustrated diagrams, solved examples, and practice exercises.',
    price: 195,
    mrp: 195,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'NCERT',
    publisher: 'National Council of Educational Research and Training',
    isbn: '978-8174506399',
    classGrade: 'Class 10',
    board: 'NCERT / CBSE',
    subject: 'Science',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.8,
    reviewCount: 38,
    tags: ['ncert', 'science', 'class 10', 'cbse', 'board exam', 'textbook'],
    specifications: {
      'Board': 'CBSE / NCERT / Bihar Board',
      'Class': '10th Standard',
      'Language': 'English / Hindi available',
      'Binding': 'Paperback',
      'Publisher': 'NCERT New Delhi'
    },
    weightGrams: 420,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-002',
    sku: 'NCERT-MATH-10',
    name: 'NCERT Mathematics Textbook for Class 10',
    slug: 'ncert-mathematics-class-10',
    category: 'school-ncert',
    subcategory: 'Class 10',
    description: 'Comprehensive NCERT Mathematics textbook covering Real Numbers, Polynomials, Quadratic Equations, Trigonometry, and Statistics.',
    price: 160,
    mrp: 160,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'NCERT',
    publisher: 'NCERT',
    isbn: '978-8174506344',
    classGrade: 'Class 10',
    board: 'NCERT / CBSE',
    subject: 'Mathematics',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    tags: ['ncert', 'maths', 'mathematics', 'class 10', 'cbse'],
    specifications: {
      'Board': 'CBSE / State Boards',
      'Class': 'Class 10',
      'Binding': 'Paperback',
      'Pages': '330 Pages'
    },
    weightGrams: 450,
    createdAt: '2026-01-11T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-003',
    sku: 'BSEB-GANIT-09',
    name: 'Bihar Board Ganit Class 9 (BSTBPC Official)',
    slug: 'bihar-board-ganit-class-9',
    category: 'bihar-board',
    subcategory: 'Class 9',
    description: 'Official Bihar State Text Book Publishing Corporation (BSTBPC) textbook for Class 9 Mathematics. Prepared according to the latest Bihar School Examination Board syllabus in Hindi medium.',
    price: 125,
    mrp: 125,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'BSTBPC',
    publisher: 'Bihar State Text Book Publishing Corp Ltd',
    classGrade: 'Class 9',
    board: 'Bihar Board',
    subject: 'Mathematics',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 19,
    tags: ['bihar board', 'bseb', 'class 9', 'ganit', 'maths'],
    specifications: {
      'Board': 'Bihar School Examination Board (BSEB)',
      'Language': 'Hindi',
      'Class': '9th Standard'
    },
    weightGrams: 360,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-004',
    sku: 'COMP-LUCENT-GK',
    name: 'Lucent\'s General Knowledge (Latest Edition)',
    slug: 'lucents-general-knowledge-latest-edition',
    category: 'competitive-exams',
    subcategory: 'GK & GS',
    description: 'The golden reference book for all competitive examinations including BPSC, SSC CGL/CHSL, Railway RRB, Police, and Defense exams. Exhaustive coverage of Indian History, Geography, Polity, Economy, Science, and General Awareness.',
    price: 245,
    mrp: 290,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Lucent',
    publisher: 'Lucent Publication Patna',
    author: 'Dr. Binay Karna, Manwendra Mukul',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.9,
    reviewCount: 74,
    tags: ['lucent', 'gk', 'general knowledge', 'bpsc', 'ssc', 'railway', 'competition'],
    specifications: {
      'Exam Focus': 'BPSC, SSC, Railway, State PSC, Defence',
      'Language': 'Hindi / English options in stock',
      'Binding': 'Paperback',
      'Pages': '430+'
    },
    weightGrams: 520,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z'
  },
  {
    id: 'prod-005',
    sku: 'COMP-RD-MATH-10',
    name: 'Mathematics for Class 10 by R.D. Sharma',
    slug: 'mathematics-class-10-rd-sharma',
    category: 'academic-books',
    subcategory: 'Class 10 Reference',
    description: 'The most trusted and detailed reference book for Class 10 CBSE mathematics. Includes thousands of conceptual problems, step-by-step solutions, board exam past questions, and HOTS problems.',
    price: 620,
    mrp: 695,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Dhanpat Rai',
    publisher: 'Dhanpat Rai Publications',
    author: 'Dr. R.D. Sharma',
    classGrade: 'Class 10',
    board: 'NCERT / CBSE',
    subject: 'Mathematics',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 52,
    tags: ['rd sharma', 'maths reference', 'class 10', 'cbse'],
    weightGrams: 980,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-006',
    sku: 'COMP-WREN-MARTIN',
    name: 'Wren & Martin High School English Grammar & Composition',
    slug: 'wren-and-martin-high-school-english-grammar',
    category: 'academic-books',
    subcategory: 'English Language',
    description: 'Definitive English grammar handbook for secondary students, competitive aspirants, and language learners. Explains tenses, syntax, vocabulary, comprehension, and composition systematically.',
    price: 360,
    mrp: 410,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'S. Chand',
    publisher: 'S. Chand Publishing',
    author: 'P.C. Wren & H. Martin',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 31,
    tags: ['grammar', 'english', 'wren and martin', 's chand', 'school'],
    weightGrams: 610,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-007',
    sku: 'NCERT-PHY-11-P1',
    name: 'NCERT Physics Class 11 Part 1 & Part 2 Set',
    slug: 'ncert-physics-class-11-set',
    category: 'school-ncert',
    subcategory: 'Class 11 Science',
    description: 'Official NCERT Physics textbook set for Class 11 Science stream. Essential for JEE Main, NEET, and CBSE board examination foundations.',
    price: 320,
    mrp: 320,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'NCERT',
    publisher: 'NCERT',
    classGrade: 'Class 11',
    board: 'NCERT / CBSE',
    subject: 'Physics',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 18,
    tags: ['physics', 'ncert', 'class 11', 'jee', 'neet'],
    weightGrams: 750,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // ==========================================
  // DEDICATED SPORTS & FITNESS DEPARTMENT
  // ==========================================

  // --- A. Cricket ---
  {
    id: 'prod-010',
    sku: 'SPORT-BAT-KASHMIR',
    name: 'Kashmir Willow Cricket Bat (Full Size, Singapore Cane Handle)',
    slug: 'kashmir-willow-cricket-bat-full-size',
    category: 'sports-cricket',
    subcategory: 'Cricket Bats (Kashmir Willow)',
    description: 'Handcrafted premium Kashmir Willow cricket bat with Singapore cane handle for supreme shock absorption. Thick 38-40mm edges and curved blade engineered for powerful club, school, and tournament play.',
    price: 1350,
    mrp: 1799,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'SG / SS Sports Series',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.8,
    reviewCount: 26,
    tags: ['cricket bat', 'kashmir willow', 'sports', 'cricket', 'siwan'],
    sportType: 'Cricket',
    sportAttributes: {
      batType: 'Kashmir Willow Short Handle',
      dimensions: 'Full Size / Short Handle',
      targetLevel: 'Intermediate / Club / School'
    },
    specifications: {
      'Material': 'Selected Grade Kashmir Willow',
      'Size': 'Full Size (Short Handle)',
      'Handle': 'Round 3-piece Singapore Cane Handle with Chevron Grip',
      'Edge Thickness': '38mm - 40mm',
      'Suitable For': 'Leather ball & heavy tennis ball'
    },
    weightGrams: 1180,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-02',
    sku: 'SPORT-BAT-TENNIS-SCOOP',
    name: 'Hard Tennis Cricket Bat (Double Blade Scoop, Full Cane)',
    slug: 'hard-tennis-cricket-bat-scoop',
    category: 'sports-cricket',
    subcategory: 'Tennis-Ball Heavy Bats',
    description: 'Aerodynamic scooped profile Kashmir Willow bat engineered specifically for hard tennis ball tournaments. Feather-light pickup with explosive rebound speed for maximum sixes in local village tournaments.',
    price: 899,
    mrp: 1199,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'DSC',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 31,
    tags: ['tennis bat', 'scoop bat', 'hard tennis cricket', 'gully cricket'],
    sportType: 'Cricket',
    sportAttributes: {
      batType: 'Hard Tennis Scooped Bat',
      dimensions: 'Full Size (34 inches)',
      targetLevel: 'Gully & Tournament Tennis Cricket'
    },
    weightGrams: 1040,
    createdAt: '2026-01-21T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-011',
    sku: 'SPORT-BALL-COSCO',
    name: 'Cosco Light Cricket Tennis Ball (Pack of 3 - Yellow)',
    slug: 'cosco-light-cricket-tennis-ball-pack-of-3',
    category: 'sports-cricket',
    subcategory: 'Cricket Balls (Tennis & Leather)',
    description: 'Standard championship quality high-visibility yellow tennis balls for gully, school, and turf cricket matches. Consistent bounce and durable felt covering.',
    price: 240,
    mrp: 270,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Cosco',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 45,
    tags: ['cosco', 'tennis ball', 'cricket ball', 'sports'],
    sportType: 'Cricket',
    sportAttributes: {
      ballType: 'Light Tennis Ball (Cricket Grade)',
      targetLevel: 'Practice / Recreation / Tournament'
    },
    weightGrams: 320,
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-03',
    sku: 'SPORT-BALL-LEATHER-SG',
    name: 'SG Club Leather Cricket Ball - Red (4-Piece 156g)',
    slug: 'sg-club-leather-cricket-ball-red',
    category: 'sports-cricket',
    subcategory: 'Cricket Balls (Tennis & Leather)',
    description: 'Official BCCI school and club standard 4-piece alum tanned leather ball with cork and wool core. Prominent hand-stitched seam for genuine swing and seam movement.',
    price: 440,
    mrp: 499,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'SG',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 19,
    tags: ['leather ball', 'cricket match ball', 'sg club'],
    sportType: 'Cricket',
    sportAttributes: {
      ballType: '4-Piece Leather Ball (Alum Tanned)',
      targetLevel: 'Club / Academy / Match'
    },
    weightGrams: 156,
    createdAt: '2026-01-23T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-04',
    sku: 'SPORT-PADS-SG-ECOLITE',
    name: 'SG Ecolite Cricket Batting Pads (Pair - Mens Size)',
    slug: 'sg-ecolite-cricket-batting-pads',
    category: 'sports-cricket',
    subcategory: 'Batting Pads & Gloves',
    description: 'High-density lightweight foam cane pads with PVC facing and cushioned side wing protection. Breathable vertical bolsters with quick-fastening velcro straps.',
    price: 1150,
    mrp: 1450,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'SG',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 15,
    tags: ['batting pads', 'cricket legguard', 'cricket protection'],
    sportType: 'Cricket',
    sportAttributes: {
      dimensions: 'Adult / Men Standard',
      targetLevel: 'Club & School Tournament'
    },
    weightGrams: 1650,
    createdAt: '2026-01-24T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-05',
    sku: 'SPORT-GLOVES-SG-CLUB',
    name: 'SG Club Cricket Batting Gloves (Pair - Mens)',
    slug: 'sg-club-cricket-batting-gloves',
    category: 'sports-cricket',
    subcategory: 'Batting Pads & Gloves',
    description: 'Cotton palm with reinforced leather wear patches. High-density foam finger rolls with split thumb and soft towelled wristband with velcro closure.',
    price: 650,
    mrp: 799,
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'SG',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 12,
    tags: ['cricket gloves', 'batting gloves', 'sg'],
    sportType: 'Cricket',
    weightGrams: 350,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-06',
    sku: 'SPORT-STUMPS-SET',
    name: 'Hardwood Cricket Stumps & Bails Set (6 Stumps + 4 Bails + Cast Metal Base)',
    slug: 'hardwood-cricket-stumps-and-bails-set',
    category: 'sports-cricket',
    subcategory: 'Stumps & Bails',
    description: 'Complete club regulation cricket wicket set. 6 seasoned hardwood stumps with turned points, 4 bails, and a cast metal portable base for practice on concrete or turf.',
    price: 799,
    mrp: 999,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Sports Pro',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 18,
    tags: ['cricket stumps', 'bails', 'cricket wicket'],
    sportType: 'Cricket',
    weightGrams: 3200,
    createdAt: '2026-01-26T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-kit',
    sku: 'SPORT-COMBO-CRICK-FULL',
    name: 'Complete Cricket Starter Kit & Tournament Combo',
    slug: 'complete-cricket-starter-kit-combo',
    category: 'sports-cricket',
    subcategory: 'Full Cricket Kits & Bags',
    description: 'The ultimate all-in-one cricket package for players and coaching academies: Includes 1 Kashmir Willow Bat, 1 Pair SG Batting Pads, 1 Pair Batting Gloves, 1 Abdominal Guard, 1 SG Club Leather Ball, 3 Cosco Tennis Balls, and a heavy-duty nylon wheeled kit bag.',
    price: 4499,
    mrp: 5899,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'SG / SS Curated Set',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.9,
    reviewCount: 24,
    tags: ['cricket kit', 'cricket combo', 'cricket starter kit', 'sports bundle'],
    sportType: 'Cricket',
    sportAttributes: {
      kitItemsIncluded: [
        '1x Kashmir Willow Match Cricket Bat (Short Handle)',
        '1x Pair SG Batting Legguard Pads',
        '1x Pair SG Batting Gloves',
        '1x High-Impact Abdominal Guard',
        '1x SG Leather Match Ball (Red)',
        '3x Cosco Heavy Cricket Tennis Balls',
        '1x Heavy-Duty Padded Cricket Kit Bag with Shoulder Strap'
      ],
      targetLevel: 'Beginner to Club Level'
    },
    weightGrams: 5200,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-crick-tennis-combo',
    sku: 'SPORT-COMBO-TENNIS-CRICK',
    name: 'Tennis-Ball Cricket Tournament Combo Set',
    slug: 'tennis-ball-cricket-tournament-combo',
    category: 'sports-cricket',
    subcategory: 'Tennis-Ball Heavy Bats',
    description: 'Special tournament pack for local cup competitions: Includes 1 Hard Tennis Scooped Bat, 1 Pack of 6 Cosco Tennis Balls, 1 Spring-loaded Stumps Stand with 3 Stumps, and 2 Grip rolls.',
    price: 1599,
    mrp: 2050,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'DSC / Cosco Bundle',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 30,
    tags: ['tennis cricket combo', 'cricket bundle', 'tournament kit'],
    sportType: 'Cricket',
    sportAttributes: {
      kitItemsIncluded: [
        '1x Scooped Hard-Tennis Willow Bat',
        '6x Cosco Yellow Championship Tennis Balls',
        '3x Stumps with Spring Metal Base',
        '2x Heavy Rubber Grips'
      ]
    },
    weightGrams: 2800,
    createdAt: '2026-02-02T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- B. Football ---
  {
    id: 'prod-012',
    sku: 'SPORT-FOOT-NIVIA',
    name: 'Nivia Storm Football - Size 5 (Rubberized Moulded)',
    slug: 'nivia-storm-football-size-5',
    category: 'sports-football',
    subcategory: 'Footballs (Size 5 & Size 4)',
    description: 'Official Size 5 all-weather football suitable for hard grounds, grass, and artificial turf. 32-panel aerodynamic construction with reinforced butyl bladder for optimal air retention.',
    price: 499,
    mrp: 650,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nivia',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 34,
    tags: ['nivia', 'football', 'size 5', 'sports', 'pachrukhi'],
    sportType: 'Football',
    sportAttributes: {
      ballSize: 'Size 5 (Standard Official)',
      playingSurface: 'Hard Ground, Grass & Turf',
      targetLevel: 'All Surface Training & Matches'
    },
    specifications: {
      'Size': '5 (Standard International)',
      'Construction': 'Moulded 32-panel rubberized surface',
      'Bladder': 'High retention butyl'
    },
    weightGrams: 430,
    createdAt: '2026-01-23T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-foot-studs',
    sku: 'SPORT-FOOT-STUDS-NIVIA',
    name: 'Nivia Carbonite Turf Studs / Football Shoes',
    slug: 'nivia-carbonite-turf-studs-shoes',
    category: 'sports-football',
    subcategory: 'Football Studs & Shoes',
    description: 'High-traction moulded TPU studs engineered for natural grass and mud grounds. Synthetic leather upper with embossed texture for precision ball control and padded collar.',
    price: 899,
    mrp: 1199,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nivia',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 22,
    tags: ['football shoes', 'football studs', 'nivia shoes', 'turf boots'],
    sportType: 'Football',
    variants: [
      { id: 'v-studs-7', name: 'UK Size 7', sku: 'SPORT-STUDS-UK7', price: 899, mrp: 1199, stock: 5, attributes: { size: 'UK 7' } },
      { id: 'v-studs-8', name: 'UK Size 8', sku: 'SPORT-STUDS-UK8', price: 899, mrp: 1199, stock: 8, attributes: { size: 'UK 8' } },
      { id: 'v-studs-9', name: 'UK Size 9', sku: 'SPORT-STUDS-UK9', price: 899, mrp: 1199, stock: 7, attributes: { size: 'UK 9' } }
    ],
    weightGrams: 620,
    createdAt: '2026-01-24T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-foot-shin',
    sku: 'SPORT-FOOT-SHIN-GUARD',
    name: 'Vector X Shin Guards with Cushioned Ankle Protection',
    slug: 'vector-x-shin-guards-with-ankle-sock',
    category: 'sports-football',
    subcategory: 'Shin Guards & Ankle Sleeves',
    description: 'Curved polypropylene front shield absorbs tackle impact. Padded EVA backing and attached elastic stirrup ankle guard for total lower leg defense during match play.',
    price: 299,
    mrp: 399,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Vector X',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 16,
    tags: ['shin guards', 'football protection'],
    sportType: 'Football',
    weightGrams: 210,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-foot-kit',
    sku: 'SPORT-COMBO-FOOTBALL-KIT',
    name: 'Football Training & Team Agility Combo Set',
    slug: 'football-training-team-agility-combo',
    category: 'sports-football',
    subcategory: 'Goal Nets & Ball Bags',
    description: 'Ideal kit for school teams and football academies: Includes 2 Nivia Storm Size 5 Footballs, 10 Agility Disc Cones, 1 Dual-Action Ball Pump with 3 inflation pins, and a heavy-duty mesh carry bag.',
    price: 1499,
    mrp: 1950,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nivia Team Series',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 20,
    tags: ['football combo', 'football kit', 'training kit'],
    sportType: 'Football',
    sportAttributes: {
      kitItemsIncluded: [
        '2x Nivia Storm Size 5 Footballs',
        '10x Fluorescent Agility Marker Cones',
        '1x Dual-Action Air Hand Pump + Extra Needles',
        '1x Heavy-Duty Nylon Mesh Ball Bag (Holds 5 balls)'
      ]
    },
    weightGrams: 1650,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- C. Badminton ---
  {
    id: 'prod-013',
    sku: 'SPORT-BADM-YONEX',
    name: 'Yonex Muscle Power Badminton Racket with Full Cover',
    slug: 'yonex-muscle-power-badminton-racket',
    category: 'sports-badminton',
    subcategory: 'Badminton Rackets',
    description: 'Lightweight isometric aluminium/carbon badminton racket engineered for rapid swings and smash power. Pre-strung with high-tension durable Yonex string. Includes zipped full cover.',
    price: 999,
    mrp: 1290,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Yonex',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 29,
    tags: ['yonex', 'badminton racket', 'badminton', 'sports equipment'],
    sportType: 'Badminton',
    sportAttributes: {
      racketMaterial: 'Isometric Aluminium Frame with Carbon Shaft',
      gripSize: 'G4',
      targetLevel: 'Intermediate / High School / Club'
    },
    specifications: {
      'Frame': 'Isometric Aluminum & Carbon Shaft',
      'Weight': '88g (3U)',
      'Grip Size': 'G4',
      'Cover': 'Full thermal zipper bag included'
    },
    weightGrams: 280,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-014',
    sku: 'SPORT-SHUTTLE-YONEX',
    name: 'Yonex Mavis 350 Nylon Shuttlecock (Tube of 6 - Yellow)',
    slug: 'yonex-mavis-350-nylon-shuttlecock-pack-of-6',
    category: 'sports-badminton',
    subcategory: 'Nylon Shuttlecocks (Mavis 350)',
    description: 'The world\'s most popular durable nylon shuttlecock. Designed to have accurate flight stability, fast recovery, and up to 4-5 times longer durability than traditional feather shuttles.',
    price: 680,
    mrp: 750,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Yonex',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 41,
    tags: ['yonex mavis 350', 'shuttlecock', 'badminton'],
    sportType: 'Badminton',
    sportAttributes: {
      ballType: 'Nylon Shuttlecock with Natural Cork Base',
      targetLevel: 'Club / Academy / Practice'
    },
    weightGrams: 160,
    createdAt: '2026-01-26T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-badm-combo',
    sku: 'SPORT-COMBO-BADM-DOUBLES',
    name: 'Badminton Doubles Racket & Shuttle Combo Set',
    slug: 'badminton-doubles-racket-shuttle-combo',
    category: 'sports-badminton',
    subcategory: 'Badminton Kits & Combo Sets',
    description: 'Everything ready to play doubles: Includes 2 Yonex Muscle Power series rackets with full covers, 1 Tube of 6 Yonex Mavis 350 shuttles, 2 Sweat-absorbent overgrips, and 1 Tournament court net.',
    price: 2499,
    mrp: 3200,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Yonex Combo',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 38,
    tags: ['badminton combo', 'yonex set', 'badminton kit'],
    sportType: 'Badminton',
    sportAttributes: {
      kitItemsIncluded: [
        '2x Yonex Muscle Power Aluminum/Carbon Rackets',
        '2x Full Zipped Racket Covers',
        '1x Tube of 6 Yonex Mavis 350 Nylon Shuttles (Yellow)',
        '1x Tournament Standard Court Net (20ft)',
        '2x Moisture-Absorbing Replacement Grips'
      ]
    },
    weightGrams: 950,
    createdAt: '2026-02-04T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- D. Volleyball ---
  {
    id: 'prod-sp-volley-ball',
    sku: 'SPORT-VOLLEY-COSCO',
    name: 'Cosco Super Volley Volleyball (Official Size 4/5)',
    slug: 'cosco-super-volley-volleyball',
    category: 'sports-volleyball',
    subcategory: 'Volleyballs (Cosco Super Volley)',
    description: 'Championship standard 18-panel laminated composite leather volleyball with soft-touch exterior for pain-free setting and spiking. Outstanding air retention with butyl bladder.',
    price: 699,
    mrp: 850,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Cosco',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 21,
    tags: ['volleyball', 'cosco super volley', 'sports bhandar pachrukhi'],
    sportType: 'Volleyball',
    sportAttributes: {
      ballSize: 'Size 4/5 (Official Match Standard)',
      playingSurface: 'Indoor Wooden Courts & Outdoor Grounds'
    },
    weightGrams: 280,
    createdAt: '2026-01-27T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-volley-net',
    sku: 'SPORT-VOLLEY-NET',
    name: 'Heavy Duty Volleyball Court Net with Steel Wire Cord (32x3 ft)',
    slug: 'heavy-duty-volleyball-court-net',
    category: 'sports-volleyball',
    subcategory: 'Volleyball Court Nets',
    description: 'Tournament specification nylon knotted mesh net with heavy white canvas headband and vinyl-coated steel cable for tight court tensioning. Weatherproof and tear-resistant.',
    price: 549,
    mrp: 699,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Spartan / Cosco',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 14,
    tags: ['volleyball net', 'court net'],
    sportType: 'Volleyball',
    weightGrams: 980,
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- E. Basketball ---
  {
    id: 'prod-sp-bask-ball',
    sku: 'SPORT-BASK-SPALDING',
    name: 'Spalding NBA / Nivia Top Grip Basketball (Official Size 7)',
    slug: 'spalding-nivia-top-grip-basketball-size-7',
    category: 'sports-basketball',
    subcategory: 'Basketballs (Size 7 & Size 6)',
    description: 'Deep-channel pebbled surface engineered for maximum shooting grip and fingertip control on concrete outdoor courts as well as indoor hardwood.',
    price: 749,
    mrp: 999,
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nivia / Spalding',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 18,
    tags: ['basketball', 'nivia basketball', 'size 7'],
    sportType: 'Basketball',
    sportAttributes: {
      ballSize: 'Size 7 (Standard Men / Senior)',
      playingSurface: 'All-Weather Outdoor & Indoor'
    },
    weightGrams: 610,
    createdAt: '2026-01-29T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- F. Table Tennis ---
  {
    id: 'prod-sp-tt-bat',
    sku: 'SPORT-TT-BAT-STAG',
    name: 'Stag 4-Star Table Tennis Racket (ITTF Rubber Approved)',
    slug: 'stag-4-star-table-tennis-racket',
    category: 'sports-table-tennis',
    subcategory: 'Table Tennis Rackets (2-Star to 4-Star)',
    description: '5-ply Scandinavian wood blade with ITTF certified pimples-in rubber sponge. Delivers intense topspin and defensive control for school tournaments and club champions.',
    price: 549,
    mrp: 699,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Stag',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 25,
    tags: ['table tennis bat', 'stag ping pong', 'tt bat'],
    sportType: 'Table Tennis',
    sportAttributes: {
      targetLevel: 'Tournament / Advanced Club'
    },
    weightGrams: 195,
    createdAt: '2026-01-30T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-tt-combo',
    sku: 'SPORT-COMBO-TT-DUO',
    name: 'Table Tennis Duo Set (2 Bats, 3 Balls, Spring Net & Case)',
    slug: 'table-tennis-duo-combo-set',
    category: 'sports-table-tennis',
    subcategory: 'Table Tennis Combo Sets',
    description: 'Turn any standard table or dining table into an instant ping-pong battleground: Includes 2 Stag rubber bats, 3 seamless 40+ tournament balls, 1 retractable clamp-on spring net, and 1 zipped travel bag.',
    price: 1199,
    mrp: 1550,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Stag Combo',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 28,
    tags: ['table tennis combo', 'tt set', 'ping pong kit'],
    sportType: 'Table Tennis',
    sportAttributes: {
      kitItemsIncluded: [
        '2x Stag 3-Star Table Tennis Rackets',
        '3x 40+ ITTF Regulation Table Tennis Balls',
        '1x Retractable Spring-Clamp Portable Net',
        '1x Padded Zipper Storage Bag'
      ]
    },
    weightGrams: 750,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- G. Athletics & Track & Field ---
  {
    id: 'prod-sp-ath-baton',
    sku: 'SPORT-ATH-BATONS',
    name: 'Official Anodized Aluminum Relay Batons (Set of 4 Multicolor)',
    slug: 'anodized-aluminum-relay-batons-set-of-4',
    category: 'sports-athletics',
    subcategory: 'Relay Batons (Set of 4)',
    description: 'Championship track and field relay batons. Smooth rolled edges for safe handoffs without cuts. Anodized vibrant scratch-resistant Red, Blue, Gold, and Green colors.',
    price: 499,
    mrp: 650,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nelco',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 16,
    tags: ['relay batons', 'athletics', 'sports day', 'school track'],
    sportType: 'Athletics',
    weightGrams: 340,
    createdAt: '2026-01-31T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-ath-stopwatch',
    sku: 'SPORT-ATH-STOPWATCH',
    name: 'Digital Sports Stopwatch with 1/100s Precision & Lap Memory',
    slug: 'digital-sports-stopwatch-with-lap-timer',
    category: 'sports-athletics',
    subcategory: 'Digital Coach Stopwatches',
    description: 'Essential timing tool for sports teachers, PT masters, and athletic coaches. Features 1/100 second accuracy, split lap timing, calendar clock, alarm, and water-resistant nylon neck lanyard.',
    price: 380,
    mrp: 490,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Casio / Nelco Type',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 27,
    tags: ['stopwatch', 'coach stopwatch', 'sports day timing'],
    sportType: 'Athletics',
    weightGrams: 110,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-ath-whistle',
    sku: 'SPORT-ATH-WHISTLE-FOX40',
    name: 'Fox 40 Classic Pea-less Referee & Coach Whistle (Loud 115dB)',
    slug: 'fox-40-classic-pealess-referee-whistle',
    category: 'sports-athletics',
    subcategory: 'Pea-less Referee Whistles',
    description: 'The world\'s most dependable referee whistle. 3-chamber pea-less design cannot jam or freeze. Pierces through stadium noise and crowd sound up to 1 mile away.',
    price: 199,
    mrp: 260,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Fox 40',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 39,
    tags: ['whistle', 'referee whistle', 'sports day whistle'],
    sportType: 'Athletics',
    weightGrams: 60,
    createdAt: '2026-02-02T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-017',
    sku: 'SPORT-OUTDOOR-ROPE',
    name: 'Outdoor Tug of War Rope - Heavy Duty (20 Meters)',
    slug: 'outdoor-tug-of-war-rope-20m',
    category: 'sports-athletics',
    subcategory: 'Athletic Training Equipment',
    description: 'Thick 32mm natural jute/cotton rope with taped soft-grip ends for school sports days, community tournaments, and athletics.',
    price: 1199,
    mrp: 1499,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Athletic Pro',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 11,
    tags: ['tug of war', 'outdoor games', 'sports day', 'school athletic'],
    sportType: 'Athletics',
    weightGrams: 3800,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-ath-sportsday-pkg',
    sku: 'SPORT-COMBO-SPORTS-DAY',
    name: 'School Sports-Day Supplies Package',
    slug: 'school-sports-day-supplies-package',
    category: 'sports-athletics',
    subcategory: 'School Sports-Day Supplies',
    description: 'Everything essential for hosting an inter-house annual sports meet: 4 Aluminum Relay Batons, 2 Digital Stopwatches, 3 Loud Pea-less Whistles, 1 50m Fiberglass Measuring Tape, and 1 Tug of War Rope.',
    price: 2499,
    mrp: 3200,
    stock: 7,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Curated Sports',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 19,
    tags: ['sports day package', 'school athletics kit', 'sports day bundle'],
    sportType: 'Athletics',
    sportAttributes: {
      kitItemsIncluded: [
        '4x Multicolor Aluminum Relay Batons',
        '2x Precision Digital Stopwatches with Lanyards',
        '3x High-Pitch Coach Whistles',
        '1x 50-Meter Field Measuring Tape',
        '1x Heavy-Duty Tug of War Rope (20m)'
      ]
    },
    weightGrams: 4800,
    createdAt: '2026-02-06T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- H. Fitness & Exercise ---
  {
    id: 'prod-sp-fit-rope',
    sku: 'SPORT-FIT-ROPE-SPEED',
    name: 'High-Speed Ball Bearing Skipping Rope (Adjustable Steel Cable)',
    slug: 'high-speed-ball-bearing-skipping-rope',
    category: 'sports-fitness',
    subcategory: 'Skipping Ropes (Ball-Bearing High Speed)',
    description: '360-degree smooth ball bearing rotation mechanism prevents tangling. 3-meter tangle-free PVC-coated wire rope easily adjustable for kids, teens, and adults. Anti-slip memory foam handles.',
    price: 249,
    mrp: 399,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Boldfit / Kobo',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 52,
    tags: ['skipping rope', 'jump rope', 'cardio fitness'],
    sportType: 'Fitness',
    weightGrams: 180,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-fit-mat',
    sku: 'SPORT-FIT-YOGA-MAT',
    name: 'Anti-Skid 10mm EVA Yoga & Workout Mat with Carry Strap',
    slug: 'anti-skid-10mm-eva-yoga-workout-mat',
    category: 'sports-fitness',
    subcategory: 'Anti-Skid Yoga & Workout Mats (10mm)',
    description: 'Extra thick 10mm high-density cushioned EVA mat protects spine, hips, knees, and elbows on hard floors. Double-sided non-slip ribbed texture with free elastic carrying strap.',
    price: 549,
    mrp: 799,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Strauss / Kobo',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 34,
    tags: ['yoga mat', 'exercise mat', 'home workout'],
    sportType: 'Fitness',
    specifications: {
      'Thickness': '10mm Extra Thick Cushioning',
      'Dimensions': '6 feet x 2 feet (183cm x 61cm)',
      'Material': 'Eco-Friendly EVA Foam'
    },
    weightGrams: 850,
    createdAt: '2026-02-04T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-fit-gripper',
    sku: 'SPORT-FIT-HAND-GRIP',
    name: 'Adjustable Hand Grip Strengthener (10kg - 60kg Resistance)',
    slug: 'adjustable-hand-grip-strengthener-10-60kg',
    category: 'sports-fitness',
    subcategory: 'Hand Grip Strengtheners',
    description: 'Heavy duty carbon steel spring with dial resistance adjustment from 10kg to 60kg. Ergonomic rubber grip handle builds forearm, wrist, and finger strength for cricket, badminton, and gym.',
    price: 199,
    mrp: 349,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Kobo',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 29,
    tags: ['hand gripper', 'wrist strengthener', 'fitness'],
    sportType: 'Fitness',
    weightGrams: 150,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-fit-combo',
    sku: 'SPORT-COMBO-FITNESS-KIT',
    name: 'Home Workout & Fitness Starter Kit Combo',
    slug: 'home-workout-fitness-starter-kit-combo',
    category: 'sports-fitness',
    subcategory: 'Home Workout Kits',
    description: 'Complete daily fitness package for students and fitness enthusiasts: Includes 1 10mm Yoga Mat, 1 Ball-Bearing High-Speed Skipping Rope, 1 Adjustable 10-60kg Hand Gripper, and 1 Set of 5 Resistance Loop Bands.',
    price: 1099,
    mrp: 1599,
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Fitness Starter Pro',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 22,
    tags: ['fitness combo', 'home workout kit', 'starter kit'],
    sportType: 'Fitness',
    sportAttributes: {
      kitItemsIncluded: [
        '1x Extra Thick 10mm Cushioned Workout Mat',
        '1x Ball-Bearing Adjustable Skipping Rope',
        '1x Adjustable 10kg - 60kg Hand Grip Strengthener',
        '1x Set of 5 Resistance Bands with Carrying Pouch'
      ]
    },
    weightGrams: 1450,
    createdAt: '2026-02-07T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- I. Indoor & Traditional Games ---
  {
    id: 'prod-015',
    sku: 'SPORT-CARROM-32',
    name: 'Indoor Carrom Board - Full Size 32 inch (With Coins, Striker & Powder)',
    slug: 'indoor-carrom-board-full-size-32-inch',
    category: 'sports-indoor-games',
    subcategory: 'Carrom Boards (32" Champion Size)',
    description: 'Handcrafted Assam plywood carrom board with smooth waterproof playing surface, reinforced wooden back support, and heavy 2-inch hardwood border. Complete set includes deluxe wooden coins, acrylic striker, and boric carrom powder.',
    price: 1850,
    mrp: 2400,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Signature Sports',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 22,
    tags: ['carrom board', 'indoor games', 'carrom', 'pachrukhi'],
    sportType: 'Indoor Games',
    specifications: {
      'Frame Size': '32 x 32 inches (Standard Play)',
      'Border Width': '2 inches Hardwood',
      'Surface': 'Waterproof English/Assam Ply Finish',
      'Accessories Included': 'Wooden Coins set, 1 Striker, 1 Powder Bottle'
    },
    weightGrams: 6500,
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-016',
    sku: 'SPORT-CHESS-WOOD',
    name: 'Indoor Chess Set - Wooden Folding Board (12x12 inch Magnetic)',
    slug: 'wooden-folding-chess-set-12-inch',
    category: 'sports-indoor-games',
    subcategory: 'Solid Wooden Chess Sets (Magnetic)',
    description: 'Solid Sheesham and Boxwood handcrafted folding chess board with magnetic pieces. Velvet-lined interior compartments keep each piece protected during travel and storage.',
    price: 649,
    mrp: 850,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Royal Chess Craft',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 16,
    tags: ['chess', 'wooden chess', 'indoor games', 'board games'],
    sportType: 'Indoor Games',
    weightGrams: 750,
    createdAt: '2026-01-29T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-ind-combo',
    sku: 'SPORT-COMBO-INDOOR-GAMES',
    name: 'Deluxe Indoor Games & Traditional Board Combo',
    slug: 'deluxe-indoor-games-board-combo',
    category: 'sports-indoor-games',
    subcategory: 'Indoor Games Combo',
    description: 'Perfect family recreation bundle: Includes 1 Full-Size 32" Assam Ply Carrom Board with Coins & Striker, 1 Solid Wooden Folding Magnetic Chess Set, 1 2-in-1 Ludo + Snakes & Ladders, and 2 decks of Plastic Coated Playing Cards.',
    price: 2799,
    mrp: 3600,
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Traditional Play',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 31,
    tags: ['indoor games combo', 'carrom chess ludo combo', 'board games kit'],
    sportType: 'Indoor Games',
    sportAttributes: {
      kitItemsIncluded: [
        '1x 32-inch Assam Ply Carrom Board with Coins, Striker & Powder',
        '1x 12x12 inch Wooden Folding Magnetic Chess Set',
        '1x 2-in-1 Wooden Ludo & Snakes and Ladders Board',
        '2x Decks Premium Plastic Playing Cards'
      ]
    },
    weightGrams: 7800,
    createdAt: '2026-02-08T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- J. School Sports & Physical Education ---
  {
    id: 'prod-sp-school-pe-kit',
    sku: 'SPORT-COMBO-SCHOOL-PE',
    name: 'School Physical Education (PE) & Sports Equipment Package',
    slug: 'school-physical-education-pe-equipment-package',
    category: 'sports-school-pe',
    subcategory: 'Complete Primary School PE Kit',
    description: 'Standard comprehensive PE equipment package designed for primary & secondary schools, coaching centres, and physical education masters: Includes 2 Footballs (Nivia), 2 Volleyballs (Cosco), 1 Court Volleyball Net, 2 Badminton Rackets + 1 Tube Shuttles, 4 Relay Batons, 20 Marker Cones, 2 Fox 40 Whistles, 1 High-Speed Skipping Rope, 1 Tug of War Rope, and 1 Dual Air Pump.',
    price: 5999,
    mrp: 7800,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Curated Sports',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.9,
    reviewCount: 15,
    tags: ['school pe kit', 'sports kit for schools', 'physical education kit', 'bulk sports siwan'],
    sportType: 'School PE',
    sportAttributes: {
      kitItemsIncluded: [
        '2x Nivia Storm Footballs (Size 5)',
        '2x Cosco Super Volley Volleyballs',
        '1x Heavy-Duty Tournament Volleyball Net',
        '2x Badminton Rackets + 1 Tube Mavis 350 Shuttles',
        '4x Multicolor Aluminum Relay Batons',
        '20x Field Training Cones & Markers',
        '2x Fox 40 Classic Whistles with Neck Cords',
        '1x 20-Meter Heavy Tug of War Rope',
        '1x Dual-Action Air Pump with Needles',
        '1x Giant Equipment Storage Duffle Sack'
      ],
      targetLevel: 'CBSE / BSEB School PE Departments'
    },
    weightGrams: 9800,
    createdAt: '2026-02-09T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-school-bibs',
    sku: 'SPORT-SCHOOL-BIBS-12',
    name: 'Team Practice Sports Bibs / Training Vests (Set of 12)',
    slug: 'team-practice-sports-bibs-vests-set-of-12',
    category: 'sports-school-pe',
    subcategory: 'Team Practice Bibs / Vests (Set of 12)',
    description: 'Breathable fluorescent micro-mesh polyester training pinnies for football, cricket, and school team scrimmages. Machine washable and quick drying. Set of 12 numbered vests.',
    price: 999,
    mrp: 1350,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Vector X / Nivia',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 18,
    tags: ['sports bibs', 'training pinnies', 'team vests', 'school sports'],
    sportType: 'School PE',
    weightGrams: 750,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // --- K. Sportswear & Accessories ---
  {
    id: 'prod-sp-acc-bottle',
    sku: 'SPORT-ACC-BOTTLE-1000',
    name: 'Stainless Steel Sports Sipper Bottle (1000ml / 1 Litre)',
    slug: 'stainless-steel-sports-sipper-bottle-1000ml',
    category: 'sports-accessories',
    subcategory: 'Stainless Steel Water Bottles (1 Litre)',
    description: 'Food-grade 304 stainless steel single-wall sports hydration bottle with leakproof flip straw lid and integrated carry loop. Keeps water clean and odor-free for long cricket matches and training.',
    price: 349,
    mrp: 499,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Boldfit / Milton',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 36,
    tags: ['water bottle', 'sports bottle', 'steel sipper'],
    sportType: 'Accessories',
    weightGrams: 280,
    createdAt: '2026-02-11T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-acc-gymbag',
    sku: 'SPORT-ACC-GYMBAG',
    name: 'Multi-Compartment Sports Duffel & Gym Bag (With Shoe Pocket)',
    slug: 'multi-compartment-sports-duffel-gym-bag',
    category: 'sports-accessories',
    subcategory: 'Multi-Compartment Sports Duffel Bags',
    description: 'Water-resistant nylon sports duffle with separate ventilated shoe compartment, wet towel pocket, dual carry handles, and padded detachable shoulder strap.',
    price: 649,
    mrp: 899,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Nivia / Boldfit',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 28,
    tags: ['gym bag', 'sports duffle', 'kit bag'],
    sportType: 'Accessories',
    weightGrams: 520,
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-sp-acc-support',
    sku: 'SPORT-ACC-KNEE-SUPPORT',
    name: 'Knee Compression Elastic Support Sleeves (Pair)',
    slug: 'knee-compression-elastic-support-sleeves-pair',
    category: 'sports-accessories',
    subcategory: 'Knee & Ankle Compression Supports',
    description: 'Breathable 4-way elastic knitted knee brace with silicone anti-slip band. Provides soothing compression and joint stability for running, cricket, football, and volleyball.',
    price: 299,
    mrp: 449,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Boldfit',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 23,
    tags: ['knee support', 'sports protection', 'knee sleeve'],
    sportType: 'Accessories',
    weightGrams: 160,
    createdAt: '2026-02-13T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },

  // Stationery, Notebooks & Writing Supplies
  {
    id: 'prod-020',
    sku: 'STAT-NOTE-CLASSMATE-6',
    name: 'Classmate Long Notebook (Pack of 6 - 172 Pages Ruled)',
    slug: 'classmate-long-notebook-pack-of-6',
    category: 'notebooks',
    subcategory: 'Long Notebooks',
    description: 'India\'s top-selling school notebook by ITC Classmate. Premium ozone-treated bright white paper prevents ink bleeding. Single line ruled with attractive fun fact covers.',
    price: 360,
    mrp: 390,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Classmate',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.9,
    reviewCount: 88,
    tags: ['classmate', 'notebook', 'register', 'school stationery', 'stationery'],
    specifications: {
      'Pack Size': '6 Notebooks',
      'Pages Per Book': '172 Pages',
      'Ruling': 'Single Line Ruled',
      'Size': 'A4 Long Book (31 x 19 cm)'
    },
    weightGrams: 1450,
    createdAt: '2026-02-02T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-021',
    sku: 'STAT-NOTE-SPIRAL-200',
    name: 'Spiral Bound Notebook A4 - 200 Pages (80 GSM)',
    slug: 'spiral-notebook-a4-200-pages',
    category: 'notebooks',
    subcategory: 'Spiral Notebooks',
    description: 'Heavy duty polypropylene plastic cover with sturdy twin-wire binding. High opacity 80 GSM paper ideal for coaching notes, college lectures, and office project tracking.',
    price: 135,
    mrp: 160,
    stock: 65,
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Paperkraft / Luxar',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 39,
    tags: ['spiral notebook', 'college notes', 'a4 notebook', 'stationery'],
    weightGrams: 380,
    createdAt: '2026-02-04T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-022',
    sku: 'STAT-PEN-CELLO-20',
    name: 'Cello Butterflow Ball Pen (Box of 20 - Blue)',
    slug: 'cello-butterflow-ball-pen-box-of-20',
    category: 'pens-writing',
    subcategory: 'Ball Pens',
    description: 'Smooth low-viscosity ink technology ensures effortless, smear-free writing for long school exams and note-taking. Ergonomic rubber grip.',
    price: 190,
    mrp: 200,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Cello',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 94,
    tags: ['cello', 'butterflow', 'ball pen', 'pen box', 'exam pen'],
    weightGrams: 240,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-023',
    sku: 'STAT-PEN-PARKER-VEC',
    name: 'Parker Vector Stainless Steel Fountain Pen with Chrome Trim',
    slug: 'parker-vector-stainless-steel-fountain-pen',
    category: 'pens-writing',
    subcategory: 'Luxury Pens',
    description: 'Iconic all-metal brushed stainless steel body with Parker arrowhead clip. Fine stainless steel nib engineered for smooth, consistent calligraphy and executive signatures. Includes ink converter & blue cartridge.',
    price: 495,
    mrp: 550,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Parker',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 27,
    tags: ['parker', 'fountain pen', 'gift pen', 'stationery'],
    weightGrams: 110,
    createdAt: '2026-02-06T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-024',
    sku: 'STAT-HIGH-LUXOR-6',
    name: 'Luxor Highlighter Set (6 Neon Colors - Chisel Tip)',
    slug: 'luxor-highlighter-set-6-neon-colors',
    category: 'pens-writing',
    subcategory: 'Highlighters & Markers',
    description: 'Bright fluorescent highlighters with smear-proof water-based ink. Features versatile chisel tip for 1mm fine underlining and 4mm broad text marking.',
    price: 130,
    mrp: 150,
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Luxor',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 32,
    tags: ['luxor', 'highlighter', 'stationery', 'revision'],
    weightGrams: 140,
    createdAt: '2026-02-07T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-025',
    sku: 'STAT-GEOM-CAMLIN',
    name: 'Camlin Kokuyo Geometry Box - Premium (8 Pieces Metal Case)',
    slug: 'camlin-kokuyo-geometry-box-premium',
    category: 'stationery',
    subcategory: 'Geometry & Rulers',
    description: 'Rust-resistant metal instruments with self-centering mechanism for pinpoint precision. Includes compass, divider, 15cm ruler, 45° and 60° set squares, 180° protractor, sharpener, and eraser in a tin case.',
    price: 145,
    mrp: 165,
    stock: 70,
    images: [
      'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Camlin Kokuyo',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 63,
    tags: ['geometry box', 'camlin', 'compass', 'maths instrument', 'school essentials'],
    weightGrams: 260,
    createdAt: '2026-02-08T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-026',
    sku: 'STAT-CALC-CASIO-991',
    name: 'Scientific Calculator - Casio FX-991CW ClassWiz (540+ Functions)',
    slug: 'scientific-calculator-casio-fx-991cw',
    category: 'stationery',
    subcategory: 'Calculators',
    description: 'Original Casio ClassWiz non-programmable scientific calculator approved for CBSE, engineering colleges, and competitive exams. Natural textbook 4-gradation display with dual power (Solar + Battery).',
    price: 1495,
    mrp: 1695,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Casio',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 46,
    tags: ['casio', 'scientific calculator', 'fx991cw', 'engineering', 'college'],
    weightGrams: 220,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-027',
    sku: 'STAT-CALC-CASIO-MJ12',
    name: 'Commercial Calculator - Casio MJ-12D (12 Digit Desktop)',
    slug: 'commercial-calculator-casio-mj-12d',
    category: 'stationery',
    subcategory: 'Calculators',
    description: 'India\'s standard shopkeeper and accounting calculator. 150 steps check and correct, dedicated GST/tax keys, large display, and two-way solar/battery power.',
    price: 495,
    mrp: 550,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Casio',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 30,
    tags: ['casio', 'mj12d', 'shop calculator', 'office stationery'],
    weightGrams: 200,
    createdAt: '2026-02-11T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-028',
    sku: 'STAT-ART-CAMLIN-36',
    name: 'Camlin Artist Watercolor Cakes (36 Shades Set with Brush)',
    slug: 'camlin-artist-watercolor-cakes-36-shades',
    category: 'art-craft',
    subcategory: 'Paints & Brushes',
    description: 'Vibrant, lightfast watercolor cakes formulated with finest organic pigments. Mixes cleanly without muddiness. Includes round nylon hair brush and plastic mixing palette lid.',
    price: 185,
    mrp: 210,
    stock: 36,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Kokuyo Camlin',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 38,
    tags: ['camlin', 'watercolor', 'drawing', 'art and craft', 'school project'],
    weightGrams: 290,
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-029',
    sku: 'STAT-ART-FABER-36',
    name: 'Faber-Castell Triangular Color Pencils (36 Shades Set)',
    slug: 'faber-castell-triangular-color-pencils-36-shades',
    category: 'art-craft',
    subcategory: 'Color Pencils',
    description: 'Ergonomic triangular shape prevents hand fatigue. SV bonded break-resistant leads deliver brilliant, rich color laydown.',
    price: 220,
    mrp: 250,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Faber-Castell',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 51,
    tags: ['faber castell', 'color pencil', 'drawing', 'art supplies'],
    weightGrams: 260,
    createdAt: '2026-02-14T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-030',
    sku: 'STAT-BAG-BACKPACK-32',
    name: 'Ergonomic School & College Backpack - 32L (Water Resistant)',
    slug: 'ergonomic-school-college-backpack-32l',
    category: 'school-bags',
    subcategory: 'Backpacks',
    description: 'Heavy duty waterproof polyester fabric with 3 spacious main compartments, padded 15.6 inch laptop sleeve, bottle pockets, and breathable air-mesh back padding for all-day comfort.',
    price: 849,
    mrp: 1299,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Safari / Skybags Classic',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 39,
    tags: ['school bag', 'backpack', 'college bag', 'stationery accessories'],
    weightGrams: 620,
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-031',
    sku: 'STAT-GLUE-FEVICOL',
    name: 'Fevicol MR White Adhesive (200g + 30g Free Dispenser Pack)',
    slug: 'fevicol-mr-white-adhesive-200g',
    category: 'stationery',
    subcategory: 'Office & Craft Supplies',
    description: 'India\'s standard craft adhesive for paper, cardboard, thermocol, fabric, and school project models. Clean non-staining squeeze nozzle bottle.',
    price: 65,
    mrp: 70,
    stock: 85,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Pidilite Fevicol',
    isFeatured: false,
    rating: 4.9,
    reviewCount: 65,
    tags: ['fevicol', 'glue', 'craft', 'stationery', 'office'],
    weightGrams: 260,
    createdAt: '2026-02-16T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-032',
    sku: 'STAT-STAPLER-KANGARO',
    name: 'Kangaro HD-10D Stapler with 1000 Pins Pack',
    slug: 'kangaro-hd-10d-stapler-with-pins',
    category: 'stationery',
    subcategory: 'Office Supplies',
    description: 'Original all-metal Kangaro stapler with quick reload mechanism and built-in staple pin remover. Staples up to 20 sheets of 80 GSM paper with ease.',
    price: 110,
    mrp: 125,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Kangaro',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 42,
    tags: ['kangaro', 'stapler', 'office stationery'],
    weightGrams: 180,
    createdAt: '2026-02-18T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-033',
    sku: 'STAT-COMBO-SECONDARY',
    name: 'All-in-One School Reopening Stationery Combo Kit',
    slug: 'school-reopening-stationery-combo-kit',
    category: 'school-kits',
    subcategory: 'Combo Kits',
    description: 'Complete curated school kit for Class 6 to 10 students: Includes 6 Long Notebooks (Classmate), 1 Camlin Geometry Box, 10 Blue Butterflow Pens, 5 Black Gel Pens, 1 Fevicol MR, 1 Steel Scale 30cm, 5 Apsara Pencils & Erasers.',
    price: 699,
    mrp: 840,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    brand: 'Sarswati Curated Kit',
    isFeatured: true,
    isDealOfDay: true,
    rating: 4.9,
    reviewCount: 37,
    tags: ['stationery combo', 'school kit', 'reopening bundle', 'class 10 kit'],
    weightGrams: 2200,
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  }
];
