import { FaFacebook, FaInstagram, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
              <a href="https://www.facebook.com/" target="_blank" className="hover:text-blue-400 flex items-center gap-1 transition">
               <span><FaFacebook /></span> Facebook
              </a>
              <a href="https://www.instagram.com/" target="_blank" className="hover:text-blue-400 flex items-center gap-1 transition">
              <FaInstagram />Instagram
              </a>
              <a href="https://x.com/?lang=en" target="_blank" className="hover:text-blue-400 flex items-center gap-1 transition">
              <FaXTwitter /> X
              </a>
              <a href="https://www.reddit.com/?rdt=46727" target="_blank" className="hover:text-blue-400 flex items-center gap-1 transition">
              <FaReddit /> Reddit
              </a>
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
          <p>© {new Date().getFullYear()} ChillGamers. All Rights Reserved.</p>
          <p>Designed with ❤️ by Passionate Gamers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
