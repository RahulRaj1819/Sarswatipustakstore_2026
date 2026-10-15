import React from 'react';
import { StoreSettings } from '../../types';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  Navigation
} from 'lucide-react';

interface LocalTrustSectionProps {
  settings: StoreSettings;
  onOpenBooklist: () => void;
  onNavigate: (page: string) => void;
}

export const LocalTrustSection: React.FC<LocalTrustSectionProps> = ({
  settings,
  onOpenBooklist,
  onNavigate
}) => {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Authentic local advantages */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
                Why Pachrukhi Trusts Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight mt-1">
                Local Care, Dependable Quality &amp; Genuine Guidance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                We are not an anonymous online marketplace. For over three decades, Sarswati Pustak and Sports Bhandar has been the trusted destination for generations of students, teachers, parents, and sportsmen in Pachrukhi and greater Siwan district.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm mb-1">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Trusted Since 1990</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Over 35 years of serving the community with honesty, fair MRP pricing, and authentic study materials.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Stock Check Before Visiting</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Avoid extra travel! Drop a message on WhatsApp or call our shop to ensure textbooks or sports equipment are kept ready.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm mb-1">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Open Daily: 9 AM – 9 PM</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Open 7 days a week for morning school emergencies, coaching class note purchases, and evening sports gear.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm mb-1">
                  <HelpCircle className="w-5 h-5 text-brand-700 shrink-0" />
                  <span>Personal Booklist Care</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Bring or submit your school booklist. We organize each book, check for latest syllabus updates, and pack it neatly.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenBooklist}
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Order Your School Booklist
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Get Directions to Shop
              </button>
            </div>
          </div>

          {/* Right: Location & Business Details Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4">
              
              {/* Authentic Storefront Photo Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-sm border border-slate-200 group">
                <img
                  src="/images/storefront.jpg"
                  alt="Sarswati Pustak & Sports Bhandar Retail Counter Pachrukhi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pachrukhi, Siwan Counter</span>
                  </span>
                  <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Est. 1990
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-navy font-heading">
                    Store Location &amp; Hours
                  </h3>
                  <p className="text-xs text-slate-500">Visit our physical shop in Pachrukhi</p>
                </div>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Open Today
                </span>
              </div>

              {/* Address details */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Sarswati Pustak and Sports Bhandar</span>
                    <span className="text-slate-600 block mt-0.5">{settings.addressFull}</span>
                    <span className="inline-block mt-1 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                      Plus Code: {settings.plusCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Timing: </span>
                    <span className="text-slate-600">{settings.businessHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Phone: </span>
                    <a href={`tel:${settings.phonePrimary}`} className="text-brand-800 font-bold hover:underline">
                      {settings.phonePrimary}
                    </a>
                    <span className="text-slate-400 mx-1">/</span>
                    <a href={`tel:${settings.phoneSecondary}`} className="text-brand-800 font-bold hover:underline">
                      {settings.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Action Button & Directions */}
              <div className="pt-2 space-y-2">
                <a
                  href={settings.googleMapsUrl || "https://share.google/tNanVAFslmQSrY6mj"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Open in Google Maps (Pachrukhi)</span>
                </a>

                <a
                  href={getWhatsAppGeneralUrl(settings, "Namaste, can you guide me with directions to your Pachrukhi shop?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask Directions on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
