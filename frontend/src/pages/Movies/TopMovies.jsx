import SliderUtil from "../../components/SliderUtil";
import { useGetTopMoviesQuery } from "../../redux/api/movies";
import { motion } from "framer-motion";

const TopMovies = () => {
  const { data } = useGetTopMoviesQuery();

  return (
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 25,
        }}
        className="text-3xl mt-5 mb-20 border-b-[16px] w-44"
        style={{
          borderBottomWidth: "16px",
          borderImage: "linear-gradient(to left, #990000, #1E1E1E) 1",
          borderStyle: "solid",
        }}
      >
        TOP MOVIES
      </motion.h2>
      <SliderUtil data={data} />
    </div>
  );
};

export default TopMovies;
