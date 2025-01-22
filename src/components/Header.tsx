import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">NEO INDUSTRIES</div>
      <button className="p-2" onClick={() => navigate("/menu")}>
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;