import React from 'react';
import { ShieldCheck, Flame, Sparkles, Truck, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/hero_madan_grilled_chicken_1792394161720.jpg';

interface HeroBannerProps {
  onExploreSignature: () => void;
  onExploreShops: () => void;
  onOpenGIModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreSignature,
  onExploreShops,
  onOpenGIModal
}) => {
  return (
    <section id="hero" className="relative bg-[#062E1F] text-white overflow-hidden border-b border-[#C5A059]/25">
      {/* Background pattern & ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* GI Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0D3828] border border-[#C5A059]/40 text-xs text-[#E6CA65]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span className="font-semibold tracking-wide">ตราสัญลักษณ์สิ่งบ่งชี้ทางภูมิศาสตร์ GI ศรีสะเกษ (สช 62000012)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              ไก่ย่างไม้มะดันห้วยทับทัน <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#C5A059]">
                รวมร้านดังระดับตำนาน สั่งได้ในตะกร้าเดียว
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-light">
              สัมผัสความหอมกรุ่นอันเป็นเอกลักษณ์ของ <strong className="text-[#E6CA65] font-medium">"ไม้มะดันสดริมห้วยทับทัน"</strong> ที่ปล่อยกรดอินทรีย์ธรรมชาติยามต้องเปลวถ่าน ทำให้เนื้อไก่นุ่มชุ่มฉ่ำ หนังกรอบแห้งไร้มัน พร้อม 5 เมนูพิเศษยกระดับจากยอดฝีมือเมืองศรีสะเกษ
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreSignature}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#062E1F] hover:from-[#E6CA65] hover:to-[#D4AF37] transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#062E1F]" />
                <span>ชิม 5 เมนูพิเศษซิกเนเจอร์</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreShops}
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#0A3826] border border-[#C5A059]/40 text-[#E6CA65] hover:bg-[#0E4731] transition-colors cursor-pointer whitespace-nowrap"
              >
                เลือกร้านเตาถ่าน 5 ร้าน
              </button>

              <button
                onClick={onOpenGIModal}
                className="text-xs text-emerald-300 hover:text-[#E6CA65] underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap py-2"
              >
                ทำไมต้องไม้มะดันห้วยทับทัน?
              </button>
            </div>

            {/* Proof & highlights row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-emerald-800/40 text-xs">
              <div>
                <div className="text-base font-bold text-[#E6CA65] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#E6CA65]" />
                  <span>ไม้มะดันแท้ 100%</span>
                </div>
                <div className="text-emerald-200/70 text-[11px] mt-0.5">หนีบ 3 ซี่ ย่างถ่านไฟรุม</div>
              </div>
              <div>
                <div className="text-base font-bold text-[#E6CA65] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#E6CA65]" />
                  <span>ตะกร้าข้ามร้าน</span>
                </div>
                <div className="text-emerald-200/70 text-[11px] mt-0.5">จัดกลุ่มแยกบิล จ่ายรวมง่าย</div>
              </div>
              <div>
                <div className="text-base font-bold text-[#E6CA65] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E6CA65]" />
                  <span>ส่งเย็นทั่วประเทศ</span>
                </div>
                <div className="text-emerald-200/70 text-[11px] mt-0.5">สุญญากาศคงความกรอบ</div>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-black/40 aspect-[4/3] lg:aspect-[1/1] max-h-[460px] w-full">
              <img
                src={heroImg}
                alt="ไก่ย่างไม้มะดันห้วยทับทันเตาถ่านแท้"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062E1F] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#062E1F]/85 backdrop-blur-md border border-[#C5A059]/30 text-white">
                <div className="flex items-center justify-between text-xs text-[#E6CA65] mb-1 font-semibold">
                  <span>เตาถ่านไฟรุมหน้าสถานีห้วยทับทัน</span>
                  <span className="px-2 py-0.5 bg-[#C5A059]/20 rounded text-[10px] text-[#E6CA65] border border-[#C5A059]/40">
                    GI ศรีสะเกษ
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-snug">
                  "กิ่งไม้มะดันสดขับรสเปรี้ยวฝาดอ่อนๆ เผยความนุ่มหวานฉ่ำของเนื้อไก่ หนังสีเหลืองทองกรอบแห้งไร้มัน"
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
