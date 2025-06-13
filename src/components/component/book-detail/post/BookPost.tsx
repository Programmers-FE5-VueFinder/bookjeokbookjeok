import { useCallback, useEffect, useState } from 'react';
import { getBookPost } from '../../../../apis/post';
import { useInfiniteScroll } from '../../../../hooks/use-infinite-scroll';
import type { Post } from '../../../../types/post';
import Snackbar from '@mui/material/Snackbar';
import BookPostSkeleton from './BookPostSkeleton';
import { BookPostItem } from './BookPostItem';

export function BookPost({ isbn }: { isbn: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

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
      console.error('포스트 불러오기 실패:', error);
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
    <div className="custom-scrollbar h-full max-h-[calc(75vh-60px)] overflow-auto rounded-[10px]">
      <p className="border-b border-b-[#D8D8D8] py-[30px] text-center text-[20px] font-semibold">
        포스트
      </p>

      {isLoading && <BookPostSkeleton />}

      {posts.length === 0 && !isLoading ? (
        <p className="flex h-[400px] items-center justify-center border-t border-t-[#D8D8D8] py-[30px] text-2xl text-gray-500">
          등록된 포스트가 없습니다.
        </p>
      ) : (
        posts.map((post) => <BookPostItem key={post.id} post={post} />)
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
  );
}
