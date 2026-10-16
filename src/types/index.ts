export type ProductCategory = 
  | 'all'
  | 'academic-books'
  | 'school-ncert'
  | 'bihar-board'
  | 'competitive-exams'
  | 'college-reference'
  | 'notebooks'
  | 'pens-writing'
  | 'stationery'
  | 'art-craft'
  | 'school-bags'
  | 'sports-equipment'
  | 'school-kits'
  // Dedicated Sports Categories
  | 'sports-cricket'
  | 'sports-football'
  | 'sports-badminton'
  | 'sports-volleyball'
  | 'sports-basketball'
  | 'sports-table-tennis'
  | 'sports-athletics'
  | 'sports-fitness'
  | 'sports-indoor-games'
  | 'sports-school-pe'
  | 'sports-accessories';

export type Department = 'Books' | 'Stationery' | 'Sports';

export type ProductStatus = 'Active' | 'Draft' | 'Archived';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  mrp?: number;
  stock: number;
  attributes?: Record<string, string>; // e.g. { size: 'Size 5', color: 'Blue' }
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  department?: Department; // 'Books' | 'Stationery' | 'Sports'
  category: ProductCategory;
  subcategory?: string;
  description: string;
  price: number; // In Rupees
  costPrice?: number; // In Rupees
  mrp?: number; // In Rupees
  costPricePaise?: number; // Stored as integer BigInt paise
  sellingPricePaise?: number; // Stored as integer BigInt paise
  mrpPaise?: number; // Stored as integer BigInt paise
  stock: number;
  minStockThreshold?: number; // Default 5
  taxRate?: number; // GST % (0, 5, 12, 18)
  storageLocation?: string; // Shelf tag, e.g. "Rack-B3", "Sports-Bin-1"
  status?: ProductStatus; // 'Active' | 'Draft' | 'Archived'
  images: string[];
  brand?: string;
  
  // Department-Specific: Books
  author?: string;
  publisher?: string;
  isbn?: string;
  classGrade?: string; // e.g. "Class 10", "Class 6-8"
  board?: 'NCERT / CBSE' | 'Bihar Board' | 'ICSE' | 'General';
  subject?: string;
  editionYear?: string;

  // Department-Specific: Stationery
  packSize?: string; // e.g., "Pack of 5", "Box of 20"
  itemColor?: string; // e.g., "Blue", "Black", "Assorted"
  ruling?: 'Ruled' | 'Plain' | 'Interleaf' | 'Four Line' | string;
  dimensions?: string; // e.g., "A4 (210 x 297 mm)"

  // Department-Specific: Sports
  sportName?: string;
  size?: string; // e.g. 'Size 5', 'Short Handle', 'UK 8'
  material?: string; // e.g. 'Kashmir Willow', 'English Willow', 'PU', 'Nylon'
  playingLevel?: 'Beginner' | 'Club' | 'Tournament' | 'Professional' | string;
  sportType?: string;
  sportAttributes?: {
    batType?: string;
    ballType?: string;
    ballSize?: string;
    playingSurface?: string;
    racketMaterial?: string;
    gripSize?: string;
    dimensions?: string;
    kitItemsIncluded?: string[];
    targetLevel?: string;
  };

  isFeatured?: boolean;
  isDealOfDay?: boolean;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  specifications?: Record<string, string>;
  weightGrams?: number;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export type StockMovementType = 
  | 'Stock Addition (Purchase)'
  | 'Store Sale'
  | 'Online Order'
  | 'WhatsApp Order'
  | 'Manual Adjustment (Damage/Loss)'
  | 'Bulk Import Adjustment';

export interface StockMovement {
  id: string;
  timestamp: string;
  sku: string;
  productName: string;
  department: Department;
  movementType: StockMovementType;
  previousStock: number;
  newStock: number;
  quantityDelta: number; // positive or negative
  note?: string;
  referenceId?: string; // e.g. PO #, Order #, Import Batch #
  adminUser: string; // 'Rahu1819'
}

export type ImportWorkflowType = 
  | 'create_new' 
  | 'update_stock_prices' 
  | 'full_upsert';

export interface SpreadsheetColumnMapping {
  sku: string;
  name: string;
  department: string;
  category: string;
  subcategory: string;
  sellingPrice: string;
  costPrice: string;
  mrp: string;
  stock: string;
  minStockThreshold: string;
  taxRate: string;
  storageLocation: string;
  status: string;
  barcode: string;
  // Books
  isbn: string;
  publisher: string;
  author: string;
  classGrade: string;
  board: string;
  subject: string;
  editionYear: string;
  // Stationery
  packSize: string;
  itemColor: string;
  ruling: string;
  dimensions: string;
  // Sports
  sportName: string;
  size: string;
  material: string;
  playingLevel: string;
}

export interface ImportValidationRow {
  rowNumber: number;
  raw: Record<string, any>;
  parsedSku: string;
  parsedName: string;
  parsedDepartment: Department;
  parsedSellingPricePaise: number;
  parsedCostPricePaise: number;
  parsedMrpPaise: number;
  parsedStock: number;
  parsedMinStock: number;
  parsedTaxRate: number;
  parsedLocation: string;
  status: 'valid' | 'warning' | 'fatal_error';
  messages: string[];
}

export interface ImportExecutionReport {
  batchId: string;
  workflow: ImportWorkflowType;
  totalRows: number;
  processedCount: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  failedCount: number;
  timestamp: string;
}

export interface SportsBulkEnquiry {
  id: string;
  referenceNumber: string; // e.g. "SPSB-SP-2026-101"
  institutionOrTeam: string;
  contactPerson: string;
  phone: string;
  whatsapp?: string;
  sportsNeeded: string[];
  estimatedQuantities: string;
  estimatedBudget?: string;
  requiredByDate?: string;
  addressOrLocation: string;
  notes?: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'fulfilled';
  quoteAmount?: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export type OrderStatus = 
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'ready_for_pickup'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'upi_online'
  | 'card_netbanking'
  | 'cod'
  | 'pay_at_store';

export type FulfilmentType = 'store_pickup' | 'local_delivery';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  altPhone?: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  villageOrLocality: string;
  townOrCity: string;
  district: string;
  state: string;
  pinCode: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "SPSB-2026-8492"
  customer: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryCharge: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  transactionId?: string;
  fulfilmentType: FulfilmentType;
  pickupTimeSlot?: string;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface BooklistRequest {
  id: string;
  referenceNumber: string; // e.g. "BL-8412-101"
  schoolName: string;
  classGrade: string;
  academicSession: string;
  parentName: string;
  phone: string;
  whatsapp: string;
  address?: string;
  notes?: string;
  booklistImageUrl?: string;
  selectedItems?: {
    name: string;
    subject?: string;
    publisher?: string;
  }[];
  status: 'pending' | 'quoted' | 'accepted' | 'fulfilled' | 'closed';
  quoteAmount?: number;
  createdAt: string;
}

export interface CustomerEnquiry {
  id: string;
  type: 'general' | 'bulk_school' | 'coaching_supplies' | 'sports_team' | 'product_request';
  name: string;
  phone: string;
  email?: string;
  organization?: string; // School / Coaching / Club
  subject: string;
  message: string;
  productRequested?: string;
  quantityNeeded?: number;
  targetDate?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  addressFull: string;
  plusCode: string;
  pinCode: string;
  businessHours: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  serviceablePinCodes: string[];
  allowStorePickup: boolean;
  allowCOD: boolean;
  allowOnlinePayment: boolean;
  googleMapsUrl?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  savedAddresses: CustomerAddress[];
  role: 'customer' | 'admin';
}
