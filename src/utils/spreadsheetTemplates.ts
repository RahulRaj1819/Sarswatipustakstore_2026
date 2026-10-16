import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Product, Department, ProductCategory } from '../types';
import { formatINR } from './helpers';

// Template Column Definitions
export const MASTER_TEMPLATE_HEADERS = [
  'SKU',
  'Product Name',
  'Department',
  'Category',
  'Subcategory',
  'Selling Price (Rs)',
  'MRP (Rs)',
  'Cost Price (Rs)',
  'Stock Quantity',
  'Min Stock Alert Level',
  'GST Tax Rate %',
  'Storage Shelf Rack',
  'Status',
  'Brand',
  'Description',
  // Books specific
  'ISBN',
  'Publisher',
  'Author',
  'Class Grade',
  'Board',
  'Subject',
  'Edition Year',
  // Stationery specific
  'Pack Size',
  'Color',
  'Ruling Type',
  'Dimensions',
  // Sports specific
  'Sport Name',
  'Size Variant',
  'Material',
  'Playing Level'
];

export const BOOKS_TEMPLATE_HEADERS = [
  'SKU',
  'Book Title',
  'ISBN',
  'Publisher',
  'Author',
  'Class Grade',
  'Board',
  'Subject',
  'Edition Year',
  'Selling Price (Rs)',
  'MRP (Rs)',
  'Cost Price (Rs)',
  'Stock Quantity',
  'Min Stock Alert Level',
  'Storage Shelf Rack',
  'Status'
];

export const STATIONERY_TEMPLATE_HEADERS = [
  'SKU',
  'Item Name',
  'Category',
  'Brand',
  'Pack Size',
  'Color',
  'Ruling Type',
  'Dimensions',
  'Selling Price (Rs)',
  'MRP (Rs)',
  'Cost Price (Rs)',
  'Stock Quantity',
  'Min Stock Alert Level',
  'GST Tax Rate %',
  'Storage Shelf Rack',
  'Status'
];

export const SPORTS_TEMPLATE_HEADERS = [
  'SKU',
  'Item Name',
  'Sport Name',
  'Brand',
  'Size Variant',
  'Material',
  'Playing Level',
  'Selling Price (Rs)',
  'MRP (Rs)',
  'Cost Price (Rs)',
  'Stock Quantity',
  'Min Stock Alert Level',
  'GST Tax Rate %',
  'Storage Shelf Rack',
  'Status'
];

