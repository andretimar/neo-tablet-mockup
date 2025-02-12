import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const mockErrorReport = {
  id: "87602",
  date: "2024-03-15",
  status: "open",
  reason: "operator_error",
  comments: "Machine malfunction during processing phase",
  replacementParts: [
    "Bearing Assembly",
    "End Cover",
    "Thrust Bearing"
  ],
  attachments: [
    "attachment1.jpg",
    "attachment2.jpg",
    "attachment3.jpg",
    "attachment4.jpg"
  ],
  reportedBy: "John Smith",
  jobId: "JB-1001",
  itemId: "IT-2001"
};

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

const ViewErrorReport = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-5xl py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Error Report #{id}</h1>
          <Button variant="outline">Edit Report</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Report ID:</span>
                  <span>{mockErrorReport.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{mockErrorReport.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <Badge className={getStatusBadgeColor(mockErrorReport.status)}>
                    {mockErrorReport.status.charAt(0).toUpperCase() + mockErrorReport.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Reason:</span>
                  <span>{getReasonDisplay(mockErrorReport.reason)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Reported by:</span>
                  <span>{mockErrorReport.reportedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Job ID:</span>
                  <Link 
                    to={`/edit/${mockErrorReport.jobId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {mockErrorReport.jobId}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Item ID:</span>
                  <Link 
                    to={`/edit/${mockErrorReport.itemId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {mockErrorReport.itemId}
                  </Link>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold">Comments:</span>
                  <p className="text-gray-600">{mockErrorReport.comments}</p>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold">Replacement Parts:</span>
                  <div className="flex flex-wrap gap-2">
                    {mockErrorReport.replacementParts.map((part, index) => (
                      <Badge key={index} variant="secondary" className="text-base">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {mockErrorReport.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded flex items-center justify-center"
                  >
                    <img
                      src="/placeholder.svg"
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ViewErrorReport;
