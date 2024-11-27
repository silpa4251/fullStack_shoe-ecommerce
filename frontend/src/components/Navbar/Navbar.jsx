import logo from "../../assets/logo.png";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsCalendarHeart } from "react-icons/bs";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch cart and wishlist counts on mount
  useState(() => {
    if (isAuthenticated) {
      axios.get("/api/cart").then((res) => setCartCount(res.data.length));
      axios.get("/api/wishlist").then((res) => setWishlistCount(res.data.length));
    }
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?name=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(logout());
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  return (
    <nav className="bg-white-800 p-4 sticky top-0 z-50 bg-white">
      <div className="mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center text-xl font-bold" id="brand-name">
          <img src={logo} alt="logo" className="h-10 mr-2" />
          STEP WHISPER
        </NavLink>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative search-input">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="search"
                placeholder="Search for products..."
                value={search}
                onChange={handleSearch}
                className="w-full max-w-xs px-4 py-2 border rounded-md searchbar"
              />
              <button
                type="submit"
                className="absolute right-3 top-2"
                aria-label="Search"
              >
                <IoSearch size={24} className="search-pic" />
              </button>
            </form>
          </div>

          <div className="flex md:hidden items-center space-x-6">
            <div className="relative">
              <NavLink to="/wishlist">
                <BsCalendarHeart size={20} className="cart-icon" />
                {isAuthenticated && wishlistCount > 0 && (
                  <span className="absolute bottom-3 left-5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            </div>
            <div className="relative">
              <NavLink to="/cart">
                <IoIosCart size={24} className="cart-icon" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute bottom-3 left-5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {!isAuthenticated ? (
              <button
                onClick={() => navigate("/login")}
                className="block navitems px-3 py-2 login-btn"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogoutClick}
                  className="block navitems px-3 py-2 login-btn"
                >
                  Logout
                </button>
                <NavLink to="/profile" className="hover:underline">
                  <FaUserCircle size={30} className="text-gray-600" />
                </NavLink>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              id="navbtn"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="navitems px-3 py-2 rounded">
              Home
            </NavLink>
            {["Men", "Women", "Kids"].map((item, id) => (
              <NavLink
                key={id}
                to={`/${item.toLowerCase()}`}
                className="navitems px-3 py-2 rounded"
              >
                {item}
              </NavLink>
            ))}
            {user?.admin && (
              <NavLink to="/admin" className="navitems px-3 py-2 rounded">
                Admin Dashboard
              </NavLink>
            )}
            <NavLink to="/wishlist" className="relative">
              <BsCalendarHeart size={20} className="cart-icon mt-2 navitems" />
              {isAuthenticated && wishlistCount > 0 && (
                <span className="absolute bottom-6 left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" className="relative">
              <IoIosCart size={24} className="cart-icon mt-2 navitems" />
              {isAuthenticated && cartCount > 0 && (
                <span className="absolute bottom-6 left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
            {!isAuthenticated ? (
              <button
                onClick={() => navigate("/login")}
                className="navitems px-3 py-2 rounded login-btn"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogoutClick}
                  className="navitems px-3 py-2 rounded login-btn"
                >
                  Logout
                </button>
                <NavLink to="/profile" className="hover:underline">
                  <FaUserCircle size={30} className="text-gray-600" />
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 py-2">
          <div className="relative search-input">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={handleSearch}
                className="w-full px-3 py-2 border rounded-md searchbar"
              />
              <button
                type="submit"
                className="absolute right-3 top-2"
                aria-label="Search"
              >
                <IoSearch size={24} className="text-gray-400 search-pic" />
              </button>
            </form>
          </div>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block navitems px-3 py-2 navitems"
          >
            Home
          </NavLink>
          {["Men", "Women", "Kids"].map((item, id) => (
            <NavLink
              key={id}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block navitems px-3 py-2 navitems"
            >
              {item}
            </NavLink>
          ))}
          {user?.admin && (
            <NavLink
              to="/admin"
              className="block navitems px-3 py-2 navitems"
            >
              Admin Dashboard
            </NavLink>
          )}
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to logout?</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Logout
            </button>
            <button
              onClick={handleCancelLogout}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
