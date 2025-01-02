import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

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

        await createMovie({
          ...movieData,
          imageVertical: uploadedImageVerticalPath,
          imageHorizontal: uploadedImageHorizontalPath,
        });

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
      console.error("Failed to create movie", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="pt-40" style={{ backgroundImage: "url('/auth-bg.png')" }}>
      <div className="container mx-auto h-[105vh]">
        <form>
          <h1 className="font-bold text-5xl mb-5">Create Movie</h1>
          {/* Name */}
          <div className="mb-4 ">
            <label className="flex flex-col text-lg gap-3">
              Name:
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md"
              />
            </label>
          </div>

          {/* Year */}
          <div className="mb-4 ">
            <label className="flex flex-col text-lg gap-3">
              Year:
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md"
              />
            </label>
          </div>

          {/* Detail */}
          <div className="mb-4 ">
            <label className="flex flex-col text-lg gap-3">
              Detail:
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md"
              ></textarea>
            </label>
          </div>

          {/* Cast */}
          <div className="mb-4 ">
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
                className="w-full md:w-1/2 rounded-md"
              />
            </label>
          </div>

          {/* Genre */}
          <div className="mb-4 ">
            <label className="flex flex-col text-lg gap-3">
              Genre:
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md"
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
          <div className="mb-4 ">
            <label className="flex flex-col text-lg gap-3">
              Link:
              <input
                type="text"
                name="link"
                value={movieData.link}
                onChange={handleChange}
                className="w-full md:w-1/2 rounded-md"
              />
            </label>
          </div>

          {/* Vertical Image */}
          <div className="mb-5 mt-5">
            <label
              style={
                !selectedImageVertical
                  ? {
                      border: "1px solid #888",
                      borderRadius: "5px",
                      padding: "8px",
                    }
                  : {
                      border: "0",
                      borderRadius: "0",
                      padding: 0,
                    }
              }
            >
              {!selectedImageVertical && "Upload Vertical Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageVerticalChange}
                className="rounded-md text-white "
                style={{
                  background:
                    "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
                  display: !selectedImageVertical ? "none" : "block",
                }}
              />
            </label>
          </div>

          {/* Horizontal Image */}
          <div className="mb-5 mt-5">
            <label
              style={
                !selectedImageHorizontal
                  ? {
                      border: "1px solid #888",
                      borderRadius: "5px",
                      padding: "8px",
                    }
                  : {
                      border: "0",
                      borderRadius: "0",
                      padding: 0,
                    }
              }
            >
              {!selectedImageHorizontal && "Upload Horizontal Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageHorizontalChange}
                className="rounded-md text-white "
                style={{
                  background:
                    "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
                  display: !selectedImageHorizontal ? "none" : "block",
                }}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleCreateMovie}
            className="w-full md:w-auto p-3 px-6 mt-5 font-semibold rounded-md hover:opacity-90 focus:outline-none focus:opacity-90 focus:border-2"
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
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
