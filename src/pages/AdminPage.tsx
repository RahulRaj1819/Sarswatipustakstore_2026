import React, { useState } from 'react';
import { 
  Product, 
  Order, 
  BooklistRequest, 
  CustomerEnquiry, 
  StoreSettings, 
  OrderStatus,
  ProductCategory,
  SportsBulkEnquiry
} from '../types';
import { StorageService } from '../services/storage';
import { formatINR, exportProductsToCSV, getWhatsAppOrderUrl, getWhatsAppBooklistUrl } from '../utils/helpers';
import { CATEGORIES } from '../data/categories';
import { SPORTS_CATEGORIES } from '../data/sportsCategories';
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
  Users
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
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('spsb_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'sports' | 'orders' | 'booklists' | 'settings'>('overview');
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

  // Product Add / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('school-ncert');
  const [formPrice, setFormPrice] = useState<number>(150);
  const [formMrp, setFormMrp] = useState<number>(150);
  const [formStock, setFormStock] = useState<number>(20);
  const [formBrand, setFormBrand] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');

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

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'sarswati1990') {
      setIsAuthenticated(true);
      sessionStorage.setItem('spsb_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. (Default is admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spsb_admin_auth');
  };

  // Open Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('school-ncert');
    setFormPrice(150);
    setFormMrp(150);
    setFormStock(25);
    setFormBrand('');
    setFormImage('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80');
    setFormDescription('Standard textbook/stationery product for school students.');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormMrp(p.mrp || p.price);
    setFormStock(p.stock);
    setFormBrand(p.brand || '');
    setFormImage(p.images[0]);
    setFormDescription(p.description);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        category: formCategory,
        price: formPrice,
        mrp: formMrp,
        stock: formStock,
        brand: formBrand,
        images: [formImage, ...editingProduct.images.slice(1)],
        description: formDescription,
        updatedAt: new Date().toISOString()
      };
      StorageService.saveProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        sku: `SPSB-${Date.now().toString().slice(-4)}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        price: formPrice,
        mrp: formMrp,
        stock: formStock,
        images: [formImage || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'],
        brand: formBrand,
        description: formDescription,
        tags: [formCategory, formBrand.toLowerCase()],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      StorageService.saveProduct(newProd);
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
      StorageService.updateStock(id, Math.max(0, p.stock + delta));
      onRefreshData();
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    StorageService.updateStock(id, Math.max(0, newStock));
    onRefreshData();
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

  // Filtered lists
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase()))
  );

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-700 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-900 text-amber-300 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-navy font-heading">
              Store Owner &amp; Admin Login
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sarswati Pustak and Sports Bhandar, Pachrukhi
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (default: admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="text-brand-800 font-semibold hover:underline"
            >
              ← Back to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      
      {/* Admin Top Header */}
      <header className="bg-navy text-white px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-700 text-amber-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base font-heading flex items-center gap-2">
              <span>SARSWATI PUSTAK</span>
              <span className="text-[10px] bg-amber-500 text-navy font-bold px-2 py-0.5 rounded">Store Admin</span>
            </div>
            <div className="text-[11px] text-slate-300">Pachrukhi, Siwan (841241) Management Console</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            Storefront View ↗
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 px-3 py-1.5 rounded-lg border border-red-800/50 flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <Package className="w-4 h-4" /> },
            { id: 'products', label: `Products (${products.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { 
              id: 'sports', 
              label: `Sports Dept (${sportsProducts.length})`, 
              icon: <Trophy className="w-4 h-4 text-amber-500" />,
              badge: pendingSportsQuotes.length > 0 ? `${pendingSportsQuotes.length} quotes` : undefined
            },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <IndianRupee className="w-4 h-4" /> },
            { id: 'booklists', label: `Booklist Requests (${booklistRequests.length})`, icon: <FileSpreadsheet className="w-4 h-4" /> },
            { id: 'settings', label: 'Store Settings', icon: <Settings className="w-4 h-4" /> }
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-accent-orange text-white px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
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

        {/* TAB 2: PRODUCTS CATALOGUE CRUD */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search products by title, SKU, brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleOpenAddProduct}
                  className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price / MRP</th>
                    <th className="p-3">Stock Level</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={p.images[0]} 
                            alt="" 
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=100&q=80';
                            }}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200" 
                          />
                          <div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku} {p.brand && `• ${p.brand}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 capitalize text-slate-600">{p.category.replace(/-/g, ' ')}</td>
                      <td className="p-3 font-semibold text-navy">
                        {formatINR(p.price)}
                        {p.mrp && <span className="text-slate-400 line-through ml-1 text-[10px]">{formatINR(p.mrp)}</span>}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${p.stock < 10 ? 'text-red-600' : 'text-slate-800'}`}>
                            {p.stock} units
                          </span>
                          <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white">
                            <button
                              onClick={() => handleQuickStock(p.id, -1)}
                              className="px-1.5 py-0.5 hover:bg-slate-100 font-bold"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleQuickStock(p.id, 1)}
                              className="px-1.5 py-0.5 hover:bg-slate-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-900"
                          title="Edit Product"
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
                      onClick={handleOpenAddProduct}
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

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-extrabold text-base text-navy font-heading">
              {editingProduct ? 'Edit Store Product' : 'Add New Product to Store'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
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
                  <label className="block font-bold text-slate-700 mb-1">Brand / Publisher</label>
                  <input
                    type="text"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="e.g. NCERT / Classmate / SG"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={formMrp}
                    onChange={(e) => setFormMrp(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
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

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-900 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
