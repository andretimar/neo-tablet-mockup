import ProcessCard from "./ProcessCard";
import { Separator } from "./ui/separator";

const mockData = {
  inProgress: [
    { id: "87602", process: "Disassembly", client: "Samsung" },
    { id: "75036", process: "Grinding", client: "Samsung", pair: "75037" },
    { id: "4065", process: "Plating", client: "SKBM" },
    { id: "12679", process: "Heat Treat", client: "SKOM", pair: "12680" },
    { id: "3340", process: "Assembly", client: "Samsung", pair: "3341" },
  ],
  waiting: [
    { id: "87603", process: "Disassembly", client: "LG" },
    { id: "75038", process: "Grinding", client: "SKBM", pair: "75039" },
    { id: "4066", process: "Plating", client: "Samsung" },
    { id: "12681", process: "Heat Treat", client: "LG", pair: "12682" },
    { id: "3342", process: "Assembly", client: "SKOM", pair: "3343" },
  ],
} as const;

const ProcessGrid = () => {
  const groupData = (items: typeof mockData.inProgress | typeof mockData.waiting) => {
    return items.reduce((acc, item) => {
      const process = item.process;
      if (!acc[process]) {
        acc[process] = [];
      }
      acc[process].push(item);
      return acc;
    }, {} as Record<typeof mockData.inProgress[number]["process"], typeof mockData.inProgress>);
  };

  const renderSection = (
    title: string,
    items: typeof mockData.inProgress | typeof mockData.waiting
  ) => {
    const groupedData = groupData(items);
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {(Object.keys(groupedData) as Array<typeof mockData.inProgress[number]["process"]>).map(
            (process) => (
              <div key={process} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">{process}</h3>
                <div className="space-y-4">
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
    <div className="p-6 space-y-8">
      {renderSection("In Progress", mockData.inProgress)}
      <Separator className="my-8" />
      {renderSection("Waiting", mockData.waiting)}
    </div>
  );
};

export default ProcessGrid;