interface ProcessCardProps {
  id: string;
  process: "Disassembly" | "Grinding" | "Plating" | "Heat Treat" | "Assembly";
  client: string;
  pair?: string;
}

const processColors = {
  Disassembly: "bg-neo-process-disassembly",
  Grinding: "bg-neo-process-grinding",
  Plating: "bg-neo-process-plating",
  "Heat Treat": "bg-neo-process-heattreat",
  Assembly: "bg-neo-process-assembly",
};

const ProcessCard = ({ id, process, client, pair }: ProcessCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[140px]">
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl font-bold text-gray-800">{id}</span>
          <span className={`${processColors[process]} px-3 py-1 rounded-full text-sm font-medium`}>
            {process}
          </span>
        </div>
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
      </div>
    </div>
  );
};

export default ProcessCard;