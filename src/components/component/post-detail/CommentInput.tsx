import { GoPaperAirplane } from 'react-icons/go';

export default function CommentInput() {
  return (
    <>
      <div className="flex w-[1200px] gap-[10px] border-b border-[#d8d6d6d6] pb-[88px]">
        <input
          placeholder="댓글을 작성해 주세요."
          className="h-[60px] grow-1 rounded-[10px] border border-[#D6D6D6] pl-[15px]"
        />
        <button className="flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]">
          <GoPaperAirplane />
        </button>
      </div>
    </>
  );
}
