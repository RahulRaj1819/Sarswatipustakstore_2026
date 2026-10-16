import { 
  Product, 
  CartItem, 
  Order, 
  BooklistRequest, 
  CustomerEnquiry, 
  StoreSettings, 
  Coupon, 
  UserAccount,
  OrderStatus,
  SportsBulkEnquiry,
  StockMovement,
  StockMovementType,
  Department,
  ImportWorkflowType
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const STORAGE_KEYS = {
  PRODUCTS: 'spsb_products_v3',
  CART: 'spsb_cart_v2',
  WISHLIST: 'spsb_wishlist_v2',
  ORDERS: 'spsb_orders_v2',
  BOOKLIST_REQUESTS: 'spsb_booklist_requests_v2',
  ENQUIRIES: 'spsb_enquiries_v2',
  SPORTS_BULK_ENQUIRIES: 'spsb_sports_bulk_v2',
  CUSTOM_SPORTS_CATEGORIES: 'spsb_custom_sports_cats_v2',
  SETTINGS: 'spsb_settings_v2',
  COUPONS: 'spsb_coupons_v2',
  USER: 'spsb_user_v2',
  RECENT_SEARCHES: 'spsb_recent_searches_v2',
  STOCK_MOVEMENTS: 'spsb_stock_movements_v2'
};

export const rupeesToPaise = (rupees: number | string): number => {
  const val = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(val)) return 0;
  return Math.round(val * 100);
};

export const paiseToRupees = (paise: number | string): number => {
  const val = typeof paise === 'string' ? parseInt(paise, 10) : paise;
  if (isNaN(val)) return 0;
  return val / 100;
};

export const getProductDepartment = (product: Partial<Product>): Department => {
  if (product.department) return product.department;
  const cat = String(product.category || '').toLowerCase();
  if (
    cat === 'school-ncert' || 
    cat === 'bihar-board' || 
    cat === 'academic-books' || 
    cat === 'competitive-exams' || 
    cat === 'college-reference' ||
    Boolean(product.isbn) || 
    Boolean(product.board) || 
    Boolean(product.publisher)
  ) {
    return 'Books';
  }
  if (
    cat.startsWith('sports-') || 
    cat === 'sports-equipment' || 
    Boolean(product.sportName) || 
    Boolean(product.sportType)
  ) {
    return 'Sports';
  }
  return 'Stationery';
};

const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: 'mov-seed-001',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    sku: 'NCERT-SCI-10',
    productName: 'NCERT Science Textbook for Class 10',
    department: 'Books',
    movementType: 'Stock Addition (Purchase)',
    previousStock: 0,
    newStock: 50,
    quantityDelta: 50,
    note: 'Initial catalog batch delivery from NCERT Patna Wholesaler',
    referenceId: 'PO-2026-PAT-084',
    adminUser: 'Rahu1819'
  },
  {
    id: 'mov-seed-002',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    sku: 'NCERT-SCI-10',
    productName: 'NCERT Science Textbook for Class 10',
    department: 'Books',
    movementType: 'Store Sale',
    previousStock: 50,
    newStock: 45,
    quantityDelta: -5,
    note: 'Counter sale to Pachrukhi High School students',
    referenceId: 'POS-REC-10492',
    adminUser: 'Rahu1819'
  },
  {
    id: 'mov-seed-003',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    sku: 'SP-CRIC-BAT-01',
    productName: 'SG Tournament Kashmir Willow Cricket Bat',
    department: 'Sports',
    movementType: 'Stock Addition (Purchase)',
    previousStock: 0,
    newStock: 18,
    quantityDelta: 18,
    note: 'Direct consignment from Jalandhar / SG Sports Distributor',
    referenceId: 'PO-SG-JAL-4102',
    adminUser: 'Rahu1819'
  },
  {
    id: 'mov-seed-004',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
    sku: 'DOMS-NEON-KIT',
    productName: 'DOMS Neon Signature Stationery Kit',
    department: 'Stationery',
    movementType: 'Bulk Import Adjustment',
    previousStock: 0,
    newStock: 35,
    quantityDelta: 35,
    note: 'Spreadsheet initial inventory ingestion',
    referenceId: 'BATCH-IMP-001',
    adminUser: 'Rahu1819'
  }
];

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Sarswati Pustak and Sports Bhandar',
  tagline: 'Your Dependable Local Partner for Learning, Creativity & Sports Since 1990',
  phonePrimary: '070917 91893',
  phoneSecondary: '099734 03351',
  whatsappNumber: '917091791893',
  addressFull: '5C58+V4X, Main Road, Pachrukhi, Siwan, Bihar - 841241',
  plusCode: '5C58+V4X',
  pinCode: '841241',
  businessHours: 'Open Daily: 9:00 AM – 9:00 PM',
  announcementText: '🎯 New Academic Session 2026-27 Booklists & NCERT Textbooks Now in Stock! Use code SARSWATI10 for 10% OFF.',
  isAnnouncementActive: true,
  freeDeliveryThreshold: 499,
  standardDeliveryFee: 35,
  serviceablePinCodes: ['841241', '841226', '841227', '841242', '841245', '841243', '841286', '841228'],
  allowStorePickup: true,
  allowCOD: true,
  allowOnlinePayment: true,
  googleMapsUrl: 'https://share.google/tNanVAFslmQSrY6mj'
};

