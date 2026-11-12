import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, Store, Flame } from 'lucide-react';
import { MenuItem, SideAddon } from '../types';
import { useCart } from '../context/CartContext';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();

  if (!item) return null;

  const [selectedPortionIndex, setSelectedPortionIndex] = useState<number>(0);
  const [selectedSpice, setSelectedSpice] = useState<string>(item.spiceLevels[0] || 'สูตรมาตรฐาน');
  const [selectedSauce, setSelectedSauce] = useState<string>(item.sauceOptions[0] || 'แจ่วสูตรต้นตำรับ');
  const [selectedAddons, setSelectedAddons] = useState<SideAddon[]>([]);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const currentPortion = item.portionOptions[selectedPortionIndex] || {
    name: 'มาตรฐาน',
    priceDelta: 0
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + currentPortion.priceDelta + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: SideAddon) => {
    if (selectedAddons.some(a => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmAddToCart = () => {
    addToCart({
      menuItemId: item.id,
      shopId: item.shopId,
      shopName: item.shopName,
      name: item.name,
      basePrice: item.price,
      portion: currentPortion.name,
      portionPriceDelta: currentPortion.priceDelta,
      spiceLevel: selectedSpice,
      sauceChoice: selectedSauce,
      sideDishAddons: selectedAddons,
      specialNotes: specialNotes.trim(),
      quantity,
      image: item.image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Header with image preview */}
        <div className="relative h-44 w-full bg-stone-900 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-[#E6CA65] mb-1 font-medium">
              <Store className="w-3.5 h-3.5" />
              <span>{item.shopName}</span>
              {item.isSignature && (
                <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.2 rounded text-[10px] text-[#E6CA65] font-semibold">
                  ซิกเนเจอร์
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm text-slate-800">
          
          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed bg-[#F8F9F5] p-3 rounded-lg border border-stone-200/60">
            {item.description}
          </p>

          {/* Step 1: Portion Size (Required) */}
          {item.portionOptions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#062E1F] flex items-center gap-1.5">
                  <span>1. เลือกขนาด / ชุดเมนู</span>
                  <span className="text-amber-700 font-normal">*จำเป็น</span>
                </label>
              </div>

              <div className="space-y-2">
                {item.portionOptions.map((portion, idx) => {
                  const isSelected = selectedPortionIndex === idx;
                  const diffPrice = portion.priceDelta;
                  return (
                    <label
                      key={portion.name}
                      onClick={() => setSelectedPortionIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#062E1F] bg-emerald-50/50 text-[#062E1F] font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#062E1F] bg-[#062E1F]' : 'border-stone-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs">{portion.name}</span>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-600">
                        {diffPrice === 0 ? 'ราคามาตรฐาน' : diffPrice > 0 ? `+฿${diffPrice}` : `-฿${Math.abs(diffPrice)}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Spice Level */}
          {item.spiceLevels.length > 0 && (
            <div>
              <label className="text-xs font-bold text-[#062E1F] flex items-center gap-1.5 mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>2. เลือกระดับความเผ็ดของน้ำจิ้ม/เครื่องหมัก</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.spiceLevels.map(spice => {
                  const isSelected = selectedSpice === spice;
                  return (
                    <button
                      type="button"
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#062E1F] bg-[#062E1F] text-[#E6CA65] font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-slate-700 bg-white'
                      }`}
                    >
                      {spice}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Signature Sauce Choice */}
          {item.sauceOptions.length > 0 && (
            <div>
              <label className="text-xs font-bold text-[#062E1F] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>3. เลือกสูตรน้ำจิ้มแจ่วไม้มะดัน</span>
              </label>

              <div className="space-y-2">
                {item.sauceOptions.map(sauce => {
                  const isSelected = selectedSauce === sauce;
                  return (
                    <label
                      key={sauce}
                      onClick={() => setSelectedSauce(sauce)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#FFFBF0] text-[#062E1F] font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#C5A059] bg-[#C5A059]' : 'border-stone-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs">{sauce}</span>
                      </div>
                      <span className="text-[11px] text-emerald-800">รวมในเซ็ต</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Side Dish Addons */}
          {item.sideDishOptions.length > 0 && (
            <div>
              <label className="text-xs font-bold text-[#062E1F] flex items-center justify-between mb-2">
                <span>4. เครื่องเคียงเพิ่มเติม (เลือกได้มากกว่า 1 อย่าง)</span>
                <span className="text-[11px] text-slate-400 font-normal">ตัวเลือกเสริม</span>
              </label>

              <div className="space-y-2">
                {item.sideDishOptions.map(addon => {
                  const isChecked = selectedAddons.some(a => a.name === addon.name);
                  return (
                    <label
                      key={addon.name}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#062E1F] bg-emerald-50/50 text-[#062E1F]'
                          : 'border-stone-200 hover:border-stone-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'border-[#062E1F] bg-[#062E1F] text-white' : 'border-stone-300'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs">{addon.name}</span>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-700">
                        +฿{addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Special Notes to Shop */}
          <div>
            <label className="text-xs font-bold text-[#062E1F] block mb-1.5">
              5. ข้อความระบุเพิ่มเติมถึงทางร้าน
            </label>
            <input
              type="text"
              placeholder="เช่น ย่างหนังกรอบๆ, แยกพริก, สับเป็นชิ้นพร้อมทาน"
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059]"
              maxLength={120}
            />
          </div>

        </div>

        {/* Modal Footer: Stepper & Add to Cart button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0">
          
          {/* Stepper */}
          <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 text-slate-600 hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="ลดจำนวน"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center text-xs font-bold font-mono tabular-nums text-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-slate-600 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="เพิ่มจำนวน"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleConfirmAddToCart}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#062E1F] hover:bg-[#0D3828] text-[#E6CA65] shadow-md flex items-center justify-between cursor-pointer transition-all"
          >
            <span>เพิ่มลงตะกร้า ({item.shopName})</span>
            <span className="font-mono tabular-nums text-sm">
              ฿{totalPrice.toLocaleString()}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
