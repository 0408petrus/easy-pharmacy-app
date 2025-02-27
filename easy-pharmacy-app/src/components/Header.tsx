import { Link, useNavigate } from "react-router";
import Input from "./UI/Input";

interface HeaderProps {
  onSearch: (value: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");

  function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-2xl">
        <Link to="/" className="hover:text-blue-300 transition-colors duration-300">EassyPharmacy</Link>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Input
          placeholder="Search"
          onChange={(value: string) => onSearch(value)}
          className="w-[200px]"
        />
        <div>Welcome, {user.name}!</div>
        <button 
          onClick={() => navigate("/chart")} 
          className="flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
        >
          <img src="/chart.webp" alt="Chart" className="h-8 w-8" />
        </button>
        <button 
          onClick={logout} 
          className="flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
        >
          <img src="/logout.png" alt="Logout" className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
}