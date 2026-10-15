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
      setCouponError('Invalid coupon code. Try SARSWATI10');
      return;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Min order value of ₹${found.minOrderValue} required for this coupon`);
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-navy text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-extrabold text-base font-heading">Shopping Cart</h3>
                <p className="text-xs text-slate-300">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-200 text-xs">
            <div className="flex items-center justify-between text-amber-950 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-accent-orange" />
                {isFreeDeliveryEligible 
                  ? '🎉 Free Local Delivery Unlocked!' 
                  : `Add ₹${remainingForFreeDelivery} more for FREE Delivery`}
              </span>
              <span className="text-[11px] font-bold text-amber-800">
                Goal: ₹{freeDeliveryThreshold}
              </span>
            </div>
            <div className="w-full bg-amber-200/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Discover NCERT textbooks, Classmate notebooks, sports gear, and stationery essentials.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="mt-4 bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                    }}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-brand-800">
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
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="text-xs font-black text-navy">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-600 p-1 self-start transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              
              {/* Coupon Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Coupon '{appliedCoupon.code}' applied</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-emerald-700 hover:text-red-600 text-[11px] underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon: SARSWATI10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <div className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponError}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount:</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-semibold text-slate-800">
                    {isFreeDeliveryEligible ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-navy border-t border-slate-200 pt-2">
                  <span>Estimated Total:</span>
                  <span>{formatINR(estimatedTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Fast Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              {/* Clear cart trigger */}
              <div className="text-center pt-1">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
