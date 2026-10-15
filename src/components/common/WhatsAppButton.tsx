import React, { useState } from 'react';
import { StoreSettings } from '../../types';
import { MessageCircle, Phone, FileSpreadsheet, X, Sparkles } from 'lucide-react';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';

interface WhatsAppButtonProps {
  settings: StoreSettings;
  onOpenBooklist: () => void;
  onOpenEnquiry: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  settings,
  onOpenBooklist,
  onOpenEnquiry
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold font-heading">Sarswati Pustak Helpdesk</div>
                  <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span>Store Open: 9 AM - 9 PM</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-emerald-50 mt-2 leading-relaxed">
              Namaste! Need to check book stock or order for your school in Pachrukhi? How can we help?
            </p>
          </div>

          <div className="p-3 space-y-1.5 bg-slate-50 text-xs">
            <a
              href={getWhatsAppGeneralUrl(settings, "Namaste, I want to check availability for academic books.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl text-slate-800 hover:text-emerald-800 font-medium transition-colors shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Check Book / Item Availability</span>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooklist();
              }}
              className="w-full text-left flex items-center gap-2.5 p-2.5 bg-white hover:bg-amber-50 border border-slate-200 rounded-xl text-slate-800 hover:text-amber-900 font-medium transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600 shrink-0" />
              <span>School Booklist Quotation</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenEnquiry();
              }}
              className="w-full text-left flex items-center gap-2.5 p-2.5 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl text-slate-800 hover:text-blue-900 font-medium transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Bulk School / Sports Enquiry</span>
            </button>

            <a
              href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-medium transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Call Shop: {settings.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp Store Support"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-400/30 group"
      >
        <MessageCircle className="w-6 h-6 fill-white/20" />
        <span className="hidden sm:inline text-xs tracking-wide">WhatsApp Us</span>
      </button>
    </div>
  );
};
