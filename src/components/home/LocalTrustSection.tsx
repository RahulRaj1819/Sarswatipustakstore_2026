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
import { useApp } from '../../context/AppContext';

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
  const { t, language } = useApp();

  return (
    <section className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Authentic local advantages */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
                {t('section.trust')}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight mt-1">
                {t('section.trustSub')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {language === 'hi'
                  ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार पिछले 35 से अधिक वर्षों से पचरुखी और पूरे सीवान जिले के विद्यार्थियों, शिक्षकों, अभिभावकों और खिलाड़ियों का सबसे भरोसेमंद केंद्र रहा है। यहाँ आपको 100% प्रामाणिक पुस्तकें व खेल सामग्री उचित मूल्य पर मिलती है।'
                  : 'We are not an anonymous online marketplace. For over three decades, Sarswati Pustak and Sports Bhandar has been the trusted destination for generations of students, teachers, parents, and sportsmen in Pachrukhi and greater Siwan district.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{language === 'hi' ? '1990 से विश्वसनीय सेवा' : 'Trusted Since 1990'}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' 
                    ? '35 से अधिक वर्षों से ईमानदारी, सही सरकारी MRP और प्रामाणिक अध्ययन सामग्री की गारंटी।' 
                    : 'Over 35 years of serving the community with honesty, fair MRP pricing, and authentic study materials.'}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{language === 'hi' ? 'आने से पहले स्टॉक पूछें' : 'Stock Check Before Visiting'}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' 
                    ? 'अनावश्यक भागदौड़ से बचें! फोन या व्हाट्सएप पर संपर्क कर किताब या खेल सामग्री पहले से तैयार रखवाएं।' 
                    : 'Avoid extra travel! Drop a message on WhatsApp or call our shop to ensure textbooks or sports equipment are kept ready.'}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>{t('store.openDaily')}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' 
                    ? 'सप्ताह के सातों दिन खुला। सुबह स्कूल की जल्दी हो या शाम को खेल का सामान, हम हमेशा तैयार हैं।' 
                    : 'Open 7 days a week for morning school emergencies, coaching class note purchases, and evening sports gear.'}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <HelpCircle className="w-5 h-5 text-brand-700 dark:text-amber-400 shrink-0" />
                  <span>{language === 'hi' ? 'स्कूल बुकलिस्ट सेवा' : 'Personal Booklist Care'}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' 
                    ? 'अपनी स्कूल बुकलिस्ट लाएं या फोटो भेजें। हम एक-एक किताब मिलाकर सुरक्षित पैक तैयार करते हैं।' 
                    : 'Bring or submit your school booklist. We organize each book, check for latest syllabus updates, and pack it neatly.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenBooklist}
                className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                {t('btn.orderBooklist')}
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer text-center"
              >
                {t('btn.getDirections')}
              </button>

              <a
                href={`tel:${settings.phonePrimary}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>{t('btn.callStore')}: {settings.phonePrimary}</span>
              </a>
            </div>
          </div>

          {/* Right: Map & Counter Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-slate-700 flex items-center justify-center text-brand-800 dark:text-amber-400 shadow-2xs shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-navy dark:text-white font-heading">
                    {t('store.addressTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('brand.name')} {t('brand.sub')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{settings.addressFull} (PIN {settings.pinCode})</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{settings.businessHours}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-brand-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{settings.phonePrimary} / {settings.phoneSecondary}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('btn.openMaps')}</span>
                </a>

                <a
                  href={getWhatsAppGeneralUrl(settings, "Namaste Sarswati Pustak, I am inquiring from your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t('btn.whatsapp')}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
