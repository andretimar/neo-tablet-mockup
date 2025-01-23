import Header from "@/components/Header";
import WarningBanner from "@/components/WarningBanner";
import ProcessGrid from "@/components/ProcessGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { List } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WarningBanner />
      <Header />
      <div className="container py-4">
        <div className="flex justify-end mb-4">
          <Button asChild variant="outline">
            <Link to="/home-list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </Link>
          </Button>
        </div>
        <ProcessGrid />
      </div>
    </div>
  );
};

export default Index;