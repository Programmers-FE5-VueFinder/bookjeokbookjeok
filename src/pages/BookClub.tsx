import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoMdPersonAdd } from 'react-icons/io';
import {
  deleteBookClub,
  fetchBookClub,
  isBookClubOwner,
  leaveBookClub,
} from '../apis/book-club';
import { Link, useNavigate, useParams } from 'react-router';
import UserCard from '../components/common/UserCard';

export default function BookClub() {
  const [selectedBtn, setSelectedBtn] = useState<string>('클럽 정보');
  const buttonName = ['클럽 정보', '클럽 멤버', '채팅방'];
  const memberRef = useRef<HTMLDivElement>(null);

  const bookclub_id = useParams().bookclub_id;
  const [bookclub, setBookclub] = useState<Bookclub>();
  const [isOwner, setIsOwner] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  const handleDeleteBookclub = () => {
    navigate('/');
    deleteBookClub(bookclub_id!);
  };

  const handleLeaveBookclub = () => {
    navigate('/');
    leaveBookClub(bookclub_id!);
  };

  useEffect(() => {
    const fetchBookclub = async () => {
      setBookclub(await fetchBookClub(bookclub_id!));
      setIsOwner(await isBookClubOwner(bookclub_id!));
      setIsLoading(false);
    };
    fetchBookclub();
  }, [bookclub_id]);
  console.log(bookclub);

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
    if (selectedBtn === '채팅방') {
      navigate(`/bookclub/${bookclub_id}/chat`);
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
              {bookclub!.name}
            </span>
            {/* 버튼 에리어 */}
            <div className="absolute bottom-0 flex h-[40px] w-screen content-center items-center justify-center self-start bg-white shadow-lg shadow-gray-100">
              <div className="flex w-[900px] flex-row">
                {buttonName.map((item) => {
                  return (
                    <button
                      className={twMerge(
                        item === selectedBtn ? 'button-active' : 'button',
                        'cursor-pointer',
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
              {isOwner ? (
                <div className="mt-[20px] flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <Link to={`/edit-bookclub/${bookclub_id}`}>
                      <button className="h-[41px] w-[107px] cursor-pointer rounded hover:border hover:border-[#DEDEDE] hover:bg-[#EDEDED]">
                        클럽 정보 수정
                      </button>
                    </Link>
                    <button className="h-[41px] w-[107px] cursor-pointer rounded hover:border hover:border-[#DEDEDE] hover:bg-[#EDEDED]">
                      모집 글 작성
                    </button>
                  </div>
                  <button
                    className="h-[41px] w-[82px] cursor-pointer rounded text-red-500 hover:border hover:border-[#DEDEDE] hover:bg-[#EDEDED]"
                    onClick={handleDeleteBookclub}
                  >
                    클럽 삭제
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-[20px] flex flex-row justify-end">
                    <button
                      className="h-[41px] w-[82px] cursor-pointer rounded text-red-500 hover:border hover:border-[#DEDEDE] hover:bg-[#EDEDED]"
                      onClick={handleLeaveBookclub}
                    >
                      클럽 탈퇴
                    </button>
                  </div>
                </>
              )}
              <div className="mt-[40px]">
                <div className="clubInfo">
                  <IoMdPersonAdd />
                  <p>
                    가입 신청{' '}
                    <span className="font-bold text-[#08C818]">0</span>명
                  </p>
                </div>
                <div>{/* 가입 신청 목록 */}</div>
              </div>

              <div className="mt-[40px]">
                <div className="clubInfo">
                  <IoMdInformationCircleOutline />
                  <span>클럽 정보</span>
                </div>
                <span
                  dangerouslySetInnerHTML={{ __html: bookclub!.info! }}
                ></span>
              </div>
              <div
                className="mt-[40px] scroll-m-[200px]"
                id="member"
                ref={memberRef}
              >
                <div className="clubInfo">
                  <IoMdPerson />
                  <p>
                    클럽 멤버{' '}
                    <span className="font-bold text-[#08C818]">
                      {bookclub!.member?.length}
                    </span>
                    명
                  </p>
                </div>
                <div className="flex flex-row gap-5">
                  {bookclub!.member?.map((member) => (
                    <UserCard key={member.id} user={member} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
