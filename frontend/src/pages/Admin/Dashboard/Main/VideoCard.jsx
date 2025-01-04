import { Link } from "react-router-dom";

const VideoCard = ({ id, image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center w-full mt-5">
        <div>
          <img src={image} alt="Card Image" className="h-[3rem]" />
        </div>

        <div className="ml-4">
          <Link
            to={`/movies/${id}`}
            className="text-bae md:text-lg text-white uppercase"
          >
            {title}
          </Link>
          <p className="text-gray-500 mb-3">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
