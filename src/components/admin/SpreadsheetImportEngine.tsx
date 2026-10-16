import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { 
  Product, 
  Department, 
  ImportWorkflowType, 
  ProductCategory 
} from '../../types';
import { StorageService, rupeesToPaise, paiseToRupees } from '../../services/storage';
import { 
  downloadSpreadsheetTemplate, 
  downloadErrorLogCSV, 
  exportInventoryData 
} from '../../utils/spreadsheetTemplates';
import { formatINR } from '../../utils/helpers';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  ArrowRight, 
  RefreshCw, 
  Layers, 
  Database, 
  Settings2, 
  AlertCircle,
  FileCheck,
  Check,
  Table,
  Filter
} from 'lucide-react';

interface SpreadsheetImportEngineProps {
  products: Product[];
  onImportComplete: () => void;
  adminUser?: string;
}

interface RawImportRow {
  [header: string]: any;
}

interface ParsedValidationRow {
  rowNumber: number;
  sku: string;
  name: string;
  department: Department;
  sellingPriceRs: number;
  mrpRs: number;
  costPriceRs: number;
  stock: number;
  minStock: number;
  taxRate: number;
  location: string;
  status: 'Active' | 'Draft' | 'Archived';
  category?: ProductCategory;
  brand?: string;
  // Department specifics
  isbn?: string;
  publisher?: string;
  author?: string;
  classGrade?: string;
  board?: string;
  subject?: string;
  editionYear?: string;
  packSize?: string;
  itemColor?: string;
  ruling?: string;
  dimensions?: string;
  sportName?: string;
  size?: string;
  material?: string;
  playingLevel?: string;
  isValid: boolean;
  isWarning: boolean;
  messages: string[];
}

