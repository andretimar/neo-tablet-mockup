import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Button } from "@/components/ui/button";

interface ErrorReport {
  id: string;
  type: "major" | "error" | "resolved";
  date: string;
  isInventoryItem?: boolean;
}

const errorReports: ErrorReport[] = [
  { id: "6545", type: "major", date: "2025.01.08. 13:34" },
  { id: "3588", type: "error", date: "2025.01.08. 13:34" },
  { id: "538339", type: "resolved", date: "2025.01.08. 13:34", isInventoryItem: true },
  { id: "6786", type: "resolved", date: "2025.01.08. 13:34" },
];

const ErrorReportCard = ({ report }: { report: ErrorReport }) => {
  const getStatusColor = () => {
    switch (report.type) {
      case "major":
        return "bg-red-100 text-red-800";
      case "error":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusText = () => {
    switch (report.type) {
      case "major":
        return "Major Error";
      case "error":
        return "Error";
      case "resolved":
        return "Resolved";
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/error-reports/${report.id}`}>
        <div className="flex items-center p-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">
                {report.isInventoryItem ? "Inventory Item" : "Roll"} #{report.id}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{report.date}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </Link>
    </Card>
  );
};

const ErrorReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Major", "Error", "Resolved"];

  const filteredReports = errorReports.filter((report) => {
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Major" && report.type === "major") ||
      (activeFilter === "Error" && report.type === "error") ||
      (activeFilter === "Resolved" && report.type === "resolved");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Error Reports</h1>
            <p className="text-gray-600">Track and manage error reports</p>
          </div>
          <Button asChild>
            <Link to="/error-reports/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Link>
          </Button>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4">
          {filteredReports.map((report) => (
            <ErrorReportCard key={`${report.id}-${report.date}`} report={report} />
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No error reports found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ErrorReports;