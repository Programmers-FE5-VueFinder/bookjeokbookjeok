import FollowButton from './FollowButton';

export default function PostProfile() {
  return (
    <>
      <section className="flex w-[1200px] justify-between border-b border-[#d8d6d6] pb-[40px]">
        <div className="flex items-center gap-[10px]">
          <div className="h-[40px] w-[40px] cursor-pointer rounded-[100px] bg-amber-700"></div>
          <span className="h-full cursor-pointer text-[20px] leading-[33px] font-semibold text-[#333]">
            user name
          </span>
          <div className="h-[16px] w-[16px] rounded-[20px] bg-amber-600"></div>
        </div>
        <FollowButton />
      </section>
    </>
  );
}
