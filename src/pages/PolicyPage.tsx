import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight">
            {language === 'hi' ? 'नीति एवं नियम व शर्तें' : 'Policies & Legal Terms'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {language === 'hi'
              ? 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार, पचरुखी (सीवान, बिहार - 841241)'
              : 'Sarswati Pustak and Sports Bhandar, Pachrukhi (Siwan, Bihar - 841241)'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors">
          {[
            { id: 'shipping', label: language === 'hi' ? 'शिपिंग एवं डिलीवरी' : 'Shipping & Delivery', icon: <Truck className="w-4 h-4" /> },
            { id: 'returns', label: language === 'hi' ? 'वापसी एवं रिफंड' : 'Returns & Refunds', icon: <RotateCcw className="w-4 h-4" /> },
            { id: 'privacy', label: language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'terms', label: language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-900 dark:bg-brand-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xs prose prose-slate dark:prose-invert prose-xs sm:prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
          
          {/* 1. Shipping & Delivery Policy */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy dark:text-white font-heading not-prose border-b border-slate-200 dark:border-slate-800 pb-3">
                {language === 'hi' ? 'शिपिंग एवं स्थानीय डिलीवरी नीति' : 'Shipping & Local Delivery Policy'}
              </h2>
              
              {language === 'hi' ? (
                <>
                  <p>
                    <strong>1. मुफ्त स्टोर पिकअप:</strong> ग्राहक ऑनलाइन ऑर्डर या बुकिंग कर सीधे हमारे काउंटर (<strong>मेन रोड, पचरुखी, सीवान, बिहार - 841241</strong>) से कार्य समय (सुबह 9:00 बजे से रात 9:00 बजे तक) में बिना किसी अतिरिक्त शुल्क के सामान ले सकते हैं।
                  </p>
                  <p>
                    <strong>2. डिलीवरी सेवा क्षेत्र:</strong> हम पचरुखी और सीवान जिले के पिन कोड <strong>841241, 841226, 841227, 841242, 841245, 841243</strong> और निकटवर्ती ग्रामीण क्षेत्रों में सीधी डिलीवरी उपलब्ध कराते हैं।
                  </p>
                  <p>
                    <strong>3. डिलीवरी शुल्क:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>₹499 या उससे अधिक के ऑर्डर: <strong>बिल्कुल मुफ्त डिलीवरी</strong></li>
                    <li>₹499 से कम के ऑर्डर: <strong>मात्र ₹35 स्थानीय डिलीवरी शुल्क</strong></li>
                  </ul>
                  <p>
                    <strong>4. प्रेषण समय:</strong> उपलब्ध पुस्तकें, स्टेशनरी और खेल उपकरण सामान्यतः 24 से 48 घंटों में पैक कर भेज दिए जाते हैं।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Free Store Pickup:</strong> Customers may order online or reserve items and collect them directly from our physical store counter at <strong>5C58+V4X, Main Road, Pachrukhi, Siwan, Bihar - 841241</strong> during standard business hours (9:00 AM to 9:00 PM, daily). Store pickup is always 100% free of charge.
                  </p>
                  <p>
                    <strong>2. Serviceable Delivery Areas:</strong> We provide local dispatch within Pachrukhi and greater Siwan district across postal codes <strong>841241, 841226, 841227, 841242, 841245, 841243</strong>, and neighboring village communities.
                  </p>
                  <p>
                    <strong>3. Delivery Charges:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Orders of ₹499 and above: <strong>FREE Local Delivery</strong></li>
                    <li>Orders below ₹499: <strong>Flat ₹35 local handling fee</strong></li>
                  </ul>
                  <p>
                    <strong>4. Dispatch Timelines:</strong> In-stock books, stationery, and sports goods are typically packed and dispatched within 24 to 48 hours of order confirmation. For bulk school textbook orders requiring publisher sourcing, estimated timelines will be coordinated with the parent or school coordinator directly via call or WhatsApp.
                  </p>
                </>
              )}
            </div>
          )}

          {/* 2. Returns & Refunds Policy */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy dark:text-white font-heading not-prose border-b border-slate-200 dark:border-slate-800 pb-3">
                {language === 'hi' ? 'वापसी, एक्सचेंज एवं रिफंड नीति' : 'Returns, Exchanges & Refund Policy'}
              </h2>

              {language === 'hi' ? (
                <>
                  <p>
                    <strong>1. पाठ्यपुस्तक सिलेबस एक्सचेंज (7 दिन):</strong> यदि किसी स्कूल में किताब का संस्करण बदल जाए या गलती से गलत विषय की पुस्तक आ गई हो, तो खरीद के <strong>7 दिनों</strong> के भीतर साफ, नई और बिना लिखी स्थिति में हमारे पचरुखी स्टोर पर पुस्तक बदली जा सकती है।
                  </p>
                  <p>
                    <strong>2. दोषपूर्ण सामग्री:</strong> यदि किसी पुस्तक में पेज गायब हों या खेल सामग्री में विनिर्माण संबंधी कोई दोष हो, तो तत्काल दूसरा सामान या पूरा पैसा वापस दिया जाता है।
                  </p>
                  <p>
                    <strong>3. गैर-वापसी योग्य वस्तुएं:</strong> खुली सील वाले मार्कर/पेन या फटे पन्नों वाली कॉपियां वापस नहीं की जाती हैं।
                  </p>
                  <p>
                    <strong>4. रिफंड प्रक्रिया:</strong> स्वीकृत रिफंड के लिए नकद ऑर्डर का पैसा काउंटर पर तुरंत दिया जाता है और ऑनलाइन भुगतान 3-5 कार्य दिवसों में मूल खाते में वापस भेज दिया जाता है।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Textbook Syllabus Exchange (7 Days):</strong> If an academic institution changes a book edition or if an incorrect subject/grade guide was mistakenly purchased, you may exchange the book at our Pachrukhi store within <strong>7 days</strong> of purchase, provided the book remains in completely new, unwritten, clean condition.
                  </p>
                  <p>
                    <strong>2. Defective Products:</strong> In the rare instance of manufacturing binding flaws (missing pages in textbooks) or defective stationery/sports equipment (such as deflated bladders or damaged handles upon delivery), an immediate replacement or full refund is provided.
                  </p>
                  <p>
                    <strong>3. Non-Returnable Items:</strong> Opened packs of markers/pens with broken blister seals, used notebook registers with torn pages, and personalized school label packs are non-exchangeable unless defective.
                  </p>
                  <p>
                    <strong>4. Refund Processing:</strong> For approved return refunds, cash orders are refunded directly in cash at the counter, and online payments are credited back to the original source UPI/account within 3–5 working days.
                  </p>
                </>
              )}
            </div>
          )}

          {/* 3. Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy dark:text-white font-heading not-prose border-b border-slate-200 dark:border-slate-800 pb-3">
                {language === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
              </h2>

              {language === 'hi' ? (
                <>
                  <p>
                    <strong>1. ग्राहक डेटा सुरक्षा:</strong> हम आपके नाम, मोबाइल नंबर, बुकलिस्ट और पते का उपयोग केवल ऑर्डर प्रोसेसिंग, डिलीवरी समन्वय और व्हाट्सएप अपडेट के लिए करते हैं।
                  </p>
                  <p>
                    <strong>2. कोई स्पैम या डेटा शेयरिंग नहीं:</strong> हम आपका व्यक्तिगत डेटा किसी भी तृतीय पक्ष को न तो बेचते हैं और न ही शेयर करते हैं।
                  </p>
                  <p>
                    <strong>3. सुरक्षित संचार:</strong> हमारी व्हाट्सएप सहायता और सूचनाएं केवल आपके अधिकृत नंबर पर सीधे भेजी जाती हैं।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Customer Data Safety:</strong> We collect and retain your name, phone number, school booklist details, and delivery address solely for the purpose of fulfilling your retail orders, communicating dispatch progress, and responding to inquiries.
                  </p>
                  <p>
                    <strong>2. No Third-Party Reselling:</strong> We never sell, lease, or transmit your contact credentials to third-party telemarketers or advertisers.
                  </p>
                  <p>
                    <strong>3. Direct WhatsApp Support:</strong> Direct communications initiated through WhatsApp are handled personally by our verified shop administration.
                  </p>
                </>
              )}
            </div>
          )}

          {/* 4. Terms & Conditions */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy dark:text-white font-heading not-prose border-b border-slate-200 dark:border-slate-800 pb-3">
                {language === 'hi' ? 'दुकान के नियम एवं शर्तें' : 'Terms & Conditions'}
              </h2>

              {language === 'hi' ? (
                <>
                  <p>
                    <strong>1. प्रामाणिक MRP मूल्य:</strong> सभी पाठ्यपुस्तकें और खेल सामग्री आधिकारिक प्रकाशकों और निर्माताओं द्वारा तय सरकारी MRP पर ही बेची जाती हैं।
                  </p>
                  <p>
                    <strong>2. स्कूल बुकलिस्ट कोटेशन:</strong> बुकलिस्ट कोटेशन प्रकाशक के नवीनतम स्टॉक और मूल्य पर आधारित होता है।
                  </p>
                  <p>
                    <strong>3. कानूनी अधिकार क्षेत्र:</strong> सभी लेनदेन और विवाद सीवान (बिहार) क्षेत्राधिकार के अधीन हैं।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Authentic Retail Pricing:</strong> All academic textbooks and sports items are supplied in compliance with legal metrology standards at or below verified publisher MRP.
                  </p>
                  <p>
                    <strong>2. Quotation Validity:</strong> School booklist bundle quotations provided via our system reflect prevailing publisher pricing and edition availability.
                  </p>
                  <p>
                    <strong>3. Local Jurisdiction:</strong> Any dispute arising from retail transactions or delivery services shall be subject to the exclusive jurisdiction of the competent courts in Siwan, Bihar.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
