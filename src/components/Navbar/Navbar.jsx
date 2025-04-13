import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa"; 
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">
      <h1 onClick={()=> navigate("/")}>
        <BsCart4 />
        Fastcart
      </h1>

      {/* Conditional rendering for input */}
      {showSearch && (
        <div>
          <input type="text" placeholder="Search..." />
        </div>
      )}

      {/* Search Icon */}
      <FaSearch
        style={{ cursor: "pointer", fontSize: "1.2rem" }}
        onClick={() => setShowSearch(!showSearch)} // Toggle search visibility
      />

      <h2>L</h2>

      {isLogin ? (
        <h3 onClick={handleLogout}>Logout</h3>
      ) : (
        <h3 onClick={() => navigate("/login")}>Login</h3>
      )}
    </div>
  );
};

export default Navbar;
