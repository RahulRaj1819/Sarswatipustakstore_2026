import { ProductCategory } from '../types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortName: string;
  iconName: string; // Lucide icon name
  description: string;
  bannerImage: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    name: 'All Products',
    shortName: 'All',
    iconName: 'LayoutGrid',
    description: 'Browse our full catalogue of books, stationery, art supplies, and sports equipment.',
    bannerImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Textbooks', 'Competitive', 'Stationery', 'Sports', 'Art', 'Bags']
  },
  {
    id: 'academic-books',
    name: 'Academic Books',
    shortName: 'Academic',
    iconName: 'GraduationCap',
    description: 'School, college, syllabus guides, reference works, and solution manuals.',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Class 1-5', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'College & Degree']
  },
  {
    id: 'school-ncert',
    name: 'School Books & NCERT',
    shortName: 'NCERT',
    iconName: 'BookOpen',
    description: 'Official NCERT textbooks for CBSE and state board curriculums from Class 1 to 12.',
    bannerImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11 Science', 'Class 12']
  },
  {
    id: 'bihar-board',
    name: 'Bihar Board Textbooks',
    shortName: 'Bihar Board',
    iconName: 'Library',
    description: 'Official BSTBPC textbooks in Hindi & Urdu medium for Class 1 to 10 BSEB syllabus.',
    bannerImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Class 9 BSTBPC', 'Class 10 BSTBPC', 'Matric Guides', 'Model Papers']
  },
  {
    id: 'competitive-exams',
    name: 'Competitive Examination Books',
    shortName: 'Competitive',
    iconName: 'Award',
    description: 'Preparation guides for BPSC, Bihar Police, SSC CGL/CHSL, Railway RRB, CTET/STET, Banking.',
    bannerImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['BPSC & State PSC', 'SSC', 'Railway', 'Lucent Series', 'General Studies', 'Practise Sets']
  },
  {
    id: 'college-reference',
    name: 'College & Reference Books',
    shortName: 'College',
    iconName: 'Layers',
    description: 'Higher education textbooks for B.A., B.Sc., B.Com, B.Ed., and advanced reference guides.',
    bannerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Higher Maths', 'Physics & Chemistry', 'Humanities', 'Commerce', 'B.Ed & D.El.Ed']
  },
  {
    id: 'notebooks',
    name: 'Notebooks & Registers',
    shortName: 'Notebooks',
    iconName: 'BookMarked',
    description: 'Classmate notebooks, spiral registers, hardbound ledger books, project files, and diaries.',
    bannerImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Long Notebooks', 'Spiral Notebooks', 'Rough Pads', 'Hardbound Registers', 'Executive Diaries']
  },
  {
    id: 'pens-writing',
    name: 'Pens, Pencils & Writing Supplies',
    shortName: 'Writing',
    iconName: 'PenTool',
    description: 'Ballpoint pens, gel pens, fountain pens, exam pens, highlighters, markers, and drafting pencils.',
    bannerImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Ballpoint Pens', 'Gel Pens', 'Fountain Pens', 'Highlighters', 'Whiteboard Markers', 'Pencils']
  },
  {
    id: 'stationery',
    name: 'School & Office Stationery',
    shortName: 'Stationery',
    iconName: 'FolderKanban',
    description: 'Calculators, geometry boxes, staplers, scissors, clear tapes, files, clips, and office essentials.',
    bannerImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Calculators', 'Geometry & Rulers', 'Staplers & Tapes', 'Files & Folders', 'Adhesives']
  },
  {
    id: 'art-craft',
    name: 'Art, Craft & Project Materials',
    shortName: 'Art & Craft',
    iconName: 'Palette',
    description: 'Watercolors, sketch books, poster colors, acrylic paints, colored chart paper, thermocol models.',
    bannerImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Watercolor Cakes', 'Color Pencils', 'Drawing Books', 'Clay & Modelling', 'Glitter & Ribbons']
  },
  {
    id: 'school-bags',
    name: 'School Bags & Accessories',
    shortName: 'Bags',
    iconName: 'Briefcase',
    description: 'Water-resistant school bags, college backpacks, pencil pouches, lunch boxes, and water bottles.',
    bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['School Backpacks', 'College Bags', 'Water Bottles', 'Pencil Pouches']
  },
  {
    id: 'sports-equipment',
    name: 'Sports Equipment',
    shortName: 'Sports',
    iconName: 'Trophy',
    description: 'Cricket gear, footballs, volleyballs, badminton rackets, carrom boards, chess sets, and athletics.',
    bannerImage: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Cricket', 'Football', 'Badminton', 'Indoor Games (Carrom/Chess)', 'Outdoor Athletics']
  },
  {
    id: 'school-kits',
    name: 'School Supply Kits & Combos',
    shortName: 'Supply Kits',
    iconName: 'PackageCheck',
    description: 'All-in-one curated kits for school reopening, exam semester bundles, and grade-wise stationery sets.',
    bannerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Primary School Kit', 'Secondary School Bundle', 'Exam Essentials Pack']
  }
];
