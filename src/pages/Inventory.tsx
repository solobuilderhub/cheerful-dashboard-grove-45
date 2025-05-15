
import React from 'react';
import { SideNav } from '@/components/SideNav';
import { InventoryContent } from '@/components/InventoryContent';
import { Toaster } from "@/components/ui/toaster";

const Inventory = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <InventoryContent />
      <Toaster />
    </div>
  );
};

export default Inventory;
