import BookCard from '../components/common/BookCard';
import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import SettingModal from '../components/component/MyPage/SettingModal';
import Button from '../components/component/MyPage/Button';

export default function Profile() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const btnName = ['다이어리', '자유채널', '독서모임', '북마크']
  return (
    <>
      <div>
        {/* 프로필 에리어 */}
        <div className="relative flex h-[350px] content-center justify-center shadow shadow-gray-200">
          <div className="mt-[52px] flex flex-col items-center text-center">
            {/* 프로필 이미지 */}
            <div className="relative size-[100px] rounded-full bg-black">
              <button
                className="absolute top-0 right-1 flex size-[25px] cursor-pointer items-center justify-center rounded-full border-3 border-white bg-gray-100"
                onClick={() => {
                  setOpenSetting(true);
                }}
              >
                <LuPencil fontSize="small" />
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
            <Button />
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#FAFAFA]">
          <div className="grid gap-[28px] p-[100px] md:grid-cols-2 lg:grid-cols-4">
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
      </div>
      {openSetting ? (
        <div>
          <SettingModal
            setOpenSetting={setOpenSetting}
            onClose={() => setOpenSetting(false)}
          />
        </div>
      ) : null}
    </>
  );
}
