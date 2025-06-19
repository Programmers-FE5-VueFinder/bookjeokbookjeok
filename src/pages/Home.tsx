import home_fire from '../assets/images/home_fire.png';
import home_login from '../assets/images/home_login.png';
import home_writing from '../assets/images/home_writing.png';
import { mainBannerSlides } from '../constants/mainBannerSlide';
import home_star_shine from '../assets/images/home_star_shine.png';
import home_search_man from '../assets/images/home_search_man.png';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import home_reading_girl from '../assets/images/home_reading_girl.png';
import home_reading_book from '../assets/images/home_reading_book.png';
import home_start_shine3 from '../assets/images/home_star_shine_x3.png';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import type { DiaryPost } from '../types/type';
import { useAuthStore } from '../store/authStore';
import { fetchPopularDiaries } from '../apis/post';
import SignUpModal from '../components/common/SignUpModal';
import BestsellerSlider from '../components/component/Home/BestsellerSlider';
import PopularDiaryCard from '../components/component/Home/PopularDiaryCard';
import PopularDiaryCardSkeleton from '../components/component/Home/PopularDiaryCardSkeleton';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [diaries, setDiaries] = useState<DiaryPost[]>([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(
    null,
  );
  const isLogin = useAuthStore((state) => state.isLogin);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainBannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? mainBannerSlides.length - 1 : prev - 1));
  };

  // 금주의 인기 다이어리 api 호출
  useEffect(() => {
    let isMounted = true;

    const getPopularDiaries = async () => {
      try {
        const data = await fetchPopularDiaries();
        if (isMounted) {
          setDiaries(data as DiaryPost[]);
        }
      } catch (error) {
        console.error('인기 다이어리 가져오기 실패', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    getPopularDiaries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto flex h-fit w-[1220px] justify-center gap-x-[10px] pt-[40px]">
      {/* left side */}
      <div className="flex h-fit w-[590px]">
        <div className="h-fit w-full">
          <div
            className="flex h-[650px] w-[590px] flex-col rounded-[20px] pt-[37px] pl-[37px]"
            style={{ backgroundColor: mainBannerSlides[currentSlide].bgColor }}
          >
            <div className="flex flex-col gap-y-[20px]">
              <img
                src={home_start_shine3}
                alt="star_shine"
                className="h-auto w-[39px]"
              />
              <h1 className="text-[36px] font-semibold whitespace-pre-line">
                {mainBannerSlides[currentSlide].title}
              </h1>
              <h2 className="text-[24px] font-medium whitespace-pre-line">
                {mainBannerSlides[currentSlide].description}
              </h2>
            </div>

            <div className={mainBannerSlides[currentSlide].boxClassName}>
              <img
                src={mainBannerSlides[currentSlide].imgSrc}
                alt="main_banner"
                className={mainBannerSlides[currentSlide].className}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="my-[30px] flex h-[25px] w-[135px] justify-between text-[20px] font-medium">
              <button
                onClick={prevSlide}
                className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#CDC8C8]/20"
              >
                <MdArrowBackIosNew className="w-[16px]" />
              </button>
              <h3 className="text-[20px] font-medium">
                {currentSlide + 1} / {mainBannerSlides.length}
              </h3>
              <button
                onClick={nextSlide}
                className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[5px] bg-[#CDC8C8]/20"
              >
                <MdArrowForwardIos className="w-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="scroll-hidden flex h-[735px] w-[600px] flex-col items-center overflow-y-auto pb-[85px]">
        {/* section 1 */}
        <section className="flex flex-col gap-y-[15px]">
          {isLogin === false && (
            <div className="flex h-[130px] w-[590px] justify-between rounded-[20px] bg-[#00FF84] px-[26px] pt-[18px]">
              {/* 로그인 배너 */}
              <div>
                <h2 className="text-[20px] leading-[24px] font-semibold">
                  로그인 하고 북적북적의
                  <br />
                  모든 서비스를 이용해보세요
                </h2>
                <button
                  className="mt-[17px] h-[25px] w-[65px] cursor-pointer rounded-[20px] bg-[#FFFFFF]/50 text-[16px] font-semibold text-[#3E3C3C] transition-transform duration-200 hover:scale-105 hover:shadow-sm"
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
                alt="home_login"
                className="h-auto w-[170px]"
              />
            </div>
          )}

          {isLogin === true && (
            <div className="flex h-[130px] w-[590px] justify-between overflow-hidden rounded-[20px] bg-[#70B5FF] px-[26px] pt-[18px]">
              <div>
                <h2 className="text-[20px] leading-[24px] font-semibold text-[#202020]">
                  환영합니다!
                  <br />
                  오늘도 즐거운 독서 되세요
                </h2>
                <button
                  className="mt-[17px] flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] bg-[#F1F1F1]/50 p-2 text-[16px] font-semibold text-[#2C2C2C]"
                  onClick={() => navigate('/channel/diary')}
                >
                  책 둘러보기
                </button>
              </div>

              <div className="translate-y-[30px] self-end">
                <img
                  src={home_reading_girl}
                  alt="home_reading_girl"
                  className="h-[163px] w-[163px]"
                />
              </div>
            </div>
          )}

          <div className="flex h-[130px] w-[590px] justify-between rounded-[20px] border border-[#00FF84] bg-white px-[26px]">
            <div className="py-[18px]">
              <h2 className="text-[20px] leading-[24px] font-semibold text-[#06BE00]">
                독서 다이어리를 작성하시고
                <br />
                읽고 느낀 것들을 글로 남겨보세요
              </h2>
              <h3 className="mt-[13px] text-[14px] font-semibold">
                함께 읽고, 함께 나누며 독서의 여운을 더 깊게 남겨보세요
              </h3>
            </div>

            <div className="flex items-end">
              <img
                src={home_writing}
                alt="home_writing"
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
          {isLoading ? (
            <PopularDiaryCardSkeleton />
          ) : (
            diaries.map((post) => (
              <PopularDiaryCard
                key={post.id}
                id={post.id}
                genre={post.book.categoryName}
                title={post.book.title}
                content={
                  post.book.subInfo?.subTitle ??
                  post.book.description?.split('. ')[0] ??
                  '설명이 없습니다'
                }
              />
            ))
          )}
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
          <div className="mt-[20px] mb-[0px] flex h-[186px] w-[590px] gap-x-[47px] rounded-[10px] bg-[#00FF84] pl-[23px]">
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
