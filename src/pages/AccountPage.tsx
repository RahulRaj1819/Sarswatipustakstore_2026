import React, { useState } from 'react';
import { Order, UserAccount } from '../types';
import { StorageService } from '../services/storage';
import { formatINR } from '../utils/helpers';
import { 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  LogOut, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AccountPageProps {
  orders: Order[];
  onNavigate: (page: string) => void;
  onTrackOrder: (orderNumber: string) => void;
  onReorder?: (order: Order) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  orders,
  onNavigate,
  onTrackOrder
}) => {
  const [userName, setUserName] = useState('Rahul Kumar');
  const [userPhone, setUserPhone] = useState('9835012345');
  const [savedLocality, setSavedLocality] = useState('Pachrukhi Bazaar, Siwan - 841241');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-900 to-navy text-white flex items-center justify-center font-bold text-xl shadow-md">
              {userName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-navy font-heading">
                  {userName}
                </h1>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Local Customer
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>Phone: <strong className="text-slate-700">{userPhone}</strong></span>
                <span>•</span>
                <span>Pachrukhi (Siwan)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => onNavigate('admin')}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Shopkeeper Portal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-2.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'border-brand-900 text-brand-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-navy">No orders placed yet</h3>
                <p className="text-xs text-slate-500">
                  Start shopping for school textbooks, stationery, or cricket gear!
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4 hover:border-brand-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <span className="font-extrabold text-navy text-sm font-heading">
                        Order #{order.orderNumber}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        order.status === 'delivered' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <button
                        onClick={() => onTrackOrder(order.orderNumber)}
                        className="text-xs bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold px-3 py-1 rounded-xl transition-colors"
                      >
                        Track Status
                      </button>
                    </div>
                  </div>

                  {/* Line items preview */}
                  <div className="space-y-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={item.image} 
                            alt="" 
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=100&q=80';
                            }}
                            className="w-8 h-8 rounded object-cover border border-slate-200" 
                          />
                          <span className="font-medium text-slate-800">{item.productName} (Qty: {item.quantity})</span>
                        </div>
                        <span className="font-bold text-navy">{formatINR(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-slate-100 text-xs gap-2">
                    <div className="text-slate-500">
                      Fulfilment: <strong className="text-slate-800">{order.fulfilmentType === 'store_pickup' ? 'Store Pickup' : 'Local Delivery'}</strong>
                    </div>
                    <div className="text-sm font-black text-navy">
                      Total: {formatINR(order.totalAmount)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-xl space-y-4">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Edit Account Information
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registered Phone</label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>
            <button
              onClick={() => alert('Profile details updated!')}
              className="bg-brand-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-xl space-y-4">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Primary Delivery Address
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{userName}</div>
              <div className="text-slate-600">{savedLocality}</div>
              <div className="text-slate-500">Phone: {userPhone}</div>
              <span className="inline-block mt-1 text-[10px] font-bold bg-brand-100 text-brand-900 px-2 py-0.5 rounded">
                Default Address
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
