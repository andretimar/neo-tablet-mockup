
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  onFilter: (filters: {
    rollId: string;
    status: string;
    customer: string;
    process: string;
  }) => void;
  items: {
    id: string;
    status?: string;
    customer?: string;
    process?: string;
  }[];
  processes: string[];
}

const FilterBar = ({ onFilter, items, processes }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    rollId: "",
    status: "",
    customer: "",
    process: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      rollId: "",
      status: "",
      customer: "",
      process: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="flex gap-4 mb-6 items-center">
      <div className="flex-1 grid grid-cols-4 gap-4">
        <Select
          value={filters.rollId}
          onValueChange={(value) => handleFilterChange("rollId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Roll ID" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(items.map((item) => item.id))).map((id) => (
              <SelectItem key={id} value={id}>{id}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger>
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
          onValueChange={(value) => handleFilterChange("customer", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Customer" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(items.map((item) => item.customer).filter(Boolean))).map(
              (customer) => (
                <SelectItem key={customer} value={customer || ""}>{customer}</SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        
        <Select
          value={filters.process}
          onValueChange={(value) => handleFilterChange("process", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Process" />
          </SelectTrigger>
          <SelectContent>
            {processes.map((process) => (
              <SelectItem key={process} value={process}>{process}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={clearFilters}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FilterBar;
