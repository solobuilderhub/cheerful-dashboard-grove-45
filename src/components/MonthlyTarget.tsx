
import React from 'react';

export function MonthlyTarget() {
  const targetPercentage = 80;
  const profit = '$6078.76';
  const compareText = 'More than last Month';
  
  return (
    <div className="dashboard-card h-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-5">Monthly Target Sales</h2>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Earnings</p>
            <p className="text-3xl font-bold text-foreground">{profit}</p>
            <p className="text-xs text-muted-foreground">
              Profit is {targetPercentage}% {compareText}
            </p>
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="relative h-32 w-32">
              {/* Gauge background */}
              <div className="absolute inset-0 rounded-full border-8 border-muted/30"></div>
              
              {/* Gauge progress */}
              <div 
                className="absolute inset-0 rounded-full border-8 border-teal"
                style={{ 
                  clipPath: `polygon(50% 50%, 0 0, ${targetPercentage < 50 ? targetPercentage * 2 : 100}% 0, ${targetPercentage > 50 ? '100% 100%,' : ''} ${targetPercentage > 75 ? '0 100%,' : ''} 0 ${targetPercentage > 25 ? 0 : targetPercentage * 4}%)` 
                }}
              ></div>
              
              {/* Gauge center and text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold">{targetPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
