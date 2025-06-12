import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

import home_fire from "../assets/images/home_fire.png";
import home_medal from "../assets/images/home_medal.png";
import home_login from "../assets/images/home_login.png";
import home_search_man from "../assets/images/home_search_man.png";
import home_reading_book from "../assets/images/home_reading_book.png";
import home_star_shine from "../assets/images/home_star_shine.png";
import home_main_banner1 from "../assets/images/home_main_banner1.png";

import PopularDiaryCard from "../components/component/Home/PopularDiaryCard";
import LoginModal from "./LoginModal";
import { useState } from "react";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handelOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  }

  return (
    <div className="flex justify-center gap-x-[14px] mx-auto w-[1220px] py-[40px] bg-red-100">
      {/* left side */}
      <div className="w-[590px] h-[894px]">
        <div className="flex flex-col w-[590px] h-[840px] rounded-[20px] pt-[37px] pl-[37px] pr-[25px] bg-[#FDFF98]">
          <div className="flex flex-col gap-y-[20px]">
            <img 
              src={home_star_shine} 
              alt="star_shine"
              className="w-[39px] h-auto"
            />
            <h1 className="text-[36px] font-semibold">BOOK<br />CLUB</h1>
            <h2 className="text-[24px] font-medium">함께 읽고 이야기하며<br />새로운 관점을 만나보세요</h2>
          </div>

          <div className="flex justify-end mt-auto">
            <img 
              src={home_main_banner1} 
              alt="main_banner" 
              className="flex justify-endw-[470px] h-auto"
            />
          </div>

        </div>

        <div className="flex justify-center">
          <div className="flex justify-between w-[135px] h-[25px] text-[20px] font-medium mt-[30px]">
            <button className="flex justify-center items-center w-[25px] h-25px] rounded-[5px] bg-[#F5F4F4]">
              <MdArrowBackIosNew className="w-[18px]"/>
            </button>
            <h3 className="text-[20px] font-medium">1 / 2</h3>
            <button className="flex justify-center items-center w-[25px] h-25px] rounded-[5px] bg-[#F5F4F4]">
              <MdArrowForwardIos className="w-[18px]"/>
            </button>
          </div>
        </div>
      </div>

      {/* rigth side */}
      <div className="flex flex-col items-center bg-white w-[590px] h-fit">
        {/* section 1 */}
        <section className="flex flex-col gap-y-[15px]">
          <div 
            className="flex justify-between w-[590px] h-[130px] px-[26px] pt-[18px] bg-[#00FF84] rounded-[20px]"
            style={{
              boxShadow: '0px 0px 10px rgba(0, 114, 59, 0.25)',
            }}  
          >
            <div>
              <h2 className="text-[20px] font-semibold leading-[24px]">로그인 하고 북적북적의<br/>모든 서비스를 이용해보세요</h2>
              <button 
                className="w-[65px] h-[25px] mt-[17px] bg-[#80FFC2] text-[16px] text-black font-semibold rounded-[20px]"
                onClick={handelOpenLoginModal}
              >
                로그인
              </button>

              {isLoginModalOpen && <LoginModal onClose={handleCloseLoginModal} />}
            </div>

            <img 
              src={home_login} 
              alt="home_loing" 
              className="w-[170px] h-auto"
            />

          </div>

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
        <div className="flex flex-col gap-y-[15px]">
          <PopularDiaryCard />
          <PopularDiaryCard />
          <PopularDiaryCard />
          <PopularDiaryCard />
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

          <div className="flex flex-col items-center w-[590px] h-[412px] rounded-[20px] bg-[#FFF5AA]">
            <h1 className="text-[16px] font-semibold mt-[27px] mb-[21px]">사는게 뭐라고</h1>
            <div className="w-[183px] h-[278px] text-center border">책</div>
            <div className="w-auto h-[25px] mt-[23px]">2/6</div>
          </div>
        </section>


        {/* section 5 */}
        <section>
          <div className="flex gap-x-[47px] w-[590px] h-[186px] bg-[#00FF84] rounded-[10px] pl-[23px] mt-[20px]">
            <div>  
              <img 
                src={home_star_shine} 
                alt="star_shine" 
                className="mt-[36px] mb-[22px]"
              />
              <h1 className="text-[20px] font-semibold">북적북적과 함께<br /> 건강한 독서 습관 만들어보세요!</h1>
            </div>

            <img 
              src={home_reading_book} 
              alt="" 
              className=""
            />

          </div>
        </section>
      
      </div>


    </div>
  );
}
 