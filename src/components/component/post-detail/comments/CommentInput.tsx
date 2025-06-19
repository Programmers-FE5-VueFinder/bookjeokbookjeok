import { GoPaperAirplane } from 'react-icons/go';
import { useState } from 'react';

import { useParams } from 'react-router';
import { useAuthStore } from '../../../../store/authStore';
import { addComment } from '../../../../apis/comment';
import { sendCommentNotification } from '../../../../apis/notification';
import { toast } from 'react-toastify';

export default function CommentInput({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [comment, setComment] = useState('');
  const session = useAuthStore((state) => state.session);
  const userId = session?.user?.id;

  const { postId } = useParams();

  const writeComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.warning('로그인 후 댓글을 작성할 수 있습니다..');
      return;
    }

    if (!comment.trim()) {
      toast.warning('댓글을 입력해 주세요.');
      return;
    }

    if (!postId) {
      alert('게시글 ID가 없습니다.');
      return;
    }

    try {
      await addComment(postId, userId, comment);
      setComment('');
      onSuccess?.();
      // 댓글 알림
      await sendCommentNotification({
        postId: postId,
        senderId: userId,
      });
    } catch (error) {
      console.error('댓글 등록 실패', error);
    }
  };

  return (
    <>
      <div className="flex w-[1200px] gap-[10px] border-b border-[#d8d6d6d6] pb-[88px]">
        <input
          placeholder="댓글을 작성해 주세요."
          className="h-[60px] grow-1 rounded-[10px] border border-[#D6D6D6] pl-[15px]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              writeComment(e);
            }
          }}
        />
        <button
          onClick={writeComment}
          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
        >
          <GoPaperAirplane />
        </button>
      </div>
    </>
  );
}
