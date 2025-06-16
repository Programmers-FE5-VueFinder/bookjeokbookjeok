export default function AlarmList() {
  return (
    <li className="relative flex flex-col gap-1 text-left text-[14px]">
      <div className="absolute top-[8px] h-[5px] w-[5px] rounded-full bg-[#FF3333]" />
      <div className="ml-3 flex flex-col gap-1">
        <p className="line-clamp-2 break-all">
          <strong>김정우</strong>님이 독서 모임에 가입 신청을
          하셨습니다.아아ㅏ아아아ㅏ아아아아ㅏㅏㅏㅏㅏㅏㅏㅏ
        </p>
        <p className="text-[#898989]">2시간 전</p>
      </div>
    </li>
  );
}
