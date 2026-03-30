import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#1A1A1A] text-white pt-24 pb-12 px-8 rounded-t-[3rem] mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="text-lg font-normal mb-6 text-gray-400">Product</h4>
            <ul className="space-y-4 font-light">
              <li>
                <Link
                  href="/subject"
                  className="hover:text-gray-300 transition-colors"
                >
                  Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  Channels
                </Link>
              </li>
              <li>
                <Link
                  href="#premium"
                  className="hover:text-gray-300 transition-colors"
                >
                  Premium
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-normal mb-6 text-gray-400">
              Resources
            </h4>
            <ul className="space-y-4 font-light">
              <li>
                <a
                  href="https://github.com/PritishMishraa/gatecsetracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  PYQ Sets
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  Study Plan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-normal mb-6 text-gray-400">Connect</h4>
            <ul className="space-y-4 font-light">
              <li>
                <a
                  href="https://twitter.com/PritishhMishraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PritishMishraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-normal mb-6 text-gray-400">Legal</h4>
            <ul className="space-y-4 font-light">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <div
            className="text-6xl md:text-8xl font-normal tracking-tighter opacity-20 select-none mb-8 md:mb-0"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            GATE CSE
          </div>
          <div className="text-sm text-gray-500 font-light">
            &copy; {new Date().getFullYear()} Pritish Mishra. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
