import { useSelector, useDispatch } from "react-redux";
import { setContent } from "../redux/features/toggle/toggleSlice";
import {
  ourMission,
  whoWeAre,
  whatWeOffer,
} from "../redux/features/toggle/contentConstants";

const About = () => {
  const dispatch = useDispatch();
  const { selectedButton, content } = useSelector((state) => state.toggler);

  const handleButtonClick = (content, button) => {
    dispatch(setContent({ content, button }));
  };

  return (
    <div className="container mx-auto min-h-[900px] mt-16">
      <div className="flex items-center justify-between gap-5 flex-wrap lg:flex-nowrap">
        <div className="flex flex-col lg:w-3/4 pt-10">
          <h2
            className="text-3xl mt-5 border-b-[16px] w-40"
            style={{
              borderBottomWidth: "16px",
              borderImage: "linear-gradient(to left, #990000, #1E1E1E) 1",
              borderStyle: "solid",
            }}
          >
            ABOUT US
          </h2>
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-6xl font-semibold leading-tight md:leading-tight">
            Your go-to platform for <span className="text-red-600">movies</span>
            —anytime, anywhere!
          </h1>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button
              onClick={() => handleButtonClick(ourMission, "first")}
              className={`p-3 px-6 rounded-md border-2 hover:text-red-500 hover:border-red-500 ${
                selectedButton === "first"
                  ? "text-red-600 border-red-600"
                  : "text-white border-white"
              }`}
            >
              Our Mission
            </button>

            <button
              onClick={() => handleButtonClick(whoWeAre, "second")}
              className={`p-3 px-6 rounded-md border-2 hover:text-red-500 hover:border-red-500 ${
                selectedButton === "second"
                  ? "text-red-600 border-red-600"
                  : "text-white border-white"
              }`}
            >
              Who We Are
            </button>

            <button
              onClick={() => handleButtonClick(whatWeOffer, "third")}
              className={`p-3 px-6 rounded-md border-2 hover:text-red-500 hover:border-red-500 ${
                selectedButton === "third"
                  ? "text-red-600 border-red-600"
                  : "text-white border-white"
              }`}
            >
              What We Offer
            </button>
          </div>
          <p className="mt-8 text-base sm:text-lg md:text-xl min-h-[300px] md:min-h-[330px]">
            {content}
          </p>
        </div>
        <div className="flex flex-row items-center mx-auto md:mb-16 gap-5">
          <div className="flex flex-col gap-7">
            <div className="h-16"></div>
            <img src="./about-img-1.png" alt="about" />
            <img src="./about-img-2.png" alt="about" />
          </div>
          <div className="flex flex-col gap-7">
            <img src="./about-img-3.png" alt="about" />
            <img src="./about-img-4.png" alt="about" />
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
