import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Sam<span className="text-yellow-400">.</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for trending fashion, accessories, and
              lifestyle products.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-4 text-xl">
              <FiFacebook className="hover:text-yellow-400 cursor-pointer" />
              <FiInstagram className="hover:text-yellow-400 cursor-pointer" />
              <FiTwitter className="hover:text-yellow-400 cursor-pointer" />
              <FiYoutube className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-white font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="#">Shipping Info</Link>
              </li>
              <li>
                <Link href="#">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Affiliate Program</Link>
              </li>
              <li>
                <Link href="#">Press</Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="flex flex-col md:flex-row justify-between items-center
                        py-6 text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} Sam. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for modern e-commerce</p>
        </div>
      </div>
    </footer>
  );
}
