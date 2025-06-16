import { useEffect, useState } from 'react';
import type { BookCardProps } from '../../../types/type';
import ProfileImg from '../../component/MyPage/ProfileImg';
import type { BookDetail } from '../../../types/book';
import { searchBooks } from '../../../apis/book-search';
import { FaStar } from 'react-icons/fa';

export default function BookMarkCard({
  nickname,
  // badge = '',
  createdAt,
  id,
  book_id,
}: BookCardProps) {
  const [result, setResult] = useState<BookDetail[]>([]);
  const [img, setImg] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookBody, setBookBody] = useState<string>('');
  useEffect(() => {
    const getBookData = async () => {
      if (book_id !== null && book_id !== undefined) {
        const item = await searchBooks(book_id);
        setResult(item);
      }
    };
    getBookData();
  }, [book_id]);
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
        className="relative h-[440px] w-[278px] flex-col justify-center overflow-hidden rounded-[10px] bg-white text-center text-[16px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden border-b-1 border-[#EAEAEA] text-center">
          {result.length !== 0 ? (
            <div className="relative">
              <img src={img} className="h-full w-full blur-xs" />
              <img
                src={img}
                className="absolute top-[13%] left-[30%] h-[166px] w-[113px]"
              />
            </div>
          ) : null}
        </div>
        <div className="p-[13px] text-start">
          <div className="flex items-center gap-x-[6px] bg-amber-100">
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
          <div className="absolute bottom-0 left-0 flex items-center justify-center gap-[5px] pb-[16px] pl-[13px]">
            <FaStar className="text-[#FFC918]" />
            별점
          </div>
          <div>
            <span className="absolute right-0 bottom-0 pr-[13px] pb-[18px]">
              {createdAt}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
