import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CreateMovie = () => {
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
    genre: "",
  });

  const [selectedImageVertical, setSelectedImageVertical] = useState(null);
  const [selectedImageHorizontal, setSelectedImageHorizontal] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?.id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre.name === value);

      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageVerticalChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageVertical(file);
  };

  const handleImageHorizontalChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageHorizontal(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !movieData.link ||
        !selectedImageVertical ||
        !selectedImageHorizontal
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImageVerticalPath = null;
      let uploadedImageHorizontalPath = null;

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

        const createMovieResponse = await createMovie({
          ...movieData,
          imageVertical: uploadedImageVerticalPath,
          imageHorizontal: uploadedImageHorizontalPath,
        });
        console.log("Create Movie Response:", createMovieResponse);

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          imageVertical: null,
          imageHorizontal: null,
          link: "",
          genre: "",
        });

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      console.error("Failed to create movie", error);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div
      className="pt-32 bg-cover  bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="container mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
          }}
        >
          <h1 className="font-bold text-4xl mb-5">Create Movie</h1>
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

          {/* Genre */}
          <div className="mb-3 ">
            <label className="flex flex-col text-lg gap-3">
              Genre:
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md h-10 text-base"
              >
                {isLoadingGenres ? (
                  <option>Loading genres...</option>
                ) : (
                  genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))
                )}
              </select>
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
            onClick={handleCreateMovie}
            className="w-full md:w-auto pb-3 p-3 px-6 mt-3 font-semibold rounded-md hover:opacity-90 focus:outline-none focus:opacity-90 focus:border-2"
            disabled={isCreatingMovie || isUploadingImage}
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
          >
            {isCreatingMovie || isUploadingImage
              ? "Creating..."
              : "Create Movie"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateMovie;
