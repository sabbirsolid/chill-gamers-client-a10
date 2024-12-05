import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUserWithEmail, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photoURL.value;

    // Combined validation for uppercase and lowercase
    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      setError("Password must contain at least one uppercase and one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <span className="loading loading-spinner text-info text-5xl"></span>
        </div>
      );
    }

    setError(""); // Clear error if the password is valid

    // Create user and update profile info
    createUserWithEmail(email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "You have successfully created an account",
              showConfirmButton: true,
            });
            form.reset();
          })
          .catch((error) => {
            setError(`Failed to update profile: ${error.message}`);
          });
      })
      .catch((error) => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You have successfully created an account",
          showConfirmButton: true,
        });
        navigate("/");
      })
      .catch(() => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">PhotoURL</label>
            <input
              type="photoURL"
              name="photoURL"
              id="photoURL"
              placeholder="Enter your photoURL"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6 text-right">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

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
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
