import { useNavigate, useParams } from 'react-router';
import Comment from '../components/component/post-detail/comments/Comment';
import CommentInput from '../components/component/post-detail/comments/CommentInput';
import PostHeader from '../components/component/post-detail/PostHeader';
import PostProfile from '../components/component/post-detail/PostProfile';
import { FaRegComment } from 'react-icons/fa6';
import { useCallback, useEffect, useState } from 'react';
import { fetchPostDetail } from '../apis/post';
import { deletePost } from '../apis/post';
import type { PostDetail } from '../types/post';
import getElapsedTime from '../utils/format-time';
import '../css/reactQuillCustom.css';
import CheckModal from '../components/common/CheckModal';
import { applyBookClub, getApplyState } from '../apis/book-club';
import Like from '../components/component/post-detail/Like';
import type { CommentTypeBase } from '../types/type';
import { getComments } from '../apis/comment';
import { IoMdHeartEmpty } from 'react-icons/io';
import { getLikeCount } from '../apis/like';

export default function PostDetail() {
  const { postId } = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [postLoading, setPostLoading] = useState(false);
  const [applyState, setApplyState] = useState('');

  const handleApplyBookclub = async () => {
    await applyBookClub(content!.profile.id, content!.book_club_id!);
    setApplyState('after');
  };
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState<CommentTypeBase[]>([]);
  const [likeCount, setLikeCount] = useState(0);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      const res = await getComments(postId);
      setComments(res);
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
    }
  }, [postId]);

  const fetchLikeCount = useCallback(async () => {
    if (!postId) return;
    try {
      const count = await getLikeCount(postId);
      setLikeCount(count);
    } catch (err) {
      console.error('좋아요 수 불러오기 실패', err);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) navigate(-1);
    async function postDetail() {
      const response = await fetchPostDetail(postId as string);
      setContent(response);
      if (postId) {
        const count = await getLikeCount(postId);
        setLikeCount(count);
      }
      setLoading(true);
      await fetchComments();
      setPostLoading(true);
    }
    postDetail();
  }, [postId, fetchComments, navigate, fetchLikeCount]);

  useEffect(() => {
    if (postLoading) {
      const fetchApplyState = async () => {
        setApplyState(await getApplyState(content!.book_club_id!));
        setLoading(true);
      };
      fetchApplyState();
    }
  }, [content, postLoading]);

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
          className="w-full max-w-[1200px] min-h-[430px] pt-[80px]"
        ></div>
        {content!.book_club_id && (
          <>
            {applyState === 'before' && (
              <button
                className="mb-20 h-[90px] w-[1200px] cursor-pointer rounded-xl bg-[#08c818] text-[20px] font-bold text-white"
                onClick={handleApplyBookclub}
              >
                북클럽 신청하기
              </button>
            )}
            {applyState === 'after' && (
              <button className="mb-20 h-[90px] w-[1200px] cursor-default rounded-xl bg-[#BDBFBD] text-[20px] font-bold text-white">
                북클럽 신청완료
              </button>
            )}
            {applyState === 'member' && (
              <button
                className="mb-20 h-[90px] w-[1200px] cursor-pointer rounded-xl bg-[#08c818] text-[20px] font-bold text-white"
                onClick={() => navigate(`/bookclub/${content?.book_club_id}`)}
              >
                북클럽으로 이동
              </button>
            )}
          </>
        )}
        {/* 본문 */}
        <Like postId={postId!} onLikeToggle={fetchLikeCount} />
        <PostProfile profile={content!.profile} />
        <div className="flex h-[110px] w-[1200px] items-center">
          <span className="flex items-center gap-[8px] text-[16px] font-semibold text-[#333333]">
            <FaRegComment />
            {comments.length}개의 댓글
            <IoMdHeartEmpty className="mt-[2px] mr-[-4px] ml-[5px] h-[20px] w-[20px]" />
            {likeCount}개의 좋아요
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
