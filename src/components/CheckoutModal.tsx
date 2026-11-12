import React, { useState } from 'react';
import { X, Store, Truck, ShieldCheck, QrCode, CreditCard, Banknote, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { VENDORS } from '../data/mockData';

interface CheckoutModalProps {
  targetShopId?: string; // If null, check out all shops
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  targetShopId,
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { groupedCart, placeOrder } = useCart();

  const [name, setName] = useState('คุณสุรศักดิ์ ใจมั่นคง');
  const [phone, setPhone] = useState('089-123-4567');
  const [address, setAddress] = useState('99/14 หมู่บ้านพฤกษาภิรมย์ ต.เมืองเหนือ อ.เมือง');
  const [province, setProvince] = useState('ศรีสะเกษ 33000');
  const [deliveryMethod, setDeliveryMethod] = useState<'express_local' | 'inter_express_chilled'>('express_local');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card' | 'cod'>('promptpay');
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  // Filter groups
  const shopGroups = targetShopId
    ? Object.values(groupedCart).filter(g => g.shopId === targetShopId)
    : Object.values(groupedCart);

  if (shopGroups.length === 0) {
    onClose();
    return null;
  }

  const totalFood = shopGroups.reduce((sum, g) => sum + g.subtotal, 0);
  const totalRawDelivery = shopGroups.reduce((sum, g) => sum + g.deliveryFee, 0);
  const multiDiscount = shopGroups.length > 1 ? 25 : 0;
  const finalDelivery = Math.max(0, totalRawDelivery - multiDiscount);
  const grandTotal = totalFood + finalDelivery;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingPayment(true);

    setTimeout(() => {
      placeOrder({
        customer: {
          name,
          phone,
          address,
          province,
          deliveryMethod,
          notes: orderNotes
        },
        paymentMethod,
        shopIdFilter: targetShopId
      });
      setIsSimulatingPayment(false);
      onClose();
      onOrderSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#062E1F] text-white flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
              ยืนยันคำสั่งซื้อ & ชำระเงิน (Grouped Checkout)
            </h2>
            <div className="text-xs text-[#E6CA65] mt-0.5">
              {targetShopId ? 'ชำระเฉพาะร้านเดี่ยว' : `รวมคำสั่งซื้อข้ามร้าน (${shopGroups.length} ร้านค้า)`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
          
          {/* Section 1: Multi-Vendor Order Group Breakdown */}
          <div>
            <div className="text-xs font-bold text-[#062E1F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#C5A059]" />
              <span>สรุปรายการตามร้านค้า (Group by Shop)</span>
            </div>

            <div className="space-y-3">
              {shopGroups.map(group => {
                const vendor = VENDORS.find(v => v.id === group.shopId);
                return (
                  <div key={group.shopId} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between font-bold text-xs text-[#062E1F] mb-1.5 pb-1.5 border-b border-stone-200">
                      <div className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-[#8C6D23]" />
                        <span>{group.shopName}</span>
                      </div>
                      <span className="font-mono tabular-nums text-slate-600">
                        {group.items.length} เมนู
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {group.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-slate-700">
                          <span className="truncate pr-2">
                            {item.quantity}x {item.name} ({item.portion})
                          </span>
                          <span className="font-mono tabular-nums text-slate-900 shrink-0">
                            ฿{item.itemTotal}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 mt-2 border-t border-stone-100">
                      <span>เวลาจัดเตรียม: ~{vendor?.preparationTimeMinutes || 20} นาที</span>
                      <span>ค่าส่งร้านนี้: {group.deliveryFee === 0 ? 'ฟรี' : `฿${group.deliveryFee}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Delivery Method */}
          <div>
            <label className="text-xs font-bold text-[#062E1F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>รูปแบบการจัดส่ง</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                onClick={() => setDeliveryMethod('express_local')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'express_local'
                    ? 'border-[#062E1F] bg-emerald-50/50 text-[#062E1F]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'express_local' ? 'border-[#062E1F] bg-[#062E1F]' : 'border-stone-300'
                  }`}>
                    {deliveryMethod === 'express_local' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span>จัดส่งด่วนไรเดอร์ (ในพื้นที่)</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-5.5">
                  ห้วยทับทัน - เมืองศรีสะเกษ 30–45 นาที ร้อนๆ จากเตาถ่าน
                </p>
              </label>

              <label
                onClick={() => setDeliveryMethod('inter_express_chilled')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'inter_express_chilled'
                    ? 'border-[#062E1F] bg-emerald-50/50 text-[#062E1F]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'inter_express_chilled' ? 'border-[#062E1F] bg-[#062E1F]' : 'border-stone-300'
                  }`}>
                    {deliveryMethod === 'inter_express_chilled' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span>ส่งเย็นสุญญากาศ ทั่วประเทศ</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-5.5">
                  กล่องควบคุมความเย็น 1–2 วัน พร้อมวิธีอุ่นหนังกรอบ
                </p>
              </label>
            </div>
          </div>

          {/* Section 3: Customer Information */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#062E1F] uppercase tracking-wider">
              ข้อมูลผู้รับและที่อยู่จัดส่ง
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  เบอร์โทรศัพท์ติดต่อ *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                ที่อยู่จัดส่ง (บ้านเลขที่ / ถนน / ซอย / จุดสังเกต) *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  จังหวัด / รหัสไปรษณีย์
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  หมายเหตุเพิ่มเติมถึงไรเดอร์
                </label>
                <input
                  type="text"
                  placeholder="เช่น ฝากไว้ที่ป้อม รปภ., โทรเมื่อถึง"
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div>
            <div className="text-xs font-bold text-[#062E1F] uppercase tracking-wider mb-2">
              ช่องทางการชำระเงิน
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('promptpay')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'promptpay'
                    ? 'border-[#062E1F] bg-[#062E1F] text-[#E6CA65] font-bold'
                    : 'border-stone-200 text-slate-700 hover:border-stone-300'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] block">พร้อมเพย์ QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#062E1F] bg-[#062E1F] text-[#E6CA65] font-bold'
                    : 'border-stone-200 text-slate-700 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] block">บัตรเครดิต</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#062E1F] bg-[#062E1F] text-[#E6CA65] font-bold'
                    : 'border-stone-200 text-slate-700 hover:border-stone-300'
                }`}
              >
                <Banknote className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[11px] block">เก็บปลายทาง (COD)</span>
              </button>
            </div>

            {/* PromptPay QR Interactive Display */}
            {paymentMethod === 'promptpay' && (
              <div className="p-4 bg-emerald-950 text-white rounded-xl border border-[#C5A059]/40 text-center space-y-3">
                <div className="text-xs text-[#E6CA65] font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>สแกน QR Code ชำระเงินผ่าน Mobile Banking ทุกธนาคาร</span>
                </div>

                <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-md">
                  {/* Dynamic simulated QR representation */}
                  <div className="w-full h-full border-2 border-slate-900 p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-900 rounded-xs" />
                      <div className="w-6 h-6 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="text-[9px] font-mono text-slate-900 font-bold tracking-widest text-center">
                      PROMPTPAY<br />
                      ฿{grandTotal}
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-900 rounded-xs" />
                      <div className="w-4 h-4 bg-slate-900 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-emerald-200 font-mono">
                  ยอดชำระ: <strong className="text-[#E6CA65] text-sm">฿{grandTotal.toLocaleString()}</strong>
                  <br />
                  <span className="text-[10px] text-emerald-400">ระบบจะตรวจสอบยอดเงินอัตโนมัติภายใน 3 วินาที</span>
                </div>

                {!paymentVerified ? (
                  <button
                    type="button"
                    onClick={() => setPaymentVerified(true)}
                    className="px-4 py-1.5 bg-[#C5A059] text-[#062E1F] text-xs font-bold rounded-lg hover:bg-[#E6CA65] transition-colors cursor-pointer"
                  >
                    ฉันสแกนจ่ายแล้ว (จำลองการยืนยันทันที)
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-900/80 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>ยืนยันสลิปสำเร็จเรียบร้อย พร้อมกดยืนยันคำสั่งซื้อ!</span>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'credit_card' && (
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                <input
                  type="text"
                  placeholder="หมายเลขบัตร 16 หลัก"
                  defaultValue="4000 1234 5678 9010"
                  className="w-full text-xs p-2 rounded-lg border border-stone-300 font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="text-xs p-2 rounded-lg border border-stone-300 font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="888"
                    className="text-xs p-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                คุณสามารถเตรียมเงินสดจำนวน <strong>฿{grandTotal.toLocaleString()}</strong> มอบให้ไรเดอร์หรือพนักงานขนส่งเมื่อสินค้าถึงมือ
              </div>
            )}
          </div>

          {/* Price Calculation Summary */}
          <div className="p-4 bg-stone-100 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>รวมค่าอาหาร</span>
              <span className="font-mono tabular-nums">฿{totalFood.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ค่าจัดส่งรวม ({shopGroups.length} ร้าน)</span>
              <span className="font-mono tabular-nums">{finalDelivery === 0 ? 'ฟรี' : `฿${finalDelivery}`}</span>
            </div>
            {multiDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>ส่วนลดแพ็กเกจส่งหลายร้าน</span>
                <span className="font-mono tabular-nums">-฿{multiDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-extrabold text-[#062E1F] pt-2 border-t border-stone-200">
              <span>ยอดชำระทั้งสิ้น</span>
              <span className="font-mono tabular-nums text-base text-[#062E1F]">
                ฿{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSimulatingPayment}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-[#062E1F] hover:bg-[#0D3828] text-[#E6CA65] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSimulatingPayment ? (
                <>
                  <Clock className="w-4 h-4 animate-spin text-[#E6CA65]" />
                  <span>กำลังประมวลผลคำสั่งซื้อ...</span>
                </>
              ) : (
                <>
                  <span>ยืนยันการสั่งซื้อ</span>
                  <span className="font-mono tabular-nums">(฿{grandTotal.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
