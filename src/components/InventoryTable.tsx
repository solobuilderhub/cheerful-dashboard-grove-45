import React, { useState } from 'react';
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
import { Trash2, Eye } from 'lucide-react';
import { FilterValues } from './FilterModal';
import { Button } from "@/components/ui/button";
import { InventoryDetailDrawer } from './InventoryDetailDrawer';

interface SizeChart {
  defaultConversion: {
    size: string;
    type: string;
  };
  availableConversions: Array<{
    size: string;
    type: string;
  }>;
}

interface Variant {
  _id: string;
  variantId: string;
  variantName: string;
  variantValue: string;
  size: string;
  sizeChart?: SizeChart;
  quantity?: number;
}

export interface InventoryItem {
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
  stockx?: {
    sku: string;
    productId?: string;
  };
  goat?: {
    sku: string;
    size_unit?: string;
    catalogId?: string;
    name?: string;
  };
  brand?: string;
  variations?: Variant[];
}

interface InventoryTableProps {
  searchQuery: string;
  filters?: FilterValues | null;
}

export function InventoryTable({ searchQuery, filters }: InventoryTableProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Sample data for the inventory items with added marketplace info
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Wheat-Product.jpg',
      name: 'Timberland 6" Boot Just Don Denim (GS)',
      styleId: 'TB0NLKR/1184',
      size: '5.5Y',
      quantity: 10,
      dateAdded: '01/01/2025',
      warehouseLocation: 'Northeast',
      cost: '95.00',
      daysListed: 15,
      spread: 25,
      isLowestAsk: true,
      isExpired: false,
      brand: 'Timberland',
      stockx: {
        sku: 'TB0NLKR-1184',
        productId: 'c5e32ce5-4828-4f49-a345-f83e97285b3d'
      },
      goat: {
        sku: 'TB0NLKR1184',
        size_unit: 'SIZE_UNIT_US',
        catalogId: 'timberland-6-boot-just-don-denim-gs',
      },
      variations: [
        {
          _id: '68217c125032caddc99e584d',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f522',
          variantName: 'Timberland-6-Boot-Just-Don-Denim-GS:5.5Y',
          variantValue: '5.5Y',
          size: '5.5Y',
          quantity: 3,
          sizeChart: {
            defaultConversion: {
              size: '5.5Y',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 5.5Y',
                type: 'us'
              },
              {
                size: 'UK 5',
                type: 'uk'
              },
              {
                size: 'EU 38',
                type: 'eu'
              }
            ]
          }
        },
        {
          _id: '68217c125032caddc99e584e',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f523',
          variantName: 'Timberland-6-Boot-Just-Don-Denim-GS:6Y',
          variantValue: '6Y',
          size: '6Y',
          quantity: 2,
          sizeChart: {
            defaultConversion: {
              size: '6Y',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 6Y',
                type: 'us'
              },
              {
                size: 'UK 5.5',
                type: 'uk'
              },
              {
                size: 'EU 38.5',
                type: 'eu'
              }
            ]
          }
        },
        {
          _id: '68217c125032caddc99e584f',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f524',
          variantName: 'Timberland-6-Boot-Just-Don-Denim-GS:7Y',
          variantValue: '7Y',
          size: '7Y',
          quantity: 5,
          sizeChart: {
            defaultConversion: {
              size: '7Y',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 7Y',
                type: 'us'
              },
              {
                size: 'UK 6.5',
                type: 'uk'
              },
              {
                size: 'EU 39.5',
                type: 'eu'
              }
            ]
          }
        }
      ]
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
      cost: '120.00',
      daysListed: 5,
      spread: 40,
      isLowestAsk: false,
      isExpired: false,
      brand: 'Timberland',
      stockx: {
        sku: 'TB00073-009',
        productId: 'd4e32ce5-4828-4f49-a345-f83e97285b3d'
      },
      goat: {
        sku: 'TB00073009',
        size_unit: 'SIZE_UNIT_US',
        catalogId: 'timberland-6-boot-black-nubuck-premium',
      },
      variations: [
        {
          _id: '68217c125032caddc99e5850',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f525',
          variantName: 'Timberland-6-Boot-Black-Nubuck:9',
          variantValue: '9',
          size: '9',
          quantity: 4,
          sizeChart: {
            defaultConversion: {
              size: '9',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 9',
                type: 'us'
              },
              {
                size: 'UK 8.5',
                type: 'uk'
              },
              {
                size: 'EU 43',
                type: 'eu'
              }
            ]
          }
        },
        {
          _id: '68217c125032caddc99e5851',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f526',
          variantName: 'Timberland-6-Boot-Black-Nubuck:9.5',
          variantValue: '9.5',
          size: '9.5',
          quantity: 3,
          sizeChart: {
            defaultConversion: {
              size: '9.5',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 9.5',
                type: 'us'
              },
              {
                size: 'UK 9',
                type: 'uk'
              },
              {
                size: 'EU 43.5',
                type: 'eu'
              }
            ]
          }
        },
        {
          _id: '68217c125032caddc99e5852',
          variantId: 'aea02332-e8d8-4413-a5ae-b7b82ca6f527',
          variantName: 'Timberland-6-Boot-Black-Nubuck:10',
          variantValue: '10',
          size: '10',
          quantity: 5,
          sizeChart: {
            defaultConversion: {
              size: '10',
              type: 'us'
            },
            availableConversions: [
              {
                size: 'US 10',
                type: 'us'
              },
              {
                size: 'UK 9.5',
                type: 'uk'
              },
              {
                size: 'EU 44',
                type: 'eu'
              }
            ]
          }
        }
      ]
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
      cost: '120.00',
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
      cost: '120.00',
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

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <>
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
              <TableHead className="w-[80px]"></TableHead>
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
                <TableCell>${item.cost}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleViewItem(item)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <InventoryDetailDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        item={selectedItem}
      />
    </>
  );
}
