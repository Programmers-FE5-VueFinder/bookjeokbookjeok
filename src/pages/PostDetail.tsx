import Comment from '../components/component/post-detail.tsx/Comment';
import CommentInput from '../components/component/post-detail.tsx/CommentInput';
import PostHeader from '../components/component/post-detail.tsx/PostHeader';
import PostProfile from '../components/component/post-detail.tsx/PostProfile';

export default function PostDetail() {
  return (
    <main className="flex flex-col items-center">
      <PostHeader />
      {/* 본문 */}
      <div className="h-[700px] pt-[80px] pb-[100px]"></div>
      {/* 본문 */}
      <PostProfile />
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
  );
}
