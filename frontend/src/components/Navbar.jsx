import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold tracking-wide">
          CRM App
        </Link>
        <Link to="/" className="text-sm hover:text-indigo-200 transition">
          Dashboard
        </Link>
        <Link to="/leads" className="text-sm hover:text-indigo-200 transition">
          Leads
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-indigo-200">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded hover:bg-indigo-50 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
