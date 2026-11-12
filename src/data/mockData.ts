import { Vendor, MenuItem } from '../types';

import heroImg from '../assets/images/hero_madan_grilled_chicken_1792394161720.jpg';
import honeyHerbImg from '../assets/images/menu_honey_wild_herbs_1792394162133.jpg';
import jaewBongSetImg from '../assets/images/menu_jaew_bong_set_1792394163124.jpg';
import spicySaladImg from '../assets/images/menu_spicy_chicken_salad_1792394163633.jpg';
import chickenBurgerImg from '../assets/images/menu_chicken_burger_fusion_1792394164894.jpg';

export { heroImg };

export const VENDORS: Vendor[] = [
  {
    id: 'shop-pornpun',
    name: 'ร้านป้าพรไม้มะดันแท้ (เตาถ่าน 40 ปี)',
    tagline: 'ต้นตำรับหน้าสถานีรถไฟห้วยทับทัน หนีบไม้มะดันสด 3 ท่อน เตาถ่านหอมกรุ่น',
    rating: 4.9,
    reviewCount: 382,
    preparationTimeMinutes: 25,
    minOrder: 150,
    baseDeliveryFee: 40,
    freeDeliveryThreshold: 600,
    isGICertified: true,
    madanWoodProvenance: 'ริมห้วยทับทัน คัดกิ่งสดรสเปรี้ยวฝาดกลมกล่อมแท้ 100%',
    story: 'ป้าพรเริ่มย่างไก่หน้าสถานีรถไฟห้วยทับทันมาตั้งแต่ปี 2529 สืบทอดภูมิปัญญาการคัดกิ่งไม้มะดันสดที่มีกรดธรรมชาติ ช่วยอบเนื้อไก่ให้ชุ่มฉ่ำ หนังกรอบแห้งไร้มันสะสม ทานคู่กับแจ่วบองเคี่ยวไฟอ่อนรสจัดจ้าน',
    address: '112/4 หมู่ 1 ถ.สถานีรถไฟ ต.ห้วยทับทัน อ.ห้วยทับทัน จ.ศรีสะเกษ',
    phone: '081-456-7890',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
    bannerImage: heroImg,
    signatureDishesCount: 3
  },
  {
    id: 'shop-chef-ek',
    name: 'เชฟเอก โมเดิร์นอีสาน (Chef Ek Modern Isan)',
    tagline: 'ยกระดับไก่ย่างไม้มะดันสู่มิติใหม่ ฟิวชั่นรสไทยร่วมสมัย รางวัลเชฟสร้างสรรค์',
    rating: 4.8,
    reviewCount: 247,
    preparationTimeMinutes: 20,
    minOrder: 180,
    baseDeliveryFee: 45,
    freeDeliveryThreshold: 650,
    isGICertified: true,
    madanWoodProvenance: 'ไม้มะดันออร์แกนิก ปลูกตามแนววิถีเกษตรอินทรีย์ห้วยทับทัน',
    story: 'เชฟเอกนำเทคนิคสากลมาผสมผสานกับไม้มะดัน GI ศรีสะเกษ โดยคิดค้นเบอร์เกอร์และเมนูร่วมสมัยที่ดึงความเปรี้ยวละมุนและกลิ่นควันธรรมชาติของไม้มะดันออกมาได้อย่างแปลกใหม่และลงตัว',
    address: '88 ถนนเลี่ยงเมืองห้วยทับทัน อ.ห้วยทับทัน จ.ศรีสะเกษ',
    phone: '089-771-2345',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    bannerImage: chickenBurgerImg,
    signatureDishesCount: 2
  },
  {
    id: 'shop-sarabhi-farm',
    name: 'ไร่สารภี เกษตรอินทรีย์ & ไก่บ้าน',
    tagline: 'ไก่บ้านออร์แกนิกเนื้อแน่นเหนียวนุ่ม หมักสมุนไพรน้ำผึ้งป่าเดือนห้า',
    rating: 4.95,
    reviewCount: 198,
    preparationTimeMinutes: 30,
    minOrder: 200,
    baseDeliveryFee: 40,
    freeDeliveryThreshold: 700,
    isGICertified: true,
    madanWoodProvenance: 'สวนป่าไม้มะดันอนุรักษ์ ลุ่มน้ำห้วยทับทัน',
    story: 'ไร่สารภีเน้นการเพาะเลี้ยงไก่บ้านพันธุ์พื้นเมืองปล่อยทุ่งสมุนไพร ไม่ใช้สารเร่งโต นำมาย่างด้วยไม้มะดันที่ลิดจากต้นสดๆ ทาด้วยน้ำผึ้งป่าแท้เดือนห้า ให้ความหอมหวานล้ำลึกที่ไม่มีใครเลียนแบบได้',
    address: '204 บ้านหนองสิม ต.ห้วยทับทัน อ.ห้วยทับทัน จ.ศรีสะเกษ',
    phone: '082-345-6789',
    avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80',
    bannerImage: honeyHerbImg,
    signatureDishesCount: 2
  },
  {
    id: 'shop-yay-thong',
    name: 'ร้านยายทอง รสเด็ดห้วยทับทัน',
    tagline: 'รสจัดจ้านถึงเครื่องสมุนไพร ยำรสเด็ดฉีกชิ้น และสูตรน้ำจิ้มมะขามเปียกเตาถ่าน',
    rating: 4.85,
    reviewCount: 312,
    preparationTimeMinutes: 20,
    minOrder: 150,
    baseDeliveryFee: 35,
    freeDeliveryThreshold: 550,
    isGICertified: true,
    madanWoodProvenance: 'ไม้มะดันริมคลองธรรมชาติ อบรมควันสูตร 3 ทศวรรษ',
    story: 'ยายทองปรุงน้ำยำและน้ำจิ้มแจ่วด้วยมะขามเปียกศรีสะเกษ ผสมผสานเนื้อไก่ย่างไม้มะดันฉีกเป็นริ้วเส้น ทานแล้วได้กลิ่นหอมรมควันไม้มะดันพร้อมรสแซ่บเปรี้ยวอมหวานจัดจ้าน',
    address: '45 ถนนเทศบาล 3 ต.ห้วยทับทัน อ.ห้วยทับทัน จ.ศรีสะเกษ',
    phone: '086-112-9876',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    bannerImage: spicySaladImg,
    signatureDishesCount: 2
  },
  {
    id: 'shop-madan-thong',
    name: 'ครัวไม้มะดันทอง พรีเมียมกริลล์',
    tagline: 'ย่างเกลือชมพูหิมาลายันและพริกไทยดำจันทบูร กรอบนอกนุ่มในระดับพรีเมียม',
    rating: 4.9,
    reviewCount: 165,
    preparationTimeMinutes: 25,
    minOrder: 180,
    baseDeliveryFee: 40,
    freeDeliveryThreshold: 600,
    isGICertified: true,
    madanWoodProvenance: 'ไม้มะดันหนีบ 3 ซี่มาตรฐาน GI ทะเบียนเลขที่ ศก.62000012',
    story: 'ครัวไม้มะดันทองพัฒนาสูตรหมักเกลือชมพูเพื่อชูรสหวานธรรมชาติของเนื้อไก่และกลิ่นหอมเปรี้ยวอ่อนๆ ของไม้มะดัน ปราศจากผงชูรส ตอบโจทย์คนรักสุขภาพที่ต้องการรสชาติพรีเมียม',
    address: '39 หมู่ 5 บ้านโนนสว่าง ต.ห้วยทับทัน อ.ห้วยทับทัน จ.ศรีสะเกษ',
    phone: '087-998-3344',
    avatar: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80',
    bannerImage: heroImg,
    signatureDishesCount: 2
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. Signature from ไร่สารภี
  {
    id: 'menu-honey-wild-herbs',
    shopId: 'shop-sarabhi-farm',
    shopName: 'ไร่สารภี เกษตรอินทรีย์ & ไก่บ้าน',
    name: 'ไก่ย่างไม้มะดันหมักสมุนไพรน้ำผึ้งป่า',
    category: 'signature',
    price: 250,
    description: 'ใช้ความหอมของไม้มะดัน GI ผสานกับความหวานนุ่มละมุนของน้ำผึ้งป่าเดือนห้า ตะไคร้ใบมะกรูดสด ย่างจนหนังกรอบเงางามเนื้อในฉ่ำนุ่ม',
    image: honeyHerbImg,
    isSignature: true,
    isGICertified: true,
    portionOptions: [
      { name: 'ไก่บ้านทั้งตัว (เสิร์ฟทั้งตัว)', priceDelta: 0 },
      { name: 'ไก่บ้านครึ่งตัว (ผ่าซีก)', priceDelta: -110 },
      { name: 'เซ็ตพิเศษ (พร้อมข้าวเหนียวกล้อง 2 ห่อ + แจ่วคู่)', priceDelta: 45 }
    ],
    spiceLevels: ['เผ็ดน้อยกลมกล่อม', 'เผ็ดกลางกำลังดี', 'แซ่บจัดจ้าน'],
    sauceOptions: ['แจ่วมะขามเปียกน้ำผึ้งป่า', 'แจ่วบองสมุนไพรอินทรีย์', 'น้ำจิ้มไก่สูตรโบราณ'],
    sideDishOptions: [
      { name: 'ข้าวเหนียวกล้องอินทรีย์นึ่งหอม', price: 20 },
      { name: 'ส้มตำไทยไข่เค็มอินทรีย์', price: 70 },
      { name: 'ผักเคียงพื้นบ้านริมห้วย', price: 15 }
    ],
    available: true,
    preparationTimeMinutes: 25
  },

  // 2. Signature from ร้านป้าพร
  {
    id: 'menu-jaew-bong-set',
    shopId: 'shop-pornpun',
    shopName: 'ร้านป้าพรไม้มะดันแท้ (เตาถ่าน 40 ปี)',
    name: 'เซ็ตไก่ย่างไม้มะดัน + แจ่วบองสมุนไพรแซ่บนัว',
    category: 'signature',
    price: 260,
    description: 'ชุดตำนาน 40 ปี ไก่ย่างไม้มะดัน 1 ตัวเต็ม เสิร์ฟพร้อมข้าวเหนียวเขี้ยวงูร้อนๆ ในกระติบไม้ไผ่ และแจ่วบองสมุนไพรปลาร้าสุกสูตรป้าพร แซ่บนัวถึงใจ',
    image: jaewBongSetImg,
    isSignature: true,
    isGICertified: true,
    portionOptions: [
      { name: 'เซ็ตมาตรฐาน (ไก่ 1 ตัว + ข้าวเหนียว 2 + แจ่วบองกระปุก)', priceDelta: 0 },
      { name: 'เซ็ตไซส์ครอบครัว (ไก่ 1.5 ตัว + ข้าวเหนียว 4 + แจ่วบองใหญ่ + ส้มตำ)', priceDelta: 140 },
      { name: 'เซ็ตเดี่ยวอิ่มไว (ไก่ครึ่งตัว + ข้าวเหนียว 1 + แจ่วบอง)', priceDelta: -90 }
    ],
    spiceLevels: ['แซ่บนัวสูตรป้าพร (มาตรฐาน)', 'เผ็ดน้อย', 'แซ่บจัดจ้านพิเศษ'],
    sauceOptions: ['แจ่วบองสมุนไพรสูตรต้นตำรับ 40 ปี', 'แจ่วมะขามเปียกพริกคั่ว', 'น้ำจิ้มไก่หวานสูตรยาย'],
    sideDishOptions: [
      { name: 'เพิ่มข้าวเหนียวเขี้ยวงูนึ่งใบเตย', price: 15 },
      { name: 'แจ่วบองกระปุกแก้วพกพากลับบ้าน (100g)', price: 65 },
      { name: 'ส้มตำปลาร้าห้วยทับทันแท้', price: 60 }
    ],
    available: true,
    preparationTimeMinutes: 20
  },

  // 3. Signature from ร้านยายทอง
  {
    id: 'menu-spicy-chicken-salad',
    shopId: 'shop-yay-thong',
    shopName: 'ร้านยายทอง รสเด็ดห้วยทับทัน',
    name: 'ยำไก่ย่างไม้มะดันรสเด็ด',
    category: 'signature',
    price: 180,
    description: 'นำไก่ย่างไม้มะดันฉีกเป็นชิ้นพอดีคำ คลุกเคล้าน้ำยำรสจัดจ้าน มะนาวแป้นสด หอมแดงซอย ผักชีฝรั่ง และข้าวคั่วหอมเตาถ่าน รสชาติกลมกล่อมแซ่บซี้ด',
    image: spicySaladImg,
    isSignature: true,
    isGICertified: true,
    portionOptions: [
      { name: 'จานมาตรฐาน (เนื้อไก่ฉีก 250g)', priceDelta: 0 },
      { name: 'จานใหญ่พิเศษ (เนื้อไก่ฉีก + หนังกรอบ 380g)', priceDelta: 60 }
    ],
    spiceLevels: ['เผ็ดกลางเปรี้ยวเค็มลงตัว', 'เผ็ดน้อยพริก 2 เม็ด', 'เผ็ดจัดจ้านพริกขี้หนูสวนสะดุ้ง'],
    sauceOptions: ['น้ำยำสูตรมะนาวสดโบราณยายทอง', 'น้ำยำน้ำปลาร้าต้มสุกหอมนวล'],
    sideDishOptions: [
      { name: 'ข้าวเหนียวนึ่งห่อใบตอง', price: 15 },
      { name: 'แคบหมูโบราณไร้มันกรุบกรอบ', price: 30 },
      { name: 'ไข่ต้มยางมะตูม 2 ฟอง', price: 25 }
    ],
    available: true,
    preparationTimeMinutes: 15
  },

  // 4. Signature from เชฟเอก โมเดิร์นอีสาน
  {
    id: 'menu-chicken-burger-fusion',
    shopId: 'shop-chef-ek',
    shopName: 'เชฟเอก โมเดิร์นอีสาน (Chef Ek Modern Isan)',
    name: 'เบอร์เกอร์ไก่ย่างไม้มะดันซอสเผ็ด',
    category: 'fusion',
    price: 195,
    description: 'ฟิวชั่นเมนูระดับพรีเมียม ใช้เนื้อสะโพกไก่ย่างไม้มะดันเลาะกระดูกหมักสูตรพิเศษ ย่างเตาถ่านฉ่ำซอส ทานคู่ขนมปังบริยอชเนยสด ซอสแจ่วมาโยรสเผ็ด และสลัดกะหล่ำม่วงกรอบ',
    image: chickenBurgerImg,
    isSignature: true,
    isGICertified: true,
    portionOptions: [
      { name: 'ชิ้นเดี่ยว (Single Burger)', priceDelta: 0 },
      { name: 'เซ็ตคอมโบ (เบอร์เกอร์ + มันหวานทอด + ชามะนาวน้ำผึ้ง)', priceDelta: 75 },
      { name: 'ดับเบิ้ลสะโพกไก่ย่างไม้มะดัน 2 ชิ้นโต', priceDelta: 80 }
    ],
    spiceLevels: ['ซอสแจ่วมาโยเผ็ดปานกลาง', 'ซอสแจ่วมาโยเผ็ดจัดจ้าน', 'ซอสไม่เผ็ด (ครีมซอสสมุนไพร)'],
    sauceOptions: ['ซอสแจ่วมาโยสูตรเชฟเอก', 'ซอสสวีทชิลลี่การ์ลิก', 'ซอสพริกไทยดำไม้มะดันเคี่ยว'],
    sideDishOptions: [
      { name: 'มันหวานทอดกรอบโรยผงลาบ', price: 55 },
      { name: 'สลัดโคลสลอว์กะหล่ำม่วงห้วยทับทัน', price: 35 },
      { name: 'ชีสเชดด้าเบิร์นไฟ 1 แผ่น', price: 25 }
    ],
    available: true,
    preparationTimeMinutes: 18
  },

  // 5. Signature from ครัวไม้มะดันทอง
  {
    id: 'menu-black-pepper-pink-salt',
    shopId: 'shop-madan-thong',
    shopName: 'ครัวไม้มะดันทอง พรีเมียมกริลล์',
    name: 'ไก่ย่างไม้มะดันสูตรพริกไทยดำเกลือชมพู',
    category: 'signature',
    price: 240,
    description: 'เน้นรสชาติจัดจ้านของพริกไทยดำเม็ดคั่วบดหยาบ และความกลมกล่อมลุ่มลึกของเกลือชมพูหิมาลายัน หนังแห้งกรอบบาง กลิ่นควันไม้มะดันแทรกซึมลึกถึงเนื้อใน',
    image: heroImg,
    isSignature: true,
    isGICertified: true,
    portionOptions: [
      { name: 'ไก่ย่างทั้งตัว (Whole Chicken)', priceDelta: 0 },
      { name: 'ไก่ย่างครึ่งตัว (Half Chicken)', priceDelta: -110 },
      { name: 'เซ็ตพรีเมียม (ไก่ทั้งตัว + ซุปต้มแซ่บกระดูกอ่อน + ข้าวเหนียว 2)', priceDelta: 110 }
    ],
    spiceLevels: ['หอมพริกไทยดำระดับมาตรฐาน', 'พริกไทยดำเข้มข้นพิเศษ', 'เผ็ดน้อยละมุน'],
    sauceOptions: ['น้ำจิ้มแจ่วเกลือชมพูมะนาวสด', 'แจ่วมะขามเปียกเคี่ยวน้ำตาลอ้อย', 'น้ำจิ้มซีฟู้ดพริกสดสมุนไพร'],
    sideDishOptions: [
      { name: 'ต้มแซ่บกระดูกอ่อนใบมะขาม', price: 90 },
      { name: 'ข้าวเหนียวเขี้ยวงูหอมนุ่ม', price: 15 },
      { name: 'ชุดผักสดแตงกวาถั่วฝักยาว', price: 20 }
    ],
    available: true,
    preparationTimeMinutes: 25
  },

  // Additional authentic items to round out shops:
  {
    id: 'menu-pornpun-classic-chicken',
    shopId: 'shop-pornpun',
    shopName: 'ร้านป้าพรไม้มะดันแท้ (เตาถ่าน 40 ปี)',
    name: 'ไก่ย่างไม้มะดันสูตรดั้งเดิมป้าพร (ทั้งตัว)',
    category: 'classic',
    price: 220,
    description: 'ไก่รุ่นกระทงคัดพิเศษ หนีบไม้มะดันสด 3 ท่อนตามแบบฉบับโบราณ ย่างบนเตาถ่านไม้โกงกางไฟรุมๆ หนังกรอบเนื้อนุ่มชุ่มฉ่ำ',
    image: heroImg,
    isSignature: false,
    isGICertified: true,
    portionOptions: [
      { name: 'ไก่ย่างทั้งตัว', priceDelta: 0 },
      { name: 'ไก่ย่างครึ่งตัว', priceDelta: -100 }
    ],
    spiceLevels: ['ต้นตำรับป้าพร', 'เผ็ดน้อย', 'เผ็ดจัดจ้าน'],
    sauceOptions: ['แจ่วมะขามเปียกโบราณ', 'แจ่วบองสมุนไพร', 'น้ำจิ้มหวาน'],
    sideDishOptions: [
      { name: 'ข้าวเหนียวนึ่ง', price: 15 },
      { name: 'ส้มตำไทย', price: 50 }
    ],
    available: true,
    preparationTimeMinutes: 20
  },
  {
    id: 'menu-pornpun-liver',
    shopId: 'shop-pornpun',
    shopName: 'ร้านป้าพรไม้มะดันแท้ (เตาถ่าน 40 ปี)',
    name: 'ตับไก่และกึ๋นย่างไม้มะดัน (ไม้ละ)',
    category: 'classic',
    price: 35,
    description: 'ตับไก่สดหมักสามเกลอและกึ๋นกรุบกรอบ เสียบไม้มะดันย่างสุกพอดี ไม่แห้งกระด้าง หอมกลิ่นควันไม้มะดันอบอวล',
    image: honeyHerbImg,
    isSignature: false,
    portionOptions: [
      { name: '1 ไม้', priceDelta: 0 },
      { name: 'ชุด 3 ไม้ (ประหยัดกว่า)', priceDelta: 65 },
      { name: 'ชุด 5 ไม้ (อิ่มจุใจ)', priceDelta: 130 }
    ],
    spiceLevels: ['ไม่เผ็ด (หอมพริกไทย)', 'โรยพริกป่นคั่วสด'],
    sauceOptions: ['แจ่วมะขามเปียกโบราณ', 'แจ่วบอง'],
    sideDishOptions: [
      { name: 'ข้าวเหนียวนึ่ง', price: 15 }
    ],
    available: true,
    preparationTimeMinutes: 10
  },
  {
    id: 'menu-somtum-pornpun',
    shopId: 'shop-pornpun',
    shopName: 'ร้านป้าพรไม้มะดันแท้ (เตาถ่าน 40 ปี)',
    name: 'ส้มตำถาดห้วยทับทันเครื่องแน่น',
    category: 'side',
    price: 150,
    description: 'ส้มตำปูปลาร้าต้มสุกสูตรลับ เสิร์ฟบนถาดพร้อมไข่ต้ม แคบหมู เส้นหมี่ลวก ผักกาดดอง และผักก้านจองสด',
    image: jaewBongSetImg,
    isSignature: false,
    portionOptions: [
      { name: 'ถาดมาตรฐาน (ทาน 2-3 ท่าน)', priceDelta: 0 },
      { name: 'ถาดใหญ่พิเศษ (ทาน 4-5 ท่าน)', priceDelta: 70 }
    ],
    spiceLevels: ['พริก 3 เม็ด (เผ็ดเบาๆ)', 'พริก 7 เม็ด (แซ่บนัวอีสานแท้)', 'พริก 15 เม็ด (สะดุ้งลิ้น)'],
    sauceOptions: ['ปลาร้าต้มสุกหอมนัว', 'ตำไทยไม่ใส่ปลาร้า'],
    sideDishOptions: [
      { name: 'เพิ่มเส้นหมี่ลวกกระเทียมเจียว', price: 20 },
      { name: 'เพิ่มแคบหมูกรอบ', price: 25 }
    ],
    available: true,
    preparationTimeMinutes: 15
  },
  {
    id: 'menu-chef-ek-salad',
    shopId: 'shop-chef-ek',
    shopName: 'เชฟเอก โมเดิร์นอีสาน (Chef Ek Modern Isan)',
    name: 'สลัดอกไก่ย่างไม้มะดันน้ำสลัดแจ่วเลมอน',
    category: 'fusion',
    price: 165,
    description: 'อกไก่ย่างไม้มะดันซูวีเนื้อนุ่มชุ่มฉ่ำ ทานคู่ผักสลัดออร์แกนิก มะเขือเทศเชอรี่ และน้ำสลัดแจ่วเลมอนน้ำมันมะกอกเอ็กซ์ตร้าเวอร์จิ้น',
    image: spicySaladImg,
    isSignature: false,
    portionOptions: [
      { name: 'จานปกติ (Light Meal)', priceDelta: 0 },
      { name: 'เพิ่มอกไก่ย่าง 2 เท่า (High Protein)', priceDelta: 55 }
    ],
    spiceLevels: ['เผ็ดอ่อนละมุน', 'เผ็ดปานกลาง'],
    sauceOptions: ['น้ำสลัดแจ่วเลมอน', 'น้ำสลัดงาคั่วสไตล์ไทย'],
    sideDishOptions: [
      { name: 'ขนมปังกระเทียมบริยอช 2 ชิ้น', price: 35 }
    ],
    available: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'menu-sarabhi-sticky-rice',
    shopId: 'shop-sarabhi-farm',
    shopName: 'ไร่สารภี เกษตรอินทรีย์ & ไก่บ้าน',
    name: 'ข้าวเหนียวเขี้ยวงู 3 สี นึ่งใบเตยหอม (กระติบ)',
    category: 'side',
    price: 30,
    description: 'ข้าวเหนียวเขี้ยวงู ข้าวเหนียวดำลืมผัว และข้าวเหนียวอัญชัน นึ่งในหวดโบราณ นุ่มหนึบ หอมกลิ่นใบเตยธรรมชาติ',
    image: jaewBongSetImg,
    isSignature: false,
    portionOptions: [
      { name: '1 กระติบ (สำหรับ 1 ท่าน)', priceDelta: 0 },
      { name: 'ชุด 3 กระติบ (พร้อมทานทั้งครอบครัว)', priceDelta: 55 }
    ],
    spiceLevels: ['สูตรปกติ'],
    sauceOptions: ['ไม่รับน้ำจิ้มเพิ่ม'],
    sideDishOptions: [],
    available: true,
    preparationTimeMinutes: 5
  },
  {
    id: 'menu-madan-soup',
    shopId: 'shop-madan-thong',
    shopName: 'ครัวไม้มะดันทอง พรีเมียมกริลล์',
    name: 'ต้มแซ่บไก่บ้านใบมะขามอ่อนหม้อไฟ',
    category: 'side',
    price: 160,
    description: 'เนื้อไก่บ้านติดกระดูกต้มสมุนไพรสด ข่า ตะไคร้ ใบมะกรูด และใบมะขามอ่อน ปรุงรสด้วยน้ำมะนาวคั้นสดและพริกขี้หนูสวนบุบ ซดคล่องคอ',
    image: honeyHerbImg,
    isSignature: false,
    portionOptions: [
      { name: 'ชามปกติ (ทาน 1-2 ท่าน)', priceDelta: 0 },
      { name: 'หม้อไฟร้อน (ทาน 3-4 ท่าน)', priceDelta: 70 }
    ],
    spiceLevels: ['เผ็ดเปรี้ยวแซ่บมาตรฐาน', 'เผ็ดน้อย', 'แซ่บจัดจ้านซดเหงื่อซึม'],
    sauceOptions: ['รสชาติตามหม้อ'],
    sideDishOptions: [
      { name: 'ข้าวสวยหอมมะลิศรีสะเกษ', price: 20 },
      { name: 'ข้าวเหนียวนึ่ง', price: 15 }
    ],
    available: true,
    preparationTimeMinutes: 15
  }
];

export const GI_CERTIFICATION_DETAILS = {
  title: 'สิ่งบ่งชี้ทางภูมิศาสตร์ (GI) ไก่ย่างไม้มะดันห้วยทับทัน ศรีสะเกษ',
  registrationNo: 'สช 62000012',
  description: 'ไก่ย่างไม้มะดันห้วยทับทัน ได้รับการขึ้นทะเบียนเป็นสินค้าสิ่งบ่งชี้ทางภูมิศาสตร์ (GI) ของจังหวัดศรีสะเกษ จากกรมทรัพย์สินทางปัญญา กระทรวงพาณิชย์ ด้วยเอกลักษณ์เฉพาะตัวที่ไม่มีที่ใดเหมือน',
  reasons: [
    {
      title: 'ไม้มะดันธรรมชาติ (Garcinia schomburgkiana)',
      detail: 'ไม้มะดันขึ้นชุกชุมตามริมห้วยทับทัน กิ่งมะดันสดมีความเหนียว ไม่ติดไฟง่าย มีเปลือกบาง และกรดอินทรีย์ธรรมชาติที่มีรสเปรี้ยวอมฝาดอ่อนๆ'
    },
    {
      title: 'การระเหยของกรดธรรมชาติแทรกซึมเข้าเนื้อไก่',
      detail: 'เมื่อนำไม้มะดันสดมาหนีบตัวไก่แล้วขึ้นย่างเตาถ่าน ความร้อนจะขับไอระเหยของกรดธรรมชาติจากเนื้อไม้เข้าไปหมักและย่อยสลายเส้นใยกล้ามเนื้อ ทำให้เนื้อไก่นุ่ม ไม่กระด้าง หนังแห้งกรอบบาง และมีกลิ่นหอมเฉพาะตัว'
    },
    {
      title: 'ภูมิปัญญาการหนีบ 3 ซี่แห่งห้วยทับทัน',
      detail: 'ไม้หนีบไก่เหลาจากไม้มะดันสด 3 กิ่ง ล็อคตัวไก่ให้กางออกสม่ำเสมอ รับความร้อนทั่วถึง สุกกรอบพร้อมกันโดยไม่ต้องทาน้ำมันซ้ำ'
    }
  ]
};
