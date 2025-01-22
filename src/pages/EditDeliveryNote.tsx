import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

interface DeliveryItem {
  id: string;
  description: string;
  quantity: number;
  receivedQuantity: number;
  hasError: boolean;
  comment: string;
}

const EditDeliveryNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState<DeliveryItem[]>([
    { id: "1234", description: "Steel Pipe 2inch", quantity: 10, receivedQuantity: 0, hasError: false, comment: "" },
    { id: "1235", description: "Copper Wire 12AWG", quantity: 50, receivedQuantity: 0, hasError: false, comment: "" },
    { id: "1236", description: "Aluminum Sheet 3mm", quantity: 20, receivedQuantity: 0, hasError: false, comment: "" },
    { id: "1237", description: "Brass Fitting 1/2inch", quantity: 30, receivedQuantity: 0, hasError: false, comment: "" }
  ]);

  const handleErrorToggle = (itemId: string, checked: boolean) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, hasError: checked } : item
    ));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, comment } : item
    ));
  };

  const handleReceivedQuantityChange = (itemId: string, value: number) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, receivedQuantity: value } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-5xl py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Delivery Notes
        </Button>
        
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Delivery Note #{id}</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              In Progress
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Customer Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Customer:</span> Neo Industries GmbH</p>
                <p className="text-gray-600"><span className="font-medium">Contact:</span> John Smith</p>
                <p className="text-gray-600"><span className="font-medium">Phone:</span> +1 234 567 890</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Delivery Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Date:</span> 2024.03.15</p>
                <p className="text-gray-600"><span className="font-medium">Address:</span> 123 Industrial Park, Manufacturing City, MC 12345</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">Item #{item.id}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-sm">
                          <span className="font-medium">Quantity:</span> {item.quantity}
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium">Received:</label>
                          <Input
                            type="number"
                            value={item.receivedQuantity}
                            onChange={(e) => handleReceivedQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            min="0"
                            max={item.quantity}
                          />
                        </div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={item.hasError}
                            onChange={(e) => handleErrorToggle(item.id, e.target.checked)}
                          />
                          <span className="text-sm">Has Error</span>
                        </label>
                      </div>
                    </div>
                    {item.hasError && (
                      <div>
                        <Textarea
                          placeholder="Add error comment..."
                          value={item.comment}
                          onChange={(e) => handleCommentChange(item.id, e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Comments</h2>
            <Textarea 
              placeholder="Add any additional comments about the delivery..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default EditDeliveryNote;