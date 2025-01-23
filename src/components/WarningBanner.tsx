import { useState } from "react";
import { XOctagon } from "lucide-react";

const WarningBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-600 text-white p-2 text-center font-medium relative">
      <div className="max-w-7xl mx-auto pr-8">
        Please make sure to be careful during X process due to Y reason. Thank you!
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:opacity-80"
      >
        <XOctagon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WarningBanner;