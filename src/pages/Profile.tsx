// pages/Profile.tsx (Final Refactored Version)
import { useEffect, useState } from 'react';
import { LuPencil } from 'react-icons/lu';
import SettingModal from '../components/component/MyPage/SettingModal';
import { twMerge } from 'tailwind-merge';
import ProfileImg from '../components/component/MyPage/ProfileImg';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';
import supabase from '../utils/supabase';
import { useParams } from 'react-router';
import ProfileSkeleton from '../components/common/ProfileSkeleton';
import DiaryArea from '../components/component/MyPage/DiaryArea';
import CommunityArea from '../components/component/MyPage/CommunityArea';
import BookClubArea from '../components/component/MyPage/BookClubArea';
import BookMarkArea from '../components/component/MyPage/BookMarkArea';
import { RiUserAddFill } from 'react-icons/ri';
import { RiUserFollowFill } from 'react-icons/ri';

type Post = {
  body: string;
  book_club_id: string | null;
  category: string;
  created_at: string;
  id: string;
  image: string | null;
  title: string;
  user_id: string;
};

export default function Profile() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [follower, setFollower] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [post, setPost] = useState<Post[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState<string>('다이어리');
  const [content, setContent] = useState<string>('diary');
  const buttonName = ['다이어리', '자유채널', '마이 북클럽', '북마크'];
  const { userId } = useParams();
  const [follow, setFollow] = useState<boolean>(false);

  const { session } = useAuthStore();
  const { Image: avatarUrl, profileName, intro } = useProfileStore();

  const { setProfileName, setProfileIntro, setProfileImage } =
    useProfileStore.getState();
  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name === '다이어리') {
      setContent('diary');
    } else if (name === '자유채널') {
      setContent('community');
    } else if (name === '마이 북클럽') {
      setContent('bookclub');
    } else {
      setContent('bookmark');
    }
    setSelectedBtn(name);
  };

  const handleFollowing = async () => {
    if (follow === false) {
      if (session?.user.id !== undefined && userId !== undefined) {
        const { error } = await supabase
          .from('follow')
          .insert([{ follower_id: session?.user.id, following_id: userId }])
          .select();
        console.error(error);
      }
      const updateFollower = follower + 1;
      setFollower(updateFollower);
      setFollow(true);
    } else if (follow === true) {
      console.log(session?.user.id);
      console.log(userId);
      if (session?.user.id !== undefined && userId !== undefined) {
        const { error } = await supabase
          .from('follow')
          .delete()
          .eq('follower_id', session?.user.id)
          .eq('following_id', userId);
        console.error(error);
      }
      const updateFollower = follower - 1;
      setFollower(updateFollower);
      setFollow(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
            if (profile.image.includes('https://')) {
              const initialUrl = `${profile.image}?t=${new Date().getTime()}`;
              setProfileImage(initialUrl);
            } else {
              const { data: urlData } = supabase.storage
                .from('image')
                .getPublicUrl(profile.image);

              const imageURL = urlData.publicUrl;
              const separator = imageURL.includes('?') ? '&' : '?';
              const initialUrl = `${imageURL}${separator}v=${new Date().getTime()}`;
              setProfileImage(initialUrl);
            }
          } else {
            setProfileImage('');
          }
        }
      };

      const myFollow = async () => {
        const { data: follow, error } = await supabase
          .from('follow')
          .select('follower_id, following_id');

        console.error(error);

        const followerData = follow!.map((follower) => follower.following_id);
        let followerNumber = 0;

        for (let i = 0; i < followerData.length; i++) {
          if (followerData[i] === userId) {
            followerNumber += 1;
          }
        }
        setFollower(followerNumber);

        let followingNumber = 0;
        const followingData = follow!.map((follower) => follower.follower_id);

        // console.log(session?.user);
        // console.log(followerData);

        for (let i = 0; i < followingData.length; i++) {
          if (followingData[i] === userId) {
            followingNumber += 1;
          }
        }
        for (let i = 0; i < followingData.length; i++) {
          if (
            followingData[i] === session?.user.id &&
            followerData[i] === userId
          ) {
            setFollow(true);
            return;
          } else {
            setFollow(false);
          }
        }
        setFollowing(followingNumber);
      };

      const myPost = async () => {
        const { data: posts, error } = await supabase
          .from('post')
          .select('*')
          .eq('user_id', userId!);
        const postDiary = posts?.filter((post) => post.category === 'diary');
        const postCommunity = posts?.filter(
          (post) => post.category === 'community',
        );
        const bookClub = posts?.filter((post) => post.category === 'bookclub');
        const bookMark = posts?.filter((post) => post.category === 'bookmark');
        if (content === 'diary') {
          setPost(postDiary!);
        } else if (content === 'community') {
          setPost(postCommunity!);
        } else if (content === 'bookclub') {
          setPost(bookClub!);
        } else if (content === 'bookmark') {
          setPost(bookMark!);
        }
        console.error(error);
      };
      await Promise.all([fetchInitialProfile(), myFollow(), myPost()]);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, content]);

  return (
    <>
      <div>
        {/* 프로필 에리어 */}
        <div className="relative flex h-[350px] content-center justify-center shadow shadow-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            {/* 프로필 이미지 */}
            <div className="relative size-[100px]">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <ProfileImg
                  src={avatarUrl || session?.user.user_metadata.avatar_url}
                />
              )}
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
            <div className="mt-[14px] mb-[8px] flex items-center gap-[6px] font-bold">
              <span>{profileName} 님</span>
              <div className="size-[15px] rounded-full border-1"></div>
            </div>
            <span className="mb-[8px]">{intro}</span>

            {session?.user.id !== userId ? (
              follow ? (
                <button
                  className="top-0 right-1 flex cursor-pointer items-center justify-center gap-[3px] rounded-full bg-gray-200 px-[5px] py-[3px]"
                  onClick={handleFollowing}
                >
                  <RiUserFollowFill />
                  <span>팔로잉</span>
                </button>
              ) : (
                <button
                  className="top-0 right-1 flex cursor-pointer items-center justify-center gap-[3px] rounded-full bg-[var(--color-main)] px-[5px] py-[3px]"
                  onClick={handleFollowing}
                >
                  <RiUserAddFill />
                  <span>팔로우</span>
                </button>
              )
            ) : null}

            <div className="mt-[8px] flex">
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
          <div>
            {content === 'diary' ? (
              <DiaryArea
                post={post}
                profileImage={
                  avatarUrl || session?.user.user_metadata.avatar_url
                }
                profileName={profileName}
              />
            ) : null}
            {content === 'community' ? (
              <CommunityArea
                post={post}
                profileImage={
                  avatarUrl || session?.user.user_metadata.avatar_url
                }
                profileName={profileName}
              />
            ) : null}
            {content === 'bookclub' ? (
              <BookClubArea
                post={post}
                profileImage={
                  avatarUrl || session?.user.user_metadata.avatar_url
                }
                profileName={profileName}
              />
            ) : null}
            {content === 'bookmark' ? (
              <BookMarkArea
                post={post}
                profileImage={
                  avatarUrl || session?.user.user_metadata.avatar_url
                }
                profileName={profileName}
              />
            ) : null}
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
