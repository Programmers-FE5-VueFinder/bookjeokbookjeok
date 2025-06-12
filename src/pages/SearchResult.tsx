import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

export default function SearchResult() {
  const buttonName = ['통합 검색', '게시물', '사용자'];
  const [selectedBtn, setSelectedBtn] = useState<string>('통합 검색');
  const [content, setContent] = useState<string>('통합 검색');

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setContent(name);
    setSelectedBtn(name);
  };

  return (
    <>
      <div>
        <div className="relative flex h-[230px] flex-col items-center justify-center gap-[27px] pb-[40px]">
          <h1 className="textH1">검색</h1>
          <div className="relative">
            <input
              type="text"
              className="h-[60px] w-[687px] rounded-sm border-1 pl-[23px]"
              placeholder="검색어를 입력해 주세요"
            />

            <button className="absolute top-[50%] cursor-pointer border-1 justify-center">
              <IoSearch className="size-[22px]" />
            </button>
          </div>
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            {buttonName.map((item) => {
              return (
                <button
                  className={twMerge(
                    item === selectedBtn ? 'button-active' : 'button',
                    'w-[400px]',
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
    </>
  );
}
