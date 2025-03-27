
import React, { useState } from 'react';
import { SideNav } from '@/components/SideNav';
import { InventoryContent } from '@/components/InventoryContent';

const Inventory = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <InventoryContent />
    </div>
  );
};

export default Inventory;
