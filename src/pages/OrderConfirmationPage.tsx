import React, { useEffect } from 'react';
import { Order, StoreSettings } from '../types';
import { formatINR, getWhatsAppOrderUrl } from '../utils/helpers';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageCircle, 
  Printer, 
  PackageCheck, 
  ArrowRight, 
  Building2, 
  Truck,
  Phone,
  ShieldCheck
} from 'lucide-react';

interface OrderConfirmationPageProps {
  order: Order | null;
  settings: StoreSettings;
  onNavigate: (page: string) => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  settings,
  onNavigate,
  onTrackOrder
}) => {
  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-slate-200">
          <h3 className="font-bold text-base text-navy">No recent order found</h3>
          <p className="text-xs text-slate-500 mt-2">Browse our products or check existing orders.</p>
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Success Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Successfully Received!
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading mt-2">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              Thank you, <strong>{order.customer.fullName}</strong>. Your order is registered in our local Pachrukhi store ledger.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={getWhatsAppOrderUrl(order, settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order Confirmation on WhatsApp</span>
            </a>

            <button
              onClick={() => onTrackOrder(order.orderNumber)}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Track Order Live</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Printable Invoice / Receipt Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 print:border-none print:shadow-none">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="font-extrabold text-lg text-navy font-heading">
                SARSWATI PUSTAK &amp; SPORTS BHANDAR
              </div>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>{settings.addressFull} (Plus Code: {settings.plusCode})</div>
                <div>Phone: {settings.phonePrimary} / {settings.phoneSecondary}</div>
                <div>Serving Pachrukhi, Siwan Since 1990</div>
              </div>
            </div>

            <div className="sm:text-right text-xs text-slate-600 space-y-1">
              <div><strong className="text-slate-900">Invoice:</strong> {order.orderNumber}</div>
              <div><strong className="text-slate-900">Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div><strong className="text-slate-900">Fulfilment:</strong> {order.fulfilmentType === 'store_pickup' ? 'Store Pickup (Pachrukhi)' : 'Local Delivery'}</div>
              <div>
                <strong className="text-slate-900">Payment: </strong>
                <span className="uppercase font-semibold text-brand-900">
                  {order.paymentMethod.replace(/_/g, ' ')} ({order.paymentStatus})
                </span>
              </div>
            </div>
          </div>

          {/* Customer Address Snapshot */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-navy uppercase tracking-wider text-[11px] mb-1">
                Billed / Delivered To
              </div>
              <div className="font-bold text-slate-900">{order.customer.fullName}</div>
              <div>{order.customer.addressLine1}</div>
              <div>{order.customer.villageOrLocality}, {order.customer.townOrCity}</div>
              <div>{order.customer.district}, {order.customer.state} - {order.customer.pinCode}</div>
            </div>

            <div>
              <div className="font-bold text-navy uppercase tracking-wider text-[11px] mb-1">
                Contact Information
              </div>
              <div>Phone: <span className="font-mono font-bold text-slate-900">{order.customer.phone}</span></div>
              {order.customer.altPhone && <div>Alt Phone: <span className="font-mono">{order.customer.altPhone}</span></div>}
              {order.customer.deliveryInstructions && (
                <div className="mt-1 text-slate-500 italic">
                  Note: "{order.customer.deliveryInstructions}"
                </div>
              )}
            </div>
          </div>

          {/* Ordered Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-medium text-slate-900">
                      <div>{item.productName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</div>
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right text-slate-600">{formatINR(item.price)}</td>
                    <td className="p-3 text-right font-bold text-navy">{formatINR(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="flex justify-end text-xs">
            <div className="w-64 space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">{formatINR(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span>- {formatINR(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-slate-800">
                  {order.deliveryCharge === 0 ? 'FREE' : formatINR(order.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-navy border-t border-slate-200 pt-2">
                <span>Total Amount:</span>
                <span>{formatINR(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
            Thank you for supporting your local retail bookstore and sports dealer in Pachrukhi. For any questions, please reach us on WhatsApp at <strong>{settings.whatsappNumber}</strong> or call <strong>{settings.phonePrimary}</strong>.
          </div>
        </div>

        {/* Continue Shopping button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-brand-800 hover:underline inline-flex items-center gap-1"
          >
            <span>← Back to Products &amp; Shop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
