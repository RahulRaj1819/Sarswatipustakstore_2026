import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight">
            Policies &amp; Legal Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sarswati Pustak and Sports Bhandar, Pachrukhi (Siwan, Bihar - 841241)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
          {[
            { id: 'shipping', label: 'Shipping & Delivery', icon: <Truck className="w-4 h-4" /> },
            { id: 'returns', label: 'Returns & Refunds', icon: <RotateCcw className="w-4 h-4" /> },
            { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs prose prose-slate prose-xs sm:prose-sm max-w-none text-slate-700 leading-relaxed">
          
          {/* 1. Shipping & Delivery Policy */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy font-heading not-prose border-b pb-3">
                Shipping &amp; Local Delivery Policy
              </h2>
              
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
            </div>
          )}

          {/* 2. Returns & Refunds Policy */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy font-heading not-prose border-b pb-3">
                Returns, Exchanges &amp; Refund Policy
              </h2>

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
            </div>
          )}

          {/* 3. Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy font-heading not-prose border-b pb-3">
                Customer Privacy &amp; Data Ethics Policy
              </h2>

              <p>
                <strong>1. Information Collected:</strong> We collect customer names, contact telephone/WhatsApp numbers, and village/locality delivery addresses strictly to process and fulfill customer orders and school booklist quotation requests.
              </p>

              <p>
                <strong>2. Respectful Communication:</strong> We never sell, rent, or share customer contact records with third-party advertisers. Telephone numbers and WhatsApp accounts are used only for order confirmation, delivery directions, and customer-requested stock updates.
              </p>

              <p>
                <strong>3. Payment Security:</strong> We do not store credit card numbers, CVVs, or bank login passwords. Online payments are processed through secure Indian gateway infrastructure complying with RBI guidelines.
              </p>
            </div>
          )}

          {/* 4. Terms & Conditions */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-navy font-heading not-prose border-b pb-3">
                Terms &amp; Conditions
              </h2>

              <p>
                <strong>1. Store Identity:</strong> This digital storefront is operated by Sarswati Pustak and Sports Bhandar, registered retail store in Pachrukhi, Siwan, Bihar - 841241.
              </p>

              <p>
                <strong>2. Pricing &amp; Stock Availability:</strong> While we endeavor to keep all listed prices and quantities synchronized in real-time, academic textbooks are subject to publisher reprints and occasional government MRP revisions. All orders are verified by our store team prior to final fulfillment.
              </p>

              <p>
                <strong>3. WhatsApp Quotations:</strong> School booklist requests submitted online constitute quotation requests and become accepted orders only upon explicit customer confirmation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
