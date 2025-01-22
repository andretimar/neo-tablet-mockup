import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-neo-header text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">NEO INDUSTRIES</div>
      <button className="p-2">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;