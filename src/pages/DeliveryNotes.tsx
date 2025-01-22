import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";

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
  const getStatusColor = () => {
    switch (note.status) {
      case "today":
        return "bg-green-100 text-green-800";
      case "tomorrow":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/delivery-notes/${note.id}/edit`}>
        <div className="flex items-center p-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">#{note.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {note.status || "Scheduled"}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {note.status === "closed" ? `Closed at ${note.closedDate}` : note.date}
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
  const filters = ["All", "Today", "Tomorrow", "Scheduled", "Closed"];

  const filteredNotes = deliveryNotes.filter((note) => {
    const matchesSearch = note.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Today" && note.status === "today") ||
      (activeFilter === "Tomorrow" && note.status === "tomorrow") ||
      (activeFilter === "Closed" && note.status === "closed") ||
      (activeFilter === "Scheduled" && !note.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Notes</h1>
          <p className="text-gray-600">Manage and track your delivery notes</p>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <DeliveryNoteCard key={`${note.id}-${note.date}`} note={note} />
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