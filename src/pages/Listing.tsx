
import React from 'react';
import { SideNav } from '@/components/SideNav';
import { ListingContent } from '@/components/ListingContent';

const Listing = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <ListingContent />
    </div>
  );
};

export default Listing;
