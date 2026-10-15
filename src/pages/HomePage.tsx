import React, { useState } from 'react';
import { Product, StoreSettings, ProductCategory } from '../types';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { AcademicShowcase } from '../components/home/AcademicShowcase';
import { HomeSportsSection } from '../components/home/HomeSportsSection';
import { ShopByPurpose } from '../components/home/ShopByPurpose';
import { LocalTrustSection } from '../components/home/LocalTrustSection';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, Sparkles, Tag, Check, Copy, X } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  settings: StoreSettings;
  wishlist: string[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
  onOpenProductModal: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  settings,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onSelectCategory,
  onNavigate,
  onOpenBooklist,
  onOpenProductModal
}) => {
  const [isDealDismissed, setIsDealDismissed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Featured products
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  // Deals of the day
  const dealsProducts = products.filter(p => p.isDealOfDay).slice(0, 4);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SARSWATI10');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Banner */}
      <HeroBanner
        settings={settings}
        onNavigate={onNavigate}
        onOpenBooklist={onOpenBooklist}
      />

      {/* 2. Deals of the Day Banner Strip */}
      {dealsProducts.length > 0 && !isDealDismissed && (
        <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-2.5 px-4 shadow-sm relative">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-white/20 text-white">
                <Tag className="w-3.5 h-3.5" />
              </span>
              <span>
                <strong>Deal of the Day:</strong> Up to 25% OFF on textbooks &amp; sports equipment! Use code:
              </span>
              <button
                onClick={handleCopyCode}
                title="Click to copy promo code"
                className="inline-flex items-center gap-1 bg-white text-navy font-bold px-2 py-0.5 rounded font-mono hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
              >
                <span>SARSWATI10</span>
                {isCopied ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </button>
              {isCopied && <span className="text-[11px] text-emerald-100 font-bold">Copied!</span>}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="underline hover:text-navy font-bold cursor-pointer transition-colors"
              >
                Claim Deals Now →
              </button>
              <button
                onClick={() => setIsDealDismissed(true)}
                className="text-white/80 hover:text-white p-1 rounded transition-colors"
                title="Dismiss banner"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. Shop by Category */}
      <CategoryGrid
        onSelectCategory={onSelectCategory}
        onNavigate={onNavigate}
      />

      {/* 4. Featured Products Grid */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Store Highlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight mt-1">
                Featured Products &amp; Best-Sellers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Authentic stock available at our Pachrukhi retail counter.
              </p>
            </div>

            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('shop');
              }}
              className="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 group self-start sm:self-end"
            >
              <span>Explore full catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
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

      {/* 5. Academic Essentials & School Books */}
      <AcademicShowcase
        products={products}
        settings={settings}
        wishlist={wishlist}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        onQuickView={onQuickView}
        onNavigate={onNavigate}
        onOpenBooklist={onOpenBooklist}
      />

      {/* 6. Dedicated Sports Department Showcase */}
      <HomeSportsSection
        onSelectCategory={onSelectCategory}
        onNavigate={onNavigate}
      />

      {/* 7. Shop by Purpose */}
      <ShopByPurpose
        onSelectCategory={onSelectCategory}
        onNavigate={onNavigate}
        onOpenBooklist={onOpenBooklist}
      />

      {/* 7. Local Trust, Community Heritage & Location Card */}
      <LocalTrustSection
        settings={settings}
        onOpenBooklist={onOpenBooklist}
        onNavigate={onNavigate}
      />
    </div>
  );
};
