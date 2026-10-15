import { ProductCategory } from '../types';

export interface SportsCategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  bannerImage: string;
  subcategories: string[];
  popularBrands: string[];
}

export const SPORTS_CATEGORIES: SportsCategoryInfo[] = [
  {
    id: 'sports-cricket',
    slug: 'cricket',
    name: 'Cricket Equipment & Accessories',
    shortName: 'Cricket',
    tagline: 'Match Willow Bats, Tennis Bats, Leather Balls, Pads & Kits',
    description: 'Everything for gully cricket, school tournaments, and club matches. Handcrafted Kashmir Willow bats, Cosco tennis balls, leather balls, batting pads, helmets, and complete SG & SS kit bags.',
    iconName: 'Trophy',
    bannerImage: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Cricket Bats (Kashmir Willow)',
      'Tennis-Ball Heavy Bats',
      'Cricket Balls (Tennis & Leather)',
      'Batting Pads & Gloves',
      'Helmets & Guards',
      'Wicketkeeping Gear',
      'Stumps & Bails',
      'Full Cricket Kits & Bags'
    ],
    popularBrands: ['SG', 'SS Sunridges', 'Cosco', 'DSC', 'Kookaburra']
  },
  {
    id: 'sports-football',
    slug: 'football',
    name: 'Football & Soccer Gear',
    shortName: 'Football',
    tagline: 'Size 5 Footballs, Studs, Shin Guards & Goal Accessories',
    description: 'Championship match balls, hard-ground moulded footballs, goalkeeper gloves with finger protection, field cones, goal nets, and dual-action ball pumps.',
    iconName: 'Circle',
    bannerImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Footballs (Size 5 & Size 4)',
      'Football Studs & Shoes',
      'Shin Guards & Ankle Sleeves',
      'Goalkeeper Gloves',
      'Goal Nets & Ball Bags',
      'Dual-Action Ball Pumps',
      'Agility Cones & Markers'
    ],
    popularBrands: ['Nivia', 'Cosco', 'Kipsta', 'Vector X']
  },
  {
    id: 'sports-badminton',
    slug: 'badminton',
    name: 'Badminton Rackets & Shuttles',
    shortName: 'Badminton',
    tagline: 'Yonex Rackets, Mavis 350 Shuttles, Nets & Replacement Grips',
    description: 'Isometric carbon & aluminum rackets for lightning smash power, genuine Yonex Mavis 350 nylon shuttles, tournament feather shuttles, court nets, and sweat-absorbent grips.',
    iconName: 'Activity',
    bannerImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Badminton Rackets',
      'Nylon Shuttlecocks (Mavis 350)',
      'Feather Shuttlecocks',
      'Badminton Court Nets',
      'Racket Grips & Overgrips',
      'Zipped Racket Covers & Bags'
    ],
    popularBrands: ['Yonex', 'Li-Ning', 'Cosco', 'Silver\'s']
  },
  {
    id: 'sports-volleyball',
    slug: 'volleyball',
    name: 'Volleyball & Court Supplies',
    shortName: 'Volleyball',
    tagline: 'Official Size 4 & 5 Volleyballs, Heavy Nets & Knee Guards',
    description: 'Official 18-panel laminated volleyballs for school tournaments and outdoor grounds, heavy-duty nylon court nets, and cushioned impact knee guards.',
    iconName: 'CircleDot',
    bannerImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Volleyballs (Cosco Super Volley)',
      'Volleyball Court Nets',
      'Cushioned Knee Guards',
      'Ball Inflation Needles & Pumps'
    ],
    popularBrands: ['Cosco', 'Nivia', 'Spartan']
  },
  {
    id: 'sports-basketball',
    slug: 'basketball',
    name: 'Basketball & Net Equipment',
    shortName: 'Basketball',
    tagline: 'Official Size 7 Rubberized Balls, Rims & All-Weather Nets',
    description: 'Durable composite leather and all-weather rubber basketballs with deep-channel grip, steel rim nets, and coaching agility cones.',
    iconName: 'Dribbble',
    bannerImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Basketballs (Size 7 & Size 6)',
      'Basketball Hoop Nets',
      'Training Marker Cones',
      'Ball Carry Mesh Bags'
    ],
    popularBrands: ['Spalding', 'Nivia', 'Cosco']
  },
  {
    id: 'sports-table-tennis',
    slug: 'table-tennis',
    name: 'Table Tennis / Ping Pong',
    shortName: 'Table Tennis',
    tagline: 'Stag & GKI Rackets, 3-Star Balls & Clamp-On Net Sets',
    description: 'ITTF-approved rubber table tennis bats for spin and control, seamless 40+ celluloid/poly balls, spring-clamp portable nets, and zipped racket cases.',
    iconName: 'Disc',
    bannerImage: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Table Tennis Rackets (2-Star to 4-Star)',
      'Table Tennis Balls (Pack of 3 / 6)',
      'Spring-Clamp Net & Post Sets',
      'Bat Covers with Ball Pockets'
    ],
    popularBrands: ['Stag', 'GKI', 'Cosco', 'Donic']
  },
  {
    id: 'sports-athletics',
    slug: 'athletics',
    name: 'Athletics & Track & Field',
    shortName: 'Athletics',
    tagline: 'Relay Batons, Stopwatches, Whistles & Sports Day Gear',
    description: 'Equipment for school sports days and track meets: Official anodized aluminum relay batons, precision digital coach stopwatches, Fox 40 referee whistles, and field measuring tapes.',
    iconName: 'Timer',
    bannerImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Relay Batons (Set of 4)',
      'Digital Coach Stopwatches',
      'Pea-less Referee Whistles',
      'Measuring Tapes (30m / 50m)',
      'Boundary Markers & Cones'
    ],
    popularBrands: ['Fox 40', 'Casio', 'Nelco', 'Cosco']
  },
  {
    id: 'sports-fitness',
    slug: 'fitness',
    name: 'Fitness & Home Workout',
    shortName: 'Fitness',
    tagline: 'Dumbbells, High-Speed Skipping Ropes, Yoga Mats & Resistance',
    description: 'High-speed bearing skipping ropes, 10mm anti-skid EVA/NBR yoga mats, adjustable hand grip strengtheners, PVC hex dumbbells, push-up stands, and resistance loop bands.',
    iconName: 'Dumbbell',
    bannerImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Skipping Ropes (Ball-Bearing High Speed)',
      'Anti-Skid Yoga & Workout Mats (10mm)',
      'Hand Grip Strengtheners',
      'Hexagonal PVC Dumbbells (Pair)',
      'Resistance Bands & Tubes',
      'Push-Up Bars & Ab Rollers'
    ],
    popularBrands: ['Kobo', 'Cosco', 'Nivia', 'Strauss']
  },
  {
    id: 'sports-indoor-games',
    slug: 'indoor-games',
    name: 'Indoor & Traditional Board Games',
    shortName: 'Indoor Games',
    tagline: 'Assam Ply Carrom Boards, Wooden Chess, Ludo & Playing Cards',
    description: 'Full-size 32" Assam plywood carrom boards with hardwood borders, deluxe wooden coins, acrylic strikers, boric powder, magnetic Sheesham folding chess boards, and classic family board games.',
    iconName: 'Gamepad2',
    bannerImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Carrom Boards (32" Champion Size)',
      'Carrom Coins, Strikers & Boric Powder',
      'Solid Wooden Chess Sets (Magnetic)',
      'Snakes & Ladders + Ludo 2-in-1',
      'Premium Plastic Coated Playing Cards'
    ],
    popularBrands: ['Precise', 'Surco', 'Sarswati Craft', 'Royal Chess']
  },
  {
    id: 'sports-school-pe',
    slug: 'school-sports-kits',
    name: 'School Sports & PE Kits',
    shortName: 'School PE Kits',
    tagline: 'All-in-One Sports Day Bundles, Team Training Bibs & House Sets',
    description: 'Comprehensive physical education packages for schools, coaching academies, and local sports clubs. Includes footballs, volleyballs, cricket gear, relay batons, training bibs, and referee accessories.',
    iconName: 'PackageCheck',
    bannerImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Complete Primary School PE Kit',
      'Secondary School Sports Day Package',
      'Team Practice Bibs / Vests (Set of 12)',
      'Agility Cones & Ladder Training Sets',
      'Tournament Trophy & Medal Packages'
    ],
    popularBrands: ['Sarswati Curated Sports', 'Cosco Institutional', 'Nivia Team']
  },
  {
    id: 'sports-accessories',
    slug: 'sportswear-accessories',
    name: 'Sportswear & Accessories',
    shortName: 'Accessories',
    tagline: 'Gym Bags, Steel Sippers, Knee/Ankle Supports & Sports Caps',
    description: 'Multi-compartment gym duffels, 1-litre stainless steel sipper bottles, sweat-absorbent cotton wristbands and headbands, knee and ankle braces, and sports socks.',
    iconName: 'Shirt',
    bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    subcategories: [
      'Multi-Compartment Sports Duffel Bags',
      'Stainless Steel Water Bottles (1 Litre)',
      'Knee & Ankle Compression Supports',
      'Cotton Wristbands & Headbands',
      'Cushioned Sports Crew Socks (Pack of 3)'
    ],
    popularBrands: ['Nivia', 'Vector X', 'SG', 'Boldfit']
  }
];
