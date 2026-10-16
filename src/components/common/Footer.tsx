import React from 'react';
import { StoreSettings, ProductCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Award,
  Sparkles,
  ArrowRight,
  MessageSquareHeart
} from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  onNavigate: (page: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenBooklist: () => void;
  onOpenFeedbackModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onSelectCategory,
  onOpenBooklist,
  onOpenFeedbackModal
}) => {
  const { language, t } = useApp();
  const mapUrl = settings.googleMapsUrl || 'https://share.google/tNanVAFslmQSrY6mj';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-10 pb-24 lg:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Concise Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">
              {language === 'hi' ? '1990 से विश्वसनीय (35+ वर्ष)' : 'Trusted Since 1990 (35+ Years)'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{language === 'hi' ? '100% असली NCERT एवं BSTBPC पुस्तकें' : '100% Genuine NCERT & BSTBPC Books'}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-brand-400 shrink-0" />
            <span>{settings.businessHours}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
            <span>Pachrukhi, Siwan (PIN 841241)</span>
          </div>
        </div>

        {/* Main Footer 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-8 border-b border-slate-800/80 text-xs">
          
          {/* Col 1: Brand & Pachrukhi Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex items-center justify-center text-white ring-2 ring-amber-500/50 group-hover:scale-105 transition-transform bg-slate-900 shrink-0">
                <img 
                  src="/favicon.png" 
                  alt="Sarswati Pustak & Sports Bhandar Emblem" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-extrabold text-base text-white font-heading tracking-tight block group-hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'सरस्वती पुस्तक' : 'SARSWATI PUSTAK'}
                </span>
                <span className="text-[11px] text-brand-300 font-medium tracking-wide">
                  {language === 'hi' ? 'एवं स्पोर्ट्स भण्डार • पचरुखी' : '& Sports Bhandar — Pachrukhi'}
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              {t('footer.tagline')}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-700 transition-all font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>{language === 'hi' ? 'गूगल मैप्स' : 'Google Maps'}</span>
              </a>

              <a
                href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition-all font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{settings.phonePrimary}</span>
              </a>

              {onOpenFeedbackModal && (
                <button
                  onClick={onOpenFeedbackModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-900/80 hover:bg-brand-900 text-amber-300 rounded-lg border border-brand-700/80 transition-all font-semibold cursor-pointer"
                >
                  <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'hi' ? 'सुझाव दें' : 'Give Feedback'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Top Categories (BPSC/SSC removed) (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-heading">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button 
                  onClick={() => { onSelectCategory('school-ncert'); onNavigate('shop'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('cat.ncert')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('bihar-board'); onNavigate('shop'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('cat.biharBoard')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('competitive-exams'); onNavigate('shop'); }}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300 font-semibold"
                >
                  {t('cat.competitive')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('stationery'); onNavigate('shop'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('cat.stationery')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sports')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{t('cat.sports')}</span>
                  <span className="text-[10px] bg-accent-orange text-white px-1.5 py-0.2 rounded font-bold uppercase">
                    {language === 'hi' ? '11 श्रेणियां' : '11 Cats'}
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectCategory('school-kits'); onNavigate('shop'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('cat.combos')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Store Help (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-heading">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  {t('nav.shop')}
                </button>
              </li>
              <li>
                <button onClick={onOpenBooklist} className="hover:text-white transition-colors cursor-pointer text-amber-300 font-medium">
                  {t('nav.booklist')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-white transition-colors cursor-pointer">
                  {t('nav.trackOrder')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Address & Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-heading">
              {t('footer.storeCounter')}
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="leading-snug">
                {settings.addressFull}
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline text-[11px]"
              >
                <span>{language === 'hi' ? 'गूगल मैप्स लोकेशन ↗' : 'Google Maps Location ↗'}</span>
              </a>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                {language === 'hi' ? 'पचरुखी रेलवे स्टेशन: ~500 मी.' : 'Pachrukhi Railway Station: ~500m'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Concise Legal & Credit Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 {settings.storeName}. {t('footer.allRights')}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={() => onNavigate('policy-shipping')} className="hover:text-white transition-colors">
              {t('footer.shipping')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policy-returns')} className="hover:text-white transition-colors">
              {t('footer.returns')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policy-privacy')} className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('policy-terms')} className="hover:text-white transition-colors">
              {t('footer.terms')}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">
              {t('nav.admin')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
