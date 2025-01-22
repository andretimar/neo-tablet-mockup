import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface InventoryItem {
  id: string;
  name: string;
  dimensions: string;
  weight: string;
  materials: string[];
  quantity: number;
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Sample Item Name in Inventory",
    dimensions: "W: 175 cm H: 60 cm L: 540 cm",
    weight: "156kg",
    materials: ["Metal", "Aluminium", "Chrome"],
    quantity: 8,
  },
  {
    id: "2",
    name: "Sample Item",
    dimensions: "W: 175 cm H: 60 cm L: 540 cm",
    weight: "156kg",
    materials: ["Metal", "Aluminium", "Chrome"],
    quantity: 3,
  },
  {
    id: "3",
    name: "Sample Item Name",
    dimensions: "W: 175 cm H: 60 cm L: 540 cm",
    weight: "156kg",
    materials: ["Metal", "Aluminium", "Chrome"],
    quantity: 1,
  },
];

const InventoryItemCard = ({ item }: { item: InventoryItem }) => (
  <Card className="flex items-start p-4 hover:bg-gray-50">
    <img src="/placeholder.svg" alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
    <div className="flex-1">
      <h3 className="font-semibold">{item.name} ({item.quantity}x)</h3>
      <p className="text-sm text-gray-600">{item.dimensions}</p>
      <p className="text-sm text-gray-600">Weight: {item.weight}</p>
      <p className="text-sm text-gray-600">Material(s): {item.materials.join(", ")}</p>
    </div>
    <ChevronRight className="text-gray-400" />
  </Card>
);

const Inventory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="space-y-4">
          {inventoryItems.map((item) => (
            <Link key={item.id} to={`/inventory/${item.id}`}>
              <InventoryItemCard item={item} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Inventory;