import home_fire from '../assets/images/home_fire.png';
import home_medal from '../assets/images/home_medal.png';
import home_login from '../assets/images/home_login.png';
import home_search_man from '../assets/images/home_search_man.png';
import home_star_shine from '../assets/images/home_star_shine.png';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import home_start_shine3 from '../assets/images/home_star_shine_x3.png';
import home_reading_book from '../assets/images/home_reading_book.png';
import home_main_banner1 from '../assets/images/home_main_banner1.png';

import LoginModal from './LoginModal';
import { useState } from 'react';
import BestsellerSlider from '../components/component/Home/BestsellerSlider';
import PopularDiaryCard from '../components/component/Home/PopularDiaryCard';
import SignUpModal from '../components/common/SignUpModal';

const slides = [
  {
    title: 'BOOK\nCLUB',
    description: '함께 읽고 이야기하며\n새로운 관점을 만나보세요',
    imgSrc: home_main_banner1,
  },
  {
    title: 'READ\nTOGETHER',
    description: '다른 이들과 함께하는 독서는\n더욱 즐거워요',
    imgSrc: home_main_banner1, // 추후 내용 변경
  },
  {
    title: 'SHARE\nCOMMUNITY',
    description: '자신의 생각을\n여러 사람들과 나누어보세요',
    imgSrc: home_main_banner1, // 추후 내용 변경
  },
];

export default function Home() {
  // const [diaries, setDiaries] = useState<PopularDiaryCardProps[]>([]); api 호출 시 사용 예정
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(
    null,
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 다이어리 api 호출할 예정

  return (
    <div className="mx-auto flex w-[1220px] justify-center gap-x-[10px] py-[40px]">
      {/* left side */}
      <div className="flex h-[894px] w-[590px]">
        <div className="h-[894px] w-full">
          <div className="flex h-[840px] w-[590px] flex-col rounded-[20px] bg-[#FDFF98] pt-[37px] pr-[25px] pl-[37px]">
            <div className="flex flex-col gap-y-[20px]">
              <img
                src={home_start_shine3}
                alt="star_shine"
                className="h-auto w-[39px]"
              />
              <h1 className="text-[36px] font-semibold whitespace-pre-line">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-[24px] font-medium whitespace-pre-line">
                {slides[currentSlide].description}
              </h2>
            </div>

            <div className="mt-auto flex justify-end">
              <img
                src={slides[currentSlide].imgSrc}
                alt="main_banner"
                className="flex h-auto w-[470px] justify-end"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mt-[30px] flex h-[25px] w-[135px] justify-between text-[20px] font-medium">
              <button
                onClick={prevSlide}
                className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#F5F4F4]"
              >
                <MdArrowBackIosNew className="w-[18px]" />
              </button>
              <h3 className="text-[20px] font-medium">
                {currentSlide + 1} / {slides.length}
              </h3>
              <button
                onClick={nextSlide}
                className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#F5F4F4]"
              >
                <MdArrowForwardIos className="w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* rigth side */}
      <div className="scroll-hidden flex h-[894px] w-[600px] flex-col items-center overflow-y-auto">
        {/* section 1 */}
        <section className="flex flex-col gap-y-[15px]">
          <div
            className="flex h-[130px] w-[590px] justify-between rounded-[20px] bg-[#00FF84] px-[26px] pt-[18px]"
            style={{
              boxShadow: '0px 0px 10px rgba(0, 114, 59, 0.25)',
            }}
          >
            <div>
              <h2 className="text-[20px] leading-[24px] font-semibold">
                로그인 하고 북적북적의
                <br />
                모든 서비스를 이용해보세요
              </h2>
              <button
                className="mt-[17px] h-[25px] w-[65px] cursor-pointer rounded-[20px] bg-[#80FFC2] text-[16px] font-semibold text-black"
                onClick={() => setActiveModal('login')}
              >
                로그인
              </button>

              {activeModal === 'login' && (
                <LoginModal
                  onClose={() => setActiveModal(null)}
                  onOpenSignUp={() => setActiveModal('signup')}
                />
              )}
              {activeModal === 'signup' && (
                <SignUpModal
                  onClose={() => setActiveModal(null)}
                  onBackToLogin={() => setActiveModal('login')}
                />
              )}
            </div>

            <img
              src={home_login}
              alt="home_loing"
              className="h-auto w-[170px]"
            />
          </div>

          <div className="flex h-[130px] w-[590px] justify-between rounded-[20px] border border-[#00FF84] bg-white px-[26px]">
            <div className="py-[18px]">
              <h2 className="text-[20px] leading-[24px] font-semibold text-[#06BE00]">
                독서 다이어리를 작성하시고
                <br />
                자신만의 배지를 수집해보세요
              </h2>
              <h3 className="mt-[13px] text-[14px] font-semibold">
                작성된 다이어리와 활동에 따라 배지를 드려요
              </h3>
            </div>

            <div className="flex items-end">
              <img
                src={home_medal}
                alt="home_medal"
                className="h-[125px] w-auto"
              />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="my-[40px] h-fit w-[393px]">
          <div className="flex flex-col items-center gap-y-[9px]">
            <img src={home_fire} alt="fire" className="h-[47px] w-auto" />
            <h2 className="text-[20px] font-semibold">금주의 인기 다이어리</h2>
          </div>
        </section>

        {/* section 3 */}
        <div className="flex cursor-pointer flex-col gap-y-[15px]">
          {/* {diaries.map((item, idx) => (
            <PopularDiaryCard 
              key={idx}
              genre={item.genre}
              title={item.title}
              content={item.content}
            />
          ))} */}
          <PopularDiaryCard
            genre="novel"
            title="설국"
            content="접경의 긴 터널을 빠져나오자, 설국이었다"
          />
          <PopularDiaryCard
            genre="education"
            title="코딩 자율학습 html + css + 자바스크립트"
            content="누구나 쉽게 배우는 코딩!!"
          />
          <PopularDiaryCard
            genre="development"
            title="설득의 능력"
            content="말의 힘!"
          />
          <PopularDiaryCard
            genre="humanities"
            title="초역 부처의 말"
            content="염세에서 배우는 불교의 가르침"
          />
        </div>

        {/* section 4 */}
        <section>
          <div className="flex items-center justify-center pl-[38px] text-[20px] font-semibold">
            <h1 className="text-[#333333]">
              지금! 주목 받는 <span className="text-[#08C818]">베스트셀러</span>
            </h1>
            <img
              src={home_search_man}
              alt="search_man"
              className="h-auto w-[319px]"
            />
          </div>

          {/* 베스트셀러 슬라이드 */}
          <div className="flex h-fit w-[590px] flex-col items-center rounded-[20px] bg-[#FFF5AA] py-[27px]">
            <BestsellerSlider />
          </div>
        </section>

        {/* section 5 */}
        <section>
          <div className="mt-[20px] mb-[57px] flex h-[186px] w-[590px] gap-x-[47px] rounded-[10px] bg-[#00FF84] pl-[23px]">
            <div>
              <img
                src={home_star_shine}
                alt="star_shine"
                className="mt-[36px] mb-[22px]"
              />
              <h1 className="text-[20px] font-semibold">
                북적북적과 함께
                <br />
                건강한 독서 습관 만들어보세요!
              </h1>
            </div>

            <img src={home_reading_book} alt="reading_book" />
          </div>
        </section>
      </div>
    </div>
  );
}
