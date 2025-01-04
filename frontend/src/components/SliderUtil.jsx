import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  SwiperCore.use([Autoplay, FreeMode]);

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={5}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop={true}
      freeMode={true}
      allowTouchMove={true}
      speed={3000}
      breakpoints={{
        100: {
          slidesPerView: "auto",
          centeredSlides: true,
        },
        640: {
          slidesPerView: 3,
          centeredSlides: true,
        },
        1228: {
          slidesPerView: 5,
          centeredSlides: false,
        },
      }}
      //   pagination={{ clickable: true }}
      //   grabCursor={true}
    >
      {data?.map((movie) => (
        <SwiperSlide key={movie._id}>
          {/* Replace with your MovieCard */}
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderUtil;
