import React, { useState, useEffect, useRef } from 'react';
import { Product, StockMovementType } from '../../types';
import { StorageService } from '../../services/storage';
import { formatINR } from '../../utils/helpers';
import { 
  Scan, 
  X, 
  Plus, 
  Minus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  MapPin, 
  BookOpen, 
  Trophy, 
  Tag, 
  Sparkles,
  Volume2
} from 'lucide-react';

interface BarcodeQuickAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onStockUpdated: () => void;
  adminUser?: string;
}

// Gentle Web Audio feedback
const playBeep = (frequency: number = 880, duration: number = 0.08) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors on environments without audio card
  }
};

export const BarcodeQuickAdjustModal: React.FC<BarcodeQuickAdjustModalProps> = ({
  isOpen,
  onClose,
  products,
  onStockUpdated,
  adminUser = 'Rahu1819'
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customQtyInput, setCustomQtyInput] = useState<string>('');
  const [movementType, setMovementType] = useState<StockMovementType>('Store Sale');
  const [note, setNote] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const barcodeBufferRef = useRef<string>('');
  const lastKeyTimeRef = useRef<number>(0);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setSearchInput('');
      setSelectedProduct(null);
      setCustomQtyInput('');
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  // Hardware Barcode Scanner Listener:
  // Most USB/Bluetooth barcode scanners emulate rapid keystrokes (<40ms interval) terminated by Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const diff = now - lastKeyTimeRef.current;
      lastKeyTimeRef.current = now;

      // Enter key marks end of scan
      if (e.key === 'Enter') {
        const potentialBarcode = barcodeBufferRef.current.trim();
        barcodeBufferRef.current = '';

        if (potentialBarcode.length >= 3) {
          const matched = products.find(p => 
            p.sku.toLowerCase() === potentialBarcode.toLowerCase() ||
            (p.isbn && p.isbn.replace(/[^0-9]/g, '') === potentialBarcode.replace(/[^0-9]/g, ''))
          );
          if (matched) {
            e.preventDefault();
            setSelectedProduct(matched);
            setCustomQtyInput(String(matched.stock));
            playBeep(1040, 0.1);
            setFeedbackMsg({ text: `Barcode Scanned: ${matched.name}`, type: 'success' });
            return;
          }
        }
      } else if (e.key.length === 1) {
        // If keystrokes come within 50ms, accumulate into barcode buffer
        if (diff < 60 || barcodeBufferRef.current.length === 0) {
          barcodeBufferRef.current += e.key;
        } else {
          barcodeBufferRef.current = e.key;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, products]);

  if (!isOpen) return null;

  // Search Results filtering (sub-100ms)
  const trimmed = searchInput.trim().toLowerCase();
  const filteredProducts = trimmed.length > 0
    ? products.filter(p => {
        const skuMatch = p.sku.toLowerCase().includes(trimmed);
        const nameMatch = p.name.toLowerCase().includes(trimmed);
        const isbnMatch = p.isbn && p.isbn.toLowerCase().includes(trimmed);
        const brandMatch = p.brand && p.brand.toLowerCase().includes(trimmed);
        const rackMatch = p.storageLocation && p.storageLocation.toLowerCase().includes(trimmed);
        return skuMatch || nameMatch || isbnMatch || brandMatch || rackMatch;
      }).slice(0, 8)
    : [];

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setCustomQtyInput(String(p.stock));
    playBeep(880, 0.05);
  };

  const handleApplyDelta = (delta: number) => {
    if (!selectedProduct) return;
    const currentStock = selectedProduct.stock;
    const newStock = Math.max(0, currentStock + delta);
    const chosenType: StockMovementType = delta < 0 ? 'Store Sale' : 'Stock Addition (Purchase)';

    StorageService.updateStockWithMovement(
      selectedProduct.sku,
      newStock,
      chosenType,
      note || `Fast POS scan adjustment (${delta > 0 ? `+${delta}` : delta} units)`,
      `POS-${Date.now().toString().slice(-6)}`,
      adminUser
    );

    playBeep(delta > 0 ? 980 : 720, 0.08);
    setFeedbackMsg({ 
      text: `Stock for ${selectedProduct.sku} updated: ${currentStock} ➔ ${newStock}`, 
      type: 'success' 
    });
    
    // Refresh local selected product
    setSelectedProduct({ ...selectedProduct, stock: newStock });
    setCustomQtyInput(String(newStock));
    onStockUpdated();
  };

  const handleSaveCustomStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const newStock = parseInt(customQtyInput, 10);
    if (isNaN(newStock) || newStock < 0) {
      alert('Please enter a valid stock quantity.');
      return;
    }

    const currentStock = selectedProduct.stock;
    StorageService.updateStockWithMovement(
      selectedProduct.sku,
      newStock,
      movementType,
      note || `Manual inventory reconciliation from ${currentStock} to ${newStock}`,
      `POS-MAN-${Date.now().toString().slice(-6)}`,
      adminUser
    );

    playBeep(1200, 0.1);
    setFeedbackMsg({ 
      text: `Stock updated to ${newStock} for ${selectedProduct.sku}`, 
      type: 'success' 
    });
    setSelectedProduct({ ...selectedProduct, stock: newStock });
    onStockUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                Fast Barcode & POS Stock Adjuster
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Ready to Scan
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Pachrukhi Store Counter • USB/Bluetooth barcode scanner & sub-100ms instant search
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan / Search Input Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={e => {
                setSearchInput(e.target.value);
                // If user scans an exact SKU
                const exact = products.find(p => p.sku.toLowerCase() === e.target.value.trim().toLowerCase());
                if (exact) {
                  setSelectedProduct(exact);
                  setCustomQtyInput(String(exact.stock));
                  playBeep(980, 0.08);
                }
              }}
              placeholder="Scan barcode or type SKU, ISBN, Book Title, or Sports Item..."
              className="w-full pl-11 pr-24 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 shadow-sm transition"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">
              <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Quick Search Dropdown if items matched */}
          {filteredProducts.length > 0 && !selectedProduct && (
            <div className="mt-3 bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className="w-full text-left p-3 hover:bg-amber-50/60 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                      {p.department === 'Books' ? <BookOpen className="w-4 h-4 text-blue-600" /> : p.department === 'Sports' ? <Trophy className="w-4 h-4 text-emerald-600" /> : <Tag className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-amber-700">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="font-mono font-medium text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{p.sku}</span>
                        {p.isbn && <span>ISBN: {p.isbn}</span>}
                        {p.storageLocation && <span className="flex items-center gap-1 text-slate-600"><MapPin className="w-3 h-3" /> {p.storageLocation}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900 block">{formatINR(p.price)}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      Stock: {p.stock}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Product Card & Quick Adjustment Controls */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {feedbackMsg && (
            <div className={`p-3.5 rounded-xl text-sm font-medium flex items-center gap-2 ${feedbackMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {selectedProduct ? (
            <div className="space-y-6">
              {/* Product Information Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-navy text-white rounded">
                        {selectedProduct.department || 'Books'}
                      </span>
                      <span className="text-xs font-mono font-semibold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                        SKU: {selectedProduct.sku}
                      </span>
                      {selectedProduct.storageLocation && (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Shelf: {selectedProduct.storageLocation}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedProduct.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedProduct.brand && `Brand: ${selectedProduct.brand} • `}
                      {selectedProduct.isbn && `ISBN: ${selectedProduct.isbn} • `}
                      {selectedProduct.board && `Board: ${selectedProduct.board}`}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-extrabold text-navy">
                      {formatINR(selectedProduct.price)}
                    </div>
                    {selectedProduct.mrp && selectedProduct.mrp > selectedProduct.price && (
                      <div className="text-xs text-slate-400 line-through">
                        MRP: {formatINR(selectedProduct.mrp)}
                      </div>
                    )}
                    <div className="mt-2 text-xs font-mono text-slate-500">
                      Paise: {selectedProduct.sellingPricePaise ?? selectedProduct.price * 100}p
                    </div>
                  </div>
                </div>

                {/* Current Stock Banner */}
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Current Stock on Shelf:</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-black ${selectedProduct.stock <= 5 ? 'text-red-600' : 'text-slate-900'}`}>
                        {selectedProduct.stock} units
                      </span>
                      {selectedProduct.stock <= 5 && (
                        <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Low Stock (Min: {selectedProduct.minStockThreshold ?? 5})
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setSearchInput('');
                      inputRef.current?.focus();
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Change Item
                  </button>
                </div>
              </div>

              {/* Rapid Adjustment Actions */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  1-Click Rapid Counter Adjustments
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleApplyDelta(-1)}
                    className="flex items-center justify-center gap-1.5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition active:scale-95 shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                    <span>-1 Sale</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyDelta(-5)}
                    className="flex items-center justify-center gap-1.5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition active:scale-95 shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                    <span>-5 Bulk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyDelta(1)}
                    className="flex items-center justify-center gap-1.5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 transition active:scale-95 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+1 In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyDelta(10)}
                    className="flex items-center justify-center gap-1.5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 transition active:scale-95 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+10 Box</span>
                  </button>
                </div>
              </div>

              {/* Exact Reconciliation Form */}
              <form onSubmit={handleSaveCustomStock} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="font-semibold text-xs text-slate-700 uppercase tracking-wider">
                  Direct Stock Override & Audit Note
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">New Exact Stock Qty</label>
                    <input 
                      type="number" 
                      min="0"
                      value={customQtyInput}
                      onChange={e => setCustomQtyInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">Reason / Movement</label>
                    <select
                      value={movementType}
                      onChange={e => setMovementType(e.target.value as StockMovementType)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-navy"
                    >
                      <option value="Store Sale">Store Sale (Counter)</option>
                      <option value="Stock Addition (Purchase)">Stock Addition (Purchase)</option>
                      <option value="WhatsApp Order">WhatsApp Order</option>
                      <option value="Online Order">Online Order</option>
                      <option value="Manual Adjustment (Damage/Loss)">Manual Adjustment (Damage/Loss)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">Reference / Note</label>
                    <input 
                      type="text"
                      placeholder="e.g. Bill #849, damaged"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-navy"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow transition"
                  >
                    Save Stock & Write to Ledger
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Empty State Guide */
            <div className="py-12 text-center text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <Scan className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium text-slate-600 max-w-sm mx-auto">
                Point your barcode gun at any book, stationery box, or sports item, or search above to quickly adjust stock.
              </p>
              <div className="text-xs text-slate-400">
                Logged in staff: <span className="font-mono text-slate-600 font-bold">{adminUser}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Press <strong>ESC</strong> to close</span>
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
