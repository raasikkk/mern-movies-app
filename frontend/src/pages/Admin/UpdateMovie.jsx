import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    imageVertical: null,
    imageHorizontal: null,
    link: "",
  });

  const [selectedImageVertical, setSelectedImageVertical] = useState(null);
  const [selectedImageHorizontal, setSelectedImageHorizontal] = useState(null);

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageVerticalChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageVertical(file);
  };

  const handleImageHorizontalChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageHorizontal(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !movieData.link
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImageVerticalPath = movieData.imageVertical;
      let uploadedImageHorizontalPath = movieData.imageHorizontal;

      if (selectedImageVertical && selectedImageHorizontal) {
        const formData = new FormData();
        formData.append("imageVertical", selectedImageVertical);
        formData.append("imageHorizontal", selectedImageHorizontal);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImageVerticalPath = uploadImageResponse.data.imageVertical;
          uploadedImageHorizontalPath =
            uploadImageResponse.data.imageHorizontal;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          imageVertical: uploadedImageVerticalPath,
          imageHorizontal: uploadedImageHorizontalPath,
        },
      });

      navigate("/movies");
    } catch (error) {
      console.error("Faled to update movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div
      className="pt-32 bg-cover  bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="container mx-auto">
        <form>
          <h1 className="font-bold text-4xl mb-5">Update Movie</h1>
          {/* Name */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Name:
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md h-10 text-base"
              />
            </label>
          </div>

          {/* Year */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Year:
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md h-10 text-base"
              />
            </label>
          </div>

          {/* Detail */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Detail:
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md h-20 text-sm"
              ></textarea>
            </label>
          </div>

          {/* Cast */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Cast (coma-separated):
              <input
                type="text"
                name="cast"
                value={movieData.cast.join(", ")}
                onChange={(e) =>
                  setMovieData({
                    ...movieData,
                    cast: e.target.value.split(", "),
                  })
                }
                className="w-full md:w-1/2 rounded-md h-10 text-base"
              />
            </label>
          </div>

          {/* Link */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Link:
              <input
                type="text"
                name="link"
                value={movieData.link}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md h-10 text-base"
              />
            </label>
          </div>

          {/* Images */}
          <div className="flex items-center gap-5 mt-3">
            {/* Vertical Image */}
            <div className="mb-3 ">
              <p className="mb-3 font-medium">Vertical Image:</p>
              <div className="relative ">
                {!selectedImageVertical ? (
                  <label
                    htmlFor="verticalImageInput"
                    className="cursor-pointer inline-block  border border-gray-400 rounded-md px-4 py-2 text-center text-white transition duration-200"
                  >
                    Upload Vertical Image
                  </label>
                ) : (
                  <button className="text-lg text-green-600">
                    Image uploaded successfully!
                  </button>
                )}
                <input
                  id="verticalImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageVerticalChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Horizontal Image */}
            <div className="mb-3 ">
              <p className="mb-3 font-medium">Horizontal Image:</p>
              <div className="relative">
                {!selectedImageHorizontal ? (
                  <label
                    htmlFor="horizontalImageInput"
                    className="cursor-pointer inline-block  border border-gray-400 rounded-md px-4 py-2 text-center text-white transition duration-200"
                  >
                    Upload Horizontal Image
                  </label>
                ) : (
                  <p className="text-lg text-green-600">
                    Image uploaded successfully!
                  </p>
                )}
                <input
                  id="horizontalImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageHorizontalChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpdateMovie}
            className="w-full md:w-auto pb-3 p-3 px-6 mt-3 font-semibold rounded-md hover:opacity-90 focus:outline-none focus:opacity-90 focus:border-2"
            disabled={isUpdatingMovie || isUploadingImage}
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
          >
            {isUpdatingMovie || isUploadingImage
              ? "Updating..."
              : "Update Movie"}
          </button>
          <button
            type="button"
            onClick={handleDeleteMovie}
            className="w-full ml-5 md:w-auto pb-3 p-3 px-6 mt-3 font-semibold rounded-md hover:opacity-90 focus:outline-none focus:opacity-90 focus:border-2"
            disabled={isUpdatingMovie || isUploadingImage}
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
          >
            {isUpdatingMovie || isUploadingImage
              ? "Deleting..."
              : "Delete Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
