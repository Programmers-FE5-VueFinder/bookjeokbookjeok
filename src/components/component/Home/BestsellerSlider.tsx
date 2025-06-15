import 'swiper/css';
import 'swiper/css/autoplay'; 
// 위에 두 줄 에러 빨간줄 무시
import type SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import { getBestsellerBooks } from '../../../apis/book-search';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function BestsellerSlider () {
  const [bestsellers, setBestsellers] = useState<Bestsellers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const bestsellers = await getBestsellerBooks();
        setBestsellers(bestsellers);
      } catch (error) {
        console.error("베스트셀러 책 데이터를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-center mb-4">
        {bestsellers.length > 0 ? bestsellers[currentIndex -1]?.title : 'Best Sellers'}
      </h1>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const realIndex = (swiper.realIndex % bestsellers.length) + 1;
          setCurrentIndex(realIndex);
        }}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
      >

        {bestsellers.map((book) => (
          <SwiperSlide 
            key={book.isbn13}
            className="flex justify-center"
          >
            <p className="mt-2 text-center font-medium truncate">{book.title}</p>
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src={book.cover}
                alt={book.title}
                className="w-[183px] h-[278px] object-cover rounded-r-[10px]"
                style={{
                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
              }}  
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* slide pagination */}
      <div className="flex justify-center">
            <div className="flex justify-between w-[135px] h-[25px] text-[20px] font-medium mt-[30px]">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#F5F4F4] cursor-pointer"
              >
                <MdArrowBackIosNew className="w-[18px]"/>
              </button>
              <h3 className="text-[20px] font-medium">{currentIndex} / {bestsellers.length}</h3>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#F5F4F4] cursor-pointer"
              >
                <MdArrowForwardIos className="w-[18px]"/>
              </button>
            </div>
          </div>
      
    </div>
  );
}
