
import React from 'react';
import { SideNav } from '@/components/SideNav';
import { InventoryContent } from '@/components/InventoryContent';
import { Toaster } from "@/components/ui/toaster";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Warehouse } from 'lucide-react';

const Inventory = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-card/50 px-6 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/inventory" className="flex items-center">
                  <Warehouse className="h-4 w-4 mr-1" />
                  Inventory
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <InventoryContent />
      </div>
      <Toaster />
    </div>
  );
};

export default Inventory;
