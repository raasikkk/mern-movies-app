import { FaArrowRight } from "react-icons/fa";
import { useGetRandomMoviesQuery } from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RandomMovies = () => {
  const { data } = useGetRandomMoviesQuery();
  return (
    <div className="container mx-auto mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 25,
        }}
        className="text-3xl mt-20 mb-20 border-b-[16px] w-24"
        style={{
          borderBottomWidth: "16px",
          borderImage: "linear-gradient(to left, #990000, #1E1E1E) 1",
          borderStyle: "solid",
        }}
      >
        FILMS
      </motion.h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  customlg:grid-cols-5 gap-6">
        {data?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className="flex items-center justify-end md:mr-10">
        <Link
          to="/movies"
          className="p-3 px-5 rounded-md font-semibold flex items-center gap-3 justify-end transition hover:-translate-y-1 hover:opacity-90"
          style={{
            background:
              "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
          }}
        >
          See More <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default RandomMovies;
