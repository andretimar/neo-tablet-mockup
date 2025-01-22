import ProcessCard from "./ProcessCard";

const mockData = [
  { id: "87602", process: "Disassembly", client: "Samsung" },
  { id: "75036", process: "Grinding", client: "Samsung", pair: "75037" },
  { id: "4065", process: "Plating", client: "SKBM" },
  { id: "12679", process: "Heat Treat", client: "SKOM", pair: "12680" },
  { id: "3340", process: "Assembly", client: "Samsung", pair: "3341" },
] as const;

const ProcessGrid = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">In Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockData.map((item) => (
          <ProcessCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProcessGrid;