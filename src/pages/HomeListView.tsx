import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Item {
  id: string;
  status: "high" | "medium" | "low";
  customer: string;
  assignee: string;
  pair?: string;
}

const items: Item[] = [
  {
    id: "87602",
    status: "high",
    customer: "Customer A",
    assignee: "John Doe",
    pair: "87603",
  },
  {
    id: "87603",
    status: "medium",
    customer: "Customer B",
    assignee: "Jane Smith",
  },
  {
    id: "87604",
    status: "low",
    customer: "Customer C",
    assignee: "Bob Johnson",
    pair: "87605",
  },
];

const HomeListView = () => {
  const [filters, setFilters] = useState({
    rollId: "",
    status: "",
    customer: "",
  });

  const clearFilters = () => {
    setFilters({
      rollId: "",
      status: "",
      customer: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (!filters.rollId || item.id === filters.rollId) &&
      (!filters.status || item.status === filters.status) &&
      (!filters.customer || item.customer === filters.customer)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home List View</h1>
          <p className="text-gray-600">View all items in a list format</p>
        </div>

        <div className="flex gap-4 mb-6 items-center">
          <Select
            value={filters.rollId}
            onValueChange={(value) =>
              setFilters({ ...filters, rollId: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Roll ID" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters({ ...filters, status: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.customer}
            onValueChange={(value) =>
              setFilters({ ...filters, customer: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(items.map((item) => item.customer))).map(
                (customer) => (
                  <SelectItem key={customer} value={customer}>
                    {customer}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="transition-all hover:shadow-md">
              <Link to={`/edit/${item.id}`}>
                <div className="flex items-center p-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">#{item.id}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.customer} - Assigned to {item.assignee}
                      {item.pair && ` - Pair: ${item.pair}`}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </Link>
            </Card>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomeListView;