import React, { useState } from 'react';
import { StoreSettings, CustomerEnquiry } from '../types';
import { StorageService } from '../services/storage';
import { getWhatsAppGeneralUrl } from '../utils/helpers';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Mail, 
  Navigation, 
  CheckCircle2, 
  Building2,
  Send
} from 'lucide-react';

interface ContactPageProps {
  settings: StoreSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
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
      subject: subject || 'General Store Message',
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
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Hero Banner with Storefront Image Background (Matching User Mockup) */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 min-h-[360px] sm:min-h-[420px] flex items-center justify-center text-center p-6 sm:p-12">
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
              <span>VISIT OUR STORE IN PACHRUKHI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
              Get in Touch
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto">
              Visit Sarswati Pustak &amp; Sports Bhandar or reach out to us for book inquiries, stationery orders, and sports equipment.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Open Google Maps</span>
              </a>

              <a
                href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information & Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address & Maps */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-accent-orange flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy font-heading">
                Store Address
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Sarswati Pustak &amp; Sports Bhandar</strong><br />
                {settings.addressFull}
              </p>
              <div className="text-xs font-mono font-semibold bg-slate-50 p-2 rounded-xl border border-slate-200 text-slate-700">
                Plus Code: {settings.plusCode}
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy font-heading">
                Phone &amp; WhatsApp
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Shop Line</span>
                  <a href={`tel:${settings.phonePrimary}`} className="text-sm font-bold text-navy hover:underline">
                    {settings.phonePrimary}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Secondary Line</span>
                  <a href={`tel:${settings.phoneSecondary}`} className="text-sm font-bold text-navy hover:underline">
                    {settings.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppGeneralUrl(settings, "Namaste Sarswati Pustak, I am inquiring about store items.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Card 3: Store Hours */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-navy font-heading">
                Operating Hours
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Monday – Sunday:</span>
                  <span>9:00 AM – 9:00 PM</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-xl border border-emerald-200 mt-2">
                  ✓ Open daily including Sundays for student booklist preparation and sports equipment.
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Pachrukhi Railway Station: ~500 meters
            </div>
          </div>
        </div>

        {/* Message Enquiry Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-2xl mx-auto">
          <div className="pb-4 border-b border-slate-100 mb-5">
            <h3 className="font-extrabold text-base sm:text-lg text-navy font-heading">
              Send an Enquiry to Shop Owner
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Have a question about textbook editions, wholesale school supplies, or tournament bat availability?
            </p>
          </div>

          {isSent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy text-sm">Message Recorded!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your message has been delivered to the Sarswati Pustak store administration. We will reply via phone or WhatsApp shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs text-brand-800 font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Prakash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Class 10 NCERT books set / Cricket tournament gear"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your query or list of items here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Store</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
