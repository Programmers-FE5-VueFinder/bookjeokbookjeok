import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import type { BookCardProps } from '../../types/type';
import ProfileImg from '../component/MyPage/ProfileImg';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import defaultImg from '../../assets/images/default_post_img.png';
import { getLikeCount } from '../../apis/like';
import { getCommentCount } from '../../apis/comment';

export default function BookCard({
  nickname,
  title,
  body,
  image,
  createdAt,
  id,
  book_id,
  category,
  post_id,
}: BookCardProps) {
  const [img, setImg] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  function decodeHTMLEntities(str: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  useEffect(() => {
    // console.log('book_id:', book_id);
    const getBookData = async () => {
      if (book_id !== null && book_id !== undefined) {
        try {
          const { data: book } = await supabase
            .from('book')
            .select('*')
            .eq('id', book_id)
            .single();
          setImg(book?.cover ?? '');
          // console.log("여기", book?.cover);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getBookData();
    const getBookComment = async () => {
      const comments = await getCommentCount(post_id!);
      setCommentCount(comments);
    };
    getBookComment();
    const getBookLike = async () => {
      const likes = await getLikeCount(post_id!);
      setLikeCount(likes);
    };
    getBookLike();
  }, [book_id, post_id]);

  return (
    <>
      <div
        className="relative h-[440px] w-[278px] flex-col justify-center overflow-hidden rounded-[10px] bg-white text-center text-[16px] transition-transform duration-300 hover:scale-103"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden border-b-1 border-[#EAEAEA] text-center">
          {category === 'diary' ? (
            img ? ( // img 있으면 렌더링
              <div className="relative">
                <img src={img} className="h-full w-full blur-xs" />
                <img
                  src={img}
                  className="absolute top-[13%] left-[30%] h-[166px] w-[113px] rounded-[3px]"
                  style={{
                    boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            ) : (
              <img src={defaultImg} className="h-full w-full object-cover" />
            )
          ) : image ? (
            <img
              src={image}
              alt="post"
              className="h-full w-full object-cover"
            />
          ) : (
            <img src={defaultImg} />
          )}
        </div>
        <div className="p-[13px] text-start">
          <Link to={`/profile/${id}`}>
            <div className="flex items-center gap-x-[6px]">
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
          <div className="mt-[15px] line-clamp-2">
            {body ? decodeHTMLEntities(body.replace(/<[^>]*>?/g, '')) : ''}
          </div>
          {/* 좋아요, 댓글 */}
          <div className="absolute bottom-0 left-0 flex size-[12px] pb-[30px] pl-[13px]">
            <div className="mr-[8px] flex items-center space-x-1">
              <span>
                <FaRegHeart fontSize="small" />
              </span>
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>
                <FaRegComment fontSize="small" />
              </span>
              <span>{commentCount}</span>
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
