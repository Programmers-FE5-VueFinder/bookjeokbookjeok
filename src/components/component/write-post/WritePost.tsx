// import './quillOverride.ts';
import { useEffect, useRef, useState } from 'react';
import ReactQuillEditor from './ReactQuillEditor';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { MdOutlineSearch } from 'react-icons/md';
import BookSearchModal from '../BookSearchModal';
import type { BookDetail } from '../../../types/book';
import BookHTML from './BookHTML';
import {
  createBookClub,
  createBookClubPost,
  editBookClub,
  fetchBookClub,
} from '../../../apis/book-club';
import CategorySelect from './CategorySelect';
import BookRating from './BookRating';

export default function WritePost({
  isCreateBookClub,
}: {
  isCreateBookClub?: boolean;
}) {
  // 로그인 안 된 유저가 접근시
  // const isLogin = useAuthStore((state) => state.isLogin);
  // if (!isLogin) navigate('/');

  //path : diary, bookclub, freetalk
  const path = useParams();
  const bookclubId = path.bookclub_id;
  const navigate = useNavigate();

  const [category, setCategory] = useState(path.category);
  const [rating, setRating] = useState<number | null>(null);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  const onClose = () => setShowModal(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const body = value.toString();

    if (!title || !body) return; // toastify로 제목이나 내용을 모두 입력해 달라는 경고문구 추가

    /* 북클럽 수정 */
    if (bookclubId) {
      editBookClub(bookclubId, title, body);
      navigate(`/bookclub/${bookclubId}`);
      return;
    }

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
        createBookClubPost(title, body, bookclubId!);
        return;
      }
      default: {
        const bookclub_id = await createBookClub(title, body);
        navigate(`/bookclub/${bookclub_id}`);
      }
    }
  };

  useEffect(() => {
    if (bookclubId) {
      if (isCreateBookClub) {
        const setBookClubInfo = async () => {
          const bookclub = await fetchBookClub(bookclubId);
          titleRef!.current!.value = bookclub.name;
          setValue(bookclub.info!);
        };
        setBookClubInfo();
      } else {
        setCategory('book-club');
      }
    }
  }, [bookclubId, isCreateBookClub]);

  return (
    <>
      <main className="flex h-screen">
        <div className="flex grow-1 flex-col">
          {!isCreateBookClub && <CategorySelect setCategory={setCategory} />}
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
              {selectedBook && <BookRating setRating={setRating} />}
              <ReactQuillEditor setValue={setValue} value={value} />
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
