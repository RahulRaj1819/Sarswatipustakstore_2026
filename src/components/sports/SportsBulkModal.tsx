import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  MessageCircle, 
  CheckCircle, 
  Calendar, 
  IndianRupee, 
  MapPin, 
  Phone, 
  Building2, 
  User, 
  ClipboardCheck, 
  FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StoreSettings, SportsBulkEnquiry } from '../../types';
import { StorageService } from '../../services/storage';
import { useApp } from '../../context/AppContext';

interface SportsBulkModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onClose: () => void;
  onEnquirySubmitted?: () => void;
}

interface SportOption {
  id: string;
  en: string;
  hi: string;
}

const AVAILABLE_SPORTS: SportOption[] = [
  { id: 'Cricket', en: 'Cricket', hi: 'क्रिकेट (Cricket)' },
  { id: 'Football', en: 'Football', hi: 'फुटबॉल (Football)' },
  { id: 'Badminton', en: 'Badminton', hi: 'बैडमिंटन (Badminton)' },
  { id: 'Volleyball', en: 'Volleyball', hi: 'वॉलीबॉल (Volleyball)' },
  { id: 'Basketball', en: 'Basketball', hi: 'बास्केटबॉल (Basketball)' },
  { id: 'Table Tennis', en: 'Table Tennis', hi: 'टेबल टेनिस' },
  { id: 'Athletics & Track', en: 'Athletics & Track', hi: 'एथलेटिक्स व ट्रैक' },
  { id: 'Fitness & Gym', en: 'Fitness & Gym', hi: 'फिटनेस व जिम' },
  { id: 'Indoor Games (Carrom/Chess)', en: 'Indoor Games (Carrom/Chess)', hi: 'कैरम / शतरंज / लूडो' },
  { id: 'School Sports & PE Package', en: 'School Sports & PE Package', hi: 'स्कूल स्पोर्ट्स व पीटी पैकेज' },
  { id: 'Sportswear & Team Bibs', en: 'Sportswear & Team Bibs', hi: 'स्पोर्ट्सवियर व टीम बिब्स' }
];

