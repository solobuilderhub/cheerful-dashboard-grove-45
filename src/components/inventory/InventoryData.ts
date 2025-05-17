
import { InventoryItem } from '../inventory-drawer/types';

// This file contains the sample inventory data, extracted to reduce the main component's size
export const sampleInventoryItems: InventoryItem[] = [
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
