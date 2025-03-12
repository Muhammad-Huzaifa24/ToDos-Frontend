import { useState } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaReact } from "react-icons/fa"; // Replace with your preferred icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left: Logout Button */}
      <button className="flex items-center gap-2 text-white hover:text-red-400 transition">
        <FiLogOut size={20} />
        Logout
      </button>

      {/* Center: Icon */}
      <div className="flex items-center">
        <FaReact size={32} className="text-blue-400" />
      </div>

      {/* Right: Brand Name (Hidden on Mobile) */}
      <div className="hidden md:block text-lg font-semibold">BrandName</div>

      {/* Mobile Menu Toggle Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg md:hidden">
          <div className="text-lg font-semibold">BrandName</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
