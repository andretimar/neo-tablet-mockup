import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clipboard, AlertTriangle, Package2 } from "lucide-react";

interface MenuItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  description: string;
}

const MenuItem = ({ title, to, icon, description }: MenuItemProps) => (
  <Link to={to}>
    <Card className="h-full p-6 hover:bg-gray-50 transition-all duration-200 border-2 hover:border-blue-200">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-blue-900">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Card>
  </Link>
);

const MainMenu = () => {
  const menuItems = [
    {
      title: "Delivery Notes",
      to: "/delivery-notes",
      icon: <Clipboard className="w-8 h-8 text-blue-600" />,
      description: "Manage and track delivery notes"
    },
    {
      title: "Inventory",
      to: "/inventory",
      icon: <Package2 className="w-8 h-8 text-blue-600" />,
      description: "View and manage inventory items"
    },
    {
      title: "Error Reports",
      to: "/error-reports",
      icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
      description: "Track and resolve error reports"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Main Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <MenuItem key={item.to} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainMenu;