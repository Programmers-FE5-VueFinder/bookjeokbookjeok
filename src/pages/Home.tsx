import home_fire from "../assets/images/home_fire.png";
import home_medal from "../assets/images/home_medal.png";
import home_login from "../assets/images/home_login.png";
import home_search_man from "../assets/images/home_search_man.png";
import home_star_shine from "../assets/images/home_star_shine.png";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import home_reading_book from "../assets/images/home_reading_book.png";
import home_main_banner1 from "../assets/images/home_main_banner1.png";
import home_main_banner2 from "../assets/images/home_main_banner2.png";
import home_main_banner3 from "../assets/images/home_main_banner3.png";
import home_main_banner4 from "../assets/images/home_main_banner4.png";
import home_start_shine3 from "../assets/images/home_star_shine_x3.png";
import home_reading_girl from "../assets/images/home_reading_girl.png";

import LoginModal from "./LoginModal";
import { isLoggedIn } from "../apis/auth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { DiaryPost } from "../types/type";
import BestsellerSlider from "../components/component/Home/BestsellerSlider";
import PopularDiaryCard from "../components/component/Home/PopularDiaryCard";
import { fetchPopularDiaries } from "../apis/post";

const slides = [
  {
    title: "BOOK\nCLUB",
    description: "함께 읽고 이야기하며\n새로운 관점을 만나보세요",
    imgSrc: home_main_banner1,
    bgColor: '#FDFF98',
    boxClassName: 'flex justify-end mt-auto mr-[25px]',
    className: "flex selfitems-end w-[470px] h-auto",
  },
  {
    title: "READ\nDIARY",
    description: "읽고 쓰고 나누며,\n이야기의 숲을 가꿔보세요",
    imgSrc: home_main_banner2, 
    bgColor: '#D2EAFF',
    boxClassName: 'flex justify-end mt-auto mr-[30px]',
    className: "w-[530px] h-auto",
  },
  {
    title: "BOOK\nCOMMUNITY",
    description: "새로운 생각의 싹,\n북적북적과 함께 틔워보세요",
    imgSrc: home_main_banner3, 
    bgColor: '#FFE8B2',
    boxClassName: 'flex justify-center mt-auto mr-[25px]',
    className: "w-[370px] h-auto",
  },
  {
    title: "BOOK\nDIARY",
    description: "북적북적에서,\n나만의 이야기꽃을 피워보세요",
    imgSrc: home_main_banner4, 
    bgColor: '#CCE9FF',
    boxClassName: 'flex justify-end mt-auto',
    className: "flex justify-end w-[470px] h-auto",
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [diaries, setDiaries] = useState<DiaryPost[]>([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean | null>(null);

  const handeleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1);
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
        console.error("인기 다이어리 가져오기 실패", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
  
    getPopularDiaries();
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLoggedIn();
      setIsLoggedInUser(loggedIn);
    };
    checkLoginStatus();
  }, []);


  
  return (
    <div className="flex justify-center mx-auto w-[1220px] h-fit py-[40px] gap-x-[10px]">
      {/* left side */}
      <div className="flex w-[590px] h-fit">
        <div className="w-full h-fit">
          <div
            className="flex flex-col w-[590px] h-[840px] rounded-[20px] pt-[37px] pl-[37px]"
            style={{ backgroundColor: slides[currentSlide].bgColor}}
          >
            <div className="flex flex-col gap-y-[20px]">
              <img 
                src={home_start_shine3} 
                alt="star_shine"
                className="w-[39px] h-auto"
              />
              <h1 className="text-[36px] font-semibold whitespace-pre-line">{slides[currentSlide].title}</h1>
              <h2 className="text-[24px] font-medium whitespace-pre-line">{slides[currentSlide].description}</h2>
            </div>

            <div className={slides[currentSlide].boxClassName}>
              <img 
                src={slides[currentSlide].imgSrc} 
                alt="main_banner" 
                className={slides[currentSlide].className} 
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-between w-[135px] h-[25px] text-[20px] font-medium mt-[30px]">
              <button 
                onClick={prevSlide}
                className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#CDC8C8]/20 cursor-pointer"
              >
                <MdArrowBackIosNew className="w-[16px]"/>
              </button>
              <h3 className="text-[20px] font-medium">{currentSlide + 1} / {slides.length}</h3>
              <button 
                onClick={nextSlide}
                className="flex justify-center items-center w-[25px] h-[25px] rounded-[5px] bg-[#CDC8C8]/20 cursor-pointer"
              >
                <MdArrowForwardIos className="w-[16px]"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col items-center w-[600px] h-[840px] overflow-y-auto scroll-hidden">
        {/* section 1 */}
        <section className="flex flex-col gap-y-[15px]">

          {isLoggedInUser === false && (
            <div 
              className="flex justify-between w-[590px] h-[130px] px-[26px] pt-[18px] bg-[#00FF84] rounded-[20px]"
              style={{
                boxShadow: '0px 0px 10px rgba(0, 114, 59, 0.25)',
              }}  
            >
              <div>
                <h2 className="text-[20px] font-semibold leading-[24px]">로그인 하고 북적북적의<br/>모든 서비스를 이용해보세요</h2>
                <button 
                  className="w-[65px] h-[25px] mt-[17px] bg-[#FFFFFF]/50 text-[16px] text-[#3E3C3C] font-semibold rounded-[20px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-sm"
                  onClick={handeleOpenLoginModal}
                >
                  로그인
                </button>

                {isLoginModalOpen && <LoginModal onClose={handleCloseLoginModal} />}
              </div>

              <img 
                src={home_login} 
                alt="home_login" 
                className="w-[170px] h-auto"
              />
            </div>
          )}

          {isLoggedInUser === true && (
            <div 
            className="flex justify-between w-[590px] h-[130px] px-[26px] pt-[18px] bg-[#70B5FF] rounded-[20px]"
            style={{
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            }}  
          >
            <div>
              <h2 className="text-[20px] font-semibold leading-[24px] text-[#202020]">환영합니다!<br/>오늘도 즐거운 독서 되세요</h2>
              <button 
                className="flex items-center justify-center w-[100px] h-[30px] p-2 mt-[17px] bg-[#F1F1F1]/50 text-[16px] text-[#2C2C2C] font-semibold rounded-[20px] cursor-pointer"
                onClick={() => navigate('/channel/diary')}
              >
                책 둘러보기
              </button>
            </div>
            
            <div className="self-end">
              <img 
                src={home_reading_girl} 
                alt="home_reading_girl" 
                className="w-[163px] h-[130px]"
              />
            </div>
          </div>
          )}

          <div 
            className="flex justify-between  w-[590px] h-[130px] px-[26px] bg-white rounded-[20px] border border-[#00FF84]"
          >
            <div className="py-[18px]">
              <h2 className="text-[20px] font-semibold text-[#06BE00] leading-[24px]">독서 다이어리를 작성하시고<br/>자신만의 배지를 수집해보세요</h2>
              <h3 className="text-[14px] font-semibold mt-[13px]">작성된 다이어리와 활동에 따라 배지를 드려요</h3>
            </div>

            <div className="flex items-end">
              <img 
                src={home_medal} 
                alt="home_medal" 
                className="w-auto h-[125px]"
              />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="w-[393px] h-fit my-[40px]">
          <div className="flex flex-col gap-y-[9px] items-center">
            <img
              src={home_fire} 
              alt="fire" 
              className="w-auto h-[47px]"
            />
            <h2 className="text-[20px] font-semibold">금주의 인기 다이어리</h2>
          </div>
        </section>

        {/* section 3 */}
        <div className="flex flex-col gap-y-[15px] cursor-pointer">
          {isLoading ? (
            <p className="text-gray-500 text-sm">로딩 중입니다...</p>
          ) : (
            diaries.map((post) => (
              <PopularDiaryCard
                key={post.id}
                genre={post.book.categoryName}
                title={post.book.title}
                content={post.book.description}
              />
            ))
          )}


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
          <div className="flex justify-center items-center text-[20px] font-semibold pl-[38px]">
            <h1 className="text-[#333333]">지금! 주목 받는 <span className="text-[#08C818]">베스트셀러</span></h1> 
            <img 
              src={home_search_man} 
              alt="search_man"
              className="w-[319px] h-auto" 
            />
          </div>

          {/* 베스트셀러 슬라이드 */}
          <div className="flex flex-col items-center w-[590px] h-fit py-[27px] rounded-[20px] bg-[#FFF5AA]">
            <BestsellerSlider />
          </div>
        </section>

        {/* section 5 */}
        <section>
          <div className="flex gap-x-[47px] w-[590px] h-[186px] mb-[0px] bg-[#00FF84] rounded-[10px] pl-[23px] mt-[20px]">
            <div>  
              <img 
                src={home_star_shine} 
                alt="star_shine" 
                className="mt-[36px] mb-[22px]"
              />
              <h1 className="text-[20px] font-semibold">북적북적과 함께<br />건강한 독서 습관 만들어보세요!</h1>
            </div>

            <img 
              src={home_reading_book} 
              alt="reading_book" 
            />
          </div>
        </section>
      </div>
    </div>
  );
}
 