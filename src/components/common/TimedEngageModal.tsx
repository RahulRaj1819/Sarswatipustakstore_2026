import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storage';
import { CustomerEnquiry, UserAccount } from '../../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  UserPlus, 
  LogIn, 
  MessageSquareHeart, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  User, 
  Lock, 
  Mail,
  Send,
  Sparkles
} from 'lucide-react';

interface TimedEngageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const TimedEngageModal: React.FC<TimedEngageModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose
}) => {
  const { language, t } = useApp();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'auth' | 'feedback'>('auth');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');

  // Auth Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Feedback Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackCategory, setFeedbackCategory] = useState('Website Usability');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Auto-trigger 5 minutes (300,000ms) after page load
  useEffect(() => {
    const hasShown = sessionStorage.getItem('spsb_engage_modal_shown');
    if (hasShown) return;

    // 5 minutes timer (300,000 ms)
    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
      sessionStorage.setItem('spsb_engage_modal_shown', 'true');
    }, FIVE_MINUTES_MS);

    return () => clearTimeout(timer);
  }, []);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || !password.trim()) return;

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim() || (contact.includes('@') ? contact.split('@')[0] : 'Valued Customer'),
      phone: contact,
      email: contact.includes('@') ? contact : undefined,
      savedAddresses: [],
      role: 'customer'
    };

    StorageService.saveUser(user);
    setAuthSuccess(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      handleClose();
      setAuthSuccess(false);
    }, 2000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    const enquiry: CustomerEnquiry = {
      id: `fb-${Date.now()}`,
      type: 'general',
      name: feedbackName.trim() || 'Pachrukhi Visitor',
      phone: feedbackPhone.trim() || 'Not specified',
      subject: `[${rating} Stars] Feedback on ${feedbackCategory}`,
      message: `Rating: ${rating}/5\nCategory: ${feedbackCategory}\nComments: ${feedbackMessage}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    StorageService.createEnquiry(enquiry);
    setFeedbackSuccess(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      handleClose();
      setFeedbackSuccess(false);
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div onClick={handleClose} className="fixed inset-0" />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy via-brand-900 to-slate-900 text-white p-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg font-heading">
                  {language === 'hi' ? 'सरस्वती पुस्तक में आपका स्वागत है' : 'Welcome to Sarswati Pustak'}
                </h3>
                <p className="text-[11px] text-slate-300">
                  {language === 'hi' ? 'खाता बनाएं या अपनी प्रतिक्रिया साझा करें' : 'Create account or share your valuable feedback'}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 bg-white/10 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('auth')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'auth'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'खाता / लॉगिन' : 'Account / Login'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'feedback'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-accent-orange" />
              <span>{language === 'hi' ? 'प्रतिक्रिया (Feedback)' : 'Share Feedback'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {/* TAB 1: AUTH (CREATE ACCOUNT / LOGIN) */}
          {activeTab === 'auth' && (
            <div>
              {authSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-navy dark:text-white">
                    {language === 'hi' ? 'सफलतापूर्वक सहेजा गया!' : 'Successfully Signed In!'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'hi' ? 'आपके विवरण सुरक्षित कर लिए गए हैं।' : 'Welcome to Sarswati Pustak & Sports Bhandar.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {authMode === 'register' 
                        ? (language === 'hi' ? 'नया ग्राहक खाता बनाएं' : 'Create New Customer Account')
                        : (language === 'hi' ? 'अपने खाते में लॉगिन करें' : 'Sign in to Your Account')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                      className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
                    >
                      {authMode === 'register'
                        ? (language === 'hi' ? 'पहले से खाता है? लॉगिन करें' : 'Already have account? Sign in')
                        : (language === 'hi' ? 'नया खाता बनाएं' : 'New here? Register')}
                    </button>
                  </div>

                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {language === 'hi' ? 'आपका पूरा नाम' : 'Full Name'} *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'hi' ? 'मोबाइल नंबर / ईमेल' : 'Mobile Number or Email'} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="e.g. 9835012345 or student@gmail.com"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'hi' ? 'पासवर्ड' : 'Password'} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-brand-600" />
                      <span>{language === 'hi' ? 'मुझे याद रखें' : 'Remember me'}</span>
                    </label>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? '100% सुरक्षित' : '100% Secure'}</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {authMode === 'register' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                    <span>
                      {authMode === 'register'
                        ? (language === 'hi' ? 'खाता बनाएं' : 'Create Customer Account')
                        : (language === 'hi' ? 'लॉगिन करें' : 'Sign In to Account')}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: STORE & WEBSITE FEEDBACK */}
          {activeTab === 'feedback' && (
            <div>
              {feedbackSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-navy dark:text-white">
                    {language === 'hi' ? 'आपकी प्रतिक्रिया के लिए धन्यवाद!' : 'Thank You for Your Feedback!'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    {language === 'hi' 
                      ? 'हम पचरुखी के प्रत्येक छात्र और ग्राहक को बेहतर सेवा देने के लिए आपके सुझावों का सम्मान करते हैं।' 
                      : 'We read every suggestion carefully to serve students and athletes in Pachrukhi better.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
                  {/* Star Rating */}
                  <div className="text-center py-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === 'hi' ? 'वेबसाइट और दुकान का अनुभव कैसा रहा?' : 'How is your experience with our store & website?'}
                    </label>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 text-2xl transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      {rating === 5 && (language === 'hi' ? 'उत्कृष्ट (Excellent)' : 'Excellent - 5 Stars')}
                      {rating === 4 && (language === 'hi' ? 'बहुत अच्छा (Very Good)' : 'Very Good - 4 Stars')}
                      {rating === 3 && (language === 'hi' ? 'अच्छा (Good)' : 'Good - 3 Stars')}
                      {rating === 2 && (language === 'hi' ? 'औसत (Fair)' : 'Fair - 2 Stars')}
                      {rating === 1 && (language === 'hi' ? 'सुधार चाहिए (Needs Work)' : 'Needs Work - 1 Star')}
                    </span>
                  </div>

                  {/* Feedback Topic */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'hi' ? 'प्रतिक्रिया की श्रेणी' : 'Topic / Area'}
                    </label>
                    <select
                      value={feedbackCategory}
                      onChange={(e) => setFeedbackCategory(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white font-medium"
                    >
                      <option value="Website Usability">Website Usability &amp; Design</option>
                      <option value="Book Availability">Textbook &amp; Syllabus Stock</option>
                      <option value="Sports Equipment">Sports &amp; Fitness Gear</option>
                      <option value="Store Pickup Service">Pachrukhi Store Pickup Experience</option>
                      <option value="Pricing & Offers">Pricing &amp; Discounts</option>
                      <option value="Other">Other Suggestion</option>
                    </select>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'hi' ? 'आपका सुझाव या संदेश' : 'Your Comments & Suggestions'} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder={language === 'hi' ? 'अपनी राय या जरूरत यहां लिखें...' : 'Tell us what you liked or how we can improve...'}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                    />
                  </div>

                  {/* Optional Contact */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder={language === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Name (optional)'}
                      className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg dark:text-white text-xs"
                    />
                    <input
                      type="tel"
                      value={feedbackPhone}
                      onChange={(e) => setFeedbackPhone(e.target.value)}
                      placeholder={language === 'hi' ? 'मोबाइल नंबर (वैकल्पिक)' : 'Mobile (optional)'}
                      className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg dark:text-white text-xs font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-accent-orange hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'प्रतिक्रिया भेजें' : 'Submit Feedback'}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
