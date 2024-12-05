import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";
import DarkMode from "./DarkMode/DarkMode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sign Out successful",
          showConfirmButton: true,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || "Something went wrong! Please try again.",
          showConfirmButton: true,
        });
      });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/reviews"
        className={({ isActive }) =>
          `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
        }
      >
        All Reviews
      </NavLink>
      <NavLink
        to="/private/addReviews"
        className={({ isActive }) =>
          `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
        }
      >
        Add Reviews
      </NavLink>
      <NavLink
        to="/private/myReview"
        className={({ isActive }) =>
          `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
        }
      >
        My Reviews
      </NavLink>
      <NavLink
        to="/private/gameWatchList"
        className={({ isActive }) =>
          `hover:text-blue-500 ${isActive ? "text-blue-600 font-semibold" : ""}`
        }
      >
        Game WatchList
      </NavLink>
    </>
  );

  return (
    <nav className=" text-gray-800text-gray-200 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-500">
          Chill Gamer
        </div>
        <DarkMode></DarkMode>

        {/* Right side for small screens: Hamburger + Login */}
        <div className="flex items-center space-x-4 md:hidden">
         

          {/* User Info */}
          {user?.email ? (
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <div className="relative group">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-gray-300"
                    data-tooltip-id="user-tooltip"
                  />
                  <Tooltip id="user-tooltip" place="top" effect="solid">
                    {user.displayName || "User"}
                  </Tooltip>
                </div>
              ) : (
                <span className="text-sm">{user.displayName || "User"}</span>
              )}
              <button
                onClick={handleLogOut}
                className="hover:text-blue-500 px-3 py-1 rounded-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-800 border border-gray-300 px-3 py-1 rounded-md"
            >
              Login
            </Link>
          )}

          {/* Hamburger Icon */}
          <button
            className="focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <ul className="hidden md:flex md:space-x-6">{links}</ul>

        {/* User Info for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
         

          {user?.email ? (
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <div className="relative group">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300"
                    data-tooltip-id="user-tooltip"
                  />
                  <Tooltip id="user-tooltip" place="top" effect="solid">
                    {user.displayName || "User"}
                  </Tooltip>
                </div>
              ) : (
                <span className="text-sm">{user.displayName || "User"}</span>
              )}
              <button
                onClick={handleLogOut}
                className="hover:text-blue-500 px-3 py-1 rounded-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-800 border border-gray-300 px-3 py-1 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <ul className="space-y-4 flex flex-col text-center py-4">{links}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;