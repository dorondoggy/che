import React, { useState } from 'react';
import { Store, Flame, Clock, CheckCircle2, DollarSign, PackageCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { VENDORS, MENU_ITEMS } from '../data/mockData';
import { OrderStatus } from '../types';

interface VendorDashboardProps {
  onBackToCustomer: () => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onBackToCustomer }) => {
  const { orders, updateOrderStatus } = useCart();
  const [selectedShopId, setSelectedShopId] = useState<string>(VENDORS[0].id);
  const [menuItemsState, setMenuItemsState] = useState(MENU_ITEMS);

  const selectedVendor = VENDORS.find(v => v.id === selectedShopId) || VENDORS[0];

  // Filter orders that have items for this shop
  const shopOrders = orders
    .map(order => {
      const targetGroup = order.shopGroups.find(g => g.shopId === selectedShopId);
      if (!targetGroup) return null;
      return {
        orderId: order.id,
        createdAt: order.createdAt,
        customer: order.customer,
        group: targetGroup
      };
    })
    .filter((o): o is NonNullable<typeof o> => o !== null);

  const totalRevenue = shopOrders.reduce((sum, o) => sum + o.group.subtotal, 0);

  const toggleItemStock = (itemId: string) => {
    setMenuItemsState(prev =>
      prev.map(item => (item.id === itemId ? { ...item, available: !item.available } : item))
    );
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, selectedShopId, newStatus);
  };

  const vendorMenuItems = menuItemsState.filter(m => m.shopId === selectedShopId);

  return (
    <div className="min-h-screen bg-[#F5F6F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar for Vendor Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#062E1F] p-4 sm:p-5 rounded-2xl text-white shadow-md border border-[#C5A059]/30">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCustomer}
              className="p-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
              title="กลับสู่หน้าร้านลูกค้า"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold">
                  ระบบจัดการหลังบ้านร้านค้า (Vendor Portal)
                </h1>
                <span className="text-[10px] bg-[#C5A059] text-[#062E1F] font-bold px-2 py-0.5 rounded">
                  PARTNER
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                จัดการคิวเตาถ่าน รับออเดอร์จากระบบตะกร้ารวม และเปิด-ปิดสถานะสินค้า
              </p>
            </div>
          </div>

          {/* Shop Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-200 font-medium whitespace-nowrap">เลือกร้านค้า:</span>
            <select
              value={selectedShopId}
              onChange={e => setSelectedShopId(e.target.value)}
              className="text-xs p-2 rounded-lg bg-emerald-950 border border-emerald-700 text-white font-medium focus:outline-none cursor-pointer"
            >
              {VENDORS.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Shop KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
              <DollarSign className="w-4 h-4 text-[#8C6D23]" />
              <span>ยอดขายสะสมร้านนี้</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#062E1F] tabular-nums">
              ฿{totalRevenue.toLocaleString()}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>จำนวนคำสั่งซื้อ</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-800 tabular-nums">
              {shopOrders.length} ออเดอร์
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>เตาถ่านไม้มะดัน</span>
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1">
              {selectedVendor.isGICertified ? 'GI แท้ 100% พร้อมย่าง' : 'พร้อมบริการ'}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>เวลาเตรียมเฉลี่ย</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-800 tabular-nums">
              {selectedVendor.preparationTimeMinutes} นาที
            </div>
          </div>
        </div>

        {/* Main Grid: Orders Queue (Left) & Menu Stock Manager (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Incoming Orders Queue */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#062E1F] flex items-center gap-2">
                <Store className="w-4 h-4 text-[#C5A059]" />
                <span>คิวคำสั่งซื้อที่ต้องปรุง ({selectedVendor.name})</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {shopOrders.length} รายการ
              </span>
            </div>

            {shopOrders.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center text-slate-500 space-y-2">
                <Clock className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-700">ไม่มีออเดอร์ค้างในขณะนี้</h3>
                <p className="text-xs">
                  เมื่อลูกค้าสั่งซื้ออาหารจากหน้าร้านที่มีเมนูของร้านนี้ รายการจะปรากฏขึ้นที่นี่โดยอัตโนมัติ
                </p>
              </div>
            ) : (
              shopOrders.map(item => (
                <div
                  key={item.orderId}
                  className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-[#062E1F] bg-stone-100 px-2 py-0.5 rounded">
                          #{item.orderId}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(item.createdAt).toLocaleTimeString('th-TH')}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mt-1">
                        ผู้สั่ง: {item.customer.name} ({item.customer.phone})
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.customer.address}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-[#062E1F] tabular-nums text-sm">
                        ฿{item.group.subtotal}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {item.customer.deliveryMethod === 'express_local' ? 'ส่งด่วนในพื้นที่' : 'ส่งเย็น Inter Express'}
                      </div>
                    </div>
                  </div>

                  {/* Items for this shop */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-2 text-xs">
                    {item.group.items.map(dish => (
                      <div key={dish.id} className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-800">
                            {dish.quantity}x {dish.name}
                          </span>
                          <span className="text-slate-500 ml-1">({dish.portion})</span>
                          <div className="text-[11px] text-slate-500">
                            รสชาติ: {dish.spiceLevel} · น้ำจิ้ม: {dish.sauceChoice}
                            {dish.specialNotes && (
                              <span className="text-amber-800 ml-1">"{dish.specialNotes}"</span>
                            )}
                          </div>
                        </div>
                        <span className="font-mono font-semibold tabular-nums text-slate-700">
                          ฿{dish.itemTotal}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Status Controller */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100">
                    <div className="text-xs font-medium text-slate-600">
                      ปรับสถานะการเตรียมอาหาร:
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(['received', 'marinating', 'grilling', 'delivering', 'completed'] as OrderStatus[]).map(st => {
                        const isCurrent = item.group.status === st;
                        const labels: Record<OrderStatus, string> = {
                          received: 'รับออเดอร์',
                          marinating: 'หนีบไม้มะดัน',
                          grilling: 'ขึ้นเตาย่าง',
                          rider_picked: 'บรรจุห่อ',
                          delivering: 'กำลังส่ง',
                          completed: 'เสร็จสิ้น'
                        };
                        return (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(item.orderId, st)}
                            className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                              isCurrent
                                ? 'bg-[#062E1F] text-[#E6CA65] font-bold'
                                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                            }`}
                          >
                            {labels[st]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Menu Items Availability Manager */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-base font-bold text-[#062E1F] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#C5A059]" />
              <span>จัดการสต็อกเมนู ({vendorMenuItems.length} เมนู)</span>
            </h2>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-2xs">
              {vendorMenuItems.map(menu => (
                <div key={menu.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {menu.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                        ฿{menu.price} · {menu.isSignature ? 'ซิกเนเจอร์' : 'เมนูดั้งเดิม'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleItemStock(menu.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      menu.available
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {menu.available ? 'พร้อมขาย (In Stock)' : 'ของหมด (Sold Out)'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#8C6D23]" />
                <span>คำแนะนำสำหรับพาร์ทเนอร์ห้วยทับทัน</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                การย่างด้วยไม้มะดันแท้จะใช้เวลาเฉลี่ย 20-30 นาที หากออเดอร์หนาแน่น สามารถปรับสถานะเป็น "หนีบไม้มะดัน" หรือ "ขึ้นเตาย่าง" เพื่อให้ลูกค้ารับทราบสถานะแบบเรียลไทม์
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
