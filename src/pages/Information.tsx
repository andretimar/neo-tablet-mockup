import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchAndFilter from "@/components/SearchAndFilter";

interface Document {
  id: string;
  title: string;
  category: string;
  date: string;
}

const documents: Document[] = [
  { id: "1", title: "Company Policy", category: "Policies", date: "2024.03.01" },
  { id: "2", title: "Employee Handbook", category: "HR", date: "2024.02.15" },
  { id: "3", title: "Safety Guidelines", category: "Safety", date: "2024.02.01" },
  { id: "4", title: "Quality Standards", category: "Quality", date: "2024.01.20" },
  { id: "5", title: "Environmental Policy", category: "Policies", date: "2024.01.10" },
];

const DocumentCard = ({ document }: { document: Document }) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <Link to={`/information/${document.id}`}>
        <div className="flex items-center p-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{document.title}</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {document.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">Last updated: {document.date}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </Link>
    </Card>
  );
};

const Information = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Policies", "HR", "Safety", "Quality"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === "All" || doc.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Information</h1>
          <p className="text-gray-600">Access and manage company documents</p>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No documents found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Information;