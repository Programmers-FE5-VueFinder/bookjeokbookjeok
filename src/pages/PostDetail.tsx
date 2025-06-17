import { useNavigate, useParams } from 'react-router';
import Comment from '../components/component/post-detail/Comment';
import CommentInput from '../components/component/post-detail/CommentInput';
import PostHeader from '../components/component/post-detail/PostHeader';
import PostProfile from '../components/component/post-detail/PostProfile';
import { useEffect, useState } from 'react';
import { fetchPostDetail } from '../apis/post';
import type { PostDetail } from '../types/post';
import getElapsedTime from '../utils/format-time';
import '../css/reactQuillCustom.css';
import CheckModal from '../components/common/CheckModal';
import { applyBookClub, getApplyState } from '../apis/book-club';

export default function PostDetail() {
  const path = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [modalStatus, setModalStatus] = useState({
    show: false,
    active: false,
  });
  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applyState, setApplyState] = useState('');
  const navigate = useNavigate();

  const handleApplyBookclub = async () => {
    await applyBookClub(content!.profile.id, content!.book_club_id!);
    setApplyState('after');
  };

  useEffect(() => {
    async function postDetail() {
      const response = await fetchPostDetail(path.postId as string);
      setContent(response);
      setPostLoading(true);
    }
    postDetail();
  }, [path.postId]);

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
          className="w-[1200px] pt-[80px] pb-[80px]"
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
        <PostProfile profile={content!.profile} />
        <div className="flex h-[110px] w-[1200px] items-center">
          <span className="text-[16px] font-semibold text-[#333333]">
            N개의 댓글
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
