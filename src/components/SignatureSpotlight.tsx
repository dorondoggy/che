import React from 'react';
import { Sparkles, Plus, Store, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface SignatureSpotlightProps {
  signatureItems: MenuItem[];
  onSelectForCustomization: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onSelectVendor: (shopId: string) => void;
}

export const SignatureSpotlight: React.FC<SignatureSpotlightProps> = ({
  signatureItems,
  onSelectForCustomization,
  onQuickAdd,
  onSelectVendor
}) => {
  const [quickAddedId, setQuickAddedId] = React.useState<string | null>(null);

  const handleQuickAddClick = (item: MenuItem) => {
    onQuickAdd(item);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1500);
  };

  return (
    <section id="signature-section" className="py-14 bg-gradient-to-b from-[#F3F5EE] to-[#F8F9F5] border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D23] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>ยกระดับไก่ย่างไม้มะดันศรีสะเกษสู่สากล</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062E1F] tracking-tight">
              5 เมนูพิเศษซิกเนเจอร์ (Signature Menus)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              สร้างความแตกต่างเฉพาะตัวในแต่ละร้านค้า ผสานภูมิปัญญาเตาถ่านไม้มะดันเข้ากับความคิดสร้างสรรค์ร่วมสมัย
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            สั่งรวมกันได้ข้ามร้าน · ระบบจะจัดกลุ่มบิลให้อัตโนมัติ
          </div>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureItems.map((item, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <div
                key={item.id}
                className={`group bg-white rounded-xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative ${
                  isFeatured ? 'md:col-span-1 lg:col-span-1 border-amber-300/60' : ''
                }`}
              >
                {/* Image Container with 4:3 Aspect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Shop Tag Overlay */}
                  <button
                    onClick={() => onSelectVendor(item.shopId)}
                    className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#062E1F]/90 backdrop-blur-sm border border-[#C5A059]/40 text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#062E1F] transition-colors cursor-pointer"
                  >
                    <Store className="w-3 h-3 text-[#E6CA65]" />
                    <span>{item.shopName}</span>
                  </button>

                  {/* Highlight Ribbon */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    ซิกเนเจอร์ประจำร้าน
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#062E1F] group-hover:text-[#0F4C35] transition-colors leading-snug mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Price and Options Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 mb-3">
                      <div>
                        <span className="text-xs text-slate-400">เริ่มต้นที่</span>
                        <div className="text-lg font-bold text-[#062E1F] tabular-nums font-mono">
                          ฿{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-slate-500">
                        {item.portionOptions.length} ขนาดตัวเลือก
                        <br />
                        <span className="text-emerald-700 font-medium">ปรุงสดใหม่ ~{item.preparationTimeMinutes} นาที</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectForCustomization(item)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors text-center cursor-pointer"
                      >
                        ปรับแต่งเมนูนี้
                      </button>
                      <button
                        onClick={() => handleQuickAddClick(item)}
                        disabled={quickAddedId === item.id}
                        className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          quickAddedId === item.id
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#062E1F] hover:bg-[#0D3828] text-[#E6CA65]'
                        }`}
                      >
                        {quickAddedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ใส่แล้ว!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>ใส่ตะกร้า</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
