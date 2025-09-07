import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/gtp logo 5.jpeg';

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "";

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className='h-14'/>
        <span className="text-xl font-bold text-[#C16B6B]">GOLD TOKENIZING PLATFORM</span>
      </div>
      <ul className="flex gap-6 text-[#A44F4F] font-medium items-center">
        <li>
          <button className="px-4 py-2 bg-[#A44F4F] text-white rounded-md" onClick={() => navigate("/vendor-marketplace")}> 
            Vendor MarketPlace
          </button>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button className="px-4 py-2 bg-[#A44F4F] text-white rounded-md" onClick={() => navigate("/p2p-marketplace")}> 
                P2P MarketPlace
              </button>
            </li>
            <li>
              <button
                className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-[#A44F4F] font-bold text-lg shadow"
                onClick={() => navigate("/dashboard")}
                title="Dashboard"
              >
                {username[0] || "U"}
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className="px-4 py-2 bg-[#FFD700] text-[#A44F4F] rounded-md font-bold"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 bg-[#FFD700] text-[#A44F4F] rounded-md font-bold"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};