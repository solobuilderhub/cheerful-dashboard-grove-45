
export interface SizeChart {
  defaultConversion: {
    size: string;
    type: string;
  };
  availableConversions: Array<{
    size: string;
    type: string;
  }>;
}

export interface Variant {
  _id: string;
  variantId: string;
  variantName: string;
  variantValue: string;
  size: string;
  sizeChart?: SizeChart;
  quantity?: number;
  dateAdded?: string;
  warehouseLocation1?: string;
  warehouseLocation2?: string;
  warehouseLocation3?: string;
  wholesalePrice?: number;
  retailPrice?: number;
  totalSoldStockX?: number;
  totalSoldGoat?: number;
}

export interface ProductAttributes {
  color: string | null;
  gender: string | null;
  releaseDate: string | null;
  retailPrice: number | null;
  season: string | null;
  colorway: string | null;
  category: string | null;
  _id: string;
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
  _id?: string;
  brand?: string;
  productAttributes?: ProductAttributes;
  variations?: Variant[];
}
