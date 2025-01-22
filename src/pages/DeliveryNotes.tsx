import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DeliveryNote {
  id: string;
  date: string;
  status?: "today" | "tomorrow" | "closed";
  closedDate?: string;
}

const deliveryNotes: DeliveryNote[] = [
  { id: "6547", date: "Today 9:00", status: "today" },
  { id: "6545", date: "Tomorrow 13:00", status: "tomorrow" },
  { id: "6545", date: "2025.01.15 - 14:00" },
  { id: "6544", date: "2025.01.16. - 8:00" },
  { id: "6546", date: "2025.01.06", status: "closed", closedDate: "2025.01.06" },
  { id: "6543", date: "2025.01.03", status: "closed", closedDate: "2025.01.03" },
];

const DeliveryNoteCard = ({ note }: { note: DeliveryNote }) => {
  const getDateColor = () => {
    switch (note.status) {
      case "today":
        return "text-green-500";
      case "tomorrow":
        return "text-blue-500";
      case "closed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="flex items-center p-4 hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <img src="/placeholder.svg" alt="Samsung" className="w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600">Reference Number:</p>
            <p className="font-bold">#{note.id}</p>
          </div>
        </div>
        <p className={`text-sm mt-1 ${getDateColor()}`}>
          {note.status === "closed" ? `Closed at ${note.closedDate}` : note.date}
        </p>
      </div>
      <ChevronRight className="text-gray-400" />
    </Card>
  );
};

const DeliveryNotes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="space-y-4">
          <div className="space-y-4">
            {deliveryNotes
              .filter((note) => note.status !== "closed")
              .map((note) => (
                <Link key={`${note.id}-${note.date}`} to={`/delivery-notes/${note.id}`}>
                  <DeliveryNoteCard note={note} />
                </Link>
              ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Closed Delivery Notes</h2>
          <div className="space-y-4">
            {deliveryNotes
              .filter((note) => note.status === "closed")
              .map((note) => (
                <Link key={`${note.id}-${note.date}`} to={`/delivery-notes/${note.id}`}>
                  <DeliveryNoteCard note={note} />
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryNotes;