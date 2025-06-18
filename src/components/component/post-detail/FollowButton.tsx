import { useEffect, useState } from 'react';
import {
  fetchDeleteFollow,
  fetchAddFollow,
  isFollowing,
} from '../../../apis/follow';
import { useAuthStore } from '../../../store/authStore';
import Toastfy from '../../common/Toastfy';

export default function FollowButton({ writeUserId }: { writeUserId: string }) {
  const [toggle, setToggle] = useState(true);
  const session = useAuthStore((state) => state.session);
  console.log(session);

  useEffect(() => {
    const response = async () => {
      const response = await isFollowing(writeUserId, '');
      setToggle(response);
      return;
    };
    response();
  }, [session]);

  return (
    <>
      {toggle ? (
        <button
          onClick={() => {
            if (!session?.user.id) {
              Toastfy('error', '로그인이 필요한 서비스 입니다.');
              return;
            }
            fetchAddFollow(session?.user.id, writeUserId);
            setToggle((prev) => !prev);
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
            setToggle((prev) => !prev);
          }}
          className="flex h-[30px] cursor-pointer items-center justify-center rounded-[5px] bg-[#f1f1f1] px-[15px] text-[16px] hover:bg-[#08C818] hover:text-[#fff]"
        >
          팔로우 취소
        </button>
      )}
    </>
  );
}
