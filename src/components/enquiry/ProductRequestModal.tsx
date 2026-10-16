import React, { useState } from 'react';
import { CustomerEnquiry, StoreSettings } from '../../types';
import { StorageService } from '../../services/storage';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { X, SearchCheck, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

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

  const { t, language } = useApp();
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0" aria-label="Close modal overlay" />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-900 via-navy to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base font-heading">
                {t('reqModal.title')}
              </h3>
              <p className="text-[11px] sm:text-xs text-brand-200 line-clamp-1">
                {t('reqModal.sub')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {t('reqModal.successTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                {t('reqModal.successDesc')}
              </p>

              <div className="pt-2">
                <a
                  href={getWhatsAppGeneralUrl(settings, `Namaste, I submitted a request for book/item: ${bookTitle}. Phone: ${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('reqModal.askWa')}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('reqModal.bookLabel')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('reqModal.bookPh')}
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('reqModal.authorLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('reqModal.authorPh')}
                  value={authorPublisher}
                  onChange={(e) => setAuthorPublisher(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('reqModal.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('reqModal.namePh')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('reqModal.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder={t('reqModal.phonePh')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {t('reqModal.cancel')}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-md active:scale-98 transition-all"
                >
                  {t('reqModal.submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
