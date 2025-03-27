
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  image: string;
  name: string;
  styleId: string;
  size: string;
  quantity: number;
  dateAdded: string;
  warehouseLocation: string;
  cost: string;
}

interface InventoryTableProps {
  searchQuery: string;
}

export function InventoryTable({ searchQuery }: InventoryTableProps) {
  // Sample data for the inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      image: '/public/lovable-uploads/0d3e8293-937c-4cd1-a90e-fd09b11d7f6c.png',
      name: 'Timberland 6" Boot Just Don Denim (GS)',
      styleId: 'TB0NLKR/1184 Size: 5.5Y',
      size: '5.5Y',
      quantity: 10,
      dateAdded: '01/01/2025',
      warehouseLocation: 'Northeast',
      cost: '$95.00'
    },
    {
      id: '2',
      image: '/public/lovable-uploads/0d3e8293-937c-4cd1-a90e-fd09b11d7f6c.png',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 12,
      dateAdded: '01/01/2025',
      warehouseLocation: 'Midwest',
      cost: '$120.00'
    },
    {
      id: '3',
      image: '/public/lovable-uploads/0d3e8293-937c-4cd1-a90e-fd09b11d7f6c.png',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 15,
      dateAdded: '02/01/2025',
      warehouseLocation: 'West',
      cost: '$120.00'
    },
    {
      id: '4',
      image: '/public/lovable-uploads/0d3e8293-937c-4cd1-a90e-fd09b11d7f6c.png',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 18,
      dateAdded: '03/01/2025',
      warehouseLocation: 'South',
      cost: '$120.00'
    },
    {
      id: '5',
      image: '/public/lovable-uploads/0d3e8293-937c-4cd1-a90e-fd09b11d7f6c.png',
      name: 'Nike Air Max 1 SC Dark Stucco',
      styleId: 'NK12345-001',
      size: '8.5',
      quantity: 8,
      dateAdded: '03/15/2025',
      warehouseLocation: 'Central',
      cost: '$110.00'
    }
  ];

  // Filter items based on search query
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.styleId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/20">
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[60px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Inventory added date</TableHead>
            <TableHead>Warehouse location</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} className="border-b hover:bg-secondary/10">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.styleId}</p>
                </div>
              </TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.dateAdded}</TableCell>
              <TableCell>{item.warehouseLocation}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>
                <button className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
