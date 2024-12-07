import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import CategorySlide from "./Slide";
import Empty from "../../Globals/Empty";

type CategoriesSlidersProps = {
  data: Category[];
  loading: boolean;
};

const breakpoints = {
  0: {
    slidesPerView: 1.2,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2.5,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 4.5,
    spaceBetween: 20,
  },
};

export default function CategoriesSliders({
  data,
  loading,
}: CategoriesSlidersProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={breakpoints}
      className="mySwiper"
    >
      {loading ? (
        Array.from(Array(10), (_, i) => (
          <SwiperSlide key={i}>
            <CategorySlide
              key={i}
              data={{ display_name: "", id: "", image: "", opens_at: "" }}
              loading
            />
          </SwiperSlide>
        ))
      ) : data && data.length ? (
        data.map((category) => (
          <SwiperSlide key={category.id}>
            <CategorySlide data={category} />
          </SwiperSlide>
        ))
      ) : (
        <Empty msg="There are no categories." />
      )}
    </Swiper>
  );
}
