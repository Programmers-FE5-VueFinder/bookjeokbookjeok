export default function RequireLoginModal() {
  return (
    <>
      <div className="h-[150px] w-[350px] rounded-[5px] shadow-[0_0_5px_rgba(0,0,0,0.25)]">
        <div className="flex h-[35px] w-full items-center justify-center rounded-tl-[5px] rounded-tr-[5px] border-b border-[#f1f1f1]">
          알림
        </div>
        <div className="flex h-[83px] items-center justify-center font-semibold">
          로그인을 해야 접근할 수 있는 서비스 입니다.
        </div>
        <button className="flex h-[32px] w-full cursor-pointer items-center justify-center rounded-br-[5px] rounded-bl-[5px] bg-[rgba(8,200,24,.7)] font-semibold text-[#fff]">
          확인
        </button>
      </div>
    </>
  );
}
