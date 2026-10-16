import React from 'react';
import { ProductCategory } from '../../types';
import { 
  Backpack, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Palette, 
  Trophy, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ShopByPurposeProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: string) => void;
  onOpenBooklist: () => void;
}

export const ShopByPurpose: React.FC<ShopByPurposeProps> = ({
  onSelectCategory,
  onNavigate,
  onOpenBooklist
}) => {
  const { language } = useApp();

  const purposes = [
    {
      title: language === 'hi' ? 'स्कूल शुरुआत की आवश्यक सामग्री' : 'School Reopening Essentials',
      desc: language === 'hi' ? 'संपूर्ण पुस्तक सेट, क्लासमेट कॉपियां, ज्योमेट्री बॉक्स व बैग।' : 'Complete book sets, long registers, geometry boxes & backpacks.',
      icon: <Backpack className="w-5 h-5 text-amber-500" />,
      bg: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-200 dark:border-amber-800/60',
      action: () => onOpenBooklist()
    },
    {
      title: language === 'hi' ? 'बोर्ड परीक्षा तैयारी' : 'Board Exam Preparation',
      desc: language === 'hi' ? 'NCERT समाधान, सैंपल पेपर्स, आर.डी. शर्मा व महत्वपूर्ण गाइड।' : 'NCERT solutions, sample papers, math guides & highlighters.',
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-200 dark:border-blue-800/60',
      action: () => { onSelectCategory('academic-books'); onNavigate('shop'); }
    },
    {
      title: language === 'hi' ? 'प्रतियोगी परीक्षा तैयारी' : 'Competitive Exam Preparation',
      desc: language === 'hi' ? 'ल्यूसेंट GK, BPSC पूर्व वर्ष प्रश्न पत्र, रेलवे व SSC बुक्स।' : 'Lucent GK, BPSC previous year papers, Railway & SSC guides.',
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      action: () => { onSelectCategory('competitive-exams'); onNavigate('shop'); }
    },
    {
      title: language === 'hi' ? 'कॉलेज एवं उच्च शिक्षा आवश्यक सामग्री' : 'College & Degree Essentials',
      desc: language === 'hi' ? 'कैलकुलेटर, स्पाइरल रजिस्टर, कॉलेज संदर्भ पुस्तकें व पेन।' : 'Casio scientific calculators, thick spiral registers, reference books.',
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
      bg: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-200 dark:border-purple-800/60',
      action: () => { onSelectCategory('college-reference'); onNavigate('shop'); }
    },
    {
      title: language === 'hi' ? 'कला, क्राफ्ट एवं प्रोजेक्ट कार्य' : 'Art & Project Work',
      desc: language === 'hi' ? 'कैमलिन वाटर कलर्स, चार्ट पेपर, फेविकोल, कटर व पेंसिल सेट।' : 'Camlin water colors, chart sheets, Fevicol craft glue & scissors.',
      icon: <Palette className="w-5 h-5 text-rose-500" />,
      bg: 'from-rose-500/10 to-red-500/10',
      border: 'border-rose-200 dark:border-rose-800/60',
      action: () => { onSelectCategory('art-craft'); onNavigate('shop'); }
    },
    {
      title: language === 'hi' ? 'खेल दिवस एवं टूर्नामेंट सामग्री' : 'Sports Day & Tournament Gear',
      desc: language === 'hi' ? 'क्रिकेट बैट, टेनिस बॉल, वॉलीबॉल, फुटबॉल, मेडल व सीटी।' : 'Cricket bats, tennis balls, tug-of-war ropes, footballs & medals.',
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      bg: 'from-yellow-500/10 to-amber-500/10',
      border: 'border-yellow-200 dark:border-yellow-800/60',
      action: () => { onSelectCategory('sports-equipment'); onNavigate('shop'); }
    },
    {
      title: language === 'hi' ? 'ऑफिस एवं व्यावसायिक स्टेशनरी' : 'Office Stationery',
      desc: language === 'hi' ? 'डायरी, स्टेपलर, पारदर्शी टेप, फाइल फोल्डर व कैलकुलेटर।' : 'Executive planners, Kangaro staplers, clear tapes & calculators.',
      icon: <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400" />,
      bg: 'from-slate-500/10 to-zinc-500/10',
      border: 'border-slate-200 dark:border-slate-800',
      action: () => { onSelectCategory('stationery'); onNavigate('shop'); }
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
            {language === 'hi' ? 'विशेष संग्रह' : 'Curated Collections'}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight mt-1">
            {language === 'hi' ? 'ज़रूरत के अनुसार खरीदारी करें' : 'Shop by Purpose'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {language === 'hi' 
              ? 'विद्यार्थियों, शिक्षकों, खेल टीमों और कार्यालयों के लिए तैयार त्वरित श्रेणियां।' 
              : 'Quick shopping shortcuts tailored for students, teachers, sports teams & businesses.'}
          </p>
        </div>

        {/* Purpose Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {purposes.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${item.bg} border ${item.border} hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-98`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-2xs flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-navy dark:text-white font-heading group-hover:text-brand-800 dark:group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-brand-800 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <span>{language === 'hi' ? 'देखें' : 'Explore'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
