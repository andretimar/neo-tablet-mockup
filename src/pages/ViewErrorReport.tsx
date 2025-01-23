import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";

const mockErrorReport = {
  id: "87602",
  date: "2024-03-15",
  status: "major",
  cause: "Machine malfunction during processing phase",
  attachments: [
    "attachment1.jpg",
    "attachment2.jpg"
  ],
  relatedDeliveryNotes: [
    { id: "DN001", date: "2024-03-15", status: "Pending" },
    { id: "DN002", date: "2024-03-14", status: "Completed" },
  ]
};

const ViewErrorReport = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-5xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Error Report Details</CardTitle>
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
                  <span className="px-2 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {mockErrorReport.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold">Cause:</span>
                  <p className="text-gray-600">{mockErrorReport.cause}</p>
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

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Delivery Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delivery Note ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockErrorReport.relatedDeliveryNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>{note.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewErrorReport;