
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Executive Research
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900">
                Search
              </Link>
              <Link to="/saved" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                Saved Executives
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/signin" className="text-gray-500 hover:text-gray-900">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
