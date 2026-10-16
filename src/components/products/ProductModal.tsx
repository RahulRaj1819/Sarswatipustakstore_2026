import React, { useState } from 'react';
import { Product, StoreSettings } from '../../types';
import { formatINR, getDiscountPercentage, getWhatsAppProductEnquiryUrl } from '../../utils/helpers';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  Check, 
  Plus, 
  Minus,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProductModalProps {
  product: Product | null;
  settings: StoreSettings;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  settings,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onBuyNow
}) => {
  if (!product) return null;

  const { t, language } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  );

  const discount = getDiscountPercentage(product.price, product.mrp);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        onClick={onClose} 
        className="fixed inset-0"
        aria-label="Close modal overlay"
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center relative">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              onError={(e) => {
                const target = e.currentTarget;
                const isSports = product.category.includes('sports');
                const isStationery = product.category.includes('notebook') || product.category.includes('pen') || product.category.includes('stationery');
                if (isSports) {
                  target.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80';
                } else if (isStationery) {
                  target.src = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80';
                } else {
                  target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80';
                }
              }}
              className="w-full h-full object-contain p-4"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto w-full pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === idx ? 'border-brand-600 ring-2 ring-brand-200' : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick local verification */}
          <div className="w-full mt-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-brand-700 dark:text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-800 dark:text-white">{t('prod.pickup')}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{settings.addressFull}</div>
            </div>
          </div>
        </div>

        {/* Right: Info & Purchase */}
        <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-none">
          <div className="space-y-4">
            
            {/* Category, Brand, SKU */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="bg-brand-50 dark:bg-slate-800 text-brand-800 dark:text-amber-300 font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">
                {product.category.replace(/-/g, ' ')}
              </span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-xl font-extrabold text-navy dark:text-white font-heading leading-snug">
              {product.name}
            </h2>

            {/* Ratings & Authenticity */}
            <div className="flex items-center gap-3 text-xs">
              {product.rating && (
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating} / 5</span>
                  {product.reviewCount && <span className="text-slate-400 font-normal">({product.reviewCount})</span>}
                </div>
              )}
              <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('prod.genuine')}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-navy dark:text-amber-400 font-heading">
                  {formatINR(product.price)}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {t('prod.mrp')}: {formatINR(product.mrp)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                    {language === 'hi' ? 'बचत' : 'Save'} {formatINR(product.mrp! - product.price)}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi' ? 'सभी खुदरा कर सहित। खरीद पर पक्का बिल।' : 'Inclusive of all retail taxes. Bill provided upon purchase.'}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  {language === 'hi' ? 'साइज़ / प्रकार चुनें:' : 'Select Size / Variant:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedVariant === variant.id
                          ? 'bg-brand-900 dark:bg-brand-600 text-white border-brand-900 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {variant.name} {variant.stock > 0 ? `(${variant.stock} ${t('prod.onlyLeft')})` : '(Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sport Specific Attributes & Specs */}
            {product.sportAttributes && (
              <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                  <span className="text-amber-600">🏆</span>
                  <span>{language === 'hi' ? 'खेल विशेषताएं' : 'Sport Specifications'}</span>
                  {product.sportType && <span className="text-[10px] bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded ml-auto">{product.sportType}</span>}
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-700 dark:text-slate-300">
                  {product.sportAttributes.batType && (
                    <div><span className="text-slate-500">Bat:</span> <strong className="text-slate-900 dark:text-white">{product.sportAttributes.batType}</strong></div>
                  )}
                  {product.sportAttributes.ballType && (
                    <div><span className="text-slate-500">Ball:</span> <strong className="text-slate-900 dark:text-white">{product.sportAttributes.ballType}</strong></div>
                  )}
                  {product.sportAttributes.ballSize && (
                    <div><span className="text-slate-500">Size:</span> <strong className="text-slate-900 dark:text-white">{product.sportAttributes.ballSize}</strong></div>
                  )}
                  {product.sportAttributes.playingSurface && (
                    <div><span className="text-slate-500">Surface:</span> <strong className="text-slate-900 dark:text-white">{product.sportAttributes.playingSurface}</strong></div>
                  )}
                  {product.sportAttributes.racketMaterial && (
                    <div><span className="text-slate-500">Material:</span> <strong className="text-slate-900 dark:text-white">{product.sportAttributes.racketMaterial}</strong></div>
                  )}
                  {product.weightGrams && (
                    <div><span className="text-slate-500">Weight:</span> <strong className="text-slate-900 dark:text-white">{product.weightGrams}g</strong></div>
                  )}
                </div>
              </div>
            )}

            {/* Stock & Quantity Row */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{language === 'hi' ? 'स्टॉक स्थिति:' : 'Stock Status:'}</span>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {product.stock > 0 
                    ? `${t('prod.inStock')} (${product.stock} ${language === 'hi' ? 'स्टोर में' : 'units in shop'})` 
                    : t('prod.outOfStock')}
                </div>
              </div>

              {product.stock > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('prod.quantity')}:</span>
                  <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : product.stock > 0
                    ? 'bg-brand-900 dark:bg-brand-600 hover:bg-brand-800 text-white active:scale-98'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t('prod.added')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t('prod.addToCart')}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuy}
                disabled={product.stock <= 0}
                className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                  product.stock > 0
                    ? 'bg-accent-orange hover:bg-accent-orange-dark text-white active:scale-98'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{t('prod.buyNow')}</span>
              </button>
            </div>

            {/* WhatsApp Enquiry & Wishlist */}
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppProductEnquiryUrl(product, settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('btn.whatsapp')}</span>
              </a>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/60 dark:border-red-900'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
                title={t('nav.wishlist')}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
