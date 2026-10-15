import React, { useState } from 'react';
import { CustomerEnquiry, StoreSettings } from '../../types';
import { StorageService } from '../../services/storage';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { X, Building, MessageCircle, CheckCircle2, Phone, Calendar, Package } from 'lucide-react';

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

  const [type, setType] = useState<CustomerEnquiry['type']>('bulk_school');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy to-brand-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-heading">
                Institutional &amp; Bulk Supply Enquiry
              </h3>
              <p className="text-xs text-slate-300">
                Schools, Coaching Centers, Clubs &amp; Sports Day Tournaments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-extrabold text-navy font-heading">
                Bulk Enquiry Received!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. The store manager at Sarswati Pustak will review your requirements for {organization || 'your organization'} and reach out with wholesale pricing.
              </p>

              <div className="pt-3 max-w-xs mx-auto space-y-2">
                <a
                  href={getWhatsAppGeneralUrl(settings, `Namaste, I submitted a bulk enquiry for: ${organization || name}. Phone: ${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Follow up on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enquiry Category
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'bulk_school', label: 'School Supplies' },
                    { id: 'coaching_supplies', label: 'Coaching Notes & Tests' },
                    { id: 'sports_team', label: 'Sports Tournament / Kit' },
                    { id: 'general', label: 'Office & Business Bulk' }
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setType(cat.id as any)}
                      className={`p-2.5 text-left rounded-xl border font-semibold transition-all ${
                        type === cat.id
                          ? 'border-brand-600 bg-brand-50 text-brand-950 ring-1 ring-brand-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Principal / Coordinator"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9835012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  School / Coaching / Club Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Siwan Coaching Center / Village Cricket Team"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Approx Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={quantityNeeded}
                    onChange={(e) => setQuantityNeeded(parseInt(e.target.value) || 1)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Needed By Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Details of items required
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify titles, registers, notebooks, sports balls, or certificates needed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
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
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  Submit Bulk Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
