import { useParams } from 'react-router';
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
import Like from '../components/component/post-detail/Like';

export default function PostDetail() {
  const path = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [modalStatus, setModalStatus] = useState({
    show: false,
    active: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function postDetail() {
      const response = await fetchPostDetail(path.postId as string);
      setContent(response);
      setLoading(true);
    }
    postDetail();
  }, []);

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
        <Like />
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
