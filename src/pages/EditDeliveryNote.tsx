import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditDeliveryNote = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Delivery Note</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              {/* Customer information form fields will go here */}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
              {/* Delivery information form fields will go here */}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Items</h2>
            {/* Items list with error toggles and comments will go here */}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Delivery Comments</h2>
            {/* Delivery comments section will go here */}
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