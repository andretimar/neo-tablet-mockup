import Header from "@/components/Header";
import WarningBanner from "@/components/WarningBanner";
import ProcessGrid from "@/components/ProcessGrid";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WarningBanner />
      <Header />
      <div className="container max-w-7xl py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">In Progress</h2>
          <Link to="/home-list-view">
            <Button variant="outline" className="gap-2">
              <List className="h-4 w-4" />
              List View
            </Button>
          </Link>
        </div>
        <ProcessGrid />
      </div>
    </div>
  );
};

export default Index;