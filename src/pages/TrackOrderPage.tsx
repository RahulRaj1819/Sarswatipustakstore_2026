import React, { useState, useEffect } from 'react';
import { Order, StoreSettings, OrderStatus } from '../types';
import { StorageService } from '../services/storage';
import { formatINR, getWhatsAppOrderUrl } from '../utils/helpers';
import { 
  PackageCheck, 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Phone, 
  MessageCircle,
  AlertCircle,
  Calendar,
  MapPin
} from 'lucide-react';

interface TrackOrderPageProps {
  initialOrderNumber?: string;
  settings: StoreSettings;
  onNavigate: (page: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderNumber = '',
  settings,
  onNavigate
}) => {
  const [query, setQuery] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = query.trim();
    if (!clean) return;

    setHasSearched(true);
    // Look up by order number or ID
    let found = StorageService.getOrderById(clean);
    if (!found) {
      // Look up by phone
      const byPhone = StorageService.getOrdersByPhone(clean);
      if (byPhone.length > 0) {
        found = byPhone[0];
      }
    }

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMessage(`No order found matching "${clean}". Please verify your order number (e.g. SPSB-2026-8492) or 10-digit mobile number.`);
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

  // Status step progression definition
  const getTimelineSteps = (order: Order) => {
    const isPickup = order.fulfilmentType === 'store_pickup';
    return [
      {
        id: 'pending_confirmation',
        label: 'Order Placed',
        desc: 'Order details recorded in store ledger'
      },
      {
        id: 'confirmed',
        label: 'Store Confirmed',
        desc: 'Stock verified by Pachrukhi store staff'
      },
      {
        id: 'processing',
        label: 'Packed & Ready',
        desc: isPickup ? 'Package packed at counter' : 'Dispatched for local delivery'
      },
      {
        id: isPickup ? 'ready_for_pickup' : 'shipped',
        label: isPickup ? 'Ready for Pickup' : 'Out for Delivery',
        desc: isPickup ? 'Ready for collection at Main Road shop' : 'Delivery boy en-route to your village/locality'
      },
      {
        id: 'delivered',
        label: isPickup ? 'Collected / Delivered' : 'Delivered',
        desc: 'Handover complete and receipt issued'
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
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200 text-xs font-bold">
            <PackageCheck className="w-4 h-4 text-brand-700" />
            <span>Pachrukhi Store Order Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
            Track My Order Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your order reference number (e.g. <strong>SPSB-2026-8492</strong>) or registered 10-digit mobile number to view live progress.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-md">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order Number or Mobile Number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Search Result Tracking Card */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg space-y-8 animate-in fade-in duration-200">
            
            {/* Top Order Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Tracking Reference
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy font-heading">
                  Order #{searchedOrder.orderNumber}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                  <span>Placed on: {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>Customer: <strong className="text-slate-800">{searchedOrder.customer.fullName}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  searchedOrder.status === 'delivered' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : searchedOrder.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  Status: {searchedOrder.status.replace(/_/g, ' ')}
                </span>
                <div className="text-xs text-slate-500 mt-1">
                  Fulfilment: <strong>{searchedOrder.fulfilmentType === 'store_pickup' ? 'Store Pickup' : 'Local Delivery'}</strong>
                </div>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-6">
                Live Fulfilment Progress
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
                        {/* Connecting bar */}
                        {idx < 4 && (
                          <div 
                            className={`absolute top-4 left-1/2 w-full h-1 z-0 transition-colors ${
                              idx < currentIndex ? 'bg-emerald-500' : 'bg-slate-200'
                            }`} 
                          />
                        )}

                        {/* Step circle */}
                        <div className={`relative z-10 w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-xs'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div className="mt-2.5">
                          <div className={`text-xs font-bold ${isCurrent ? 'text-brand-900 font-extrabold' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step.label}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight max-w-[130px] mx-auto">
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
                          isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isCurrent ? 'text-brand-900' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </div>
                          <div className="text-[11px] text-slate-500">{step.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fulfilment & Pickup Notes */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-navy uppercase tracking-wider text-[10px] block mb-1">
                  Collection / Destination
                </span>
                {searchedOrder.fulfilmentType === 'store_pickup' ? (
                  <div className="space-y-1 text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Building2 className="w-4 h-4 text-brand-700" />
                      <span>Sarswati Pustak Main Road Shop</span>
                    </div>
                    <div className="text-slate-500">{settings.addressFull}</div>
                    <div className="text-emerald-700 font-semibold text-[11px]">Store Hours: {settings.businessHours}</div>
                  </div>
                ) : (
                  <div className="space-y-0.5 text-slate-700">
                    <div className="font-semibold text-slate-900">{searchedOrder.customer.addressLine1}</div>
                    <div>{searchedOrder.customer.villageOrLocality}, {searchedOrder.customer.townOrCity}</div>
                    <div>District: {searchedOrder.customer.district} - PIN {searchedOrder.customer.pinCode}</div>
                  </div>
                )}
              </div>

              <div>
                <span className="font-bold text-navy uppercase tracking-wider text-[10px] block mb-1">
                  Payment Summary
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>
                    Method: <strong className="uppercase">{searchedOrder.paymentMethod.replace(/_/g, ' ')}</strong>
                  </div>
                  <div>
                    Status: <span className={`font-bold uppercase ${searchedOrder.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-800'}`}>
                      {searchedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="font-extrabold text-navy text-sm pt-1">
                    Total Amount: {formatINR(searchedOrder.totalAmount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Items In This Order ({searchedOrder.items.length})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
                {searchedOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-white hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-slate-400 text-[10px]">SKU: {item.sku} • Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <span className="font-bold text-navy">{formatINR(item.price * item.quantity)}</span>
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
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Update on WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.phonePrimary}`}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-700" />
                <span>Call Store: {settings.phonePrimary}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
