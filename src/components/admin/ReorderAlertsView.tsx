import React, { useState } from 'react';
import { Product, Department } from '../../types';
import { formatINR } from '../../utils/helpers';
import { StorageService } from '../../services/storage';
import { 
  AlertTriangle, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  BookOpen, 
  Trophy, 
  Tag, 
  CheckCircle2, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface ReorderAlertsViewProps {
  products: Product[];
  onRefresh: () => void;
  onOpenQuickAdjust?: (product: Product) => void;
  adminUser?: string;
}

export const ReorderAlertsView: React.FC<ReorderAlertsViewProps> = ({
  products,
  onRefresh,
  onOpenQuickAdjust,
  adminUser = 'Rahu1819'
}) => {
  const [selectedDept, setSelectedDept] = useState<'All' | Department>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'out_of_stock' | 'critical'>('all');
  const [supplierPhone, setSupplierPhone] = useState('917091791893');

  // Filter items where stock <= minStockThreshold (default 5)
  const lowStockProducts = products.filter(p => {
    const threshold = p.minStockThreshold ?? 5;
    return p.stock <= threshold;
  });

  const filteredProducts = lowStockProducts.filter(p => {
    const matchesDept = selectedDept === 'All' || p.department === selectedDept;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.isbn && p.isbn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    const threshold = p.minStockThreshold ?? 5;
    let matchesSeverity = true;
    if (severityFilter === 'out_of_stock') {
      matchesSeverity = p.stock === 0;
    } else if (severityFilter === 'critical') {
      matchesSeverity = p.stock > 0 && p.stock <= 2;
    }

    return matchesDept && matchesSearch && matchesSeverity;
  });

  // NCERT specific count
  const ncertLowCount = lowStockProducts.filter(p => 
    p.department === 'Books' && (p.brand?.toLowerCase().includes('ncert') || p.category === 'school-ncert')
  ).length;

  // Quick WhatsApp Stock Reorder Link Generator
  const generateWhatsAppReorderUrl = (product: Product, reorderQty: number = 25) => {
    const text = `*STOCK REORDER INQUIRY — Sarswati Pustak and Sports Bhandar*
Location: Main Road, Pachrukhi, Siwan, Bihar (PIN: 841241)

Product Name: *${product.name}*
SKU: ${product.sku}
${product.isbn ? `ISBN: ${product.isbn}\n` : ''}${product.publisher ? `Publisher: ${product.publisher}\n` : ''}${product.board ? `Board: ${product.board}\n` : ''}Department: ${product.department || 'General'}
Current Stock on Shelf: *${product.stock} units*
Storage Shelf Tag: ${product.storageLocation || 'Main Counter'}
Requested Restock Quantity: *${reorderQty} units*

Please confirm availability, wholesale rate, and earliest dispatch timeline to Pachrukhi.`;

    const cleanPhone = supplierPhone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleQuickRestock = (product: Product, quantityToAdd: number) => {
    StorageService.updateStockWithMovement(
      product.sku,
      product.stock + quantityToAdd,
      'Stock Addition (Purchase)',
      `Quick restock consignment (+${quantityToAdd} units)`,
      `PO-RESTOCK-${Date.now().toString().slice(-6)}`,
      adminUser
    );
    onRefresh();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-500 text-white px-2.5 py-0.5 rounded-full font-mono">
              Action Required
            </span>
            <span className="text-xs text-slate-300">
              Session Preparedness & Reorder Triggers
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            Items Requiring Reorder (Low-Stock Alert)
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Identify inventory below minimum threshold and immediately dispatch WhatsApp purchase orders to Patna/Siwan distributors.
          </p>
        </div>

        {/* NCERT High Priority Chip */}
        {ncertLowCount > 0 && (
          <div className="bg-amber-500/20 border border-amber-500/40 px-3.5 py-2 rounded-xl text-left self-start sm:self-auto">
            <div className="text-[10px] uppercase font-bold text-amber-300">Academic Session Alert</div>
            <div className="text-xs font-bold text-white">
              {ncertLowCount} NCERT / Board books need reorder
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-0 space-y-6">
        
        {/* Metric Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <span className="text-xs font-bold text-rose-800">Critical: Out of Stock</span>
            <div className="text-2xl font-black text-rose-900 mt-1">
              {lowStockProducts.filter(p => p.stock === 0).length} items
            </div>
            <span className="text-[11px] text-rose-600">Immediate counter loss</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-xs font-bold text-amber-800">Near Threshold (1-5 units)</span>
            <div className="text-2xl font-black text-amber-900 mt-1">
              {lowStockProducts.filter(p => p.stock > 0).length} items
            </div>
            <span className="text-[11px] text-amber-600">Reorder before weekend rush</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-xs font-bold text-slate-700">Total Items in Catalog</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {products.length} products
            </div>
            <span className="text-[11px] text-slate-500">
              {Math.round(((products.length - lowStockProducts.length) / (products.length || 1)) * 100)}% healthy stock ratio
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search low-stock books, stationery, or sports gear..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-navy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value as any)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-navy"
            >
              <option value="All">All Departments</option>
              <option value="Books">Books (NCERT & State Board)</option>
              <option value="Stationery">Stationery</option>
              <option value="Sports">Sports Equipment</option>
            </select>

            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value as any)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-navy"
            >
              <option value="all">All Low Stock</option>
              <option value="out_of_stock">Out of Stock Only (0)</option>
              <option value="critical">Critical Only (&le;2)</option>
            </select>
          </div>
        </div>

        {/* Low Stock Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(p => {
              const isOut = p.stock === 0;
              const threshold = p.minStockThreshold ?? 5;

              return (
                <div 
                  key={p.id}
                  className={`border rounded-2xl p-4 flex flex-col justify-between transition hover:shadow-md ${isOut ? 'border-red-300 bg-red-50/20' : 'border-amber-200 bg-amber-50/20'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy text-white">
                        {p.department || 'Books'}
                      </span>
                      <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${isOut ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                        {isOut ? 'OUT OF STOCK' : `Only ${p.stock} left`}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-1">
                        <span>SKU: {p.sku}</span>
                        {p.storageLocation && (
                          <span className="flex items-center gap-0.5 text-slate-600">
                            <MapPin className="w-3 h-3 text-amber-600" /> {p.storageLocation}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Department Context */}
                    <div className="text-xs text-slate-600 space-y-0.5 pt-1">
                      {p.isbn && <div><strong>ISBN:</strong> {p.isbn}</div>}
                      {p.classGrade && <div><strong>Class:</strong> {p.classGrade} ({p.board || 'NCERT'})</div>}
                      {p.packSize && <div><strong>Pack Size:</strong> {p.packSize}</div>}
                      {p.sportName && <div><strong>Sport:</strong> {p.sportName} • {p.size || 'Standard'}</div>}
                    </div>

                    <div className="pt-2 flex items-baseline justify-between border-t border-slate-200">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Selling Price</span>
                        <span className="text-sm font-bold text-slate-900">{formatINR(p.price)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Low-Stock Trigger</span>
                        <span className="text-xs font-semibold text-slate-600">&le; {threshold} units</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-200/80 mt-4 space-y-2">
                    {/* Quick WhatsApp Reorder Button */}
                    <a
                      href={generateWhatsAppReorderUrl(p, p.department === 'Books' ? 30 : 20)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Supplier Reorder</span>
                    </a>

                    {/* Quick Increment Actions */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      <span className="text-[10px] text-slate-400 font-medium">Quick Restock:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuickRestock(p, 10)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition"
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickRestock(p, 25)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition"
                        >
                          +25
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickRestock(p, 50)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg transition"
                        >
                          +50
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No Low-Stock Items Found</h4>
            <p className="text-xs text-slate-500 mt-1">
              All items in the selected department are stocked above their reorder thresholds.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
