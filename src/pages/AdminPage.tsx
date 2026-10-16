import React, { useState, useEffect } from 'react';
import { 
  Product, 
  Order, 
  BooklistRequest, 
  CustomerEnquiry, 
  StoreSettings, 
  OrderStatus,
  ProductCategory,
  SportsBulkEnquiry,
  Department,
  StockMovement
} from '../types';
import { StorageService, rupeesToPaise, paiseToRupees } from '../services/storage';
import { formatINR, exportProductsToCSV, getWhatsAppOrderUrl, getWhatsAppBooklistUrl } from '../utils/helpers';
import { CATEGORIES } from '../data/categories';
import { SPORTS_CATEGORIES } from '../data/sportsCategories';
import { SpreadsheetImportEngine } from '../components/admin/SpreadsheetImportEngine';
import { StockAuditLedgerView } from '../components/admin/StockAuditLedgerView';
import { ReorderAlertsView } from '../components/admin/ReorderAlertsView';
import { BarcodeQuickAdjustModal } from '../components/admin/BarcodeQuickAdjustModal';
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  ShoppingBag, 
  FileSpreadsheet, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  LogOut,
  IndianRupee,
  Clock,
  ArrowRight,
  Eye,
  Check,
  Trophy,
  Users,
  Scan,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  FileText,
  AlertCircle,
  BookOpen,
  Tag
} from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  orders: Order[];
  booklistRequests: BooklistRequest[];
  enquiries: CustomerEnquiry[];
  settings: StoreSettings;
  onRefreshData: () => void;
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  orders,
  booklistRequests,
  enquiries,
  settings,
  onRefreshData,
  onNavigate
}) => {
  // Authentication State (Required: Admin ID = Rahu1819, Password = Ritadevi@181920)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('spsb_admin_auth') === 'true';
  });
  const [adminIdInput, setAdminIdInput] = useState<string>(() => {
    return sessionStorage.getItem('spsb_admin_id') || '';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [adminUser, setAdminUser] = useState<string>(() => {
    return sessionStorage.getItem('spsb_admin_id') || 'Rahu1819';
  });

  // Admin Active Tab (includes universal inventory, import engine, reorder alerts, and audit ledger)
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'products' | 'import-engine' | 'reorder-alerts' | 'audit-logs' | 'sports' | 'orders' | 'booklists' | 'settings'>('overview');
  
  // Barcode / Fast POS modal state
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  // Stock movements ledger state
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => StorageService.getStockMovements());

  useEffect(() => {
    const handleMovementsUpdate = () => {
      setStockMovements(StorageService.getStockMovements());
    };
    window.addEventListener('spsb_movements_updated', handleMovementsUpdate);
    return () => window.removeEventListener('spsb_movements_updated', handleMovementsUpdate);
  }, []);
  const [sportsSubTab, setSportsSubTab] = useState<'bulk-enquiries' | 'inventory' | 'categories'>('bulk-enquiries');
  const [sportsEnquiries, setSportsEnquiries] = useState<SportsBulkEnquiry[]>(() => StorageService.getSportsBulkEnquiries());
  const [customSportsCategories, setCustomSportsCategories] = useState<any[]>(() => StorageService.getCustomSportsCategories());

  // Category addition form
  const [newCatName, setNewCatName] = useState('');
  const [newCatTagline, setNewCatTagline] = useState('');
  const [newCatSubcats, setNewCatSubcats] = useState('');
  const [newCatBrands, setNewCatBrands] = useState('');
  const [catAddedSuccess, setCatAddedSuccess] = useState(false);

  // Sports bulk quote editing
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [quoteInputAmount, setQuoteInputAmount] = useState<number>(0);
  const [quoteInputNotes, setQuoteInputNotes] = useState<string>('');

  // Search & Filters in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product Add / Edit Modal State (Universal Schema + Dynamic Dept Attributes)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalTab, setProductModalTab] = useState<'core' | 'department'>('core');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Universal Core Form Fields
  const [formSku, setFormSku] = useState('');
  const [formName, setFormName] = useState('');
  const [formDepartment, setFormDepartment] = useState<Department>('Books');
  const [formCategory, setFormCategory] = useState<ProductCategory>('school-ncert');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formPrice, setFormPrice] = useState<number>(150);
  const [formMrp, setFormMrp] = useState<number>(150);
  const [formCostPrice, setFormCostPrice] = useState<number>(115);
  const [formStock, setFormStock] = useState<number>(25);
  const [formMinStockThreshold, setFormMinStockThreshold] = useState<number>(5);
  const [formTaxRate, setFormTaxRate] = useState<number>(0);
  const [formStorageLocation, setFormStorageLocation] = useState('Rack-B1');
  const [formStatus, setFormStatus] = useState<'Active' | 'Draft' | 'Archived'>('Active');
  const [formBrand, setFormBrand] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Dynamic Department Fields: Books
  const [formIsbn, setFormIsbn] = useState('');
  const [formPublisher, setFormPublisher] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formClassGrade, setFormClassGrade] = useState('');
  const [formBoard, setFormBoard] = useState<'NCERT / CBSE' | 'Bihar Board' | 'ICSE' | 'General'>('NCERT / CBSE');
  const [formSubject, setFormSubject] = useState('');
  const [formEditionYear, setFormEditionYear] = useState('2026');

  // Dynamic Department Fields: Stationery
  const [formPackSize, setFormPackSize] = useState('');
  const [formItemColor, setFormItemColor] = useState('');
  const [formRuling, setFormRuling] = useState('Ruled');
  const [formDimensions, setFormDimensions] = useState('');

  // Dynamic Department Fields: Sports
  const [formSportName, setFormSportName] = useState('');
  const [formSize, setFormSize] = useState('');
  const [formMaterial, setFormMaterial] = useState('');
  const [formPlayingLevel, setFormPlayingLevel] = useState('Tournament');

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Settings State Form
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(settings.isAnnouncementActive);
  const [phonePrimary, setPhonePrimary] = useState(settings.phonePrimary);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleUpdateSportsEnquiryStatus = (id: string, status: SportsBulkEnquiry['status'], quoteAmount?: number, notes?: string) => {
    StorageService.updateSportsBulkEnquiryStatus(id, status, quoteAmount, notes);
    setSportsEnquiries(StorageService.getSportsBulkEnquiries());
    onRefreshData();
  };

  const handleCreateSportsCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      id: `sports-${slug}` as ProductCategory,
      slug,
      name: newCatName,
      shortName: newCatName,
      tagline: newCatTagline || 'Authentic Sports Equipment',
      description: newCatTagline || `Handpicked ${newCatName} sports gear available at our Pachrukhi store.`,
      iconName: 'Trophy',
      bannerImage: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80',
      subcategories: newCatSubcats ? newCatSubcats.split(',').map(s => s.trim()) : ['General Accessories'],
      popularBrands: newCatBrands ? newCatBrands.split(',').map(s => s.trim()) : ['SG', 'Nivia', 'Cosco']
    };
    StorageService.saveCustomSportsCategory(newCat);
    setCustomSportsCategories(StorageService.getCustomSportsCategories());
    setNewCatName('');
    setNewCatTagline('');
    setNewCatSubcats('');
    setNewCatBrands('');
    setCatAddedSuccess(true);
    setTimeout(() => setCatAddedSuccess(false), 3000);
  };

  // Handle Login: Strictly enforces Admin ID "Rahu1819" and Password "Ritadevi@181920"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = adminIdInput.trim();
    if (cleanId === 'Rahu1819' && passwordInput === 'Ritadevi@181920') {
      setIsAuthenticated(true);
      setAdminUser('Rahu1819');
      sessionStorage.setItem('spsb_admin_auth', 'true');
      sessionStorage.setItem('spsb_admin_id', 'Rahu1819');
      setLoginError('');
    } else {
      setLoginError('Invalid Admin ID or Password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spsb_admin_auth');
    sessionStorage.removeItem('spsb_admin_id');
  };

  // Open Product Modal for Creation
  const handleOpenAddProduct = (defaultDept: Department = 'Books') => {
    setEditingProduct(null);
    setProductModalTab('core');
    setFormSku(`SPSB-${defaultDept.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`);
    setFormName('');
    setFormDepartment(defaultDept);
    setFormCategory(defaultDept === 'Books' ? 'school-ncert' : defaultDept === 'Sports' ? 'sports-equipment' : 'stationery');
    setFormSubcategory('');
    setFormPrice(150);
    setFormMrp(150);
    setFormCostPrice(115);
    setFormStock(25);
    setFormMinStockThreshold(5);
    setFormTaxRate(defaultDept === 'Books' ? 0 : defaultDept === 'Sports' ? 12 : 18);
    setFormStorageLocation(defaultDept === 'Books' ? 'Rack-B1' : defaultDept === 'Sports' ? 'Sports-Bay-1' : 'Shelf-S1');
    setFormStatus('Active');
    setFormBrand('');
    setFormImage(
      defaultDept === 'Books'
        ? 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
        : defaultDept === 'Sports'
        ? 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    );
    setFormDescription('Available at Sarswati Pustak and Sports Bhandar, Pachrukhi, Siwan.');
    // Dynamic Books
    setFormIsbn('');
    setFormPublisher('');
    setFormAuthor('');
    setFormClassGrade('');
    setFormBoard('NCERT / CBSE');
    setFormSubject('');
    setFormEditionYear('2026');
    // Dynamic Stationery
    setFormPackSize('');
    setFormItemColor('');
    setFormRuling('Ruled');
    setFormDimensions('');
    // Dynamic Sports
    setFormSportName('');
    setFormSize('');
    setFormMaterial('');
    setFormPlayingLevel('Tournament');

    setIsProductModalOpen(true);
  };

  // Open Product Modal for Editing
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductModalTab('core');
    setFormSku(p.sku);
    setFormName(p.name);
    setFormDepartment(p.department || 'Books');
    setFormCategory(p.category);
    setFormSubcategory(p.subcategory || '');
    setFormPrice(p.price);
    setFormMrp(p.mrp || p.price);
    setFormCostPrice(p.costPrice || Math.round(p.price * 0.75));
    setFormStock(p.stock);
    setFormMinStockThreshold(p.minStockThreshold ?? 5);
    setFormTaxRate(p.taxRate ?? (p.department === 'Books' ? 0 : 18));
    setFormStorageLocation(p.storageLocation || 'Rack-B1');
    setFormStatus(p.status || 'Active');
    setFormBrand(p.brand || '');
    setFormImage(p.images[0] || '');
    setFormDescription(p.description || '');
    // Books
    setFormIsbn(p.isbn || '');
    setFormPublisher(p.publisher || '');
    setFormAuthor(p.author || '');
    setFormClassGrade(p.classGrade || '');
    setFormBoard(p.board || 'NCERT / CBSE');
    setFormSubject(p.subject || '');
    setFormEditionYear(p.editionYear || '2026');
    // Stationery
    setFormPackSize(p.packSize || '');
    setFormItemColor(p.itemColor || '');
    setFormRuling(p.ruling || 'Ruled');
    setFormDimensions(p.dimensions || '');
    // Sports
    setFormSportName(p.sportName || '');
    setFormSize(p.size || '');
    setFormMaterial(p.material || '');
    setFormPlayingLevel(p.playingLevel || 'Tournament');

    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) {
      alert('Product Name and SKU are required.');
      return;
    }

    const price = Math.max(0, formPrice);
    const mrp = Math.max(price, formMrp);
    const costPrice = Math.max(0, formCostPrice);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        sku: formSku.trim(),
        name: formName.trim(),
        department: formDepartment,
        category: formCategory,
        subcategory: formSubcategory.trim() || undefined,
        price,
        costPrice,
        mrp,
        sellingPricePaise: rupeesToPaise(price),
        costPricePaise: rupeesToPaise(costPrice),
        mrpPaise: rupeesToPaise(mrp),
        stock: Math.max(0, Math.floor(formStock)),
        minStockThreshold: Math.max(0, Math.floor(formMinStockThreshold)),
        taxRate: formTaxRate,
        storageLocation: formStorageLocation.trim() || 'Rack-B1',
        status: formStatus,
        brand: formBrand.trim() || undefined,
        images: formImage ? [formImage, ...editingProduct.images.slice(1)] : editingProduct.images,
        description: formDescription.trim(),
        // Books
        isbn: formIsbn.trim() || undefined,
        publisher: formPublisher.trim() || undefined,
        author: formAuthor.trim() || undefined,
        classGrade: formClassGrade.trim() || undefined,
        board: formBoard,
        subject: formSubject.trim() || undefined,
        editionYear: formEditionYear.trim() || undefined,
        // Stationery
        packSize: formPackSize.trim() || undefined,
        itemColor: formItemColor.trim() || undefined,
        ruling: formRuling.trim() || undefined,
        dimensions: formDimensions.trim() || undefined,
        // Sports
        sportName: formSportName.trim() || undefined,
        size: formSize.trim() || undefined,
        material: formMaterial.trim() || undefined,
        playingLevel: formPlayingLevel.trim() || undefined,
        updatedAt: new Date().toISOString()
      };
      StorageService.saveProduct(updated, adminUser);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        sku: formSku.trim(),
        name: formName.trim(),
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        department: formDepartment,
        category: formCategory,
        subcategory: formSubcategory.trim() || undefined,
        price,
        costPrice,
        mrp,
        sellingPricePaise: rupeesToPaise(price),
        costPricePaise: rupeesToPaise(costPrice),
        mrpPaise: rupeesToPaise(mrp),
        stock: Math.max(0, Math.floor(formStock)),
        minStockThreshold: Math.max(0, Math.floor(formMinStockThreshold)),
        taxRate: formTaxRate,
        storageLocation: formStorageLocation.trim() || 'Rack-B1',
        status: formStatus,
        images: [formImage || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'],
        brand: formBrand.trim() || undefined,
        description: formDescription.trim(),
        tags: [formDepartment.toLowerCase(), formCategory, formBrand.toLowerCase()],
        // Books
        isbn: formIsbn.trim() || undefined,
        publisher: formPublisher.trim() || undefined,
        author: formAuthor.trim() || undefined,
        classGrade: formClassGrade.trim() || undefined,
        board: formBoard,
        subject: formSubject.trim() || undefined,
        editionYear: formEditionYear.trim() || undefined,
        // Stationery
        packSize: formPackSize.trim() || undefined,
        itemColor: formItemColor.trim() || undefined,
        ruling: formRuling.trim() || undefined,
        dimensions: formDimensions.trim() || undefined,
        // Sports
        sportName: formSportName.trim() || undefined,
        size: formSize.trim() || undefined,
        material: formMaterial.trim() || undefined,
        playingLevel: formPlayingLevel.trim() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      StorageService.saveProduct(newProd, adminUser);
    }

    setIsProductModalOpen(false);
    onRefreshData();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from store catalogue?`)) {
      StorageService.deleteProduct(id);
      onRefreshData();
    }
  };

  const handleQuickStock = (id: string, delta: number) => {
    const p = products.find(item => item.id === id);
    if (p) {
      const newStock = Math.max(0, p.stock + delta);
      const movementType = delta < 0 ? 'Store Sale' : 'Stock Addition (Purchase)';
      StorageService.updateStockWithMovement(
        p.sku, 
        newStock, 
        movementType, 
        `Quick adjustment (${delta > 0 ? `+${delta}` : delta} units) on shelf`,
        undefined,
        adminUser
      );
      onRefreshData();
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    const p = products.find(item => item.id === id);
    if (p) {
      StorageService.updateStockWithMovement(
        p.sku, 
        newStock, 
        'Manual Adjustment (Damage/Loss)', 
        'Direct inventory override',
        undefined,
        adminUser
      );
      onRefreshData();
    }
  };

  // Orders Management
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    StorageService.updateOrderStatus(orderId, status);
    onRefreshData();
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  // Booklist Quotes
  const handleUpdateBooklistStatus = (id: string, status: BooklistRequest['status'], quote?: number) => {
    StorageService.updateBooklistStatus(id, status, quote);
    onRefreshData();
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreSettings = {
      ...settings,
      announcementText,
      isAnnouncementActive,
      phonePrimary,
      whatsappNumber,
      freeDeliveryThreshold
    };
    StorageService.saveSettings(updated);
    onRefreshData();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // CSV Export
  const handleExportCSV = () => {
    const csvData = exportProductsToCSV(products);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sarswati_pustak_catalogue_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending_confirmation');
  const lowStockCount = products.filter(p => p.stock < 10).length;
  const sportsProducts = products.filter(p => p.category.startsWith('sports-') || p.category === 'sports-equipment' || Boolean(p.sportType));
  const pendingSportsQuotes = sportsEnquiries.filter(e => e.status === 'pending');

  // Inventory Department Filter State
  const [inventoryDeptFilter, setInventoryDeptFilter] = useState<'All' | Department>('All');

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const query = productSearch.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      (p.isbn && p.isbn.toLowerCase().includes(query)) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.storageLocation && p.storageLocation.toLowerCase().includes(query));

    const matchesDept = inventoryDeptFilter === 'All' || p.department === inventoryDeptFilter;

    return matchesSearch && matchesDept;
  });

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Gate: Strictly restricts access to Admin ID "Rahu1819" and Password "Ritadevi@181920"
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-700 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-navy text-amber-300 flex items-center justify-center mx-auto shadow-md border border-amber-500/30">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <div className="inline-block text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full mb-2">
              Authorized Store Administration Only
            </div>
            <h1 className="text-xl font-extrabold text-navy font-heading">
              Sarswati Pustak & Sports Bhandar
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Pachrukhi, Siwan, Bihar (PIN: 841241) • IMS Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin ID *
              </label>
              <input
                type="text"
                required
                placeholder="Enter Admin ID"
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Password *
              </label>
              <input
                type="password"
                required
                placeholder="Enter Admin Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Sign In to Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="text-navy font-semibold hover:underline"
            >
              ← Back to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Count items needing reorder
  const reorderNeededCount = products.filter(p => p.stock <= (p.minStockThreshold ?? 5)).length;

  return (
    <div className="bg-slate-100 min-h-screen">
      
      {/* Admin Top Header */}
      <header className="bg-navy text-white px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base font-heading flex items-center gap-2">
              <span>SARSWATI PUSTAK & SPORTS IMS</span>
              <span className="text-[10px] bg-amber-500 text-navy font-bold px-2 py-0.5 rounded font-mono">
                Admin: Rahu1819
              </span>
            </div>
            <div className="text-[11px] text-slate-300">Pachrukhi, Siwan (841241) • High-Reliability Inventory System</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Barcode Scanner Trigger Button */}
          <button
            onClick={() => setIsBarcodeModalOpen(true)}
            className="text-xs bg-amber-500 hover:bg-amber-400 text-navy font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition shadow"
            title="Open Live Barcode Gun & Fast POS Adjuster"
          >
            <Scan className="w-4 h-4" />
            <span className="hidden sm:inline">Barcode / POS Scanner</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition"
          >
            Storefront ↗
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 px-3 py-2 rounded-xl border border-red-800/60 flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <Package className="w-4 h-4" /> },
            { id: 'inventory', label: `Universal Inventory (${products.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'import-engine', label: 'Spreadsheet Import & Export', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> },
            { 
              id: 'reorder-alerts', 
              label: 'Reorder Alerts', 
              icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
              badge: reorderNeededCount > 0 ? `${reorderNeededCount} low` : undefined,
              badgeClass: 'bg-red-500 text-white'
            },
            { id: 'audit-logs', label: `Audit Ledger (${stockMovements.length})`, icon: <FileText className="w-4 h-4 text-blue-600" /> },
            { 
              id: 'sports', 
              label: `Sports Dept (${sportsProducts.length})`, 
              icon: <Trophy className="w-4 h-4 text-amber-500" />,
              badge: pendingSportsQuotes.length > 0 ? `${pendingSportsQuotes.length} quotes` : undefined
            },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <IndianRupee className="w-4 h-4" /> },
            { id: 'booklists', label: `Booklists (${booklistRequests.length})`, icon: <FileSpreadsheet className="w-4 h-4" /> },
            { id: 'settings', label: 'Store Settings', icon: <Settings className="w-4 h-4" /> }
          ].map((tab: any) => {
            const isActive = activeTab === tab.id || (tab.id === 'inventory' && activeTab === 'products');
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${tab.badgeClass || 'bg-amber-500 text-navy'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>Total Recorded Sales</span>
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-navy font-heading mt-2">
                  {formatINR(totalRevenue)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">From {orders.length} placed orders</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>Awaiting Confirmation</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-amber-700 font-heading mt-2">
                  {pendingOrders.length} Orders
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Requires stock verification</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>Low Stock Items (&lt;10)</span>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-2xl font-black text-red-700 font-heading mt-2">
                  {lowStockCount} Products
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Order from Patna / Siwan distributors</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <span>School Booklist Requests</span>
                  <FileSpreadsheet className="w-4 h-4 text-brand-600" />
                </div>
                <div className="text-2xl font-black text-brand-900 font-heading mt-2">
                  {booklistRequests.length} Submissions
                </div>
                <div className="text-[11px] text-slate-400 mt-1">DAV, KV, Pachrukhi High</div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider font-heading">
                  Recent Orders Placed
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-brand-800 font-bold hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-navy flex items-center gap-2">
                        <span>{order.orderNumber}</span>
                        <span className="font-normal text-slate-500">• {order.customer.fullName} ({order.customer.phone})</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        {order.items.length} items • {order.fulfilmentType === 'store_pickup' ? 'Pickup' : `Delivery to ${order.customer.villageOrLocality}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-navy">{formatINR(order.totalAmount)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <button
                        onClick={() => { setViewingOrder(order); }}
                        className="bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg text-slate-600"
                        title="View Order"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UNIVERSAL INVENTORY MANAGEMENT SYSTEM (IMS) */}
        {(activeTab === 'inventory' || activeTab === 'products') && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            
            {/* Header & Department Switcher Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-lg text-navy font-heading flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <span>Universal Catalog &amp; Stock Manager</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time inventory with decimal-safe paise calculations, shelf tags, and instant barcode counter adjustments.
                </p>
              </div>

              {/* Department Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {[
                  { id: 'All', label: `All (${products.length})` },
                  { id: 'Books' as Department, label: `Books (${products.filter(p => p.department === 'Books').length})` },
                  { id: 'Stationery' as Department, label: `Stationery (${products.filter(p => p.department === 'Stationery').length})` },
                  { id: 'Sports' as Department, label: `Sports (${products.filter(p => p.department === 'Sports').length})` }
                ].map(dept => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setInventoryDeptFilter(dept.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${inventoryDeptFilter === dept.id ? 'bg-navy text-white shadow-xs' : 'text-slate-600 hover:text-navy hover:bg-white/60'}`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by title, SKU, barcode, ISBN, shelf tag, brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsBarcodeModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-navy text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
                >
                  <Scan className="w-4 h-4" />
                  <span>Scan Barcode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('import-engine')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Bulk Import</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAddProduct(inventoryDeptFilter === 'All' ? 'Books' : inventoryDeptFilter)}
                  className="bg-navy hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-xs"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Universal Products Table */}
            <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Product / Identifier</th>
                    <th className="py-3 px-3">Dept &amp; Shelf</th>
                    <th className="py-3 px-3">Selling Price</th>
                    <th className="py-3 px-3">Cost / MRP</th>
                    <th className="py-3 px-3 text-center">Stock Quantity</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => {
                      const isLow = p.stock <= (p.minStockThreshold ?? 5);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition">
                          {/* Product Name & Identifiers */}
                          <td className="py-3 px-3 max-w-sm">
                            <div className="flex items-start gap-2.5">
                              <img 
                                src={p.images[0]} 
                                alt="" 
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=100&q=80';
                                }}
                                className="w-11 h-11 object-cover rounded-lg border border-slate-200 shrink-0 mt-0.5" 
                              />
                              <div>
                                <div className="font-bold text-slate-900 leading-snug">{p.name}</div>
                                <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex flex-wrap items-center gap-1.5">
                                  <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                                    {p.sku}
                                  </span>
                                  {p.isbn && <span>ISBN: {p.isbn}</span>}
                                  {p.brand && <span>• {p.brand}</span>}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Dept & Shelf Tag */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-navy text-white block w-fit mb-1">
                              {p.department || 'Books'}
                            </span>
                            {p.storageLocation ? (
                              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                                <MapPin className="w-3 h-3 text-amber-600" />
                                {p.storageLocation}
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">No Shelf Tag</span>
                            )}
                          </td>

                          {/* Selling Price */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-extrabold text-navy text-sm">
                              {formatINR(p.price)}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {p.sellingPricePaise ?? Math.round(p.price * 100)} paise
                            </div>
                          </td>

                          {/* Cost Price & MRP */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="text-slate-600 font-medium">
                              Cost: <strong>{formatINR(p.costPrice ?? Math.round(p.price * 0.75))}</strong>
                            </div>
                            {p.mrp && p.mrp > p.price && (
                              <div className="text-[11px] text-slate-400 line-through">
                                MRP: {formatINR(p.mrp)}
                              </div>
                            )}
                          </td>

                          {/* Stock Level with +/- counter */}
                          <td className="py-3 px-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className={`font-black text-sm ${isLow ? 'text-red-600' : 'text-slate-800'}`}>
                                {p.stock}
                              </span>
                              {isLow && (
                                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.2 rounded-full">
                                  Low
                                </span>
                              )}
                              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs ml-1">
                                <button
                                  type="button"
                                  onClick={() => handleQuickStock(p.id, -1)}
                                  className="px-2 py-0.5 hover:bg-slate-100 text-slate-700 font-black border-r border-slate-200 transition"
                                  title="Sell 1 Unit (Store Sale)"
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickStock(p.id, 1)}
                                  className="px-2 py-0.5 hover:bg-slate-100 text-emerald-700 font-black transition"
                                  title="Add 1 Unit (Purchase)"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Alert at &le; {p.minStockThreshold ?? 5}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-navy transition"
                              title="Edit Product & Attributes"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-600 transition"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No products match your search or department filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SPREADSHEET IMPORT & EXPORT ENGINE */}
        {activeTab === 'import-engine' && (
          <SpreadsheetImportEngine 
            products={products} 
            onImportComplete={onRefreshData} 
            adminUser={adminUser} 
          />
        )}

        {/* TAB 4: REORDER ALERTS & LOW STOCK VIEW */}
        {activeTab === 'reorder-alerts' && (
          <ReorderAlertsView
            products={products}
            onRefresh={onRefreshData}
            onOpenQuickAdjust={handleOpenEditProduct}
            adminUser={adminUser}
          />
        )}

        {/* TAB 5: STOCK AUDIT LEDGER */}
        {activeTab === 'audit-logs' && (
          <StockAuditLedgerView
            movements={stockMovements}
            onRefresh={() => setStockMovements(StorageService.getStockMovements())}
            adminUser={adminUser}
          />
        )}

        {/* TAB: SPORTS DEPARTMENT ADMINISTRATION */}
        {activeTab === 'sports' && (
          <div className="space-y-6">
            
            {/* Sports Admin Sub-navigation Header */}
            <div className="bg-gradient-to-r from-slate-950 via-navy to-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Sports Retail &amp; Institutional Supply Desk</span>
                </div>
                <h2 className="text-2xl font-black font-heading text-white">
                  Sports Department Console
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Manage school sports day bulk quotations, club tournament requests, sports-specific inventory movements, and dynamic category expansion.
                </p>
              </div>

              {/* Sub Tabs */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSportsSubTab('bulk-enquiries')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sportsSubTab === 'bulk-enquiries'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>School/Team Quotes</span>
                  {pendingSportsQuotes.length > 0 && (
                    <span className="ml-1.5 text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-extrabold">
                      {pendingSportsQuotes.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSportsSubTab('inventory')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sportsSubTab === 'inventory'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sports Stock ({sportsProducts.length})
                </button>

                <button
                  type="button"
                  onClick={() => setSportsSubTab('categories')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sportsSubTab === 'categories'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Categories Manager
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: BULK & TOURNAMENT QUOTES */}
            {sportsSubTab === 'bulk-enquiries' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy font-heading">
                      School &amp; Tournament Quotation Requests ({sportsEnquiries.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Incoming bulk requests from schools, coaching academies, and local cricket/football tournaments.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {sportsEnquiries.map((enq) => {
                    const waText = `Namaste ${enq.contactPerson},\nRegarding your bulk quotation for ${enq.institutionOrTeam} (Ref: ${enq.referenceNumber}):\nWe have prepared your quotation for: ${enq.sportsNeeded.join(', ')}.\nQuoted Total: ${enq.quoteAmount ? formatINR(enq.quoteAmount) : 'Contact store for final sheet'}.\nDelivery: Direct to ${enq.addressOrLocation}.\n\n- Sarswati Pustak & Sports Bhandar, Pachrukhi (070917 91893)`;
                    const waUrl = `https://wa.me/${enq.whatsapp || enq.phone}?text=${encodeURIComponent(waText)}`;

                    return (
                      <div
                        key={enq.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all space-y-3"
                      >
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold bg-navy text-amber-300 px-2.5 py-1 rounded-lg">
                              {enq.referenceNumber}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-900 font-heading">
                              {enq.institutionOrTeam}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateSportsEnquiryStatus(enq.id, e.target.value as any, enq.quoteAmount, enq.notes)}
                              className="text-xs bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
                            >
                              <option value="pending">Pending Review</option>
                              <option value="quoted">Quoted / Sent Pricing</option>
                              <option value="confirmed">Confirmed / Stock Reserved</option>
                              <option value="fulfilled">Fulfilled / Delivered</option>
                            </select>

                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Quote</span>
                            </a>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200/80">
                          <div>
                            <span className="text-slate-400 font-medium block text-[10px] uppercase">Contact Person:</span>
                            <span className="font-bold text-slate-800">{enq.contactPerson}</span>
                            <div className="text-brand-700 font-semibold">{enq.phone}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[10px] uppercase">Target Date &amp; Location:</span>
                            <span className="font-semibold text-slate-800">{enq.requiredByDate || 'ASAP'}</span>
                            <div className="text-slate-500 line-clamp-1">{enq.addressOrLocation}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[10px] uppercase">Estimated Budget:</span>
                            <span className="font-extrabold text-navy">{enq.estimatedBudget || 'Not specified'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[10px] uppercase">Official Quote Amount:</span>
                            {editingQuoteId === enq.id ? (
                              <div className="flex items-center gap-1.5 mt-1">
                                <input
                                  type="number"
                                  value={quoteInputAmount}
                                  onChange={(e) => setQuoteInputAmount(Number(e.target.value))}
                                  className="w-24 p-1 text-xs border rounded bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleUpdateSportsEnquiryStatus(enq.id, 'quoted', quoteInputAmount, enq.notes);
                                    setEditingQuoteId(null);
                                  }}
                                  className="px-2 py-1 bg-brand-900 text-white rounded text-[10px] font-bold"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-black text-sm text-emerald-700">
                                  {enq.quoteAmount ? formatINR(enq.quoteAmount) : 'Not Quoted Yet'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingQuoteId(enq.id);
                                    setQuoteInputAmount(enq.quoteAmount || 15000);
                                  }}
                                  className="text-[10px] text-brand-700 underline font-semibold"
                                >
                                  Edit ₹
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sports & Items Requested */}
                        <div className="text-xs space-y-1.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-slate-500 font-bold text-[11px]">Sports Required:</span>
                            {enq.sportsNeeded.map((sp) => (
                              <span
                                key={sp}
                                className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                          <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700">
                            <strong>Requested Quantities:</strong> {enq.estimatedQuantities}
                          </div>
                          {enq.notes && (
                            <div className="text-[11px] text-slate-500 italic">
                              Note from customer: "{enq.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: SPORTS INVENTORY & QUICK STOCK */}
            {sportsSubTab === 'inventory' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-navy font-heading">
                      Sports Equipment Inventory ({sportsProducts.length} items)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Adjust physical shop inventory, update stock levels, or toggle featured items.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenAddProduct('Sports')}
                      className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Sports Product</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price / MRP</th>
                        <th className="p-3">Current Stock</th>
                        <th className="p-3">Quick Stock Adjust</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sportsProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=100&q=80';
                                }}
                                className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  SKU: {p.sku} {p.brand && `• ${p.brand}`}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 capitalize font-medium text-slate-600">
                            {p.category.replace(/sports-/g, '')}
                          </td>
                          <td className="p-3">
                            <div className="font-extrabold text-navy">{formatINR(p.price)}</div>
                            {p.mrp && (
                              <div className="text-[10px] text-slate-400 line-through">
                                MRP {formatINR(p.mrp)}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              p.stock > 10
                                ? 'bg-emerald-50 text-emerald-700'
                                : p.stock > 0
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {p.stock} in stock
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateStock(p.id, p.stock - 1)}
                                className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 font-bold flex items-center justify-center text-xs"
                                title="-1 Unit"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold w-6 text-center">{p.stock}</span>
                              <button
                                onClick={() => handleUpdateStock(p.id, p.stock + 1)}
                                className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 font-bold flex items-center justify-center text-xs"
                                title="+1 Unit"
                              >
                                +
                              </button>
                              <button
                                onClick={() => handleUpdateStock(p.id, p.stock + 5)}
                                className="px-1.5 py-0.5 rounded bg-brand-100 hover:bg-brand-200 text-brand-900 text-[10px] font-bold"
                                title="+5 Units"
                              >
                                +5
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Edit Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: DYNAMIC CATEGORY CREATOR & MANAGER */}
            {sportsSubTab === 'categories' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Add New Category Form */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-navy font-heading">
                      Add New Sports Category
                    </h3>
                    <p className="text-xs text-slate-500">
                      Create new sports departments dynamically without modifying any website code.
                    </p>
                  </div>

                  {catAddedSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>New category saved successfully to database!</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateSportsCategory} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lawn Tennis, Martial Arts, Skating"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Tagline / Highlight
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rackets, Felt Balls, Grips &amp; Accessories"
                        value={newCatTagline}
                        onChange={(e) => setNewCatTagline(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Subcategories (Comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rackets, Balls, Strings, Bags, Court Accessories"
                        value={newCatSubcats}
                        onChange={(e) => setNewCatSubcats(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Popular Brands (Comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wilson, Babolat, Head"
                        value={newCatBrands}
                        onChange={(e) => setNewCatBrands(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-900 to-navy text-white text-xs font-bold py-3 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save &amp; Publish Sports Category</span>
                    </button>
                  </form>
                </div>

                {/* Right: Existing Sports Categories */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-navy font-heading">
                        Active Sports Categories ({SPORTS_CATEGORIES.length + customSportsCategories.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        11 Standard departments + {customSportsCategories.length} custom categories
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {/* Custom Categories First */}
                    {customSportsCategories.map((cat: any) => (
                      <div
                        key={cat.id}
                        className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/60 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950 font-heading text-sm">{cat.name}</span>
                          <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                            Custom Added
                          </span>
                        </div>
                        <p className="text-slate-600">{cat.tagline}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cat.subcategories?.map((sub: string) => (
                            <span key={sub} className="bg-white border text-[10px] px-2 py-0.5 rounded text-slate-700">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Standard Categories */}
                    {SPORTS_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 font-heading text-sm">{cat.name}</span>
                          <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                            {cat.popularBrands.join(', ')}
                          </span>
                        </div>
                        <p className="text-slate-500">{cat.tagline}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cat.subcategories.slice(0, 4).map((sub) => (
                            <span key={sub} className="bg-white border text-[10px] px-2 py-0.5 rounded text-slate-600">
                              {sub}
                            </span>
                          ))}
                          {cat.subcategories.length > 4 && (
                            <span className="text-[10px] text-brand-700 font-semibold px-1 py-0.5">
                              +{cat.subcategories.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, Phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              >
                <option value="all">All Order Statuses</option>
                <option value="pending_confirmation">Pending Confirmation</option>
                <option value="confirmed">Confirmed</option>
                <option value="ready_for_pickup">Ready for Pickup</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items &amp; Type</th>
                    <th className="p-3">Total &amp; Payment</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-navy">{o.orderNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{o.customer.fullName}</div>
                        <div className="text-[11px] text-slate-500">{o.customer.phone}</div>
                      </td>
                      <td className="p-3">
                        <div>{o.items.length} items</div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {o.fulfilmentType === 'store_pickup' ? 'Store Pickup' : 'Delivery'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-black text-navy">{formatINR(o.totalAmount)}</div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {o.paymentMethod.replace(/_/g, ' ')} ({o.paymentStatus})
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-1.5 font-bold"
                        >
                          <option value="pending_confirmation">Pending Confirmation</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing / Packing</option>
                          <option value="ready_for_pickup">Ready for Pickup</option>
                          <option value="shipped">Dispatched / Out for Delivery</option>
                          <option value="delivered">Delivered / Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-1.5">
                        <a
                          href={getWhatsAppOrderUrl(o, settings)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setViewingOrder(o)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SCHOOL BOOKLIST REQUESTS */}
        {activeTab === 'booklists' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-navy font-heading">
                  School Booklist Quotation Requests
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parent inquiries for DAV, Kendriya Vidyalaya, and Pachrukhi High School booklists
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {booklistRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No booklist submissions yet.</div>
              ) : (
                booklistRequests.map((req) => (
                  <div key={req.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded">
                          {req.referenceNumber}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{req.schoolName}</span>
                      </div>
                      <div className="text-slate-600">
                        {req.classGrade} • {req.academicSession} • Parent: <strong>{req.parentName} ({req.phone})</strong>
                      </div>
                      {req.notes && <div className="text-slate-500 italic">Notes: "{req.notes}"</div>}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-right">
                        <div className="text-slate-400 text-[10px]">Quoted Amount:</div>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={req.quoteAmount || ''}
                          onChange={(e) => handleUpdateBooklistStatus(req.id, req.status, parseFloat(e.target.value) || 0)}
                          className="w-24 text-xs p-1 border rounded font-bold text-navy"
                        />
                      </div>

                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateBooklistStatus(req.id, e.target.value as any, req.quoteAmount)}
                        className="text-xs p-1.5 border rounded-lg font-bold"
                      >
                        <option value="pending">Pending</option>
                        <option value="quoted">Quoted</option>
                        <option value="accepted">Accepted</option>
                        <option value="fulfilled">Fulfilled</option>
                      </select>

                      <a
                        href={getWhatsAppBooklistUrl(req, settings)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send Quote</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy font-heading">
                Storefront Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update business hours, telephone numbers, and top announcement banner
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Announcement Banner Text</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ann-active"
                  checked={isAnnouncementActive}
                  onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                  className="rounded text-brand-700"
                />
                <label htmlFor="ann-active" className="font-semibold text-slate-700">
                  Enable Announcement Banner
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={phonePrimary}
                    onChange={(e) => setPhonePrimary(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Free Delivery Minimum Order (INR)</label>
                <input
                  type="number"
                  value={freeDeliveryThreshold}
                  onChange={(e) => setFreeDeliveryThreshold(parseInt(e.target.value) || 499)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal with Dynamic Department Tabs */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full space-y-5 shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
              <div>
                <h3 className="font-extrabold text-lg text-navy font-heading flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-500" />
                  <span>{editingProduct ? 'Edit Catalog Product (IMS)' : 'Add New Product to Store Inventory'}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Universal catalog schema with dual decimal/paise integer persistence and department metadata.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setIsProductModalOpen(false)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs: Core vs Department Specifics */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setProductModalTab('core')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${productModalTab === 'core' ? 'bg-white text-navy shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Core Info &amp; Pricing (Paise Math)
              </button>
              <button
                type="button"
                onClick={() => setProductModalTab('department')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${productModalTab === 'department' ? 'bg-white text-navy shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <span>Department Specs ({formDepartment})</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                  Dynamic
                </span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs overflow-y-auto flex-1 pr-1">
              
              {productModalTab === 'core' ? (
                /* TAB 1: CORE FIELDS */
                <div className="space-y-4">
                  
                  {/* SKU & Department */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        SKU / Barcode Code *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SPSB-BK-1001"
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:border-navy"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Primary Department *
                      </label>
                      <select
                        value={formDepartment}
                        onChange={(e) => {
                          const newDept = e.target.value as Department;
                          setFormDepartment(newDept);
                          if (newDept === 'Books') {
                            setFormCategory('school-ncert');
                            setFormTaxRate(0);
                            setFormStorageLocation('Rack-B1');
                          } else if (newDept === 'Sports') {
                            setFormCategory('sports-equipment');
                            setFormTaxRate(12);
                            setFormStorageLocation('Sports-Bay-1');
                          } else {
                            setFormCategory('stationery');
                            setFormTaxRate(18);
                            setFormStorageLocation('Shelf-S1');
                          }
                        }}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-navy"
                      >
                        <option value="Books">Academic &amp; Competitive Examination Books</option>
                        <option value="Stationery">School &amp; Office Stationery</option>
                        <option value="Sports">Sports Equipment &amp; Accessories</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Title */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NCERT Science Textbook for Class 10"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-navy"
                    />
                  </div>

                  {/* Category & Subcategory */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Store Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subcategory / Section</label>
                      <input
                        type="text"
                        value={formSubcategory}
                        onChange={(e) => setFormSubcategory(e.target.value)}
                        placeholder="e.g. Class 10, Cricket Bats, Notebooks"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Pricing: Selling Price, MRP, Cost Price with Paise sync */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-700 flex items-center justify-between">
                      <span>Pricing &amp; Cost Math</span>
                      <span className="text-[10px] text-slate-500 font-mono">Dual Rupee (₹) &amp; Paise Sync</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Selling Price (₹) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-navy"
                        />
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          = {rupeesToPaise(formPrice)}p
                        </span>
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">MRP (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formMrp}
                          onChange={(e) => setFormMrp(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                        />
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          = {rupeesToPaise(formMrp)}p
                        </span>
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">Cost Price (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formCostPrice}
                          onChange={(e) => setFormCostPrice(parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                        />
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          = {rupeesToPaise(formCostPrice)}p
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Quantities & Alerts */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Current Stock *</label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formStock}
                        onChange={(e) => setFormStock(parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-black text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Low-Stock Alert</label>
                      <input
                        type="number"
                        min="0"
                        value={formMinStockThreshold}
                        onChange={(e) => setFormMinStockThreshold(parseInt(e.target.value) || 5)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GST Tax Rate %</label>
                      <select
                        value={formTaxRate}
                        onChange={(e) => setFormTaxRate(parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                      >
                        <option value={0}>0% (Exempt Books)</option>
                        <option value={5}>5% (Concessional)</option>
                        <option value={12}>12% (Sports / Stationery)</option>
                        <option value={18}>18% (Standard)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Shelf / Rack Tag</label>
                      <input
                        type="text"
                        value={formStorageLocation}
                        onChange={(e) => setFormStorageLocation(e.target.value)}
                        placeholder="e.g. Rack-B3"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                      />
                    </div>
                  </div>

                  {/* Brand & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Brand / Publisher</label>
                      <input
                        type="text"
                        value={formBrand}
                        onChange={(e) => setFormBrand(e.target.value)}
                        placeholder="e.g. NCERT, SG, Classmate, DOMS"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                      >
                        <option value="Active">Active (Visible in Catalog)</option>
                        <option value="Draft">Draft (Store counter review)</option>
                        <option value="Archived">Archived (Discontinued)</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URL & Description */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                /* TAB 2: DYNAMIC DEPARTMENT SPECIFIC ATTRIBUTES */
                <div className="space-y-4">
                  {formDepartment === 'Books' && (
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-3">
                      <div className="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-700" />
                        <span>Academic &amp; Competitive Examination Book Metadata</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">ISBN Number</label>
                          <input
                            type="text"
                            placeholder="e.g. 978-8174506399"
                            value={formIsbn}
                            onChange={(e) => setFormIsbn(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Publisher</label>
                          <input
                            type="text"
                            placeholder="e.g. NCERT New Delhi, BSTBPC Patna"
                            value={formPublisher}
                            onChange={(e) => setFormPublisher(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Author / Editor</label>
                          <input
                            type="text"
                            placeholder="e.g. NCERT Editorial Board"
                            value={formAuthor}
                            onChange={(e) => setFormAuthor(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Class / Grade</label>
                          <input
                            type="text"
                            placeholder="e.g. Class 10, Class 12, Competitive"
                            value={formClassGrade}
                            onChange={(e) => setFormClassGrade(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Education Board</label>
                          <select
                            value={formBoard}
                            onChange={(e) => setFormBoard(e.target.value as any)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold"
                          >
                            <option value="NCERT / CBSE">NCERT / CBSE</option>
                            <option value="Bihar Board">Bihar State Board (BSEB)</option>
                            <option value="ICSE">ICSE</option>
                            <option value="General">General / Competitive</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                          <input
                            type="text"
                            placeholder="e.g. Mathematics, Science, Sanskrit"
                            value={formSubject}
                            onChange={(e) => setFormSubject(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Edition Year</label>
                          <input
                            type="text"
                            placeholder="e.g. 2026-27"
                            value={formEditionYear}
                            onChange={(e) => setFormEditionYear(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formDepartment === 'Stationery' && (
                    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200 space-y-3">
                      <div className="font-bold text-purple-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-purple-700" />
                        <span>School &amp; Office Stationery Attributes</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Pack Size / Units</label>
                          <input
                            type="text"
                            placeholder="e.g. Pack of 5, Box of 20, Single"
                            value={formPackSize}
                            onChange={(e) => setFormPackSize(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Item / Ink Color</label>
                          <input
                            type="text"
                            placeholder="e.g. Blue, Black, Neon Assorted"
                            value={formItemColor}
                            onChange={(e) => setFormItemColor(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Ruling Type</label>
                          <select
                            value={formRuling}
                            onChange={(e) => setFormRuling(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold"
                          >
                            <option value="Ruled">Single Ruled</option>
                            <option value="Plain">Plain / Blank</option>
                            <option value="Interleaf">Interleaf (Science Practical)</option>
                            <option value="Four Line">Four Line (English Nursery-2)</option>
                            <option value="Square Ruled">Square Ruled (Maths)</option>
                            <option value="N/A">N/A</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Dimensions / Size</label>
                          <input
                            type="text"
                            placeholder="e.g. A4 (210 x 297 mm), Long Book 24x18cm"
                            value={formDimensions}
                            onChange={(e) => setFormDimensions(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formDepartment === 'Sports' && (
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3">
                      <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-emerald-700" />
                        <span>Sports Equipment, Variants &amp; Materials</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Sport Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Cricket, Football, Badminton"
                            value={formSportName}
                            onChange={(e) => setFormSportName(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Size Variant</label>
                          <input
                            type="text"
                            placeholder="e.g. Size 5, Short Handle, UK 8, Standard G4"
                            value={formSize}
                            onChange={(e) => setFormSize(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Material Composition</label>
                          <input
                            type="text"
                            placeholder="e.g. Kashmir Willow, English Willow, PU, Nylon"
                            value={formMaterial}
                            onChange={(e) => setFormMaterial(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Playing Level</label>
                          <select
                            value={formPlayingLevel}
                            onChange={(e) => setFormPlayingLevel(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold"
                          >
                            <option value="Beginner">Beginner / School Training</option>
                            <option value="Club">Club Level</option>
                            <option value="Tournament">Tournament / Match Grade</option>
                            <option value="Professional">Professional Grade</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-navy hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow transition"
                >
                  Save to Inventory &amp; Ledger
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Live Barcode Gun & POS Quick Stock Adjuster Modal */}
      <BarcodeQuickAdjustModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        products={products}
        onStockUpdated={onRefreshData}
        adminUser={adminUser}
      />

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <h3 className="font-bold text-base text-navy font-heading">
                  Order Details: {viewingOrder.orderNumber}
                </h3>
                <span className="text-slate-400">Placed on {new Date(viewingOrder.createdAt).toLocaleString()}</span>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-slate-400">✕</button>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-800">Customer: {viewingOrder.customer.fullName} ({viewingOrder.customer.phone})</div>
              <div className="text-slate-600">{viewingOrder.customer.addressLine1}, {viewingOrder.customer.villageOrLocality}, PIN {viewingOrder.customer.pinCode}</div>
              <div>Fulfilment: <strong>{viewingOrder.fulfilmentType}</strong> • Payment: <strong>{viewingOrder.paymentMethod} ({viewingOrder.paymentStatus})</strong></div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 max-h-40 overflow-y-auto">
              {viewingOrder.items.map((i, idx) => (
                <div key={idx} className="p-2 flex justify-between">
                  <span>{i.productName} (x{i.quantity})</span>
                  <span className="font-bold">{formatINR(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-black text-sm text-navy pt-1">
              <span>Total:</span>
              <span>{formatINR(viewingOrder.totalAmount)}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingOrder(null)}
                className="bg-brand-900 text-white font-bold px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
