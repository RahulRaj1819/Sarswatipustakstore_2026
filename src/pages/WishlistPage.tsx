import React from 'react';
import { Product, StoreSettings } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  wishlistIds: string[];
  products: Product[];
  settings: StoreSettings;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  products,
  settings,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onNavigate
}) => {
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(product => {
      if (product.stock > 0) {
        onAddToCart(product);
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
                My Wishlist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'saved item' : 'saved items'}
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All Available to Cart</span>
            </button>
          )}
        </div>

        {/* Content */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy font-heading">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Click the heart icon on any textbook, notebook, or sports equipment to save it here for later.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                isWishlisted={true}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
