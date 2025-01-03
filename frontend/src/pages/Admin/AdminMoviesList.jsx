import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="pt-32">
      <div className="container mx-auto">
        <div className="text-4xl md:text-5xl font-bold">
          All Movies ({movies?.length})
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  customlg:grid-cols-5 gap-6">
          {movies?.map((movie) => (
            <Link
              to={`/admin/movies/update/${movie._id}`}
              key={movie._id}
              className="max-w-full bg-white rounded-lg shadow-lg overflow-hidden border-gray-200 hover:shadow-xl  "
            >
              <img
                src={movie.imageVertical}
                alt={movie.name}
                className="w-full h-80 object-cover"
              />
              <div className="px-4 py-2">
                <h3 className="text-lg text-black font-bold truncate">
                  {movie.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {movie.detail}
                </p>
              </div>
              <div className="px-4 py-2 mb-3">
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update Movie
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
