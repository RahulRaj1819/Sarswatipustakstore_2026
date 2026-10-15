import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, Truck, CreditCard, RotateCcw } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'School Books & NCERT',
      icon: <BookOpen className="w-4 h-4 text-brand-700" />,
      questions: [
        {
          q: 'Are your NCERT and Bihar Board textbooks original editions?',
          a: 'Yes, 100%. We stock official government publications directly from NCERT New Delhi and BSTBPC (Bihar State Text Book Publishing Corporation Ltd, Patna). Every book includes the official publisher imprint and standard government MRP.'
        },
        {
          q: 'How does the "Get Your School Booklist Ready" service work?',
          a: 'You can choose your school (such as DAV Siwan, Kendriya Vidyalaya Siwan, Pachrukhi High School, etc.) and class, or upload a photo/PDF of your booklist slip. Our shopkeeper verifies the current syllabus editions, packs the entire bundle, and notifies you with the exact quotation via WhatsApp.'
        },
        {
          q: 'Can I purchase individual textbooks or only complete sets?',
          a: 'You can purchase single textbooks or the complete set. If you already have your elder sibling\'s books, you can select only the remaining subjects you need.'
        }
      ]
    },
    {
      category: 'Pickup & Delivery in Pachrukhi / Siwan',
      icon: <Truck className="w-4 h-4 text-accent-orange" />,
      questions: [
        {
          q: 'Where can I collect my order for Store Pickup?',
          a: 'Our shop is located on Main Road, Pachrukhi, Siwan (Plus Code: 5C58+V4X, PIN 841241). Once your order is ready, you can collect it anytime between 9:00 AM and 9:00 PM without waiting in line.'
        },
        {
          q: 'Which PIN codes are serviceable for local home delivery?',
          a: 'We offer local delivery across Pachrukhi and Siwan localities including PIN codes 841241, 841226, 841227, 841242, 841245, 841243, and nearby villages. Delivery is FREE on orders above ₹499.'
        },
        {
          q: 'Can I confirm stock before visiting the shop?',
          a: 'Absolutely! We encourage customers to message us on WhatsApp (+91 70917 91893) or call 070917 91893 to have your books or sports gear kept aside before your visit.'
        }
      ]
    },
    {
      category: 'Payments & Billing',
      icon: <CreditCard className="w-4 h-4 text-emerald-600" />,
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Cash on Delivery (COD), UPI (GPay, PhonePe, Paytm, BHIM), Debit & Credit Cards, and Pay-at-Store counter upon collection.'
        },
        {
          q: 'How do I use the discount coupon SARSWATI10?',
          a: 'During checkout or inside the shopping cart drawer, enter the code SARSWATI10 in the coupon input and click "Apply" to get 10% discount on eligible academic books and sports equipment.'
        }
      ]
    },
    {
      category: 'Returns, Exchanges & Warranties',
      icon: <RotateCcw className="w-4 h-4 text-amber-600" />,
      questions: [
        {
          q: 'What is your exchange policy if a school changes a book edition?',
          a: 'If a school syllabus updates or an incorrect edition was mistakenly ordered, we provide a hassle-free exchange within 7 days of purchase, provided the book remains clean, unmarked, and in original condition.'
        },
        {
          q: 'Do sports equipment items have warranties?',
          a: 'All branded sports items (Yonex rackets, Nivia footballs, Casio calculators) carry authentic manufacturer warranties against manufacturing defects.'
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-brand-700" />
            <span>Customer Help Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Clear answers about school booklists, delivery around Pachrukhi &amp; Siwan, and shop services.
          </p>
        </div>

        {/* Categorized FAQs */}
        <div className="space-y-6">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-navy uppercase tracking-wider pb-2 border-b border-slate-100">
                {group.icon}
                <span>{group.category}</span>
              </div>

              <div className="space-y-2.5">
                {group.questions.map((faq, idx) => {
                  const globalIdx = groupIdx * 10 + idx;
                  const isOpen = openIndex === globalIdx;

                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-700' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
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
