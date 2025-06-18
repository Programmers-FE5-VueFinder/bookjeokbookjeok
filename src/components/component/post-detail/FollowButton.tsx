import { type Dispatch, type SetStateAction } from 'react';
import { fetchDeleteFollow, fetchAddFollow } from '../../../apis/follow';
import { useAuthStore } from '../../../store/authStore';
import Toastfy from '../../common/Toastfy';

export default function FollowButton({
  writeUserId,
  followToggle,
  setFollowToggle,
}: {
  writeUserId: string;
  setFollowToggle: Dispatch<SetStateAction<boolean>>;
  followToggle: boolean;
}) {
  const session = useAuthStore((state) => state.session);

  return (
    <>
      {followToggle ? (
        <button
          onClick={() => {
            if (!session?.user.id) {
              Toastfy('error', '로그인이 필요한 서비스 입니다.');
              return;
            }
            fetchAddFollow(session?.user.id, writeUserId);
            setFollowToggle((prev) => !prev);
          }}
          className="flex h-[30px] cursor-pointer items-center justify-center rounded-[5px] bg-[#f1f1f1] px-[15px] text-[16px] hover:bg-[#08C818] hover:text-[#fff]"
        >
          팔로우
        </button>
      ) : (
        <button
          onClick={() => {
            if (!session?.user.id) {
              Toastfy('error', '로그인이 필요한 서비스 입니다.');
              return;
            }
            fetchDeleteFollow(session?.user.id, writeUserId);
            setFollowToggle((prev) => !prev);
          }}
          className="flex h-[30px] cursor-pointer items-center justify-center rounded-[5px] bg-[#f1f1f1] px-[15px] text-[16px] hover:bg-[#08C818] hover:text-[#fff]"
        >
          팔로우 취소
        </button>
      )}
    </>
  );
}
