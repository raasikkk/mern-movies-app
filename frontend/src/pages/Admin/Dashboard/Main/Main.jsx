import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";

import { Link } from "react-router-dom";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="w-full">
      <section className="flex flex-col w-full">
        <div className="mt-10 w-full flex flex-col px-3">
          <div className="flex flex-wrap justify-center gap-10">
            <SecondaryCard pill="Users" content={visitors?.length} />
            <SecondaryCard pill="Comments" content={sumOfCommentsLength} />
            <SecondaryCard pill="Movies" content={allMovies?.length} />
          </div>

          {/* Links */}
          <div className="mt-10 flex justify-center gap-5">
            <Link
              to="/admin/movies/create"
              className="border-2 border-white p-2 px-4 rounded-md hover:bg-red-600"
            >
              Create Movie
            </Link>
            <Link
              to="/admin/movies/genre"
              className="border-2 border-white p-2 px-4 rounded-md hover:bg-red-600"
            >
              Create Genre
            </Link>
            <Link
              to="/admin/movies-list"
              className="border-2 border-white p-2 px-4 rounded-md hover:bg-red-600"
            >
              Update Movie
            </Link>
            <Link
              to="/admin/movies/comments"
              className="border-2 border-white p-2 px-4 rounded-md hover:bg-red-600"
            >
              Comments
            </Link>
          </div>

          <div className="flex justify-between w-full mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              id={movie._id}
              image={movie.imageVertical}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
