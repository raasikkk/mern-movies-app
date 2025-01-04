import { AiOutlineSearch } from "react-icons/ai";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import Footer from "../../components/Footer";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies());
        break;
    }
  };

  return (
    <div>
      <div
        className="w-full min-h-[600px] bg-cover bg-center bg-no-repeat pt-32"
        style={{ backgroundImage: "url('/search-bg.png')" }}
      >
        <div className="container mx-auto">
          <div className="flex relative flex-col mx-auto w-full md:w-1/2 mt-16">
            <h1 className="xs:text-5xl md:text-6xl lg:text-7xl text-center leading-tight md:leading-tight customlg:leading-snug font-extrabold  ">
              Search For <span className="text-red-600">Movies</span> And TV
              Shows
            </h1>
            <p className="text-gray-400 text-center">
              Looking for something to watch? Start typing to find your perfect
              film or show. From blockbusters to hidden gems, we’ve got it all.
            </p>
            <div className="mt-5 w-full relative ">
              <input
                type="text"
                className="w-full outline-none rounded-md"
                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <AiOutlineSearch
                className="absolute text-red-600 top-1/2 right-5 transform -translate-y-1/2 "
                size={25}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10">
        <div className="flex items-center flex-wrap justify-center gap-5 px-3">
          <select
            className="border text-center p-2 px-3 rounded-md bg-transparent appearance-none"
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
          >
            <option value="">Genres</option>
            {genres?.map((genre) => (
              <option
                key={genre._id}
                value={genre._id}
                className="p-2 px-3 text-center"
              >
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className="border text-center p-2 px-3 rounded-md bg-transparent appearance-none"
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="">Year</option>
            {uniqueYears?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="border text-center p-2 px-3 rounded-md bg-transparent appearance-none"
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="new">New Movies</option>
            <option value="top">Top Movies</option>
            <option value="random">Random Movies</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  customlg:grid-cols-5 gap-6">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllMovies;
