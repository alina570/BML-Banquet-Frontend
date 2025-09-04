import React, { useEffect, useState } from "react";
import "./Navbar.css";
import menu_icon from "../assets/menu-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(`${API_URL}/authstatus`, { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.isAuthenticated);
        // Check user role from localStorage or API response
        const role = localStorage.getItem("userRole") || "";
        setUserRole(role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const [mobileMenu, setmobileMenu] = useState(false);

  const toggleMenu = () => {
    setmobileMenu(!mobileMenu);
  };

  // To protect create event page
  const protectPath = (url) => {
    if (!isAuthenticated) {
      toast.error("Please login first", {
        position: "top-right",
        onClose: () => {
          navigate("/login");
        },
        autoClose: 2000,
      });
    } else {
      navigate(url);
    }
  };

  // Logout Handle
  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userRole");
      toast.success("Logged out successfully!", {
        position: "top-right",
        onClose: () => {
          navigate("/login");
        },
        autoClose: 2000,
      });
      setIsAuthenticated(false);
      setUserRole("");
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <nav className={`container`}>
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          className="h-[60px] w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
        />{" "}
      </Link>
      <ul className={mobileMenu ? "open-menu" : ""}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Our Services</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/branch">Our Branches</Link>
        </li>
        <li onClick={() => protectPath("/my-bookings")}>My Bookings</li>


        {/* <li onClick={() => protectPath("/bookings")}>My Bookings</li> */}
        {userRole === "admin" && (
          <li onClick={() => protectPath("/admin")}>Admin Panel</li>
        )}
      </ul>
      {isAuthenticated ? (
        <button
          onClick={() => handleLogout()}
          className="px-4 py-[10px] rounded-3xl font-medium border border-[#800020] bg-[#800020] text-[#FFF8E7] hover:bg-[#600018] transition-colors duration-200"
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <Link to="/signup">
            <button className="px-4 py-[10px] rounded-3xl font-medium bg-[#800020] text-[#FFF8E7] hover:bg-[#600018] transition-colors duration-200">
              Sign Up
            </button>{" "}
          </Link>
          <Link to="/login">
            <button className="px-4 py-[10px] rounded-3xl font-medium bg-[#FFF8E7] text-[#800020] border border-[#800020] hover:bg-[#FFEBC1] transition-colors duration-200">
              Login
            </button>{" "}
          </Link>
        </div>
      )}
      
<button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`bg-[#800020] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              mobileMenu ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-[#800020] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
              mobileMenu ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-[#800020] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              mobileMenu ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>
       </nav>
  );
};

export default Navbar;
