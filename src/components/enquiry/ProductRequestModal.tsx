import React, { useState } from 'react';
import { CustomerEnquiry, StoreSettings } from '../../types';
import { StorageService } from '../../services/storage';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { X, SearchCheck, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ProductRequestModalProps {
  isOpen: boolean;
  initialQuery?: string;
  settings: StoreSettings;
  onClose: () => void;
}

export const ProductRequestModal: React.FC<ProductRequestModalProps> = ({
  isOpen,
  initialQuery = '',
  settings,
  onClose
}) => {
  if (!isOpen) return null;

  const [bookTitle, setBookTitle] = useState(initialQuery);
  const [authorPublisher, setAuthorPublisher] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !customerName.trim() || !phone.trim()) return;

    const newEnquiry: CustomerEnquiry = {
      id: `req-${Date.now()}`,
      type: 'product_request',
      name: customerName,
      phone,
      subject: `Product Request: ${bookTitle}`,
      productRequested: bookTitle,
      message: `Customer requested unlisted item: ${bookTitle}. Author/Publisher: ${authorPublisher || 'Not specified'}.`,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    StorageService.createEnquiry(newEnquiry);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-brand-900 to-navy text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-heading">
                Can't Find a Book or Product?
              </h3>
              <p className="text-xs text-brand-200">
                We'll source it for you from Patna / Varanasi distributors!
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Request Recorded!</h4>
              <p className="text-xs text-slate-500">
                We have registered your request for <strong>"{bookTitle}"</strong>. We will check with our publishing distributors and contact you via call or WhatsApp.
              </p>

              <div className="pt-2">
                <a
                  href={getWhatsAppGeneralUrl(settings, `Namaste, I submitted a request for book/item: ${bookTitle}. Phone: ${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask Store on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Book Title / Stationery / Sports Item *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BPSC TRE Hindi Practice Set / Class 11 Biology Guide"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Author, Publisher, or Brand (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kiran Publications / R.S. Aggarwal / Cosco"
                  value={authorPublisher}
                  onChange={(e) => setAuthorPublisher(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9835012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-xs"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
