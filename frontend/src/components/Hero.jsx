import { Link, useNavigate } from "react-router-dom";
import Typed from "react-typed-component";
// import { Typed } from "react-typed";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

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
    <div
      className="w-full min-h-[750px] bg-cover bg-center bg-no-repeat pt-32"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="container mx-auto mt-16">
        <h1 className="hero-header min-h-48">
          <Typed
            strings={[
              "Stream Top <span class='text-red-600'>Movies</span> And Shows Anytime, Anywhere.",
              "Watch Your <span class='text-red-600'>Favorites</span> Anytime, Anywhere.",
              "Search For <span class='text-red-600'>Movies</span> And TV Shows",
            ]}
            typeSpeed={80}
            backSpeed={50}
            loop
            smartBackspace
            renderFunction={(string) => (
              <span dangerouslySetInnerHTML={{ __html: string }} />
            )}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
          }}
          className="flex items-center flex-row flex-wrap gap-5 mt-14"
        >
          <button
            className="hero-btn-size p-5 px-7 rounded-md text-lg font-medium transition hover:opacity-80 hover:translate-x-1"
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
            onClick={scrollToSection("top")}
          >
            <Link to="/">WATCH FILMS</Link>
          </button>
          <button className="hero-btn-size p-4 px-6 rounded-md text-lg font-medium text-red-600 border-4 border-red-600 transition hover:opacity-80 hover:translate-x-1">
            <Link to="/movies">SEARCH</Link>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
