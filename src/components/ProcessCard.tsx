
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
  approvalStatus?: "none" | "partial" | "full";
}

const processColors = {
  Disassembly: "bg-neo-process-disassembly",
  Grinding: "bg-neo-process-grinding",
  Plating: "bg-neo-process-plating",
  "Heat Treat": "bg-neo-process-heattreat",
  Assembly: "bg-neo-process-assembly",
};

const ProcessCard = ({ 
  id, 
  process, 
  client, 
  pair, 
  assignee, 
  isPriority, 
  hasProblem, 
  approvalStatus = "none" 
}: ProcessCardProps) => {
  const navigate = useNavigate();

  const renderApprovalIcon = () => {
    switch (approvalStatus) {
      case "full":
        return (
          <div className="w-5 h-5 rounded-full bg-green-500" />
        );
      case "partial":
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 from-50% to-gray-200 to-50%" />
        );
      case "none":
      default:
        return null;
    }
  };

  // Determine background color based on priority and problem status
  const getCardBackgroundColor = () => {
    if (isPriority) return "bg-[#FEF7CD]"; // Soft yellow for priority items
    if (hasProblem) return "bg-[#FFDEE2]"; // Soft red for items with problems
    return "bg-white"; // Default background
  };

  return (
    <div 
      className={`${getCardBackgroundColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[160px] cursor-pointer relative`}
      onClick={() => navigate(`/edit/${id}`)}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-800">{id}</span>
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
              <span className="text-sm text-gray-600">{assignee?.name || "Unassigned"}</span>
            </div>
            <div className="flex items-center gap-2">
              {isPriority && <Star className="w-5 h-5 text-amber-500" />}
              {hasProblem && <AlertOctagon className="w-5 h-5 text-red-500" />}
              {renderApprovalIcon()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
