import { Product, StoreSettings, Order, BooklistRequest, FulfilmentType } from '../types';

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getDiscountPercentage = (price: number, mrp?: number): number => {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

export const generateOrderNumber = (): string => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `SPSB-2026-${randomSuffix}`;
};

export const generateBooklistRef = (): string => {
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `BL-8412-${randomSuffix}`;
};

export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const getWhatsAppGeneralUrl = (settings: StoreSettings, message?: string): string => {
  const basePhone = cleanPhoneNumber(settings.whatsappNumber || '917091791893');
  const defaultText = encodeURIComponent(
    message || 
    `Namaste Sarswati Pustak & Sports Bhandar, I have an enquiry regarding books/stationery/sports gear.`
  );
  return `https://wa.me/${basePhone}?text=${defaultText}`;
};

export const getWhatsAppProductEnquiryUrl = (product: Product, settings: StoreSettings): string => {
  const basePhone = cleanPhoneNumber(settings.whatsappNumber || '917091791893');
  const text = encodeURIComponent(
    `Namaste Sarswati Pustak & Sports Bhandar!\n\nI want to check availability for:\n` +
    `📖 *${product.name}*\n` +
    `• SKU: ${product.sku}\n` +
    `• Price: ₹${product.price} (MRP: ₹${product.mrp || product.price})\n` +
    `• Current Store Stock: ${product.stock > 0 ? 'In Stock' : 'Check with store'}\n\n` +
    `Is this currently available for pickup or delivery in Pachrukhi?`
  );
  return `https://wa.me/${basePhone}?text=${text}`;
};

export const getWhatsAppOrderUrl = (order: Order, settings: StoreSettings): string => {
  const basePhone = cleanPhoneNumber(settings.whatsappNumber || '917091791893');
  const itemsList = order.items
    .map((item, idx) => `${idx + 1}. ${item.productName} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`)
    .join('\n');

  const text = encodeURIComponent(
    `Namaste Sarswati Pustak!\n\nHere are my order details:\n` +
    `🧾 *Order ID:* ${order.orderNumber}\n` +
    `👤 *Customer:* ${order.customer.fullName} (${order.customer.phone})\n` +
    `📍 *Fulfilment:* ${order.fulfilmentType === 'store_pickup' ? 'Store Pickup (Pachrukhi)' : `Delivery to ${order.customer.villageOrLocality}, PIN: ${order.customer.pinCode}`}\n` +
    `💳 *Payment:* ${order.paymentMethod.replace(/_/g, ' ').toUpperCase()} (${order.paymentStatus.toUpperCase()})\n\n` +
    `*Items:*\n${itemsList}\n\n` +
    `*Total Payable:* ₹${order.totalAmount}\n\n` +
    `Please confirm the order status. Thank you!`
  );
  return `https://wa.me/${basePhone}?text=${text}`;
};

export const getWhatsAppBooklistUrl = (req: BooklistRequest, settings: StoreSettings): string => {
  const basePhone = cleanPhoneNumber(settings.whatsappNumber || '917091791893');
  const text = encodeURIComponent(
    `Namaste Sarswati Pustak & Sports Bhandar!\n\n` +
    `I have submitted a School Booklist Enquiry:\n` +
    `📋 *Reference:* ${req.referenceNumber}\n` +
    `🏫 *School:* ${req.schoolName}\n` +
    `📚 *Class:* ${req.classGrade} (${req.academicSession})\n` +
    `👤 *Parent Name:* ${req.parentName} (${req.phone})\n` +
    `📝 *Notes:* ${req.notes || 'None'}\n\n` +
    `Please check textbook set availability and share the quotation. Thank you!`
  );
  return `https://wa.me/${basePhone}?text=${text}`;
};

export const isPinCodeServiceable = (pin: string, settings: StoreSettings): boolean => {
  const cleanPin = pin.trim();
  if (!cleanPin || cleanPin.length !== 6) return false;
  return settings.serviceablePinCodes.includes(cleanPin);
};

export const calculateDeliveryFee = (
  subtotal: number,
  fulfilment: FulfilmentType,
  pin: string,
  settings: StoreSettings
): { fee: number; isServiceable: boolean; message: string } => {
  if (fulfilment === 'store_pickup') {
    return { fee: 0, isServiceable: true, message: 'Free Store Pickup at Pachrukhi Main Road shop' };
  }

  const isServiceable = isPinCodeServiceable(pin, settings);
  if (!isServiceable) {
    return {
      fee: 0,
      isServiceable: false,
      message: `PIN code ${pin} is outside our local delivery zone (Siwan & Pachrukhi areas). You can still choose Store Pickup!`
    };
  }

  if (subtotal >= settings.freeDeliveryThreshold) {
    return { fee: 0, isServiceable: true, message: `Free Delivery unlocked (Order above ₹${settings.freeDeliveryThreshold})` };
  }

  return {
    fee: settings.standardDeliveryFee,
    isServiceable: true,
    message: `Standard local delivery ₹${settings.standardDeliveryFee} (Add ₹${settings.freeDeliveryThreshold - subtotal} more for Free Delivery)`
  };
};

export const exportProductsToCSV = (products: Product[]): string => {
  const headers = ['SKU', 'Name', 'Category', 'Price', 'MRP', 'Stock', 'Brand', 'ClassGrade', 'Subject', 'Tags'];
  const rows = products.map(p => [
    p.sku,
    `"${p.name.replace(/"/g, '""')}"`,
    p.category,
    p.price,
    p.mrp || p.price,
    p.stock,
    `"${p.brand || ''}"`,
    `"${p.classGrade || ''}"`,
    `"${p.subject || ''}"`,
    `"${p.tags.join('; ')}"`
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};
