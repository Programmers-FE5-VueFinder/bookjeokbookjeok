import { useParams } from 'react-router';
import Comment from '../components/component/post-detail/Comment';
import CommentInput from '../components/component/post-detail/CommentInput';
import PostHeader from '../components/component/post-detail/PostHeader';
import PostProfile from '../components/component/post-detail/PostProfile';
import { useEffect, useState } from 'react';
import { fetchPostDetail } from '../apis/post';
import type { PostDetail } from '../types/post';

export default function PostDetail() {
  const path = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  console.log(path.postId); //postId

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
      <main className="flex flex-col items-center">
        <PostHeader />
        {/* 본문 */}
        {/* https://velog.io/@nemo/string-to-jsx */}
        <div
          dangerouslySetInnerHTML={{ __html: content!.body }}
          className="h-[700px] pt-[80px] pb-[100px]"
        ></div>
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
    )
  );
}
