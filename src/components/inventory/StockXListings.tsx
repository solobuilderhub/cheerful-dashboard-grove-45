
import React from 'react';
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
import { DollarSign, ExternalLink } from 'lucide-react';
import { formatTimeAgo, formatPrice, getStatusClass } from './listing-utils';

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
  // Get a status badge component based on status string
  const getStatusBadge = (status: string) => {
    return <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>;
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
