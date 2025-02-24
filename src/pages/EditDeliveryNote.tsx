import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface DeliveryItem {
  id: string;
  description: string;
  hasError: boolean;
  comment: string;
  process: string;
}
const availableItems = [{
  id: "6081",
  name: "Item 6081"
}, {
  id: "6082",
  name: "Item 6082"
}, {
  id: "3020",
  name: "Item 3020"
}, {
  id: "3021",
  name: "Item 3021"
}, {
  id: "4050",
  name: "Item 4050"
}, {
  id: "4051",
  name: "Item 4051"
}];
const process = "Roll Ø 600 x 450 – flat profile with tungsten carbide coating";
const EditDeliveryNote = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [items, setItems] = useState<DeliveryItem[]>([{
    id: "6081",
    description: "Item 6081",
    hasError: false,
    comment: "",
    process
  }, {
    id: "6082",
    description: "Item 6082",
    hasError: false,
    comment: "",
    process
  }, {
    id: "3020",
    description: "Item 3020",
    hasError: false,
    comment: "",
    process
  }, {
    id: "3021",
    description: "Item 3021",
    hasError: false,
    comment: "",
    process
  }]);
  const handleErrorToggle = (itemId: string, checked: boolean) => {
    setItems(items.map(item => item.id === itemId ? {
      ...item,
      hasError: checked
    } : item));
  };
  const handleCommentChange = (itemId: string, comment: string) => {
    setItems(items.map(item => item.id === itemId ? {
      ...item,
      comment
    } : item));
  };
  const handleItemChange = (currentItemId: string, newItemId: string) => {
    const newItem = availableItems.find(item => item.id === newItemId);
    if (!newItem) return;
    setItems(prevItems => prevItems.map(item => item.id === currentItemId ? {
      ...item,
      id: newItem.id,
      description: newItem.name
    } : item));
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-5xl py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Delivery Notes
        </Button>
        
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Delivery Note #{id}</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Open</span>
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
              {items.map(item => <Card key={item.id + item.description} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex gap-4 flex-1">
                        <Select defaultValue={item.id} onValueChange={value => handleItemChange(item.id, value)}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select an item">
                              {item.description}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {availableItems.map(availableItem => <SelectItem key={availableItem.id} value={availableItem.id}>
                                {availableItem.name}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>

                        <Select value={item.process} disabled>
                          <SelectTrigger className="w-[400px]">
                            <SelectValue>
                              {item.process}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={process}>
                              {process}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" checked={item.hasError} onChange={e => handleErrorToggle(item.id, e.target.checked)} />
                        <span className="text-sm">Has Error</span>
                      </label>
                    </div>
                    {item.hasError && <div className="space-y-4">
                        <Textarea placeholder="Add error comment..." value={item.comment} onChange={e => handleCommentChange(item.id, e.target.value)} className="w-full" />
                        <div className="flex items-center gap-2">
                          <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photos
                          </Button>
                        </div>
                      </div>}
                  </div>
                </Card>)}
            </div>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="loadingDate">
                  Date of Loading
                </label>
                <input type="date" id="loadingDate" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="truckId">
                  Truck ID
                </label>
                <Textarea id="truckId" className="resize-none" rows={2} placeholder="Please enter the truck identification number..." />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Comments</h2>
            <Textarea placeholder="Add any additional comments about the delivery..." className="min-h-[100px]" />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </Card>
      </main>
    </div>;
};
export default EditDeliveryNote;