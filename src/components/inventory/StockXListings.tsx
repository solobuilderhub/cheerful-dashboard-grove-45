
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ExternalLink, Eye } from 'lucide-react';
import { formatTimeAgo, formatPrice, getStatusClass } from './listing-utils';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ListingOrderDetail } from './ListingOrderDetail';

// StockX listing interface
export interface StockXListing {
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

interface StockXListingsProps {
  listings: StockXListing[];
  lastUpdated: string;
}

export function StockXListings({ listings, lastUpdated }: StockXListingsProps) {
  const [selectedListing, setSelectedListing] = useState<StockXListing | null>(null);
  
  // Get a status badge component based on status string
  const getStatusBadge = (status: string) => {
    return <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>;
  };

  // Convert listing to order format for detail view
  const getOrderFromListing = (listing: StockXListing) => {
    // This function transforms a listing into an order format
    // In a real app, you might fetch the actual order from an API
    return {
      askId: listing.ask.askId,
      listingId: listing.listingId,
      amount: listing.amount,
      currencyCode: listing.currencyCode,
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      variant: listing.variant,
      product: listing.product,
      status: listing.status,
      inventoryType: listing.inventoryType
    };
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">StockX Listings</CardTitle>
        <CardDescription>
          Showing {listings.length} active listings on StockX
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
            {listings.map((listing) => (
              <TableRow key={listing.listingId}>
                <TableCell className="font-medium">US {listing.variant.variantValue}</TableCell>
                <TableCell className="font-medium">{formatPrice(listing.amount)}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell>{formatTimeAgo(listing.createdAt)}</TableCell>
                <TableCell>{formatTimeAgo(listing.ask.askExpiresAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => setSelectedListing(listing)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-3xl">
                        {selectedListing && (
                          <ListingOrderDetail
                            order={getOrderFromListing(selectedListing)}
                            platform="stockx"
                            onClose={() => setSelectedListing(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
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
          Last updated {formatTimeAgo(lastUpdated)}
        </div>
      </CardFooter>
    </Card>
  );
}
