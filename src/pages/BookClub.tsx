import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoMdPersonAdd } from 'react-icons/io';
import { fetchBookClub } from '../apis/book-club';
import { useParams } from 'react-router';

export default function BookClub() {
  const [selectedBtn, setSelectedBtn] = useState<string>('클럽 정보');
  const buttonName = ['클럽 정보', '클럽 멤버', '토론장'];
  const memberRef = useRef<HTMLDivElement>(null);

  const bookclub_id = useParams().bookclub_id;
  const [bookclubInfo, setBookclubInfo] = useState<Bookclub>();

  const [isLoading, setIsLoading] = useState(true);

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  useEffect(() => {
    const fetchBookclub = async () => {
      setBookclubInfo(await fetchBookClub(bookclub_id!));
      setIsLoading(false);
    };
    fetchBookclub();
  }, [bookclub_id]);

  useEffect(() => {
    if (selectedBtn === '클럽 멤버') {
      memberRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if (selectedBtn === '클럽 정보') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBtn]);

  if (isLoading) return <>로딩중..</>;
  return (
    <>
      <div>
        {/* 클럽 이름 에리어 */}
        <div className="sticky top-0 flex min-h-[200px] content-center justify-center self-start bg-white">
          <div className="relative flex content-center justify-center">
            <span className="mb-[40px] flex items-center justify-center text-[32px] font-bold">
              {bookclubInfo!.name}
            </span>
            {/* 버튼 에리어 */}
            <div className="absolute bottom-0 flex h-[40px] w-screen content-center items-center justify-center self-start bg-white shadow-lg shadow-gray-100">
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
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#FAFAFA]">
          <div className="flex w-full justify-center text-wrap">
            <div className="mx-[100px] flex w-[900px] scroll-m-[200px] flex-col">
              <div className="mt-[100px]">
                <div className="clubInfo">
                  <IoMdPersonAdd />
                  <span>가입 신청</span>
                  <span>00명</span>
                </div>
                <div>sample</div>
              </div>

              <div className="mt-[40px]">
                <div className="clubInfo">
                  <IoMdInformationCircleOutline />
                  <span>클럽 정보</span>
                </div>
                <span
                  dangerouslySetInnerHTML={{ __html: bookclubInfo!.info }}
                ></span>
              </div>
              <div className="scroll-m-[200px]" id="member" ref={memberRef}>
                <div className="clubInfo mt-[40px]">
                  <IoMdPerson />
                  <span>클럽 멤버</span>
                  <span>00명</span>
                </div>
                <span>멤버 0_0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
