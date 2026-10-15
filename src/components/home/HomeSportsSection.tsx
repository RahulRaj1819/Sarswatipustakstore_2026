import React from 'react';
import { Trophy, ArrowRight, Sparkles, CheckCircle, Flame } from 'lucide-react';
import { ProductCategory } from '../../types';

interface HomeSportsSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigate: (page: string) => void;
}

interface SportsPreviewCard {
  id: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  popularItem: string;
  brandTag: string;
}

const FEATURED_SPORTS_CATEGORIES: SportsPreviewCard[] = [
  {
    id: 'sports-cricket',
    title: 'Cricket',
    subtitle: 'Kashmir Willow Bats, Tennis Balls & SG Kits',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=600&q=80',
    popularItem: 'Short Handle Bats',
    brandTag: 'SG / SS / Cosco'
  },
  {
    id: 'sports-football',
    title: 'Football',
    subtitle: 'Size 5 Match Balls, Moulded Studs & Shin Guards',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    popularItem: 'Nivia Storm',
    brandTag: 'Nivia / Kipsta'
  },
  {
    id: 'sports-badminton',
    title: 'Badminton',
    subtitle: 'Isometric Rackets, Mavis 350 Shuttles & Nets',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    popularItem: 'Muscle Power Sets',
    brandTag: 'Yonex / Li-Ning'
  },
  {
    id: 'sports-volleyball',
    title: 'Volleyball',
    subtitle: 'Cosco Super Volley Balls & Heavy Court Nets',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80',
    popularItem: '18-Panel Match Ball',
    brandTag: 'Cosco / Spartan'
  },
  {
    id: 'sports-basketball',
    title: 'Basketball',
    subtitle: 'Size 7 Outdoor Grippy Balls & Hoop Nets',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    popularItem: 'All-Weather Balls',
    brandTag: 'Spalding / Nivia'
  },
  {
    id: 'sports-fitness',
    title: 'Fitness & Gym',
    subtitle: '10mm Yoga Mats, Speed Skipping Ropes & Grippers',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    popularItem: 'Home Workout Kits',
    brandTag: 'Boldfit / Kobo'
  },
  {
    id: 'sports-indoor-games',
    title: 'Indoor Games',
    subtitle: 'Assam Ply 32" Carrom Boards, Wooden Chess & Ludo',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80',
    popularItem: 'Champion 32" Carrom',
    brandTag: 'Assam Ply / Precise'
  },
  {
    id: 'sports-school-pe',
    title: 'School Sports Kits',
    subtitle: 'All-in-One Sports Day Bundles, Relay Batons & Bibs',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    popularItem: 'PE Master Packages',
    brandTag: 'Institutional Sets'
  }
];

export const HomeSportsSection: React.FC<HomeSportsSectionProps> = ({
  onSelectCategory,
  onNavigate
}) => {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-900 via-navy to-slate-950 text-white relative overflow-hidden">
      
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Sports &amp; Fitness Department</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight">
              Explore Sports Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Gear Up. Play Better. Official match equipment for schools, local tournament clubs, and outdoor sports across Pachrukhi &amp; Siwan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('sports')}
              className="bg-gradient-to-r from-accent-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Shop All Sports</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onSelectCategory('sports-school-pe');
                onNavigate('shop');
              }}
              className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              School PE Packages
            </button>
          </div>
        </div>

        {/* 8 Prominent Sports Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {FEATURED_SPORTS_CATEGORIES.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectCategory(item.id);
                onNavigate('shop');
              }}
              className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                    {item.brandTag}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 font-heading transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
                <span>Top: {item.popularItem}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Local Trust Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Kashmir Willow Match Bats</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Official Size 5 Nivia Footballs</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Assam Plywood 32" Carrom Boards</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>School PE &amp; Sports Day Bundles</span>
            </span>
          </div>

          <button
            onClick={() => onNavigate('sports')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer shrink-0"
          >
            Explore Complete Sports Department →
          </button>
        </div>

      </div>
    </section>
  );
};
