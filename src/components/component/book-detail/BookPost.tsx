import { useCallback, useEffect, useState } from 'react';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { getBookPost } from '../../../apis/post';
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll';
import Snackbar from '@mui/material/Snackbar';
import getElapsedTime from '../../../utils/format-time';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  profile: {
    name: string;
    image: string | null;
  };
}

export default function BookPost({ isbn }: { isbn: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const fetchPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const from = page * 5;
      const to = from + 4;
      const newPosts = await getBookPost(isbn, from, to);

      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);

      if (newPosts.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('리뷰 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isbn, page, hasMore, isLoading]);

  const loadMoreRef = useInfiniteScroll({
    hasMore,
    isLoading,
    onIntersect: fetchPosts,
  });

  useEffect(() => {
    if (!hasMore && !isLoading && posts.length > 0) {
      setSnackbarOpen(true);
    }
  }, [hasMore, isLoading, posts.length]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [isbn]);
  return (
    <>
      <div className="custom-scrollbar h-full max-h-[calc(75vh-60px)] overflow-auto rounded-[10px]">
        <p className="border-b border-b-[#D8D8D8] py-[30px] text-center text-[20px] font-semibold">
          포스트
        </p>
        {posts.length === 0 && !isLoading ? (
          <p className="flex h-[400px] items-center justify-center border-t border-t-[#D8D8D8] py-[30px] text-2xl text-gray-500">
            등록된 포스트가 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="max-h-full w-full flex-col justify-center border-b border-b-[#D8D8D8] p-[15px] pl-[20px] text-[16px]"
            >
              {/* 작성자 */}
              <div className="mb-[10px] flex">
                <div className="flex cursor-pointer items-center gap-[10px]">
                  <img
                    src={post.profile.image!}
                    alt="작성자 프로필"
                    className="mt-[2px] h-[25px] w-[25px] rounded-full object-cover"
                  />
                  <p className="text-[16px] text-[#333333]">
                    {post.profile.name}
                  </p>
                </div>
              </div>
              <div className="flex cursor-pointer flex-col gap-[10px] font-medium">
                <span className="line-clamp-1 text-[16px] font-semibold">
                  {post.title}
                </span>
                <span className="line-clamp-2 text-[16px]">{post.body}</span>
                <div className="flex justify-between text-[14px] font-medium">
                  <div className="flex items-center justify-center gap-[4px]">
                    <span>
                      <FaRegHeart fontSize="small" className="mt-[2px]" />
                    </span>
                    <span className="mr-[4px]">34</span>
                    <span>
                      <FaRegComment fontSize="small" className="mt-[2px]" />
                    </span>
                    <span>6</span>
                  </div>
                  <div>{getElapsedTime(post.created_at)}</div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={loadMoreRef} className="h-[1px]" />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="더 이상 불러올 포스트가 없습니다."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </div>
    </>
  );
}
