import { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import userProfile from "./anon-profile.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle scrolling to sections on the home page
  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      // If the user is on the home page, scroll directly to the section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If the user is not on the home page, navigate to it first
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200); // Slight delay to ensure the page is fully loaded before scrolling
    }
  };

  return (
    <div className="absolute z-50 top-0 w-full mb-5 text-white">
      <section className="flex justify-between items-center container mx-auto px-2 mt-5">
        {/* Logo */}
        <div className="logo text-xl md:text-2xl">
          <Link to="/">
            JOIN WAY <span className="text-red-600">FILM</span>
          </Link>
        </div>
        {/* Regular Links */}
        <div className="hidden lg:flex justify-between items-center w-1/2 text-2xl">
          <Link to="/" onClick={() => scrollToSection("")}>
            HOME
          </Link>
          <button onClick={() => scrollToSection("about")}>ABOUT US</button>
          <Link to="/movies">SEARCH</Link>
          <button onClick={() => scrollToSection("top")}>TOP MOVIES</button>
        </div>
        {/* Section 2 */}
        <div className="relative flex items-center space-x-4 ">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="text-gray-800  flex focus:outline-none"
            >
              <span className="text-white text-xl md:text-2xl uppercase flex items-center gap-2 md:gap-4">
                {userInfo.username}
                <img src={userProfile} alt="profile" width={30} />
              </span>
            </button>
          ) : null}
          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-10 lg:right-0 space-y-2 bg-white text-gray-600 ${
                !userInfo.isAdmin ? "top-20" : "top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    onClick={toggleDropdown}
                    className="block px-10 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  onClick={toggleDropdown}
                  className="block px-10 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-10 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!userInfo && (
            <ul className="flex items-center ">
              <li>
                <Link
                  to="/login"
                  className="flex items-center transition-transform transform hover:-translate-y-1 "
                >
                  <AiOutlineLogin className="mr-2" size={30} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center transition-transform transform hover:-translate-y-1 ml-[1rem]"
                >
                  <AiOutlineUserAdd size={30} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
          {/* Toggle Button */}
          <button
            onClick={toggleMenu}
            className="block lg:hidden text-white transition hover:-translate-y-1"
          >
            <AiOutlineMenu size={30} />
          </button>
        </div>
      </section>

      {/* Full-Screen Links */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 z-50 flex flex-col justify-center items-center text-white space-y-10 text-3xl transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5 text-white text-4xl"
        >
          ✕
        </button>
        <Link
          to="/"
          onClick={() => {
            scrollToSection("");
            toggleMenu();
          }}
        >
          HOME
        </Link>
        <button
          onClick={() => {
            scrollToSection("about");
            toggleMenu();
          }}
        >
          ABOUT US
        </button>
        <Link to="/movies" onClick={toggleMenu}>
          SEARCH
        </Link>
        <button
          onClick={() => {
            scrollToSection("top");
            toggleMenu();
          }}
        >
          TOP MOVIES
        </button>
      </div>
    </div>
  );
};

export default Navigation;