// Sample Template Rows
const SAMPLE_MASTER_ROWS = [
  {
    'SKU': 'NCERT-SCI-10',
    'Product Name': 'NCERT Science Textbook for Class 10',
    'Department': 'Books',
    'Category': 'school-ncert',
    'Subcategory': 'Class 10',
    'Selling Price (Rs)': 195,
    'MRP (Rs)': 195,
    'Cost Price (Rs)': 160,
    'Stock Quantity': 50,
    'Min Stock Alert Level': 5,
    'GST Tax Rate %': 0,
    'Storage Shelf Rack': 'Rack-B1',
    'Status': 'Active',
    'Brand': 'NCERT',
    'Description': 'Official NCERT Science textbook for Class 10 CBSE and BSEB students.',
    'ISBN': '978-8174506399',
    'Publisher': 'NCERT New Delhi',
    'Author': 'NCERT Editorial Board',
    'Class Grade': 'Class 10',
    'Board': 'NCERT / CBSE',
    'Subject': 'Science',
    'Edition Year': '2026',
    'Pack Size': '',
    'Color': '',
    'Ruling Type': '',
    'Dimensions': '',
    'Sport Name': '',
    'Size Variant': '',
    'Material': '',
    'Playing Level': ''
  },
  {
    'SKU': 'DOMS-NEON-KIT',
    'Product Name': 'DOMS Neon Signature Stationery Kit',
    'Department': 'Stationery',
    'Category': 'stationery',
    'Subcategory': 'Kits & Combos',
    'Selling Price (Rs)': 199,
    'MRP (Rs)': 220,
    'Cost Price (Rs)': 145,
    'Stock Quantity': 40,
    'Min Stock Alert Level': 8,
    'GST Tax Rate %': 18,
    'Storage Shelf Rack': 'Shelf-S2',
    'Status': 'Active',
    'Brand': 'DOMS',
    'Description': 'Complete stationery kit with pencils, scale, eraser, and sharpener.',
    'ISBN': '',
    'Publisher': '',
    'Author': '',
    'Class Grade': '',
    'Board': '',
    'Subject': '',
    'Edition Year': '',
    'Pack Size': 'Kit of 8 Items',
    'Color': 'Neon Assorted',
    'Ruling Type': 'N/A',
    'Dimensions': 'Standard Box',
    'Sport Name': '',
    'Size Variant': '',
    'Material': '',
    'Playing Level': ''
  },
  {
    'SKU': 'SP-CRIC-BAT-01',
    'Product Name': 'SG Tournament Kashmir Willow Cricket Bat',
    'Department': 'Sports',
    'Category': 'sports-cricket',
    'Subcategory': 'Cricket Bats',
    'Selling Price (Rs)': 1450,
    'MRP (Rs)': 1799,
    'Cost Price (Rs)': 1100,
    'Stock Quantity': 15,
    'Min Stock Alert Level': 3,
    'GST Tax Rate %': 12,
    'Storage Shelf Rack': 'Sports-Bay-1',
    'Status': 'Active',
    'Brand': 'SG',
    'Description': 'Selected Kashmir willow cricket bat with thick edges and cane handle.',
    'ISBN': '',
    'Publisher': '',
    'Author': '',
    'Class Grade': '',
    'Board': '',
    'Subject': '',
    'Edition Year': '',
    'Pack Size': '',
    'Color': '',
    'Ruling Type': '',
    'Dimensions': '',
    'Sport Name': 'Cricket',
    'Size Variant': 'Short Handle',
    'Material': 'Kashmir Willow',
    'Playing Level': 'Tournament'
  }
];

const SAMPLE_BOOKS_ROWS = [
  {
    'SKU': 'NCERT-MATH-10',
    'Book Title': 'NCERT Mathematics for Class 10',
    'ISBN': '978-8174506344',
    'Publisher': 'NCERT New Delhi',
    'Author': 'NCERT Board',
    'Class Grade': 'Class 10',
    'Board': 'NCERT / CBSE',
    'Subject': 'Mathematics',
    'Edition Year': '2026',
    'Selling Price (Rs)': 160,
    'MRP (Rs)': 160,
    'Cost Price (Rs)': 135,
    'Stock Quantity': 45,
    'Min Stock Alert Level': 5,
    'Storage Shelf Rack': 'Rack-B2',
    'Status': 'Active'
  },
  {
    'SKU': 'BSEB-HIN-09',
    'Book Title': 'Godhuli Hindi Bhag 1 Class 9 (Bihar Board)',
    'ISBN': '978-8174509921',
    'Publisher': 'BSTBPC Patna',
    'Author': 'Bihar Textbook Committee',
    'Class Grade': 'Class 9',
    'Board': 'Bihar Board',
    'Subject': 'Hindi',
    'Edition Year': '2026',
    'Selling Price (Rs)': 85,
    'MRP (Rs)': 85,
    'Cost Price (Rs)': 70,
    'Stock Quantity': 60,
    'Min Stock Alert Level': 10,
    'Storage Shelf Rack': 'Rack-B4',
    'Status': 'Active'
  }
];

