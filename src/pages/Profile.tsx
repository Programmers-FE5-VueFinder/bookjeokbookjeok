// pages/Profile.tsx (Final Refactored Version)
import { useEffect, useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import SettingModal from '../components/component/MyPage/SettingModal';
import { twMerge } from 'tailwind-merge';
import ProfileImg from '../components/component/MyPage/ProfileImg';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';
import supabase, { STORAGE_BASE_URL } from '../utils/supabase';
import SkeletonCard from '../components/common/CardSkeleton2';
import BookCard from '../components/common/BookCard';
import { useParams } from 'react-router';

export default function Profile() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [follower, setFollwer] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [selectedBtn, setSelectedBtn] = useState<string>('다이어리');
  const [content, setContent] = useState<string>('다이어리');
  const buttonName = ['다이어리', '자유채널', '마이 북클럽', '북마크'];
  const { userId } = useParams();

  const { session } = useAuthStore();
  const { Image: avatarUrl, profileName, intro } = useProfileStore();

  // 상태 업데이트 함수는 useEffect 바깥에 선언해도 안전합니다.
  const { setProfileName, setProfileIntro, setProfileImage } =
    useProfileStore.getState();

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setContent(name);
    setSelectedBtn(name);
  };

  useEffect(() => {
    const fetchInitialProfile = async () => {
      const user = session?.user;
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profile')
        .select('image, name, intro')
        .eq('id', userId!)
        .single();

      if (error) {
        console.error('초기 프로필 데이터 로딩 실패:', error);
        return;
      }

      if (profile) {
        setProfileName(profile.name);
        setProfileIntro(profile.intro);
        if (profile.image) {
          const initialUrl = `${STORAGE_BASE_URL}${profile.image}?t=${new Date().getTime()}`;
          setProfileImage(initialUrl);
        }
      }
    };

    const myFollower = async () => {
      const { data: follow, error } = await supabase
        .from('follow')
        .select('follower_id, following_id');

      console.error(error);

      const followData = follow!.map((follower) => follower.following_id);
      let followerNumber = 0;

      for (let i = 0; i < followData.length; i++) {
        if (followData[i] === userId) {
          followerNumber += 1;
        }
      }
      setFollwer(followerNumber);
    };
    myFollower();

    const myFollowing = async () => {
      const { data: follow, error } = await supabase
        .from('follow')
        .select('following_id, follower_id');

      console.error(error);

      const followData = follow!.map((follower) => follower.follower_id);
      let followingNumber = 0;

      for (let i = 0; i < followData.length; i++) {
        if (followData[i] === userId) {
          followingNumber += 1;
        }
      }
      setFollowing(followingNumber);
    };
    myFollowing();

    fetchInitialProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // *** [최종 수정] user.id 라는 원시값을 의존성으로 사용합니다.

  return (
    <>
      <div>
        {/* 프로필 에리어 */}
        <div className="relative flex h-[350px] content-center justify-center shadow shadow-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            {/* 프로필 이미지 */}
            <div className="relative size-[100px]">
              <ProfileImg
                src={avatarUrl || session?.user.user_metadata.avatar_url}
              />
              {session?.user.id === userId ? (
                <button
                  className="absolute top-0 right-1 flex size-[25px] cursor-pointer items-center justify-center rounded-full border-3 border-white bg-gray-100"
                  onClick={() => {
                    setOpenSetting(true);
                  }}
                >
                  <LuPencil fontSize="small" />
                </button>
              ) : null}
            </div>
            <div className="mt-[14px] mb-[14px] flex items-center gap-[6px] font-bold">
              <span>{profileName} 님</span>
              <div className="size-[15px] rounded-full border-1"></div>
            </div>
            <span>{intro}</span>
            <div className="mt-[26px] flex">
              <div className="mr-[25px]">
                <span className="mr-[8px] text-[16px] font-semibold">
                  팔로워
                </span>
                <span className="text-[16px]">{follower}</span>
              </div>
              <div>
                <span className="mr-[8px] text-[16px] font-semibold">
                  팔로잉
                </span>
                <span className="text-[16px]">{following}</span>
              </div>
            </div>
          </div>
          {/* 버튼 에리어 */}
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            <div className="flex w-[1200px] items-center justify-center">
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
        </div>
        <div className="flex items-center justify-center bg-[#FAFAFA]">
          <div className="grid gap-[28px] p-[100px] md:grid-cols-2 lg:grid-cols-4">
            {content}
            <SkeletonCard />
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
          <SettingModal onClose={() => setOpenSetting(false)} />
        </div>
      ) : null}
    </>
  );
}
