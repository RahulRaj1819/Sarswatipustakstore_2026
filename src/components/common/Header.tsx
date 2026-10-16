import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  Compass, 
  ChevronDown, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  FileSpreadsheet, 
  ShieldCheck,
  User,
  PackageCheck,
  ArrowRight,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { Product, StoreSettings, ProductCategory } from '../../types';
import { formatINR } from '../../utils/helpers';
import { CATEGORIES } from '../../data/categories';
import { SPORTS_CATEGORIES } from '../../data/sportsCategories';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  settings: StoreSettings;
  products: Product[];
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCart: () => void;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
  onOpenProductModal: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  products,
  cartCount,
  cartTotal,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenCart,
  onNavigate,
  onOpenBooklist,
  onOpenProductModal
}) => {
  const { theme, toggleTheme, language, setLanguage, toggleLanguage, t } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isBooksDropdownOpen, setIsBooksDropdownOpen] = useState(false);
  const [isStationeryDropdownOpen, setIsStationeryDropdownOpen] = useState(false);
  const [isSportsDropdownOpen, setIsSportsDropdownOpen] = useState(false);
  const [isMobileSportsExpanded, setIsMobileSportsExpanded] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search suggestions
  const searchSuggestions = searchQuery.trim().length >= 2 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.classGrade && p.classGrade.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    onNavigate('shop');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-2 -ml-2 text-slate-700 hover:text-brand-900 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo & Title */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md flex items-center justify-center text-white ring-2 ring-amber-500/50 group-hover:scale-105 transition-transform bg-slate-900 shrink-0">
              <img 
                src="/favicon.png" 
                alt="Sarswati Pustak & Sports Bhandar Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-navy dark:text-white font-heading leading-tight group-hover:text-brand-800 dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                  {t('brand.name')}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold text-accent-orange bg-orange-50 dark:bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-200 dark:border-orange-800/80">
                  {t('brand.est')}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide flex items-center gap-1">
                <span>{t('brand.sub')}</span>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                <span className="text-brand-700 dark:text-brand-400 font-semibold hidden sm:inline">{t('brand.location')}</span>
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div ref={searchRef} className="flex-1 max-w-xl hidden md:block relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-12 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-xs dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {searchSuggestions.length > 0 ? (
                  <div>
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Matching Products ({searchSuggestions.length})
                    </div>
                    {searchSuggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onOpenProductModal(item);
                          setIsSearchFocused(false);
                        }}
                        className="px-4 py-2.5 hover:bg-brand-50/60 flex items-center justify-between cursor-pointer border-b border-slate-50 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.images[0]} 
                            alt={item.name} 
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=100&q=80';
                            }}
                            className="w-10 h-10 object-cover rounded-md border border-slate-200" 
                          />
                          <div>
                            <div className="text-sm font-medium text-slate-800 line-clamp-1">{item.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <span className="capitalize">{item.category.replace(/-/g, ' ')}</span>
                              {item.brand && <span>• {item.brand}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-brand-900">{formatINR(item.price)}</div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                            {item.stock > 0 ? 'In Stock' : 'Call store'}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={() => {
                        setIsSearchFocused(false);
                        onNavigate('shop');
                      }}
                      className="px-4 py-2 text-center text-xs font-semibold text-brand-700 hover:bg-brand-50 cursor-pointer border-t border-slate-100"
                    >
                      View All Search Results for "{searchQuery}" →
                    </div>
                  </div>
                ) : searchQuery.trim().length >= 2 ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-slate-600">No exact matches found for "{searchQuery}"</p>
                    <p className="text-xs text-slate-400 mt-1">We might still have it physically in our Pachrukhi store!</p>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}?text=Namaste,%20do%20you%20have%20stock%20for:%20${encodeURIComponent(searchQuery)}?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Ask Availability on WhatsApp
                    </a>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="text-xs font-semibold text-slate-500 mb-2">Popular In Pachrukhi &amp; Siwan</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['NCERT Science 10', 'Lucent GK', 'Cricket Bat', 'Classmate Long Book', 'Casio Calculator', 'Yonex Racket', 'Geometry Box'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            onSearchChange(tag);
                            onNavigate('shop');
                            setIsSearchFocused(false);
                          }}
                          className="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 px-2.5 py-1 rounded-full transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions (Booklist button, Track order, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* School Booklist CTA Button */}
            <button
              onClick={onOpenBooklist}
              className="hidden xl:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>School Booklists</span>
            </button>

            {/* Track Order */}
            <button
              onClick={() => onNavigate('track-order')}
              title="Track Order Status"
              className="hidden md:flex items-center gap-1.5 text-slate-700 hover:text-brand-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              <PackageCheck className="w-4 h-4 text-brand-600" />
              <span className="hidden lg:inline">Track Order</span>
            </button>

            {/* Wishlist (hidden on xs mobile as it is in bottom nav) */}
            <button
              onClick={() => onNavigate('wishlist')}
              title={t('nav.wishlist')}
              className="hidden sm:flex p-2 text-slate-700 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-xl relative transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              aria-label={t('nav.cart')}
              className="flex items-center gap-1.5 sm:gap-2 bg-brand-50 dark:bg-slate-800 hover:bg-brand-100/80 dark:hover:bg-slate-700/80 text-brand-900 dark:text-slate-100 border border-brand-200/80 dark:border-slate-700 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer group"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-800 dark:text-amber-400 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-700 dark:bg-accent-orange text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs font-semibold">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">{t('nav.cart')}</div>
                <div className="text-brand-900 dark:text-white">{formatINR(cartTotal)}</div>
              </div>
            </button>

            {/* Account / Admin Portal (hidden on xs mobile) */}
            <div className="relative group hidden sm:block">
              <button
                onClick={() => onNavigate('account')}
                title={t('nav.account')}
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-brand-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Bilingual Language Switcher (EN | हिंदी) */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'हिंदी में बदलें (Switch to Hindi)' : 'Switch to English'}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-brand-500 text-xs font-extrabold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* Dark & Light Theme Switcher */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-2xs"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => {
                if (window.location.hash !== '#shop') onNavigate('shop');
              }}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Mega Bar (Desktop) */}
      <nav className="hidden lg:block bg-brand-900 text-white text-xs font-medium border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors rounded-none font-semibold flex items-center gap-1.5"
            >
              <span>{t('nav.home')}</span>
            </button>

            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors font-semibold flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-brand-300" />
              <span>{t('nav.shop')}</span>
            </button>

            {/* Academic Books Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsBooksDropdownOpen(true)}
              onMouseLeave={() => setIsBooksDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  onSelectCategory('academic-books');
                  onNavigate('shop');
                }}
                className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors flex items-center gap-1 font-semibold"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('cat.academic')}</span>
                <ChevronDown className="w-3 h-3 opacity-75" />
              </button>
              {isBooksDropdownOpen && (
                <div className="absolute left-0 top-full w-64 bg-white text-slate-800 rounded-b-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      onSelectCategory('school-ncert');
                      onNavigate('shop');
                      setIsBooksDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium flex items-center justify-between"
                  >
                    <span>NCERT Textbooks (Class 6–12)</span>
                    <span className="text-[10px] bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded">CBSE</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('bihar-board');
                      onNavigate('shop');
                      setIsBooksDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium flex items-center justify-between"
                  >
                    <span>Bihar Board (Class 1–10 BSTBPC)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">BSEB</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('college-reference');
                      onNavigate('shop');
                      setIsBooksDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium"
                  >
                    College &amp; Higher Education
                  </button>
                </div>
              )}
            </div>

            {/* Competitive Exam Books (BPSC / SSC removed per user request) */}
            <button
              onClick={() => {
                onSelectCategory('competitive-exams');
                onNavigate('shop');
              }}
              className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors font-semibold"
            >
              <span>Competitive Exam Guides</span>
            </button>

            {/* Stationery Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsStationeryDropdownOpen(true)}
              onMouseLeave={() => setIsStationeryDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  onSelectCategory('stationery');
                  onNavigate('shop');
                }}
                className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors flex items-center gap-1 font-semibold"
              >
                <span>Stationery &amp; Notebooks</span>
                <ChevronDown className="w-3 h-3 opacity-75" />
              </button>
              {isStationeryDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b-xl shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onSelectCategory('notebooks');
                      onNavigate('shop');
                      setIsStationeryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium"
                  >
                    Classmate Notebooks &amp; Registers
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('pens-writing');
                      onNavigate('shop');
                      setIsStationeryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium"
                  >
                    Pens, Highlighters &amp; Pencils
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('art-craft');
                      onNavigate('shop');
                      setIsStationeryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium"
                  >
                    Art Supplies &amp; Project Paper
                  </button>
                  <button
                    onClick={() => {
                      onSelectCategory('school-bags');
                      onNavigate('shop');
                      setIsStationeryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-50 text-xs font-medium"
                  >
                    School Bags &amp; Backpacks
                  </button>
                </div>
              )}
            </div>

            {/* Sports Equipment Mega Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSportsDropdownOpen(true)}
              onMouseLeave={() => setIsSportsDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('sports')}
                className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors flex items-center gap-1 font-semibold text-amber-300"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('nav.sports')}</span>
                <span className="text-[10px] bg-accent-orange text-white px-1.5 py-0.2 rounded font-extrabold ml-0.5">
                  11 Cats
                </span>
                <ChevronDown className="w-3 h-3 opacity-75" />
              </button>
              {isSportsDropdownOpen && (
                <div className="absolute -left-20 top-full w-[720px] bg-white text-slate-800 rounded-b-2xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* Mega Menu Top Banner */}
                  <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-navy text-white p-3.5 rounded-xl mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300 font-heading flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Sarswati Sports &amp; Fitness Store</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Gear Up. Play Better. Explore match bats, official footballs &amp; school packages.
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsSportsDropdownOpen(false);
                        onNavigate('sports');
                      }}
                      className="px-3 py-1.5 bg-accent-orange hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                    >
                      Visit /sports Page →
                    </button>
                  </div>

                  {/* Mega Menu Grid */}
                  <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-xs">
                    
                    {/* Col 1 */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b pb-1">
                        Team Sports
                      </div>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-cricket');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium flex items-center justify-between group"
                      >
                        <span>🏏 Cricket (Bats, Balls &amp; Kits)</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-brand-700">SG/SS</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-football');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium flex items-center justify-between group"
                      >
                        <span>⚽ Football (Size 5, Studs, Shin)</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-brand-700">Nivia</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-volleyball');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium flex items-center justify-between group"
                      >
                        <span>🏐 Volleyball &amp; Heavy Nets</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-brand-700">Cosco</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-basketball');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium"
                      >
                        🏀 Basketball &amp; Rim Nets
                      </button>
                    </div>

                    {/* Col 2 */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b pb-1">
                        Racket &amp; Fitness
                      </div>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-badminton');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium flex items-center justify-between group"
                      >
                        <span>🏸 Badminton &amp; Mavis 350</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-brand-700">Yonex</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-table-tennis');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium flex items-center justify-between group"
                      >
                        <span>🏓 Table Tennis Bats &amp; Nets</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-brand-700">Stag</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-fitness');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium"
                      >
                        💪 Fitness, Mats &amp; Skipping Ropes
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-athletics');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium"
                      >
                        ⏱️ Athletics, Batons &amp; Whistles
                      </button>
                    </div>

                    {/* Col 3 */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b pb-1">
                        School &amp; Recreation
                      </div>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-school-pe');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium text-amber-800 flex items-center justify-between"
                      >
                        <span>🏫 School PE &amp; Sports Day Packages</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-indoor-games');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium"
                      >
                        🎯 Carrom (32"), Chess &amp; Ludo
                      </button>
                      <button
                        onClick={() => {
                          onSelectCategory('sports-accessories');
                          onNavigate('shop');
                          setIsSportsDropdownOpen(false);
                        }}
                        className="w-full text-left py-1 hover:text-brand-700 font-medium"
                      >
                        🎒 Gym Bags, Sippers &amp; Supports
                      </button>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsSportsDropdownOpen(false);
                            onNavigate('sports');
                          }}
                          className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[11px] text-center"
                        >
                          View Sports Combos &amp; Kits
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* School Kits & Combos */}
            <button
              onClick={() => {
                onSelectCategory('school-kits');
                onNavigate('shop');
              }}
              className="px-3.5 py-2.5 hover:bg-brand-800 transition-colors font-semibold"
            >
              <span>{t('cat.combos')}</span>
            </button>
          </div>

          {/* Right helper links */}
          <div className="flex items-center gap-3 text-slate-300">
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-white transition-colors"
            >
              {t('nav.about')}
            </button>
            <span className="text-brand-700">|</span>
            <button 
              onClick={() => onNavigate('contact')} 
              className="hover:text-white transition-colors"
            >
              {t('nav.contact')}
            </button>
            <span className="text-brand-700">|</span>
            <button 
              onClick={() => onNavigate('admin')} 
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('nav.admin')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
          />

          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-slate-200 dark:border-slate-800 transition-colors">
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-navy to-brand-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="font-bold text-sm font-heading">{t('brand.name')}</div>
                  <div className="text-[10px] text-slate-300">{t('brand.sub')}</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language & Theme Switcher in Mobile Drawer */}
            <div className="p-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>{language === 'hi' ? 'भाषा (Language)' : 'Language (भाषा)'}</span>
              </div>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-brand-900 dark:bg-brand-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    language === 'hi'
                      ? 'bg-brand-900 dark:bg-brand-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Action Buttons in Mobile Drawer */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 space-y-2 shrink-0">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooklist();
                }}
                className="w-full bg-accent-orange text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t('btn.orderBooklist')}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('sports');
                }}
                className="w-full bg-gradient-to-r from-slate-900 via-navy to-brand-900 text-amber-300 border border-amber-400/40 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-between shadow-xs cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{t('nav.sports')}</span>
                </div>
                <span className="text-[10px] bg-accent-orange text-white px-1.5 py-0.5 rounded font-extrabold uppercase">
                  Explore
                </span>
              </button>
            </div>

            {/* Navigation Categories */}
            <div className="p-4 flex-1 space-y-1 overflow-y-auto">
              
              {/* Expandable Sports Categories Section */}
              <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMobileSportsExpanded(!isMobileSportsExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-brand-50 dark:bg-slate-800 text-brand-900 dark:text-amber-400 rounded-lg text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{t('nav.sportsCategories')} ({SPORTS_CATEGORIES.length})</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSportsExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileSportsExpanded && (
                  <div className="mt-1.5 ml-2 pl-3 border-l-2 border-brand-200 dark:border-brand-800 space-y-1 py-1">
                    {SPORTS_CATEGORIES.map((sportCat) => (
                      <button
                        key={sportCat.id}
                        onClick={() => {
                          onSelectCategory(sportCat.id);
                          onNavigate('shop');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-amber-300 font-medium flex items-center justify-between cursor-pointer"
                      >
                        <span>{sportCat.name}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {t('nav.booksStationery')}
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onNavigate('shop');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-900 dark:hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{cat.name}</span>
                </button>
              ))}

              <div className="border-t border-slate-100 dark:border-slate-800 my-3 pt-3">
                <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  {t('nav.customerCare')}
                </div>
                <button
                  onClick={() => {
                    onNavigate('track-order');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4 text-brand-600 dark:text-amber-400" />
                  <span>{t('nav.trackOrder')}</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  {t('nav.about')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('faq');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  {t('nav.faq')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('policy-shipping');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  {t('nav.shippingPolicy')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-amber-700 dark:text-amber-400 font-semibold hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t('nav.admin')}</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <div className="font-semibold text-slate-800 dark:text-slate-200">{t('nav.timing')}:</div>
              <div>{settings.businessHours}</div>
              <div className="mt-2 text-brand-800 dark:text-amber-400 font-bold">{t('nav.call')}: {settings.phonePrimary}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
