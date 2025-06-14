import { useCallback, useEffect, useState } from 'react';
import { ReviewItem } from './ReviewItem';
import {
  fetchReviewsWithStars,
  submitReview,
} from '../../../../apis/book-review';
import BookReviewSkeleton from './BookReviewSkeleton';
import { useInfiniteScroll } from '../../../../hooks/use-infinite-scroll';
import { insertBookIfNotExists } from '../../../../apis/add-book-if-not-exists';
import { ReviewInput } from './ReviewInput';
import type { BookDetail, Review } from '../../../../types/book';
import { toast } from 'react-toastify';

interface OneLineReviewProps {
  isbn: string;
  bookDetail: BookDetail;
  onReviewSubmit?: () => Promise<void>;
}

export function OneLineReview({
  isbn,
  bookDetail,
  onReviewSubmit,
}: OneLineReviewProps) {
  const [review, setReview] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getReviews = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const from = page * 5;
      const to = from + 4;
      const newReviews = await fetchReviewsWithStars(isbn, from, to);

      setReviewList((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);

      if (newReviews.length < 5) {
        setHasMore(false);

        if (page > 0 || newReviews.length > 0) {
          toast.info('더 이상 불러올 리뷰가 없습니다.');
        }
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
    onIntersect: getReviews,
  });

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value.slice(0, 50));
  };

  const handleSubmitReview = async () => {
    if (!review || selectedRating === 0) {
      toast.warn('리뷰와 별점을 모두 입력해주세요!');
      return;
    }
    try {
      await insertBookIfNotExists(bookDetail);
      await submitReview({ bookId: isbn, body: review, star: selectedRating });
      toast.success('리뷰가 등록되었습니다!');
      setReview('');
      setSelectedRating(0);
      setPage(0);
      setHasMore(true);
      setReviewList([]);
      await onReviewSubmit?.();
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
    }
  };

  useEffect(() => {
    setReviewList([]);
    setPage(0);
    setHasMore(true);
  }, [isbn]);

  return (
    <div className="custom-scrollbar h-full max-h-[calc(75vh-68px)] overflow-auto rounded-[10px] px-[20px]">
      <ReviewInput
        review={review}
        selectedRating={selectedRating}
        onReviewChange={handleReviewChange}
        onRatingChange={setSelectedRating}
        onSubmit={handleSubmitReview}
      />

      {isLoading && <BookReviewSkeleton />}

      {reviewList.length === 0 && !isLoading ? (
        <p className="flex h-[400px] items-center justify-center border-t border-t-[#D8D8D8] py-[30px] text-2xl text-gray-500">
          등록된 리뷰가 없습니다.
        </p>
      ) : (
        reviewList.map((item, i) => (
          <ReviewItem key={`${item.id}-${i}`} item={item} />
        ))
      )}

      <div ref={loadMoreRef} className="h-[1px]" />
    </div>
  );
}
