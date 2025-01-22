import ProcessCard from "./ProcessCard";
import { Separator } from "./ui/separator";

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
}

const mockData = {
  inProgress: [
    { id: "87602", process: "Disassembly", client: "Samsung", assignee: { name: "John Doe", image: "/placeholder.svg" }, isPriority: true },
    { id: "75036", process: "Grinding", client: "Samsung", pair: "75037", assignee: { name: "Jane Smith", image: "/placeholder.svg" } },
    { id: "4065", process: "Plating", client: "SKBM", assignee: { name: "Mike Johnson", image: "/placeholder.svg" }, hasProblem: true },
    { id: "12679", process: "Heat Treat", client: "SKOM", pair: "12680", assignee: { name: "Sarah Wilson", image: "/placeholder.svg" } },
    { id: "3340", process: "Assembly", client: "Samsung", pair: "3341", assignee: { name: "Tom Brown", image: "/placeholder.svg" } },
  ] as ProcessItem[],
  waiting: [
    { id: "87603", process: "Disassembly", client: "LG", assignee: { name: "Alex Lee", image: "/placeholder.svg" } },
    { id: "75038", process: "Grinding", client: "SKBM", pair: "75039", assignee: { name: "Emma Davis", image: "/placeholder.svg" } },
    { id: "4066", process: "Plating", client: "Samsung", assignee: { name: "Chris Park", image: "/placeholder.svg" } },
    { id: "12681", process: "Heat Treat", client: "LG", pair: "12682", assignee: { name: "Lisa Chen", image: "/placeholder.svg" } },
    { id: "3342", process: "Assembly", client: "SKOM", pair: "3343", assignee: { name: "David Kim", image: "/placeholder.svg" } },
  ] as ProcessItem[],
};

type ProcessType = ProcessItem["process"];
type GroupedData = Record<ProcessType, ProcessItem[]>;

const ProcessGrid = () => {
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
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="grid grid-cols-5 gap-4">
          {(Object.keys(groupedData) as ProcessType[]).map(
            (process) => (
              <div key={process} className="space-y-3">
                {showProcessLabels && (
                  <h3 className="text-lg font-semibold text-gray-700">{process}</h3>
                )}
                <div className="space-y-3">
                  {groupedData[process].map((item) => (
                    <ProcessCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      {renderSection("In Progress", mockData.inProgress, true)}
      <Separator className="my-4" />
      {renderSection("Waiting", mockData.waiting, false)}
    </div>
  );
};

export default ProcessGrid;