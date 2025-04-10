
import { Square, Plus } from "lucide-react";

interface PlaceholderCardProps {
  processType: string;
}

const PlaceholderCard = ({ processType }: PlaceholderCardProps) => {
  return (
    <div 
      className="bg-gray-50 border border-dashed border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 h-[120px] flex flex-col items-center justify-center cursor-default"
    >
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <Square className="w-6 h-6 stroke-[1.5]" />
        <span className="text-xs">No {processType} items</span>
      </div>
    </div>
  );
};

export default PlaceholderCard;
