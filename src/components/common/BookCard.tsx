import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import type { BookCardProps } from '../../types/type';
import ProfileImg from '../component/MyPage/ProfileImg';
import { useEffect, useState } from 'react';
import type { BookDetail } from '../../types/book';
import { searchBooks } from '../../apis/book-search';
import { Link } from 'react-router';

export default function BookCard({
  nickname,
  // badge = '',
  title,
  body,
  image,
  likes = 0,
  comments = 0,
  createdAt,
  id,
  book_id,
  category,
}: BookCardProps) {
  const [result, setResult] = useState<BookDetail[]>([]);
  const [img, setImg] = useState<string>('');
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
    if (result.length !== 0) setImg(result[0].cover);
  }, [result]);
  // console.log(result);
  console.log(category);
  // console.log(book_id);
  return (
    <>
      <div
        className="relative h-[440px] w-[278px] flex-col justify-center overflow-hidden rounded-[10px] bg-white text-center text-[16px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden border-b-1 border-[#EAEAEA] text-center">
          {image ? (
            <img
              src={image}
              alt="post"
              className="h-full w-full object-cover"
            />
          ) : null}
          {category === 'diary' ? (
            result.length !== 0 ? (
              <div className="relative">
                <img src={img} className="h-full w-full blur-xs" />
                <img
                  src={img}
                  className="absolute top-[13%] left-[30%] h-[166px] w-[113px]"
                />
              </div>
            ) : null
          ) : null}
        </div>
        <div className="p-[13px] text-start">
          <Link to={`/profile/${id}`}>
            <div className="flex items-center gap-x-[6px] bg-amber-100">
              <div className="size-[25px] overflow-hidden rounded-full">
                <ProfileImg id={id} />
              </div>
              <div className="flex items-center">
                <div className="text-[16px] font-semibold">{nickname}</div>
              </div>
            </div>
          </Link>

          <div className="mt-[15px] truncate text-[18px] font-bold">
            <span>{title}</span>
          </div>
          <div className="mt-[15px] line-clamp-2">{body}</div>
          {/* 좋아요, 댓글 */}
          <div className="absolute bottom-0 left-0 flex size-[12px] pb-[30px] pl-[13px]">
            <div className="mr-[8px] flex items-center space-x-1">
              <span>
                <FaRegHeart fontSize="small" />
              </span>
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>
                <FaRegComment fontSize="small" />
              </span>
              <span>{comments}</span>
            </div>
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
