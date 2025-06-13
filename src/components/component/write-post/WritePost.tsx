// import './quillOverride.ts';
import { useRef, useState } from 'react';
import ReactQuillEditor from './ReactQuillEditor';
import { IoIosArrowDown } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { MdOutlineSearch } from 'react-icons/md';
import BookSearchModal from '../BookSearchModal';
import type { BookDetail } from '../../../types/book';
import BookHTML from './BookHTML';

export default function WritePost({
  isCreateBookClub,
}: {
  isCreateBookClub?: boolean;
}) {
  //path : diary, bookclub, freetalk
  const path = useParams();
  const navigate = useNavigate();

  const [seletText, setSelectText] = useState('채널선택');
  const [category, setCategory] = useState(path.category);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => setShowModal(false);

  const categoryToggleHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const text = e.currentTarget.textContent as string;
    if (text === '다이어리') {
      setCategory('diary');
    } else {
      setCategory('');
    }

    setSelectText(text);
    setCategoryToggle((toggle) => !toggle);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const body = value.toString();

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
      <main className="flex h-screen">
        <div className="flex grow-1 flex-col">
          {!isCreateBookClub && (
            <div
              id="categorySelect"
              onClick={() => setCategoryToggle((toggle) => !toggle)}
              style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
              className="ml-[calc(1300px - 1200px)] relative mt-[15px] flex w-fit cursor-pointer items-center justify-center gap-[4px] rounded-[5px] bg-[#F1F1F1] px-[10px] py-[2px] text-[14px]"
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
          <form
            className="w-ful flex grow-1 flex-col justify-between"
            onSubmit={submitHandler}
          >
            <div className="flex h-full flex-col">
              <input
                ref={titleRef}
                type="text"
                placeholder={`${isCreateBookClub ? '클럽 이름을 입력해주세요.' : '제목을 입력해주세요.'}`}
                className="h-fir mx-auto my-[20px] block w-[1200px] max-w-[1200px] pl-[5px] text-[24px] text-[#666666]"
              />
              {selectedBook ? (
                <BookHTML
                  setShowModal={setShowModal}
                  setSeletedBook={setSeletedBook}
                  selectedBook={selectedBook}
                />
              ) : (
                <button
                  style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
                  onClick={() => setShowModal(true)}
                  className="flex h-[130px] w-[100px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#333] text-[rgba(153,153,153,.4)]"
                >
                  <MdOutlineSearch />
                  도서 검색
                </button>
              )}
              {selectedBook && (
                <div
                  style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
                  className="mt-[15px] flex w-fit gap-[5px]"
                >
                  {/* {ratings.map((num) => {
                    return (
                      <button className="cursor-pointer">
                        <FaStar
                          key={num}
                          onClick={(e) => {
                            e.preventDefault();
                            setRating(num);
                          }}
                          // onMouseEnter={}
                          className="text-[#DFDFDF] hover:text-[#FFCC00]"
                        />
                      </button>
                    );
                  })} */}
                </div>
              )}
              <ReactQuillEditor
                // bodyRef={bodyRef}
                setValue={setValue}
                value={value}
              />
            </div>
            <div className="flex h-[60px] min-h-[60px] w-[100%] justify-center border-t border-t-[#D5D5D5]">
              <div className="flex h-[100%] w-[1200px] items-center justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="flex cursor-pointer items-center gap-[10px] py-[20px] text-[16px] hover:font-bold"
                >
                  <MdArrowBack />
                  뒤로가기
                </button>
                <button
                  type="submit"
                  onClick={() => console.log(value)}
                  className="cursor-pointer rounded-[5px] bg-[#F1F1F1] px-[23px] py-[8px] text-[14px] hover:bg-[#41D94D] hover:font-semibold hover:text-[#fff]"
                >
                  발행하기
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* 책 검색 모달 */}
        <BookSearchModal
          showModal={showModal}
          onClose={onClose}
          setSeletedBook={setSeletedBook}
        />
      </main>
    </>
  );
}
