import SliderUtil from "../../components/SliderUtil";
import { useGetTopMoviesQuery } from "../../redux/api/movies";

const TopMovies = () => {
  const { data } = useGetTopMoviesQuery();

  return (
    <div className="container mx-auto">
      <h2
        className="text-3xl mt-5 mb-20 border-b-[16px] w-44"
        style={{
          borderBottomWidth: "16px",
          borderImage: "linear-gradient(to left, #990000, #1E1E1E) 1",
          borderStyle: "solid",
        }}
      >
        TOP MOVIES
      </h2>
      <SliderUtil data={data} />
    </div>
  );
};

export default TopMovies;
