import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockInventoryItem = {
  id: "INV001",
  name: "Industrial Grade Bearing",
  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  stockAmount: 42,
  description: "High-performance industrial bearing for heavy machinery",
  specifications: {
    material: "Stainless Steel",
    diameter: "120mm",
    weight: "2.5kg",
    manufacturer: "BearingCo Ltd",
    category: "Machine Parts",
    location: "Warehouse A-12"
  },
  relatedDeliveryNotes: [
    { id: "DN001", date: "2024-02-15", quantity: 10, status: "Received" },
    { id: "DN002", date: "2024-02-10", quantity: 15, status: "Pending" },
    { id: "DN003", date: "2024-02-05", quantity: 8, status: "Received" },
  ]
};

const InventoryDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-5xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Item Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={mockInventoryItem.image}
                alt={mockInventoryItem.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{mockInventoryItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Stock Amount:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {mockInventoryItem.stockAmount} units
                  </span>
                </div>
                <p className="text-gray-600">{mockInventoryItem.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(mockInventoryItem.specifications).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-sm text-gray-500 capitalize">{key}</span>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Delivery Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delivery Note ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInventoryItem.relatedDeliveryNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>{note.quantity}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        note.status === "Received" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {note.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InventoryDetails;