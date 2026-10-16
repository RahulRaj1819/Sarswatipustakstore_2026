import React, { useState } from 'react';
import { StoreSettings, CustomerEnquiry } from '../types';
import { StorageService } from '../services/storage';
import { getWhatsAppGeneralUrl } from '../utils/helpers';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  Building2,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactPageProps {
  settings: StoreSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const { language } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const newEnquiry: CustomerEnquiry = {
      id: `cnt-${Date.now()}`,
      type: 'general',
      name,
      phone,
      subject: subject || (language === 'hi' ? 'सामान्य स्टोर संदेश' : 'General Store Message'),
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    StorageService.createEnquiry(newEnquiry);
    setIsSent(true);
    setName('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const mapUrl = settings.googleMapsUrl || 'https://share.google/tNanVAFslmQSrY6mj';

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-6 sm:py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Hero Banner with Storefront Image Background */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 min-h-[340px] sm:min-h-[400px] flex items-center justify-center text-center p-6 sm:p-12">
          {/* Real Storefront Photograph */}
          <img
            src="/images/storefront.jpg"
            alt="Sarswati Pustak & Sports Bhandar Storefront in Pachrukhi"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          {/* Rich Dark Gradient & Glass Vignette */}
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/75" />

          {/* Central Hero Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-4 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-md">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'पचरुखी में हमारी दुकान पर पधारें' : 'VISIT OUR STORE IN PACHRUKHI'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
              {language === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto">
              {language === 'hi'
                ? 'किताबों, स्टेशनरी ऑर्डर या खेलकूद सामग्री की जानकारी के लिए सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार से संपर्क करें या सीधे दुकान पर आएं।'
                : 'Visit Sarswati Pustak & Sports Bhandar or reach out to us for book inquiries, stationery orders, and sports equipment.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                <span>{language === 'hi' ? 'गूगल मैप्स खोलें' : 'Open Google Maps'}</span>
              </a>

              <a
                href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{language === 'hi' ? 'स्टोर पर कॉल करें' : 'Call Store'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information & Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address & Maps */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-accent-orange flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy dark:text-white font-heading">
                {language === 'hi' ? 'दुकान का पता' : 'Store Address'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-navy dark:text-white">{language === 'hi' ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार' : 'Sarswati Pustak & Sports Bhandar'}</strong><br />
                {settings.addressFull}
              </p>
              <div className="text-xs font-mono font-semibold bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                Plus Code: {settings.plusCode}
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-slate-900 dark:bg-brand-700 hover:bg-slate-800 dark:hover:bg-brand-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'गूगल मैप्स में खोलें' : 'Open in Google Maps'}</span>
            </a>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy dark:text-white font-heading">
                {language === 'hi' ? 'फोन एवं व्हाट्सएप' : 'Phone & WhatsApp'}
              </h3>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">
                    {language === 'hi' ? 'मुख्य दुकान नंबर' : 'Primary Shop Line'}
                  </span>
                  <a href={`tel:${settings.phonePrimary}`} className="text-sm font-bold text-navy dark:text-white hover:underline">
                    {settings.phonePrimary}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">
                    {language === 'hi' ? 'अतिरिक्त नंबर' : 'Secondary Line'}
                  </span>
                  <a href={`tel:${settings.phoneSecondary}`} className="text-sm font-bold text-navy dark:text-white hover:underline">
                    {settings.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppGeneralUrl(settings, language === 'hi' ? "नमस्ते सरस्वती पुस्तक भण्डार, मुझे दुकान के सामान के बारे में जानकारी चाहिए।" : "Namaste Sarswati Pustak, I am inquiring about store items.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर सीधा संदेश' : 'Direct WhatsApp Chat'}</span>
            </a>
          </div>

          {/* Card 3: Store Hours */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-brand-700 dark:text-blue-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy dark:text-white font-heading">
                {language === 'hi' ? 'खुलने का समय' : 'Operating Hours'}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100">
                  <span>{language === 'hi' ? 'सोमवार – रविवार:' : 'Monday – Sunday:'}</span>
                  <span>9:00 AM – 9:00 PM</span>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800 mt-2">
                  {language === 'hi' 
                    ? '✓ विद्यार्थियों की बुकलिस्ट तैयारी और खेलकूद उपकरण के लिए रविवार सहित प्रतिदिन खुला।' 
                    : '✓ Open daily including Sundays for student booklist preparation and sports equipment.'}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              {language === 'hi' ? 'पचरुखी रेलवे स्टेशन से दूरी: ~500 मीटर' : 'Pachrukhi Railway Station: ~500 meters'}
            </div>
          </div>
        </div>

        {/* Message Enquiry Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-2xl mx-auto transition-colors">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <h3 className="font-extrabold text-base sm:text-lg text-navy dark:text-white font-heading">
              {language === 'hi' ? 'दुकान संचालक को संदेश भेजें' : 'Send an Enquiry to Shop Owner'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'hi'
                ? 'किताब के संस्करण, थोक स्कूल सामग्री या टूर्नामेंट बैट की उपलब्धता के बारे में कोई प्रश्न है?'
                : 'Have a question about textbook editions, wholesale school supplies, or tournament bat availability?'}
            </p>
          </div>

          {isSent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy dark:text-white text-sm">
                {language === 'hi' ? 'संदेश सफलतापूर्वक दर्ज हुआ!' : 'Message Recorded!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {language === 'hi'
                  ? 'आपका संदेश सरस्वती पुस्तक स्टोर संचालक को भेज दिया गया है। हम जल्द ही फोन या व्हाट्सएप द्वारा संपर्क करेंगे।'
                  : 'Your message has been delivered to the Sarswati Pustak store administration. We will reply via phone or WhatsApp shortly.'}
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs text-brand-800 dark:text-amber-400 font-bold underline cursor-pointer"
              >
                {language === 'hi' ? 'एक और संदेश भेजें' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'उदा. आनंद प्रकाश' : 'e.g. Anand Prakash'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Mobile / WhatsApp Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={language === 'hi' ? 'उदा. 9835012345' : 'e.g. 9835012345'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'विषय' : 'Subject'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. कक्षा 10 NCERT बुक्स सेट / क्रिकेट टूर्नामेंट किट' : 'e.g. Class 10 NCERT books set / Cricket tournament gear'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'hi' ? 'संदेश *' : 'Message *'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={language === 'hi' ? 'अपना प्रश्न या किताबों की सूची यहाँ लिखें...' : 'Write your query or list of items here...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-brand-900 dark:bg-brand-700 hover:bg-brand-800 dark:hover:bg-brand-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'स्टोर को संदेश भेजें' : 'Send Message to Store'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
