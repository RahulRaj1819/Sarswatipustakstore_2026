import React from 'react';
import { StoreSettings } from '../../types';
import { getWhatsAppGeneralUrl } from '../../utils/helpers';
import { 
  ArrowRight, 
  MessageCircle, 
  Award, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeroBannerProps {
  settings: StoreSettings;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  onNavigate,
  onOpenBooklist
}) => {
  const { t, language } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-navy to-slate-900 text-white py-10 sm:py-14 lg:py-20 border-b border-brand-900">
      
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-brand-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-[1.2] sm:leading-[1.15]">
              {t('hero.title1')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-amber-200 to-orange-400">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('hero.sub')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-accent-orange hover:bg-accent-orange-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('hero.cta.shop')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooklist}
                className="bg-white/15 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/25 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                <span>{t('hero.cta.booklist')}</span>
              </button>

              <a
                href={getWhatsAppGeneralUrl(settings, "Namaste Sarswati Pustak, I want to enquire about books/stationery availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-emerald-400/30 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('hero.cta.whatsapp')}</span>
              </a>
            </div>

            {/* Quick Micro-Advantages */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 border-t border-white/10 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.feat.genuine')}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.feat.pickup')}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.feat.discount')}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.feat.guidance')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Books & Sports Badge */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Collage Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-800 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Academic Books, Stationery, and Sports Gear at Sarswati Pustak Bhandar"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
                
                {/* Overlay Caption */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-left p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span className="line-clamp-1">{language === 'hi' ? 'NCERT और बिहार बोर्ड पाठ्यक्रम' : 'NCERT & Bihar Board Syllabus Set'}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                      {language === 'hi' ? 'कक्षा 1–12 पुस्तकें • कॉपियां • खेल सामग्री' : 'Class 1–12 Textbooks • Practice Notebooks • Pro Sports'}
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-amber-300 bg-amber-950/80 px-2 py-1 rounded-lg border border-amber-600/50 shrink-0">
                    {t('prod.inStock')}
                  </span>
                </div>
              </div>

              {/* Floating Sports Card */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-700 flex items-center gap-2.5 sm:gap-3 animate-in fade-in slide-in-from-left duration-500">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-navy dark:text-amber-300">{t('nav.sports')}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Cricket, Football, Badminton</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">SG • Nivia • Yonex • Cosco</div>
                </div>
              </div>

              {/* Floating Verified Store Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-navy dark:bg-slate-900 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-xl border border-brand-500/40 flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold">Pachrukhi (Siwan)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
