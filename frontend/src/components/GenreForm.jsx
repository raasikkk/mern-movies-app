const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="mt-5 ">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between flex-wrap">
          <button
            className="w-full md:w-auto p-3 px-6 mt-5 font-semibold rounded-md hover:opacity-90 focus:outline-none focus:opacity-90 focus:border-2"
            style={{
              background:
                "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
            }}
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="w-full md:w-auto p-3 px-6 mt-5 font-semibold rounded-md bg-white text-red-600 border-2 border-red-600  hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
