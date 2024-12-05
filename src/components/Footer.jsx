import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">About ChillGamers</h3>
            <p>
              ChillGamers is your trusted platform for honest and insightful
              reviews of the latest and greatest games. Join our community of
              gamers and share your experiences!
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 flex flex-col ">
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link to="/reviews" className="hover:text-blue-400 transition">
                Reviews
              </Link>
              <Link to="/" className="hover:text-blue-400 transition">
                About Us
              </Link>
              <Link to="/" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>
              <strong>Email:</strong> sabbir@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> 01791111482
            </p>
            <p>
              <strong>Address:</strong> 123 Gaming Street, Playtown, GameWorld
            </p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Copyright Section */}
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} ChillGamers. All rights reserved.</p>
          <p>Designed with ❤️ by passionate gamers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
