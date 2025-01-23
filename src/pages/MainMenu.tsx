import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Database, AlertTriangle, Home, FileQuestion } from "lucide-react";

const MenuCard = ({ title, to, icon: Icon, description }: { 
  title: string; 
  to: string; 
  icon: React.ElementType;
  description: string;
}) => (
  <Link to={to}>
    <Card className="h-full p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors gap-4">
      <Icon className="w-12 h-12 text-blue" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </Card>
  </Link>
);

const MainMenu = () => {
  const menuItems = [
    {
      title: "Dashboard",
      to: "/",
      icon: Home,
      description: "Return to main dashboard"
    },
    {
      title: "Delivery Notes",
      to: "/delivery-notes",
      icon: FileText,
      description: "Manage and track delivery notes"
    },
    {
      title: "Inventory",
      to: "/inventory",
      icon: Database,
      description: "View and manage inventory items"
    },
    {
      title: "Error Reports",
      to: "/error-reports",
      icon: AlertTriangle,
      description: "Track and resolve reported errors"
    },
    {
      title: "Information",
      to: "/information",
      icon: FileQuestion,
      description: "Access company documents and information"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Main Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item.to} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainMenu;