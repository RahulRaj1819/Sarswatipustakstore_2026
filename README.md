# Sarswati Pustak and Sports Bhandar
### 📚 Books, Stationery & Sports Retail Platform + Inventory Management System (IMS)

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)
[![Location](https://img.shields.io/badge/Store-Pachrukhi%2C%20Siwan%2C%20Bihar-orange)](#)

> **Store Address:** Main Road, Pachrukhi, Siwan, Bihar — 841241  
> **Contact / WhatsApp:** +91 99312 84124 | **Email:** contact@sarswatibhandar.in  
> A unified, high-performance retail storefront and administrative Inventory Management System built specifically for rural & semi-urban retail commerce in Bihar.

---

## 📑 Table of Contents
- [Admin Access & Security](#-admin-access--security)
- [System Architecture & Core Capabilities](#-system-architecture--core-capabilities)
- [Product Domains & Schema](#-product-domains--schema)
- [Spreadsheet Import & Export Engine](#-spreadsheet-import--export-engine)
- [Barcode Scanner & Fast POS Adjuster](#-barcode-scanner--fast-pos-adjuster)
- [Low Stock Alerts & WhatsApp Reordering](#-low-stock-alerts--whatsapp-reordering)
- [Immutable Stock Audit Ledger](#-immutable-stock-audit-ledger)
- [Customer Storefront Features](#-customer-storefront-features)
- [Tech Stack](#-tech-stack)
- [Local Development & Setup](#-local-development--setup)
- [Project Directory Structure](#-project-directory-structure)

---

## 🔐 Admin Access & Security

Access to the Administrative Dashboard and Inventory Control Center is protected by a dedicated security gate.

| Field | Value |
| :--- | :--- |
| **Admin Portal URL** | Access via the **"Admin Panel"** navigation button or `/admin` route |
| **Admin ID / Username** | `Rahu1819` |
| **Admin Password** | `Ritadevi@181920` |
| **Role** | Store Owner / Master Administrator |

### Security Features
- **Session Protection:** Secure session token stored in browser session storage; auto-invalidated on logout or timeout.
- **Fail-Safe Gate:** Direct URL navigations to `/admin` are intercepted by the authentication barrier.
- **Audit Logging:** Administrative actions (bulk imports, manual overrides, price adjustments) are immutably logged with the admin operator ID.

---

## 🏛️ System Architecture & Core Capabilities

The system addresses the unique operational realities of managing an omni-channel book, stationery, and sports shop in Siwan, Bihar:

1. **Integer Paise Financial Precision (`price_paise`)**:
   - Floating-point arithmetic errors in JavaScript (`0.1 + 0.2 = 0.30000000000000004`) can cause balance discrepancies during bulk imports and reconciliation.
   - All monetary figures (`price_paise`, `mrp_paise`, `cost_price_paise`) are stored as **exact integers in paise** (e.g., `₹199.50` = `19950`).
   - A dual-currency layer automatically converts between user-facing Rupee decimals and storage-grade Paise.

2. **Zero-Latency Offline-First Storage**:
   - Products, stock movements, cart state, and audit logs are persisted via high-throughput local storage abstractions with batch mutation locks.
   - Built to handle unreliable network connections without interrupting retail counter checkout.

---

## 📦 Product Domains & Schema

The catalog engine supports dynamic product attributes tailored to 3 distinct retail domains:

### 1. 📖 Academic & Competitive Books
- **Attributes:** Board (`CBSE`, `Bihar State Board (BSEB)`, `ICSE`), Class/Grade (`1st - 12th`, `Graduation`), Subject, Medium (`Hindi`, `English`, `Urdu`), Publisher (`NCERT`, `Bharati Bhawan`, `S. Chand`, `Arihant`), Edition Year, ISBN-10 / ISBN-13.
- **Use Cases:** School textbook package distribution, competitive examination guidebooks (BPSC, SSC, Railway, Banking).

### 2. ✏️ School & Office Stationery
- **Attributes:** Brand (`Classmate`, `Camlin`, `Doms`, `Nataraj`), Item Type (`Notebooks`, `Pens`, `Art Supplies`, `Registers`), Pack Size (`Single`, `Pack of 5`, `Box of 20`), Color, Dimensions / Ruling (`Ruled`, `Unruled`, `Square`).

### 3. 🏸 Sports Equipment & Fitness
- **Attributes:** Sport (`Cricket`, `Badminton`, `Football`, `Volleyball`), Brand (`Cosco`, `Yonex`, `SG`, `Nivia`), Size (`Full Size`, `Size 3/4/5`), Material (`English Willow`, `Kashmir Willow`, `Leather`, `PU`), Weight.

---

## 📊 Spreadsheet Import & Export Engine

A high-speed bulk ingestion system built with `xlsx` (SheetJS) allowing instant catalog updates from Excel or CSV files.

### Workflow & Capabilities
- **Supported Formats:** `.xlsx`, `.xls`, and `.csv`.
- **Intelligent Header Alias Mapping:** Automatically recognizes common Indian retail spreadsheet headers:
  - *SKU / Barcode:* `sku`, `barcode`, `code`, `isbn`, `item code`
  - *Product Name:* `name`, `title`, `book title`, `item name`, `product`
  - *Selling Price:* `price`, `selling price`, `sp`, `our price`, `rate`
  - *MRP:* `mrp`, `list price`, `maximum retail price`
  - *Cost Price:* `cost`, `cost price`, `cp`, `purchase price`
  - *Stock:* `stock`, `quantity`, `qty`, `inventory`, `balance`
  - *Category:* `category`, `department`, `type`, `domain`
- **10-Row Dry-Run Preview:** Live visual table displays mapped values, flags invalid fields in real-time, and calculates summary metrics before committing to database.
- **Atomic Batch Ingestion:** Writes records in chunks with a visual progress bar. If an error occurs, offending rows are isolated without crashing the batch.
- **Instant Error Export:** Any failed rows are compiled into a downloadable `import_errors.csv` file with line numbers and human-readable error reasons.
- **Pre-formatted Template Generator:** Download one-click starter spreadsheets:
  - 📥 *Academic Books Template* (with ISBN, Board, Class, Author fields)
  - 📥 *Stationery Template* (with Brand, Pack Size, Color fields)
  - 📥 *Sports Gear Template* (with Brand, Sport, Size, Material fields)
  - 📥 *Master Store Inventory Template* (Full unified multi-department catalog)

---

## ⚡ Barcode Scanner & Fast POS Adjuster

Designed for the physical store checkout counter in Pachrukhi:

- **Hardware Gun Support:** Compatible with standard USB and Bluetooth laser/CCD barcode scanners. Automatically detects fast keystroke bursts (<50ms between keydowns) terminating with `Enter`.
- **Sub-100ms Search:** Search across Barcode, ISBN, SKU, and Product Name simultaneously with instant results.
- **Counter Stepper (+ / -):** Quickly increment or decrement stock right from the keyboard or touchscreen without opening product detail forms.
- **Audio Feedback:** Subtle audio clicks confirm successful scans and stock adjustments.

---

## 🚨 Low Stock Alerts & WhatsApp Reordering

Eliminate out-of-stock situations during peak academic admission seasons:

- **Threshold Tracking:** Real-time filter for items where `stock <= minStockLevel` and `stock == 0`.
- **Visual Urgency Badges:** Clear color-coded indicators for `Critical (0 in stock)` and `Low Stock`.
- **1-Click WhatsApp Purchase Order:**
  - Automatically compiles low-stock items into an organized purchase order.
  - Generates a pre-filled WhatsApp message formatted for local distributors in Siwan and Patna:
  > *"Namaste. Order from Sarswati Pustak and Sports Bhandar, Pachrukhi:*  
  > *- NCERT Mathematics Class 10 (Qty: 25)*  
  > *- Classmate Long Notebook 180 pgs (Qty: 50)*  
  > *Please confirm dispatch date and invoice."*

---

## 📜 Immutable Stock Audit Ledger

Every physical movement of goods is permanently recorded in the `stock_movements` log:

- **Movement Types:** `SALE`, `RESTOCK`, `ADJUSTMENT`, `RETURN`, `BULK_IMPORT`.
- **Tracked Metadata:** Timestamp, Item SKU & Title, Previous Stock, Change Delta (+/-), Resulting Balance, Reason/Reference, and Operator ID (`Rahu1819`).
- **Audit Export:** Filter by date or movement type and export ledger to CSV for GST and accounting reconciliation.

---

## 🛍️ Customer Storefront Features

- **Omni-Channel Catalog:** Browse books by class/board, stationery essentials, and athletic gear.
- **Instant Search & Filters:** Filter by category, price range, brand, and stock status.
- **Shopping Cart & Checkout:**
  - Real-time cart calculations with coupon and discount support.
  - Cash on Delivery (COD) and Direct UPI Payment with QR code.
- **Order Tracking:** Track order fulfillment status (Pending, Confirmed, Shipped, Delivered).
- **Responsive & Mobile-Ready:** Fully optimized for low-bandwidth 4G mobile devices popular among rural customers.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | User interface components and state management |
| **TypeScript** | Type-safe business logic, domain models, and schema validation |
| **Vite 6** | Ultra-fast build tool and development server |
| **TailwindCSS & Lucide Icons** | Design system, responsive layouts, and iconography |
| **SheetJS (`xlsx`)** | Client-side Excel `.xlsx` / `.csv` parsing and generation |
| **Canvas Confetti** | Interactive celebratory micro-animations on checkout completion |

---

## 🚀 Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) version 18 or higher
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/RahulRaj1819/Sarswatipustakstore_2026.git
cd Sarswatipustakstore_2026
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to view the store.

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready bundle will be in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Directory Structure

```text
Sarswatipustakstore_2026/
├── public/                       # Static assets and icons
├── src/
│   ├── components/               # UI and feature components
│   │   ├── admin/                # Admin & Inventory Management
│   │   │   ├── BarcodeQuickAdjustModal.tsx   # USB/BT scanner burst listener & POS counter
│   │   │   ├── ReorderAlertsView.tsx         # Low-stock alerts & WhatsApp PO dispatch
│   │   │   ├── SpreadsheetImportEngine.tsx   # Bulk XLSX/CSV parser, dry-run & error logger
│   │   │   └── StockAuditLedgerView.tsx      # Immutable inventory movement audit log
│   │   ├── Header.tsx            # Navigation, branding & admin portal link
│   │   ├── ProductCard.tsx       # Storefront product showcase with add-to-cart
│   │   ├── CartDrawer.tsx        # Slide-over shopping bag with real-time totals
│   │   └── CheckoutModal.tsx     # COD & UPI checkout workflow
│   ├── data/
│   │   └── mockData.ts           # Initial seeded catalog (Books, Stationery, Sports)
│   ├── pages/
│   │   ├── AdminPage.tsx         # Password-gated administrative control center
│   │   ├── HomePage.tsx          # Storefront homepage & category showcases
│   │   └── ProductsPage.tsx      # Filterable product grid with faceted search
│   ├── services/
│   │   └── storage.ts            # Atomic storage layer with Paise integer conversions
│   ├── types/
│   │   └── index.ts              # Domain schemas (Product, Movement, Order, Currency)
│   ├── utils/
│   │   ├── currency.ts           # Format INR & decimal/paise conversions
│   │   └── spreadsheetTemplates.ts # Generator for pre-formatted sample Excel templates
│   ├── App.tsx                   # Top-level routing & layout shell
│   ├── index.css                 # Global CSS & Tailwind utilities
│   └── main.tsx                  # React 19 application entry point
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # Comprehensive project documentation
```

---

## 👥 Authors & Attribution
- **Store Proprietor:** Rahul Raj / Saraswati Pustak & Sports Bhandar
- **Location:** Main Road, Pachrukhi, Siwan, Bihar - 841241
- **Repository:** [RahulRaj1819/Sarswatipustakstore_2026](https://github.com/RahulRaj1819/Sarswatipustakstore_2026)
