import { useEffect, useState } from 'react';
import type { BookCardProps } from '../../../types/type';
import ProfileImg from '../../component/MyPage/ProfileImg';
import type { BookData, BookDetail } from '../../../types/book';
import { FaStar } from 'react-icons/fa';
import { getBookStars } from '../../../apis/book-review';
import supabase from '../../../utils/supabase';
import BookPage from '../book-detail/BookPage';
import { searchBooks } from '../../../apis/book-search';

export default function BookMarkCard({
  nickname,
  // badge = '',
  createdAt,
  id,
  book_id,
}: BookCardProps) {
  const [result, setResult] = useState<BookData[]>([]);
  const [bookMark, setBookMark] = useState<BookDetail[] | null>(null);
  const [avgStar, setAvgStar] = useState<number>(0);
  const [img, setImg] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const [bookBody, setBookBody] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    const getBookMarkData = async () => {
      if (book_id !== null && book_id !== undefined) {
        try {
          const getBookMark = await searchBooks(book_id);
          setBookMark(getBookMark);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getBookMarkData();

    if (bookMark !== undefined) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const getBookData = async () => {
      if (book_id !== null && book_id !== undefined) {
        const { data: book, error } = await supabase
          .from('book')
          .select('*')
          .eq('id', book_id);
        console.error(error);
        setResult(book!);
      }
    };
    getBookData();
    const getStars = async () => {
      if (book_id !== null && book_id !== undefined) {
        const bookStar = await getBookStars(book_id);
        let score = 0;
        for (let i = 0; i < bookStar.length; i++) {
          score += bookStar[i]!;
        }
        if (bookStar.length > 0) {
          const avgScore = score / bookStar.length;
          setAvgStar(Math.floor(avgScore * 10) / 10);
        } else {
          setAvgStar(0);
        }
      }
    };
    getStars();
  }, []);

  useEffect(() => {
    if (result.length !== 0) {
      setImg(result[0].cover);
      setBookBody(result[0].description);
      setBookTitle(result[0].title);
    }
  }, [result]);

  return (
    <>
      <div
        className="relative h-[440px] w-[278px] flex-col justify-center overflow-hidden rounded-[10px] bg-white text-center text-[16px] transition-transform duration-300 hover:scale-103"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
        onClick={handleOpen}
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden border-b-1 border-[#EAEAEA] text-center">
          {result.length !== 0 ? (
            <div className="relative">
              <img src={img!} className="h-full w-full blur-xs" />
              <img
                src={img!}
                className="absolute top-[13%] left-[30%] h-[166px] w-[113px]"
              />
            </div>
          ) : null}
        </div>
        <div className="p-[13px] text-start">
          <div className="flex items-center gap-x-[6px]">
            <div className="size-[25px] overflow-hidden rounded-full">
              <ProfileImg id={id} />
            </div>
            <div className="flex items-center">
              <div className="text-[16px] font-semibold">{nickname}</div>
            </div>
          </div>

          <div className="mt-[15px] truncate text-[18px] font-bold">
            <span>{bookTitle}</span>
          </div>
          <div className="mt-[15px] line-clamp-2">{bookBody}</div>
          {/* 좋아요, 댓글 */}
          <div className="absolute bottom-0 left-0 flex items-center justify-center gap-[5px] pb-[17px] pl-[13px]">
            <FaStar className="text-[#FFC918]" />
            {avgStar}
          </div>
          <div>
            <span className="absolute right-0 bottom-0 pr-[13px] pb-[18px]">
              {createdAt}
            </span>
          </div>
        </div>
      </div>
      {bookMark && (
        <BookPage
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          bookDetail={bookMark[0]}
        />
      )}
    </>
  );
}
