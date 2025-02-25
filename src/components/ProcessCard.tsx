import { useNavigate } from "react-router-dom";
import { Star, AlertOctagon } from "lucide-react";

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
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[160px] cursor-pointer relative"
      onClick={() => navigate(`/edit/${id}`)}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-800">{id}</span>
          <span className={`${processColors[process]} px-3 py-1 rounded-full text-sm font-medium ml-2`}>
            {process}
          </span>
        </div>
        <div className="space-y-2 flex-grow">
          <div className="text-sm text-gray-600">
            Client: <span className="font-medium text-gray-800">{client}</span>
          </div>
          {pair && (
            <div className="text-sm text-gray-600">
              Pair: <span className="font-medium text-gray-800">{pair}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={assignee?.image || "/placeholder.svg"}
                alt={assignee?.name || "Unassigned"}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-600">{assignee?.name || "Unassigned"}</span>
            </div>
            <div className="flex items-center gap-2">
              {isPriority && <Star className="w-5 h-5 text-amber-500" />}
              {hasProblem && <AlertOctagon className="w-5 h-5 text-red-500" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;