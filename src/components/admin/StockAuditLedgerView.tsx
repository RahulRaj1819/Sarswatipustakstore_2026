import React, { useState } from 'react';
import Papa from 'papaparse';
import { StockMovement, StockMovementType, Department } from '../../types';
import { StorageService } from '../../services/storage';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Layers, 
  ShieldCheck, 
  Tag, 
  BookOpen, 
  Trophy, 
  Package
} from 'lucide-react';

interface StockAuditLedgerViewProps {
  movements: StockMovement[];
  onRefresh: () => void;
  adminUser?: string;
}

export const StockAuditLedgerView: React.FC<StockAuditLedgerViewProps> = ({
  movements,
  onRefresh,
  adminUser = 'Rahu1819'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Filtered movements
  const filteredMovements = movements.filter(m => {
    const matchesSearch = 
      m.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.referenceId && m.referenceId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.note && m.note.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || m.movementType === selectedType;
    const matchesDept = selectedDept === 'all' || m.department === selectedDept;

    return matchesSearch && matchesType && matchesDept;
  });

  // Calculate Metrics
  const totalMovements = movements.length;
  const netStockAdditions = movements
    .filter(m => m.quantityDelta > 0)
    .reduce((sum, m) => sum + m.quantityDelta, 0);
  const netStockDeductions = movements
    .filter(m => m.quantityDelta < 0)
    .reduce((sum, m) => sum + Math.abs(m.quantityDelta), 0);
  const uniqueSkus = new Set(movements.map(m => m.sku)).size;

  // Export Audit Trail to CSV
  const handleExportCSV = () => {
    const data = filteredMovements.map(m => ({
      'Ledger ID': m.id,
      'Date & Time': new Date(m.timestamp).toLocaleString('en-IN'),
      'SKU': `"${m.sku}"`,
      'Product Name': m.productName,
      'Department': m.department,
      'Movement Type': m.movementType,
      'Previous Stock': m.previousStock,
      'New Stock': m.newStock,
      'Quantity Delta': m.quantityDelta > 0 ? `+${m.quantityDelta}` : m.quantityDelta,
      'Reference ID': m.referenceId || '',
      'Notes': m.note || '',
      'Admin Staff': m.adminUser
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spsb-stock-ledger-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTypeBadgeClass = (type: StockMovementType) => {
    switch (type) {
      case 'Stock Addition (Purchase)':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Store Sale':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Online Order':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'WhatsApp Order':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Bulk Import Adjustment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Manual Adjustment (Damage/Loss)':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-navy px-2.5 py-0.5 rounded-full font-mono">
              Immutable Ledger
            </span>
            <span className="text-xs text-slate-300">
              Audit & Inventory Movement History
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            Stock Audit Log & Movements
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Full audit trail of store sales, purchase consignments, damaged adjustments, and spreadsheet imports.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onRefresh}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
            title="Refresh Ledger"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-navy font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="p-6 pt-0 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-xs text-slate-500 font-medium">Total Ledger Entries</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalMovements}</div>
            <span className="text-[11px] text-slate-400">Recorded audit events</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <span className="text-xs text-emerald-700 font-medium">Stock Additions Ingested</span>
            <div className="text-2xl font-black text-emerald-800 mt-1">+{netStockAdditions}</div>
            <span className="text-[11px] text-emerald-600">Purchases & bulk imports</span>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <span className="text-xs text-rose-700 font-medium">Units Dispatched / Deducted</span>
            <div className="text-2xl font-black text-rose-800 mt-1">-{netStockDeductions}</div>
            <span className="text-[11px] text-rose-600">Sales, online, & damages</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <span className="text-xs text-blue-700 font-medium">Unique SKUs Affected</span>
            <div className="text-2xl font-black text-blue-800 mt-1">{uniqueSkus}</div>
            <span className="text-[11px] text-blue-600">Items tracked in catalog</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter by SKU, Product Name, Reference ID, or Bill Note..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-navy"
            />
          </div>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-navy"
          >
            <option value="all">All Movement Types</option>
            <option value="Stock Addition (Purchase)">Stock Addition (Purchase)</option>
            <option value="Store Sale">Store Sale (Counter)</option>
            <option value="Online Order">Online Order</option>
            <option value="WhatsApp Order">WhatsApp Order</option>
            <option value="Manual Adjustment (Damage/Loss)">Manual Adjustment</option>
            <option value="Bulk Import Adjustment">Bulk Spreadsheet Import</option>
          </select>

          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-navy"
          >
            <option value="all">All Departments</option>
            <option value="Books">Books</option>
            <option value="Stationery">Stationery</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Audit Table */}
        <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Movement Type</th>
                <th className="py-3 px-4">SKU / Item</th>
                <th className="py-3 px-4">Dept</th>
                <th className="py-3 px-4 text-center">Prev ➔ New</th>
                <th className="py-3 px-4 text-center">Delta</th>
                <th className="py-3 px-4">Ref # / Note</th>
                <th className="py-3 px-4">Staff User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovements.length > 0 ? (
                filteredMovements.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                      {new Date(m.timestamp).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                      <div className="text-[10px] text-slate-400">
                        {new Date(m.timestamp).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getTypeBadgeClass(m.movementType)}`}>
                        {m.movementType}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{m.sku}</div>
                      <div className="text-slate-600 truncate max-w-xs">{m.productName}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {m.department}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap font-mono text-slate-600">
                      {m.previousStock} ➔ <strong className="text-slate-900">{m.newStock}</strong>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {m.quantityDelta > 0 ? (
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center justify-center gap-0.5">
                          <ArrowUpRight className="w-3 h-3" /> +{m.quantityDelta}
                        </span>
                      ) : m.quantityDelta < 0 ? (
                        <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center justify-center gap-0.5">
                          <ArrowDownRight className="w-3 h-3" /> {m.quantityDelta}
                        </span>
                      ) : (
                        <span className="font-mono text-slate-400">0</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                      {m.referenceId && (
                        <span className="font-mono font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded mr-1">
                          {m.referenceId}
                        </span>
                      )}
                      <span className="truncate">{m.note || '-'}</span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-500 font-medium">
                      {m.adminUser}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No stock movements matched your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
