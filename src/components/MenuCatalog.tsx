import React, { useState } from 'react';
import { Store, Plus, Sparkles, Filter } from 'lucide-react';
import { MenuItem, MenuCategory, Vendor } from '../types';

interface MenuCatalogProps {
  items: MenuItem[];
  vendors: Vendor[];
  selectedVendorId: string | null;
  onSelectVendor: (shopId: string) => void;
  onSelectForCustomization: (item: MenuItem) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  items,
  vendors,
  selectedVendorId,
  onSelectVendor,
  onSelectForCustomization
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    // Filter by Shop
    if (selectedVendorId && selectedVendorId !== 'all' && item.shopId !== selectedVendorId) {
      return false;
    }
    // Filter by Category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'signature' && !item.isSignature) return false;
      if (selectedCategory === 'classic' && item.category !== 'classic') return false;
      if (selectedCategory === 'fusion' && item.category !== 'fusion') return false;
      if (selectedCategory === 'side' && item.category !== 'side') return false;
    }
    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchShop = item.shopName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchShop) return false;
    }
    return true;
  });

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'signature', label: 'ซิกเนเจอร์พิเศษ' },
    { id: 'classic', label: 'ไก่ย่างดั้งเดิม/เครื่องใน' },
    { id: 'fusion', label: 'เมนูฟิวชั่นสร้างสรรค์' },
    { id: 'side', label: 'ส้มตำ/ข้าวเหนียว/เครื่องเคียง' }
  ];

  return (
    <section id="catalog-section" className="py-14 bg-[#F8F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#8C6D23] uppercase tracking-wider mb-1">
              รายการอาหารทั้งหมด
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062E1F] tracking-tight">
              เลือกความอร่อยจากทุกเตาถ่าน
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              สั่งไก่ย่างหรืออาหารเคียงจากร้านต่าง ๆ ได้ในคราวเดียว ตะกร้าจะรวมค่าจัดส่งและจัดระเบียบให้เรียบร้อย
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="ค้นหาชื่อเมนู, วัตถุดิบ, หรือชื่อร้าน..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
          
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#062E1F] text-[#E6CA65] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Shop Selector Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedVendorId || 'all'}
              onChange={e => onSelectVendor(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">กรองตามร้าน: ทุกร้าน (5 ร้าน)</option>
              {vendors.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <Store className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">ไม่พบเมนูที่ค้นหา</h3>
            <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูครับ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-stone-200 hover:border-[#C5A059]/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {item.isSignature && (
                      <div className="absolute top-2 left-2 bg-[#062E1F]/90 text-[#E6CA65] text-[10px] font-bold px-2 py-0.5 rounded border border-[#C5A059]/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#E6CA65]" />
                        <span>ซิกเนเจอร์</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="text-[11px] text-[#8C6D23] font-medium flex items-center gap-1 mb-1 truncate">
                      <Store className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{item.shopName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#062E1F] leading-snug mb-1.5 line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & CTA */}
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 mb-2">
                    <div className="text-base font-bold text-[#062E1F] tabular-nums font-mono">
                      ฿{item.price.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {item.portionOptions.length} ตัวเลือก
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectForCustomization(item)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-stone-100 group-hover:bg-[#062E1F] text-slate-800 group-hover:text-[#E6CA65] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เลือกตัวเลือก & สั่ง</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
