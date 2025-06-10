import { useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import SettingModal from '../components/component/MyPage/SettingModal';
import { twMerge } from 'tailwind-merge';
import ProfileImg from '../components/component/MyPage/ProfileImg';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';
import DiaryArea from '../components/component/MyPage/DiaryArea';
import FreeChannelArea from '../components/component/MyPage/FreeChannelArea';
import BookClubArea from '../components/component/MyPage/BookClubArea';
import BookMarkArea from '../components/component/MyPage/BookMarkArea';

export default function Profile() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState<string>('다이어리');
  const [content, setContent] = useState<string>('다이어리');
  const buttonName = ['다이어리', '자유채널', '독서모임', '북마크'];
  const profileImg = useProfileStore((state) => state.Image);
  const session = useAuthStore((state) => state.session);

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setContent(name);
    setSelectedBtn(name);
  };
  return (
    <>
      <div>
        {/* 프로필 에리어 */}
        <div className="relative flex h-[350px] content-center justify-center shadow shadow-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            {/* 프로필 이미지 */}
            <div className="relative size-[100px]">
              <ProfileImg
                src={profileImg || session?.user.user_metadata.avatar_url}
              />
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
              <span className="text-[16px] font-semibold">
                {session?.user.user_metadata.name}
              </span>
              <span className="text-[14px]">내 설명</span>
            </div>
            <div className="mt-[26px] flex">
              <div className="mr-[25px]">
                <span className="mr-[8px] text-[16px] font-semibold">
                  팔로워
                </span>
                <span className="text-[16px]">000</span>
              </div>
              <div>
                <span className="mr-[8px] text-[16px] font-semibold">
                  팔로잉
                </span>
                <span className="text-[16px]">000</span>
              </div>
            </div>
          </div>
          {/* 버튼 에리어 */}
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            {buttonName.map((item) => {
              return (
                <button
                  className={twMerge(
                    item === selectedBtn ? 'button-active' : 'button',
                  )}
                  onClick={handleContentButton}
                  key={item}
                  name={item}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#FAFAFA]">
          {content === '다이어리' ? <DiaryArea /> : null}
          {content === '자유채널' ? <FreeChannelArea /> : null}
          {content === '독서모임' ? <BookClubArea /> : null}
          {content === '북마크' ? <BookMarkArea /> : null}
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
