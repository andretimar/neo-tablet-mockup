import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import DeliveryNotes from "./pages/DeliveryNotes";
import EditDeliveryNote from "./pages/EditDeliveryNote";
import EditItem from "./pages/EditItem";
import ErrorReports from "./pages/ErrorReports";
import CreateErrorReport from "./pages/CreateErrorReport";
import Index from "./pages/Index";
import HomeListView from "./pages/HomeListView";
import Inventory from "./pages/Inventory";
import InventoryDetails from "./pages/InventoryDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/delivery-notes" element={<DeliveryNotes />} />
          <Route path="/delivery-notes/:id/edit" element={<EditDeliveryNote />} />
          <Route path="/error-reports" element={<ErrorReports />} />
          <Route path="/error-reports/create" element={<CreateErrorReport />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<InventoryDetails />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/home-list" element={<HomeListView />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;