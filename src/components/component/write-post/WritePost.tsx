import { useEffect, useRef, useState } from 'react';
import ReactQuillEditor from './ReactQuillEditor';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { MdOutlineSearch } from 'react-icons/md';
import BookSearchModal from '../BookSearchModal';
import type { BookDetail } from '../../../types/book';
import SelectBookInfo from './SelectBookInfo';
import BookRating from './BookRating';
import CategorySelect from './CategorySelect';
import { useAuthStore } from '../../../store/authStore';
import {
  createBookClub,
  createBookClubPost,
  editBookClub,
  fetchBookClub,
} from '../../../apis/book-club.ts';
import supabase from '../../../utils/supabase';
import Toastfy from '../../common/Toastfy.tsx';
import { createPost } from '../../../apis/post.ts';

export default function WritePost({
  isCreateBookClub,
}: {
  isCreateBookClub?: boolean;
}) {
  //path : diary, freetalk
  const path = useParams();
  const bookclubId = path.bookclub_id;
  const navigate = useNavigate();
  const [category, setCategory] = useState('diary');
  const [rating, setRating] = useState<number | undefined>();
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const isLogIn = useAuthStore((state) => state.isLogin);
  const session = useAuthStore((state) => state.session);
  console.log(session?.user.id);

  useEffect(() => {
    if (!isLogIn) navigate('/');
  }, [isLogIn]);

  const onClose = () => setShowModal(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const body = value.toString();

    //정규식으로 썸네일 뽑기
    const match = body.match(/<img[^>]+src="([^"]+)"[^>]*>/);
    const image = match ? match[1] : null;

    if (!title || !body) {
      if (!title) Toastfy('error', '제목을 작성 해주세요');
      if (body === '<p><br></p>') Toastfy('error', '본문을 작성 해주세요');
      return;
    }

    const bookInfo = {
      id: selectedBook!.isbn13,
      star: rating,
    };

    /* 북클럽 수정 */
    if (bookclubId) {
      editBookClub(bookclubId, title, body);
      navigate(`/bookclub/${bookclubId}`);
      return;
    }

    switch (category) {
      case 'diary': {
        try {
          const { data } = await supabase
            .from('book')
            .insert({
              id: selectedBook!.isbn13,
              title: selectedBook!.title,
              author: selectedBook!.author,
              description: selectedBook!.description,
              categoryId: selectedBook!.categoryId,
              categoryName: selectedBook!.categoryName,
            })
            .select()
            .single();

          const response = await createPost(
            session!.user.id,
            title,
            body,
            image,
            category,
            data!.id,
            bookInfo,
          );
          console.log(response);

          if (bookInfo.id) {
            await supabase.from('book_tag').insert({
              book_id: bookInfo.id,
              star: bookInfo.star,
              reference_category: 'diary',
              reference_id: response,
            });
          }
          // navigate('/');
        } catch (e) {
          console.log(e);
          Toastfy('error', '작성에 실패했습니다');
        }
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
          {!bookclubId && <CategorySelect setCategory={setCategory} />}
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

              {selectedBook && category === 'diary' ? (
                <SelectBookInfo
                  setShowModal={setShowModal}
                  setSeletedBook={setSeletedBook}
                  selectedBook={selectedBook}
                />
              ) : (
                <button
                  style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="flex h-[130px] w-[100px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#333] text-[rgba(153,153,153,.4)]"
                >
                  <MdOutlineSearch />
                  도서 검색
                </button>
              )}
              {selectedBook && <BookRating setRating={setRating} />}
              <ReactQuillEditor
                category={category}
                setValue={setValue}
                value={value}
                selectedBook={selectedBook}
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
