import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import type { BookCardProps } from '../../types/type';

export default function BookCard({
  nickname,
  // badge = '',
  title,
  body,
  image,
  likes = 0,
  comments = 0,
  createdAt,
  profileImage,
}: BookCardProps) {
  return (
    <>
      <div 
        className="bg-white relative h-[440px] w-[278px] flex-col justify-center rounded-[10px] text-center text-[16px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}  
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden rounded-t-2xl border-b-1 border-[#EAEAEA] text-center">
        {image ? <img src={image} alt="post" className="h-full w-full object-cover" /> : <span>이미지 없음</span>}
        </div>
        <div className="p-[13px] text-start">
          <div className="bg-amber-100 flex items-center gap-x-[6px]">
            <img 
              src={profileImage ?? '이미지 없음'}
              alt="프로필사진" 
              className=" w-auto h-[25px] rounded-full"
            />
            <div className="flex items-center">
              <div className="text-[16px] font-semibold">{nickname}</div>
            </div>
          </div>

          <div className="mt-[15px] truncate text-[18px] font-bold">
            <span>{title}</span>
          </div>
          <div className="mt-[15px] line-clamp-2">
            {body}
          </div>
          {/* 좋아요, 댓글 */}
          <div className="absolute bottom-0 left-0 flex size-[12px] pb-[20px] pl-[13px]">
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
            <span className="absolute right-0 bottom-0 pr-[13px] pb-[7px]">
              {createdAt}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
