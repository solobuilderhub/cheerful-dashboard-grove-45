
import React from 'react';
import { SideNav } from '@/components/SideNav';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <Dashboard />
    </div>
  );
};

export default Index;
