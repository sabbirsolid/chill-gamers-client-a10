import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Navbar from "../components/Navbar";
import { Navigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  if (user?.email) {
    return (
      <div>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    );
  }
  return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;