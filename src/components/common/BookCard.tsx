import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function BookCard() {
  return (
    <>
      <div className="relative h-[440px] w-[278px] flex-col justify-center rounded-2xl border-1 border-red-500 text-center font-[noto-sans-kr] text-[16px] shadow-xl">
        <div className="h-[247px] w-[278px] content-center justify-center overflow-hidden rounded-t-2xl border-1 text-center">
          <span>이미지 에리어</span>
        </div>
        <div className="mx-[7.99px] text-start">
          <div className="flex">
            <div className="mt-[10.1px] mr-1 align-top font-bold">
              <span>닉네임</span>
            </div>
            {/* 배지 에리어 */}
            <div className="mt-[15.1px] size-[15px] justify-center overflow-hidden rounded-full border-1"></div>
          </div>
          <div className="mt-[15px] truncate text-[18px] font-bold">
            <span>게시글 제목</span>
          </div>
          <div className="mt-[15px] line-clamp-2">
            세상이 사랑하지 않았고 세상이 존중하지 않았지만 그저 숨쉬고 살아있는
          </div>
          {/* 좋아요, 댓글 */}
          <div className="align-end absolute bottom-3 left-3 flex">
            <div className="mr-[8px]">
              <span>
                <FavoriteIcon fontSize="small" />
              </span>
              <span> 34</span>
            </div>
            <div>
              <span>
                <ChatBubbleIcon fontSize="small" />
              </span>
              <span> 6</span>
            </div>
          </div>
          <div>
            <span className="absolute right-3 bottom-3">게시일</span>
          </div>
        </div>
      </div>
    </>
  );
}