const SAMPLE_STATIONERY_ROWS = [
  {
    'SKU': 'CLASS-NB-RULE-172',
    'Item Name': 'Classmate Long Exercise Notebook 172 Pages',
    'Category': 'notebooks',
    'Brand': 'Classmate',
    'Pack Size': 'Single',
    'Color': 'Multi Cover',
    'Ruling Type': 'Ruled',
    'Dimensions': '24cm x 18cm',
    'Selling Price (Rs)': 60,
    'MRP (Rs)': 65,
    'Cost Price (Rs)': 46,
    'Stock Quantity': 150,
    'Min Stock Alert Level': 20,
    'GST Tax Rate %': 12,
    'Storage Shelf Rack': 'Shelf-NB-1',
    'Status': 'Active'
  },
  {
    'SKU': 'HAUSER-XO-BLU-10',
    'Item Name': 'Hauser XO Ball Pen (Pack of 10) Blue',
    'Category': 'pens-writing',
    'Brand': 'Hauser',
    'Pack Size': 'Pack of 10',
    'Color': 'Blue',
    'Ruling Type': 'N/A',
    'Dimensions': 'N/A',
    'Selling Price (Rs)': 90,
    'MRP (Rs)': 100,
    'Cost Price (Rs)': 70,
    'Stock Quantity': 80,
    'Min Stock Alert Level': 15,
    'GST Tax Rate %': 18,
    'Storage Shelf Rack': 'Shelf-PENS-2',
    'Status': 'Active'
  }
];

const SAMPLE_SPORTS_ROWS = [
  {
    'SKU': 'NIVIA-STORM-FB',
    'Item Name': 'Nivia Storm Football Rubber Moulded Size 5',
    'Sport Name': 'Football',
    'Brand': 'Nivia',
    'Size Variant': 'Size 5',
    'Material': 'Rubber Moulded',
    'Playing Level': 'Training / Match',
    'Selling Price (Rs)': 480,
    'MRP (Rs)': 599,
    'Cost Price (Rs)': 370,
    'Stock Quantity': 24,
    'Min Stock Alert Level': 4,
    'GST Tax Rate %': 12,
    'Storage Shelf Rack': 'Sports-Bay-2',
    'Status': 'Active'
  },
  {
    'SKU': 'YONEX-MP-RKT',
    'Item Name': 'Yonex Muscle Power Badminton Racket with Cover',
    'Sport Name': 'Badminton',
    'Brand': 'Yonex',
    'Size Variant': 'Standard G4',
    'Material': 'Aluminium / Carbon',
    'Playing Level': 'Club / Tournament',
    'Selling Price (Rs)': 890,
    'MRP (Rs)': 1150,
    'Cost Price (Rs)': 690,
    'Stock Quantity': 12,
    'Min Stock Alert Level': 3,
    'GST Tax Rate %': 12,
    'Storage Shelf Rack': 'Sports-Rack-A',
    'Status': 'Active'
  }
];

/**
 * Downloads a styled Excel template with text-formatted SKU column
 */
