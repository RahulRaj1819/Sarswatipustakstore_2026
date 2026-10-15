export interface SchoolBookItem {
  name: string;
  subject: string;
  publisher: string;
  approxPrice: number;
}

export interface SchoolConfig {
  id: string;
  name: string;
  location: string;
  board: 'CBSE' | 'Bihar Board' | 'ICSE';
  availableClasses: string[];
  booklists: Record<string, SchoolBookItem[]>; // class -> books
}

export const ACADEMIC_SESSIONS = ['2026-2027 (Upcoming)', '2025-2026 (Current)'];

export const LOCAL_SCHOOLS: SchoolConfig[] = [
  {
    id: 'school-dav-siwan',
    name: 'DAV Public School, Kandhwara, Siwan',
    location: 'Kandhwara, Siwan',
    board: 'CBSE',
    availableClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    booklists: {
      'Class 10': [
        { name: 'NCERT Mathematics Class 10', subject: 'Mathematics', publisher: 'NCERT', approxPrice: 160 },
        { name: 'NCERT Science Class 10', subject: 'Science', publisher: 'NCERT', approxPrice: 195 },
        { name: 'First Flight (English)', subject: 'English Reader', publisher: 'NCERT', approxPrice: 80 },
        { name: 'Footprints without Feet', subject: 'English Supplementary', publisher: 'NCERT', approxPrice: 40 },
        { name: 'Kshitij Bhag 2 (Hindi)', subject: 'Hindi Course A', publisher: 'NCERT', approxPrice: 65 },
        { name: 'India and Contemporary World II', subject: 'Social Science - History', publisher: 'NCERT', approxPrice: 125 },
        { name: 'Contemporary India II', subject: 'Social Science - Geography', publisher: 'NCERT', approxPrice: 75 },
        { name: 'Understanding Economic Development', subject: 'Social Science - Economics', publisher: 'NCERT', approxPrice: 65 },
        { name: 'Democratic Politics II', subject: 'Social Science - Civics', publisher: 'NCERT', approxPrice: 80 }
      ],
      'Class 9': [
        { name: 'NCERT Mathematics Class 9', subject: 'Mathematics', publisher: 'NCERT', approxPrice: 155 },
        { name: 'NCERT Science Class 9', subject: 'Science', publisher: 'NCERT', approxPrice: 150 },
        { name: 'Beehive (English Textbook)', subject: 'English', publisher: 'NCERT', approxPrice: 75 },
        { name: 'Moments (Supplementary Reader)', subject: 'English', publisher: 'NCERT', approxPrice: 40 },
        { name: 'Social Science Set Class 9 (4 Books)', subject: 'Social Studies', publisher: 'NCERT', approxPrice: 320 }
      ]
    }
  },
  {
    id: 'school-pachrukhi-high',
    name: 'Pachrukhi High School (BSEB)',
    location: 'Main Road, Pachrukhi, Siwan',
    board: 'Bihar Board',
    availableClasses: ['Class 9', 'Class 10'],
    booklists: {
      'Class 10': [
        { name: 'BSTBPC Ganit (Mathematics) Class 10', subject: 'Mathematics', publisher: 'Bihar State Textbook Corp', approxPrice: 130 },
        { name: 'BSTBPC Vigyan (Science) Class 10', subject: 'Science', publisher: 'Bihar State Textbook Corp', approxPrice: 140 },
        { name: 'Piyusham Bhag 2 (Sanskrit)', subject: 'Sanskrit', publisher: 'BSTBPC', approxPrice: 60 },
        { name: 'Godhuli Bhag 2 (Hindi)', subject: 'Hindi', publisher: 'BSTBPC', approxPrice: 70 },
        { name: 'Itihas ki Duniya (History) Bhag 2', subject: 'Social Science', publisher: 'BSTBPC', approxPrice: 65 },
        { name: 'Bhartiya Arthvyavastha (Economics)', subject: 'Social Science', publisher: 'BSTBPC', approxPrice: 55 }
      ],
      'Class 9': [
        { name: 'BSTBPC Ganit Class 9', subject: 'Mathematics', publisher: 'BSTBPC', approxPrice: 125 },
        { name: 'BSTBPC Vigyan Class 9', subject: 'Science', publisher: 'BSTBPC', approxPrice: 130 },
        { name: 'Godhuli Bhag 1 (Hindi)', subject: 'Hindi', publisher: 'BSTBPC', approxPrice: 65 },
        { name: 'Piyusham Bhag 1 (Sanskrit)', subject: 'Sanskrit', publisher: 'BSTBPC', approxPrice: 55 }
      ]
    }
  },
  {
    id: 'school-don-bosco',
    name: 'Don Bosco High School, Siwan',
    location: 'Siwan Town',
    board: 'CBSE',
    availableClasses: ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    booklists: {
      'Class 8': [
        { name: 'NCERT Mathematics Class 8', subject: 'Mathematics', publisher: 'NCERT', approxPrice: 65 },
        { name: 'NCERT Science Class 8', subject: 'Science', publisher: 'NCERT', approxPrice: 65 },
        { name: 'Honeydew (English)', subject: 'English', publisher: 'NCERT', approxPrice: 65 },
        { name: 'Vasant Bhag 3 (Hindi)', subject: 'Hindi', publisher: 'NCERT', approxPrice: 65 },
        { name: 'Our Pasts III (History)', subject: 'Social Science', publisher: 'NCERT', approxPrice: 65 }
      ]
    }
  },
  {
    id: 'school-kv-siwan',
    name: 'Kendriya Vidyalaya, Siwan',
    location: 'Harpur, Siwan',
    board: 'CBSE',
    availableClasses: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    booklists: {
      'Class 10': [
        { name: 'NCERT Mathematics 10', subject: 'Mathematics', publisher: 'NCERT', approxPrice: 160 },
        { name: 'NCERT Science 10', subject: 'Science', publisher: 'NCERT', approxPrice: 195 },
        { name: 'NCERT Social Science Set (4 Books)', subject: 'Social Science', publisher: 'NCERT', approxPrice: 345 }
      ]
    }
  }
];
