import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';

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
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 lg:hidden shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentPage === 'home' ? 'text-brand-800' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentPage === 'shop' ? 'text-brand-800' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Shop</span>
        </button>

        <button
          onClick={() => {
            onNavigate('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => onNavigate('wishlist')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold relative transition-colors ${
            currentPage === 'wishlist' ? 'text-brand-800' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold relative text-brand-800 hover:text-brand-900 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-brand-700 text-white text-[9px] font-bold px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
};
