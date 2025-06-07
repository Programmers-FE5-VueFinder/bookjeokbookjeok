export default function BookCard() {
  return (
    <>
      <div className="relative h-[440px] w-[278px] flex-col justify-center rounded-2xl border-1 border-red-500 text-center shadow-xl">
        <div className="h-[247px] w-[278px] content-center justify-center rounded-t-2xl border-1 text-center">
          <span>이미지 에리어</span>
        </div>
        <div className="mx-[7.99px] text-start">
          <div className="mt-[10.1px] inline-block h-[20.9px] w-[50.34px] justify-center">
            <span>닉네임</span>
          </div>
          <div className="mt-[20px]">
            <span>도서 제목</span>
          </div>
          <div className="mt-[20px]">컨텐츠</div>
          <div className="absolute bottom-3 left-3 flex">
            <div className="mr-[8px]">
              <span className="text-[16px]">♥</span>
              <span className="text-[16px]">34</span>
            </div>
            <div>
              <span className="text-[16px]">🗨️</span>
              <span className="text-[16px]">6</span>
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
