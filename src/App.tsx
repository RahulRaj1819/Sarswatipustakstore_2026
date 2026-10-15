import React, { useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  BooklistRequest, 
  CustomerEnquiry, 
  StoreSettings, 
  Coupon, 
  ProductCategory 
} from './types';
import { StorageService } from './services/storage';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileNav } from './components/common/MobileNav';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ProductModal } from './components/products/ProductModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { BooklistWizardModal } from './components/booklist/BooklistWizardModal';
import { BulkEnquiryModal } from './components/enquiry/BulkEnquiryModal';
import { ProductRequestModal } from './components/enquiry/ProductRequestModal';
import { SportsBulkModal } from './components/sports/SportsBulkModal';
import { TimedEngageModal } from './components/common/TimedEngageModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SportsPage } from './pages/SportsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPage } from './pages/PolicyPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  // Global persistent state
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [cart, setCart] = useState<CartItem[]>(() => StorageService.getCart());
  const [wishlist, setWishlist] = useState<string[]>(() => StorageService.getWishlist());
  const [orders, setOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [booklists, setBooklists] = useState<BooklistRequest[]>(() => StorageService.getBooklistRequests());
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => StorageService.getEnquiries());
  const [settings, setSettings] = useState<StoreSettings>(() => StorageService.getSettings());
  const [coupons, setCoupons] = useState<Coupon[]>(() => StorageService.getCoupons());

  // Routing & Filter state
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (window.location.hash) {
      const h = window.location.hash.replace('#', '');
      if (h) return h;
    }
    if (window.location.pathname.includes('/sports')) return 'sports';
    return 'home';
  });
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers state
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isBooklistWizardOpen, setIsBooklistWizardOpen] = useState(false);
  const [isBulkEnquiryOpen, setIsBulkEnquiryOpen] = useState(false);
  const [isProductRequestOpen, setIsProductRequestOpen] = useState(false);
  const [isSportsBulkModalOpen, setIsSportsBulkModalOpen] = useState(false);
  const [isEngageModalOpen, setIsEngageModalOpen] = useState(false);
  const [productRequestQuery, setProductRequestQuery] = useState('');

  // Order Flow state
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('');

  // Interactive Toast Notification State
  const [toast, setToast] = useState<{ id: string; message: string; actionLabel?: string; onAction?: () => void } | null>(null);

  const showToast = (message: string, actionLabel?: string, onAction?: () => void) => {
    setToast({ id: String(Date.now()), message, actionLabel, onAction });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Synchronize state on custom storage events
  const refreshAllData = () => {
    setProducts(StorageService.getProducts());
    setCart(StorageService.getCart());
    setWishlist(StorageService.getWishlist());
    setOrders(StorageService.getOrders());
    setBooklists(StorageService.getBooklistRequests());
    setEnquiries(StorageService.getEnquiries());
    setSettings(StorageService.getSettings());
    setCoupons(StorageService.getCoupons());
  };

  useEffect(() => {
    window.addEventListener('spsb_products_updated', refreshAllData);
    window.addEventListener('spsb_cart_updated', refreshAllData);
    window.addEventListener('spsb_wishlist_updated', refreshAllData);
    window.addEventListener('spsb_orders_updated', refreshAllData);
    window.addEventListener('spsb_booklists_updated', refreshAllData);
    window.addEventListener('spsb_sports_bulk_updated', refreshAllData);
    window.addEventListener('spsb_settings_updated', refreshAllData);

    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setCurrentPage(h);
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('spsb_products_updated', refreshAllData);
      window.removeEventListener('spsb_cart_updated', refreshAllData);
      window.removeEventListener('spsb_wishlist_updated', refreshAllData);
      window.removeEventListener('spsb_orders_updated', refreshAllData);
      window.removeEventListener('spsb_booklists_updated', refreshAllData);
      window.removeEventListener('spsb_sports_bulk_updated', refreshAllData);
      window.removeEventListener('spsb_settings_updated', refreshAllData);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to top on page change
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    StorageService.addToCart(product, quantity);
    showToast(`Added "${product.name}" to cart`, 'View Cart', () => setIsCartDrawerOpen(true));
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    StorageService.updateCartQuantity(productId, quantity);
  };

  const handleRemoveFromCart = (productId: string) => {
    StorageService.removeFromCart(productId);
  };

  const handleClearCart = () => {
    StorageService.clearCart();
  };

  // Wishlist action
  const handleToggleWishlist = (productId: string) => {
    StorageService.toggleWishlist(productId);
    const isNowWishlisted = !wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    showToast(
      isNowWishlisted 
        ? `Saved ${prod ? `"${prod.name}"` : 'item'} to Wishlist` 
        : 'Removed from Wishlist',
      isNowWishlisted ? 'View Wishlist' : undefined,
      isNowWishlisted ? () => navigateTo('wishlist') : undefined
    );
  };

  // Quick view / product modal
  const handleOpenProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    StorageService.addToCart(product, quantity);
    setSelectedProductForModal(null);
    navigateTo('checkout');
  };

  // Order Placement
  const handleOrderPlaced = (order: Order) => {
    setLastPlacedOrder(order);
    navigateTo('order-confirmation');
  };

  // Direct Track Order
  const handleTrackOrder = (orderNumber: string) => {
    setTrackingOrderNumber(orderNumber);
    navigateTo('track-order');
  };

  // Open Product Request modal
  const handleOpenProductRequest = (query: string = '') => {
    setProductRequestQuery(query);
    setIsProductRequestOpen(true);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-brand-600 selection:text-white transition-colors duration-200">
      
      {/* 1. Main Navigation Header */}
      {currentPage !== 'admin' && (
        <Header
          settings={settings}
          products={products}
          cartCount={cartCount}
          cartTotal={cartTotal}
          wishlistCount={wishlistCount}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
          }}
          onOpenCart={() => setIsCartDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBooklist={() => setIsBooklistWizardOpen(true)}
          onOpenProductModal={handleOpenProductModal}
        />
      )}

      {/* 2. Main Routed View Area */}
      <main className="flex-1 pb-20 lg:pb-0">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            settings={settings}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleOpenProductModal}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              navigateTo('shop');
            }}
            onNavigate={navigateTo}
            onOpenBooklist={() => setIsBooklistWizardOpen(true)}
            onOpenProductModal={handleOpenProductModal}
          />
        )}

        {currentPage === 'sports' && (
          <SportsPage
            products={products}
            settings={settings}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleOpenProductModal}
            onOpenProductModal={handleOpenProductModal}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              navigateTo('shop');
            }}
            onNavigate={navigateTo}
            onOpenBulkSportsEnquiry={() => setIsSportsBulkModalOpen(true)}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            settings={settings}
            wishlist={wishlist}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectCategory={setActiveCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleOpenProductModal}
            onOpenProductModal={handleOpenProductModal}
            onOpenProductRequestModal={handleOpenProductRequest}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            items={cart}
            settings={settings}
            coupons={coupons}
            allProducts={products}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => navigateTo('checkout')}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            items={cart}
            settings={settings}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'order-confirmation' && (
          <OrderConfirmationPage
            order={lastPlacedOrder}
            settings={settings}
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentPage === 'track-order' && (
          <TrackOrderPage
            initialOrderNumber={trackingOrderNumber}
            settings={settings}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlist}
            products={products}
            settings={settings}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleOpenProductModal}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            settings={settings}
            onNavigate={navigateTo}
            onOpenBooklist={() => setIsBooklistWizardOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            settings={settings}
          />
        )}

        {currentPage === 'faq' && (
          <FAQPage />
        )}

        {currentPage === 'policy-shipping' && (
          <PolicyPage initialTab="shipping" />
        )}

        {currentPage === 'policy-returns' && (
          <PolicyPage initialTab="returns" />
        )}

        {currentPage === 'policy-privacy' && (
          <PolicyPage initialTab="privacy" />
        )}

        {currentPage === 'policy-terms' && (
          <PolicyPage initialTab="terms" />
        )}

        {currentPage === 'account' && (
          <AccountPage
            orders={orders}
            onNavigate={navigateTo}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            products={products}
            orders={orders}
            booklistRequests={booklists}
            enquiries={enquiries}
            settings={settings}
            onRefreshData={refreshAllData}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* 4. Global Modals and Drawers */}
      <ProductModal
        product={selectedProductForModal}
        settings={settings}
        isWishlisted={selectedProductForModal ? wishlist.includes(selectedProductForModal.id) : false}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        items={cart}
        settings={settings}
        coupons={coupons}
        onClose={() => setIsCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          navigateTo('checkout');
        }}
        onNavigate={navigateTo}
      />

      <BooklistWizardModal
        isOpen={isBooklistWizardOpen}
        settings={settings}
        onClose={() => setIsBooklistWizardOpen(false)}
        onRequestSubmitted={() => refreshAllData()}
      />

      <BulkEnquiryModal
        isOpen={isBulkEnquiryOpen}
        settings={settings}
        onClose={() => setIsBulkEnquiryOpen(false)}
      />

      <ProductRequestModal
        isOpen={isProductRequestOpen}
        initialQuery={productRequestQuery}
        settings={settings}
        onClose={() => setIsProductRequestOpen(false)}
      />

      <SportsBulkModal
        isOpen={isSportsBulkModalOpen}
        settings={settings}
        onClose={() => setIsSportsBulkModalOpen(false)}
        onEnquirySubmitted={() => refreshAllData()}
      />

      {/* 5-Minute Timed & On-Demand Engagement Modal (Account + Feedback) */}
      <TimedEngageModal
        isOpen={isEngageModalOpen}
        onClose={() => setIsEngageModalOpen(false)}
      />

      {/* 5. Floating WhatsApp Button & Support Trigger */}
      {currentPage !== 'admin' && (
        <WhatsAppButton
          settings={settings}
          onOpenBooklist={() => setIsBooklistWizardOpen(true)}
          onOpenEnquiry={() => setIsBulkEnquiryOpen(true)}
        />
      )}

      {/* 6. Sticky Mobile Navigation Bar */}
      {currentPage !== 'admin' && (
        <MobileNav
          currentPage={currentPage}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onNavigate={navigateTo}
          onOpenCart={() => setIsCartDrawerOpen(true)}
        />
      )}

      {/* 7. Comprehensive Footer */}
      {currentPage !== 'admin' && (
        <Footer
          settings={settings}
          onNavigate={navigateTo}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            navigateTo('shop');
          }}
          onOpenBooklist={() => setIsBooklistWizardOpen(true)}
          onOpenFeedbackModal={() => setIsEngageModalOpen(true)}
        />
      )}

      {/* 8. Global Interactive Toast Feedback */}
      {toast && (
        <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span className="line-clamp-1 max-w-[220px] sm:max-w-sm">{toast.message}</span>
          {toast.actionLabel && (
            <button
              onClick={() => {
                toast.onAction?.();
                setToast(null);
              }}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
