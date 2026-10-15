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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-navy to-slate-900 text-white py-12 lg:py-20 border-b border-brand-900">
      
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-brand-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Serving Pachrukhi &amp; Siwan Since 1990</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300 font-bold">35+ Years Trust</span>
            </div>

            {/* Main Headline from Spec */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-[1.15]">
              Everything You Need to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-amber-200 to-orange-400">
                Learn, Create &amp; Play.
              </span>
            </h1>

            {/* Supporting Text from Spec */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover academic books, everyday stationery, school essentials, and sports equipment at <strong className="text-white font-semibold">Sarswati Pustak and Sports Bhandar</strong>, Pachrukhi (Siwan, Bihar).
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-accent-orange hover:bg-accent-orange-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooklist}
                className="bg-white/15 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/25 backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                <span>Get School Booklist Ready</span>
              </button>

              <a
                href={getWhatsAppGeneralUrl(settings, "Namaste Sarswati Pustak, I want to enquire about books/stationery availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-emerald-400/30 flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Quick Micro-Advantages */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Books</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Store Pickup Available</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Ordering</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Check Stock First</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Books & Sports Badge */}
          <div className="lg:col-span-5 relative">
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
                <div className="absolute bottom-4 left-4 right-4 text-left p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>NCERT &amp; Bihar Board Syllabus Set</span>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">
                      Class 1–12 Textbooks • Practice Notebooks • Pro Sports
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-amber-300 bg-amber-950/80 px-2 py-1 rounded-lg border border-amber-600/50">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Floating Sports Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white text-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-navy">Sports Equipment</div>
                  <div className="text-[10px] text-slate-500">Cricket Bats, Footballs &amp; Carrom</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">SG • Nivia • Yonex • Cosco</div>
                </div>
              </div>

              {/* Floating Verified Store Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-navy text-white px-3.5 py-2 rounded-2xl shadow-xl border border-brand-500/40 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold">Pachrukhi PIN 841241</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
