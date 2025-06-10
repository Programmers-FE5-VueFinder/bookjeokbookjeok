import { FaRegComment, FaRegHeart } from 'react-icons/fa';

export default function BookCard() {
  return (
    <>
      <div className="relative h-[440px] w-[278px] flex-col justify-center rounded-2xl border-1 border-red-500 bg-white text-center text-[16px] shadow-md shadow-gray-400">
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden rounded-t-2xl border-1 text-center">
          <span>이미지 에리어</span>
        </div>
        <div className="p-[13px] text-start">
          <div className="flex items-center">
            <div className="mr-1 align-top font-bold">
              <span>닉네임</span>
            </div>
            {/* 배지 에리어 */}
            <div className="size-[15px] justify-center overflow-hidden rounded-full border-1"></div>
          </div>
          <div className="mt-[15px] truncate text-[18px] font-bold">
            <span>게시글 제목</span>
          </div>
          <div className="mt-[15px] line-clamp-2">
            세상이 사랑하지 않았고 세상이 존중하지 않았지만 그저 숨쉬고 살아있는
          </div>
          {/* 좋아요, 댓글 */}
          <div className="absolute bottom-0 left-0 flex size-[12px] pb-[20px] pl-[13px]">
            <div className="mr-[8px] flex items-center space-x-1">
              <span>
                <FaRegHeart fontSize="small" />
              </span>
              <span>34</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>
                <FaRegComment fontSize="small" />
              </span>
              <span>6</span>
            </div>
          </div>
          <div>
            <span className="absolute right-0 bottom-0 pr-[13px] pb-[7px]">
              게시일
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
