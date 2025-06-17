import FollowButton from './FollowButton';
import type { Profile } from '../../../types/post';
import ProfileImage from '../MyPage/ProfileImg';
import { useNavigate } from 'react-router';

export default function PostProfile({ profile }: { profile: Profile }) {
  const { image, id } = profile;
  const navigate = useNavigate();
  return (
    <>
      <section className="flex w-[1200px] items-center justify-between border-b border-[#d8d6d6] pb-[40px]">
        <div
          onClick={() => navigate(`/profile/${id}`)}
          className="flex items-center gap-[10px]"
        >
          <ProfileImage
            src={image}
            id={id}
            className={'h-[55px] w-[55px] cursor-pointer rounded-[100px]'}
          />
          <span className="h-full cursor-pointer text-[20px] leading-[33px] font-semibold text-[#333]">
            {profile.name}
          </span>
        </div>
        <FollowButton />
      </section>
    </>
  );
}
