import FollowButton from './FollowButton';
import type { Profile } from '../../../types/post';

export default function PostProfile({ profile }: { profile: Profile }) {
  const { image } = profile;
  return (
    <>
      <section className="flex w-[1200px] justify-between border-b border-[#d8d6d6] pb-[40px]">
        <div className="flex items-center gap-[10px]">
          <img
            src={image as string}
            className="h-[50px] w-[50px] cursor-pointer rounded-[100px]"
          ></img>
          <span className="h-full cursor-pointer text-[20px] leading-[33px] font-semibold text-[#333]">
            {profile.name}
          </span>
        </div>
        <FollowButton />
      </section>
    </>
  );
}
