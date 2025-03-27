
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from 'lucide-react';
import { FilterValues } from './FilterModal';

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
  daysListed?: number;
  spread?: number;
  isLowestAsk?: boolean;
  isExpired?: boolean;
}

interface InventoryTableProps {
  searchQuery: string;
  filters?: FilterValues | null;
}

export function InventoryTable({ searchQuery, filters }: InventoryTableProps) {
  // Sample data for the inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Wheat-Product.jpg',
      name: 'Timberland 6" Boot Just Don Denim (GS)',
      styleId: 'TB0NLKR/1184 Size: 5.5Y',
      size: '5.5Y',
      quantity: 10,
      dateAdded: '01/01/2025',
      warehouseLocation: 'Northeast',
      cost: '$95.00',
      daysListed: 15,
      spread: 25,
      isLowestAsk: true,
      isExpired: false
    },
    {
      id: '2',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 12,
      dateAdded: '01/01/2025',
      warehouseLocation: 'Midwest',
      cost: '$120.00',
      daysListed: 5,
      spread: 40,
      isLowestAsk: false,
      isExpired: false
    },
    {
      id: '3',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 15,
      dateAdded: '02/01/2025',
      warehouseLocation: 'West',
      cost: '$120.00',
      daysListed: 30,
      spread: 10,
      isLowestAsk: true,
      isExpired: true
    },
    {
      id: '4',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: '9.5',
      quantity: 18,
      dateAdded: '03/01/2025',
      warehouseLocation: 'South',
      cost: '$120.00',
      daysListed: 3,
      spread: 50,
      isLowestAsk: false,
      isExpired: false
    },
    {
      id: '5',
      image: 'https://images.stockx.com/images/Nike-Air-Max-1-Dark-Stucco-Product.jpg',
      name: 'Nike Air Max 1 SC Dark Stucco',
      styleId: 'NK12345-001',
      size: '8.5',
      quantity: 8,
      dateAdded: '03/15/2025',
      warehouseLocation: 'Central',
      cost: '$110.00',
      daysListed: 20,
      spread: 35,
      isLowestAsk: true,
      isExpired: true
    }
  ];

  // Apply filters to the inventory items
  let filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.styleId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply additional filters if they exist
  if (filters) {
    filteredItems = filteredItems.filter(item => {
      // Spread filter
      if (filters.spreadType === 'greater' && (item.spread || 0) < filters.spreadValue) {
        return false;
      }

      // Days Listed filter
      if (filters.daysListedType === 'greater' && (item.daysListed || 0) < filters.daysListedValue) {
        return false;
      }

      // Lowest Ask filter
      if (filters.lowestAsk === 'lowestAsk' && !item.isLowestAsk) {
        return false;
      } else if (filters.lowestAsk === 'notLowestAsk' && item.isLowestAsk) {
        return false;
      }

      // Expired filter
      if (filters.showOnlyExpired && !item.isExpired) {
        return false;
      }

      return true;
    });
  }

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
                <Avatar className="h-10 w-10 rounded">
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback className="bg-secondary text-xs">
                    {item.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
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
