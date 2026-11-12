import React from 'react';
import { ShoppingBag, Store, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenGIModal: () => void;
  onOpenTrackerModal: () => void;
  isVendorMode: boolean;
  onToggleVendorMode: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGIModal,
  onOpenTrackerModal,
  isVendorMode,
  onToggleVendorMode,
  onNavigateSection
}) => {
  const { totalItemsCount, setIsCartOpen, orders } = useCart();
  const hasActiveOrders = orders.length > 0;

  return (
    <header className="sticky top-0 z-40 bg-[#062E1F] text-white border-b border-[#C5A059]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <button
          onClick={() => {
            if (isVendorMode) onToggleVendorMode();
            onNavigateSection('hero');
          }}
          className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E6CA65] via-[#C5A059] to-[#997A2E] flex items-center justify-center shadow-inner text-[#062E1F] font-bold text-lg">
            มด
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white group-hover:text-[#E6CA65] transition-colors leading-tight">
              ห้วยทับทัน มาสเตอร์
            </div>
            <div className="text-[11px] text-[#C5A059] tracking-wider font-medium">
              ไก่ย่างไม้มะดัน GI ศรีสะเกษ มัลติเวนเดอร์
            </div>
          </div>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200">
          <button
            onClick={() => onNavigateSection('signature-section')}
            className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            เมนูพิเศษ 5 ซิกเนเจอร์
          </button>
          <button
            onClick={() => onNavigateSection('vendors-section')}
            className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            ร้านเตาถ่านชื่อดัง (5 ร้าน)
          </button>
          <button
            onClick={() => onNavigateSection('catalog-section')}
            className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            เมนูอาหารทั้งหมด
          </button>
          <button
            onClick={onOpenGIModal}
            className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-[#E6CA65]"
          >
            <ShieldCheck className="w-4 h-4 text-[#E6CA65]" />
            มาตรฐาน GI ไม้มะดัน
          </button>
          {hasActiveOrders && (
            <button
              onClick={onOpenTrackerModal}
              className="hover:text-[#E6CA65] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-emerald-300"
            >
              <Clock className="w-4 h-4" />
              ติดตามออเดอร์ ({orders.length})
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Vendor Portal Switcher */}
          <button
            onClick={onToggleVendorMode}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors border ${
              isVendorMode
                ? 'bg-[#C5A059] text-[#062E1F] border-[#C5A059] font-semibold'
                : 'bg-emerald-950/60 text-emerald-200 border-emerald-800/80 hover:bg-emerald-900/60'
            }`}
            title="สลับมุมมองร้านค้าพันธมิตร"
          >
            <Store className="w-3.5 h-3.5" />
            <span>{isVendorMode ? 'กลับสู่หน้าร้าน' : 'ระบบร้านค้า'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#062E1F] hover:from-[#E6CA65] hover:to-[#D4AF37] shadow-sm transition-all cursor-pointer whitespace-nowrap"
            aria-label="ดูตะกร้าสินค้า"
          >
            <ShoppingBag className="w-4 h-4 text-[#062E1F]" />
            <span className="hidden sm:inline font-bold">ตะกร้าข้ามร้าน</span>
            {totalItemsCount > 0 && (
              <span className="bg-[#062E1F] text-[#E6CA65] text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
