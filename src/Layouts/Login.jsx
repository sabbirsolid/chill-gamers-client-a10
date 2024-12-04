
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { logIn, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then(() => {
        toast.success("Login Successful")
        navigate("/"); // Redirect to home or desired path
      })
      .catch(() => {
        toast.error("Login Failed")
      });
  };


  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Successfully Logged In");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Failed to Login: ${error.message}`);
      });
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
            disabled={loading}
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
            <path
              d="M23.58 12.18c0-.9-.08-1.57-.26-2.26H12v4.28h6.5c-.13 1.08-.84 2.72-2.4 3.8l-.02.15 3.47 2.69.24.02c2.2-2.03 3.39-5.01 3.39-8.68z"
              fill="#4285F4"
            />
            <path
              d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.78-2.93c-1.01.7-2.35 1.18-4.16 1.18-3.2 0-5.92-2.15-6.9-5.08l-.14.01L1.93 17.6l-.05.13C3.87 21.15 7.62 24 12 24z"
              fill="#34A853"
            />
            <path
              d="M5.1 14.26c-.23-.69-.36-1.43-.36-2.26 0-.78.13-1.53.34-2.22L1.9 7.45l-.1.05C.68 9.66 0 11.73 0 14.01c0 2.28.68 4.35 1.83 6.15l3.27-2.53z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.76c1.79 0 3.3.62 4.53 1.85l3.37-3.37C17.92 1.01 15.2 0 12 0 7.62 0 3.87 2.85 1.93 6.4l3.26 2.53c.97-2.93 3.69-5.08 6.9-5.08z"
              fill="#EA4335"
            />
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