export const SportsBulkModal: React.FC<SportsBulkModalProps> = ({
  isOpen,
  settings,
  onClose,
  onEnquirySubmitted
}) => {
  const { t, language } = useApp();
  const [institutionOrTeam, setInstitutionOrTeam] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>(['Cricket']);
  const [estimatedQuantities, setEstimatedQuantities] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('₹10,000 - ₹25,000');
  const [requiredByDate, setRequiredByDate] = useState('');
  const [addressOrLocation, setAddressOrLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdReference, setCreatedReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(s => s !== sportId)
        : [...prev, sportId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionOrTeam || !contactPerson || !phone || selectedSports.length === 0) {
      alert(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें और कम से कम एक खेल चुनें।' : 'Please fill out all required fields and select at least one sport.');
      return;
    }

    setIsSubmitting(true);
    const refNum = `SPSB-SP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newEnquiry: SportsBulkEnquiry = {
      id: `sp-enq-${Date.now()}`,
      referenceNumber: refNum,
      institutionOrTeam,
      contactPerson,
      phone,
      whatsapp: whatsapp || phone,
      sportsNeeded: selectedSports,
      estimatedQuantities: estimatedQuantities || 'Standard tournament / team assortment',
      estimatedBudget,
      requiredByDate: requiredByDate || 'Within 7-10 days',
      addressOrLocation: addressOrLocation || 'Pachrukhi / Siwan District',
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    StorageService.createSportsBulkEnquiry(newEnquiry);
    setCreatedReference(refNum);
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }

    if (onEnquirySubmitted) onEnquirySubmitted();
  };

  const getWhatsAppEnquiryUrl = () => {
    const text = `Namaste Sarswati Sports Bhandar,\n\nI need a bulk sports quotation for:\n🏆 Team/School: *${institutionOrTeam}*\n👤 Contact: ${contactPerson} (${phone})\n🎯 Sports: ${selectedSports.join(', ')}\n📦 Quantities/Items: ${estimatedQuantities}\n💰 Estimated Budget: ${estimatedBudget}\n📅 Required By: ${requiredByDate || 'ASAP'}\n📍 Location: ${addressOrLocation}\nReference: *${createdReference}*\n\nPlease share your best discounted institutional rates.`;
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div onClick={onClose} className="fixed inset-0" aria-label="Close overlay" />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-navy via-brand-900 to-brand-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold font-heading line-clamp-1">
                {t('sportsModal.title')}
              </h3>
              <p className="text-[11px] sm:text-xs text-brand-200 line-clamp-1">
                {t('sportsModal.sub')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              <div className="p-3.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-xl text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                <ClipboardCheck className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t('sportsModal.guaranteeTitle')}</span>{' '}
                  <span>{t('sportsModal.guaranteeDesc')}</span>
                </div>
              </div>

              {/* Institution / Team & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.teamLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder={t('sportsModal.teamPh')}
                      value={institutionOrTeam}
                      onChange={(e) => setInstitutionOrTeam(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.personLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder={t('sportsModal.personPh')}
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.phoneLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder={t('sportsModal.phonePh')}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white font-mono"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.whatsappLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder={t('sportsModal.whatsappPh')}
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white font-mono"
                    />
                    <MessageCircle className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Sports Required (Selectable Chips) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('sportsModal.selectSports')} ({selectedSports.length} {t('sportsModal.selected')})
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SPORTS.map((sport) => {
                    const isSelected = selectedSports.includes(sport.id);
                    return (
                      <button
                        key={sport.id}
                        type="button"
                        onClick={() => toggleSport(sport.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-900 dark:bg-brand-600 text-white border-brand-900 dark:border-brand-600 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {language === 'hi' ? sport.hi : sport.en} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantities & Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.quantitiesLabel')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('sportsModal.quantitiesPh')}
                    value={estimatedQuantities}
                    onChange={(e) => setEstimatedQuantities(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('sportsModal.budgetLabel')}
                    </label>
                    <div className="relative">
                      <select
                        value={estimatedBudget}
                        onChange={(e) => setEstimatedBudget(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                      >
                        <option value="Under ₹5,000">{language === 'hi' ? '₹5,000 से कम (छोटे क्लब / मैच)' : 'Under ₹5,000 (Small Club / House Match)'}</option>
                        <option value="₹5,000 - ₹10,000">{language === 'hi' ? '₹5,000 - ₹10,000 (अभ्यास सेट)' : '₹5,000 - ₹10,000 (Standard Practice Set)'}</option>
                        <option value="₹10,000 - ₹25,000">{language === 'hi' ? '₹10,000 - ₹25,000 (पूर्ण टूर्नामेंट सेट)' : '₹10,000 - ₹25,000 (Full Tournament Set)'}</option>
                        <option value="₹25,000 - ₹50,000">{language === 'hi' ? '₹25,000 - ₹50,000 (स्कूल स्पोर्ट्स डे किट)' : '₹25,000 - ₹50,000 (School Sports Day Kit)'}</option>
                        <option value="₹50,000+">{language === 'hi' ? '₹50,000+ (संस्थागत संपूर्ण सामग्री)' : '₹50,000+ (Institutional PE Overhaul)'}</option>
                      </select>
                      <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('sportsModal.dateLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={requiredByDate}
                        onChange={(e) => setRequiredByDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Location & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.locationLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('sportsModal.locationPh')}
                      value={addressOrLocation}
                      onChange={(e) => setAddressOrLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    {t('sportsModal.notesLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('sportsModal.notesPh')}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white order-2 sm:order-1"
                >
                  {t('btn.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2 active:scale-98"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{isSubmitting ? '...' : t('sportsModal.submit')}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">
                  {t('sportsModal.refText')} {createdReference}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading mt-1">
                  {t('sportsModal.successTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                  {t('sportsModal.successDesc')}
                </p>
              </div>

              {/* Summary Pill */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl max-w-md mx-auto text-left text-xs text-slate-600 dark:text-slate-300 space-y-1.5 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800 dark:text-white">{institutionOrTeam}</span>
                  <span className="text-brand-700 dark:text-amber-400 font-bold">{estimatedBudget}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {contactPerson} • {phone}
                </div>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-200 pt-1 border-t border-slate-200 dark:border-slate-700">
                  {selectedSports.join(', ')}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('sportsModal.waAction')}</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'hi' ? 'बंद करें' : 'Done & Close'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
