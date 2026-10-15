import React, { useState } from 'react';
import { CartItem, StoreSettings, Coupon, Product } from '../types';
import { formatINR, getDiscountPercentage } from '../utils/helpers';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface CartPageProps {
  items: CartItem[];
  settings: StoreSettings;
  coupons: Coupon[];
  allProducts: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  settings,
  coupons,
  allProducts,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onNavigate,
  onAddToCart
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

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

  const isFreeDelivery = subtotal >= settings.freeDeliveryThreshold;
  const remainingForFree = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const coupon = coupons.find(c => c.code.toUpperCase() === code && c.isActive);
    if (!coupon) {
      setCouponError('Invalid coupon code. Try SARSWATI10');
      return;
    }
    if (subtotal < coupon.minOrderValue) {
      setCouponError(`Min order value of ₹${coupon.minOrderValue} required for this coupon`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponInput('');
  };

  // Complementary recommendations (items not in cart)
  const cartIds = items.map(i => i.product.id);
  const recommendations = allProducts
    .filter(p => !cartIds.includes(p.id) && (p.category === 'pens-writing' || p.category === 'stationery'))
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review selected books, stationery, and sports equipment before ordering.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy font-heading">
              Your cart is currently empty
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore NCERT books, Classmate notebooks, cricket gear, and essential office stationery.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Delivery Goal Strip */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-accent-orange flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {isFreeDelivery 
                        ? '🎉 Free Local Delivery Unlocked!' 
                        : `Add ₹${remainingForFree} more for Free Delivery in Pachrukhi`}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Standard delivery ₹{settings.standardDeliveryFee} or free store pickup
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden divide-y divide-slate-100">
                <div className="p-4 bg-slate-50/80 font-bold text-xs text-slate-600 uppercase tracking-wider flex justify-between">
                  <span>Product Details</span>
                  <span>Quantity &amp; Price</span>
                </div>

                {items.map((item) => (
                  <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider bg-brand-50 px-2 py-0.5 rounded">
                          {item.product.category.replace(/-/g, ' ')}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-navy mt-1">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                          <span className="font-semibold text-brand-800">{formatINR(item.product.price)}</span>
                          {item.product.mrp && item.product.mrp > item.product.price && (
                            <span className="text-slate-400 line-through text-[11px]">{formatINR(item.product.mrp)}</span>
                          )}
                          <span className="text-emerald-700 font-medium text-[11px]">• In Stock</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-slate-100 text-slate-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 hover:bg-slate-100 text-slate-600 disabled:opacity-40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[70px]">
                        <div className="text-sm font-extrabold text-navy">
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1.5 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart link */}
              <div className="flex justify-between items-center text-xs">
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-brand-800 font-bold hover:underline"
                >
                  ← Continue Shopping
                </button>
                <button
                  onClick={onClearCart}
                  className="text-slate-400 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>

              {/* Complementary Essentials */}
              {recommendations.length > 0 && (
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs mt-6">
                  <h4 className="font-bold text-xs text-navy uppercase tracking-wider mb-3">
                    Add Common School / Office Essentials
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs">
                        <div className="truncate">
                          <div className="font-bold text-slate-800 truncate">{rec.name}</div>
                          <div className="text-brand-800 font-semibold">{formatINR(rec.price)}</div>
                        </div>
                        <button
                          onClick={() => onAddToCart(rec)}
                          className="bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold px-2 py-1 rounded-lg shrink-0 text-[11px]"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5 sticky top-28">
              <h3 className="font-extrabold text-base text-navy font-heading pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Coupon '{appliedCoupon.code}' Active</span>
                  </div>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-emerald-700 hover:text-red-600 font-bold underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon: SARSWATI10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs uppercase font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <div className="text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{couponError}</span>
                    </div>
                  )}
                </form>
              )}

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs text-slate-600 divide-y divide-slate-100">
                <div className="flex justify-between pt-1">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between pt-2 text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <span>Fulfilment:</span>
                  <span className="font-medium text-slate-800">
                    Pickup (Free) or Delivery
                  </span>
                </div>

                <div className="flex justify-between pt-3 text-base font-black text-navy">
                  <span>Payable Amount:</span>
                  <span>{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Local Trust Note */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-brand-700" />
                  <span>Sarswati Pustak Pachrukhi Shop</span>
                </div>
                <p>
                  Orders can be picked up at the counter or delivered locally in Siwan district.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
