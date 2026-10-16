import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileNavProps {
  currentPage: string;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenCart
}) => {
  const { t } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 py-1.5 px-2 lg:hidden shadow-lg transition-colors">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentPage === 'home' 
              ? 'text-brand-800 dark:text-amber-400 scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t('mobileNav.home')}</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            currentPage === 'shop' 
              ? 'text-brand-800 dark:text-amber-400 scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>{t('mobileNav.shop')}</span>
        </button>

        <button
          onClick={() => {
            onNavigate('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span>{t('mobileNav.search')}</span>
        </button>

        <button
          onClick={() => onNavigate('wishlist')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold relative transition-all cursor-pointer ${
            currentPage === 'wishlist' 
              ? 'text-brand-800 dark:text-amber-400 scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
          <span>{t('mobileNav.wishlist')}</span>
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold relative text-brand-800 dark:text-amber-400 hover:text-brand-900 transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-brand-700 dark:bg-accent-orange text-white text-[9px] font-bold px-1 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span>{t('mobileNav.cart')}</span>
        </button>
      </div>
    </nav>
  );
};
