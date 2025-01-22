import ProcessCard from "./ProcessCard";

const mockData = [
  { id: "87602", process: "Disassembly", client: "Samsung" },
  { id: "75036", process: "Grinding", client: "Samsung", pair: "75037" },
  { id: "4065", process: "Plating", client: "SKBM" },
  { id: "12679", process: "Heat Treat", client: "SKOM", pair: "12680" },
  { id: "3340", process: "Assembly", client: "Samsung", pair: "3341" },
] as const;

const ProcessGrid = () => {
  const groupedData = mockData.reduce((acc, item) => {
    if (!acc[item.process]) {
      acc[item.process] = [];
    }
    acc[item.process].push(item);
    return acc;
  }, {} as Record<typeof mockData[number]["process"], typeof mockData>);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">In Progress</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {(Object.keys(groupedData) as Array<typeof mockData[number]["process"]>).map((process) => (
          <div key={process} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{process}</h3>
            <div className="space-y-4">
              {groupedData[process].map((item) => (
                <ProcessCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessGrid;