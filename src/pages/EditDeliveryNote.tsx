import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";

interface DeliveryItem {
  id: string;
  name: string;
  dimensions?: string;
  weight?: string;
  quantity: number;
  hasError: boolean;
  errorComment?: string;
}

const EditDeliveryNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app this would come from an API
  const deliveryData = {
    id: "6547",
    customer: {
      name: "Samsung SDI Magyarország Zrt.",
      address: "2131 Göd",
      street: "Schenek István utca 1.",
      vatNumber: "1262784244"
    },
    delivery: {
      number: "6547",
      date: "2025.01.13.",
      poNumber: "1243/2025",
      dueDate: "2025.01.28"
    },
    items: [
      {
        id: "87246",
        name: "Sample Item Name Here",
        dimensions: "W: 175 cm H: 60 cm L: 540 cm",
        quantity: 1,
        hasError: true,
        errorComment: "Error comment"
      },
      {
        id: "357863/383",
        name: "Sample Item",
        quantity: 4,
        hasError: false
      },
      {
        id: "sample3",
        name: "Sample Item",
        weight: "40kg",
        quantity: 2,
        hasError: false
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6 max-w-5xl">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">Delivery Note #{deliveryData.id}</h1>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button>Save</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div>
              <h2 className="font-semibold mb-2">Customer</h2>
              <div className="space-y-1 text-gray-600">
                <p>{deliveryData.customer.name}</p>
                <p>{deliveryData.customer.address}</p>
                <p>{deliveryData.customer.street}</p>
                <p>{deliveryData.customer.vatNumber}</p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Delivery #</p>
                  <p className="font-medium">{deliveryData.delivery.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Date</p>
                  <p className="font-medium">{deliveryData.delivery.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">P.O. #</p>
                  <p className="font-medium">{deliveryData.delivery.poNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium">{deliveryData.delivery.dueDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items in Delivery */}
          <div>
            <h2 className="font-semibold mb-4">Items in Delivery</h2>
            <Card className="divide-y">
              {deliveryData.items.map((item) => (
                <div key={item.id} className="p-4 flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.name} ({item.id})</p>
                        {item.dimensions && (
                          <p className="text-sm text-gray-600">{item.dimensions}</p>
                        )}
                        {item.weight && (
                          <p className="text-sm text-gray-600">{item.weight}</p>
                        )}
                      </div>
                      <p className="text-lg font-medium">{item.quantity}x</p>
                    </div>
                    {item.hasError && (
                      <div className="mt-2">
                        <Textarea 
                          placeholder="Error comment"
                          defaultValue={item.errorComment}
                          className="border-red-200"
                        />
                      </div>
                    )}
                  </div>
                  <div className="pt-1">
                    <Switch defaultChecked={item.hasError} />
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Delivery Comments */}
          <div>
            <h2 className="font-semibold mb-2">Delivery Comments</h2>
            <Textarea 
              placeholder="Please make sure you note every discrepancy discovered during this delivery."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditDeliveryNote;