
import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";
import CreateDeliveryNoteDialog from "@/components/CreateDeliveryNoteDialog";

interface DeliveryNote {
  id: string;
  expectedDeliveryDate: string;
  status: "open" | "closed" | "cancelled";
}

const deliveryNotes: DeliveryNote[] = [
  { id: "6547", expectedDeliveryDate: "2024.03.15 - 09:00", status: "open" },
  { id: "6545", expectedDeliveryDate: "2024.03.16 - 13:00", status: "open" },
  { id: "6544", expectedDeliveryDate: "2024.03.17 - 08:00", status: "open" },
  { id: "6546", expectedDeliveryDate: "2024.03.10 - 14:00", status: "closed" },
  { id: "6543", expectedDeliveryDate: "2024.03.08 - 15:00", status: "cancelled" },
];

const DeliveryNoteCard = ({ note }: { note: DeliveryNote }) => {
  const getStatusColor = () => {
    switch (note.status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/delivery-notes/${note.id}/edit`}>
        <div className="flex items-center p-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">#{note.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusLabel(note.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Expected Delivery: {note.expectedDeliveryDate}
            </p>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </Link>
    </Card>
  );
};

const DeliveryNotes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Open", "Closed", "Cancelled"];

  const filteredNotes = deliveryNotes.filter((note) => {
    const matchesSearch = note.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      note.status === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Notes</h1>
            <p className="text-gray-600">Manage and track your delivery notes</p>
          </div>
          <CreateDeliveryNoteDialog />
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <DeliveryNoteCard key={note.id} note={note} />
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No delivery notes found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DeliveryNotes;
