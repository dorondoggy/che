export type MenuCategory = 'all' | 'signature' | 'classic' | 'fusion' | 'side' | 'beverage';

export interface PortionOption {
  name: string;
  priceDelta: number;
}

export interface SideAddon {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  shopId: string;
  shopName: string;
  name: string;
  category: 'signature' | 'classic' | 'fusion' | 'side' | 'beverage';
  price: number;
  description: string;
  image: string;
  isSignature: boolean;
  isGICertified?: boolean;
  portionOptions: PortionOption[];
  spiceLevels: string[];
  sauceOptions: string[];
  sideDishOptions: SideAddon[];
  available: boolean;
  preparationTimeMinutes: number;
}

export interface Vendor {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  preparationTimeMinutes: number;
  minOrder: number;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  isGICertified: boolean;
  madanWoodProvenance: string;
  story: string;
  address: string;
  phone: string;
  avatar: string;
  bannerImage: string;
  signatureDishesCount: number;
}

export interface CartItem {
  id: string; // unique item instance id
  menuItemId: string;
  shopId: string;
  shopName: string;
  name: string;
  basePrice: number;
  portion: string;
  portionPriceDelta: number;
  spiceLevel: string;
  sauceChoice: string;
  sideDishAddons: SideAddon[];
  specialNotes: string;
  quantity: number;
  unitTotal: number;
  itemTotal: number;
  image: string;
}

export interface GroupedShopCart {
  shopId: string;
  shopName: string;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export type OrderStatus = 'received' | 'marinating' | 'grilling' | 'rider_picked' | 'delivering' | 'completed';

export interface ShopOrderGroup {
  shopId: string;
  shopName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  status: OrderStatus;
  estimatedMinutes: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    province: string;
    deliveryMethod: 'express_local' | 'inter_express_chilled';
    notes?: string;
  };
  shopGroups: ShopOrderGroup[];
  totalFood: number;
  totalDelivery: number;
  grandTotal: number;
  paymentMethod: 'promptpay' | 'credit_card' | 'cod';
  paymentStatus: 'paid' | 'pending';
}
