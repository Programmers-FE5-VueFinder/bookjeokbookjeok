import BookCard from '../components/common/BookCard';

export default function Profile() {
  return (
    <>
      <div>
        {/* 헤더 에리어 */}
        <div className="h-[110px] text-center text-[50px]">
          <h1>Header</h1>
        </div>
        {/* 프로필 에리어 */}
        <div className="relative flex h-[350px] content-center justify-center shadow shadow-gray-200">
          <div className="mt-[52px] flex flex-col items-center text-center">
            {/* 프로필 이미지 */}
            <div className="relative size-[100px] rounded-full border-1 bg-black">
              <button className="absolute top-0 right-1 size-[25px] cursor-pointer rounded-full border-3 border-white bg-gray-100 text-center align-middle">
                O
              </button>
            </div>
            <div className="mt-[14px] grid">
              <span>닉네임</span>
              <span>여기는 자기소개입니다.</span>
            </div>
            <div className="flex">
              <div className="mr-[25px]">
                <span className="mr-[8px]">팔로잉</span>
                <span>000</span>
              </div>
              <div>
                <span className="mr-[8px]">팔로워</span>
                <span>000</span>
              </div>
            </div>
          </div>
          {/* 버튼 에리어 */}
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            <button className="button">다이어리</button>
            <button className="button">자유채널</button>
            <button className="button">독서모임</button>
            <button className="button">북마크</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-[100px] grid w-[1196px] grid-cols-4 gap-[28px]">
            <BookCard />
          </div>
        </div>
      </div>
    </>
  );
}
