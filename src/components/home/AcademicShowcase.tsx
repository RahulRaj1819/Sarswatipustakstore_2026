import React from 'react';
import { Product, StoreSettings } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { BookOpen, GraduationCap, ArrowRight, FileSpreadsheet } from 'lucide-react';

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
  // Filter academic, ncert, and bihar board products
  const academicProducts = products.filter(p => 
    p.category === 'school-ncert' || 
    p.category === 'bihar-board' || 
    p.category === 'academic-books'
  ).slice(0, 4);

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner callout inside section */}
        <div className="bg-gradient-to-r from-navy via-brand-950 to-brand-900 rounded-3xl p-6 sm:p-8 text-white mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Session 2026–2027</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white">
              Academic Essentials for Students &amp; Parents
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Official NCERT textbooks, Bihar Board BSTBPC guides, R.D. Sharma reference books, and Classmate registers all at genuine government MRP &amp; discounted retail prices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto">
            <button
              onClick={onOpenBooklist}
              className="w-full sm:w-auto bg-accent-orange hover:bg-accent-orange-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Find Your School Books</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all"
            >
              <span>Browse All Books →</span>
            </button>
          </div>
        </div>

        {/* Section Grid */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-navy font-heading">
              Featured Academic Books &amp; Textbooks
            </h3>
            <p className="text-xs text-slate-500">
              In stock at Pachrukhi shop for immediate pickup or delivery
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1"
          >
            <span>See more books</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
