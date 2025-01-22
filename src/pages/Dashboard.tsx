import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, to }: { title: string; to: string }) => (
  <Link to={to}>
    <Card className="h-48 flex items-center justify-center hover:bg-gray-50 transition-colors">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </Card>
  </Link>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Dashboard" to="/dashboard" />
        <DashboardCard title="Delivery Notes" to="/delivery-notes" />
        <DashboardCard title="Inventory" to="/inventory" />
        <DashboardCard title="Search" to="/search" />
        <DashboardCard title="Error Reports" to="/error-reports" />
        <DashboardCard title="Sign out" to="/signout" />
      </main>
    </div>
  );
};

export default Dashboard;