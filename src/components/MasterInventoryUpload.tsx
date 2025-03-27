
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export function MasterInventoryUpload() {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const handleFileUpload = (file: File) => {
    // In a real app, you would process the file here
    console.log('File uploaded:', file.name);
    
    // Show success notification
    toast({
      title: "File Uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Master Inventory</h2>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-lg font-medium mb-2">Upload the master inventory file</p>
        <label htmlFor="inventory-file-upload">
          <div className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
            <Upload size={16} />
            <span>Upload</span>
            <input 
              id="inventory-file-upload" 
              type="file" 
              className="hidden" 
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
