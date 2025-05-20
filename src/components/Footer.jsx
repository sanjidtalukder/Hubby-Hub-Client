import { FaFacebookF, FaGithub, FaLinkedinIn, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">HobbyHub</h2>
          <p className="text-sm text-gray-300">
            Connecting hobbyists together. Find, join, or organize local events based on your passions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><FaLocationArrow /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> +880-123-456-789</li>
            <li className="flex items-center gap-2"><MdEmail /> support@hobbyhub.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedinIn /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FaGithub /></a>
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
