import React, { useState } from 'react';
import { 
  CartItem, 
  StoreSettings, 
  Order, 
  PaymentMethod, 
  FulfilmentType,
  CustomerAddress 
} from '../types';
import { StorageService } from '../services/storage';
import { 
  formatINR, 
  generateOrderNumber, 
  calculateDeliveryFee, 
  isPinCodeServiceable 
} from '../utils/helpers';
import { 
  ShieldCheck, 
  Truck, 
  Building2, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Clock,
  Sparkles
} from 'lucide-react';

interface CheckoutPageProps {
  items: CartItem[];
  settings: StoreSettings;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  settings,
  onClearCart,
  onOrderPlaced,
  onNavigate
}) => {
  // Customer details form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [villageOrLocality, setVillageOrLocality] = useState('Pachrukhi');
  const [townOrCity, setTownOrCity] = useState('Pachrukhi');
  const [district, setDistrict] = useState('Siwan');
  const [state, setState] = useState('Bihar');
  const [pinCode, setPinCode] = useState('841241');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Fulfilment & Payment choices
  const [fulfilmentType, setFulfilmentType] = useState<FulfilmentType>('store_pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pay_at_store');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'gateway_test'>('details');

  // Subtotal and delivery fee
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCalc = calculateDeliveryFee(subtotal, fulfilmentType, pinCode, settings);
  const deliveryCharge = fulfilmentType === 'store_pickup' ? 0 : deliveryCalc.fee;
  const totalAmount = subtotal + deliveryCharge;

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number and full name.');
      return;
    }

    if (fulfilmentType === 'local_delivery') {
      if (!addressLine1.trim() || !villageOrLocality.trim() || !pinCode.trim()) {
        alert('Please complete the delivery address fields.');
        return;
      }
      if (!deliveryCalc.isServiceable) {
        alert(`PIN code ${pinCode} is outside our local delivery zone in Siwan. Please select Store Pickup.`);
        return;
      }
    }

    // If online payment (UPI or Card), show gateway simulation
    if (paymentMethod === 'upi_online' || paymentMethod === 'card_netbanking') {
      setPaymentStep('gateway_test');
    } else {
      finalizeOrder('pending');
    }
  };

  const finalizeOrder = (paymentStatus: 'paid' | 'pending') => {
    setIsProcessing(true);

    const customerAddress: CustomerAddress = {
      fullName,
      phone,
      altPhone,
      email,
      addressLine1: addressLine1 || 'Store Pickup',
      villageOrLocality,
      townOrCity,
      district,
      state,
      pinCode,
      deliveryInstructions
    };

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customer: customerAddress,
      items: items.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        sku: i.product.sku,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0]
      })),
      subtotal,
      discountAmount: 0,
      deliveryCharge,
      totalAmount,
      status: 'pending_confirmation',
      paymentMethod,
      paymentStatus,
      transactionId: paymentStatus === 'paid' ? `TXN-${Date.now()}` : undefined,
      fulfilmentType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'pending_confirmation',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${paymentMethod.replace(/_/g, ' ')}. Waiting for store confirmation.`
        }
      ]
    };

    setTimeout(() => {
      StorageService.createOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200">
          <h3 className="font-bold text-base text-navy">No items to checkout</h3>
          <p className="text-xs text-slate-500 mt-2">Please add books or stationery items to your cart first.</p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-4 bg-brand-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
              Checkout &amp; Confirmation
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Secure order placement for Sarswati Pustak &amp; Sports Bhandar, Pachrukhi.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit Secure Checkout</span>
          </div>
        </div>

        {/* Gateway Simulation Modal if Online Payment */}
        {paymentStep === 'gateway_test' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6 text-brand-700" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Payment Gateway (Test Mode)
                </span>
                <h3 className="text-lg font-extrabold text-navy font-heading mt-1.5">
                  UPI &amp; Online Payment
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pay to: <strong>Sarswati Pustak and Sports Bhandar</strong> (Pachrukhi)
                </p>
              </div>

              {/* Simulated QR Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-[200px] mx-auto text-center">
                <div className="w-36 h-36 bg-white p-2 border border-slate-200 rounded-xl mx-auto flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-800" />
                  <span className="text-[9px] font-mono text-slate-500 mt-1">Scan via GPay / PhonePe / Paytm</span>
                </div>
                <div className="text-xs font-bold text-navy mt-2">{formatINR(totalAmount)}</div>
                <span className="text-[10px] text-slate-400">UPI ID: 7091791893@upi</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 leading-relaxed text-left border border-amber-200">
                ℹ️ <strong>Developer Test Mode:</strong> As specified in guidelines, live Indian payment gateway operates in sandbox. Click "Simulate Successful Payment" to complete verification.
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => finalizeOrder('paid')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
                >
                  {isProcessing ? 'Verifying payment signature...' : 'Simulate Successful UPI Payment'}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStep('details')}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  Change Payment Method
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Checkout Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customer Information & Delivery Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Fulfilment Method Choice */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider flex items-center gap-2">
                <span>1. Select Fulfilment Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Store Pickup */}
                <label 
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    fulfilmentType === 'store_pickup'
                      ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="fulfilment"
                      checked={fulfilmentType === 'store_pickup'}
                      onChange={() => {
                        setFulfilmentType('store_pickup');
                        setPaymentMethod('pay_at_store');
                      }}
                      className="text-brand-700 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-brand-700" />
                        <span>Store Pickup (Pachrukhi)</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                        Collect directly from shop counter. No delivery fee. Kept ready within 1 hour.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded self-start mt-2">
                    FREE
                  </span>
                </label>

                {/* Local Delivery */}
                <label 
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    fulfilmentType === 'local_delivery'
                      ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="fulfilment"
                      checked={fulfilmentType === 'local_delivery'}
                      onChange={() => {
                        setFulfilmentType('local_delivery');
                        setPaymentMethod('cod');
                      }}
                      className="text-brand-700 mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-accent-orange" />
                        <span>Local Delivery (Siwan Area)</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                        Delivered to your home, village, or coaching center in Pachrukhi &amp; Siwan.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded self-start mt-2">
                    {deliveryCharge === 0 ? 'FREE above ₹499' : `₹${settings.standardDeliveryFee}`}
                  </span>
                </label>
              </div>
            </div>

            {/* 2. Customer Contact & Address Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
                <span>2. Customer &amp; {fulfilmentType === 'store_pickup' ? 'Contact Details' : 'Delivery Address'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9835012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alternate Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="For delivery boy / SMS"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="For receipt / invoice"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Delivery specific fields */}
              {fulfilmentType === 'local_delivery' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      House / Flat No., Road, Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Near Block Chowk, Main Market"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Village / Locality *</label>
                      <input
                        type="text"
                        required
                        value={villageOrLocality}
                        onChange={(e) => setVillageOrLocality(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Town / Block *</label>
                      <input
                        type="text"
                        required
                        value={townOrCity}
                        onChange={(e) => setTownOrCity(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">District *</label>
                      <input
                        type="text"
                        readOnly
                        value={district}
                        className="w-full text-xs p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="841241"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono font-bold"
                      />
                      <span className={`text-[10px] mt-1 block font-medium ${deliveryCalc.isServiceable ? 'text-emerald-700' : 'text-red-600'}`}>
                        {deliveryCalc.message}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        readOnly
                        value={state}
                        className="w-full text-xs p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Instructions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Call before arrival / Deliver after 4 PM"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* 3. Payment Method Choice */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
                <span>3. Payment Option</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* Pay at Store */}
                {fulfilmentType === 'store_pickup' && (
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'pay_at_store' 
                        ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pay_at_store'}
                        onChange={() => setPaymentMethod('pay_at_store')}
                        className="text-brand-700"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Pay at Store Counter (Cash / UPI on Pickup)</div>
                        <div className="text-[11px] text-slate-500">Pay when you physically collect your books at Pachrukhi shop</div>
                      </div>
                    </div>
                    <Building2 className="w-4 h-4 text-brand-700" />
                  </label>
                )}

                {/* Cash on Delivery */}
                {fulfilmentType === 'local_delivery' && (
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-brand-700"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Cash on Delivery (COD)</div>
                        <div className="text-[11px] text-slate-500">Pay cash directly to the delivery person upon arrival</div>
                      </div>
                    </div>
                    <Banknote className="w-4 h-4 text-emerald-600" />
                  </label>
                )}

                {/* UPI Online Payment */}
                <label 
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi_online' 
                      ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi_online'}
                      onChange={() => setPaymentMethod('upi_online')}
                      className="text-brand-700"
                    />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>UPI Payment (QR / GPay / PhonePe / Paytm)</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">Fast</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Instant test mode payment simulation with QR code</div>
                    </div>
                  </div>
                  <QrCode className="w-4 h-4 text-brand-700" />
                </label>

                {/* Card / NetBanking */}
                <label 
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card_netbanking' 
                      ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card_netbanking'}
                      onChange={() => setPaymentMethod('card_netbanking')}
                      className="text-brand-700"
                    />
                    <div>
                      <div className="font-bold text-slate-900">Debit / Credit Card &amp; NetBanking</div>
                      <div className="text-[11px] text-slate-500">All major Indian banks supported (Test integration)</div>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-slate-600" />
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-5 sticky top-28">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-navy font-heading">
                  Order Items ({items.length})
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="text-xs text-brand-700 hover:underline font-semibold"
                >
                  Edit Cart
                </button>
              </div>

              {/* Items list */}
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1 text-xs space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 truncate">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">{item.product.name}</div>
                        <div className="text-slate-500 text-[11px]">Qty: {item.quantity} × {formatINR(item.product.price)}</div>
                      </div>
                    </div>
                    <span className="font-bold text-navy shrink-0">{formatINR(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfilment ({fulfilmentType === 'store_pickup' ? 'Pickup' : 'Local Delivery'}):</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatINR(deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-navy border-t border-slate-200 pt-2">
                  <span>Total Payable:</span>
                  <span>{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Creating Your Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order ({formatINR(totalAmount)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                By placing this order you agree to Sarswati Pustak &amp; Sports Bhandar's retail policies. Stock is confirmed by shopkeeper.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
