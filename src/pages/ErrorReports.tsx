import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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

const getStatusColor = (type: ErrorReport["type"]) => {
  switch (type) {
    case "major":
      return "bg-red-500";
    case "error":
      return "bg-yellow-500";
    case "resolved":
      return "bg-green-500";
  }
};

const getStatusText = (type: ErrorReport["type"]) => {
  switch (type) {
    case "major":
      return "Major Error";
    case "error":
      return "Error";
    case "resolved":
      return "Resolved";
  }
};

const ErrorReportCard = ({ report }: { report: ErrorReport }) => (
  <Card className="flex hover:bg-gray-50">
    <div className={`w-24 ${getStatusColor(report.type)} flex items-center justify-center text-white text-sm`}>
      {getStatusText(report.type)}
    </div>
    <div className="flex-1 p-4">
      <p className="text-sm text-gray-600">{report.isInventoryItem ? "Inventory Item ID:" : "Roll ID:"}</p>
      <p className="font-bold">{report.id}</p>
      <p className="text-sm text-gray-500 mt-1">{report.date}</p>
    </div>
    <div className="flex items-center pr-4">
      <ChevronRight className="text-gray-400" />
    </div>
  </Card>
);

const ErrorReports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Error Reports</h1>
          <Button variant="outline">Create New Report</Button>
        </div>
        <div className="space-y-4">
          {errorReports.map((report) => (
            <Link key={`${report.id}-${report.date}`} to={`/error-reports/${report.id}`}>
              <ErrorReportCard report={report} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ErrorReports;