export const DEFAULT_COUPONS: Coupon[] = [
  {
    code: 'SARSWATI10',
    discountPercent: 10,
    minOrderValue: 299,
    maxDiscount: 150,
    description: 'Get 10% off on school textbooks, stationery & sports gear (Min order ₹299)',
    isActive: true
  },
  {
    code: 'WELCOME50',
    discountFlat: 50,
    minOrderValue: 499,
    description: 'Flat ₹50 off on orders above ₹499 for community students & parents',
    isActive: true
  },
  {
    code: 'SPORTSDAY',
    discountPercent: 15,
    minOrderValue: 999,
    maxDiscount: 300,
    description: '15% off on sports equipment & tournament gear',
    isActive: true
  }
];

export const StorageService = {
  // Products
  getProducts: (): Product[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const rawProducts: Product[] = data ? JSON.parse(data) : INITIAL_PRODUCTS;
      let updated = false;

      const enriched = rawProducts.map(prod => {
        const dept = getProductDepartment(prod);
        const costPrice = prod.costPrice ?? Math.round(prod.price * 0.75);
        const mrp = prod.mrp ?? prod.price;
        const costPricePaise = prod.costPricePaise ?? rupeesToPaise(costPrice);
        const sellingPricePaise = prod.sellingPricePaise ?? rupeesToPaise(prod.price);
        const mrpPaise = prod.mrpPaise ?? rupeesToPaise(mrp);
        const minStockThreshold = prod.minStockThreshold ?? 5;
        const taxRate = prod.taxRate ?? (dept === 'Books' ? 0 : dept === 'Sports' ? 12 : 18);
        const storageLocation = prod.storageLocation ?? (
          dept === 'Books' ? 'Rack-B2' : dept === 'Sports' ? 'Sports-Bay-1' : 'Shelf-S1'
        );
        const status = prod.status ?? 'Active';

        let images = prod.images;
        if (images && Array.isArray(images)) {
          images = images.map(img => {
            if (img.includes('photo-1532012164546-f432f2e3777a')) {
              updated = true;
              return img.replace('photo-1532012164546-f432f2e3777a', 'photo-1532094349884-543bc11b234d');
            }
            if (img.includes('photo-1531415074868-83633dd5e457')) {
              updated = true;
              return img.replace('photo-1531415074868-83633dd5e457', 'photo-1624526267942-ab0ff8a3e972');
            }
            if (img.includes('photo-1517649763962-0c623266ddc0')) {
              updated = true;
              return img.replace('photo-1517649763962-0c623266ddc0', 'photo-1461896836934-ffe607ba8211');
            }
            if (img.includes('photo-1585336261026-7788410b0a88')) {
              updated = true;
              return img.replace('photo-1585336261026-7788410b0a88', 'photo-1583485088034-697b5bc54ccd');
            }
            return img;
          });
        }

        if (
          prod.department !== dept ||
          prod.costPricePaise === undefined ||
          prod.sellingPricePaise === undefined ||
          prod.mrpPaise === undefined ||
          prod.minStockThreshold === undefined ||
          prod.taxRate === undefined ||
          prod.storageLocation === undefined ||
          prod.status === undefined
        ) {
          updated = true;
        }

        return {
          ...prod,
          images,
          department: dept,
          costPrice,
          mrp,
          costPricePaise,
          sellingPricePaise,
          mrpPaise,
          minStockThreshold,
          taxRate,
          storageLocation,
          status
        };
      });

      if (!data || updated) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(enriched));
      }
      return enriched;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  getProductById: (id: string): Product | undefined => {
    const products = StorageService.getProducts();
    return products.find(p => p.id === id || p.slug === id);
  },

  saveProduct: (product: Product, adminUser: string = 'Rahu1819'): void => {
    const products = StorageService.getProducts();
    const index = products.findIndex(p => p.id === product.id || p.sku === product.sku);
    
    // Ensure paise synchronization
    const price = product.price;
    const mrp = product.mrp ?? product.price;
    const costPrice = product.costPrice ?? Math.round(price * 0.75);
    const sellingPricePaise = product.sellingPricePaise ?? rupeesToPaise(price);
    const costPricePaise = product.costPricePaise ?? rupeesToPaise(costPrice);
    const mrpPaise = product.mrpPaise ?? rupeesToPaise(mrp);
    const dept = product.department || getProductDepartment(product);

    const readyProduct: Product = {
      ...product,
      department: dept,
      price,
      costPrice,
      mrp,
      sellingPricePaise,
      costPricePaise,
      mrpPaise,
      minStockThreshold: product.minStockThreshold ?? 5,
      taxRate: product.taxRate ?? (dept === 'Books' ? 0 : dept === 'Sports' ? 12 : 18),
      storageLocation: product.storageLocation ?? (dept === 'Books' ? 'Rack-B2' : dept === 'Sports' ? 'Sports-Bay-1' : 'Shelf-S1'),
      status: product.status ?? 'Active',
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      const prevStock = products[index].stock;
      products[index] = readyProduct;
      // Record stock change if any
      if (prevStock !== product.stock) {
        StorageService.addStockMovement({
          sku: product.sku,
          productName: product.name,
          department: dept,
          movementType: 'Manual Adjustment (Damage/Loss)',
          previousStock: prevStock,
          newStock: product.stock,
          quantityDelta: product.stock - prevStock,
          note: 'Stock updated via Product Editor',
          referenceId: `EDT-${Date.now().toString().slice(-6)}`,
          adminUser
        });
      }
    } else {
      readyProduct.createdAt = new Date().toISOString();
      products.unshift(readyProduct);
      if (product.stock > 0) {
        StorageService.addStockMovement({
          sku: product.sku,
          productName: product.name,
          department: dept,
          movementType: 'Stock Addition (Purchase)',
          previousStock: 0,
          newStock: product.stock,
          quantityDelta: product.stock,
          note: 'Initial stock on product creation',
          referenceId: `NEW-${Date.now().toString().slice(-6)}`,
          adminUser
        });
      }
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('spsb_products_updated'));
  },

  deleteProduct: (id: string): void => {
    const products = StorageService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('spsb_products_updated'));
  },

  updateStock: (id: string, newStock: number, movementType: StockMovementType = 'Manual Adjustment (Damage/Loss)', note?: string, adminUser: string = 'Rahu1819'): void => {
    StorageService.updateStockWithMovement(id, newStock, movementType, note, undefined, adminUser);
  },

  updateStockWithMovement: (
    skuOrId: string, 
    newStock: number, 
    movementType: StockMovementType = 'Manual Adjustment (Damage/Loss)', 
    note?: string, 
    referenceId?: string, 
    adminUser: string = 'Rahu1819'
  ): { product?: Product; movement?: StockMovement } => {
    const products = StorageService.getProducts();
    const product = products.find(p => p.id === skuOrId || p.sku === skuOrId);
    if (!product) return {};

    const previousStock = product.stock;
    const validatedNewStock = Math.max(0, Math.floor(newStock));
    const delta = validatedNewStock - previousStock;
    product.stock = validatedNewStock;
    product.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('spsb_products_updated'));

    let movement: StockMovement | undefined;
    if (delta !== 0) {
      movement = StorageService.addStockMovement({
        sku: product.sku,
        productName: product.name,
        department: product.department || 'Books',
        movementType,
        previousStock,
        newStock: validatedNewStock,
        quantityDelta: delta,
        note: note || `Stock updated from ${previousStock} to ${validatedNewStock}`,
        referenceId: referenceId || `ADJ-${Date.now().toString().slice(-6)}`,
        adminUser
      });
    }

    return { product, movement };
  },

  // Stock Movements & Audit Ledger
  getStockMovements: (): StockMovement[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STOCK_MOVEMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(INITIAL_STOCK_MOVEMENTS));
        return INITIAL_STOCK_MOVEMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_STOCK_MOVEMENTS;
    }
  },

  addStockMovement: (item: Omit<StockMovement, 'id' | 'timestamp'>): StockMovement => {
    const movements = StorageService.getStockMovements();
    const newMovement: StockMovement = {
      ...item,
      id: `mov-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    movements.unshift(newMovement);
    if (movements.length > 1000) movements.splice(1000);
    localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(movements));
    window.dispatchEvent(new Event('spsb_movements_updated'));
    return newMovement;
  },

  clearStockMovements: (): void => {
    localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify([]));
    window.dispatchEvent(new Event('spsb_movements_updated'));
  },

  // Bulk Upsert Products with atomic batches
  bulkUpsertProducts: (
    importedProducts: Partial<Product>[],
    workflow: ImportWorkflowType,
    batchId: string,
    adminUser: string = 'Rahu1819'
  ): { created: number; updated: number; movements: StockMovement[] } => {
    const currentProducts = StorageService.getProducts();
    let created = 0;
    let updated = 0;
    const movementsToRecord: StockMovement[] = [];
    const timestamp = new Date().toISOString();

    importedProducts.forEach(item => {
      if (!item.sku) return;
      const cleanSku = item.sku.trim();
      const existingIndex = currentProducts.findIndex(p => p.sku.toLowerCase() === cleanSku.toLowerCase());

      if (existingIndex >= 0) {
        // Skip existing in 'create_new' mode
        if (workflow === 'create_new') return;

        const prev = currentProducts[existingIndex];
        const newStock = item.stock !== undefined ? Math.max(0, Math.floor(Number(item.stock))) : prev.stock;
        const delta = newStock - prev.stock;

        const sellingPricePaise = item.sellingPricePaise ?? (item.price !== undefined ? rupeesToPaise(item.price) : prev.sellingPricePaise ?? rupeesToPaise(prev.price));
        const costPricePaise = item.costPricePaise ?? (item.costPrice !== undefined ? rupeesToPaise(item.costPrice) : prev.costPricePaise ?? rupeesToPaise(prev.costPrice ?? prev.price * 0.75));
        const mrpPaise = item.mrpPaise ?? (item.mrp !== undefined ? rupeesToPaise(item.mrp) : prev.mrpPaise ?? rupeesToPaise(prev.mrp ?? prev.price));

        currentProducts[existingIndex] = {
          ...prev,
          name: (workflow === 'full_upsert' && item.name) ? item.name : prev.name,
          category: (workflow === 'full_upsert' && item.category) ? item.category : prev.category,
          subcategory: (workflow === 'full_upsert' && item.subcategory) ? item.subcategory : prev.subcategory,
          department: item.department || prev.department,
          price: paiseToRupees(sellingPricePaise),
          costPrice: paiseToRupees(costPricePaise),
          mrp: paiseToRupees(mrpPaise),
          sellingPricePaise,
          costPricePaise,
          mrpPaise,
          stock: newStock,
          minStockThreshold: item.minStockThreshold !== undefined ? Number(item.minStockThreshold) : prev.minStockThreshold,
          taxRate: item.taxRate !== undefined ? Number(item.taxRate) : prev.taxRate,
          storageLocation: item.storageLocation ?? prev.storageLocation,
          status: item.status ?? prev.status,
          // Books
          isbn: item.isbn ?? prev.isbn,
          publisher: item.publisher ?? prev.publisher,
          author: item.author ?? prev.author,
          classGrade: item.classGrade ?? prev.classGrade,
          board: item.board ?? prev.board,
          subject: item.subject ?? prev.subject,
          editionYear: item.editionYear ?? prev.editionYear,
          // Stationery
          packSize: item.packSize ?? prev.packSize,
          itemColor: item.itemColor ?? prev.itemColor,
          ruling: item.ruling ?? prev.ruling,
          dimensions: item.dimensions ?? prev.dimensions,
          // Sports
          sportName: item.sportName ?? prev.sportName,
          size: item.size ?? prev.size,
          material: item.material ?? prev.material,
          playingLevel: item.playingLevel ?? prev.playingLevel,
          updatedAt: timestamp
        };

        if (delta !== 0) {
          movementsToRecord.push({
            id: `mov-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            timestamp,
            sku: prev.sku,
            productName: prev.name,
            department: prev.department || 'Books',
            movementType: 'Bulk Import Adjustment',
            previousStock: prev.stock,
            newStock,
            quantityDelta: delta,
            note: `Stock updated via spreadsheet bulk import (${workflow})`,
            referenceId: batchId,
            adminUser
          });
        }
        updated++;
      } else {
        // New Product
        if (workflow === 'update_stock_prices') return; // Skip in update mode

        const sellingPricePaise = item.sellingPricePaise ?? (item.price !== undefined ? rupeesToPaise(item.price) : 10000);
        const costPricePaise = item.costPricePaise ?? (item.costPrice !== undefined ? rupeesToPaise(item.costPrice) : Math.round(sellingPricePaise * 0.75));
        const mrpPaise = item.mrpPaise ?? (item.mrp !== undefined ? rupeesToPaise(item.mrp) : sellingPricePaise);
        const initialStock = item.stock !== undefined ? Math.max(0, Math.floor(Number(item.stock))) : 0;
        const dept = item.department || getProductDepartment(item);

        const newProd: Product = {
          id: item.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          sku: cleanSku,
          name: item.name || `Product ${cleanSku}`,
          slug: (item.name || cleanSku).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          department: dept,
          category: item.category || (dept === 'Books' ? 'school-ncert' : dept === 'Sports' ? 'sports-equipment' : 'stationery'),
          subcategory: item.subcategory || (dept === 'Books' ? 'General' : dept === 'Sports' ? 'Equipment' : 'Office & School'),
          description: item.description || `${item.name || cleanSku} available at Sarswati Pustak and Sports Bhandar, Pachrukhi, Siwan.`,
          price: paiseToRupees(sellingPricePaise),
          costPrice: paiseToRupees(costPricePaise),
          mrp: paiseToRupees(mrpPaise),
          sellingPricePaise,
          costPricePaise,
          mrpPaise,
          stock: initialStock,
          minStockThreshold: item.minStockThreshold !== undefined ? Number(item.minStockThreshold) : 5,
          taxRate: item.taxRate !== undefined ? Number(item.taxRate) : (dept === 'Books' ? 0 : dept === 'Sports' ? 12 : 18),
          storageLocation: item.storageLocation || (dept === 'Books' ? 'Rack-B1' : dept === 'Sports' ? 'Sports-Bay-1' : 'Shelf-S1'),
          status: item.status || 'Active',
          images: item.images && item.images.length ? item.images : [
            dept === 'Books' 
              ? 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
              : dept === 'Sports'
              ? 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
          ],
          brand: item.brand || (dept === 'Books' ? 'NCERT / State Board' : dept === 'Sports' ? 'Authentic Sports' : 'Classmate / DOMS'),
          isbn: item.isbn,
          publisher: item.publisher,
          author: item.author,
          classGrade: item.classGrade,
          board: item.board,
          subject: item.subject,
          editionYear: item.editionYear,
          packSize: item.packSize,
          itemColor: item.itemColor,
          ruling: item.ruling,
          dimensions: item.dimensions,
          sportName: item.sportName,
          size: item.size,
          material: item.material,
          playingLevel: item.playingLevel,
          tags: [dept.toLowerCase(), (item.name || '').toLowerCase()],
          createdAt: timestamp,
          updatedAt: timestamp
        };

        currentProducts.unshift(newProd);

        if (initialStock > 0) {
          movementsToRecord.push({
            id: `mov-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            timestamp,
            sku: cleanSku,
            productName: newProd.name,
            department: dept,
            movementType: 'Bulk Import Adjustment',
            previousStock: 0,
            newStock: initialStock,
            quantityDelta: initialStock,
            note: `Initial stock ingested via bulk spreadsheet import (${workflow})`,
            referenceId: batchId,
            adminUser
          });
        }
        created++;
      }
    });

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(currentProducts));
    window.dispatchEvent(new Event('spsb_products_updated'));

    if (movementsToRecord.length > 0) {
      const existingMovements = StorageService.getStockMovements();
      const updatedMovements = [...movementsToRecord, ...existingMovements].slice(0, 1000);
      localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(updatedMovements));
      window.dispatchEvent(new Event('spsb_movements_updated'));
    }

    return { created, updated, movements: movementsToRecord };
  },

  // Reset to initial catalogue
  resetCatalogue: (): void => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    window.dispatchEvent(new Event('spsb_products_updated'));
  },

  // Cart
  getCart: (): CartItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCart: (cart: CartItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new Event('spsb_cart_updated'));
  },

  addToCart: (product: Product, quantity: number = 1): void => {
    const cart = StorageService.getCart();
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    StorageService.saveCart(cart);
  },

  removeFromCart: (productId: string): void => {
    const cart = StorageService.getCart().filter(item => item.product.id !== productId);
    StorageService.saveCart(cart);
  },

  updateCartQuantity: (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      StorageService.removeFromCart(productId);
      return;
    }
    const cart = StorageService.getCart();
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      item.quantity = Math.min(quantity, item.product.stock);
      StorageService.saveCart(cart);
    }
  },

  clearCart: (): void => {
    StorageService.saveCart([]);
  },

  // Wishlist
  getWishlist: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleWishlist: (productId: string): boolean => {
    const wishlist = StorageService.getWishlist();
    const index = wishlist.indexOf(productId);
    let isAdded = false;
    if (index >= 0) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
      isAdded = true;
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('spsb_wishlist_updated'));
    return isAdded;
  },

  // Orders
  getOrders: (): Order[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!data) {
        // Seed 2 demo orders for realistic admin review
        const seedOrders: Order[] = [
          {
            id: 'ord-1001',
            orderNumber: 'SPSB-2026-8492',
            customer: {
              fullName: 'Amit Kumar Singh',
              phone: '9876543210',
              addressLine1: 'Near Block Chowk',
              villageOrLocality: 'Pachrukhi Bazaar',
              townOrCity: 'Pachrukhi',
              district: 'Siwan',
              state: 'Bihar',
              pinCode: '841241',
              deliveryInstructions: 'Deliver after 4 PM'
            },
            items: [
              {
                productId: 'prod-001',
                productName: 'NCERT Science Textbook for Class 10',
                sku: 'NCERT-SCI-10',
                price: 195,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80'
              },
              {
                productId: 'prod-020',
                productName: 'Classmate Long Notebook (Pack of 6)',
                sku: 'STAT-NOTE-CLASSMATE-6',
                price: 360,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80'
              }
            ],
            subtotal: 555,
            discountAmount: 55.5,
            couponCode: 'SARSWATI10',
            deliveryCharge: 0,
            totalAmount: 499.5,
            status: 'confirmed',
            paymentMethod: 'upi_online',
            paymentStatus: 'paid',
            transactionId: 'UPI-TXN-9849204',
            fulfilmentType: 'local_delivery',
            createdAt: '2026-03-01T14:30:00Z',
            updatedAt: '2026-03-01T15:00:00Z',
            statusHistory: [
              { status: 'pending_confirmation', timestamp: '2026-03-01T14:30:00Z', note: 'Order placed via UPI' },
              { status: 'confirmed', timestamp: '2026-03-01T15:00:00Z', note: 'Stock verified by store' }
            ]
          },
          {
            id: 'ord-1002',
            orderNumber: 'SPSB-2026-8495',
            customer: {
              fullName: 'Sunita Devi',
              phone: '9431209876',
              addressLine1: 'Teacher Colony, Near Railway Station',
              villageOrLocality: 'Pachrukhi',
              townOrCity: 'Pachrukhi',
              district: 'Siwan',
              state: 'Bihar',
              pinCode: '841241'
            },
            items: [
              {
                productId: 'prod-010',
                productName: 'Kashmir Willow Cricket Bat (Full Size)',
                sku: 'SPORT-BAT-KASHMIR',
                price: 1350,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=400&q=80'
              }
            ],
            subtotal: 1350,
            discountAmount: 0,
            deliveryCharge: 0,
            totalAmount: 1350,
            status: 'ready_for_pickup',
            paymentMethod: 'pay_at_store',
            paymentStatus: 'pending',
            fulfilmentType: 'store_pickup',
            pickupTimeSlot: 'Today Evening 5-7 PM',
            createdAt: '2026-03-02T11:15:00Z',
            updatedAt: '2026-03-02T11:45:00Z',
            statusHistory: [
              { status: 'pending_confirmation', timestamp: '2026-03-02T11:15:00Z', note: 'Customer reserved for pickup' },
              { status: 'confirmed', timestamp: '2026-03-02T11:25:00Z', note: 'Bat kept aside at billing counter' },
              { status: 'ready_for_pickup', timestamp: '2026-03-02T11:45:00Z', note: 'Customer notified on WhatsApp' }
            ]
          }
        ];
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(seedOrders));
        return seedOrders;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  getOrderById: (orderNumberOrId: string): Order | undefined => {
    const orders = StorageService.getOrders();
    const query = orderNumberOrId.trim().toUpperCase();
    return orders.find(o => 
      o.id.toUpperCase() === query || 
      o.orderNumber.toUpperCase() === query
    );
  },

  getOrdersByPhone: (phone: string): Order[] => {
    const cleanPhone = phone.replace(/\D/g, '');
    const orders = StorageService.getOrders();
    return orders.filter(o => o.customer.phone.replace(/\D/g, '').includes(cleanPhone));
  },

  createOrder: (order: Order): void => {
    const orders = StorageService.getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    // Decrement stock for purchased items
    order.items.forEach(item => {
      const product = StorageService.getProductById(item.productId);
      if (product) {
        StorageService.updateStock(product.id, product.stock - item.quantity);
      }
    });

    window.dispatchEvent(new Event('spsb_orders_updated'));
  },

  updateOrderStatus: (orderId: string, newStatus: OrderStatus, adminNote?: string): void => {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      if (newStatus === 'delivered') {
        order.paymentStatus = 'paid';
      }
      order.statusHistory.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: adminNote || `Status updated to ${newStatus.replace(/_/g, ' ')}`
      });
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      window.dispatchEvent(new Event('spsb_orders_updated'));
    }
  },

  // School Booklist Requests
  getBooklistRequests: (): BooklistRequest[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKLIST_REQUESTS);
      if (!data) {
        const seedRequests: BooklistRequest[] = [
          {
            id: 'blr-001',
            referenceNumber: 'BL-8412-101',
            schoolName: 'DAV Public School, Kandhwara, Siwan',
            classGrade: 'Class 10',
            academicSession: '2026-2027 (Upcoming)',
            parentName: 'Rajesh Prasad',
            phone: '9835012345',
            whatsapp: '9835012345',
            address: 'Village Tarwara, Siwan',
            notes: 'Please include R.D. Sharma reference maths book if available.',
            status: 'quoted',
            quoteAmount: 1850,
            createdAt: '2026-03-01T09:30:00Z'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.BOOKLIST_REQUESTS, JSON.stringify(seedRequests));
        return seedRequests;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  createBooklistRequest: (request: BooklistRequest): void => {
    const requests = StorageService.getBooklistRequests();
    requests.unshift(request);
    localStorage.setItem(STORAGE_KEYS.BOOKLIST_REQUESTS, JSON.stringify(requests));
    window.dispatchEvent(new Event('spsb_booklists_updated'));
  },

  updateBooklistStatus: (id: string, status: BooklistRequest['status'], quoteAmount?: number): void => {
    const requests = StorageService.getBooklistRequests();
    const req = requests.find(r => r.id === id || r.referenceNumber === id);
    if (req) {
      req.status = status;
      if (quoteAmount !== undefined) req.quoteAmount = quoteAmount;
      localStorage.setItem(STORAGE_KEYS.BOOKLIST_REQUESTS, JSON.stringify(requests));
      window.dispatchEvent(new Event('spsb_booklists_updated'));
    }
  },

  // Customer Enquiries
  getEnquiries: (): CustomerEnquiry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  createEnquiry: (enquiry: CustomerEnquiry): void => {
    const enquiries = StorageService.getEnquiries();
    enquiries.unshift(enquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    window.dispatchEvent(new Event('spsb_enquiries_updated'));
  },

  // Sports Bulk & Tournament Enquiries
  getSportsBulkEnquiries: (): SportsBulkEnquiry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SPORTS_BULK_ENQUIRIES);
      if (!data) {
        const seedSportsBulk: SportsBulkEnquiry[] = [
          {
            id: 'sp-enq-101',
            referenceNumber: 'SPSB-SP-2026-101',
            institutionOrTeam: 'Pachrukhi Premier League (PPL Cricket Club)',
            contactPerson: 'Vikash Kumar Yadav',
            phone: '9835098765',
            whatsapp: '9835098765',
            sportsNeeded: ['Cricket', 'Sportswear and Accessories'],
            estimatedQuantities: '6 Kashmir Willow Bats, 12 Cosco Tennis Balls, 4 Batting Pads pairs, 2 Stumps sets, 15 Team Jerseys',
            estimatedBudget: '₹15,000 - ₹20,000',
            requiredByDate: '2026-03-25',
            addressOrLocation: 'High School Ground, Pachrukhi',
            notes: 'Annual Holi tournament. Need delivery 3 days before tournament date.',
            status: 'quoted',
            quoteAmount: 16800,
            createdAt: '2026-03-02T10:30:00Z'
          },
          {
            id: 'sp-enq-102',
            referenceNumber: 'SPSB-SP-2026-102',
            institutionOrTeam: 'Don Bosco High School, Siwan',
            contactPerson: 'Father Joseph / PE Master Rajesh',
            phone: '9430812345',
            whatsapp: '9430812345',
            sportsNeeded: ['School Sports and Physical Education', 'Football', 'Volleyball', 'Athletics and Track & Field'],
            estimatedQuantities: '4 Nivia Footballs, 3 Volleyballs, 2 Net Sets, 8 Relay Batons, 20 Agility Cones, 2 Fox 40 Whistles',
            estimatedBudget: '₹12,000 - ₹15,000',
            requiredByDate: '2026-04-05',
            addressOrLocation: 'Mairwa Road, Siwan',
            notes: 'Preparing for annual inter-house sports meet.',
            status: 'pending',
            createdAt: '2026-03-03T11:00:00Z'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.SPORTS_BULK_ENQUIRIES, JSON.stringify(seedSportsBulk));
        return seedSportsBulk;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  createSportsBulkEnquiry: (enquiry: SportsBulkEnquiry): void => {
    const list = StorageService.getSportsBulkEnquiries();
    list.unshift(enquiry);
    localStorage.setItem(STORAGE_KEYS.SPORTS_BULK_ENQUIRIES, JSON.stringify(list));
    window.dispatchEvent(new Event('spsb_sports_bulk_updated'));
  },

  updateSportsBulkEnquiryStatus: (id: string, status: SportsBulkEnquiry['status'], quoteAmount?: number, notes?: string): void => {
    const list = StorageService.getSportsBulkEnquiries();
    const item = list.find(e => e.id === id || e.referenceNumber === id);
    if (item) {
      item.status = status;
      if (quoteAmount !== undefined) item.quoteAmount = quoteAmount;
      if (notes) item.notes = notes;
      localStorage.setItem(STORAGE_KEYS.SPORTS_BULK_ENQUIRIES, JSON.stringify(list));
      window.dispatchEvent(new Event('spsb_sports_bulk_updated'));
    }
  },

  // Custom Sports Categories (Allows admin to create additional sports categories dynamically)
  getCustomSportsCategories: (): any[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_SPORTS_CATEGORIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomSportsCategory: (category: any): void => {
    const list = StorageService.getCustomSportsCategories();
    list.push(category);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SPORTS_CATEGORIES, JSON.stringify(list));
    window.dispatchEvent(new Event('spsb_categories_updated'));
  },

  // Store Settings
  getSettings: (): StoreSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(data);
      return { 
        ...DEFAULT_SETTINGS, 
        ...parsed, 
        googleMapsUrl: parsed.googleMapsUrl || DEFAULT_SETTINGS.googleMapsUrl 
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: (settings: StoreSettings): void => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new Event('spsb_settings_updated'));
  },

  // Coupons
  getCoupons: (): Coupon[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return data ? JSON.parse(data) : DEFAULT_COUPONS;
    } catch {
      return DEFAULT_COUPONS;
    }
  },

  saveCoupons: (coupons: Coupon[]): void => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    window.dispatchEvent(new Event('spsb_coupons_updated'));
  },

  // User Authentication & Profile
  getUser: (): UserAccount | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUser: (user: UserAccount | null): void => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    window.dispatchEvent(new Event('spsb_user_updated'));
  },

  // Search History
  getRecentSearches: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return data ? JSON.parse(data) : ['NCERT Science Class 10', 'Cricket Bat', 'Classmate Notebook', 'Casio Calculator'];
    } catch {
      return [];
    }
  },

  addRecentSearch: (query: string): void => {
    if (!query.trim()) return;
    const searches = StorageService.getRecentSearches().filter(s => s.toLowerCase() !== query.toLowerCase());
    searches.unshift(query.trim());
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(searches.slice(0, 8)));
  }
};
