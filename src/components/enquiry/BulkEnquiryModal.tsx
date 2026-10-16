import React, { useState } from 'react';
import { CustomerEnquiry, StoreSettings } from '../../types';
import { StorageService } from '../../services/storage';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { X, Building, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BulkEnquiryModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onClose: () => void;
}

export const BulkEnquiryModal: React.FC<BulkEnquiryModalProps> = ({
  isOpen,
  settings,
  onClose
}) => {
  if (!isOpen) return null;

  const { t, language } = useApp();
  const [type, setType] = useState<CustomerEnquiry['type']>('bulk_school');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject] = useState('');
  const [message, setMessage] = useState('');
  const [quantityNeeded, setQuantityNeeded] = useState<number>(50);
  const [targetDate, setTargetDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newEnquiry: CustomerEnquiry = {
      id: `enq-${Date.now()}`,
      type,
      name,
      phone,
      organization,
      subject: subject || `${type.replace(/_/g, ' ')} enquiry`,
      message,
      quantityNeeded,
      targetDate,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    StorageService.createEnquiry(newEnquiry);
    setIsSubmitted(true);
  };

  const categories = [
    { id: 'bulk_school', label: language === 'hi' ? 'स्कूल पुस्तकें व सामग्री' : 'School Supplies' },
    { id: 'coaching_supplies', label: language === 'hi' ? 'कोचिंग नोट्स व टेस्ट' : 'Coaching Notes & Tests' },
    { id: 'sports_team', label: language === 'hi' ? 'खेल टूर्नामेंट / किट' : 'Sports Tournament / Kit' },
    { id: 'general', label: language === 'hi' ? 'कार्यालय व थोक स्टेशनरी' : 'Office & Business Bulk' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0" aria-label="Close overlay" />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-navy to-brand-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base font-heading">
                {language === 'hi' ? 'संस्थागत एवं थोक आपूर्ति पूछताछ' : 'Institutional & Bulk Supply Enquiry'}
              </h3>
              <p className="text-[11px] sm:text-xs text-brand-200 line-clamp-1">
                {language === 'hi' ? 'स्कूल, कोचिंग, खेल क्लब एवं टूर्नामेंट आयोजक' : 'Schools, Coaching Centers, Clubs & Tournaments'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-extrabold text-navy dark:text-white font-heading">
                {language === 'hi' ? 'थोक पूछताछ प्राप्त हुई!' : 'Bulk Enquiry Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                {language === 'hi'
                  ? `धन्यवाद, ${name}। सरस्वती पुस्तक स्टोर प्रबंधक आपकी आवश्यकताओं की समीक्षा कर थोक दरों के साथ संपर्क करेंगे।`
                  : `Thank you, ${name}. The store manager at Sarswati Pustak will review your requirements for ${organization || 'your organization'} and reach out with wholesale pricing.`}
              </p>

              <div className="pt-3 max-w-xs mx-auto space-y-2">
                <a
                  href={getWhatsAppGeneralUrl(settings, `Namaste, I submitted a bulk enquiry for: ${organization || name}. Phone: ${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Follow up on WhatsApp'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'पूछताछ की श्रेणी' : 'Enquiry Category'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setType(cat.id as any)}
                      className={`p-2.5 text-left rounded-xl border font-semibold transition-all cursor-pointer ${
                        type === cat.id
                          ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-950 dark:text-amber-300 ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'प्रिंसिपल / प्रबंधक' : 'Principal / Coordinator'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'फोन / मोबाइल *' : 'Phone / Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9835012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'स्कूल / कोचिंग / क्लब का नाम' : 'School / Coaching / Club Name'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. सीवान कोचिंग सेंटर / पचरुखी क्रिकेट क्लब' : 'e.g. Siwan Coaching Center / Village Cricket Team'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'अनुमानित मात्रा' : 'Approx Quantity'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={quantityNeeded}
                    onChange={(e) => setQuantityNeeded(parseInt(e.target.value) || 1)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'कब तक सामग्री चाहिए' : 'Needed By Date'}
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'आवश्यक सामग्री का विवरण' : 'Details of items required'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={language === 'hi' ? 'किताबों के नाम, कॉपियां, खेल सामग्री या परीक्षा सामग्री लिखें...' : 'Specify titles, registers, notebooks, sports balls, or certificates needed...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                >
                  {t('btn.cancel')}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-xs transition-colors active:scale-98"
                >
                  {language === 'hi' ? 'थोक अनुरोध भेजें' : 'Submit Bulk Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
