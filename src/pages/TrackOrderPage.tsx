import React, { useState, useEffect } from 'react';
import { Order, StoreSettings, OrderStatus } from '../types';
import { StorageService } from '../services/storage';
import { formatINR, getWhatsAppOrderUrl } from '../utils/helpers';
import { 
  PackageCheck, 
  Search, 
  CheckCircle2, 
  Building2, 
  Phone, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TrackOrderPageProps {
  initialOrderNumber?: string;
  settings: StoreSettings;
  onNavigate: (page: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderNumber = '',
  settings,
  onNavigate: _onNavigate
}) => {
  const { language } = useApp();
  const [query, setQuery] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [_hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = query.trim();
    if (!clean) return;

    setHasSearched(true);
    let found = StorageService.getOrderById(clean);
    if (!found) {
      const byPhone = StorageService.getOrdersByPhone(clean);
      if (byPhone.length > 0) {
        found = byPhone[0];
      }
    }

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMessage(
        language === 'hi'
          ? `"${clean}" से संबंधित कोई ऑर्डर नहीं मिला। कृपया अपना ऑर्डर नंबर (जैसे SPSB-2026-8492) या 10 अंकों का मोबाइल नंबर पुनः जांचें।`
          : `No order found matching "${clean}". Please verify your order number (e.g. SPSB-2026-8492) or 10-digit mobile number.`
      );
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      const found = StorageService.getOrderById(initialOrderNumber);
      if (found) {
        setSearchedOrder(found);
        setHasSearched(true);
      }
    }
  }, [initialOrderNumber]);

  const getTimelineSteps = (order: Order) => {
    const isPickup = order.fulfilmentType === 'store_pickup';
    return [
      {
        id: 'pending_confirmation',
        label: language === 'hi' ? 'ऑर्डर प्राप्त हुआ' : 'Order Placed',
        desc: language === 'hi' ? 'ऑर्डर स्टोर बहीखाते में दर्ज' : 'Order details recorded in store ledger'
      },
      {
        id: 'confirmed',
        label: language === 'hi' ? 'स्टोर द्वारा स्वीकृत' : 'Store Confirmed',
        desc: language === 'hi' ? 'पचरुखी स्टाफ द्वारा स्टॉक सत्यापित' : 'Stock verified by Pachrukhi store staff'
      },
      {
        id: 'processing',
        label: language === 'hi' ? 'पैकिंग पूर्ण' : 'Packed & Ready',
        desc: isPickup 
          ? (language === 'hi' ? 'काउंटर पर पार्सल तैयार' : 'Package packed at counter')
          : (language === 'hi' ? 'स्थानीय डिलीवरी हेतु तैयार' : 'Dispatched for local delivery')
      },
      {
        id: isPickup ? 'ready_for_pickup' : 'shipped',
        label: isPickup 
          ? (language === 'hi' ? 'पिकअप हेतु तैयार' : 'Ready for Pickup')
          : (language === 'hi' ? 'डिलीवरी के लिए रवाना' : 'Out for Delivery'),
        desc: isPickup 
          ? (language === 'hi' ? 'मेन रोड दुकान से ले जाएं' : 'Ready for collection at Main Road shop')
          : (language === 'hi' ? 'डिलीवरी कर्मी आपके पते पर रवाना' : 'Delivery boy en-route to your village/locality')
      },
      {
        id: 'delivered',
        label: isPickup 
          ? (language === 'hi' ? 'प्राप्त / सुपुर्द' : 'Collected / Delivered')
          : (language === 'hi' ? 'सफलतापूर्वक डिलीवर' : 'Delivered'),
        desc: language === 'hi' ? 'सामान सुपुर्द और रसीद जारी' : 'Handover complete and receipt issued'
      }
    ];
  };

  const getStepStatusIndex = (currentStatus: OrderStatus): number => {
    switch (currentStatus) {
      case 'pending_confirmation': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'ready_for_pickup':
      case 'shipped':
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      case 'cancelled':
      case 'refunded': return -1;
      default: return 0;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-bold">
            <PackageCheck className="w-4 h-4 text-brand-700 dark:text-amber-400" />
            <span>{language === 'hi' ? 'पचरुखी स्टोर ऑर्डर ट्रैकिंग' : 'Pachrukhi Store Order Tracking'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight">
            {language === 'hi' ? 'ऑर्डर की स्थिति जांचें' : 'Track My Order Status'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {language === 'hi'
              ? 'अपना ऑर्डर नंबर (जैसे SPSB-2026-8492) या पंजीकृत 10 अंकों का मोबाइल नंबर दर्ज करें।'
              : 'Enter your order reference number (e.g. SPSB-2026-8492) or registered 10-digit mobile number to view live progress.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md transition-colors">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={language === 'hi' ? 'ऑर्डर नंबर या मोबाइल नंबर दर्ज करें...' : 'Enter Order Number or Mobile Number...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-brand-900 dark:bg-brand-700 hover:bg-brand-800 dark:hover:bg-brand-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'ट्रैक करें' : 'Track Order'}
            </button>
          </form>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="max-w-xl mx-auto p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-xs text-red-700 dark:text-red-400 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Search Result Tracking Card */}
        {searchedOrder && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-8 animate-in fade-in duration-200 transition-colors">
            
            {/* Top Order Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {language === 'hi' ? 'ट्रैकिंग संदर्भ' : 'Tracking Reference'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy dark:text-white font-heading">
                  {language === 'hi' ? 'ऑर्डर' : 'Order'} #{searchedOrder.orderNumber}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                  <span>{language === 'hi' ? 'दिनांक' : 'Placed on'}: {new Date(searchedOrder.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{language === 'hi' ? 'ग्राहक' : 'Customer'}: <strong className="text-slate-800 dark:text-slate-200">{searchedOrder.customer.fullName}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  searchedOrder.status === 'delivered' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                    : searchedOrder.status === 'cancelled'
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-400'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}>
                  {language === 'hi' ? 'स्थिति' : 'Status'}: {searchedOrder.status.replace(/_/g, ' ')}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'hi' ? 'प्रकार' : 'Fulfilment'}: <strong>{searchedOrder.fulfilmentType === 'store_pickup' ? (language === 'hi' ? 'दुकान से पिकअप' : 'Store Pickup') : (language === 'hi' ? 'स्थानीय डिलीवरी' : 'Local Delivery')}</strong>
                </div>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-6">
                {language === 'hi' ? 'सजीव प्रगति विवरण' : 'Live Fulfilment Progress'}
              </h4>

              <div className="relative">
                {/* Horizontal progress bar for desktop */}
                <div className="hidden md:grid grid-cols-5 gap-2 relative">
                  {getTimelineSteps(searchedOrder).map((step, idx) => {
                    const currentIndex = getStepStatusIndex(searchedOrder.status);
                    const isCompleted = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={step.id} className="text-center relative">
                        {idx < 4 && (
                          <div 
                            className={`absolute top-4 left-1/2 w-full h-1 z-0 transition-colors ${
                              idx < currentIndex ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                            }`} 
                          />
                        )}

                        <div className={`relative z-10 w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950/80 shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div className="mt-2.5">
                          <div className={`text-xs font-bold ${isCurrent ? 'text-brand-900 dark:text-amber-400 font-extrabold' : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>
                            {step.label}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight max-w-[130px] mx-auto">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical timeline for mobile */}
                <div className="md:hidden space-y-4">
                  {getTimelineSteps(searchedOrder).map((step, idx) => {
                    const currentIndex = getStepStatusIndex(searchedOrder.status);
                    const isCompleted = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={step.id} className="flex gap-3 items-start">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isCurrent ? 'text-brand-900 dark:text-amber-400' : isCompleted ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'}`}>
                            {step.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fulfilment & Pickup Notes */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-navy dark:text-white uppercase tracking-wider text-[10px] block mb-1">
                  {language === 'hi' ? 'स्थान / गंतव्य' : 'Collection / Destination'}
                </span>
                {searchedOrder.fulfilmentType === 'store_pickup' ? (
                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                      <Building2 className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                      <span>{language === 'hi' ? 'सरस्वती पुस्तक मेन रोड दुकान' : 'Sarswati Pustak Main Road Shop'}</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">{settings.addressFull}</div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      {language === 'hi' ? `खुलने का समय: ${settings.businessHours}` : `Store Hours: ${settings.businessHours}`}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
                    <div className="font-semibold text-slate-900 dark:text-white">{searchedOrder.customer.addressLine1}</div>
                    <div>{searchedOrder.customer.villageOrLocality}, {searchedOrder.customer.townOrCity}</div>
                    <div>{language === 'hi' ? 'जिला' : 'District'}: {searchedOrder.customer.district} - PIN {searchedOrder.customer.pinCode}</div>
                  </div>
                )}
              </div>

              <div>
                <span className="font-bold text-navy dark:text-white uppercase tracking-wider text-[10px] block mb-1">
                  {language === 'hi' ? 'भुगतान विवरण' : 'Payment Summary'}
                </span>
                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <div>
                    {language === 'hi' ? 'माध्यम' : 'Method'}: <strong className="uppercase">{searchedOrder.paymentMethod.replace(/_/g, ' ')}</strong>
                  </div>
                  <div>
                    {language === 'hi' ? 'स्थिति' : 'Status'}: <span className={`font-bold uppercase ${searchedOrder.paymentStatus === 'paid' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-800 dark:text-amber-400'}`}>
                      {searchedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="font-extrabold text-navy dark:text-white text-sm pt-1">
                    {language === 'hi' ? 'कुल राशि' : 'Total Amount'}: {formatINR(searchedOrder.totalAmount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                {language === 'hi' ? `ऑर्डर की वस्तुएं (${searchedOrder.items.length})` : `Items In This Order (${searchedOrder.items.length})`}
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                {searchedOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{item.productName}</div>
                        <div className="text-slate-400 dark:text-slate-500 text-[10px]">SKU: {item.sku} • {language === 'hi' ? 'मात्रा' : 'Qty'}: {item.quantity}</div>
                      </div>
                    </div>
                    <span className="font-bold text-navy dark:text-amber-400">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={getWhatsAppOrderUrl(searchedOrder, settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर अपडेट पूछें' : 'Ask Update on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${settings.phonePrimary}`}
                className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                <span>{language === 'hi' ? `स्टोर पर कॉल करें: ${settings.phonePrimary}` : `Call Store: ${settings.phonePrimary}`}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
