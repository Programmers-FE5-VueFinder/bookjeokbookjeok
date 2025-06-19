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
import type { PostDetail } from '../../../types/post.ts';
import { checkBook, createPost, editPost } from '../../../apis/post.ts';
import { searchBooks } from '../../../apis/book-search.ts';

export default function WritePost({
  isCreateBookClub,
  editPostData,
  bookTitle,
}: {
  isCreateBookClub?: boolean;
  editPostData?: PostDetail;
  bookTitle?: string;
}) {
  const path = useParams();
  const navigate = useNavigate();
  const bookclubId = path.bookclub_id;
  const [category, setCategory] = useState('');
  console.log('bookclubId: ', bookclubId);
  const [rating, setRating] = useState<number | undefined>();
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  console.log(category);

  const isLogIn = useAuthStore((state) => state.isLogin);
  const session = useAuthStore((state) => state.session);

  const onClose = () => setShowModal(false);

  const findThumbnailImage = (body: string) => {
    if (selectedBook) {
      return selectedBook.cover;
    }
    const match = body.match(/<img[^>]+src="([^"]+)"[^>]*>/);
    const image = match ? match[1] : null;
    return image;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef!.current?.value.toString();
    const body = value.toString();
    const image = selectedBook?.cover
      ? selectedBook.cover
      : findThumbnailImage(body);
    const bookInfo = {
      id: selectedBook?.isbn13,
      star: rating,
    };

    console.log(value.trim() === '<p><br></p>');

    if (!title || value.trim() === '<p><br></p>') {
      if (!title) {
        if (category === 'diary' || category === 'community') {
          Toastfy('error', '제목을 작성 해주세요');
        } else {
          Toastfy('error', '클럽 이름을 작성 해주세요');
        }
      } else if (value.trim() === '<p><br></p>') {
        if (category === 'diary' || category === 'community') {
          Toastfy('error', '본문을 작성 해주세요');
        } else {
          Toastfy('error', '클럽 정보를 작성 해주세요');
        }
      } else if (category === 'diary' && !selectedBook) {
        Toastfy('error', '도서를 선택해 주세요.');
      }
      return;
    }

    // 게시물 수정
    if (editPostData) {
      try {
        const response = await editPost(
          editPostData.id,
          title,
          body,
          image,
          category,
        );
        console.log(response);
        navigate(`/post/${editPostData.id}`);
        return;
      } catch (e) {
        console.log(e);
        Toastfy('error', '수정에 실패했습니다');
      }
    }

    /* 북클럽 수정 */
    if (bookclubId && isCreateBookClub) {
      editBookClub(bookclubId, title, body);
      navigate(`/bookclub/${bookclubId}`);
      Toastfy('success', '수정이 완료되었습니다');
      return;
    }

    /* 게시글 생성 */
    switch (category) {
      case 'diary': {
        try {
          const check = await checkBook(selectedBook!.isbn13);
          if (!check) {
            const { data } = await supabase
              .from('book')
              .insert({
                id: selectedBook!.isbn13,
                title: selectedBook!.title,
                author: selectedBook!.author,
                description: selectedBook!.description,
                cover: selectedBook!.cover,
                categoryId: selectedBook!.categoryId,
                categoryName: selectedBook!.categoryName,
              })
              .select()
              .single();

            const post_id = await createPost(
              session!.user.id,
              title,
              body,
              image,
              category,
              data!.id,
              bookInfo,
            );
            console.log('book 중첨 x', post_id);

            navigate(`/post/${post_id}`);
            return;
          }

          const post_id = await createPost(
            session!.user.id,
            title,
            body,
            image,
            category,
            selectedBook!.isbn13,
            bookInfo,
          );
          console.log('북 중첩', post_id);
          console.log(value);

          navigate(`/post/${post_id}`);
        } catch (e) {
          console.log(e);
          Toastfy('error', '작성에 실패했습니다');
        }
        return;
      }
      case 'community': {
        // community post 생성 api
        try {
          const post_id = await createPost(
            session!.user.id,
            title,
            body,
            image,
            category,
          );
          console.log(post_id);
          navigate(`/post/${post_id}`);
        } catch (e) {
          console.log(e);
          Toastfy('error', '작성에 실패했습니다');
        }
        return;
      }
      case 'book-club': {
        const post = await createBookClubPost(title, body, image, bookclubId!);
        navigate(`/post/${post}`);
        Toastfy('success', '작성이 완료되었습니다');
        return;
      }
      default: {
        const bookclub_id = await createBookClub(title, body);
        navigate(`/bookclub/${bookclub_id}`);
        Toastfy('success', '북클럽이 생성되었습니다');
      }
    }
  };

  /* bookclubId 있을 시 정보 fetch */
  useEffect(() => {
    if (!isLogIn) navigate('/');
  }, [isLogIn]);

  useEffect(() => {
    if (path.channelId) setCategory(path.channelId as string);
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

    if (editPostData) {
      titleRef!.current!.value = editPostData.title;
      setValue(editPostData.body);
      setCategory(editPostData.category);
    }

    if (editPostData?.book && category === 'diary') {
      const seletedBookFind = async () => {
        const selectedBookId = editPostData!.book!.id;
        const bookList = await searchBooks(bookTitle!);
        const selectedBook = bookList.find(
          (book: BookDetail) => book.isbn13 === selectedBookId,
        );
        setSeletedBook(selectedBook);
      };
      seletedBookFind();
      console.log(category);
    }
  }, [bookclubId, isCreateBookClub, editPostData]);

  if (editPostData) {
    return (
      <>
        <main className="flex h-screen">
          <div className="flex grow-1 flex-col">
            {!bookclubId && (
              <CategorySelect category={category} setCategory={setCategory} />
            )}
            <form
              className="w-ful flex grow-1 flex-col justify-between"
              onSubmit={(e) => {
                if (!session || !session.user) {
                  Toastfy(
                    'error',
                    '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.',
                  );
                  navigate('/');
                  return;
                }
                submitHandler(e);
              }}
            >
              <div className="flex h-full flex-col">
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="제목을 입력해 주세요."
                  className="h-fir mx-auto my-[20px] block w-[1200px] max-w-[1200px] pl-[5px] text-[24px] text-[#666666]"
                />

                {selectedBook ? (
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
                  selectedBook={selectedBook!}
                />
              </div>
              <div className="flex h-[60px] min-h-[60px] w-[100%] justify-center border-t border-t-[#D5D5D5]">
                <div className="flex h-[100%] w-[1200px] items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                    className="flex cursor-pointer items-center gap-[10px] py-[20px] text-[16px] hover:font-bold"
                  >
                    <MdArrowBack />
                    뒤로가기
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-[5px] bg-[#F1F1F1] px-[23px] py-[8px] text-[14px] hover:bg-[#41D94D] hover:font-semibold hover:text-[#fff]"
                  >
                    수정하기
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

  return (
    <>
      <main className="flex h-screen">
        <div className="flex grow-1 flex-col">
          {!bookclubId && !isCreateBookClub && (
            <CategorySelect category={category} setCategory={setCategory} />
          )}
          <form
            className="w-ful flex grow-1 flex-col justify-between"
            onSubmit={(e) => {
              if (!session || !session.user) {
                Toastfy(
                  'error',
                  '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.',
                );
                navigate('/');
                return;
              }
              submitHandler(e);
            }}
          >
            <div className="flex h-full flex-col">
              <input
                ref={titleRef}
                type="text"
                placeholder={`${isCreateBookClub ? '클럽 이름을 입력해주세요.' : '제목을 입력해주세요.'}`}
                className="h-fir mx-auto my-[20px] block w-[1200px] max-w-[1200px] pl-[5px] text-[24px] text-[#666666]"
              />

              {!bookclubId && !isCreateBookClub && (
                <>
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
                </>
              )}
              <ReactQuillEditor
                category={category}
                setValue={setValue}
                value={value}
                selectedBook={selectedBook!}
              />
            </div>
            <div className="flex h-[60px] min-h-[60px] w-[100%] justify-center border-t border-t-[#D5D5D5]">
              <div className="flex h-[100%] w-[1200px] items-center justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  className="flex cursor-pointer items-center gap-[10px] py-[20px] text-[16px] hover:font-bold"
                >
                  <MdArrowBack />
                  뒤로가기
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-[5px] bg-[#F1F1F1] px-[23px] py-[8px] text-[14px] hover:bg-[#41D94D] hover:font-semibold hover:text-[#fff]"
                >
                  {isCreateBookClub
                    ? bookclubId
                      ? '수정하기'
                      : '생성하기'
                    : '발행하기'}
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
