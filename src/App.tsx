import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { VENDORS, MENU_ITEMS } from './data/mockData';
import { MenuItem, Vendor } from './types';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SignatureSpotlight } from './components/SignatureSpotlight';
import { VendorDirectory } from './components/VendorDirectory';
import { VendorDetailModal } from './components/VendorDetailModal';
import { MenuCatalog } from './components/MenuCatalog';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { VendorDashboard } from './components/VendorDashboard';
import { GIStoryModal } from './components/GIStoryModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedVendorFilter, setSelectedVendorFilter] = useState<string | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [viewingVendor, setViewingVendor] = useState<Vendor | null>(null);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTargetShopId, setCheckoutTargetShopId] = useState<string | undefined>(undefined);
  
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isGIModalOpen, setIsGIModalOpen] = useState(false);
  const [isVendorMode, setIsVendorMode] = useState(false);

  // Filter 5 signature items explicitly
  const signatureItems = MENU_ITEMS.filter(m => m.isSignature);

  const handleQuickAdd = (item: MenuItem) => {
    addToCart({
      menuItemId: item.id,
      shopId: item.shopId,
      shopName: item.shopName,
      name: item.name,
      basePrice: item.price,
      portion: item.portionOptions[0]?.name || 'มาตรฐาน',
      portionPriceDelta: item.portionOptions[0]?.priceDelta || 0,
      spiceLevel: item.spiceLevels[0] || 'สูตรมาตรฐาน',
      sauceChoice: item.sauceOptions[0] || 'แจ่วสูตรโบราณ',
      sideDishAddons: [],
      specialNotes: '',
      quantity: 1,
      image: item.image
    });
  };

  const handleOpenCheckout = (targetShopId?: string) => {
    setCheckoutTargetShopId(targetShopId);
    setIsCheckoutOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (isVendorMode) {
      setIsVendorMode(false);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectVendorFilter = (shopId: string) => {
    if (shopId === 'all') {
      setSelectedVendorFilter(null);
    } else {
      setSelectedVendorFilter(shopId);
    }
    handleScrollToSection('catalog-section');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5]">
      {/* Top Navbar */}
      <Navbar
        onOpenGIModal={() => setIsGIModalOpen(true)}
        onOpenTrackerModal={() => setIsOrderTrackerOpen(true)}
        isVendorMode={isVendorMode}
        onToggleVendorMode={() => setIsVendorMode(prev => !prev)}
        onNavigateSection={handleScrollToSection}
      />

      {isVendorMode ? (
        /* Partner Vendor Dashboard View */
        <main className="flex-1">
          <VendorDashboard onBackToCustomer={() => setIsVendorMode(false)} />
        </main>
      ) : (
        /* Customer Marketplace View */
        <main className="flex-1">
          {/* Hero Banner with Sisaket GI Trust */}
          <HeroBanner
            onExploreSignature={() => handleScrollToSection('signature-section')}
            onExploreShops={() => handleScrollToSection('vendors-section')}
            onOpenGIModal={() => setIsGIModalOpen(true)}
          />

          {/* 5 Signature Special Menus (User prompt highlights) */}
          <SignatureSpotlight
            signatureItems={signatureItems}
            onSelectForCustomization={item => setCustomizingItem(item)}
            onQuickAdd={handleQuickAdd}
            onSelectVendor={handleSelectVendorFilter}
          />

          {/* 5 Official GI Vendors Directory */}
          <VendorDirectory
            vendors={VENDORS}
            selectedVendorId={selectedVendorFilter}
            onSelectVendor={handleSelectVendorFilter}
            onViewVendorDetail={vendor => setViewingVendor(vendor)}
          />

          {/* Full Menu Catalog with Filters & Search */}
          <MenuCatalog
            items={MENU_ITEMS}
            vendors={VENDORS}
            selectedVendorId={selectedVendorFilter}
            onSelectVendor={handleSelectVendorFilter}
            onSelectForCustomization={item => setCustomizingItem(item)}
          />
        </main>
      )}

      {/* Global Footer */}
      <Footer
        onOpenGIModal={() => setIsGIModalOpen(true)}
        onNavigateSection={handleScrollToSection}
      />

      {/* Item Customizer Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
      />

      {/* Vendor Profile & Story Modal */}
      <VendorDetailModal
        vendor={viewingVendor}
        onClose={() => setViewingVendor(null)}
        onSelectShopMenu={shopId => {
          setSelectedVendorFilter(shopId);
          handleScrollToSection('catalog-section');
        }}
      />

      {/* Multi-Vendor Cart Drawer (Grouped by Shop) */}
      <CartDrawer
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Checkout Modal (Group by shop confirmation & payment) */}
      <CheckoutModal
        targetShopId={checkoutTargetShopId}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => setIsOrderTrackerOpen(true)}
      />

      {/* Real-time Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      {/* GI Story Educational Modal */}
      <GIStoryModal
        isOpen={isGIModalOpen}
        onClose={() => setIsGIModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
