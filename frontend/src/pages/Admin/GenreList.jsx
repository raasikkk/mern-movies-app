import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating genre failed, try again later.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="pt-40 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="container mx-auto h-screen">
        <div className="flex flex-col">
          <h1 className="font-bold text-5xl mb-5">Manage Genres</h1>
          <div className="w-full md:w-1/2">
            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateGenre}
            />
          </div>

          <br />

          <div className="flex flex-wrap gap-3 mt-3">
            {genres?.map((genre) => (
              <div key={genre._id}>
                <button
                  className="bg-white font-medium p-3 px-5 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedGenre(genre);
                      setUpdatingName(genre.name);
                    }
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateGenre}
              buttonText="Update"
              handleDelete={handleDeleteGenre}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default GenreList;
