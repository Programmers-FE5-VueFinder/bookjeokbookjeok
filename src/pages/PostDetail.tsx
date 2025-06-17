import { useParams } from 'react-router';
import Comment from '../components/component/post-detail/Comment';
import CommentInput from '../components/component/post-detail/CommentInput';
import PostHeader from '../components/component/post-detail/PostHeader';
import PostProfile from '../components/component/post-detail/PostProfile';
import { FaRegComment } from 'react-icons/fa6';
import { useCallback, useEffect, useState } from 'react';
import { fetchPostDetail } from '../apis/post';
import type { PostDetail } from '../types/post';
import getElapsedTime from '../utils/format-time';
import '../css/reactQuillCustom.css';
import CheckModal from '../components/common/CheckModal';
import { getComments } from '../apis/comment';

type CommentTypeBase = {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  parent_comment_id: string | null;
  profile: {
    name: string;
    image: string | null;
  };
};

export default function PostDetail() {
  const path = useParams();
  const { postId } = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [comments, setComments] = useState<CommentTypeBase[]>([]);
  const [modalStatus, setModalStatus] = useState({
    show: false,
    active: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      const res = await getComments(postId);
      setComments(res);
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
    }
  }, [postId]);

  useEffect(() => {
    async function postDetail() {
      const response = await fetchPostDetail(path.postId as string);
      setContent(response);
      setLoading(true);
      await fetchComments();
    }
    postDetail();
  }, [path.postId, fetchComments]);

  return (
    loading && (
      <main className="relative flex flex-col items-center">
        <CheckModal
          message="게시물을 삭제 하시겠습니까?"
          setter={setModalStatus}
          show={modalStatus.show}
        />
        <PostHeader
          setter={setModalStatus}
          active={modalStatus.active}
          title={content!.title}
          name={content!.profile.name}
          category={content!.category}
          time={getElapsedTime(content!.created_at)}
        />
        {/* 본문 */}
        <div
          dangerouslySetInnerHTML={{ __html: content!.body }}
          className="h-[700px] max-w-[1200px] pt-[80px] pb-[80px]"
        ></div>
        {/* 본문 */}
        <PostProfile profile={content!.profile} />
        <div className="flex h-[110px] w-[1200px] items-center">
          <span className="flex items-center gap-[8px] text-[16px] font-semibold text-[#333333]">
            <FaRegComment />
            {comments.length}개의 댓글
          </span>
        </div>
        <CommentInput onSuccess={fetchComments} />
        <div className="mb-[150px]">
          <Comment comments={comments} fetchComments={fetchComments} />
        </div>
      </main>
    )
  );
}
