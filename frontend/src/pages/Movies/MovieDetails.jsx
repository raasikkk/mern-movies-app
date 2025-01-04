import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import UpcomingFilms from "./UpcomingFilms";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen relative bg-cover bg-center bg-no-repeat">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

        <img
          className="absolute inset-0 w-full h-full object-cover -z-20"
          src={movie?.imageHorizontal}
          alt={movie?.name}
        />

        {/* Content */}
        <div className="container mx-auto pt-32">
          <div className="flex mt-10 relative flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px", once: true }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 25,
                }}
                className="xs:text-5xl md:text-6xl lg:text-7xl xs:leading-tight md:leading-tight customlg:leading-snug font-extrabold"
              >
                {movie?.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px", once: true }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 25,
                }}
                className="text-sm mt-3"
              >
                {movie?.detail}
              </motion.p>
              <Link
                to={movie?.link}
                style={{
                  background:
                    "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
                }}
                className="mt-10 p-3 px-5 text-center font-semibold w-full md:w-1/3 rounded-md"
              >
                WATCH FILM
              </Link>
            </div>

            <div className="flex flex-col mt-10 md:mt-0 mb-5 md:mb-0 md:absolute right-0 top-0 text-lg md:text-xl w-full text-start md:text-end leading-relaxed">
              <h2>RELEASING DATE: {movie?.year}</h2>
              ACTORS:
              {movie?.cast.map((actor) => (
                <p key={actor?._id}>{actor}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20">
        <div className="flex flex-wrap md:flex-nowrap items-start gap-5 justify-between w-full">
          <div className="w-full">
            <MovieTabs
              loadingMovieReview={loadingMovieReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />
          </div>
          <div className="w-full md:w-1/2">
            <UpcomingFilms horizontal={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
