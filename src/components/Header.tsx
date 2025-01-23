import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue text-white p-4 flex justify-between items-center">
      <img 
        src="/lovable-uploads/27cfb7e4-f2d9-49bc-916e-c23fab664e1e.png" 
        alt="Neo Industries" 
        className="h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <button className="p-2" onClick={() => navigate("/menu")}>
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;