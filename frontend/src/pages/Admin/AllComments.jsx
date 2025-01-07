import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-100px", once: true }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 25,
      }}
      className="pt-32 container mx-auto"
    >
      <h1 className="text-3xl font-medium text-center">All Comments</h1>
      {movie?.map((m) => (
        <section key={m._id} className="flex flex-col items-center px-2">
          {m?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#383838] p-4 rounded-md w-full md:w-[50%] mt-8"
            >
              <div className="flex justify-between">
                <div className="flex items-center flex-wrap gap-1">
                  <strong className="">{review.name}</strong>
                  <p className="text-sm uppercase"> ({m.name})</p>
                </div>
                <p className="">{review.createdAt.substring(0, 10)}</p>
              </div>

              <p className="my-4">{review.comment}</p>

              <button
                className="text-red-600 font-medium border border-red-600 p-1 px-2 rounded-md"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </motion.div>
  );
};
export default AllComments;
