import React from 'react';
import { ShieldCheck, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onOpenGIModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGIModal, onNavigateSection }) => {
  return (
    <footer className="bg-[#052418] text-emerald-100 border-t border-[#C5A059]/25 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900/60">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-[#062E1F] font-bold flex items-center justify-center text-sm">
                มด
              </div>
              <span className="font-bold text-white text-base">ห้วยทับทัน มาสเตอร์</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              แพลตฟอร์มมัลติเวนเดอร์ศูนย์รวมไก่ย่างไม้มะดันแท้แห่งแรกของจังหวัดศรีสะเกษ ขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์ (GI)
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-[#E6CA65] uppercase tracking-wider mb-2">เมนู & ร้านค้า</div>
            <div>
              <button
                onClick={() => onNavigateSection('signature-section')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                5 เมนูพิเศษซิกเนเจอร์
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigateSection('vendors-section')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                5 ร้านเตาถ่านชื่อดัง
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigateSection('catalog-section')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                รายการอาหารทั้งหมด
              </button>
            </div>
          </div>

          {/* GI Trust & Standard */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-[#E6CA65] uppercase tracking-wider mb-2">มาตรฐาน GI</div>
            <div>
              <button
                onClick={onOpenGIModal}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>ตราสิ่งบ่งชี้ทางภูมิศาสตร์ สช 62000012</span>
              </button>
            </div>
            <div className="text-emerald-300/70 text-[11px] leading-relaxed">
              คุ้มครองภูมิปัญญาไม้มะดันสด 3 กิ่ง ลุ่มน้ำห้วยทับทัน โดยกรมทรัพย์สินทางปัญญา
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-xs text-emerald-200/80">
            <div className="font-bold text-[#E6CA65] uppercase tracking-wider mb-2">ติดต่อศูนย์บริการ</div>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <span>ศูนย์ประสานงานกลุ่มวิสาหกิจไก่ย่างไม้มะดัน อ.ห้วยทับทัน จ.ศรีสะเกษ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>081-456-7890 (สายด่วน)</span>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/60 gap-3">
          <div>
            © 2026 Huai Thap Than Madan Wood Grilled Chicken Platform. All rights reserved.
          </div>
          <div>
            ระบบจัดการตะกร้าสินค้าข้ามร้าน (Multi-Vendor Grouped Checkout)
          </div>
        </div>

      </div>
    </footer>
  );
};
