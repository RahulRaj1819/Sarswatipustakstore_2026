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
  const purposes = [
    {
      title: 'School Reopening Essentials',
      desc: 'Complete book sets, long registers, geometry boxes & backpacks.',
      icon: <Backpack className="w-5 h-5 text-amber-500" />,
      bg: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-200',
      action: () => onOpenBooklist()
    },
    {
      title: 'Board Exam Preparation',
      desc: 'NCERT solutions, sample papers, math guides & highlighters.',
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-200',
      action: () => { onSelectCategory('academic-books'); onNavigate('shop'); }
    },
    {
      title: 'Competitive Exam Preparation',
      desc: 'Lucent GK, BPSC previous year papers, Railway & SSC guides.',
      icon: <Award className="w-5 h-5 text-emerald-500" />,
      bg: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-200',
      action: () => { onSelectCategory('competitive-exams'); onNavigate('shop'); }
    },
    {
      title: 'College & Degree Essentials',
      desc: 'Casio scientific calculators, thick spiral registers, reference books.',
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
      bg: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-200',
      action: () => { onSelectCategory('college-reference'); onNavigate('shop'); }
    },
    {
      title: 'Art & Project Work',
      desc: 'Camlin water colors, chart sheets, Fevicol craft glue & scissors.',
      icon: <Palette className="w-5 h-5 text-rose-500" />,
      bg: 'from-rose-500/10 to-red-500/10',
      border: 'border-rose-200',
      action: () => { onSelectCategory('art-craft'); onNavigate('shop'); }
    },
    {
      title: 'Sports Day & Tournament Gear',
      desc: 'Cricket bats, tennis balls, tug-of-war ropes, footballs & medals.',
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      bg: 'from-yellow-500/10 to-amber-500/10',
      border: 'border-yellow-200',
      action: () => { onSelectCategory('sports-equipment'); onNavigate('shop'); }
    },
    {
      title: 'Office Stationery',
      desc: 'Executive planners, Kangaro staplers, clear tapes & calculators.',
      icon: <Briefcase className="w-5 h-5 text-slate-600" />,
      bg: 'from-slate-500/10 to-zinc-500/10',
      border: 'border-slate-200',
      action: () => { onSelectCategory('stationery'); onNavigate('shop'); }
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
            Merchandising Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy font-heading tracking-tight mt-1">
            Shop by Purpose
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quick shopping shortcuts tailored for students, teachers, sports teams &amp; businesses.
          </p>
        </div>

        {/* Purpose Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {purposes.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className={`p-5 rounded-2xl border ${item.border} bg-gradient-to-br ${item.bg} hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-navy group-hover:text-brand-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 flex items-center gap-1 text-xs font-bold text-brand-700 group-hover:text-brand-900">
                <span>Explore collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
