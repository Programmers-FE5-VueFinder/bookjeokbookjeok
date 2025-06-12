export default function AlarmModal() {
  return (
    <>
      <div className="w-[280px] rounded-[5px] px-[10px] shadow-[0_0_5px_rgba(0,0,0,0.25)]">
        <h2 className="flex h-[30px] w-[260px] items-center justify-center border-b border-[#E4E4E4] text-[16px] font-semibold">
          알림
        </h2>
        <p className="my-[20px] text-[14px]">2개의 알림</p>
        {/* 반복문 렌더링 */}
        <ul>
          <li className="mb-[25px] flex flex-col gap-[10px] text-[14px]">
            <div className="flex gap-[6px]">
              <span className="mt-[7px] h-[8px] w-[10px] rounded-[50px] bg-red-700"></span>
              <p className="text-[14px]">
                <strong>김정우</strong>님이 독서 모임에 가입 신청을 하셨습니다
              </p>
            </div>
            <p className="ml-[15px] text-[#898989]">2시간 전</p>
          </li>
          <li className="mb-[25px] flex flex-col gap-[10px] text-[14px]">
            <div className="flex gap-[6px]">
              <span className="mt-[7px] h-[8px] w-[10px] rounded-[50px] bg-red-700"></span>
              <p className="text-[14px]">
                <strong>김정우</strong>님이 독서 모임에 가입 신청을 하셨습니다
              </p>
            </div>
            <p className="ml-[15px] text-[#898989]">2시간 전</p>
          </li>
        </ul>
      </div>
    </>
  );
}
