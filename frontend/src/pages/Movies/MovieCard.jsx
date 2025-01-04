import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.imageVertical}
          alt={movie.name}
          className="w-[20rem] h-[380px] rounded-[25px] object-cover transition duration-300 ease-in-out transform group-hover:opacity-40"
        />
      </Link>

      <Link
        to={`/movies/${movie._id}`}
        className="absolute text-lg font-semibold cursor-pointer top-[45%] left-[30%] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"
      >
        Watch <span className="text-red-600">Movie</span>
      </Link>
      <h1 className="text-lg mt-3 uppercase">{movie.name}</h1>
      <h2 className="text-gray-400 text-sm mb-10">{movie.year}</h2>
    </div>
  );
};

export default MovieCard;
