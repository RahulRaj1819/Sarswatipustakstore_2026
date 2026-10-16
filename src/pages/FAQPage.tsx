import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, Truck, CreditCard, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FAQPage: React.FC = () => {
  const { language } = useApp();
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const faqs = [
    {
      category: language === 'hi' ? 'स्कूल पुस्तकें एवं NCERT' : 'School Books & NCERT',
      icon: <BookOpen className="w-4 h-4 text-brand-700 dark:text-amber-400" />,
      questions: [
        {
          q: language === 'hi' 
            ? 'क्या आपकी NCERT एवं बिहार बोर्ड की पुस्तकें 100% असली हैं?' 
            : 'Are your NCERT and Bihar Board textbooks original editions?',
          a: language === 'hi'
            ? 'हाँ, बिल्कुल 100%। हम NCERT नई दिल्ली और BSTBPC (बिहार स्टेट टेक्स्ट बुक पब्लिशिंग कॉर्पोरेशन लिमिटेड, पटना) से सीधे आधिकारिक सरकारी संस्करण मंगाते हैं। प्रत्येक पुस्तक पर प्रामाणिक मुद्रण और मानक सरकारी MRP अंकित रहती है।'
            : 'Yes, 100%. We stock official government publications directly from NCERT New Delhi and BSTBPC (Bihar State Text Book Publishing Corporation Ltd, Patna). Every book includes the official publisher imprint and standard government MRP.'
        },
        {
          q: language === 'hi'
            ? '"स्कूल बुकलिस्ट तैयार करवाएं" सेवा कैसे काम करती है?'
            : 'How does the "Get Your School Booklist Ready" service work?',
          a: language === 'hi'
            ? 'आप अपने स्कूल (जैसे डीएवी सीवान, केंद्रीय विद्यालय सीवान, पचरुखी हाई स्कूल आदि) और कक्षा का चयन कर सकते हैं, या बुकलिस्ट की फोटो/पीडीएफ अपलोड कर सकते हैं। हमारे संचालक पाठ्यक्रम के संस्करणों की जांच कर पूरा सेट तैयार करते हैं और व्हाट्सएप पर पक्का कोटेशन भेजते हैं।'
            : 'You can choose your school (such as DAV Siwan, Kendriya Vidyalaya Siwan, Pachrukhi High School, etc.) and class, or upload a photo/PDF of your booklist slip. Our shopkeeper verifies the current syllabus editions, packs the entire bundle, and notifies you with the exact quotation via WhatsApp.'
        },
        {
          q: language === 'hi'
            ? 'क्या मैं अलग-अलग पुस्तकें खरीद सकता हूँ या केवल पूरा सेट लेना होगा?'
            : 'Can I purchase individual textbooks or only complete sets?',
          a: language === 'hi'
            ? 'आप एकल पुस्तक या संपूर्ण सेट दोनों खरीद सकते हैं। यदि आपके पास पहले से कुछ किताबें उपलब्ध हैं, तो आप केवल शेष बची किताबें चुन सकते हैं।'
            : 'You can purchase single textbooks or the complete set. If you already have your elder sibling\'s books, you can select only the remaining subjects you need.'
        }
      ]
    },
    {
      category: language === 'hi' ? 'पचरुखी एवं सीवान में पिकअप और डिलीवरी' : 'Pickup & Delivery in Pachrukhi / Siwan',
      icon: <Truck className="w-4 h-4 text-accent-orange" />,
      questions: [
        {
          q: language === 'hi'
            ? 'स्टोर पिकअप के लिए मैं अपना ऑर्डर कहाँ से ले सकता हूँ?'
            : 'Where can I collect my order for Store Pickup?',
          a: language === 'hi'
            ? 'हमारी दुकान मेन रोड, पचरुखी, सीवान (प्लस कोड: 5C58+V4X, पिन 841241) पर स्थित है। ऑर्डर तैयार होने के बाद आप सुबह 9:00 बजे से रात 9:00 बजे के बीच बिना कतार में लगे कभी भी सामान ले सकते हैं।'
            : 'Our shop is located on Main Road, Pachrukhi, Siwan (Plus Code: 5C58+V4X, PIN 841241). Once your order is ready, you can collect it anytime between 9:00 AM and 9:00 PM without waiting in line.'
        },
        {
          q: language === 'hi'
            ? 'होम डिलीवरी किन पिन कोड क्षेत्रों में उपलब्ध है?'
            : 'Which PIN codes are serviceable for local home delivery?',
          a: language === 'hi'
            ? 'हम पचरुखी और सीवान के पिन कोड 841241, 841226, 841227, 841242, 841245, 841243 और आस-पास के गांवों में डिलीवरी प्रदान करते हैं। ₹499 से अधिक के ऑर्डर पर डिलीवरी बिल्कुल मुफ्त है।'
            : 'We offer local delivery across Pachrukhi and Siwan localities including PIN codes 841241, 841226, 841227, 841242, 841245, 841243, and nearby villages. Delivery is FREE on orders above ₹499.'
        },
        {
          q: language === 'hi'
            ? 'क्या मैं दुकान आने से पहले स्टॉक कन्फर्म कर सकता हूँ?'
            : 'Can I confirm stock before visiting the shop?',
          a: language === 'hi'
            ? 'बिल्कुल! हम ग्राहकों को व्हाट्सएप (+91 70917 91893) या कॉल द्वारा संपर्क करने की सलाह देते हैं ताकि आपकी पुस्तकें या खेल सामग्री पहले से अलग सुरक्षित रख दी जाएं।'
            : 'Absolutely! We encourage customers to message us on WhatsApp (+91 70917 91893) or call 070917 91893 to have your books or sports gear kept aside before your visit.'
        }
      ]
    },
    {
      category: language === 'hi' ? 'भुगतान एवं बिलिंग' : 'Payments & Billing',
      icon: <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      questions: [
        {
          q: language === 'hi'
            ? 'भुगतान के कौन से तरीके स्वीकार किए जाते हैं?'
            : 'What payment methods do you accept?',
          a: language === 'hi'
            ? 'हम कैश ऑन डिलीवरी (COD), UPI (Google Pay, PhonePe, Paytm, BHIM), डेबिट/क्रेडिट कार्ड और दुकान काउंटर पर नकद भुगतान स्वीकार करते हैं।'
            : 'We accept Cash on Delivery (COD), UPI (GPay, PhonePe, Paytm, BHIM), Debit & Credit Cards, and Pay-at-Store counter upon collection.'
        },
        {
          q: language === 'hi'
            ? 'डिस्काउंट कूपन SARSWATI10 का उपयोग कैसे करें?'
            : 'How do I use the discount coupon SARSWATI10?',
          a: language === 'hi'
            ? 'चेकआउट या कार्ट ड्रॉवर में, कूपन इनपुट बॉक्स में SARSWATI10 दर्ज करें और पात्र पुस्तकों व खेल सामग्री पर 10% छूट पाने के लिए "लागू करें" पर क्लिक करें।'
            : 'During checkout or inside the shopping cart drawer, enter the code SARSWATI10 in the coupon input and click "Apply" to get 10% discount on eligible academic books and sports equipment.'
        }
      ]
    },
    {
      category: language === 'hi' ? 'वापसी, एक्सचेंज एवं वारंटी' : 'Returns, Exchanges & Warranties',
      icon: <RotateCcw className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      questions: [
        {
          q: language === 'hi'
            ? 'यदि स्कूल किताब का संस्करण बदल दे तो एक्सचेंज नीति क्या है?'
            : 'What is your exchange policy if a school changes a book edition?',
          a: language === 'hi'
            ? 'यदि स्कूल का सिलेबस बदल जाए या गलती से गलत कक्षा/विषय की पुस्तक ली गई हो, तो खरीद के 7 दिनों के भीतर बिना लिखे और बिल्कुल नई स्थिति में पुस्तक आसानी से बदली जा सकती है।'
            : 'If a school syllabus updates or an incorrect edition was mistakenly ordered, we provide a hassle-free exchange within 7 days of purchase, provided the book remains clean, unmarked, and in original condition.'
        },
        {
          q: language === 'hi'
            ? 'क्या खेलकूद के सामान पर वारंटी मिलती है?'
            : 'Do sports equipment items have warranties?',
          a: language === 'hi'
            ? 'सभी ब्रांडेड स्पोर्ट्स आइटम (जैसे Yonex रैकेट, Nivia फुटबॉल, Casio कैलकुलेटर) विनिर्माण दोषों के विरुद्ध आधिकारिक निर्माता वारंटी के साथ आते हैं।'
            : 'All branded sports items (Yonex rackets, Nivia footballs, Casio calculators) carry authentic manufacturer warranties against manufacturing defects.'
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 sm:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-brand-700 dark:text-amber-400" />
            <span>{language === 'hi' ? 'ग्राहक सहायता केंद्र' : 'Customer Help Center'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {language === 'hi' 
              ? 'स्कूल बुकलिस्ट, पचरुखी व सीवान में डिलीवरी और स्टोर सेवाओं से जुड़े स्पष्ट उत्तर।'
              : 'Clear answers about school booklists, delivery around Pachrukhi & Siwan, and shop services.'}
          </p>
        </div>

        {/* Categorized FAQs */}
        <div className="space-y-6">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-2 font-bold text-sm text-navy dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                {group.icon}
                <span>{group.category}</span>
              </div>

              <div className="space-y-3">
                {group.questions.map((faq, qIdx) => {
                  const key = `${groupIdx}-${qIdx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={qIdx} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full text-left p-4 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
