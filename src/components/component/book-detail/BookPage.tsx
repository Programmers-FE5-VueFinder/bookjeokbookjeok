import { useCallback, useEffect, useState } from 'react';
import { FaCaretDown, FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import Rating from '@mui/material/Rating';
import type { BookDetail } from '../../../types/book';
import { insertBookIfNotExists } from '../../../apis/add-book-if-not-exists';
import { checkBookExists } from '../../../apis/book-review';
import {
  addBookmark,
  isBookBookmarked,
  removeBookmark,
} from '../../../apis/bookmark';
import { getBookStars } from '../../../apis/book-review';
import { formatAuthor } from '../../../utils/format-author';
import { toast } from 'react-toastify';
import { OneLineReview } from './review/OneLineReview';
import { BookPost } from './post/BookPost';
import { RelatedContents } from './content/RelatedContents';

type BookPagesProps = {
  isOpen: boolean;
  closeModal: () => void;
  bookDetail: BookDetail;
};

export default function BookPage({
  isOpen,
  closeModal,
  bookDetail,
}: BookPagesProps) {
  const [visible, setVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState<
    'oneLineReview' | 'relatedContents' | 'post'
  >('oneLineReview');

  const [bookmarked, setBookmarked] = useState(false);
  const [averageStar, setAverageStar] = useState<number>(0);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleAddBookmark = async () => {
    if (isBookmarking) return;

    setIsBookmarking(true);
    try {
      await insertBookIfNotExists(bookDetail);
      await addBookmark(bookDetail.isbn13);
      setBookmarked(true);
      toast.success('북마크에 추가했습니다.');
    } catch (error) {
      console.error('북마크 추가 실패:', error);
    } finally {
      setTimeout(() => setIsBookmarking(false), 2000);
    }
  };

  const handleRemoveBookmark = async () => {
    if (isBookmarking) return;

    setIsBookmarking(true);
    try {
      await removeBookmark(bookDetail.isbn13);
      setBookmarked(false);
      toast.success('북마크에서 제거했습니다.');
    } catch (error) {
      console.error('북마크 삭제 실패:', error);
    } finally {
      setTimeout(() => setIsBookmarking(false), 2000);
    }
  };

  const refreshAverageStar = async () => {
    const newAverage = await loadAverageStar(bookDetail.isbn13);
    setAverageStar(newAverage);
  };

  const checkBookmarkStatus = useCallback(async () => {
    try {
      const exists = await checkBookExists(bookDetail.isbn13);
      if (!exists) {
        return;
      }

      const result = await isBookBookmarked(bookDetail.isbn13);
      setBookmarked(result);
    } catch (error) {
      console.error('북마크 상태 확인 실패:', error);
    }
  }, [bookDetail]);

  async function loadAverageStar(isbn13: string): Promise<number> {
    try {
      const stars = await getBookStars(isbn13);
      if (!stars.length) return 0;

      const sumStars = stars.reduce((a, b) => a! + b!, 0);
      return Math.round((sumStars! / stars.length) * 10) / 10;
    } catch (error) {
      console.error('별점 평균 로딩 실패:', error);
      return 0;
    }
  }

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      checkBookmarkStatus();
      loadAverageStar(bookDetail.isbn13).then(setAverageStar);
    } else {
      setVisible(false);
    }
  }, [isOpen, bookDetail, checkBookmarkStatus]);

  if (!isOpen) return null;
  return (
    <>
      <div
        onClick={closeModal}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[75px] w-full"
        >
          {/* 왼쪽 페이지 */}
          <div
            className={`origin-left transition-all duration-700 ${
              visible
                ? 'z-30 h-full max-h-[75vh] w-[600px] translate-x-[-5px] rotate-y-180 rounded-[20px] bg-[#FFFFFF]'
                : 'z-20 h-[140px] w-[100px] rounded-[20px]'
            } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <div className="custom-scrollbar h-full rotate-y-180 overflow-auto pb-[5px]">
              <div className="relative flex h-[47vh] w-full items-center justify-center overflow-hidden rounded-t-[20px]">
                {/* 흐린 배경 이미지 */}
                <img
                  src={bookDetail.cover}
                  alt={`${bookDetail.title}-cover-bg`}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 brightness-60"
                />
                {/* 표지 이미지 */}
                <img
                  src={bookDetail.cover}
                  alt={`${bookDetail.title}-cover`}
                  className="relative z-10 object-cover"
                />
              </div>
              <div className="custom-scrollbar relative max-h-[500px] overflow-auto px-[32px] pt-[20px]">
                <div className="flex flex-col gap-[20px] text-[16px] font-semibold">
                  <span className="text-[#08C818]">
                    {bookDetail.categoryName.split('>')[1]}
                  </span>
                  <div className="flex gap-[5px]">
                    <span className="text-[20px] font-semibold text-[#333333]">
                      {bookDetail.title}
                    </span>
                    {bookmarked ? (
                      <FaBookmark
                        onClick={handleRemoveBookmark}
                        className="mt-[5px] shrink-0 cursor-pointer text-[24px] text-[#08C818]"
                      />
                    ) : (
                      <FaRegBookmark
                        onClick={handleAddBookmark}
                        className="mt-[5px] shrink-0 cursor-pointer text-[24px] text-[#ccc] hover:text-[#08C818]"
                      />
                    )}
                  </div>
                  <span className="flex justify-between text-[16px] font-semibold text-[#797979]">
                    {formatAuthor(bookDetail.author)}
                    <div className="mr-[15px] flex items-center justify-center">
                      <Rating
                        name="half-rating-read"
                        value={averageStar}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <span className="ml-[6px] text-[16px] font-bold text-black">
                        {averageStar.toFixed(1)}
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-[15px] max-h-[200px] pb-[20px] text-[16px] font-medium">
                  {bookDetail.description}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 페이지 */}
          <div
            className={`bg-[#FFFFFF] transition-all duration-700 ${
              visible
                ? 'z-10 h-full max-h-[75vh] w-[600px] translate-x-[5px] rounded-[20px]'
                : 'z-10 h-[140px] w-[100px]'
            } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {/* 탭 메뉴 */}
            <div className="flex h-[68px] items-center justify-around rounded-t-[20px] text-[16px] font-medium text-[#2B2B2B]">
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'oneLineReview'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedContent('oneLineReview')}
              >
                한 줄 리뷰
              </div>
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'relatedContents'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedContent('relatedContents')}
              >
                연관 콘텐츠
              </div>
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'post'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedContent('post')}
              >
                포스트
              </div>
            </div>

            {selectedContent === 'oneLineReview' && (
              <OneLineReview
                isbn={bookDetail.isbn13}
                bookDetail={bookDetail}
                onReviewSubmit={refreshAverageStar}
              />
            )}
            {selectedContent === 'relatedContents' && (
              <RelatedContents genre={bookDetail.categoryId} />
            )}
            {selectedContent === 'post' && (
              <BookPost isbn={bookDetail.isbn13} />
            )}
          </div>

          {/* 닫기 버튼 */}
          <FaCaretDown
            className="fixed bottom-[30px] left-1/2 mt-6 h-[50px] w-[50px] -translate-x-1/2 cursor-pointer rounded-full bg-[#D9D9D9]/50 text-[#DDDDDD]"
            onClick={closeModal}
          />
        </div>
      </div>
    </>
  );
}
