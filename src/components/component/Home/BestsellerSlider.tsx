import 'swiper/css';
import 'swiper/css/autoplay';
// 위에 두 줄 에러 빨간줄 무시
import type SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import { getBestsellerBooks } from '../../../apis/book-search';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

export default function BestsellerSlider() {
  const [bestsellers, setBestsellers] = useState<Bestsellers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const bestsellers = await getBestsellerBooks();
        setBestsellers(bestsellers);
      } catch (error) {
        console.error(
          '베스트셀러 책 데이터를 불러오는 데 실패했습니다.',
          error,
        );
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="mb-4 text-center text-xl font-semibold">
        {bestsellers.length > 0
          ? bestsellers[currentIndex - 1]?.title
          : 'Best Sellers'}
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
          <SwiperSlide key={book.isbn13} className="flex justify-center">
            <p className="mt-2 truncate text-center font-medium">
              {book.title}
            </p>
            <div className="flex cursor-pointer flex-col items-center">
              <img
                src={book.cover}
                alt={book.title}
                className="h-[278px] w-[183px] rounded-r-[10px] object-cover"
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
        <div className="mt-[30px] flex h-[25px] w-[135px] justify-between text-[20px] font-medium">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#F5F4F4]"
          >
            <MdArrowBackIosNew className="w-[18px]" />
          </button>
          <h3 className="text-[20px] font-medium">
            {currentIndex} / {bestsellers.length}
          </h3>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#F5F4F4]"
          >
            <MdArrowForwardIos className="w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
