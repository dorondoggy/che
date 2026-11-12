import React from 'react';
import { X, ShieldCheck, Flame, Trees, Award, CheckCircle2 } from 'lucide-react';
import { GI_CERTIFICATION_DETAILS } from '../data/mockData';
import heroImg from '../assets/images/hero_madan_grilled_chicken_1792394161720.jpg';

interface GIStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GIStoryModal: React.FC<GIStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-[#062E1F] overflow-hidden shrink-0">
          <img
            src={heroImg}
            alt="สิ่งบ่งชี้ทางภูมิศาสตร์ ไม้มะดันห้วยทับทัน"
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062E1F] via-[#062E1F]/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C5A059] text-[#062E1F] text-xs font-bold mb-1.5 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>ทะเบียนเลขที่ {GI_CERTIFICATION_DETAILS.registrationNo}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {GI_CERTIFICATION_DETAILS.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          
          <p className="text-slate-600 leading-relaxed bg-[#F8F9F5] p-4 rounded-xl border border-stone-200/80">
            {GI_CERTIFICATION_DETAILS.description}
          </p>

          {/* 3 Pillars */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#062E1F] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>3 คุณลักษณะพิเศษที่ไม่มีที่ใดในโลกเลียนแบบได้</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {GI_CERTIFICATION_DETAILS.reasons.map((reason, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                    {idx === 0 && <Trees className="w-4 h-4 text-emerald-700 shrink-0" />}
                    {idx === 1 && <Flame className="w-4 h-4 text-amber-600 shrink-0" />}
                    {idx === 2 && <CheckCircle2 className="w-4 h-4 text-[#8C6D23] shrink-0" />}
                    <span>{reason.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {reason.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="p-4 rounded-xl bg-emerald-950 text-emerald-100 border border-[#C5A059]/40 space-y-2">
            <div className="text-xs font-bold text-[#E6CA65] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>คำมั่นสัญญาจากแพลตฟอร์ม "ห้วยทับทัน มาสเตอร์"</span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-200/90">
              ทุกร้านค้าที่เข้าร่วมบนแพลตฟอร์มนี้ ผ่านการตรวจสอบการใช้ไม้มะดันแท้ 100% จากลุ่มน้ำห้วยทับทัน และใช้เนื้อไก่สดคุณภาพที่หมักตามสูตรโบราณ ไม่มีการใช้ไม้ไผ่หรือสารแต่งกลิ่นสังเคราะห์ เพื่อส่งมอบมรดกทางรสชาติของศรีสะเกษสู่โต๊ะอาหารของคุณอย่างสมบูรณ์แบบ
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-[#062E1F] text-[#E6CA65] hover:bg-[#0D3828] cursor-pointer"
          >
            เข้าใจแล้ว & เลือกซื้อไก่ย่างไม้มะดัน
          </button>
        </div>

      </div>
    </div>
  );
};
