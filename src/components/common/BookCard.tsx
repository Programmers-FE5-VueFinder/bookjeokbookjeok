import { FaComment, FaHeart } from "react-icons/fa";
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
        className="relative h-auto w-[278px] flex-col justify-center rounded-[10px] bg-white text-center text-[16px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden rounded-t-[10px] border-b-1 border-[#EAEAEA] text-center">
          {image ? (
            <img
              src={image}
              alt="post"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>
        
        <div className="flex flex-col h-[193px] px-[13px] pt-[13px] text-start">


          <div className="flex h-[40px] items-center gap-x-[4px]">
            <img 
              src={profileImage ?? '이미지 없음'}
              alt="프로필사진" 
              className=" w-auto h-[25px] rounded-full"
            />
            <div className="flex items-center w-full">
              <div className="text-[16px] font-semibold">{nickname}</div>
            </div>
          </div>

          <div className="w-[253px] h-[40px] line-clamp-1 flex items-center mt-[4px] truncate text-[16px] font-bold">
            <span>{title}</span>
          </div>
          <div className="w-auto h-[55px] my-[8px] text-[16px] line-clamp-2">
            {body}
          </div>



          {/* 좋아요, 댓글 */}

          <div className="flex justify-between w-[254px] h-[30px] mb-[7px]">
              <div className="flex items-center w-fit gap-x-[8px]">
                <div className="flex items-center space-x-1">
                  <FaHeart fontSize="small" color="#353535" />
                  <span className="text-[#353535]">{likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaComment fontSize="small" color="#353535" />
                  <span className="text-[#353535]">{comments}</span>
                </div>
              </div>
              <div className="flex items-center">{createdAt}</div>
            </div>
        </div>
      </div>
    </>
  );
}
