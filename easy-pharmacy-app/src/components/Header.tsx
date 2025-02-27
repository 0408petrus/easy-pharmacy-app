import { Link, useNavigate } from "react-router";
import Input from "./UI/Input";
import { FaCartPlus, FaDoorClosed, FaDoorOpen, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from "react";

interface HeaderProps {
  onSearch?: (value: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");

  function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center relative z-50">
      <div className="text-2xl">
        <Link to="/" className="hover:text-blue-300 transition-colors duration-300">EassyPharmacy</Link>
      </div>

      <div className="flex gap-4 justify-center items-center">
        {onSearch && (
          <Input
            placeholder="Search"
            onChange={(value: string) => onSearch(value)}
            className="hidden md:block w-[200px]"
          />
        )}
        <div className="hidden md:block">Welcome, {user.name}!</div>
        <button 
          onClick={() => navigate("/chart")} 
          className="hidden md:flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
        >
          <FaCartPlus className="h-7 w-7"/>
        </button>
        <button 
          onClick={logout} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hidden md:flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
        >
          {isHovered ? <FaDoorOpen className="h-7 w-7"/> : <FaDoorClosed className="h-7 w-7"/>}
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
        >
          {isMenuOpen ? <FaTimes className="h-7 w-7"/> : <FaBars className="h-7 w-7"/>}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-500 text-white flex flex-col items-center gap-4 p-4 md:hidden z-50">
          {onSearch && (
            <Input
              placeholder="Search"
              onChange={(value: string) => onSearch(value)}
              className="w-[200px]"
            />
          )}
          <div>Welcome, {user.name}!</div>
          <button 
            onClick={() => navigate("/chart")} 
            className="flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
          >
            <FaCartPlus className="h-7 w-7"/>
          </button>
          <button 
            onClick={logout} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-2 hover:bg-blue-400 p-2 rounded transition-all duration-300"
          >
            {isHovered ? <FaDoorOpen className="h-7 w-7"/> : <FaDoorClosed className="h-7 w-7"/>}
          </button>
        </div>
      )}
    </header>
  );
}