
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
      className={`${getCardBackgroundColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[120px] cursor-pointer relative`}
      onClick={() => navigate(`/edit/${id}`)}
    >
      <div className="p-3 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">{id}</span>
            {isPriority && <Star className="w-4 h-4 text-amber-500" />}
            {hasProblem && <AlertOctagon className="w-4 h-4 text-red-500" />}
          </div>
        </div>
        <div className="space-y-1 flex-grow">
          {pair && (
            <div className="text-xs text-gray-600">
              Pair: <span className="font-medium text-gray-800">{pair}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs text-gray-600">{assignee?.name || "Unassigned"}</span>
            </div>
            <div className="flex items-center gap-2">
              {renderApprovalIcon()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