export const SpreadsheetImportEngine: React.FC<SpreadsheetImportEngineProps> = ({
  products,
  onImportComplete,
  adminUser = 'Rahu1819'
}) => {
  // Wizard Steps: 1: Upload & Workflow, 2: Column Mapping, 3: Validation & Dry-Run, 4: Atomic Execution, 5: Export Tools
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeMainTab, setActiveMainTab] = useState<'import' | 'export'>('import');

  // Step 1: Workflow & File Selection
  const [workflow, setWorkflow] = useState<ImportWorkflowType>('full_upsert');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rawSheetData, setRawSheetData] = useState<RawImportRow[]>([]);
  const [sheetHeaders, setSheetHeaders] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string>('');

  // Step 2: Column Mapping State
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});

  // Step 3: Validation State
  const [validatedRows, setValidatedRows] = useState<ParsedValidationRow[]>([]);
  const [fatalErrors, setFatalErrors] = useState<{ rowNumber: number; sku?: string; name?: string; reason: string }[]>([]);
  const [warningCount, setWarningCount] = useState(0);

  // Step 4: Atomic Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0); // 0 to 100%
  const [processStats, setProcessStats] = useState<{ created: number; updated: number; batchId: string } | null>(null);

  // Export State
  const [exportDept, setExportDept] = useState<'All' | Department>('All');
  const [exportStockFilter, setExportStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [exportFormat, setExportFormat] = useState<'xlsx' | 'csv'>('xlsx');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect Column Mapping from sheet headers
  const autoDetectColumnMapping = (headers: string[]): Record<string, string> => {
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

    const aliasMap: Record<string, string[]> = {
      sku: ['sku', 'itemcode', 'barcode', 'productid', 'code', 'id'],
      name: ['productname', 'itemname', 'name', 'booktitle', 'title', 'description'],
      department: ['department', 'dept', 'type', 'section'],
      category: ['category', 'cat', 'group'],
      subcategory: ['subcategory', 'subcat'],
      sellingPrice: ['sellingpricers', 'sellingprice', 'sp', 'price', 'rate', 'sellingpriceinpaise'],
      mrp: ['mrprs', 'mrp', 'maximumretailprice', 'markedprice', 'mrp_paise'],
      costPrice: ['costpricers', 'costprice', 'cp', 'purchaserate', 'cost'],
      stock: ['stockquantity', 'stock', 'qty', 'quantity', 'currentstock', 'units'],
      minStockThreshold: ['minstockalertlevel', 'minstock', 'threshold', 'reorderlevel', 'alertlevel'],
      taxRate: ['gsttaxrate', 'gstrate', 'gst', 'taxrate', 'tax'],
      storageLocation: ['storageshelfrack', 'shelf', 'rack', 'bin', 'location', 'shelfcode', 'storagelocation'],
      status: ['status', 'productstatus', 'active'],
      brand: ['brand', 'manufacturer', 'make'],
      // Books
      isbn: ['isbn', 'isbnnumber', 'isbn13', 'isbn10'],
      publisher: ['publisher', 'publication', 'press'],
      author: ['author', 'writer'],
      classGrade: ['classgrade', 'class', 'grade', 'standard'],
      board: ['board', 'schoolboard', 'educationboard'],
      subject: ['subject', 'course'],
      editionYear: ['editionyear', 'edition', 'year'],
      // Stationery
      packSize: ['packsize', 'pack', 'unitsperpack'],
      itemColor: ['color', 'colour', 'inkcolor'],
      ruling: ['rulingtype', 'ruling', 'rule'],
      dimensions: ['dimensions', 'dimension', 'sizecm'],
      // Sports
      sportName: ['sportname', 'sport', 'game'],
      size: ['sizevariant', 'size', 'batsize'],
      material: ['material', 'woodtype', 'fabric'],
      playingLevel: ['playinglevel', 'level', 'targetlevel']
    };

    const mapping: Record<string, string> = {};

    Object.keys(aliasMap).forEach(field => {
      const aliases = aliasMap[field];
      const matchedHeader = headers.find(h => {
        const normH = normalize(h);
        return aliases.some(alias => normH.includes(alias) || alias === normH);
      });
      if (matchedHeader) {
        mapping[field] = matchedHeader;
      }
    });

    return mapping;
  };

  // Handle File Upload and Parse
  const handleFileUpload = (file: File) => {
    setFileError('');
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFileError('File exceeds maximum allowed size of 10MB.');
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(fileExt || '')) {
      setFileError('Unsupported file type. Please upload a .csv, .xlsx, or .xls spreadsheet.');
      return;
    }

    setUploadedFile(file);

    if (fileExt === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          if (!results.data || results.data.length === 0) {
            setFileError('Uploaded CSV contains no valid data rows.');
            return;
          }
          const raw = results.data as RawImportRow[];
          const headers = results.meta.fields || Object.keys(raw[0] || {});
          setRawSheetData(raw);
          setSheetHeaders(headers);
          const detected = autoDetectColumnMapping(headers);
          setColumnMapping(detected);
          setCurrentStep(2);
        },
        error: err => {
          setFileError(`Failed to parse CSV file: ${err.message}`);
        }
      });
    } else {
      // Excel File
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json<RawImportRow>(worksheet, { defval: '' });

          if (!json || json.length === 0) {
            setFileError('Uploaded Excel file contains no data rows in the primary sheet.');
            return;
          }

          const headers = Object.keys(json[0] || {});
          setRawSheetData(json);
          setSheetHeaders(headers);
          const detected = autoDetectColumnMapping(headers);
          setColumnMapping(detected);
          setCurrentStep(2);
        } catch (err: any) {
          setFileError(`Failed to read Excel spreadsheet: ${err.message || 'Corrupted file'}`);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Run Dry-Run Validation on Raw Data based on Column Mapping
  const runDryRunValidation = () => {
    const skuHeader = columnMapping.sku;
    const nameHeader = columnMapping.name;

    if (!skuHeader) {
      alert('You must map the SKU column before proceeding.');
      return;
    }

    const existingSkus = new Set(products.map(p => p.sku.toLowerCase()));
    const seenFileSkus = new Set<string>();

    const validated: ParsedValidationRow[] = [];
    const fatalList: { rowNumber: number; sku?: string; name?: string; reason: string }[] = [];
    let warnings = 0;

    rawSheetData.forEach((row, index) => {
      const rowNum = index + 2; // Accounting for 1-based index + header row
      const rawSku = String(row[skuHeader] || '').trim();
      const rawName = nameHeader ? String(row[nameHeader] || '').trim() : '';

      const messages: string[] = [];
      let isFatal = false;
      let isWarn = false;

      // 1. Fatal Error: Missing SKU
      if (!rawSku) {
        isFatal = true;
        const msg = 'Missing required SKU';
        messages.push(msg);
        fatalList.push({ rowNumber: rowNum, name: rawName, reason: msg });
      }

      // 2. Fatal Error: Duplicate SKU in Sheet
      if (rawSku) {
        if (seenFileSkus.has(rawSku.toLowerCase())) {
          isFatal = true;
          const msg = `Duplicate SKU "${rawSku}" inside uploaded sheet`;
          messages.push(msg);
          fatalList.push({ rowNumber: rowNum, sku: rawSku, name: rawName, reason: msg });
        } else {
          seenFileSkus.add(rawSku.toLowerCase());
        }
      }

      // 3. Workflow specific validation
      if (workflow === 'create_new') {
        if (existingSkus.has(rawSku.toLowerCase())) {
          isFatal = true;
          const msg = `SKU "${rawSku}" already exists in store catalog. Rejecting duplicate in "Create New" mode.`;
          messages.push(msg);
          fatalList.push({ rowNumber: rowNum, sku: rawSku, name: rawName, reason: msg });
        }
        if (!rawName) {
          isFatal = true;
          const msg = 'Missing required Product Name for new product creation';
          messages.push(msg);
          fatalList.push({ rowNumber: rowNum, sku: rawSku, reason: msg });
        }
      } else if (workflow === 'update_stock_prices') {
        if (!existingSkus.has(rawSku.toLowerCase())) {
          isFatal = true;
          const msg = `SKU "${rawSku}" does not exist in store catalog to update.`;
          messages.push(msg);
          fatalList.push({ rowNumber: rowNum, sku: rawSku, name: rawName, reason: msg });
        }
      }

      // Price & Stock Parsing
      const parseNumeric = (headerKey: string, defaultVal: number = 0): { val: number; error?: string } => {
        if (!headerKey || row[headerKey] === undefined || row[headerKey] === '') return { val: defaultVal };
        const clean = String(row[headerKey]).replace(/[^0-9.-]/g, '');
        const num = parseFloat(clean);
        if (isNaN(num)) return { val: defaultVal, error: `Invalid non-numeric value in column "${headerKey}"` };
        return { val: num };
      };

      const spRes = parseNumeric(columnMapping.sellingPrice, 0);
      if (spRes.error) {
        isFatal = true;
        messages.push(spRes.error);
        fatalList.push({ rowNumber: rowNum, sku: rawSku, name: rawName, reason: spRes.error });
      }

      const mrpRes = parseNumeric(columnMapping.mrp, spRes.val);
      const cpRes = parseNumeric(columnMapping.costPrice, Math.round(spRes.val * 0.75));
      const stockRes = parseNumeric(columnMapping.stock, 0);
      if (stockRes.error) {
        isFatal = true;
        messages.push(stockRes.error);
        fatalList.push({ rowNumber: rowNum, sku: rawSku, name: rawName, reason: stockRes.error });
      }

      const minStockRes = parseNumeric(columnMapping.minStockThreshold, 5);
      const taxRes = parseNumeric(columnMapping.taxRate, 0);

      // Warning flags
      if (mrpRes.val > 0 && spRes.val > mrpRes.val) {
        isWarn = true;
        warnings++;
        messages.push(`Selling Price (₹${spRes.val}) exceeds MRP (₹${mrpRes.val})`);
      }
      if (stockRes.val < 0) {
        isWarn = true;
        warnings++;
        messages.push('Negative stock detected; will default to 0.');
      }

      // Department Detection
      let dept: Department = 'Books';
      const rawDept = columnMapping.department ? String(row[columnMapping.department] || '').toLowerCase() : '';
      if (rawDept.includes('sport')) dept = 'Sports';
      else if (rawDept.includes('station')) dept = 'Stationery';
      else if (columnMapping.sportName && row[columnMapping.sportName]) dept = 'Sports';
      else if (columnMapping.ruling && row[columnMapping.ruling]) dept = 'Stationery';
      else if (columnMapping.isbn && row[columnMapping.isbn]) dept = 'Books';

      const validRow: ParsedValidationRow = {
        rowNumber: rowNum,
        sku: rawSku,
        name: rawName || `Product ${rawSku}`,
        department: dept,
        sellingPriceRs: Math.max(0, spRes.val),
        mrpRs: Math.max(0, mrpRes.val),
        costPriceRs: Math.max(0, cpRes.val),
        stock: Math.max(0, Math.floor(stockRes.val)),
        minStock: Math.max(0, Math.floor(minStockRes.val)),
        taxRate: Math.max(0, taxRes.val),
        location: columnMapping.storageLocation ? String(row[columnMapping.storageLocation] || 'Unassigned') : 'Unassigned',
        status: 'Active',
        brand: columnMapping.brand ? String(row[columnMapping.brand] || '') : undefined,
        // Department fields
        isbn: columnMapping.isbn ? String(row[columnMapping.isbn] || '') : undefined,
        publisher: columnMapping.publisher ? String(row[columnMapping.publisher] || '') : undefined,
        author: columnMapping.author ? String(row[columnMapping.author] || '') : undefined,
        classGrade: columnMapping.classGrade ? String(row[columnMapping.classGrade] || '') : undefined,
        board: columnMapping.board ? String(row[columnMapping.board] || '') : undefined,
        subject: columnMapping.subject ? String(row[columnMapping.subject] || '') : undefined,
        editionYear: columnMapping.editionYear ? String(row[columnMapping.editionYear] || '') : undefined,
        packSize: columnMapping.packSize ? String(row[columnMapping.packSize] || '') : undefined,
        itemColor: columnMapping.itemColor ? String(row[columnMapping.itemColor] || '') : undefined,
        ruling: columnMapping.ruling ? String(row[columnMapping.ruling] || '') : undefined,
        dimensions: columnMapping.dimensions ? String(row[columnMapping.dimensions] || '') : undefined,
        sportName: columnMapping.sportName ? String(row[columnMapping.sportName] || '') : undefined,
        size: columnMapping.size ? String(row[columnMapping.size] || '') : undefined,
        material: columnMapping.material ? String(row[columnMapping.material] || '') : undefined,
        playingLevel: columnMapping.playingLevel ? String(row[columnMapping.playingLevel] || '') : undefined,
        isValid: !isFatal,
        isWarning: isWarn,
        messages
      };

      validated.push(validRow);
    });

    setValidatedRows(validated);
    setFatalErrors(fatalList);
    setWarningCount(warnings);
    setCurrentStep(3);
  };

  // Step 4: Execute Atomic Batch Processing
  const handleExecuteImport = async () => {
    if (fatalErrors.length > 0) {
      if (!window.confirm(`There are ${fatalErrors.length} fatal errors in this file. The system will skip these invalid rows and process only the ${validatedRows.length - fatalErrors.length} valid rows. Proceed?`)) {
        return;
      }
    }

    const validRows = validatedRows.filter(r => r.isValid);
    if (validRows.length === 0) {
      alert('No valid rows available to import.');
      return;
    }

    setIsProcessing(true);
    setProcessProgress(0);
    setCurrentStep(4);

    const batchId = `BATCH-${Date.now().toString().slice(-6)}`;
    const chunkSize = 150; // Chunks of 100-250 items as per spec
    let totalCreated = 0;
    let totalUpdated = 0;

    for (let i = 0; i < validRows.length; i += chunkSize) {
      const chunk = validRows.slice(i, i + chunkSize);

      // Convert validation rows to Partial<Product> with paise math
      const productsChunk: Partial<Product>[] = chunk.map(r => ({
        sku: r.sku,
        name: r.name,
        department: r.department,
        price: r.sellingPriceRs,
        costPrice: r.costPriceRs,
        mrp: r.mrpRs,
        sellingPricePaise: rupeesToPaise(r.sellingPriceRs),
        costPricePaise: rupeesToPaise(r.costPriceRs),
        mrpPaise: rupeesToPaise(r.mrpRs),
        stock: r.stock,
        minStockThreshold: r.minStock,
        taxRate: r.taxRate,
        storageLocation: r.location,
        status: r.status,
        brand: r.brand,
        isbn: r.isbn,
        publisher: r.publisher,
        author: r.author,
        classGrade: r.classGrade,
        board: r.board as any,
        subject: r.subject,
        editionYear: r.editionYear,
        packSize: r.packSize,
        itemColor: r.itemColor,
        ruling: r.ruling,
        dimensions: r.dimensions,
        sportName: r.sportName,
        size: r.size,
        material: r.material,
        playingLevel: r.playingLevel
      }));

      // Atomic batch commit into StorageService
      const result = StorageService.bulkUpsertProducts(productsChunk, workflow, batchId, adminUser);
      totalCreated += result.created;
      totalUpdated += result.updated;

      // Update progress
      const progressPercent = Math.min(100, Math.round(((i + chunk.length) / validRows.length) * 100));
      setProcessProgress(progressPercent);

      // Yield thread briefly for smooth UI progress bar rendering (avoids browser freeze)
      await new Promise(resolve => setTimeout(resolve, 60));
    }

    setIsProcessing(false);
    setProcessStats({ created: totalCreated, updated: totalUpdated, batchId });
    onImportComplete();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Top Banner & Tabs */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-navy px-2.5 py-0.5 rounded-full font-mono">
              High-Velocity IMS Engine
            </span>
            <span className="text-xs text-slate-300">
              Sarswati Pustak and Sports Bhandar • Pachrukhi
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-amber-400" />
            Spreadsheet Import & Export Engine
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Bulk catalog seeding, price adjustments, stock reconciliation, and styled exports with zero leading-zero loss.
          </p>
        </div>

        {/* Main Mode Toggle: Import vs Export */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl self-start md:self-auto border border-white/10">
          <button
            onClick={() => setActiveMainTab('import')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeMainTab === 'import' ? 'bg-amber-500 text-navy shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Spreadsheet Import</span>
          </button>
          <button
            onClick={() => setActiveMainTab('export')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeMainTab === 'export' ? 'bg-amber-500 text-navy shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Inventory Export</span>
          </button>
        </div>
      </div>

      {activeMainTab === 'import' ? (
        <div className="p-6">
          
          {/* Step Indicator */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {[
              { num: 1, label: 'Upload & Mode' },
              { num: 2, label: 'Column Mapping' },
              { num: 3, label: 'Dry-Run Validation' },
              { num: 4, label: 'Atomic Execution' }
            ].map(step => (
              <div 
                key={step.num}
                className={`py-2 px-3 rounded-xl border text-center transition ${currentStep === step.num ? 'border-amber-500 bg-amber-50/50 text-navy font-bold shadow-sm' : currentStep > step.num ? 'border-emerald-200 bg-emerald-50/40 text-emerald-800 font-medium' : 'border-slate-200 bg-slate-50 text-slate-400'}`}
              >
                <div className="text-[11px] uppercase tracking-wider">Step {step.num}</div>
                <div className="text-xs truncate">{step.label}</div>
              </div>
            ))}
          </div>

          {/* STEP 1: Upload Modal with drag & drop and template downloads */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
              {/* Pre-formatted Template Downloads Banner */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                      <Download className="w-4 h-4 text-amber-700" />
                      Download Standard Pre-formatted Inventory Templates
                    </h4>
                    <p className="text-xs text-amber-900 mt-0.5">
                      Includes accurate NCERT, State Board, stationery pack, and sports equipment sample rows.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => downloadSpreadsheetTemplate('master', 'xlsx')}
                    className="p-3 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-left transition group shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">All-in-One</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-900 block truncate">Master Catalog .xlsx</span>
                    <span className="text-[10px] text-slate-500">Universal + Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadSpreadsheetTemplate('books', 'xlsx')}
                    className="p-3 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-left transition group shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">Books Only</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900 block truncate">NCERT & Boards .xlsx</span>
                    <span className="text-[10px] text-slate-500">ISBN, Board, Class</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadSpreadsheetTemplate('stationery', 'xlsx')}
                    className="p-3 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-left transition group shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Stationery</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 block truncate">Stationery Items .xlsx</span>
                    <span className="text-[10px] text-slate-500">Pack, Ruling, Color</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadSpreadsheetTemplate('sports', 'xlsx')}
                    className="p-3 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-left transition group shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Sports Gear</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 block truncate">Sports Inventory .xlsx</span>
                    <span className="text-[10px] text-slate-500">Sport, Size, Material</span>
                  </button>
                </div>
              </div>

              {/* Workflow Selection Cards */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Select Import Workflow
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'full_upsert' as ImportWorkflowType,
                      title: 'Full Catalog Upsert',
                      badge: 'Recommended',
                      desc: 'Creates new SKUs and updates existing items in a single pass. Perfect for session stock seeding.'
                    },
                    {
                      id: 'update_stock_prices' as ImportWorkflowType,
                      title: 'Update Stock & Prices Only',
                      badge: 'Quick Reconciliation',
                      desc: 'Matches existing SKUs, updates stock counts and selling prices, leaves descriptions & photos untouched.'
                    },
                    {
                      id: 'create_new' as ImportWorkflowType,
                      title: 'Create New Products Only',
                      badge: 'Strict Insertion',
                      desc: 'Inserts only new SKUs. Strictly rejects existing SKUs to avoid accidental overrides.'
                    }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWorkflow(w.id)}
                      className={`p-4 rounded-xl text-left border-2 transition relative ${workflow === w.id ? 'border-navy bg-navy/5 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{w.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${workflow === w.id ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {w.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Upload Spreadsheet File (.csv, .xlsx, .xls)
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={e => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${isDragging ? 'border-amber-500 bg-amber-50/50' : 'border-slate-300 hover:border-navy bg-slate-50/50'}`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">
                      Drag & Drop your spreadsheet here, or <span className="text-navy underline">browse</span>
                    </span>
                    <span className="text-xs text-slate-500 block mt-1">
                      Supports .csv, .xlsx, and .xls spreadsheets up to 10MB
                    </span>
                  </div>
                </div>

                {fileError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 2: Column Mapping Interface */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-amber-600" />
                    Header & Column Mapping
                  </h4>
                  <p className="text-xs text-slate-500">
                    File: <span className="font-semibold text-slate-800">{uploadedFile?.name}</span> ({rawSheetData.length} rows detected)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Choose Different File
                </button>
              </div>

              {/* Column Mapping Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'sku', label: 'SKU / Barcode *', required: true },
                  { key: 'name', label: 'Product Name *', required: workflow !== 'update_stock_prices' },
                  { key: 'sellingPrice', label: 'Selling Price (₹) *', required: true },
                  { key: 'stock', label: 'Current Stock *', required: true },
                  { key: 'mrp', label: 'MRP (₹)', required: false },
                  { key: 'costPrice', label: 'Cost Price (₹)', required: false },
                  { key: 'minStockThreshold', label: 'Min Low-Stock Alert', required: false },
                  { key: 'storageLocation', label: 'Shelf / Rack Tag', required: false },
                  { key: 'taxRate', label: 'GST Tax Rate %', required: false },
                  { key: 'department', label: 'Department (Books/Stationery/Sports)', required: false },
                  { key: 'brand', label: 'Brand', required: false },
                  // Department specific
                  { key: 'isbn', label: 'ISBN (Books)', required: false },
                  { key: 'board', label: 'Board (NCERT/BSEB)', required: false },
                  { key: 'classGrade', label: 'Class / Grade', required: false },
                  { key: 'subject', label: 'Subject', required: false },
                  { key: 'publisher', label: 'Publisher', required: false },
                  { key: 'packSize', label: 'Pack Size (Stationery)', required: false },
                  { key: 'ruling', label: 'Ruling (Plain/Ruled)', required: false },
                  { key: 'sportName', label: 'Sport Name', required: false },
                  { key: 'size', label: 'Size Variant (Sports)', required: false },
                  { key: 'material', label: 'Material (Willow/PU)', required: false }
                ].map(col => {
                  const currentMappedHeader = columnMapping[col.key] || '';
                  const sampleVal = currentMappedHeader && rawSheetData[0] ? rawSheetData[0][currentMappedHeader] : '';

                  return (
                    <div key={col.key} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800">
                          {col.label}
                        </label>
                        {col.required && (
                          <span className="text-[10px] text-red-600 font-bold">Required</span>
                        )}
                      </div>

                      <select
                        value={currentMappedHeader}
                        onChange={e => setColumnMapping({ ...columnMapping, [col.key]: e.target.value })}
                        className={`w-full text-xs py-2 px-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${currentMappedHeader ? 'border-emerald-300 font-semibold text-slate-900' : 'border-slate-300 text-slate-400'}`}
                      >
                        <option value="">-- Ignore / Unmapped --</option>
                        {sheetHeaders.map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>

                      {currentMappedHeader && (
                        <div className="text-[10px] text-slate-500 truncate">
                          Sample value: <span className="font-mono text-slate-700 font-medium">{String(sampleVal || '(empty)')}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition"
                >
                  Back to File
                </button>
                <button
                  type="button"
                  onClick={runDryRunValidation}
                  className="px-6 py-2.5 bg-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                >
                  <span>Dry-Run & Validate Rows</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Dry-Run & Live Validation Preview */}
          {currentStep === 3 && (
            <div className="space-y-6">
              
              {/* Validation Summary Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="text-xs text-slate-500 font-medium">Total Rows</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{validatedRows.length}</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <span className="text-xs text-emerald-700 font-medium">Valid Ready Rows</span>
                  <div className="text-2xl font-black text-emerald-800 mt-1">
                    {validatedRows.filter(r => r.isValid).length}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <span className="text-xs text-amber-700 font-medium">Warnings (Soft)</span>
                  <div className="text-2xl font-black text-amber-800 mt-1">{warningCount}</div>
                </div>

                <div className={`rounded-xl p-4 border ${fatalErrors.length > 0 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-xs font-medium ${fatalErrors.length > 0 ? 'text-red-700' : 'text-slate-500'}`}>Fatal Errors</span>
                  <div className={`text-2xl font-black mt-1 ${fatalErrors.length > 0 ? 'text-red-800' : 'text-slate-900'}`}>
                    {fatalErrors.length}
                  </div>
                </div>
              </div>

              {/* Fatal Error Action Bar */}
              {fatalErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-red-900 text-sm">
                        {fatalErrors.length} rows have fatal validation errors
                      </h5>
                      <p className="text-xs text-red-700">
                        Missing SKUs, duplicate codes, or invalid price formats were detected.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadErrorLogCSV(fatalErrors)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Error Log (.csv)</span>
                  </button>
                </div>
              )}

              {/* First 10 Rows Preview Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    First 10 Rows Validation Sample
                  </span>
                  <span className="text-xs text-slate-500">
                    Previewing top {Math.min(10, validatedRows.length)} rows
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Row #</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Product Name</th>
                        <th className="py-2.5 px-3">Dept</th>
                        <th className="py-2.5 px-3">Selling Price</th>
                        <th className="py-2.5 px-3">Stock</th>
                        <th className="py-2.5 px-3">Shelf</th>
                        <th className="py-2.5 px-3">Validation Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {validatedRows.slice(0, 10).map(r => (
                        <tr key={r.rowNumber} className={r.isValid ? 'hover:bg-slate-50' : 'bg-red-50/40'}>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{r.rowNumber}</td>
                          <td className="py-2.5 px-3">
                            {r.isValid ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                <Check className="w-3 h-3" /> Valid
                              </span>
                            ) : (
                              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                <XCircle className="w-3 h-3" /> Fatal
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{r.sku || '(Missing)'}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">{r.name}</td>
                          <td className="py-2.5 px-3">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">{r.department}</span>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{formatINR(r.sellingPriceRs)}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{r.stock}</td>
                          <td className="py-2.5 px-3 text-slate-600">{r.location}</td>
                          <td className="py-2.5 px-3 text-xs">
                            {r.messages.length > 0 ? (
                              <span className={r.isValid ? 'text-amber-700' : 'text-red-700 font-medium'}>
                                {r.messages.join(' • ')}
                              </span>
                            ) : (
                              <span className="text-slate-400">Ready to commit</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Execution Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition"
                >
                  Adjust Column Mapping
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setUploadedFile(null);
                      setRawSheetData([]);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteImport}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    <span>Execute Atomic Batch Import</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Real-time Execution & Atomic Progress */}
          {currentStep === 4 && (
            <div className="space-y-8 py-6">
              {isProcessing ? (
                <div className="max-w-md mx-auto text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-amber-600 animate-spin">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Processing Atomic Import Batches...
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Processing in safe chunks of 150 records to prevent memory freeze and maintain database consistency.
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${processProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                      <span>Velocity: ~450 rows/sec</span>
                      <span>{processProgress}% complete</span>
                    </div>
                  </div>
                </div>
              ) : processStats ? (
                <div className="max-w-lg mx-auto bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 mx-auto flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">
                      Import Execution Completed!
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-mono">
                      Batch Reference ID: <span className="font-bold text-slate-900">{processStats.batchId}</span>
                    </p>
                  </div>

                  {/* Stats Breakdown */}
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-xs text-slate-500">New Products Created</span>
                      <div className="text-2xl font-black text-emerald-700 mt-0.5">
                        +{processStats.created}
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-xs text-slate-500">Existing Records Updated</span>
                      <div className="text-2xl font-black text-blue-700 mt-0.5">
                        {processStats.updated}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Stock adjustments have been posted to the immutable ledger (<code className="font-mono text-slate-700">stock_movements</code>) and reflected on both the storefront and admin catalog in real time.
                  </p>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        setUploadedFile(null);
                        setRawSheetData([]);
                        setProcessStats(null);
                      }}
                      className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition"
                    >
                      Import Another Sheet
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

        </div>
      ) : (
        /* EXPORT ENGINE TAB */
        <div className="p-6 space-y-6">
          <div className="max-w-2xl">
            <h3 className="font-bold text-base text-slate-900">
              Filtered Catalog & Inventory Exporter
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Export current catalog with clean string formatting (protecting leading zeroes and bar code strings from truncation in Excel).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Department
              </label>
              <select
                value={exportDept}
                onChange={e => setExportDept(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-navy"
              >
                <option value="All">All Departments</option>
                <option value="Books">Books (NCERT & Board)</option>
                <option value="Stationery">Stationery Supplies</option>
                <option value="Sports">Sports Equipment</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Stock Status Filter
              </label>
              <select
                value={exportStockFilter}
                onChange={e => setExportStockFilter(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-navy"
              >
                <option value="all">All Stock Statuses</option>
                <option value="in_stock">In Stock Only (&gt;0)</option>
                <option value="low_stock">Low Stock (≤ Threshold)</option>
                <option value="out_of_stock">Out of Stock (0 units)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Export File Format
              </label>
              <select
                value={exportFormat}
                onChange={e => setExportFormat(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-navy"
              >
                <option value="xlsx">Styled Excel Spreadsheet (.xlsx)</option>
                <option value="csv">Standard Comma Separated (.csv)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Total active catalog items available: <strong>{products.length} products</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                exportInventoryData(products, {
                  department: exportDept,
                  stockFilter: exportStockFilter,
                  format: exportFormat
                });
              }}
              className="px-6 py-2.5 bg-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Generate & Download Export</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
