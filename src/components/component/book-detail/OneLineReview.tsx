import { useCallback, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { submitReview, fetchReviewsWithStars } from '../../../apis/book-review';
import BookReviewSkeleton from './BookReviewSkeleton';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import type { BookDetail } from '../../../types/book';
import { insertBookIfNotExists } from '../../../apis/add-book-if-not-exists';
import Snackbar from '@mui/material/Snackbar';

const ratingText = [
  '이 도서 어떠셨나요?',
  '매우 불만족 😡',
  '불만족 😟',
  '보통 😊',
  '만족 😄',
  '매우 만족 🥰',
];

interface Review {
  id: string;
  review: string;
  date: string;
  rating: number;
  author: {
    name: string;
    image: string | null;
  };
}

export default function OneLineReview({
  isbn,
  bookDetail,
  onReviewSubmit,
}: {
  isbn: string;
  bookDetail: BookDetail;
  onReviewSubmit?: () => Promise<void>;
}) {
  const [review, setReview] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    position: { vertical: 'top' | 'bottom'; horizontal: 'center' };
  }>({
    open: false,
    message: '',
    position: { vertical: 'top', horizontal: 'center' },
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
          setSnackbar({
            open: true,
            message: '더 이상 불러올 리뷰가 없습니다.',
            position: { vertical: 'bottom', horizontal: 'center' },
          });
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
    setReview(e.target.value.slice(0, 30));
  };

  const handleSubmitReview = async () => {
    if (!review || selectedRating === 0) {
      setSnackbar({
        open: true,
        message: '리뷰와 별점을 모두 입력해주세요!',
        position: { vertical: 'top', horizontal: 'center' },
      });
      return;
    }
    try {
      insertBookIfNotExists(bookDetail);
      await submitReview({ bookId: isbn, body: review, star: selectedRating });
      setSnackbar({
        open: true,
        message: '리뷰가 등록되었습니다!',
        position: { vertical: 'top', horizontal: 'center' },
      });
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
    <div className="custom-scrollbar h-full max-h-[calc(75vh-60px)] overflow-auto rounded-[10px]">
      <div className="rounded-[10px] bg-[#FFFFFF] pb-[20px]">
        <p className="mt-[14px] text-center text-[20px] font-semibold">
          {ratingText[selectedRating]}
        </p>
        <div className="mt-[7px] text-center">
          <Rating
            name="half-rating"
            value={selectedRating}
            precision={1}
            sx={{ fontSize: 40 }}
            onChange={(_event, rating) => setSelectedRating(rating ?? 0)}
          />
        </div>
        <div className="relative mt-[14px] flex justify-center gap-[12px]">
          <input
            type="text"
            value={review}
            onChange={handleReviewChange}
            maxLength={30}
            placeholder="리뷰를 작성해주세요."
            className="h-[47px] w-[480px] rounded-[5px] border border-[#D6D6D6] pr-[60px] pl-[10px] placeholder:text-[16px] placeholder:text-[#B3B3B3] focus:border-[#08C818] focus:outline-none"
          />
          <span className="absolute top-1/2 right-[110px] -translate-y-1/2 text-[16px] font-medium text-[#969696]">
            {review.length}/30
          </span>
          <button
            className="h-[47px] w-[68px] cursor-pointer rounded-[5px] bg-[#08C818]/20 text-[16px] font-medium"
            onClick={handleSubmitReview}
          >
            작성
          </button>
        </div>
      </div>

      {isLoading && <BookReviewSkeleton />}

      {reviewList.length === 0 && !isLoading ? (
        <p className="flex h-[400px] items-center justify-center border-t border-t-[#D8D8D8] py-[30px] text-2xl text-gray-500">
          등록된 리뷰가 없습니다.
        </p>
      ) : (
        reviewList.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="max-h-full border-t border-t-[#D8D8D8] p-[15px] pl-[20px]"
          >
            <div className="flex flex-col gap-[10px] font-medium">
              <div className="flex">
                <div className="flex cursor-pointer">
                  <img
                    src={item.author.image!}
                    alt="작성자 프로필"
                    className="h-[30px] w-[30px] rounded-full object-cover"
                  />

                  <p className="mx-[10px] mt-[2px] text-[16px] text-[#333333]">
                    {item.author.name}
                  </p>
                </div>
                <Rating
                  name="half-rating-read"
                  value={item.rating}
                  precision={1}
                  size="small"
                  readOnly
                  className="mt-[5px]"
                />
              </div>
              <p className="ml-[40px] text-[16px] text-[#333333]">
                {item.review}
              </p>
              <p className="ml-[40px] text-[16px]">{item.date}</p>
            </div>
          </div>
        ))
      )}

      <div ref={loadMoreRef} className="h-[1px]" />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={snackbar.position}
      />
    </div>
  );
}
