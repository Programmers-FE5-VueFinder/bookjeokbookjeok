import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import BookCard from '../components/common/BookCard';
import UserCard from '../components/common/UserCard';

export default function SearchResult() {
  const buttonName = ['통합 검색', '게시물', '사용자'];
  const [selectedBtn, setSelectedBtn] = useState<string>('통합 검색');

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  return (
    <>
      <div className="justify-center, flex flex-col items-center border-1">
        <div className="relative flex h-[230px] w-full flex-col items-center justify-center gap-[27px] pb-[40px] shadow shadow-gray-200">
          <h1 className="textH1">검색</h1>
          <div className="relative flex rounded-sm border-2 border-[#d2d2d2]">
            <input
              type="text"
              className="h-[60px] w-[687px] rounded-sm pl-[23px]"
              placeholder="검색어를 입력해 주세요"
            />

            <button className="absolute top-[32.5%] right-5 cursor-pointer justify-center">
              <IoSearch className="size-[22px]" />
            </button>
          </div>
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            <div className="flex w-[1200px] items-center justify-center">
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
        <div className="flex w-full flex-col items-center justify-center bg-[#FAFAFA]">
          <div className="m-[100px] max-w-[1196px]">
            <span className="textT2">사용자</span>
            <div className="flex flex-col items-center justify-center">
              <div className="mt-[26px] grid gap-[28px] md:grid-cols-2 lg:grid-cols-4">
                <UserCard />
                <BookCard />
                <BookCard />
                <BookCard />
              </div>
            </div>
          </div>
          <div className="m-[50px] max-w-[1196px]">
            <span className="textT2">게시물</span>
            <div className="flex flex-col items-center justify-center">
              <div className="mt-[26px] grid gap-[28px] md:grid-cols-2 lg:grid-cols-4">
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
