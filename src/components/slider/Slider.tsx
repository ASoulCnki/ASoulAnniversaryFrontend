import { Swiper, SwiperSlide } from "swiper/react"
import type { FC } from "react"
import { Content } from "./SliderContent"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper"

// install Swiper modules
SwiperCore.use([Pagination])

export const Slider: FC = () => {
  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Content>Slide 1</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 2</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 3</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 4</Content>
        </SwiperSlide>
        <SwiperSlide>
          <Content>Slide 5</Content>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
