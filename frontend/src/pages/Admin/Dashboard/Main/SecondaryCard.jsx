import CountUp from "../../../../animation/CountUp";

const SecondaryCard = ({ pill, content }) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
      }}
      className={`w-80 h-48 flex flex-col relative mt-10 rounded-lg shadow-lg`}
    >
      <div
        className={`absolute -top-4 left-1/3 border bg-white rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}
      >
        {pill}
      </div>

      <div className="flex items-center justify-center h-full">
        <h2 className="text-5xl font-bold text-white">
          {typeof content === "number" ? (
            <CountUp
              from={0}
              to={content}
              separator=","
              direction="up"
              className="count-up-text"
            />
          ) : (
            <span>Loading...</span> // Optional placeholder
          )}
        </h2>
      </div>

      <div className="text-center text-sm pb-3 text-white">
        {content} more than usual
      </div>
    </div>
  );
};

export default SecondaryCard;
