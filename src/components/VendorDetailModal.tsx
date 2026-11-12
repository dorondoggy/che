import React from 'react';
import { X, ShieldCheck, MapPin, Phone, Clock, Star, Flame } from 'lucide-react';
import { Vendor } from '../types';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onSelectShopMenu: (shopId: string) => void;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  onClose,
  onSelectShopMenu
}) => {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Header with image */}
        <div className="relative h-48 w-full bg-[#062E1F] overflow-hidden">
          <img
            src={vendor.bannerImage}
            alt={vendor.name}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062E1F] via-[#062E1F]/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C5A059] text-[#062E1F] text-xs font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ตรา GI สัญลักษณ์คุ้มครองลิขสิทธิ์</span>
            </div>
            <h3 className="text-xl font-extrabold text-white leading-tight">
              {vendor.name}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              {vendor.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">คะแนนรีวิว</div>
              <div className="font-bold text-amber-700 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{vendor.rating}</span>
                <span className="text-slate-400">({vendor.reviewCount})</span>
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">เวลาเตรียมอาหาร</div>
              <div className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>~{vendor.preparationTimeMinutes} นาที</span>
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">จัดส่งฟรีเมื่อครบ</div>
              <div className="font-bold text-emerald-700 mt-0.5">
                ฿{vendor.freeDeliveryThreshold}
              </div>
            </div>
          </div>

          {/* Story & Heritage */}
          <div>
            <h4 className="font-bold text-[#062E1F] flex items-center gap-2 mb-1.5">
              <span>ภูมิปัญญา & ประวัติร้าน</span>
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 bg-[#F9FAF7] p-3.5 rounded-lg border border-stone-100">
              {vendor.story}
            </p>
          </div>

          {/* Madan Wood Provenance */}
          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 mb-1">
              <Flame className="w-4 h-4 text-[#C5A059]" />
              <span>แหล่งที่มาของไม้มะดันแท้ (Provenance)</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {vendor.madanWoodProvenance}
            </p>
          </div>

          {/* Contact & Location */}
          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-stone-100">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{vendor.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>โทร: {vendor.phone}</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            ปิด
          </button>
          <button
            onClick={() => {
              onSelectShopMenu(vendor.id);
              onClose();
            }}
            className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#062E1F] hover:bg-[#0D3828] text-[#E6CA65] shadow-sm cursor-pointer"
          >
            เปิดดูรายการอาหารของร้านนี้
          </button>
        </div>

      </div>
    </div>
  );
};
