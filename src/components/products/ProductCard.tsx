import React, { useState } from 'react';
import { Product, StoreSettings } from '../../types';
import { formatINR, getDiscountPercentage, getWhatsAppProductEnquiryUrl } from '../../utils/helpers';
import { ShoppingCart, Heart, Eye, MessageCircle, Star, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onSelectProduct
}) => {
  const { t } = useApp();
  const [isJustAdded, setIsJustAdded] = useState(false);
  const discount = getDiscountPercentage(product.price, product.mrp);

  const handleAdd = () => {
    onAddToCart(product);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1500);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden relative">
      
      {/* Badges Bar */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {discount > 0 && (
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            {discount}% OFF
          </span>
        )}
        {product.isDealOfDay && (
          <span className="bg-accent-orange text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
            Deal
          </span>
        )}
        {product.board && (
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
            {product.board}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        aria-label="Save to Wishlist"
        className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
          isWishlisted
            ? 'bg-red-50 text-red-600 ring-1 ring-red-200 dark:bg-red-950/60 dark:ring-red-900'
            : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-500 dark:text-slate-300 hover:text-red-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
      </button>

      {/* Image Container with hover zoom */}
      <div 
        onClick={() => onSelectProduct ? onSelectProduct(product) : onQuickView(product)}
        className="w-full aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden relative cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (product.images[1] && target.src !== product.images[1]) {
              target.src = product.images[1];
            } else {
              const isSports = product.category.includes('sports');
              const isStationery = product.category.includes('notebook') || product.category.includes('pen') || product.category.includes('stationery');
              if (isSports) {
                target.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80';
              } else if (isStationery) {
                target.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80';
              } else {
                target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80';
              }
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white hover:bg-white hover:text-brand-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-brand-600 dark:text-amber-400" />
            <span>{t('prod.quickView')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Publisher / Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="capitalize font-medium text-brand-700 dark:text-amber-400 truncate max-w-[65%]">
              {product.brand || product.publisher || product.category.replace(/-/g, ' ')}
            </span>
            {product.classGrade && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-medium text-[10px]">
                {product.classGrade}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelectProduct ? onSelectProduct(product) : onQuickView(product)}
            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-brand-800 dark:hover:text-amber-300 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Ratings */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 px-1.5 py-0.5 rounded text-[11px] font-bold text-amber-800 dark:text-amber-300">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                <span>{product.rating}</span>
              </div>
              {product.reviewCount && (
                <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Stock */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-navy dark:text-amber-400 font-heading">
              {formatINR(product.price)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>

          {/* Stock Notice */}
          <div className="mt-1 flex items-center justify-between text-[11px]">
            {product.stock > 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t('prod.inStock')} {product.stock <= 5 ? `(${product.stock} ${t('prod.onlyLeft')})` : ''}</span>
              </span>
            ) : (
              <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{t('prod.askStore')}</span>
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            <button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className={`col-span-4 py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                product.stock <= 0
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : isJustAdded
                  ? 'bg-emerald-600 text-white scale-[1.02]'
                  : 'bg-brand-900 dark:bg-brand-600 hover:bg-brand-800 text-white active:scale-98 cursor-pointer'
              }`}
            >
              {isJustAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('prod.added')}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{product.stock > 0 ? t('prod.addToCart') : t('prod.outOfStock')}</span>
                </>
              )}
            </button>

            {/* Quick WhatsApp Ask */}
            <a
              href={getWhatsAppProductEnquiryUrl(product, settings)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${product.name} on WhatsApp`}
              className="col-span-1 p-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-center transition-colors shadow-xs"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
