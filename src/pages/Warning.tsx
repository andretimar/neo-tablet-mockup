import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Warning = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanProceed(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">WARNING</h1>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </p>
          
          <p className="text-gray-600">
            Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper.
          </p>
        </div>

        <Button
          onClick={handleProceed}
          disabled={!canProceed}
          className="w-full bg-blue"
        >
          Okay
        </Button>

        {!canProceed && (
          <p className="text-center text-sm text-gray-500">
            You can click on the button in {countdown} seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default Warning;