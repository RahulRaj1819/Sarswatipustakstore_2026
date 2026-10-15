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

interface SportsBulkModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onClose: () => void;
  onEnquirySubmitted?: () => void;
}

const AVAILABLE_SPORTS = [
  'Cricket',
  'Football',
  'Badminton',
  'Volleyball',
  'Basketball',
  'Table Tennis',
  'Athletics & Track',
  'Fitness & Gym',
  'Indoor Games (Carrom/Chess)',
  'School Sports & PE Package',
  'Sportswear & Team Bibs'
];

export const SportsBulkModal: React.FC<SportsBulkModalProps> = ({
  isOpen,
  settings,
  onClose,
  onEnquirySubmitted
}) => {
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

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionOrTeam || !contactPerson || !phone || selectedSports.length === 0) {
      alert('Please fill out all required fields and select at least one sport.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy via-brand-900 to-brand-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Bulk Sports &amp; Tournament Quotation
              </h3>
              <p className="text-xs text-brand-200">
                Special institutional pricing for Schools, Academies &amp; Village Clubs in Siwan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <ClipboardCheck className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Direct Store Pricing Guarantee:</span> We supply 100% genuine SG, Nivia, Cosco, Yonex &amp; Stag equipment with bulk school discounts, GST invoice, and direct delivery across Siwan &amp; Pachrukhi.
                </div>
              </div>

              {/* Institution / Team & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    School / Club / Academy Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. DAV Public School / Pachrukhi CC"
                      value={institutionOrTeam}
                      onChange={(e) => setInstitutionOrTeam(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Person Name &amp; Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Singh (PE Master / Captain)"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number (Calling) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number (For Quotation PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Same as calling or enter WhatsApp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <MessageCircle className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Sports Required (Selectable Chips) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Sports Required * ({selectedSports.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SPORTS.map((sport) => {
                    const isSelected = selectedSports.includes(sport);
                    return (
                      <button
                        key={sport}
                        type="button"
                        onClick={() => toggleSport(sport)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-900 text-white border-brand-900 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {sport} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantities & Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Quantities / Items Needed
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 4 Nivia Footballs, 2 Volleyball Nets, 8 Relay Batons, 20 Cones..."
                    value={estimatedQuantities}
                    onChange={(e) => setEstimatedQuantities(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Budget Range
                    </label>
                    <div className="relative">
                      <select
                        value={estimatedBudget}
                        onChange={(e) => setEstimatedBudget(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                      >
                        <option value="Under ₹5,000">Under ₹5,000 (Small Club / House Match)</option>
                        <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000 (Standard Practice Set)</option>
                        <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000 (Full Tournament Set)</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (School Sports Day Kit)</option>
                        <option value="₹50,000+">₹50,000+ (Institutional PE Overhaul)</option>
                      </select>
                      <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Required By Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={requiredByDate}
                        onChange={(e) => setRequiredByDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Location & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Location / Village / School Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Pachrukhi Bazaar, Siwan Town, Mairwa Rd"
                      value={addressOrLocation}
                      onChange={(e) => setAddressOrLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Special Brand Requirements or Notes
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Prefer Nivia match balls, SG Kashmir bats"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 focus:bg-white"
                    />
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Form Action */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-900 to-navy text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Request Official Quotation</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Ref: {createdReference}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-2 font-heading">
                  Bulk Sports Quotation Request Received!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1.5 leading-relaxed">
                  Thank you, <span className="font-semibold">{contactPerson}</span>. We have logged your request for <span className="font-semibold">{institutionOrTeam}</span>. Our sports desk in Pachrukhi will prepare a custom quotation with school discount within 2 business hours.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto text-xs space-y-1.5 text-slate-700">
                <div><span className="font-semibold text-slate-900">Sports:</span> {selectedSports.join(', ')}</div>
                <div><span className="font-semibold text-slate-900">Budget Estimate:</span> {estimatedBudget}</div>
                <div><span className="font-semibold text-slate-900">Target Date:</span> {requiredByDate || 'Within 7-10 days'}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={getWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quotation Request on WhatsApp Now</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
