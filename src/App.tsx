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
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";

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
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;