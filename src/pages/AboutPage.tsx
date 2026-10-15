import React from 'react';
import { StoreSettings } from '../types';
import { 
  Award, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Users, 
  HeartHandshake 
} from 'lucide-react';

interface AboutPageProps {
  settings: StoreSettings;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  onNavigate,
  onOpenBooklist
}) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Editorial Hero */}
        <div className="bg-gradient-to-br from-navy via-brand-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15">
              <Award className="w-4 h-4" />
              <span>Serving Pachrukhi, Siwan Since 1990</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              A Dependable Destination for Learning, Creativity &amp; Sports.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded over 35 years ago in Pachrukhi, Bihar, Sarswati Pustak and Sports Bhandar has been the proud learning partner for generations of students, schools, teachers, and athletes across Siwan district.
            </p>
          </div>
        </div>

        {/* The Story & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-navy font-heading">
              Our Journey in Pachrukhi
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                In 1990, Sarswati Pustak and Sports Bhandar was opened with a clear, singular vision: to make quality academic textbooks, genuine school stationery, and sports equipment easily accessible to families and students in Pachrukhi without having to travel long distances.
              </p>
              <p>
                Over the past 35+ years, education in Bihar has evolved, syllabuses have updated from state board publications to modern NCERT and CBSE curriculums, but our commitment to honest retail, fair MRP pricing, and personal customer service has remained constant.
              </p>
              <p>
                Today, our digital storefront empowers local students and parents to check textbook stock online, request school booklist quotations, and reserve cricket or sports equipment before visiting our Main Road counter.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-navy font-heading">
              What We Stand For
            </h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">100% Genuine Publications</h4>
                  <p className="text-slate-500 mt-0.5">
                    We stock only official NCERT textbooks, BSTBPC Bihar government editions, and authorized reference publishers. No pirated or incomplete copies.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-800 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Honest Local Guidance</h4>
                  <p className="text-slate-500 mt-0.5">
                    We personally help parents match booklists with their school's current syllabus, preventing duplicate or incorrect book purchases.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Complete Sports Gear</h4>
                  <p className="text-slate-500 mt-0.5">
                    From gully cricket Kashmir willow bats and Cosco balls to school sports day tug-of-war ropes, carrom boards, and footballs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Storefront Showcase with Real Store Photo */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            {/* Real Storefront Photograph */}
            <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] bg-slate-900 overflow-hidden">
              <img
                src="/images/storefront.jpg"
                alt="Sarswati Pustak Evam Sports Bhandar Main Road Pachrukhi Storefront"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-navy/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Pachrukhi, Siwan (841241)</span>
              </div>
            </div>

            {/* Storefront Details & Map CTA */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Our Physical Retail Counter Since 1990</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy font-heading">
                  सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार
                </h3>
                <p className="text-xs text-brand-700 font-semibold mt-0.5">
                  Sarswati Pustak &amp; Sports Bhandar — Pachrukhi Counter
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Located on Main Road in Pachrukhi (Siwan district), our retail counter is stocked daily with official NCERT and Bihar Board textbooks, registers, Classmate notebooks, school bags, and sports equipment.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={settings.googleMapsUrl || "https://share.google/tNanVAFslmQSrY6mj"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Open on Google Maps</span>
                </a>

                <a
                  href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-700" />
                  <span>Call {settings.phonePrimary}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Store Credentials Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="space-y-1 sm:pr-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Store Location</div>
              <div className="text-sm font-extrabold text-navy font-heading">{settings.addressFull}</div>
              <a 
                href={settings.googleMapsUrl || "https://share.google/tNanVAFslmQSrY6mj"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-brand-700 font-bold hover:underline mt-1"
              >
                <span>View Google Maps location</span>
                <span>→</span>
              </a>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0 sm:px-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Business Hours</div>
              <div className="text-sm font-extrabold text-navy font-heading">{settings.businessHours}</div>
              <div className="text-xs text-slate-500">Open 7 days a week</div>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0 sm:pl-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Phone &amp; WhatsApp</div>
              <div className="text-sm font-extrabold text-navy font-heading">{settings.phonePrimary}</div>
              <div className="text-xs text-slate-500">{settings.phoneSecondary}</div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-3 pt-4">
          <h3 className="text-lg font-bold text-navy font-heading">
            Need Books for the New Academic Session?
          </h3>
          <div className="flex justify-center gap-3">
            <button
              onClick={onOpenBooklist}
              className="bg-accent-orange hover:bg-accent-orange-dark text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Get Your School Booklist Ready
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Shop All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
