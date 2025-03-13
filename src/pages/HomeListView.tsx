
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Grid } from "lucide-react";
import { Link } from "react-router-dom";
import FilterBar from "@/components/FilterBar";

interface Item {
  id: string;
  status: "high" | "medium" | "low";
  customer: string;
  assignee: string;
  pair?: string;
  qualityApprovals?: number;
  process: string;
}

const items: Item[] = [
  {
    id: "87602",
    status: "high",
    customer: "Customer A",
    assignee: "John Doe",
    pair: "87603",
    qualityApprovals: 2,
    process: "Disassembly"
  },
  {
    id: "87603",
    status: "medium",
    customer: "Customer B",
    assignee: "Jane Smith",
    qualityApprovals: 1,
    process: "Grinding"
  },
  {
    id: "87604",
    status: "low",
    customer: "Customer C",
    assignee: "Bob Johnson",
    pair: "87605",
    process: "Plating"
  },
];

const HomeListView = () => {
  const [filteredItems, setFilteredItems] = useState(items);
  const processes = ["Disassembly", "Grinding", "Plating", "Heat Treat", "Assembly"];

  const handleFilter = (filters: { rollId: string; status: string; customer: string; process: string }) => {
    const filtered = items.filter((item) => {
      const matchesRollId = !filters.rollId || item.id === filters.rollId;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesCustomer = !filters.customer || item.customer === filters.customer;
      const matchesProcess = !filters.process || item.process === filters.process;
      
      return matchesRollId && matchesStatus && matchesCustomer && matchesProcess;
    });
    
    setFilteredItems(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-amber-100 text-amber-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home List View</h1>
          <p className="text-gray-600">View all items in a list format</p>
        </div>

        <FilterBar 
          onFilter={handleFilter} 
          items={items} 
          processes={processes}
        />

        <div className="flex justify-end mb-4">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Grid className="h-4 w-4" />
              Grid View
            </Button>
          </Link>
        </div>

        <style>
          {`
            .clip-path-half {
              clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
            }
          `}
        </style>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="transition-all hover:shadow-md">
              <Link to={`/edit/${item.id}`}>
                <div className="flex items-center p-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{item.id}</span>
                        {(item.qualityApprovals ?? 0) > 0 && (
                          <div className="relative w-4 h-4">
                            <div className="absolute inset-0 rounded-full border-2 border-green-500">
                              <div 
                                className={`absolute inset-0 bg-green-500 rounded-full ${
                                  (item.qualityApprovals === 1) ? 'clip-path-half' : ''
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
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
                    <p className="text-sm text-gray-500">
                      Process: {item.process}
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
