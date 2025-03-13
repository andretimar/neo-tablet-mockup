
import { useState, useEffect } from "react";
import ProcessCard from "./ProcessCard";
import FilterBar from "./FilterBar";

interface ProcessItem {
  id: string;
  process: "Disassembly" | "Grinding" | "Plating" | "Heat Treat" | "Assembly";
  client: string;
  pair?: string;
  assignee: {
    name: string;
    image: string;
  };
  isPriority?: boolean;
  hasProblem?: boolean;
  approvalStatus?: "none" | "partial" | "full";
}

const mockData = {
  inProgress: [
    { id: "87602", process: "Disassembly", client: "Samsung", assignee: { name: "John Doe", image: "/placeholder.svg" }, isPriority: true, approvalStatus: "full" },
    { id: "75036", process: "Grinding", client: "Samsung", pair: "75037", assignee: { name: "Jane Smith", image: "/placeholder.svg" }, approvalStatus: "partial" },
    { id: "4065", process: "Plating", client: "SKBM", assignee: { name: "Mike Johnson", image: "/placeholder.svg" }, hasProblem: true, approvalStatus: "none" },
    { id: "12679", process: "Heat Treat", client: "SKOM", pair: "12680", assignee: { name: "Sarah Wilson", image: "/placeholder.svg" }, approvalStatus: "partial" },
    { id: "3340", process: "Assembly", client: "Samsung", pair: "3341", assignee: { name: "Tom Brown", image: "/placeholder.svg" }, approvalStatus: "full" },
  ] as ProcessItem[],
  waiting: [
    { id: "87603", process: "Disassembly", client: "LG", assignee: { name: "Alex Lee", image: "/placeholder.svg" }, approvalStatus: "none" },
    { id: "75038", process: "Grinding", client: "SKBM", pair: "75039", assignee: { name: "Emma Davis", image: "/placeholder.svg" }, approvalStatus: "partial" },
    { id: "4066", process: "Plating", client: "Samsung", assignee: { name: "Chris Park", image: "/placeholder.svg" }, approvalStatus: "none" },
    { id: "12681", process: "Heat Treat", client: "LG", pair: "12682", assignee: { name: "Lisa Chen", image: "/placeholder.svg" }, approvalStatus: "partial" },
    { id: "3342", process: "Assembly", client: "SKOM", pair: "3343", assignee: { name: "David Kim", image: "/placeholder.svg" }, approvalStatus: "full" },
  ] as ProcessItem[],
};

type ProcessType = ProcessItem["process"];
type GroupedData = Record<ProcessType, ProcessItem[]>;

const ProcessGrid = () => {
  const [filteredInProgress, setFilteredInProgress] = useState(mockData.inProgress);
  const [filteredWaiting, setFilteredWaiting] = useState(mockData.waiting);
  const allProcesses = ["Disassembly", "Grinding", "Plating", "Heat Treat", "Assembly"];
  
  const handleFilter = (filters: { rollId: string; status: string; customer: string; process: string }) => {
    const filterItems = (items: ProcessItem[]) => {
      return items.filter((item) => {
        const matchesRollId = !filters.rollId || item.id === filters.rollId;
        
        const matchesStatus = !filters.status || 
          (filters.status === "high" && item.isPriority) ||
          (filters.status === "medium" && !item.isPriority && !item.hasProblem) ||
          (filters.status === "low" && item.hasProblem);
        
        const matchesCustomer = !filters.customer || item.client === filters.customer;
        const matchesProcess = !filters.process || item.process === filters.process;
        
        return matchesRollId && matchesStatus && matchesCustomer && matchesProcess;
      });
    };
    
    setFilteredInProgress(filterItems(mockData.inProgress));
    setFilteredWaiting(filterItems(mockData.waiting));
  };
  
  const allItems = [...mockData.inProgress, ...mockData.waiting];

  const groupData = (items: ProcessItem[]): GroupedData => {
    return items.reduce((acc, item) => {
      const process = item.process;
      if (!acc[process]) {
        acc[process] = [];
      }
      acc[process] = [...acc[process], item];
      return acc;
    }, {} as GroupedData);
  };

  const renderSection = (
    title: string,
    items: ProcessItem[],
    showProcessLabels: boolean = true
  ) => {
    const groupedData = groupData(items);
    
    // Get all process types that have items after filtering
    const processTypesWithItems = Object.keys(groupedData) as ProcessType[];
    
    if (processTypesWithItems.length === 0) {
      return (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="p-8 text-center text-gray-500">
            No items match the current filters
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="grid grid-cols-5 gap-4">
          {allProcesses.map((process) => (
            <div key={process} className="space-y-3">
              {showProcessLabels && (
                <h3 className="text-lg font-semibold text-gray-700">{process}</h3>
              )}
              <div className="space-y-3">
                {(groupedData[process as ProcessType] || []).map((item) => (
                  <ProcessCard key={item.id} {...item} />
                ))}
                {!groupedData[process as ProcessType] && (
                  <div className="h-[160px] border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    No items
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <FilterBar 
        onFilter={handleFilter} 
        items={allItems} 
        processes={allProcesses}
      />
      {renderSection("In Progress", filteredInProgress, true)}
      {renderSection("Waiting", filteredWaiting, false)}
    </div>
  );
};

export default ProcessGrid;
