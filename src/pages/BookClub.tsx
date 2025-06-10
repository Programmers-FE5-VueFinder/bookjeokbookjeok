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

  useEffect(() => {
    if (selectedBtn === '클럽 멤버') {
      memberRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setSelectedBtn('클럽 정보');
    }, 500);
  }, [selectedBtn]);
  return (
    <>
      <div>
        {/* 클럽 이름 에리어 */}
        <div className="relative flex h-[200px] content-center justify-center shadow shadow-gray-200">
          <span className="flex items-center justify-center text-[32px] font-bold">
            클럽 이름
          </span>
          {/* 버튼 에리어 */}
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
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
        <div className="flex justify-center bg-[#FAFAFA]">
          <div className="flex w-full justify-center p-[100px] text-wrap">
            <div className="flex w-[900px] flex-col">
              <div className="flex items-center gap-[5px]">
                <IoMdInformationCircleOutline />
                <span>클럽 정보</span>
              </div>
              <span>sample</span>
              <div id="targetMember" ref={memberRef}>
                <div className="mt-[40px] flex items-center gap-[5px]">
                  <IoMdPerson />
                  <span>클럽 멤버</span>
                  <span>00명</span>
                </div>
                <span>sample</span>
              </div>
              <div>
                <div className="mt-[40px] flex items-center gap-[5px]">
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
