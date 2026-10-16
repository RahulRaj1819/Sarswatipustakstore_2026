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
import { useApp } from '../context/AppContext';

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
  const { t, language } = useApp();
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
    const text = language === 'hi'
      ? `नमस्ते सरस्वती स्पोर्ट्स भण्डार,\n\nमैं खेल सामग्री के बारे में पूछना चाहता हूँ: ${subject}।\nक्या आप पचरुखी स्टोर में वर्तमान स्टॉक व कीमत की पुष्टि कर सकते हैं?`
      : `Namaste Sarswati Sports Bhandar,\n\nI am inquiring about sports gear: ${subject}.\nCan you confirm current stock and prices at your Pachrukhi store?`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* 1. VISUALLY STRIKING HERO BANNER */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white overflow-hidden py-12 sm:py-20 border-b border-slate-800">
        
        {/* Subtle decorative stadium grid & ambient glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'hi' ? '1990 से पचरुखी का अग्रणी खेलकूद एवं फिटनेस स्टोर' : 'Pachrukhi\'s Premier Sports & Fitness Store Since 1990'}
                </span>
              </div>

              {/* Headline & Copy */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-none">
                {language === 'hi' ? (
                  <>
                    तैयार हो जाओ। <br />
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                      बेहतर खेलो।
                    </span>
                  </>
                ) : (
                  <>
                    Gear Up. <br />
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                      Play Better.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {language === 'hi' 
                  ? 'स्कूल, अभ्यास, फिटनेस और अपने पसंदीदा खेलों के लिए खेल उपकरण। कश्मीर विलो बैट, निविया मैच फुटबॉल, योनेक्स बैडमिंटन और पचरुखी व सीवान में संपूर्ण स्कूल खेल पैकेज।'
                  : 'Explore sports equipment and accessories for school, practice, fitness, and your favourite games. Handpicked match-grade Kashmir Willow bats, Nivia match footballs, Yonex badminton, and complete school sports packages in Pachrukhi & Siwan.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-2">
                
                {/* Primary CTA */}
                <button
                  onClick={() => {
                    const el = document.getElementById('sports-catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-accent-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>{language === 'hi' ? 'खेल उपकरण देखें' : 'Shop Sports Equipment'}</span>
                </button>

                {/* Secondary CTA */}
                <a
                  href={getWhatsAppSportsUrl('Checking Sports Stock & Availability')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Enquire on WhatsApp'}</span>
                </a>

                {/* Bulk Sports CTA */}
                <button
                  onClick={onOpenBulkSportsEnquiry}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>{language === 'hi' ? 'स्कूल / टीम कोटेशन' : 'School / Team Quote'}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-left">
                <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">
                      {language === 'hi' ? '100% प्रामाणिक ब्रांड' : '100% Genuine'}
                    </span>
                    SG, Nivia, Yonex, Cosco
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">
                      {language === 'hi' ? 'दुकान से काउंटर पिकअप' : 'Local Store Pickup'}
                    </span>
                    {language === 'hi' ? '30 मिनट में तैयार' : 'Ready in 30 mins'}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight text-slate-300">
                    <span className="font-bold text-white block">
                      {language === 'hi' ? 'स्कूल थोक दरें' : 'School Bulk Rates'}
                    </span>
                    {language === 'hi' ? 'विशेष खेल छूट' : 'Special PE discounts'}
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
                        {language === 'hi' ? 'मैच रेडी' : 'Match Ready'}
                      </span>
                      <h3 className="text-white font-extrabold text-sm sm:text-lg mt-1 font-heading">
                        {language === 'hi' ? 'कश्मीर विलो एवं लेदर किट' : 'Kashmir Willow & Leather Kits'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300">
                        {language === 'hi' ? 'सीवान और सारण के टूर्नामेंट हेतु चयनित' : 'Hand-selected for tournaments in Siwan & Saran'}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
                      ₹240+
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
              <span>{language === 'hi' ? '11 विशेष खेल विभाग' : '11 Specialized Departments'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading mt-0.5">
              {language === 'hi' ? 'खेल श्रेणी अनुसार देखें' : 'Explore by Sport'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            {language === 'hi' 
              ? 'क्रिकेट पिचों से लेकर स्कूल एथलेटिक्स मैदानों तक, हर स्तर के लिए प्रमाणित खेल सामग्री।' 
              : 'From cricket pitches to school athletics grounds, discover genuine gear categorized for every level.'}
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
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-brand-500 dark:hover:border-amber-400 shadow-xs hover:shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                  {language === 'hi' ? cat.shortNameHindi : cat.shortName}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                  {cat.tagline}
                </p>
                <div className="text-[10px] text-brand-700 dark:text-amber-400 font-bold flex items-center gap-1 pt-1">
                  <span>{language === 'hi' ? 'सामग्री देखें' : 'View Gear'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPORTS KITS & COMBO SETS */}
      <section className="bg-gradient-to-br from-brand-900 via-navy to-slate-900 text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'hi' ? 'बचत बंडल एवं स्टार्टर पैक' : 'Value Bundles & Starter Packs'}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white">
                {language === 'hi' ? 'स्पोर्ट्स किट एवं कॉम्बो सेट्स' : 'Sports Kits & Combo Sets'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {language === 'hi' 
                  ? 'हमारे खेल विशेषज्ञों द्वारा तैयार तुरंत खेलने योग्य किट। अलग-अलग खरीदने की तुलना में 25% तक की बचत।'
                  : 'Ready-to-play bundled kits curated by our sports specialists. Save up to 25% compared to purchasing individual items.'}
              </p>
            </div>

            <button
              onClick={onOpenBulkSportsEnquiry}
              className="w-full sm:w-auto px-4 py-2.5 bg-accent-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Package className="w-4 h-4" />
              <span>{language === 'hi' ? 'टीम किट तैयार कराएं' : 'Customize Team Kit'}</span>
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
                        {language === 'hi' ? 'बचत' : 'SAVE'} {formatINR(combo.mrp - combo.price)}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {language === 'hi' ? 'कॉम्बो ऑफर' : 'Bundle Deal'}
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
                        {language === 'hi' ? 'शामिल सामग्री:' : 'Package Contents:'}
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
                            + {combo.sportAttributes.kitItemsIncluded.length - 3} {language === 'hi' ? 'और सामग्री' : 'more items included'}
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
                      {language === 'hi' ? 'विवरण' : 'Inspect'}
                    </button>
                    <button
                      onClick={() => onAddToCart(combo)}
                      className="px-3.5 py-1.5 bg-accent-orange hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer"
                    >
                      {language === 'hi' ? 'बंडल जोड़ें' : 'Add Bundle'}
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
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent dark:from-amber-950/20 dark:via-orange-950/20 p-6 sm:p-8 rounded-3xl border border-amber-200/80 dark:border-amber-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-orange uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-accent-orange" />
                <span>{language === 'hi' ? 'स्कूल पीटी एवं खेल दिवस आपूर्ति' : 'Institutional PE & Sports Day Supply'}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading">
                {language === 'hi' ? 'स्कूल खेल, पीटी और टूर्नामेंट सामग्री' : 'School Sports, PE & Tournament Essentials'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {language === 'hi'
                  ? 'सीवान, पचरुखी, मैरवा और गोपालगंज के स्कूलों के लिए आधिकारिक निविया मैच फुटबॉल, कॉस्को वॉलीबॉल मय नेट, रिले बैटन, स्टॉपवॉच, फॉक्स 40 सीटी, ट्रेनिंग बिब्स और रस्साकशी की रस्सियां।'
                  : 'Equipping schools across Siwan, Pachrukhi, Mairwa, and Gopalganj. Complete sports packages including official Nivia match footballs, Cosco volleyballs with nets, relay batons, precision stopwatches, loud Fox 40 whistles, training bibs, and tug of war ropes.'}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  language === 'hi' ? 'CBSE / BSEB मान्य किट' : 'CBSE / BSEB Approved Kits',
                  language === 'hi' ? 'हाउस-वाइज कलर बिब्स' : 'House-Wise Color Bibs',
                  language === 'hi' ? 'खेल दिवस मेडल व स्टॉपवॉच' : 'Sports Day Timing & Medals',
                  language === 'hi' ? 'आधिकारिक GST बिलिंग' : 'Official GST Invoicing',
                  language === 'hi' ? 'सीवान में त्वरित डिलीवरी' : 'Same-Day Delivery in Siwan'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-slate-800 shadow-xs text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-white">
                  {language === 'hi' ? 'स्कूल के लिए आधिकारिक कोटेशन चाहिए?' : 'Need an Official School Quote?'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'hi' 
                    ? 'खेल सामग्री की सूची भेजें और 2 घंटे में विधिवत कोटेशन प्राप्त करें।'
                    : 'Submit list of sports required & receive an itemized quote within 2 hours.'}
                </div>
                <button
                  onClick={onOpenBulkSportsEnquiry}
                  className="w-full mt-3 bg-gradient-to-r from-brand-900 to-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>{language === 'hi' ? 'स्कूल बल्क कोटेशन का अनुरोध करें' : 'Request School Bulk Quote'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* School PE Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-8 pt-6 border-t border-amber-200/60 dark:border-amber-800/40">
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
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-amber-400">
              {language === 'hi' ? 'संपूर्ण स्टॉक' : 'Complete Inventory'}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white font-heading">
              {language === 'hi' ? 'खेल उपकरण एवं सहायक सामग्री' : 'Shop Sports Equipment & Accessories'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {language === 'hi' ? `${displayedProducts.length} प्रमाणित उत्पाद` : `Showing ${displayedProducts.length} verified products`}
            </span>
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="text-xs font-bold text-brand-800 dark:text-amber-400 hover:text-brand-900 bg-brand-50 dark:bg-slate-800 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'सभी स्टोर फिल्टर खोलें →' : 'Open Full Store Filters →'}
            </button>
          </div>
        </div>

        {/* Horizontal Sport Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          <button
            onClick={() => setSelectedSportTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSportTab === 'all'
                ? 'bg-brand-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {language === 'hi' ? 'सभी खेल' : 'All Sports'} ({sportsProducts.length})
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
                    ? 'bg-brand-900 dark:bg-amber-400 text-white dark:text-slate-950 border-brand-900 dark:border-amber-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'hi' ? cat.shortNameHindi : cat.shortName} ({count})
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

      {/* 6. BESTSELLERS & LIVE COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Top Bestsellers */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-accent-orange flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white font-heading">
                    {language === 'hi' ? 'पचरुखी में सर्वाधिक बिकने वाली खेल सामग्री' : 'Pachrukhi Bestselling Sports Gear'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'hi' ? 'स्टोर काउंटर एवं ऑनलाइन बिक्री के आधार पर' : 'Based on verified store counter & online sales'}
                  </p>
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

          {/* Right Column: Live Desk */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-navy text-white p-5 sm:p-6 rounded-2xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'दुकान काउंटर: सुबह 9 से रात 9 बजे' : 'Live Counter: 9 AM - 9 PM'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                {language === 'hi' ? 'तुरंत खेल सामग्री की उपलब्धता जांचें' : 'Check Instant Gear Availability'}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {language === 'hi' 
                  ? 'विशेष बैट वजन (उदा. 1180 ग्राम), विशेष फुटबॉल ब्लैडर, या बैडमिंटन स्ट्रिंग टेंशन चाहिए? सीधे पचरुखी काउंटर से संपर्क करें।'
                  : 'Need a specific bat weight (e.g. 1180g), specific football bladder, or custom badminton string tension? Connect directly with our sports counter in Pachrukhi.'}
              </p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'hi' ? 'फोन 1:' : 'Primary:'} <strong>{settings.phonePrimary}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'hi' ? 'फोन 2:' : 'Secondary:'} <strong>{settings.phoneSecondary}</strong></span>
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
                <span>{language === 'hi' ? 'सीधे व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp Directly'}</span>
              </a>
              <button
                onClick={onOpenBulkSportsEnquiry}
                className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer"
              >
                {language === 'hi' ? 'टूर्नामेंट कोटेशन अनुरोध भेजें' : 'Submit Tournament Quotation Request'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. RECENTLY ADDED SPORTS ACCESSORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white font-heading">
              {language === 'hi' ? 'हाल में जोड़ी गई खेल सामग्री एवं सहायक उपकरण' : 'Recently Added Training Essentials & Accessories'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'जिम बैग, स्टील बोतलें, सपोर्ट्स और नए उपकरण' : 'New arrivals in gym duffels, stainless steel bottles, compression supports & equipment'}
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
