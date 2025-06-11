import { RxDotsVertical } from 'react-icons/rx';

export default function Comment() {
  return (
    <>
      <article className="w-[1200px] border-b border-[#d8d6d6d6] py-[40px]">
        <header className="mb-[25px] flex items-center justify-center text-[#333]">
          <div className="flex w-full items-center gap-[5px] text-[#333]">
            <div className="h-[25px] w-[25px] rounded-[100px] bg-black"></div>
            <span>user name</span>
            <time dateTime="2025-06-11T10:00">1시간 전</time>
          </div>
          <RxDotsVertical className="cursor-pointer" />
        </header>
        <p className="pl-[28px]">
          사노요코 정말 좋아하는 작가에요. 다른 책들도 읽어봐야겠어요 ㅎㅎ
        </p>
      </article>
    </>
  );
}
