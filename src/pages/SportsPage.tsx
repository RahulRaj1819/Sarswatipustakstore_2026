import React, { useState } from 'react';
import { 
  Trophy, 
  MessageCircle, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Package, 
  Layers, 
  TrendingUp, 
  Star,
  Users,
  Compass
} from 'lucide-react';
import { Product, StoreSettings, ProductCategory } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { SPORTS_CATEGORIES, SportsCategoryInfo } from '../data/sportsCategories';
import { formatINR } from '../utils/helpers';

interface SportsPageProps {
  products: Product[];
  settings: StoreSettings;
  wishlist: string[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: string) => void;
  onOpenBulkSportsEnquiry: () => void;
}

export const SportsPage: React.FC<SportsPageProps> = ({
  products,
  settings,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onOpenProductModal,
  onSelectCategory,
  onNavigate,
  onOpenBulkSportsEnquiry
}) => {
  const [selectedSportTab, setSelectedSportTab] = useState<string>('all');
  const [activeComboTab, setActiveComboTab] = useState<string>('all');

  // Filter all sports products (either matching sports-* category or sportType defined)
  const sportsProducts = products.filter(p => 
    p.category.startsWith('sports-') || 
    p.category === 'sports-equipment' || 
    Boolean(p.sportType)
  );

  // Featured sports products
  const featuredSports = sportsProducts.filter(p => p.isFeatured);

  // Sports kits & combos
  const sportsCombos = sportsProducts.filter(p => 
    p.subcategory?.toLowerCase().includes('combo') || 
    p.subcategory?.toLowerCase().includes('kit') ||
    p.category === 'sports-school-pe' ||
    Boolean(p.sportAttributes?.kitItemsIncluded)
  );

  // School PE & Sports day essentials
  const schoolPEItems = sportsProducts.filter(p => 
    p.category === 'sports-school-pe' || 
    p.category === 'sports-athletics' ||
    p.tags.some(t => t.includes('school') || t.includes('sports day'))
  );

  // Filtered products based on tab
  const displayedProducts = selectedSportTab === 'all'
    ? sportsProducts
    : sportsProducts.filter(p => p.category === selectedSportTab);

  // Bestsellers (sorted by rating and review count)
  const bestsellers = [...sportsProducts]
    .sort((a, b) => ((b.rating || 0) * (b.reviewCount || 0)) - ((a.rating || 0) * (a.reviewCount || 0)))
    .slice(0, 8);

  // Recently added products
  const recentProducts = [...sportsProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // WhatsApp Enquiry for availability
  const getWhatsAppSportsUrl = (subject: string = 'General Sports Availability') => {
    const text = `Namaste Sarswati Sports Bhandar,\n\nI am inquiring about sports gear: ${subject}.\nCan you confirm current stock and prices at your Pachrukhi store?`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      
      {/* 1. VISUALLY STRIKING HERO BANNER */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white overflow-hidden py-14 sm:py-20 border-b border-slate-800">
        
        {/* Subtle decorative stadium grid & ambient glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Pachrukhi's Premier Sports &amp; Fitness Store Since 1990</span>
              </div>

              {/* Required Headline & Copy */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-none">
                Gear Up. <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  Play Better.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore sports equipment and accessories for school, practice, fitness, and your favourite games. Handpicked match-grade Kashmir Willow bats, Nivia match footballs, Yonex badminton, and complete school sports packages in Pachrukhi &amp; Siwan.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                
                {/* Primary CTA */}
                <button
                  onClick={() => {
                    const el = document.getElementById('sports-catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-accent-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Shop Sports Equipment</span>
                </button>

                {/* Secondary CTA */}
                <a
                  href={getWhatsAppSportsUrl('Checking Sports Stock & Availability')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                {/* Bulk Sports CTA */}
                <button
                  onClick={onOpenBulkSportsEnquiry}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm px-4 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>School / Team Quote</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">100% Genuine</span>
                    SG, Nivia, Yonex, Cosco
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">Local Store Pickup</span>
                    Ready in 30 mins
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">School Bulk Rates</span>
                    Special PE discounts
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Featured Image Card */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl shadow-black/60 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80"
                    alt="Cricket & Sports Equipment"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                        Match Ready
                      </span>
                      <h3 className="text-white font-extrabold text-base sm:text-lg mt-1 font-heading">
                        Kashmir Willow &amp; Leather Kits
                      </h3>
                      <p className="text-xs text-slate-300">Hand-selected for tournaments in Siwan &amp; Saran</p>
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                      From ₹240
                    </span>
                  </div>
                </div>

                {/* Sub Image Floater 1: Football */}
                <div className="hidden sm:block absolute -top-5 -left-5 w-32 h-32 rounded-xl overflow-hidden border-2 border-slate-700 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80"
                    alt="Football gear"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30" />
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                    Nivia Size 5
                  </span>
                </div>

                {/* Sub Image Floater 2: Badminton */}
                <div className="hidden sm:block absolute -bottom-5 -right-5 w-32 h-32 rounded-xl overflow-hidden border-2 border-slate-700 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80"
                    alt="Badminton Rackets"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/30" />
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                    Yonex Power
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMAGE-LED SPORTS CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-orange">
              <Flame className="w-4 h-4 text-accent-orange" />
              <span>11 Specialized Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading">
              Explore by Sport
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            From cricket pitches to school athletics grounds, discover genuine gear categorized for every level.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {SPORTS_CATEGORIES.map((cat: SportsCategoryInfo) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('shop');
              }}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-500 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={cat.bannerImage}
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-white font-extrabold text-xs sm:text-sm line-clamp-1 font-heading">
                  {cat.shortName}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {cat.tagline}
                </p>
                <div className="text-[10px] text-brand-700 font-bold flex items-center gap-1 pt-1">
                  <span>View Gear</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPORTS KITS & COMBO SETS (DEDICATED SECTION) */}
      <section className="bg-gradient-to-br from-brand-900 via-navy to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Value Bundles &amp; Starter Packs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Sports Kits &amp; Combo Sets
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Ready-to-play bundled kits curated by our sports specialists. Save up to 25% compared to purchasing individual items.
              </p>
            </div>

            <button
              onClick={onOpenBulkSportsEnquiry}
              className="px-4 py-2 bg-accent-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Package className="w-4 h-4" />
              <span>Customize Team Kit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsCombos.map((combo) => (
              <div
                key={combo.id}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/15 transition-all group"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-slate-800">
                    <img
                      src={combo.images[0]}
                      alt={combo.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {combo.mrp && combo.mrp > combo.price && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                        SAVE {formatINR(combo.mrp - combo.price)}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Bundle Deal
                    </span>
                  </div>

                  <h3 
                    onClick={() => onOpenProductModal(combo)}
                    className="font-bold text-base text-white hover:text-amber-300 cursor-pointer line-clamp-1 transition-colors"
                  >
                    {combo.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                    {combo.description}
                  </p>

                  {/* Included items checklist */}
                  {combo.sportAttributes?.kitItemsIncluded && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                      <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        Package Contents:
                      </div>
                      <ul className="text-xs text-slate-200 space-y-1">
                        {combo.sportAttributes.kitItemsIncluded.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {combo.sportAttributes.kitItemsIncluded.length > 3 && (
                          <li className="text-[11px] text-amber-200 font-semibold pl-5">
                            + {combo.sportAttributes.kitItemsIncluded.length - 3} more items included
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-amber-400 font-heading">
                      {formatINR(combo.price)}
                    </div>
                    {combo.mrp && (
                      <div className="text-xs text-slate-400 line-through">
                        MRP {formatINR(combo.mrp)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProductModal(combo)}
                      className="px-3 py-1.5 text-xs text-slate-200 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => onAddToCart(combo)}
                      className="px-3.5 py-1.5 bg-accent-orange hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer"
                    >
                      Add Bundle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCHOOL SPORTS & PE ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent p-6 sm:p-8 rounded-3xl border border-amber-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-orange uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-accent-orange" />
                <span>Institutional PE &amp; Sports Day Supply</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading">
                School Sports, PE &amp; Tournament Essentials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Equipping schools across Siwan, Pachrukhi, Mairwa, and Gopalganj. Complete sports packages including official Nivia match footballs, Cosco volleyballs with nets, relay batons, precision stopwatches, loud Fox 40 whistles, training bibs, and tug of war ropes.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'CBSE / BSEB Approved Kits',
                  'House-Wise Color Bibs',
                  'Sports Day Timing & Medals',
                  'Official GST Invoicing',
                  'Same-Day Delivery in Siwan'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200 shadow-xs"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs text-left">
                <div className="text-xs font-bold text-slate-800">Need an Official School Quote?</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Submit list of sports required &amp; receive an itemized quote within 2 hours.
                </div>
                <button
                  onClick={onOpenBulkSportsEnquiry}
                  className="w-full mt-3 bg-gradient-to-r from-brand-900 to-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Request School Bulk Quote</span>
                </button>
              </div>
            </div>

          </div>

          {/* School PE Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-amber-200/60">
            {schoolPEItems.slice(0, 4).map((product) => (
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
        </div>
      </section>

      {/* 5. FILTERABLE SPORTS CATALOGUE & SEARCH */}
      <section id="sports-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Complete Inventory
            </div>
            <h2 className="text-2xl font-extrabold text-navy font-heading">
              Shop Sports Equipment &amp; Accessories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Showing {displayedProducts.length} verified products
            </span>
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="text-xs font-bold text-brand-800 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 transition-colors"
            >
              Open Full Store Filters →
            </button>
          </div>
        </div>

        {/* Horizontal Sport Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          <button
            onClick={() => setSelectedSportTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSportTab === 'all'
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Sports ({sportsProducts.length})
          </button>
          {SPORTS_CATEGORIES.map((cat) => {
            const count = sportsProducts.filter(p => p.category === cat.id).length;
            const isSelected = selectedSportTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedSportTab(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayedProducts.map((product) => (
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
      </section>

      {/* 6. BESTSELLERS & RECENTLY ADDED DUAL TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Top Bestsellers */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-accent-orange flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy font-heading">
                    Pachrukhi Bestselling Sports Gear
                  </h3>
                  <p className="text-xs text-slate-500">Based on verified store counter &amp; online sales</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {bestsellers.slice(0, 4).map((product) => (
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
          </div>

          {/* Right Column: Tournament Assistance & WhatsApp Desk */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-navy text-white p-6 rounded-2xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Counter: 9 AM - 9 PM</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                Check Instant Gear Availability
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Need a specific bat weight (e.g. 1180g), specific football bladder, or custom badminton string tension? Connect directly with our sports counter in Pachrukhi.
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Primary: <strong>{settings.phonePrimary}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Secondary: <strong>{settings.phoneSecondary}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                  <span>{settings.addressFull}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
              <a
                href={getWhatsAppSportsUrl('Quick Availability Check for Equipment')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
              <button
                onClick={onOpenBulkSportsEnquiry}
                className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              >
                Submit Tournament Quotation Request
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. RECENTLY ADDED SPORTS ACCESSORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-navy font-heading">
              Recently Added Training Essentials &amp; Accessories
            </h3>
            <p className="text-xs text-slate-500">
              New arrivals in gym duffels, stainless steel bottles, compression supports &amp; equipment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {recentProducts.map((product) => (
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
      </section>

    </div>
  );
};
