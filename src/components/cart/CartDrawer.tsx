import React, { useState } from 'react';
import { CartItem, StoreSettings, Coupon } from '../../types';
import { formatINR, getWhatsAppOrderUrl, generateOrderNumber } from '../../utils/helpers';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  MessageCircle, 
  Truck, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  settings: StoreSettings;
  coupons: Coupon[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  settings,
  coupons,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onNavigate
}) => {
  if (!isOpen) return null;

  const { t, language } = useApp();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.discountFlat) {
      discountAmount = appliedCoupon.discountFlat;
    }
  }

  const freeDeliveryThreshold = settings.freeDeliveryThreshold;
  const isFreeDeliveryEligible = subtotal >= freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const estimatedTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find(c => c.code.toUpperCase() === code && c.isActive);
    if (!found) {
      setCouponError(language === 'hi' ? 'अमान्य कूपन कोड। SARSWATI10 आज़माएं' : 'Invalid coupon code. Try SARSWATI10');
      return;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(
        language === 'hi' 
          ? `इस कूपन के लिए न्यूनतम ₹${found.minOrderValue} का ऑर्डर आवश्यक है` 
          : `Min order value of ₹${found.minOrderValue} required for this coupon`
      );
      return;
    }

    setAppliedCoupon(found);
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // WhatsApp Order Helper
  const handleWhatsAppOrder = () => {
    const dummyOrder = {
      id: 'wa-temp',
      orderNumber: generateOrderNumber(),
      customer: {
        fullName: 'Customer (WhatsApp Order)',
        phone: 'WhatsApp Enquiry',
        addressLine1: 'Pachrukhi / Siwan',
        villageOrLocality: 'Local',
        townOrCity: 'Pachrukhi',
        district: 'Siwan',
        state: 'Bihar',
        pinCode: '841241'
      },
      items: items.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        sku: i.product.sku,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0]
      })),
      subtotal,
      discountAmount,
      deliveryCharge: 0,
      totalAmount: estimatedTotal,
      status: 'pending_confirmation' as const,
      paymentMethod: 'pay_at_store' as const,
      paymentStatus: 'pending' as const,
      fulfilmentType: 'store_pickup' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: []
    };

    window.open(getWhatsAppOrderUrl(dummyOrder, settings), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-navy to-brand-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-heading">
                  {t('cart.title')}
                </h3>
                <p className="text-xs text-brand-200">
                  {items.length} {language === 'hi' ? 'सामान चुने गए' : items.length === 1 ? 'item selected' : 'items selected'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2.5 border-b border-amber-200 dark:border-amber-800/60 text-xs shrink-0">
            <div className="flex items-center justify-between text-amber-950 dark:text-amber-200 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-accent-orange shrink-0" />
                <span>
                  {isFreeDeliveryEligible 
                    ? `🎉 ${t('cart.freeUnlocked')}` 
                    : `${t('cart.addMore')} ₹${remainingForFreeDelivery} ${t('cart.forFree')}`}
                </span>
              </span>
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 shrink-0">
                ₹{freeDeliveryThreshold}
              </span>
            </div>
            <div className="w-full bg-amber-200/80 dark:bg-amber-900/60 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 dark:bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                  {t('cart.empty')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
                  {t('cart.emptySub')}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="mt-5 bg-brand-900 hover:bg-brand-800 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {t('cart.explore')}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700 bg-white shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-brand-800 dark:text-amber-400">
                          {formatINR(item.product.price)}
                        </span>
                        {item.product.mrp && item.product.mrp > item.product.price && (
                          <span className="line-through text-slate-400 text-[10px]">
                            {formatINR(item.product.mrp)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800 dark:text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="text-xs font-black text-navy dark:text-white">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-600 p-1 self-start transition-colors cursor-pointer"
                    title={t('cart.remove')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/95 border-t border-slate-200 dark:border-slate-700/80 space-y-3 shrink-0">
              
              {/* Coupon Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>'{appliedCoupon.code}' {language === 'hi' ? 'लागू हुआ' : 'applied'}</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-red-600 text-[11px] underline font-bold cursor-pointer"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={t('cart.couponPh')}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-900 dark:bg-brand-600 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {t('cart.apply')}
                  </button>
                </form>
              )}

              {couponError && (
                <div className="text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponError}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>{t('cart.discount')}:</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t('cart.delivery')}:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {isFreeDeliveryEligible ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t('cart.free')}</span>
                    ) : (
                      language === 'hi' ? 'चेकआउट पर' : 'Calculated at checkout'
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-navy dark:text-white border-t border-slate-200 dark:border-slate-700 pt-2">
                  <span>{t('cart.total')}:</span>
                  <span className="text-brand-900 dark:text-amber-400">{formatINR(estimatedTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 bg-brand-900 dark:bg-brand-600 hover:bg-brand-800 dark:hover:bg-brand-500 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <span>{t('cart.checkout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Fast Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('cart.waOrder')}</span>
                </button>
              </div>

              {/* Clear cart trigger */}
              <div className="text-center pt-0.5">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  {t('cart.clear')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
