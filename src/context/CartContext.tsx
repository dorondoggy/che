import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, GroupedShopCart, Order, ShopOrderGroup } from '../types';
import { VENDORS } from '../data/mockData';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (itemData: {
    menuItemId: string;
    shopId: string;
    shopName: string;
    name: string;
    basePrice: number;
    portion: string;
    portionPriceDelta: number;
    spiceLevel: string;
    sauceChoice: string;
    sideDishAddons: { name: string; price: number }[];
    specialNotes: string;
    quantity: number;
    image: string;
  }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  clearShopItems: (shopId: string) => void;
  groupedCart: Record<string, GroupedShopCart>;
  totalItemsCount: number;
  totalFoodAmount: number;
  totalDeliveryFee: number;
  multiVendorDiscount: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (orderData: {
    customer: {
      name: string;
      phone: string;
      address: string;
      province: string;
      deliveryMethod: 'express_local' | 'inter_express_chilled';
      notes?: string;
    };
    paymentMethod: 'promptpay' | 'credit_card' | 'cod';
    shopIdFilter?: string; // If checking out single shop or all
  }) => Order;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, shopId: string, status: Order['shopGroups'][0]['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'madan_chicken_cart_v1';
const ORDERS_KEY = 'madan_chicken_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const addToCart = (data: {
    menuItemId: string;
    shopId: string;
    shopName: string;
    name: string;
    basePrice: number;
    portion: string;
    portionPriceDelta: number;
    spiceLevel: string;
    sauceChoice: string;
    sideDishAddons: { name: string; price: number }[];
    specialNotes: string;
    quantity: number;
    image: string;
  }) => {
    const addonsTotal = data.sideDishAddons.reduce((sum, a) => sum + a.price, 0);
    const unitTotal = Math.max(0, data.basePrice + data.portionPriceDelta + addonsTotal);
    const itemTotal = unitTotal * data.quantity;

    // Check if identical item already exists (same menuId, portion, spice, sauce, addons, notes)
    const existingIndex = cartItems.findIndex(
      item =>
        item.menuItemId === data.menuItemId &&
        item.portion === data.portion &&
        item.spiceLevel === data.spiceLevel &&
        item.sauceChoice === data.sauceChoice &&
        item.specialNotes === data.specialNotes &&
        JSON.stringify(item.sideDishAddons) === JSON.stringify(data.sideDishAddons)
    );

    if (existingIndex > -1) {
      setCartItems(prev => {
        const next = [...prev];
        const existing = next[existingIndex];
        const updatedQty = existing.quantity + data.quantity;
        next[existingIndex] = {
          ...existing,
          quantity: updatedQty,
          itemTotal: existing.unitTotal * updatedQty
        };
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...data,
        unitTotal,
        itemTotal
      };
      setCartItems(prev => [newItem, ...prev]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              itemTotal: item.unitTotal * newQty
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearShopItems = (shopId: string) => {
    setCartItems(prev => prev.filter(item => item.shopId !== shopId));
  };

  // Group items by Shop ID
  const groupedCart = useMemo(() => {
    const groups: Record<string, GroupedShopCart> = {};

    cartItems.forEach(item => {
      const vendor = VENDORS.find(v => v.id === item.shopId);
      const baseDeliveryFee = vendor?.baseDeliveryFee ?? 40;
      const freeDeliveryThreshold = vendor?.freeDeliveryThreshold ?? 600;

      if (!groups[item.shopId]) {
        groups[item.shopId] = {
          shopId: item.shopId,
          shopName: item.shopName,
          baseDeliveryFee,
          freeDeliveryThreshold,
          deliveryFee: baseDeliveryFee,
          items: [],
          subtotal: 0,
          total: 0
        };
      }

      groups[item.shopId].items.push(item);
      groups[item.shopId].subtotal += item.itemTotal;
    });

    // Recompute delivery fee & total per shop
    Object.values(groups).forEach(group => {
      if (group.subtotal >= group.freeDeliveryThreshold) {
        group.deliveryFee = 0;
      } else {
        group.deliveryFee = group.baseDeliveryFee;
      }
      group.total = group.subtotal + group.deliveryFee;
    });

    return groups;
  }, [cartItems]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalFoodAmount = useMemo(() => {
    return Object.values(groupedCart).reduce((sum, g) => sum + g.subtotal, 0);
  }, [groupedCart]);

  // Multi-vendor delivery discount calculation:
  // If ordering from 2 or more shops together, grant a cross-shop combined logistics discount (25฿)
  const shopCount = Object.keys(groupedCart).length;
  const multiVendorDiscount = shopCount > 1 ? 25 : 0;

  const rawDeliveryTotal = useMemo(() => {
    return Object.values(groupedCart).reduce((sum, g) => sum + g.deliveryFee, 0);
  }, [groupedCart]);

  const totalDeliveryFee = Math.max(0, rawDeliveryTotal - multiVendorDiscount);
  const grandTotal = totalFoodAmount + totalDeliveryFee;

  const placeOrder = ({
    customer,
    paymentMethod,
    shopIdFilter
  }: {
    customer: {
      name: string;
      phone: string;
      address: string;
      province: string;
      deliveryMethod: 'express_local' | 'inter_express_chilled';
      notes?: string;
    };
    paymentMethod: 'promptpay' | 'credit_card' | 'cod';
    shopIdFilter?: string;
  }): Order => {
    const targetGroups = shopIdFilter
      ? Object.values(groupedCart).filter(g => g.shopId === shopIdFilter)
      : Object.values(groupedCart);

    const shopGroups: ShopOrderGroup[] = targetGroups.map(g => {
      const vendor = VENDORS.find(v => v.id === g.shopId);
      return {
        shopId: g.shopId,
        shopName: g.shopName,
        items: [...g.items],
        subtotal: g.subtotal,
        deliveryFee: g.deliveryFee,
        status: 'received',
        estimatedMinutes: vendor?.preparationTimeMinutes ?? 25
      };
    });

    const targetFood = shopGroups.reduce((sum, g) => sum + g.subtotal, 0);
    const targetRawDelivery = shopGroups.reduce((sum, g) => sum + g.deliveryFee, 0);
    const discount = shopGroups.length > 1 ? 25 : 0;
    const finalDelivery = Math.max(0, targetRawDelivery - discount);

    const newOrder: Order = {
      id: `MD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer,
      shopGroups,
      totalFood: targetFood,
      totalDelivery: finalDelivery,
      grandTotal: targetFood + finalDelivery,
      paymentMethod,
      paymentStatus: paymentMethod === 'promptpay' || paymentMethod === 'credit_card' ? 'paid' : 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Clear checked out items
    if (shopIdFilter) {
      clearShopItems(shopIdFilter);
    } else {
      clearCart();
    }

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    shopId: string,
    status: Order['shopGroups'][0]['status']
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedGroups = ord.shopGroups.map(sg => {
            if (sg.shopId === shopId) {
              return { ...sg, status };
            }
            return sg;
          });
          return { ...ord, shopGroups: updatedGroups };
        }
        return ord;
      })
    );

    setActiveOrder(prev => {
      if (prev && prev.id === orderId) {
        return {
          ...prev,
          shopGroups: prev.shopGroups.map(sg => (sg.shopId === shopId ? { ...sg, status } : sg))
        };
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        clearShopItems,
        groupedCart,
        totalItemsCount,
        totalFoodAmount,
        totalDeliveryFee,
        multiVendorDiscount,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        orders,
        placeOrder,
        activeOrder,
        setActiveOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
