import Header from "@/components/Header";
import WarningBanner from "@/components/WarningBanner";
import ProcessGrid from "@/components/ProcessGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WarningBanner />
      <Header />
      <ProcessGrid />
    </div>
  );
};

export default Index;