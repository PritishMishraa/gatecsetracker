import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-12 rounded-t-[3rem] border-t border-transparent bg-[#1A1A1A] px-8 pt-24 pb-12 text-white dark:border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 grid grid-cols-2 gap-12 md:grid-cols-4">
          <div>
            <h4 className="mb-6 text-lg font-normal text-gray-400">Product</h4>
            <ul className="space-y-4 font-light">
              <li>
                <Link
                  href="/subject"
                  className="transition-colors hover:text-gray-300"
                >
                  Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  Channels
                </Link>
              </li>
              <li>
                <Link
                  href="/#premium"
                  className="transition-colors hover:text-gray-300"
                >
                  Premium
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-normal text-gray-400">
              Resources
            </h4>
            <ul className="space-y-4 font-light">
              <li>
                <a
                  href="https://github.com/PritishMishraa/gatecsetracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gray-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  PYQ Sets
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  Study Plan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-normal text-gray-400">Connect</h4>
            <ul className="space-y-4 font-light">
              <li>
                <a
                  href="https://twitter.com/PritishhMishraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gray-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PritishMishraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gray-300"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-lg font-normal text-gray-400">Legal</h4>
            <ul className="space-y-4 font-light">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-gray-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <div
            className="mb-8 text-6xl font-normal tracking-tighter opacity-20 select-none md:mb-0 md:text-8xl"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            GATE CSE
          </div>
          <div className="text-sm font-light text-gray-500">
            &copy; {new Date().getFullYear()} Pritish Mishra. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
