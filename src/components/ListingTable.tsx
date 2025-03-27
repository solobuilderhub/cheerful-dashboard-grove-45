
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2 } from 'lucide-react';
import { FilterValues } from './FilterModal';

interface ListingItem {
  id: string;
  image: string;
  name: string;
  styleId: string;
  size: string;
  cost: number;
  yourAsk: number;
  qty: string;
  highestBid: number | null;
  lowestAsk: number | null;
  spread: number;
  roi: string;
  daysListed: number;
  lastUpdate: string;
  isExpired: boolean;
}

interface ListingTableProps {
  searchQuery: string;
  filters?: FilterValues | null;
  viewMode: 'simple' | 'grouped';
}

export function ListingTable({ searchQuery, filters, viewMode }: ListingTableProps) {
  // Sample data for the listing items
  const listingItems: ListingItem[] = [
    {
      id: '1',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Wheat-Product.jpg',
      name: 'Timberland 6" Boot Just Don Denim (GS)',
      styleId: 'TB0NLKR/1184',
      size: '5.5Y',
      cost: 85,
      yourAsk: 90,
      qty: '10',
      highestBid: 121,
      lowestAsk: null,
      spread: -31,
      roi: '10%',
      daysListed: 0,
      lastUpdate: '1/1/25',
      isExpired: true
    },
    {
      id: '2',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: 'US M 9.5',
      cost: 95,
      yourAsk: 116,
      qty: '12/5',
      highestBid: 112,
      lowestAsk: 116,
      spread: -1,
      roi: '12%',
      daysListed: 2,
      lastUpdate: '1/1/25',
      isExpired: false
    },
    {
      id: '3',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: 'US M 9.5',
      cost: 100,
      yourAsk: 117,
      qty: '15/2',
      highestBid: 112,
      lowestAsk: 116,
      spread: 0,
      roi: '15%',
      daysListed: 2,
      lastUpdate: '1/1/25',
      isExpired: false
    },
    {
      id: '4',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
      name: 'Timberland 6" Boot Black Nubuck Premium',
      styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
      size: 'US M 9.5',
      cost: 105,
      yourAsk: 118,
      qty: '18',
      highestBid: 112,
      lowestAsk: 116,
      spread: 1,
      roi: '18%',
      daysListed: 4,
      lastUpdate: '1/1/25',
      isExpired: false
    },
    {
      id: '5',
      image: 'https://images.stockx.com/images/Nike-Air-Max-1-Dark-Stucco-Product.jpg',
      name: 'Nike Air Max 1 SC Dark Stucco',
      styleId: 'NK12345-001',
      size: '8.5',
      cost: 75,
      yourAsk: 86,
      qty: '8',
      highestBid: 80,
      lowestAsk: 86,
      spread: 6,
      roi: '22%',
      daysListed: 11,
      lastUpdate: '1/1/25',
      isExpired: false
    }
  ];

  // Apply filters to the listing items
  let filteredItems = listingItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.styleId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply additional filters if they exist
  if (filters) {
    filteredItems = filteredItems.filter(item => {
      // Apply your filter logic here based on the filters
      return true;
    });
  }

  const ActionButton = ({ expired }: { expired: boolean }) => {
    if (expired) {
      return (
        <Button variant="outline" size="sm" className="bg-red-950/30 border-red-800 hover:bg-red-900/50 text-red-400">
          Relist Ask
        </Button>
      );
    }
    return (
      <Button variant="outline" size="sm" className="bg-gray-800 hover:bg-gray-700">
        Sell Now
      </Button>
    );
  };

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
            <TableHead className="text-center">Cost</TableHead>
            <TableHead className="text-center">Your Ask</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-center">Highest Bid</TableHead>
            <TableHead className="text-center">Lowest Ask</TableHead>
            <TableHead className="text-center">Spread</TableHead>
            <TableHead className="text-center">ROI</TableHead>
            <TableHead className="text-center">Days Listed</TableHead>
            <TableHead className="text-center">Last Update</TableHead>
            <TableHead className="w-[120px]"></TableHead>
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
                  <p className="text-xs text-muted-foreground mt-1">{item.styleId} Size: {item.size}</p>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">${item.cost}</TableCell>
              <TableCell className="text-center">
                <div className="relative flex items-center justify-center">
                  <span className="text-green-500 font-medium pr-2">$</span>
                  <span className="font-medium">{item.yourAsk}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.qty}</TableCell>
              <TableCell className="text-center">${item.highestBid || '--'}</TableCell>
              <TableCell className="text-center text-green-500">${item.lowestAsk || '--'}</TableCell>
              <TableCell className={`text-center ${item.spread > 0 ? 'text-green-500' : item.spread < 0 ? 'text-red-500' : ''}`}>
                {item.spread > 0 ? `+${item.spread}` : item.spread}
              </TableCell>
              <TableCell className="text-center font-medium">{item.roi}</TableCell>
              <TableCell className="text-center">{item.daysListed}</TableCell>
              <TableCell className="text-center">{item.lastUpdate}</TableCell>
              <TableCell>
                <ActionButton expired={item.isExpired} />
              </TableCell>
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
