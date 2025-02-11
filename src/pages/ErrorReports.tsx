
import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ErrorReport {
  id: string;
  type: "open" | "resolved";
  date: string;
  reason: string;
  isInventoryItem?: boolean;
}

const errorReports: ErrorReport[] = [
  { id: "6545", type: "open", date: "2025.01.08. 13:34", reason: "operator_error" },
  { id: "3588", type: "open", date: "2025.01.08. 13:34", reason: "item_quality" },
  { id: "538339", type: "resolved", date: "2025.01.08. 13:34", reason: "other", isInventoryItem: true },
  { id: "6786", type: "resolved", date: "2025.01.08. 13:34", reason: "operator_error" },
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-red-100 text-red-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getReasonDisplay = (reason: string) => {
  switch (reason) {
    case "operator_error":
      return "Operator Error";
    case "item_quality":
      return "Item Quality";
    case "other":
      return "Other";
    default:
      return reason;
  }
};

const ErrorReportCard = ({ report }: { report: ErrorReport }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/error-reports/${report.id}`}>
        <div className="flex items-center p-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">
                {report.isInventoryItem ? "Inventory Item" : "Roll"} #{report.id}
              </span>
              <Badge className={getStatusBadgeColor(report.type)}>
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
              </Badge>
              <Badge variant="outline">
                {getReasonDisplay(report.reason)}
              </Badge>
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
  const filters = ["All", "Open", "Resolved"];

  const filteredReports = errorReports.filter((report) => {
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Open" && report.type === "open") ||
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
          <Link to="/error-reports/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </Link>
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
