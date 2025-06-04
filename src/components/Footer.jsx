import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5 px-4">
      {/* Top Section - Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/25c50e104102623.Y3JvcCwyOTUyLDIzMDksNTU1LDA.png"
              alt="HobbyHub Logo"
              className="w-12 h-12 object-cover rounded-full shadow-md"
            />
            <h2 className="text-2xl font-bold text-white">HobbyHub</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Connecting hobbyists together. Find, join, or organize local events
            based on your passions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/groups" className="hover:text-white">
                All Groups
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaLocationArrow /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +880-188-987-6289
            </li>
            <li className="flex items-center gap-2">
              <MdEmail /> support@hobbyhub.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} HobbyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
