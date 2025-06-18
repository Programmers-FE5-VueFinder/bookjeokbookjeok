import { useState, useEffect } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useAuthStore } from '../../../store/authStore';
import { hasUserLikedPost, toggleLikeToPost } from '../../../apis/like';
import { toast } from 'react-toastify';
import { sendLikeNotification } from '../../../apis/notification';

interface LikeProps {
  postId: string;
  onLikeToggle: () => void;
}

export default function Like({ postId, onLikeToggle }: LikeProps) {
  const session = useAuthStore((state) => state.session);
  const userId = session?.user?.id;

  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    if (userId) {
      hasUserLikedPost(userId, postId)
        .then((liked) => {
          setLikeStatus(liked);
        })
        .catch((error) => {
          console.error('좋아요 여부 조회 실패:', error);
        });
    } else {
      setLikeStatus(false);
    }
  }, [userId, postId]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.warn('로그인이 필요합니다.');
      return;
    }

    const result = await toggleLikeToPost(userId, postId);

    if (result?.status === 'liked') {
      setLikeStatus(true);
      onLikeToggle?.();

      await sendLikeNotification({
        postId,
        senderId: userId,
      });
    } else if (result?.status === 'unliked') {
      setLikeStatus(false);
      onLikeToggle?.();
    } else {
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex h-[200px] w-[1200px] items-center justify-center">
      <button
        onClick={handleLikeToggle}
        className={`flex h-[45px] w-[110px] cursor-pointer items-center justify-center gap-[3px] rounded-[12px] border-[3px] text-[#333] ${
          likeStatus
            ? 'border-[#08C818] bg-[#BFFFC5] text-[#08C818]'
            : 'border-[#D0D0D0] bg-[#F9F9F9] text-[#D0D0D0]'
        } text-[16px] font-semibold`}
      >
        <IoMdHeartEmpty
          className={`text-[24px] ${likeStatus ? 'text-[#08C818]' : 'text-[#D0D0D0]'}`}
        />
        좋아요
      </button>
    </div>
  );
}
