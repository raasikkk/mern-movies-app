import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Links Hover Effect
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const links = [
    { label: "HOME", path: "#", section: "home" },
    { label: "ABOUT US", path: "#", section: "about" },
    { label: "SEARCH", path: "/movies", section: null },
    { label: "TOP MOVIES", path: "#", section: "top" },
  ];

  return (
    <div className="mt-10">
      <div className="container mx-auto flex flex-col flex-wrap">
        {/* Line */}
        <div className="border-b-4 border-red-600 rounded-md w-full lg:w-3/4 mx-auto"></div>

        {/* Footer content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-3 lg:px-0 mt-10">
          {/* Logo */}
          <div className="flex flex-col w-56">
            <Link className="logo text-2xl lg:mt-10" to="/">
              JOIN WAY <span className="text-red-600">FILM</span>
            </Link>
            <p className="text-gray-400 text-xs">
              Explore a wide selection of films from all genres. Stream your
              favorites now and enjoy endless entertainment!
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between lg:items-center w-1/2 text-2xl">
            {links.map((link, index) =>
              link.path === "#" ? (
                <button
                  key={index}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection(link.section)}
                  className={`${
                    hoveredLink && hoveredLink !== link.label
                      ? "opacity-50"
                      : "opacity-100"
                  } transition-opacity text-start duration-300`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                  className={`${
                    hoveredLink && hoveredLink !== link.label
                      ? "opacity-50"
                      : "opacity-100"
                  } transition-opacity text-start duration-300`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 mt-5 lg:mt-0 text-3xl">
            <Link
              className="transition hover:-translate-y-1"
              to="https://github.com/raasikkk/mern-movies-app"
            >
              <FaGithub />
            </Link>
            <Link className="transition hover:-translate-y-1" to="/">
              <FaInstagram />
            </Link>
            <Link className="transition hover:-translate-y-1" to="/">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-black opacity-95 mt-10 p-5">
        <h3 className="text-sm md:text-base">
          &copy; 2025 JOIN WAY <span className="text-red-600">FILM</span>. All
          right reserved.
        </h3>
      </div>
    </div>
  );
};

export default Footer;
