import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoMdPersonAdd } from 'react-icons/io';

export default function BookClub() {
  const [selectedBtn, setSelectedBtn] = useState<string>('클럽 정보');
  const buttonName = ['클럽 정보', '클럽 멤버', '토론장'];
  const memberRef = useRef<HTMLDivElement>(null);

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  const member = document.getElementById('member');
  const scrollY = window.scrollY;

  const memberPosition = Math.floor(
    scrollY + member!.getBoundingClientRect().top,
  );

  useEffect(() => {
    if (selectedBtn === '클럽 멤버') {
      memberRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (scrollY < memberPosition) {
      setSelectedBtn('클럽 정보');
    }
  }, [selectedBtn, memberPosition, scrollY]);
  return (
    <>
      <div>
        {/* 클럽 이름 에리어 */}
        <div className="relative flex min-h-[160px] content-center justify-center">
          <span className="flex items-center justify-center text-[32px] font-bold">
            클럽 이름
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#FAFAFA]">
          {/* 버튼 에리어 */}
          <div className="sticky top-0 z-50 flex h-[40px] w-screen content-center items-center justify-center self-start bg-white shadow-lg shadow-gray-100">
            <div>
              {buttonName.map((item) => {
                return (
                  <button
                    className={twMerge(
                      item === selectedBtn ? 'button-active' : 'button',
                    )}
                    onClick={handleContentButton}
                    key={item}
                    name={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full justify-center p-[100px] text-wrap">
            <div className="flex w-[900px] flex-col">
              <div className="clubInfo">
                <IoMdInformationCircleOutline />
                <span>클럽 정보</span>
              </div>
              <span>sample</span>
              <div id="member" ref={memberRef}>
                <div className="clubInfo mt-[40px]">
                  <IoMdPerson />
                  <span>클럽 멤버</span>
                  <span>00명</span>
                </div>
                <span>sample</span>
              </div>
              <div>
                <div className="clubInfo mt-[40px]">
                  <IoMdPersonAdd />
                  <span>가입 신청</span>
                  <span>00명</span>
                </div>
                <div>sample</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
