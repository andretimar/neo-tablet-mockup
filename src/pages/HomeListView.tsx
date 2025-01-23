import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Item {
  id: string;
  status: string;
  customer: string;
  assignee: string;
  priority?: boolean;
  alert?: boolean;
}

const items: Item[] = [
  { id: "6547", status: "In Progress", customer: "Customer A", assignee: "John Doe", priority: true },
  { id: "6545", status: "Pending", customer: "Customer B", assignee: "Jane Smith", alert: true },
  { id: "6544", status: "Completed", customer: "Customer C", assignee: "Bob Wilson" },
  // Add more sample items as needed
];

const HomeListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRollId, setSelectedRollId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const clearFilters = () => {
    setSelectedRollId("");
    setSelectedStatus("");
    setSelectedCustomer("");
  };

  const filteredItems = items.filter((item) => {
    if (selectedRollId && item.id !== selectedRollId) return false;
    if (selectedStatus && item.status !== selectedStatus) return false;
    if (selectedCustomer && item.customer !== selectedCustomer) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home List View</h1>
          <p className="text-gray-600">View all items in a list format</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedRollId} onValueChange={setSelectedRollId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Roll ID" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    Roll #{item.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Customer A">Customer A</SelectItem>
                <SelectItem value="Customer B">Customer B</SelectItem>
                <SelectItem value="Customer C">Customer C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="transition-all hover:shadow-md">
              <Link to={`/items/${item.id}`}>
                <div className="flex items-center p-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">Roll #{item.id}</span>
                      <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{item.customer}</p>
                      <p className="text-sm text-gray-600">{item.assignee}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default HomeListView;