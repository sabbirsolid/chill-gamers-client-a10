import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { logIn, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Capture the intended route or default to "/"
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await logIn(email, password);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You Logged in successfully!",
        showConfirmButton: true,
      });
      navigate(from, { replace: true });
      // location?.state? location.state : "/"; // Redirect to the intended route;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You Logged in successfully!",
        showConfirmButton: true,
      });
      navigate(from, { replace: true });
      // location?.state? location.state : navigate('/');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
        showConfirmButton: true,
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleSignInWithGoogle}
            className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition mt-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Google Icon Paths */}
              <path d="..." fill="#4285F4" />
              <path d="..." fill="#34A853" />
              <path d="..." fill="#FBBC05" />
              <path d="..." fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
    </div>
  );
};

export default Login;