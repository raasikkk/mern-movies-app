import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import RandomMovies from "./Movies/RandomMovies";
import TopMovies from "./Movies/TopMovies";
import UpcomingFilms from "./Movies/UpcomingFilms";

const Home = () => {
  return (
    <div>
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="top">
        <TopMovies />
      </div>
      <RandomMovies />
      <UpcomingFilms horizontal={true} />
      <Footer />
    </div>
  );
};

export default Home;
