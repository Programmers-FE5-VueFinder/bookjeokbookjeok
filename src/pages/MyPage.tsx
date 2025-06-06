import BookCard from '../components/component/BookCard';

export default function MyPage() {
  return (
    <>
      <div>
        {/* 헤더 에리어 */}
        <div className="h-[166px]">
          <h1 className="text-center text-3xl font-bold">MyPage Prototype</h1>
        </div>
        {/* content */}
        <div className="flex justify-center border-1">
          {/* 프로필 에리어 */}
          <div className="relative mr-[10px] grid h-[418px] w-[600px] content-center justify-center rounded-2xl border-1 border-red-400">
            {/* 추후 프로필 이미지 에리어로 변경 */}
            <div className="h-[205.71px] w-[240px] rounded-2xl border-1"></div>
            <button className="absolute top-1 right-1 h-[29px] w-[29px] cursor-pointer active:bg-gray-300">
              v
            </button>
            {/* 프로필 닉네임, 팔로잉 팔로워 에리어 */}
            <div className="mt-[13.29px] grid text-center">
              <span>설월화</span>
              <div className="mt-[14px] text-center">
                <div className="mr-[21px] inline-block">
                  <span>팔로워 00</span>
                </div>
                <div className="inline-block">
                  <span>팔로잉 00</span>
                </div>
              </div>
            </div>
            <div className="absolute right-2 bottom-2 size-[29px] rounded-full border-1 text-center">
              b
            </div>
          </div>
          {/* 버튼 에리어 */}
          <div className="flex-col">
            <button className={'button'}>다이어리</button>
            <button className={'button'}>자유채널</button>
            <button className={'button'}>독서모임</button>
            <button className={'button'}>북마크</button>
            {/* 칭호 에리어 */}
            <div className="relative w-[589px] text-center text-[16px]">
              <span>내가 얻은 칭호</span>
              <button className={'more'}>더보기</button>
              <div className="h-[228px] w-[589px] border-1"></div>
            </div>
            {/* 북마크 도서 에리어 -> 추후 내 서재 에리어와 함께 컴포넌트로 전환 */}
            <div className="relative h-[301px] w-[589.71px] text-center">
              <span className="text-[20px]">북마크</span>
              <button className={'more top-1'}>더보기</button>
              <BookCard />
            </div>
            {/* 내 서재 에리어 */}
            <div className="relative h-[301px] w-[589.71px] text-center">
              <span className="text-[20px]">내 서재</span>
              <button className={'more top-1'}>더보기</button>
              <BookCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
