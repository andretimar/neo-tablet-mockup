import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";

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

const InventoryItemCard = ({ item }: { item: InventoryItem }) => {
  const getQuantityColor = () => {
    if (item.quantity <= 1) return "bg-red-100 text-red-800";
    if (item.quantity <= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/inventory/${item.id}`}>
        <div className="flex items-center p-4">
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
            <img
              src="/placeholder.svg"
              alt={item.name}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{item.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuantityColor()}`}>
                {item.quantity} in stock
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.dimensions}</p>
            <p className="text-sm text-gray-600">
              Materials: {item.materials.join(", ")}
            </p>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </Link>
    </Card>
  );
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Low Stock", "In Stock", "Out of Stock"];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.materials.some((material) =>
        material.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Low Stock" && item.quantity <= 3) ||
      (activeFilter === "In Stock" && item.quantity > 3) ||
      (activeFilter === "Out of Stock" && item.quantity === 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory</h1>
          <p className="text-gray-600">Manage your inventory items</p>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No inventory items found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Inventory;