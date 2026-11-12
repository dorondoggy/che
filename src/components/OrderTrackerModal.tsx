import React from 'react';
import { X, CheckCircle2, Clock, Flame, Truck, Package, Store, Phone, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderStatus } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'received', label: 'รับออเดอร์', icon: <Store className="w-4 h-4" />, desc: 'ร้านค้าเปิดเตาถ่านเตรียมพร้อม' },
  { key: 'marinating', label: 'หมักสมุนไพร & หนีบไม้มะดัน', icon: <Sparkles className="w-4 h-4" />, desc: 'คัดกิ่งไม้มะดันสด 3 ท่อน หนีบตัวไก่' },
  { key: 'grilling', label: 'ย่างถ่านไฟรุมหอมกรุ่น', icon: <Flame className="w-4 h-4" />, desc: 'รมควันไม้มะดัน หนังกรอบทอง' },
  { key: 'rider_picked', label: 'แพ็กบรรจุภัณฑ์', icon: <Package className="w-4 h-4" />, desc: 'ห่อใบตอง/สุญญากาศคงความหอม' },
  { key: 'delivering', label: 'ไรเดอร์กำลังนำส่ง', icon: <Truck className="w-4 h-4" />, desc: 'มุ่งหน้าสู่ปลายทางของคุณ' },
  { key: 'completed', label: 'จัดส่งสำเร็จ', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'พร้อมทานให้อร่อย!' }
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const { activeOrder, orders, setActiveOrder, updateOrderStatus } = useCart();

  if (!isOpen) return null;

  const currentOrder = activeOrder || orders[0];

  if (!currentOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4">
          <Clock className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">ยังไม่มีรายการสั่งซื้อที่กำลังดำเนินการ</h3>
          <p className="text-xs text-slate-500">เลือกอาหารและกดยืนยันสั่งซื้อเพื่อติดตามสถานะได้ทันที</p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-[#062E1F] text-[#E6CA65] rounded-lg cursor-pointer"
          >
            กลับสู่หน้าร้าน
          </button>
        </div>
      </div>
    );
  }

  const advanceShopStatus = (shopId: string, currentStatus: OrderStatus) => {
    const keys: OrderStatus[] = ['received', 'marinating', 'grilling', 'rider_picked', 'delivering', 'completed'];
    const idx = keys.indexOf(currentStatus);
    if (idx < keys.length - 1) {
      updateOrderStatus(currentOrder.id, shopId, keys[idx + 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#062E1F] text-white flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#C5A059] text-[#062E1F] font-bold px-2 py-0.5 rounded">
                ORDER #{currentOrder.id}
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                {new Date(currentOrder.createdAt).toLocaleTimeString('th-TH')}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              ติดตามสถานะคำสั่งซื้อแบบเรียลไทม์
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          
          {/* Order Switcher if multiple */}
          {orders.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-slate-500 font-medium shrink-0">เลือกดูออเดอร์:</span>
              {orders.map(ord => (
                <button
                  key={ord.id}
                  onClick={() => setActiveOrder(ord)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums whitespace-nowrap cursor-pointer transition-colors ${
                    ord.id === currentOrder.id
                      ? 'bg-[#062E1F] text-[#E6CA65] font-bold'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  #{ord.id}
                </button>
              ))}
            </div>
          )}

          {/* Delivery & Customer Info Card */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">ผู้รับสินค้า</div>
              <div className="font-bold text-slate-800">{currentOrder.customer.name} ({currentOrder.customer.phone})</div>
              <div className="text-slate-600 mt-0.5">{currentOrder.customer.address}, {currentOrder.customer.province}</div>
            </div>
            <div className="sm:text-right shrink-0">
              <div className="text-slate-400 text-[11px]">วิธีจัดส่ง</div>
              <div className="font-bold text-emerald-800">
                {currentOrder.customer.deliveryMethod === 'express_local'
                  ? 'ไรเดอร์ส่งด่วนในพื้นที่ (30-45 นาที)'
                  : 'ส่งเย็นสุญญากาศทั่วประเทศ (Inter Express)'}
              </div>
              <div className="text-slate-500 mt-0.5">
                ยอดชำระ: <strong className="text-slate-800 font-mono">฿{currentOrder.grandTotal}</strong> ({currentOrder.paymentMethod === 'promptpay' ? 'พร้อมเพย์แล้ว' : 'รอชำระ'})
              </div>
            </div>
          </div>

          {/* Status by Shop Group (Multi-Vendor timeline) */}
          <div className="space-y-6">
            <div className="text-xs font-bold text-[#062E1F] uppercase tracking-wider flex items-center justify-between">
              <span>สถานะการย่างและเตรียมอาหารแยกตามร้าน</span>
              <span className="text-[11px] text-slate-400 font-normal">
                กด "จำลองก้าวถัดไป" เพื่อทดสอบสเต็ป
              </span>
            </div>

            {currentOrder.shopGroups.map(group => {
              const currentStepIdx = STATUS_STEPS.findIndex(s => s.key === group.status);

              return (
                <div key={group.shopId} className="p-4 bg-white rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
                  {/* Shop Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950 text-[#E6CA65] flex items-center justify-center font-bold">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#062E1F]">{group.shopName}</h4>
                        <div className="text-[11px] text-slate-500">
                          {group.items.map(i => `${i.quantity}x ${i.name}`).join(' · ')}
                        </div>
                      </div>
                    </div>

                    {group.status !== 'completed' && (
                      <button
                        onClick={() => advanceShopStatus(group.shopId, group.status)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-md transition-colors cursor-pointer"
                        title="จำลองสถานะของร้านนี้ไปยังขั้นถัดไป"
                      >
                        จำลองขั้นถัดไป →
                      </button>
                    )}
                  </div>

                  {/* Visual Step Timeline */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 border-t border-stone-100">
                    {STATUS_STEPS.map((step, idx) => {
                      const isDone = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div
                          key={step.key}
                          className={`p-2 rounded-lg text-center transition-all ${
                            isCurrent
                              ? 'bg-[#062E1F] text-[#E6CA65] font-bold shadow-xs'
                              : isDone
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-stone-50 text-stone-400'
                          }`}
                        >
                          <div className="flex justify-center mb-1">
                            {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : step.icon}
                          </div>
                          <div className="text-[10px] leading-tight font-medium">{step.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-xs bg-stone-50 p-2.5 rounded-lg text-slate-600 flex items-center justify-between">
                    <span className="italic">
                      "สถานะปัจจุบัน: {STATUS_STEPS[currentStepIdx]?.desc}"
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold shrink-0">
                      ~{Math.max(5, group.estimatedMinutes - currentStepIdx * 5)} นาที
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Reheat Instructions for Madan Wood Chicken */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-700" />
              <span>เคล็ดลับการอุ่นไก่ย่างไม้มะดันให้กรอบนอกนุ่มฉ่ำใน</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              นำเข้าหม้อทอดไร้น้ำมัน (Air Fryer) อุณหภูมิ 180°C เป็นเวลา 4–6 นาที หรือย่างเตาถ่านเบาๆ อีกครั้ง กลิ่นหอมระเหยของไม้มะดันจะฟุ้งกระจายเหมือนทานหน้าร้านที่ห้วยทับทัน!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>ศูนย์บริการลูกค้าห้วยทับทัน: 081-456-7890</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-stone-200 hover:bg-stone-300 text-slate-800 cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
