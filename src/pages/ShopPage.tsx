import React, { useState, useMemo } from 'react';
import { Product, StoreSettings, ProductCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { SPORTS_CATEGORIES } from '../data/sportsCategories';
import { ProductCard } from '../components/products/ProductCard';
import { formatINR } from '../utils/helpers';
import { 
  Filter, 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  ChevronDown, 
  BookOpen, 
  Sparkles,
  SearchX,
  MessageCircle,
  Trophy
} from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  settings: StoreSettings;
  wishlist: string[];
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onOpenProductRequestModal: (query: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  settings,
  wishlist,
  activeCategory,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onOpenProductModal,
  onOpenProductRequestModal
}) => {
  const [selectedBoard, setSelectedBoard] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'name' | 'newest'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'academic-books') {
          if (p.category !== 'academic-books' && p.category !== 'school-ncert' && p.category !== 'bihar-board') {
            return false;
          }
        } else if (activeCategory === 'sports-equipment') {
          // Special case: 'sports-equipment' matches all sports departments
          if (!p.category.startsWith('sports-') && p.category !== 'sports-equipment' && !p.sportType) {
            return false;
          }
        } else if (p.category !== activeCategory) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesBrand = p.brand?.toLowerCase().includes(q) || false;
        const matchesClass = p.classGrade?.toLowerCase().includes(q) || false;
        const matchesSubject = p.subject?.toLowerCase().includes(q) || false;
        const matchesTags = p.tags.some((t: string) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesCategory && !matchesBrand && !matchesClass && !matchesSubject && !matchesTags) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'all') {
        if (!p.brand || !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }

      // Board filter
      if (selectedBoard !== 'all') {
        if (p.board !== selectedBoard) return false;
      }

      // Class filter
      if (selectedClass !== 'all') {
        if (!p.classGrade?.includes(selectedClass)) return false;
      }

      // Stock filter
      if (inStockOnly && p.stock <= 0) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // relevance
    });
  }, [products, activeCategory, searchQuery, selectedBrand, selectedBoard, selectedClass, inStockOnly, maxPrice, sortBy]);

  const activeCategoryInfo = 
    CATEGORIES.find((c: any) => c.id === activeCategory) ||
    SPORTS_CATEGORIES.find((s: any) => s.id === activeCategory);

  const resetAllFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    setSelectedBrand('all');
    setSelectedBoard('all');
    setSelectedClass('all');
    setInStockOnly(false);
    setMaxPrice(6000);
    setSortBy('relevance');
  };

  const hasActiveFilters = 
    activeCategory !== 'all' || 
    Boolean(searchQuery.trim()) || 
    selectedBrand !== 'all' ||
    selectedBoard !== 'all' || 
    selectedClass !== 'all' || 
    inStockOnly || 
    maxPrice < 6000;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-brand-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sarswati Pustak Catalogue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight mt-1">
              {searchQuery ? `Search Results for "${searchQuery}"` : activeCategoryInfo?.name || 'All Products'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {activeCategoryInfo?.description || 'Browse high-quality textbooks, stationery essentials, and premium sports equipment available in Pachrukhi.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
            </span>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-brand-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Inline Category Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-900 text-white shadow-xs ring-2 ring-brand-300'
                  : 'bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-900 border border-slate-200 hover:border-brand-300'
              }`}
            >
              <span>{cat.shortName}</span>
              {activeCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
            </button>
          ))}
        </div>

        {/* Layout: Sidebar Filters + Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-extrabold text-sm text-navy font-heading">
                <SlidersHorizontal className="w-4 h-4 text-brand-700" />
                <span>Filters &amp; Refine</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-brand-700 hover:text-red-600 font-semibold underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Select - Books & Stationery */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Books &amp; Stationery
              </label>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
                {CATEGORIES.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-brand-50 text-brand-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.shortName}</span>
                    {activeCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Sports Department Categories */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Sports Departments
                </label>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 rounded">11 Cats</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                {SPORTS_CATEGORIES.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-amber-100 text-amber-950 font-bold'
                        : 'text-slate-600 hover:bg-amber-50/60'
                    }`}
                  >
                    <span>{cat.shortName}</span>
                    {activeCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Brand / Manufacturer
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
              >
                <option value="all">All Brands</option>
                <option value="SG">SG (Sanspareils Greenlands)</option>
                <option value="SS">SS Sunridges</option>
                <option value="Nivia">Nivia Sports</option>
                <option value="Yonex">Yonex</option>
                <option value="Cosco">Cosco India</option>
                <option value="Stag">Stag International</option>
                <option value="Boldfit">Boldfit Fitness</option>
                <option value="NCERT">NCERT Official</option>
                <option value="Classmate">ITC Classmate</option>
                <option value="Lucent">Lucent Publication</option>
              </select>
            </div>

            {/* Educational Board Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Academic Board
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Boards' },
                  { id: 'NCERT / CBSE', label: 'NCERT / CBSE' },
                  { id: 'Bihar Board', label: 'Bihar Board (BSEB)' },
                  { id: 'General', label: 'General / Reference' }
                ].map((board) => (
                  <label key={board.id} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="board"
                      checked={selectedBoard === board.id}
                      onChange={() => setSelectedBoard(board.id)}
                      className="text-brand-700 focus:ring-brand-500 rounded"
                    />
                    <span>{board.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Class / Grade Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Class / Grade
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
              >
                <option value="all">All Classes &amp; General</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Max Price</span>
                <span className="font-bold text-navy">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={50}
                max={2500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹50</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-700 focus:ring-brand-500"
                />
                <span>In Stock items only</span>
              </label>
            </div>
          </aside>

          {/* Main Catalogue Area */}
          <main className="lg:col-span-3 space-y-5">
            
            {/* Sorting & Active Chips Bar */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Active Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-medium">Applied:</span>
                {activeCategory !== 'all' && (
                  <span className="bg-brand-50 text-brand-800 font-bold px-2 py-0.5 rounded-lg border border-brand-200 flex items-center gap-1">
                    {activeCategoryInfo?.shortName}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => onSelectCategory('all')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => onSearchChange('')} />
                  </span>
                )}
                {selectedBoard !== 'all' && (
                  <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-lg border border-slate-200 flex items-center gap-1">
                    {selectedBoard}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBoard('all')} />
                  </span>
                )}
                {selectedClass !== 'all' && (
                  <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-lg border border-slate-200 flex items-center gap-1">
                    {selectedClass}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedClass('all')} />
                  </span>
                )}
                {!hasActiveFilters && (
                  <span className="text-slate-500">All available products</span>
                )}
              </div>

              {/* Sort Dropdown & Grid View Toggle */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Additions</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>

                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-brand-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 ${viewMode === 'list' ? 'bg-brand-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    settings={settings}
                    isWishlisted={wishlist.includes(product.id)}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onQuickView={onQuickView}
                    onSelectProduct={onOpenProductModal}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-accent-orange flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-navy font-heading">
                  No matching items found
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We couldn't find products matching your filters. As a local shop in Pachrukhi, we can readily arrange school editions or specific stationery from our publishers!
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => onOpenProductRequestModal(searchQuery)}
                    className="w-full sm:w-auto bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                  >
                    Request this Book or Item
                  </button>

                  <button
                    onClick={resetAllFilters}
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setIsMobileFilterOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="font-extrabold text-navy text-sm font-heading">Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase block mb-1.5">Category</label>
                <div className="space-y-1">
                  {CATEGORIES.map((c: any) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCategory(c.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left p-1.5 rounded ${activeCategory === c.id ? 'bg-brand-100 text-brand-900 font-bold' : 'text-slate-600'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase block mb-1.5">Max Price</label>
                <input
                  type="range"
                  min={50}
                  max={2500}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-brand-700"
                />
                <span className="font-bold text-navy">{formatINR(maxPrice)}</span>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-brand-700"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-brand-900 text-white font-bold rounded-xl mt-4"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
