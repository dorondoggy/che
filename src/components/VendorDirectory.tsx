import React from 'react';
import { Star, Clock, Truck, ShieldCheck, ChevronRight, Store } from 'lucide-react';
import { Vendor } from '../types';

interface VendorDirectoryProps {
  vendors: Vendor[];
  selectedVendorId: string | null;
  onSelectVendor: (shopId: string) => void;
  onViewVendorDetail: (vendor: Vendor) => void;
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({
  vendors,
  selectedVendorId,
  onSelectVendor,
  onViewVendorDetail
}) => {
  return (
    <section id="vendors-section" className="py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#8C6D23] uppercase tracking-wider mb-1">
              ผู้ผลิตต้นตำรับ GI ห้วยทับทัน
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062E1F] tracking-tight">
              5 ร้านเตาถ่านไม้มะดันชื่อดัง (Official Vendors)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              คัดสรรร้านย่างเตาถ่านที่มีเอกลักษณ์การหมักและแหล่งไม้มะดันแท้ 100% สามารถเลือกสั่งเฉพาะร้าน หรือสั่งรวมกันข้ามร้านได้
            </p>
          </div>
          
          {selectedVendorId && (
            <button
              onClick={() => onSelectVendor('all')}
              className="text-xs font-semibold text-[#0F4C35] hover:text-[#062E1F] underline cursor-pointer"
            >
              แสดงเมนูทุกร้านรวมกัน
            </button>
          )}
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map(vendor => {
            const isSelected = selectedVendorId === vendor.id;
            return (
              <div
                key={vendor.id}
                className={`rounded-xl border transition-all p-5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#FAF8F2] shadow-md ring-1 ring-[#C5A059]'
                    : 'border-stone-200 bg-white hover:border-[#C5A059]/60 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Top Bar: Name & GI Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-emerald-950 flex items-center justify-center text-white shrink-0 font-bold overflow-hidden border border-[#C5A059]/40">
                        <Store className="w-5 h-5 text-[#E6CA65]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#062E1F] leading-tight">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-amber-700 mt-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="font-semibold tabular-nums">{vendor.rating}</span>
                          <span className="text-stone-400">({vendor.reviewCount} รีวิว)</span>
                        </div>
                      </div>
                    </div>

                    {vendor.isGICertified && (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-700" />
                        <span>GI แท้</span>
                      </span>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-slate-600 line-clamp-2 my-2.5 leading-relaxed">
                    {vendor.tagline}
                  </p>

                  {/* Specs & Metadata */}
                  <div className="space-y-1.5 text-xs text-slate-500 py-2 border-t border-b border-stone-100 my-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>เวลาปรุงเฉลี่ย</span>
                      </span>
                      <span className="font-medium text-slate-700 tabular-nums">~{vendor.preparationTimeMinutes} นาที</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-slate-400" />
                        <span>ค่าส่งเริ่มต้น</span>
                      </span>
                      <span className="font-medium text-slate-700 tabular-nums">
                        ฿{vendor.baseDeliveryFee} (ส่งฟรีเมื่อครบ ฿{vendor.freeDeliveryThreshold})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onViewVendorDetail(vendor)}
                    className="py-2 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-slate-700 text-xs font-medium text-center cursor-pointer"
                  >
                    ประวัติ & เรื่องเล่า
                  </button>
                  <button
                    onClick={() => onSelectVendor(vendor.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#062E1F] text-[#E6CA65]'
                        : 'bg-emerald-900/10 hover:bg-emerald-900/20 text-[#062E1F]'
                    }`}
                  >
                    <span>{isSelected ? 'กำลังดูร้านนี้' : 'เลือกดูเมนู'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
