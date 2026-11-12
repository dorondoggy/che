import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Store, ArrowRight, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onOpenCheckout: (targetShopId?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    groupedCart,
    cartItems,
    totalItemsCount,
    totalFoodAmount,
    totalDeliveryFee,
    multiVendorDiscount,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    clearShopItems
  } = useCart();

  if (!isCartOpen) return null;

  const shopGroups = Object.values(groupedCart);
  const shopCount = shopGroups.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#062E1F] text-white flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C5A059] text-[#062E1F] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">
                  ตะกร้าสินค้าข้ามร้าน
                </h2>
                <div className="text-xs text-[#E6CA65] flex items-center gap-1.5 mt-0.5">
                  <span>{totalItemsCount} รายการ</span>
                  <span>·</span>
                  <span>รวมจาก {shopCount} ร้านเตาถ่าน</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-emerald-300 hover:text-white px-2 py-1 rounded hover:bg-emerald-900/60 transition-colors cursor-pointer"
                  title="ล้างตะกร้าทั้งหมด"
                >
                  ล้างทั้งหมด
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
                aria-label="ปิดตะกร้า"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body - Items Grouped by Shop */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {shopGroups.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">ตะกร้าของคุณว่างเปล่า</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  เลือกเมนูไก่ย่างไม้มะดันสูตรโบราณหรือ 5 เมนูซิกเนเจอร์เพื่อเริ่มสั่งซื้อ
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#062E1F] text-[#E6CA65] hover:bg-[#0D3828] cursor-pointer"
                >
                  เลือกดูเมนูอาหาร
                </button>
              </div>
            ) : (
              shopGroups.map(group => {
                const isFreeDelivery = group.subtotal >= group.freeDeliveryThreshold;
                const remainingForFree = Math.max(0, group.freeDeliveryThreshold - group.subtotal);
                const progressPct = Math.min(100, (group.subtotal / group.freeDeliveryThreshold) * 100);

                return (
                  <div
                    key={group.shopId}
                    className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden shadow-2xs"
                  >
                    {/* Shop Header */}
                    <div className="p-3.5 bg-white border-b border-stone-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-[#8C6D23]" />
                        <h3 className="text-xs font-bold text-[#062E1F]">
                          {group.shopName}
                        </h3>
                      </div>
                      <button
                        onClick={() => clearShopItems(group.shopId)}
                        className="text-[11px] text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>ลบร้านนี้</span>
                      </button>
                    </div>

                    {/* Free Delivery Bar for this Shop */}
                    <div className="px-3.5 py-2 bg-[#F6F7F2] border-b border-stone-200/60 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3 text-[#0F4C35]" />
                          {isFreeDelivery ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> ส่งฟรีจากร้านนี้แล้ว!
                            </span>
                          ) : (
                            <span>
                              สั่งอีก <strong className="text-slate-800">฿{remainingForFree}</strong> เพื่อรับสิทธิ์ส่งฟรี
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          ฿{group.subtotal} / ฿{group.freeDeliveryThreshold}
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-1 transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-stone-100 p-2">
                      {group.items.map(item => (
                        <div key={item.id} className="p-2 sm:p-2.5 flex items-start gap-3 bg-white rounded-lg my-1">
                          {/* Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-md object-cover shrink-0 border border-stone-200"
                            referrerPolicy="no-referrer"
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-stone-400 hover:text-red-500 p-0.5 cursor-pointer"
                                aria-label="ลบรายการ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Customization Details */}
                            <div className="text-[11px] text-slate-500 space-y-0.5 mt-1 leading-tight">
                              <div>ขนาด: <span className="text-slate-700 font-medium">{item.portion}</span></div>
                              <div>ความเผ็ด: <span className="text-slate-700">{item.spiceLevel}</span></div>
                              <div>น้ำจิ้ม: <span className="text-slate-700">{item.sauceChoice}</span></div>
                              {item.sideDishAddons.length > 0 && (
                                <div>
                                  เครื่องเคียง: <span className="text-slate-700">{item.sideDishAddons.map(a => a.name).join(', ')}</span>
                                </div>
                              )}
                              {item.specialNotes && (
                                <div className="text-amber-800 italic">
                                  "{item.specialNotes}"
                                </div>
                              )}
                            </div>

                            {/* Stepper & Price Row */}
                            <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-stone-100">
                              <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-1.5 py-0.5 text-slate-600 hover:bg-stone-200 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold font-mono tabular-nums text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-1.5 py-0.5 text-slate-600 hover:bg-stone-200 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="text-right">
                                <div className="text-xs font-bold font-mono tabular-nums text-[#062E1F]">
                                  ฿{item.itemTotal.toLocaleString()}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono tabular-nums">
                                  (@฿{item.unitTotal})
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shop Subtotal Footer */}
                    <div className="p-3 bg-stone-100/70 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500">ค่าอาหารร้านนี้: </span>
                        <strong className="text-slate-800 font-mono tabular-nums">฿{group.subtotal}</strong>
                        <span className="text-slate-400 ml-1.5">
                          (ค่าส่ง {group.deliveryFee === 0 ? 'ฟรี' : `฿${group.deliveryFee}`})
                        </span>
                      </div>
                      
                      {/* Optional: Checkout only this shop */}
                      {shopCount > 1 && (
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            onOpenCheckout(group.shopId);
                          }}
                          className="text-[11px] font-semibold text-[#0F4C35] hover:underline cursor-pointer"
                        >
                          สั่งเฉพาะร้านนี้ →
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer - Consolidated Calculations & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 shrink-0 space-y-3">
              
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>รวมค่าอาหารทุกร้าน ({totalItemsCount} รายการ)</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">
                    ฿{totalFoodAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>ค่าจัดส่งรวม ({shopCount} ร้าน)</span>
                  </span>
                  <span className="font-mono tabular-nums text-slate-800">
                    {totalDeliveryFee === 0 ? 'ฟรี' : `฿${totalDeliveryFee}`}
                  </span>
                </div>

                {multiVendorDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>ส่วนลดรวมส่งข้ามร้าน (Multi-vendor Bundle)</span>
                    </span>
                    <span className="font-mono tabular-nums font-semibold">
                      -฿{multiVendorDiscount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-[#062E1F] pt-2 border-t border-stone-200">
                  <span>ยอดชำระสุทธิ (Grand Total)</span>
                  <span className="font-mono tabular-nums text-base text-[#062E1F]">
                    ฿{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#062E1F] hover:bg-[#0D3828] text-[#E6CA65] shadow-lg flex items-center justify-between cursor-pointer transition-all"
              >
                <span>ชำระเงินรวมทุกร้าน ({shopCount} ร้าน)</span>
                <span className="flex items-center gap-1">
                  <span className="font-mono tabular-nums text-sm">฿{grandTotal.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <div className="text-center text-[10px] text-slate-400">
                รองรับ PromptPay QR Code, บัตรเครดิต, และเก็บเงินปลายทาง
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
