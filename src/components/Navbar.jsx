import  { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user,logOut} = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
    .then(( ) => {
      console.log("sign out successful");
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const links = <>
  <NavLink to='/'>Home</NavLink>
  <NavLink to="/reviews">All Reviews</NavLink>
  <NavLink to="/private/addReviews">Add Reviews</NavLink>
  <NavLink to="/private/myReview">My Reviews</NavLink>
  <NavLink to="/private/gameWatchList">Game WatchList</NavLink>
  </>

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-lg font-bold">GameLens</div>

        {/* Right side for small screens: Hamburger + Login */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Login/Register Button */}
          {user?.email ? <div>
            <h1>{user.displayName}</h1>
            <button onClick={handleLogOut}>Sign Out</button>
          </div>:
          <Link
              to="/login"
              className="hover:text-gray-300 border border-gray-300 px-3 py-1 rounded-md"
            >
              Login
            </Link>}

          {/* Hamburger Icon */}
          <button
            className="focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-white"
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
        <ul className="hidden md:flex md:space-x-6">
          {links}
        </ul>

        {/* Login/Register for Desktop */}
        <div className="hidden md:block">
        {user?.email ? <div>
            <h1>{user.displayName}</h1>
            <button onClick={handleLogOut}>Sign Out</button>
          </div>:<Link
              to="/login"
              className="hover:text-gray-300 border border-gray-300 px-3 py-1 rounded-md"
            >
              Login
            </Link>}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="space-y-4 flex flex-col text-center py-4">
            {links}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;