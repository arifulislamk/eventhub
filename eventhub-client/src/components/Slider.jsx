// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className=" rounded-2xl"
            src="https://i.ibb.co/fdjy8Q29/e6.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=" rounded-2xl"
            src="https://i.ibb.co/kVWzWRFW/e5.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=" rounded-2xl"
            src="https://i.ibb.co/DHwHcBCp/e8.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
