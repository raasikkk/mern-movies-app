import { motion } from "framer-motion";

const UpcomingFilms = ({ horizontal }) => {
  return (
    <div className="container mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 25,
        }}
        className={`text-3xl  mb-10 border-b-[16px] w-64 ${
          !horizontal && "mt-10 md:mt-0"
        }`}
        style={{
          borderBottomWidth: "16px",
          borderImage: "linear-gradient(to left, #990000, #1E1E1E) 1",
          borderStyle: "solid",
        }}
      >
        UPCOMING FILMS
      </motion.h1>
      {/* Cards */}
      <div
        className={`flex flex-wrap justify-center items-center ${
          horizontal ? "gap-5" : "gap-16"
        }`}
      >
        {/* First */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
          }}
          className="upcoming-card flex flex-col px-3 justify-end gap-3"
          style={{
            backgroundImage: `url(${
              !horizontal ? "." : ""
            }./upcoming-img-1.png)`,
          }}
        >
          <h2 className="text-2xl font-bold">Kayara. The Path of Destiny</h2>
          <div className="flex">
            <button
              className="p-3 px-5"
              style={{
                background:
                  "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
              }}
            >
              Cartoon, Adventure, Family
            </button>
            <button
              className="p-3 px-5"
              style={{
                background: "linear-gradient(90deg, #4502BB 0%, #140530 100%)",
              }}
            >
              2025
            </button>
          </div>
        </motion.div>

        {/* Second */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
          }}
          className="upcoming-card flex flex-col px-3 justify-end gap-3"
          style={{
            backgroundImage: `url(${
              !horizontal ? "." : ""
            }./upcoming-img-2.png)`,
          }}
        >
          <h2 className="text-2xl font-bold">Wolf Man</h2>
          <div className="flex">
            <button
              className="p-3 px-5"
              style={{
                background:
                  "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
              }}
            >
              Horror, Action
            </button>
            <button
              className="p-3 px-5"
              style={{
                background: "linear-gradient(90deg, #4502BB 0%, #140530 100%)",
              }}
            >
              2025
            </button>
          </div>
        </motion.div>

        {/* Third */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: true }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
          }}
          className="upcoming-card flex flex-col px-3 justify-end gap-3"
          style={{
            backgroundImage: `url(${
              !horizontal ? "." : ""
            }./upcoming-img-3.png)`,
          }}
        >
          <h2 className="text-2xl font-bold">Brave New World</h2>
          <div className="flex">
            <button
              className="p-3 px-5"
              style={{
                background:
                  "linear-gradient(90deg, #990000 0%, #ff0000 49%, #990000 100%)",
              }}
            >
              Science fiction, Action movie
            </button>
            <button
              className="p-3 px-5"
              style={{
                background: "linear-gradient(90deg, #4502BB 0%, #140530 100%)",
              }}
            >
              2025
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpcomingFilms;