export const downloadSpreadsheetTemplate = (
  type: 'master' | 'books' | 'stationery' | 'sports',
  format: 'xlsx' | 'csv' = 'xlsx'
) => {
  let headers: string[];
  let sampleData: Record<string, any>[];
  let fileNamePrefix = 'spsb-template';

  switch (type) {
    case 'books':
      headers = BOOKS_TEMPLATE_HEADERS;
      sampleData = SAMPLE_BOOKS_ROWS;
      fileNamePrefix = 'spsb-books-inventory-template';
      break;
    case 'stationery':
      headers = STATIONERY_TEMPLATE_HEADERS;
      sampleData = SAMPLE_STATIONERY_ROWS;
      fileNamePrefix = 'spsb-stationery-inventory-template';
      break;
    case 'sports':
      headers = SPORTS_TEMPLATE_HEADERS;
      sampleData = SAMPLE_SPORTS_ROWS;
      fileNamePrefix = 'spsb-sports-gear-template';
      break;
    case 'master':
    default:
      headers = MASTER_TEMPLATE_HEADERS;
      sampleData = SAMPLE_MASTER_ROWS;
      fileNamePrefix = 'spsb-master-catalog-template';
      break;
  }

  if (format === 'csv') {
    const csvString = Papa.unparse({
      fields: headers,
      data: sampleData
    });
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileNamePrefix}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    return;
  }

  // Create XLSX workbook
  const worksheet = XLSX.utils.json_to_sheet(sampleData, { header: headers });

  // Ensure column widths
  worksheet['!cols'] = headers.map(h => ({
    wch: Math.max(h.length + 4, 16)
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory_Template');

  XLSX.writeFile(workbook, `${fileNamePrefix}.xlsx`, { bookType: 'xlsx' });
};

/**
 * Generates and downloads an Error Log CSV
 */
export const downloadErrorLogCSV = (
  errors: { rowNumber: number; sku?: string; name?: string; reason: string }[],
  fileName: string = 'inventory-import-errors.csv'
) => {
  const csvContent = Papa.unparse(errors);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

/**
 * Exports existing inventory to CSV or XLSX
 */
export const exportInventoryData = (
  products: Product[],
  options: {
    department?: 'All' | Department;
    category?: string;
    stockFilter?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
    format?: 'xlsx' | 'csv';
  } = {}
) => {
  const { department = 'All', category = 'all', stockFilter = 'all', format = 'xlsx' } = options;

  let filtered = [...products];

  if (department !== 'All') {
    filtered = filtered.filter(p => p.department === department);
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (stockFilter === 'low_stock') {
    filtered = filtered.filter(p => p.stock <= (p.minStockThreshold ?? 5) && p.stock > 0);
  } else if (stockFilter === 'out_of_stock') {
    filtered = filtered.filter(p => p.stock === 0);
  } else if (stockFilter === 'in_stock') {
    filtered = filtered.filter(p => p.stock > 0);
  }

  const exportRows = filtered.map(p => ({
    'SKU': `"${p.sku}"`, // Force string preservation
    'Product Name': p.name,
    'Department': p.department || 'Books',
    'Category': p.category,
    'Subcategory': p.subcategory || '',
    'Selling Price (Rs)': p.price,
    'Selling Price (Paise)': p.sellingPricePaise ?? Math.round(p.price * 100),
    'Cost Price (Rs)': p.costPrice ?? Math.round(p.price * 0.75),
    'MRP (Rs)': p.mrp ?? p.price,
    'Current Stock': p.stock,
    'Min Stock Alert': p.minStockThreshold ?? 5,
    'Stock Status': p.stock === 0 ? 'Out of Stock' : p.stock <= (p.minStockThreshold ?? 5) ? 'Low Stock' : 'Optimal',
    'GST Tax Rate %': p.taxRate ?? (p.department === 'Books' ? 0 : 18),
    'Storage Shelf Rack': p.storageLocation || 'Unassigned',
    'Status': p.status || 'Active',
    'Brand': p.brand || '',
    'ISBN': p.isbn || '',
    'Publisher': p.publisher || '',
    'Author': p.author || '',
    'Class Grade': p.classGrade || '',
    'Board': p.board || '',
    'Subject': p.subject || '',
    'Pack Size': p.packSize || '',
    'Color': p.itemColor || '',
    'Ruling': p.ruling || '',
    'Sport': p.sportName || '',
    'Size': p.size || '',
    'Material': p.material || '',
    'Playing Level': p.playingLevel || '',
    'Last Updated': p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('en-IN') : ''
  }));

  const timeStamp = new Date().toISOString().slice(0, 10);
  const baseName = `spsb-inventory-export-${department.toLowerCase()}-${timeStamp}`;

  if (format === 'csv') {
    const csvString = Papa.unparse(exportRows);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${baseName}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  } else {
    // XLSX with preserved SKU string formats
    const ws = XLSX.utils.json_to_sheet(
      exportRows.map(r => ({ ...r, SKU: String(r.SKU).replace(/^"|"$/g, '') }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Store_Inventory');
    XLSX.writeFile(wb, `${baseName}.xlsx`, { bookType: 'xlsx' });
  }
};
