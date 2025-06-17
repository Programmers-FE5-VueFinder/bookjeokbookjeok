import { useNavigate, useParams } from 'react-router';
import Comment from '../components/component/post-detail/Comment';
import CommentInput from '../components/component/post-detail/CommentInput';
import PostHeader from '../components/component/post-detail/PostHeader';
import PostProfile from '../components/component/post-detail/PostProfile';
import { useEffect, useState } from 'react';
import { fetchPostDetail } from '../apis/post';
import { deletePost } from '../apis/post';
import type { PostDetail } from '../types/post';
import getElapsedTime from '../utils/format-time';
import '../css/reactQuillCustom.css';
import CheckModal from '../components/common/CheckModal';
import Like from '../components/component/post-detail/Like';

export default function PostDetail() {
  const { postId } = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) navigate(-1);
    async function postDetail() {
      const response = await fetchPostDetail(postId as string);
      setContent(response);
      setLoading(true);
    }
    postDetail();
  }, [postId]);

  return (
    loading && (
      <main className="relative flex flex-col items-center">
        {modalShow && (
          <CheckModal
            message="게시물을 삭제 하시겠습니까?"
            action={deletePost}
            setter={setModalShow}
            postId={postId!}
          />
        )}
        <PostHeader
          setModalShow={setModalShow}
          title={content!.title}
          name={content!.profile.name}
          category={content!.category}
          time={getElapsedTime(content!.created_at)}
          writeUserId={content!.profile.id}
          path={postId!}
        />
        {/* 본문 */}
        <div
          dangerouslySetInnerHTML={{ __html: content!.body }}
          className="w-full max-w-[1200px] pt-[80px]"
        ></div>
        {/* 본문 */}
        <Like />
        <PostProfile profile={content!.profile} />
        <div className="flex w-[1200px]">
          <span className="flex gap-[10px] py-[45px] text-[16px] font-semibold text-[#333333]">
            N개의 댓글 N개의 좋아요
          </span>
        </div>
        <CommentInput />
        <div className="mb-[150px]">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </main>
    )
  );
}
