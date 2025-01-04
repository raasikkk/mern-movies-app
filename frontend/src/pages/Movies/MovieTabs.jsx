import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="">
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label htmlFor="comment" className="block text-xl mb-2">
                WRITE YOUR REVIEW:
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 border rounded-lg w-full md:w-3/4 text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                background:
                  "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
              }}
              className="p-3 px-5 w-full md:w-auto font-semibold rounded-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login">Sign In</Link> to write a review
          </p>
        )}
      </section>

      <section className="mt-[3rem]">
        <div>{movie?.reviews.length === 0 && <p>No Reviews</p>}</div>

        <div>
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#383838] p-4 rounded-lg w-full mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0] uppercase">
                  {review.name}
                </strong>
                <p className="text-[#B0B0B0]">
                  {review?.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
