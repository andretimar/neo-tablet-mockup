interface ProcessCardProps {
  id: string;
  process: "Disassembly" | "Grinding" | "Plating" | "Heat Treat" | "Assembly";
  client: string;
  pair?: string;
  assignee?: {
    name: string;
    image: string;
  };
  isPriority?: boolean;
  hasProblem?: boolean;
}

const processColors = {
  Disassembly: "bg-neo-process-disassembly",
  Grinding: "bg-neo-process-grinding",
  Plating: "bg-neo-process-plating",
  "Heat Treat": "bg-neo-process-heattreat",
  Assembly: "bg-neo-process-assembly",
};

const ProcessCard = ({ id, process, client, pair, assignee, isPriority, hasProblem }: ProcessCardProps) => {
  const getBackgroundColor = () => {
    if (isPriority) return "bg-amber-50";
    if (hasProblem) return "bg-red-50";
    return "bg-white";
  };

  return (
    <div className={`${getBackgroundColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[140px]`}>
      <div className="p-3 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-800">{id}</span>
          <span className={`${processColors[process]} px-3 py-1 rounded-full text-sm font-medium`}>
            {process}
          </span>
        </div>
        <div className="flex flex-col h-full">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">
              Client: <span className="font-medium text-gray-800">{client}</span>
            </div>
            {pair && (
              <div className="text-sm text-gray-600">
                Pair: <span className="font-medium text-gray-800">{pair}</span>
              </div>
            )}
          </div>
          <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
            <img
              src={assignee?.image || "/placeholder.svg"}
              alt={assignee?.name || "Unassigned"}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{assignee?.name || "Unassigned"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;