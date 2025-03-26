
import React from 'react';

interface Product {
  id: string;
  name: string;
  styleNo: string;
  popularity: number;
  quantity: string;
  color: string;
}

export function TopProducts() {
  const products: Product[] = [
    {
      id: '01',
      name: 'Home Decor Range',
      styleNo: 'HD-101',
      popularity: 85,
      quantity: '100pc',
      color: 'bg-orange'
    },
    {
      id: '02',
      name: 'Disney Princess Dress',
      styleNo: 'DPD-202',
      popularity: 65,
      quantity: '90pc',
      color: 'bg-teal'
    },
    {
      id: '03',
      name: 'Bathroom Essentials',
      styleNo: 'BE-303',
      popularity: 50,
      quantity: '80pc',
      color: 'bg-blue'
    },
    {
      id: '04',
      name: 'Apple Smartwatch',
      styleNo: 'AS-404',
      popularity: 25,
      quantity: '70pc',
      color: 'bg-purple'
    }
  ];

  return (
    <div className="dashboard-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Top Products</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-muted-foreground text-sm border-b border-muted/30">
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Item Name</th>
              <th className="pb-3 font-medium">Style NO.</th>
              <th className="pb-3 font-medium">Popularity</th>
              <th className="pb-3 font-medium text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-muted/20 last:border-0">
                <td className="py-3 text-sm">{product.id}</td>
                <td className="py-3 text-sm">{product.name}</td>
                <td className="py-3 text-sm">{product.styleNo}</td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="progress-bar">
                        <div 
                          className={`progress-bar-fill ${product.color}`} 
                          style={{ width: `${product.popularity}%` }}
                        />
                      </div>
                    </div>
                    {product.id === '04' && (
                      <span className="text-xs px-2 py-1 bg-purple/20 text-purple rounded-full">
                        25%
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 text-sm text-right">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
