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
  Truck, 
  Building2, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ArrowRight, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

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
  const { language } = useApp();

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
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'gateway_test'>('details');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryInfo = calculateDeliveryFee(subtotal, fulfilmentType, pinCode, settings);
  const deliveryCharge = deliveryInfo.fee;
  const totalAmount = subtotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim()) {
      setFormError(language === 'hi' ? 'कृपया अपना नाम और मोबाइल नंबर दर्ज करें।' : 'Please enter your full name and valid 10-digit mobile number.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setFormError(language === 'hi' ? 'कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (fulfilmentType === 'local_delivery') {
      if (!addressLine1.trim() || !pinCode.trim()) {
        setFormError(language === 'hi' ? 'होम डिलीवरी के लिए कृपया पूरा पता और पिन कोड दर्ज करें।' : 'Delivery address and PIN code are required for local dispatch.');
        return;
      }

      if (!isPinCodeServiceable(pinCode, settings)) {
        setFormError(language === 'hi' ? `पिन कोड ${pinCode} वर्तमान में सीधी होम डिलीवरी क्षेत्र में नहीं है। कृपया स्टोर पिकअप चुनें या सहायता लें।` : `PIN Code ${pinCode} is currently outside our direct home delivery radius. Please select Store Pickup or contact store.`);
        return;
      }
    }

    if (paymentMethod === 'upi_online') {
      setPaymentStep('gateway_test');
    } else {
      finalizeOrder('pending');
    }
  };

  const finalizeOrder = (paymentStatus: 'pending' | 'paid') => {
    setIsProcessing(true);

    const customerAddress: CustomerAddress = {
      fullName,
      phone,
      altPhone,
      email,
      addressLine1: fulfilmentType === 'store_pickup' ? 'Store Counter Collection (Pachrukhi)' : addressLine1,
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
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 text-center transition-colors">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-base text-navy dark:text-white">
            {language === 'hi' ? 'चेकआउट के लिए कोई वस्तु नहीं है' : 'No items to checkout'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {language === 'hi' ? 'कृपया पहले अपनी कार्ट में किताबें या स्टेशनरी जोड़ें।' : 'Please add books or stationery items to your cart first.'}
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-4 bg-brand-900 dark:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
          >
            {language === 'hi' ? 'दुकान पर जाएं' : 'Go to Shop'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight">
              {language === 'hi' ? 'चेकआउट एवं पुष्टि' : 'Checkout & Confirmation'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'hi' 
                ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार, पचरुखी के लिए सुरक्षित ऑर्डर।' 
                : 'Secure order placement for Sarswati Pustak & Sports Bhandar, Pachrukhi.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? '256-बिट सुरक्षित चेकआउट' : '256-bit Secure Checkout'}</span>
          </div>
        </div>

        {/* Error Notification */}
        {formError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-xs text-red-700 dark:text-red-400 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Gateway Simulation Modal if Online Payment */}
        {paymentStep === 'gateway_test' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-amber-400 flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6 text-brand-700 dark:text-amber-400" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                  {language === 'hi' ? 'भुगतान गेटवे (टेस्ट मोड)' : 'Payment Gateway (Test Mode)'}
                </span>
                <h3 className="text-lg font-extrabold text-navy dark:text-white font-heading mt-1.5">
                  {language === 'hi' ? 'UPI एवं ऑनलाइन भुगतान' : 'UPI & Online Payment'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'hi' ? 'प्राप्तकर्ता:' : 'Pay to:'} <strong>{language === 'hi' ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार' : 'Sarswati Pustak and Sports Bhandar'}</strong> (Pachrukhi)
                </p>
              </div>

              {/* Simulated QR Box */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-[200px] mx-auto text-center">
                <div className="w-36 h-36 bg-white p-2 border border-slate-200 rounded-xl mx-auto flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-800" />
                  <span className="text-[9px] font-mono text-slate-500 mt-1">GPay / PhonePe / Paytm</span>
                </div>
                <div className="text-xs font-bold text-navy dark:text-white mt-2">{formatINR(totalAmount)}</div>
                <span className="text-[10px] text-slate-400">UPI ID: 7091791893@upi</span>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => finalizeOrder('paid')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {isProcessing 
                    ? (language === 'hi' ? 'भुगतान सत्यापित किया जा रहा है...' : 'Verifying payment signature...') 
                    : (language === 'hi' ? 'सफल UPI भुगतान की पुष्टि करें' : 'Simulate Successful UPI Payment')}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStep('details')}
                  className="w-full py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  {language === 'hi' ? 'भुगतान माध्यम बदलें' : 'Change Payment Method'}
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
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
              <h3 className="font-extrabold text-sm text-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>{language === 'hi' ? '1. प्राप्ति माध्यम चुनें' : '1. Select Fulfilment Method'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Store Pickup */}
                <label 
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    fulfilmentType === 'store_pickup'
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-slate-800 dark:border-brand-400 ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                        <span>{language === 'hi' ? 'दुकान से पिकअप (पचरुखी)' : 'Store Pickup (Pachrukhi)'}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-relaxed">
                        {language === 'hi' 
                          ? 'सीधे दुकान काउंटर से प्राप्त करें। कोई डिलीवरी शुल्क नहीं।' 
                          : 'Collect directly from shop counter. No delivery fee.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded self-start mt-2">
                    {language === 'hi' ? 'मुफ्त' : 'FREE'}
                  </span>
                </label>

                {/* Local Delivery */}
                <label 
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    fulfilmentType === 'local_delivery'
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-slate-800 dark:border-brand-400 ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-accent-orange" />
                        <span>{language === 'hi' ? 'स्थानीय डिलीवरी (सीवान क्षेत्र)' : 'Local Delivery (Siwan Area)'}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-relaxed">
                        {language === 'hi' 
                          ? 'पचरुखी एवं सीवान में आपके घर या कोचिंग सेंटर पर डिलीवरी।' 
                          : 'Delivered to your home, village, or coaching center in Pachrukhi & Siwan.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded self-start mt-2">
                    {deliveryCharge === 0 ? (language === 'hi' ? '₹499 से ऊपर मुफ्त' : 'FREE above ₹499') : `₹${settings.standardDeliveryFee}`}
                  </span>
                </label>
              </div>
            </div>

            {/* 2. Customer Contact & Address Form */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <h3 className="font-extrabold text-sm text-navy dark:text-white uppercase tracking-wider">
                <span>2. {language === 'hi' ? 'ग्राहक एवं संपर्क विवरण' : 'Customer & Contact Details'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'उदा. रमेश कुमार' : 'e.g. Ramesh Kumar'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={language === 'hi' ? 'उदा. 9835012345' : 'e.g. 9835012345'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono dark:text-white"
                  />
                </div>
              </div>

              {fulfilmentType === 'local_delivery' && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'hi' ? 'मकान नं. / गली / सड़क का पता *' : 'House / Building / Street Address *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'hi' ? 'उदा. मेन रोड, वार्ड नं 4' : 'e.g. Main Road, Ward No 4'}
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'hi' ? 'गांव / मोहल्ला *' : 'Village / Locality *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={villageOrLocality}
                        onChange={(e) => setVillageOrLocality(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'hi' ? 'शहर / प्रखंड *' : 'City / Town *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={townOrCity}
                        onChange={(e) => setTownOrCity(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'hi' ? 'पिन कोड *' : 'PIN Code *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
              <h3 className="font-extrabold text-sm text-navy dark:text-white uppercase tracking-wider">
                <span>{language === 'hi' ? '3. भुगतान का माध्यम चुनें' : '3. Select Payment Method'}</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* Pay at Store Counter */}
                {fulfilmentType === 'store_pickup' && (
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'pay_at_store' 
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-slate-800 ring-1 ring-brand-500' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                        <div className="font-bold text-slate-900 dark:text-white">
                          {language === 'hi' ? 'दुकान काउंटर पर भुगतान (नकद / UPI)' : 'Pay at Store Counter (Cash / UPI on Pickup)'}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'hi' ? 'पचरुखी दुकान से पुस्तकें लेते समय भुगतान करें' : 'Pay when you physically collect your books at Pachrukhi shop'}
                        </div>
                      </div>
                    </div>
                    <Building2 className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                  </label>
                )}

                {/* Cash on Delivery */}
                {fulfilmentType === 'local_delivery' && (
                  <label 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-slate-800 ring-1 ring-brand-500' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                        <div className="font-bold text-slate-900 dark:text-white">
                          {language === 'hi' ? 'कैश ऑन डिलीवरी (COD)' : 'Cash on Delivery (COD)'}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === 'hi' ? 'पार्सल मिलने पर सीधे डिलीवरी कर्मी को नकद दें' : 'Pay cash directly to the delivery person upon arrival'}
                        </div>
                      </div>
                    </div>
                    <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </label>
                )}

                {/* UPI Online Payment */}
                <label 
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi_online' 
                      ? 'border-brand-600 bg-brand-50/60 dark:bg-slate-800 ring-1 ring-brand-500' 
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{language === 'hi' ? 'UPI भुगतान (QR / GPay / PhonePe / Paytm)' : 'UPI Payment (QR / GPay / PhonePe / Paytm)'}</span>
                        <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded">
                          {language === 'hi' ? 'तेज़' : 'Fast'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? 'QR कोड स्कैन करके तत्काल ऑनलाइन भुगतान' : 'Instant test mode payment simulation with QR code'}
                      </div>
                    </div>
                  </div>
                  <QrCode className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-5 sticky top-28">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base text-navy dark:text-white font-heading">
                  {language === 'hi' ? `ऑर्डर की वस्तुएं (${items.length})` : `Order Items (${items.length})`}
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="text-xs text-brand-700 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  {language === 'hi' ? 'कार्ट बदलें' : 'Edit Cart'}
                </button>
              </div>

              {/* Items list */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-56 overflow-y-auto pr-1 text-xs space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 truncate">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{item.product.name}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px]">{language === 'hi' ? 'मात्रा' : 'Qty'}: {item.quantity} × {formatINR(item.product.price)}</div>
                      </div>
                    </div>
                    <span className="font-bold text-navy dark:text-amber-400 shrink-0">{formatINR(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'उप-योग:' : 'Subtotal:'}</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'डिलीवरी शुल्क:' : 'Fulfilment:'}</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {deliveryCharge === 0 ? <span className="text-emerald-700 dark:text-emerald-400 font-bold">{language === 'hi' ? 'मुफ्त' : 'FREE'}</span> : formatINR(deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-navy dark:text-white border-t border-slate-200 dark:border-slate-800 pt-2">
                  <span>{language === 'hi' ? 'कुल देय राशि:' : 'Total Payable:'}</span>
                  <span>{formatINR(totalAmount)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-brand-900 dark:bg-brand-700 hover:bg-brand-800 dark:hover:bg-brand-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>{language === 'hi' ? 'ऑर्डर तैयार किया जा रहा है...' : 'Creating Your Order...'}</span>
                ) : (
                  <>
                    <span>{language === 'hi' ? `ऑर्डर की पुष्टि करें (${formatINR(totalAmount)})` : `Confirm & Place Order (${formatINR(totalAmount)})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
