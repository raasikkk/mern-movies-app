import { Link } from "react-router-dom";
import Typed from "react-typed-component";
// import { Typed } from "react-typed";

const Hero = () => {
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

        <div className="flex items-center flex-row flex-wrap gap-5 mt-14">
          <button
            className="hero-btn-size p-5 px-7 rounded-md text-lg font-medium transition hover:opacity-80"
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
          >
            <Link to="/">WATCH FILMS</Link>
          </button>
          <button className="hero-btn-size p-4 px-6 rounded-md text-lg font-medium text-red-600 border-4 border-red-600 transition hover:opacity-80">
            <Link to="/movies">SEARCH</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
