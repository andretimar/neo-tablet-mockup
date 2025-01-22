import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  onSearch: (value: string) => void;
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const SearchAndFilter = ({
  onSearch,
  filters,
  activeFilter,
  onFilterChange,
}: SearchAndFilterProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilter;