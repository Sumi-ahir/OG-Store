import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#2a2133da] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              OG Store
            </h2>

            <p className="text-gray-300 text-sm leading-6">
              Discover premium fashion, trendy outfits,
              and timeless collections crafted for every style.
            </p>
          </div>


          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">
                <Link to='/'> Home</Link>
              </li>

              <li className="hover:text-white cursor-pointer">
                <Link to='/products'> Products</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Categories
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to='/category/men'>Men </Link>
              </li>
              <li>
                <Link to='/category/women'>Women </Link>
              </li>
              <li>Accessories</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>📧 support@ogstore.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Gujarat, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-purple-400 mt-10 pt-6 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} OG Store. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;