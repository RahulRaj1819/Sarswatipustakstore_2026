import React from 'react';
import { ProductCategory } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, BookOpen, Trophy, PenTool, BookMarked, Award, Palette, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onNavigate
}) => {
  const { t } = useApp();
  // 8 primary image-led category cards from spec
  const featuredCategories = CATEGORIES.filter(c => c.id !== 'all').slice(0, 8);

  const getCategoryIcon = (id: ProductCategory) => {
    switch (id) {
      case 'school-ncert':
      case 'academic-books':
      case 'bihar-board':
        return <BookOpen className="w-5 h-5" />;
      case 'competitive-exams':
        return <Award className="w-5 h-5" />;
      case 'notebooks':
        return <BookMarked className="w-5 h-5" />;
      case 'pens-writing':
        return <PenTool className="w-5 h-5" />;
      case 'art-craft':
        return <Palette className="w-5 h-5" />;
      case 'school-bags':
        return <Briefcase className="w-5 h-5" />;
      case 'sports-equipment':
        return <Trophy className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-orange font-heading">
              {t('catSection.tag')}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy dark:text-white font-heading tracking-tight mt-1">
              {t('section.categories')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('section.categoriesSub')}
            </p>
          </div>

          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('shop');
            }}
            className="text-xs font-bold text-brand-700 dark:text-amber-400 hover:text-brand-900 dark:hover:text-amber-300 flex items-center gap-1 group self-start sm:self-end cursor-pointer"
          >
            <span>{t('catSection.all')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 1. Quick Inline Category Pills Scroll Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('shop');
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-50 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-900 dark:hover:text-white border border-slate-200/90 dark:border-slate-700 transition-all cursor-pointer shadow-2xs shrink-0"
            >
              <span className="text-brand-700 dark:text-amber-400">{getCategoryIcon(cat.id)}</span>
              <span>{cat.shortName}</span>
            </button>
          ))}
        </div>

        {/* 2. Inline Category Cards (Horizontal Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {featuredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('shop');
              }}
              className="group bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-400 dark:hover:border-slate-600 p-3.5 sm:p-4 transition-all duration-200 shadow-2xs hover:shadow-card-hover cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-slate-800 group-hover:bg-brand-900 group-hover:text-white dark:group-hover:bg-amber-400 dark:group-hover:text-slate-900 text-brand-800 dark:text-amber-400 flex items-center justify-center transition-colors shadow-2xs shrink-0">
                  {getCategoryIcon(cat.id)}
                </div>

                <div className="min-w-0">
                  <h3 className="font-extrabold text-xs sm:text-sm text-navy dark:text-white font-heading group-hover:text-brand-800 dark:group-hover:text-amber-300 transition-colors leading-snug truncate">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-normal">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 group-hover:bg-brand-50 dark:group-hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-brand-700 dark:group-hover:text-amber-400 shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
