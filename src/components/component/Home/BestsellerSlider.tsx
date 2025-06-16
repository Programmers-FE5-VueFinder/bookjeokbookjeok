// 아래 @ts 주석 지우지 말아주세요!
// @ts-expect-error Swiper autoplay CSS module is missing in types
import 'swiper/css';
import type SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
import BookPage from '../book-detail/BookPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import type { BookDetail } from '../../../types/book';
import { getBestsellerBooks } from '../../../apis/book-search';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

export default function BestsellerSlider () {
  const [bestsellers, setBestsellers] = useState<BookDetail[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
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
        observer={true}
        observeParents={true}
      >

        {bestsellers.map((book, index) => {
          const isActive = currentIndex - 1 === index;
          return (
            <SwiperSlide 
              key={book.isbn13}
              className="flex justify-center group"
            >
              {/* <p className="mt-2 text-center font-medium truncate">{book.title}</p> */}
              <div 
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => {
                  setSelectedBook(book);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-[183px] h-[278px] object-cover rounded-r-[10px]"
                  style={{
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                }}  
                />
                {!isActive && (
                  <div className="absolute justify-center items-center w-[100%] h-[100%] bg-black/40 rounded-r-[10px]" />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* slide pagination */}
      <div className="flex justify-center">
        <div className="flex justify-between w-[135px] h-[25px] text-[20px] font-medium mt-[30px]">
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#FFFFFF]/50 cursor-pointer"
          >
            <MdArrowBackIosNew className="w-[16px]"/>
          </button>
          <h3 className="text-[20px] font-medium">{currentIndex} / {bestsellers.length}</h3>
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#FFFFFF]/50 cursor-pointer"
          >
            <MdArrowForwardIos className="w-[16px]"/>
          </button>
        </div>
      </div>
      {selectedBook && (
        <BookPage
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          bookDetail={selectedBook}
        />
      )}
    </div>
  );
}
