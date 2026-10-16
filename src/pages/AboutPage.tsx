import React from 'react';
import { StoreSettings } from '../types';
import { 
  Award, 
  Trophy, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  HeartHandshake 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

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
  const { language } = useApp();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* Editorial Hero */}
        <div className="bg-gradient-to-br from-navy via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15">
              <Award className="w-4 h-4" />
              <span>{language === 'hi' ? '1990 से पचरुखी, सीवान की विश्वसनीय सेवा में' : 'Serving Pachrukhi, Siwan Since 1990'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {language === 'hi' ? 'शिक्षा, रचनात्मकता एवं खेलकूद का सबसे विश्वसनीय प्रतिष्ठान।' : 'A Dependable Destination for Learning, Creativity & Sports.'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'पचरुखी (सीवान, बिहार) में 35 से अधिक वर्षों पूर्व स्थापित, सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार सीवान जिले भर के विद्यार्थियों, विद्यालयों, शिक्षकों और खिलाड़ियों का गौरवशाली अध्ययन व खेल साथी रहा है।'
                : 'Founded over 35 years ago in Pachrukhi, Bihar, Sarswati Pustak and Sports Bhandar has been the proud learning partner for generations of students, schools, teachers, and athletes across Siwan district.'}
            </p>
          </div>
        </div>

        {/* The Story & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h2 className="text-lg sm:text-xl font-extrabold text-navy dark:text-white font-heading">
              {language === 'hi' ? 'पचरुखी में हमारी विकास यात्रा' : 'Our Journey in Pachrukhi'}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {language === 'hi'
                  ? 'वर्ष 1990 में, सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार की स्थापना एक स्पष्ट और दृढ़ संकल्प के साथ हुई थी: पचरुखी और आस-पास के परिवारों व छात्रों को बिना दूर की यात्रा किए गुणवत्तापूर्ण पाठ्यपुस्तकें, प्रामाणिक स्टेशनरी और खेल सामग्री आसानी से उपलब्ध कराना।'
                  : 'In 1990, Sarswati Pustak and Sports Bhandar was opened with a clear, singular vision: to make quality academic textbooks, genuine school stationery, and sports equipment easily accessible to families and students in Pachrukhi without having to travel long distances.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'विगत 35+ वर्षों में, बिहार में शिक्षा प्रणाली और पाठ्यक्रम राज्य बोर्ड से लेकर आधुनिक NCERT एवं CBSE तक विस्तृत हुए हैं, लेकिन ईमानदार व्यापार, सही सरकारी MRP मूल्य और आत्मीय ग्राहक सेवा के प्रति हमारा समर्पण सदैव अडिग रहा है।'
                  : 'Over the past 35+ years, education in Bihar has evolved, syllabuses have updated from state board publications to modern NCERT and CBSE curriculums, but our commitment to honest retail, fair MRP pricing, and personal customer service has remained constant.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'आज हमारा डिजिटल स्टोर स्थानीय विद्यार्थियों और अभिभावकों को घर बैठे पाठ्यपुस्तकों का स्टॉक जांचने, स्कूल बुकलिस्ट कोटेशन प्राप्त करने और मेन रोड स्थित हमारे काउंटर पर आने से पहले क्रिकेट या खेल उपकरण आरक्षित करने की सुविधा प्रदान करता है।'
                  : 'Today, our digital storefront empowers local students and parents to check textbook stock online, request school booklist quotations, and reserve cricket or sports equipment before visiting our Main Road counter.'}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <h2 className="text-lg sm:text-xl font-extrabold text-navy dark:text-white font-heading">
              {language === 'hi' ? 'हमारे मुख्य सिद्धांत' : 'What We Stand For'}
            </h2>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {language === 'hi' ? '100% प्रामाणिक प्रकाशन' : '100% Genuine Publications'}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {language === 'hi'
                      ? 'हम केवल आधिकारिक NCERT पाठ्यपुस्तकें, बिहार राज्य पाठ्यपुस्तक निगम (BSTBPC) संस्करण और अधिकृत संदर्भ प्रकाशकों की पुस्तकें रखते हैं। कोई नकली या अधूरी प्रतियां नहीं।'
                      : 'We stock only official NCERT textbooks, BSTBPC Bihar government editions, and authorized reference publishers. No pirated or incomplete copies.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-brand-800 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {language === 'hi' ? 'सच्चा स्थानीय मार्गदर्शन' : 'Honest Local Guidance'}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {language === 'hi'
                      ? 'हम अभिभावकों को उनके स्कूल के नवीनतम पाठ्यक्रम के अनुसार सही पुस्तकें चुनने में व्यक्तिगत मदद करते हैं, जिससे गलत या अनावश्यक खरीद से बचा जा सके।'
                      : 'We personally help parents match booklists with their school\'s current syllabus, preventing duplicate or incorrect book purchases.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {language === 'hi' ? 'संपूर्ण खेल व फिटनेस सामग्री' : 'Complete Sports Gear'}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {language === 'hi'
                      ? 'गली क्रिकेट के कश्मीर विलो बैट और कॉस्को बॉल से लेकर स्कूल खेल दिवस के रस्साकशी रस्सियां, कैरम बोर्ड और मैच फुटबॉल तक सब कुछ उपलब्ध।'
                      : 'From gully cricket Kashmir willow bats and Cosco balls to school sports day tug-of-war ropes, carrom boards, and footballs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Storefront Showcase with Real Store Photo */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-md transition-colors">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{language === 'hi' ? '1990 से हमारा भौतिक प्रतिष्ठान' : 'Our Physical Retail Counter Since 1990'}</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white font-heading">
                  {language === 'hi' ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार' : 'Sarswati Pustak & Sports Bhandar'}
                </h3>
                <p className="text-xs text-brand-700 dark:text-amber-400 font-semibold mt-0.5">
                  {language === 'hi' ? 'पचरुखी काउंटर — मेन रोड' : 'Pachrukhi Counter — Main Road'}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'hi'
                  ? 'पचरुखी (सीवान जिला) के मेन रोड पर स्थित हमारी दुकान में आधिकारिक NCERT व बिहार बोर्ड की किताबें, रजिस्टर्स, क्लासमेट कॉपियां, स्कूल बैग और खेल उपकरण प्रतिदिन उपलब्ध रहते हैं।'
                  : 'Located on Main Road in Pachrukhi (Siwan district), our retail counter is stocked daily with official NCERT and Bihar Board textbooks, registers, Classmate notebooks, school bags, and sports equipment.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={settings.googleMapsUrl || "https://share.google/tNanVAFslmQSrY6mj"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-brand-700 hover:bg-slate-800 dark:hover:bg-brand-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>{language === 'hi' ? 'गूगल मैप्स पर देखें' : 'Open on Google Maps'}</span>
                </a>

                <a
                  href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-slate-700 text-brand-900 dark:text-slate-100 border border-brand-200 dark:border-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-700 dark:text-amber-400" />
                  <span>{language === 'hi' ? `कॉल करें: ${settings.phonePrimary}` : `Call ${settings.phonePrimary}`}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Store Credentials Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
            <div className="space-y-1 sm:pr-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'दुकान का पता' : 'Store Location'}
              </div>
              <div className="text-sm font-extrabold text-navy dark:text-white font-heading">{settings.addressFull}</div>
              <a 
                href={settings.googleMapsUrl || "https://share.google/tNanVAFslmQSrY6mj"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-brand-700 dark:text-amber-400 font-bold hover:underline mt-1"
              >
                <span>{language === 'hi' ? 'गूगल मैप्स पर स्थान देखें' : 'View Google Maps location'}</span>
                <span>→</span>
              </a>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0 sm:px-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'खुलने का समय' : 'Business Hours'}
              </div>
              <div className="text-sm font-extrabold text-navy dark:text-white font-heading">{settings.businessHours}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'सप्ताह के सातों दिन खुला' : 'Open 7 days a week'}
              </div>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0 sm:pl-4">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'फोन एवं व्हाट्सएप' : 'Phone & WhatsApp'}
              </div>
              <div className="text-sm font-extrabold text-navy dark:text-white font-heading">{settings.phonePrimary}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{settings.phoneSecondary}</div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-3 pt-4">
          <h3 className="text-lg font-bold text-navy dark:text-white font-heading">
            {language === 'hi' ? 'नए शैक्षणिक सत्र के लिए पुस्तकें चाहिए?' : 'Need Books for the New Academic Session?'}
          </h3>
          <div className="flex justify-center gap-3">
            <button
              onClick={onOpenBooklist}
              className="bg-accent-orange hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'स्कूल बुकलिस्ट तैयार करवाएं' : 'Get Your School Booklist Ready'}
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-brand-900 dark:bg-brand-800 hover:bg-brand-800 dark:hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'सभी उत्पाद देखें' : 'Shop All Products'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
