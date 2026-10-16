import React from 'react';
import { Product, StoreSettings } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { GraduationCap, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AcademicShowcaseProps {
  products: Product[];
  settings: StoreSettings;
  wishlist: string[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
}

export const AcademicShowcase: React.FC<AcademicShowcaseProps> = ({
  products,
  settings,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onNavigate,
  onOpenBooklist
}) => {
  const { t, language } = useApp();

  // Filter academic, ncert, and bihar board products
  const academicProducts = products.filter(p => 
    p.category === 'school-ncert' || 
    p.category === 'bihar-board' || 
    p.category === 'academic-books'
  ).slice(0, 4);

  return (
    <section className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner callout inside section */}
        <div className="bg-gradient-to-r from-navy via-brand-950 to-brand-900 rounded-3xl p-5 sm:p-8 text-white mb-8 sm:mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <GraduationCap className="w-4 h-4" />
              <span>{t('acad.session')}</span>
            </div>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-heading text-white">
              {t('acad.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {t('acad.desc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 relative z-10 w-full md:w-auto">
            <button
              onClick={onOpenBooklist}
              className="w-full sm:w-auto bg-accent-orange hover:bg-accent-orange-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t('acad.findBooklist')}</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all cursor-pointer active:scale-98"
            >
              <span>{t('acad.browseAll')}</span>
            </button>
          </div>
        </div>

        {/* Section Grid Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-navy dark:text-white font-heading">
              {language === 'hi' ? 'प्रमुख शैक्षणिक एवं स्कूल पुस्तकें' : 'Featured Academic Books & Textbooks'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi' ? 'पचरुखी दुकान में तत्काल पिकअप या डिलीवरी के लिए उपलब्ध' : 'In stock at Pachrukhi shop for immediate pickup or delivery'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-brand-700 dark:text-amber-400 hover:text-brand-900 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'hi' ? 'और पुस्तकें देखें' : 'See more books'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {academicProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              settings={settings}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
