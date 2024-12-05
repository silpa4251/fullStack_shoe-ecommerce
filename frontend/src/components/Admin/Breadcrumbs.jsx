import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x && x !== "admin");

  return (
    <nav className="text-sm">
      <ul className="flex space-x-2">
        <li>
          <Link
            to="/admin"
            className="text-red-800 font-semibold text-xl hover:text-red-700  transition-colors duration-200"
          >
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const routeTo = `/admin/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="text-red-900 mx-2">/</span>
              {isLast ? (
                <span className="text-red-800 text-lg font-semibold capitalize">
                  {value}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-red-800 text-lg font-semibold capitalize hover:text-red-700 transition-colors duration-200"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
