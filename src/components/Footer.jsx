const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About GameLens</h3>
              <p>
                GameLens is your trusted platform for honest and insightful reviews of the latest and greatest games. 
                Join our community of gamers and share your experiences!
              </p>
            </div>
  
            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-blue-400 transition">Home</a>
                </li>
                <li>
                  <a href="/reviews" className="hover:text-blue-400 transition">Reviews</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-blue-400 transition">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <p>
                <strong>Email:</strong> support@gamelens.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Gaming Street, Playtown, GameWorld
              </p>
            </div>
          </div>
  
          <hr className="border-gray-700 my-8" />
  
          {/* Copyright Section */}
          <div className="text-center text-sm">
            <p>
              © {new Date().getFullYear()} GameLens. All rights reserved. 
            </p>
            <p>
              Designed with ❤️ by passionate gamers.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;  