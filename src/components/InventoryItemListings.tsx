
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { Package, ListOrdered, ExternalLink, RefreshCw, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// GOAT listing interface
interface GoatListing {
  id: string;
  catalog_id: string;
  condition: string;
  packaging_condition: string;
  size: number;
  size_unit: string;
  sku: string;
  consigned: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  price_cents: string;
  activated_at: string;
  defects: string[];
  additional_defects: string;
}

// StockX listing interface
interface StockXListing {
  amount: string;
  ask: {
    askId: string;
    askCreatedAt: string;
    askUpdatedAt: string;
    askExpiresAt: string;
  };
  order: any;
  product: {
    productId: string;
    productName: string;
    styleId: string;
  };
  variant: {
    variantId: string;
    variantName: string;
    variantValue: string;
  };
  currencyCode: string;
  listingId: string;
  status: string;
  inventoryType: string;
  createdAt: string;
  updatedAt: string;
  authenticationDetails: any;
  batch: {
    batchId: string;
    taskId: string;
  };
  initiatedShipments: any;
}

interface InventoryItemListingsProps {
  styleId: string;
  name: string;
}

export function InventoryItemListings({ styleId, name }: InventoryItemListingsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('stockx');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for demonstration
  const mockStockXListings: StockXListing[] = [
    {
      amount: "148",
      ask: {
        askId: "14632361809866143310",
        askCreatedAt: "2025-04-10T19:30:56.000Z",
        askUpdatedAt: "2025-04-10T19:30:56.000Z",
        askExpiresAt: "2026-04-10T19:30:46.000Z"
      },
      order: null,
      product: {
        productId: "3414f48d-e8bf-463f-9e6b-9d8520a202b9",
        productName: "Timberland 6\" Boot Black Nubuck Premium",
        styleId: styleId,
      },
      variant: {
        variantId: "7f70b1d5-f9a2-4eff-af46-b19c3a68af5e",
        variantName: "Timberland-6-Black-Nubuck:9",
        variantValue: "9"
      },
      currencyCode: "USD",
      listingId: "f9c5e3f5-0762-4a9d-aebb-e74a2cdca53d",
      status: "ACTIVE",
      inventoryType: "STANDARD",
      createdAt: "2025-04-10T19:30:55.251Z",
      updatedAt: "2025-04-10T19:31:00.225Z",
      authenticationDetails: null,
      batch: {
        batchId: "52591f34-524e-42b1-a571-133ad0f6574e",
        taskId: "c34445fb-9730-4ce1-b7b6-20439351cc50"
      },
      initiatedShipments: null
    },
    {
      amount: "155",
      ask: {
        askId: "14632361809866143311",
        askCreatedAt: "2025-04-12T14:20:16.000Z",
        askUpdatedAt: "2025-04-12T14:20:16.000Z",
        askExpiresAt: "2026-04-12T14:20:16.000Z"
      },
      order: null,
      product: {
        productId: "3414f48d-e8bf-463f-9e6b-9d8520a202b9",
        productName: "Timberland 6\" Boot Black Nubuck Premium",
        styleId: styleId,
      },
      variant: {
        variantId: "8f70b1d5-f9a2-4eff-af46-b19c3a68af5e",
        variantName: "Timberland-6-Black-Nubuck:10",
        variantValue: "10"
      },
      currencyCode: "USD",
      listingId: "g9c5e3f5-0762-4a9d-aebb-e74a2cdca53d",
      status: "ACTIVE",
      inventoryType: "STANDARD",
      createdAt: "2025-04-12T14:20:16.251Z",
      updatedAt: "2025-04-12T14:20:20.225Z",
      authenticationDetails: null,
      batch: {
        batchId: "52591f34-524e-42b1-a571-133ad0f6574e",
        taskId: "c34445fb-9730-4ce1-b7b6-20439351cc50"
      },
      initiatedShipments: null
    }
  ];

  const mockGoatListings: GoatListing[] = [
    {
      id: "019553af-bc11-7893-9b5b-591785703a49",
      catalog_id: "air-jordan-13-retro-wheat-2023-414571-171",
      condition: "CONDITION_NEW",
      packaging_condition: "PACKAGING_CONDITION_GOOD_CONDITION",
      size: 9,
      size_unit: "SIZE_UNIT_US",
      sku: styleId,
      consigned: false,
      created_at: "2025-03-01T21:49:40.323Z",
      updated_at: "2025-04-05T02:29:48.904Z",
      status: "LISTING_STATUS_ACTIVE",
      price_cents: "14000",
      activated_at: "2025-04-05T02:29:48.902Z",
      defects: [],
      additional_defects: ""
    },
    {
      id: "119553af-bc11-7893-9b5b-591785703b50",
      catalog_id: "air-jordan-13-retro-wheat-2023-414571-171",
      condition: "CONDITION_NEW",
      packaging_condition: "PACKAGING_CONDITION_GOOD_CONDITION",
      size: 10,
      size_unit: "SIZE_UNIT_US",
      sku: styleId,
      consigned: false,
      created_at: "2025-03-05T10:23:15.323Z",
      updated_at: "2025-04-07T08:15:22.904Z",
      status: "LISTING_STATUS_ACTIVE",
      price_cents: "15000",
      activated_at: "2025-04-07T08:15:22.902Z",
      defects: [],
      additional_defects: ""
    }
  ];

  const handleRefreshListings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Listings refreshed",
        description: "All marketplace listings have been refreshed.",
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'ACTIVE' || status === 'LISTING_STATUS_ACTIVE') {
      return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Active</Badge>;
    } else if (status === 'PENDING' || status === 'LISTING_STATUS_PENDING') {
      return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">Pending</Badge>;
    } else if (status === 'EXPIRED' || status === 'LISTING_STATUS_EXPIRED') {
      return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">Expired</Badge>;
    } else if (status === 'SOLD' || status === 'LISTING_STATUS_SOLD') {
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">Sold</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown date';
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.includes('.') ? numPrice : numPrice / 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{name} - Marketplace Listings</h2>
          <p className="text-sm text-muted-foreground">Style ID: {styleId}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1.5"
          onClick={handleRefreshListings}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh Listings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stockx" className="flex items-center gap-2">
            <Package size={16} />
            StockX Listings
            <Badge variant="secondary" className="ml-1">
              {mockStockXListings.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="goat" className="flex items-center gap-2">
            <ListOrdered size={16} />
            GOAT Listings
            <Badge variant="secondary" className="ml-1">
              {mockGoatListings.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stockx" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">StockX Listings</CardTitle>
              <CardDescription>
                Showing {mockStockXListings.length} active listings on StockX
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Listed</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStockXListings.map((listing) => (
                    <TableRow key={listing.listingId}>
                      <TableCell className="font-medium">US {listing.variant.variantValue}</TableCell>
                      <TableCell className="font-medium">{formatPrice(listing.amount)}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{formatTimeAgo(listing.createdAt)}</TableCell>
                      <TableCell>{formatTimeAgo(listing.ask.askExpiresAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <DollarSign className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2">
              <div className="text-xs text-muted-foreground w-full text-center">
                Last updated {formatTimeAgo(new Date().toISOString())}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="goat" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">GOAT Listings</CardTitle>
              <CardDescription>
                Showing {mockGoatListings.length} active listings on GOAT
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Listed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGoatListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        {listing.size} {listing.size_unit.replace('SIZE_UNIT_', '')}
                      </TableCell>
                      <TableCell className="font-medium">{formatPrice(listing.price_cents)}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>
                        {listing.condition === 'CONDITION_NEW' ? 'New' : 
                         listing.condition === 'CONDITION_USED' ? 'Used' : 
                         listing.condition === 'CONDITION_NEW_WITH_DEFECTS' ? 'New w/ Defects' : 
                         listing.condition}
                      </TableCell>
                      <TableCell>{formatTimeAgo(listing.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <DollarSign className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2">
              <div className="text-xs text-muted-foreground w-full text-center">
                Last updated {formatTimeAgo(new Date().toISOString())}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
