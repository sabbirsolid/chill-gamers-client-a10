import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a spinner while authentication state is being determined
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  if (user?.email) {
    // User is authenticated, render the protected content
    return (
      <div>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    );
  }

  // User is not authenticated, redirect to login page
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;