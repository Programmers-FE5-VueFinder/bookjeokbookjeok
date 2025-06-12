import { useRef, useState } from 'react';
import ReactQuillEditor from './ReactQuillEditor';
import { IoIosArrowDown } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import { useParams } from 'react-router';
import type ReactQuill from 'react-quill-new';

export default function WritePost({
  isCreateBookClub,
}: {
  isCreateBookClub?: boolean;
}) {
  //path : diary, bookclub, freetalk
  const path = useParams();

  const [seletText, setSelectText] = useState('채널선택');
  const [category, setCategory] = useState(path.category);
  const [categoryToggle, setCategoryToggle] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<ReactQuill>(null);

  const categoryToggleHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const text = e.target.textContent;
    if (text === '다이어리') setCategory('diary');
    setSelectText(text);
    setCategoryToggle((toggle) => !toggle);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (!title || !body) return; // toastify로 제목이나 내용을 모두 입력해 달라는 경고문구 추가

    switch (category) {
      case 'diary': {
        // diary post 생성 api
        return;
      }
      case 'community': {
        // community post 생성 api
        return;
      }
      case 'book-club': {
        // book-club post 생성 api
        return;
      }
      default: {
        // book-club 생성 api
      }
    }
  };

  return (
    <>
      <section className="h-screen">
        {!isCreateBookClub && (
          <div
            id="categorySelect"
            onClick={() => setCategoryToggle((toggle) => !toggle)}
            style={{ marginLeft: 'calc((100% - 1186px) / 2)' }}
            className="ml-[calc(1300px - 1200px)] relative mt-[28px] flex w-fit cursor-pointer items-center justify-center gap-[4px] rounded-[5px] bg-[#F1F1F1] px-[10px] py-[2px] text-[14px]"
          >
            {seletText} <IoIosArrowDown />
            {categoryToggle && (
              <div className="absolute top-[25px] z-1 w-full rounded-br-[5px] rounded-bl-[5px] bg-[#fff]">
                <ul className="shadow-[0_0_5px_rgba(0,0,0,0.25)]">
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    다이어리
                  </li>
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    독서모임
                  </li>
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer rounded-br-[4px] rounded-bl-[4px] px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    자유채널
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <form className="flex h-full w-full flex-col" onSubmit={submitHandler}>
          <input
            ref={titleRef}
            type="text"
            placeholder={`${isCreateBookClub ? '클럽 이름을 입력해주세요.' : '제목을 입력해주세요.'}`}
            className="mx-auto mt-[30px] mb-[20px] block h-[60px] w-[1200px] max-w-[1200px] pl-[5px] text-[36px] text-[#666666]"
          />
          <ReactQuillEditor category={category} bodyRef={bodyRef} />
          <div className="flex h-[60px] min-h-[60px] w-[100%] justify-center border-t border-t-[#D5D5D5]">
            <div className="flex h-[100%] w-[1200px] items-center justify-between">
              <button className="flex items-center gap-[10px] text-[16px] hover:cursor-pointer hover:font-bold">
                <MdArrowBack />
                뒤로가기
              </button>
              <button
                type="submit"
                className="rounded-[5px] bg-[#F1F1F1] px-[23px] py-[8px]"
              >
                저장하기
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
