import { useEffect, useState } from 'react';
import BookPost from './BookPost';
import OneLineReview from './OneLineReview';
import RelatedContents from './RelatedContents';
import { FaCaretDown } from 'react-icons/fa6';
import { CiBookmark } from 'react-icons/ci';
import Rating from '@mui/material/Rating';
import type { BookDetail } from '../../../types/book';

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
  const [selectedContent, setSelectedCotent] = useState<
    'oneLineReview' | 'relatedContents' | 'post'
  >('oneLineReview');

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

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
              <div className="relative px-[32px] pt-[20px]">
                <div className="flex flex-col gap-[20px] text-[16px] font-semibold">
                  <span className="text-[#08C818]">
                    {bookDetail.categoryName.split('>')[1]}
                  </span>
                  <div className="flex gap-[5px]">
                    <span className="text-[20px] font-semibold text-[#333333]">
                      {bookDetail.title}
                    </span>
                    <CiBookmark className="mt-[5px] shrink-0 cursor-pointer text-[24px]" />
                  </div>
                  <span className="flex justify-between text-[16px] font-semibold text-[#797979]">
                    {bookDetail.author.split('(')[0]}{' '}
                    <div className="mr-[15px] flex items-center justify-center">
                      <Rating
                        name="half-rating-read"
                        defaultValue={4.6}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <span className="ml-[6px] text-[16px] font-bold text-black">
                        4.6
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-[15px] line-clamp-3 h-[80px] text-[16px] font-medium">
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
            <div className="flex h-[60px] items-center justify-around rounded-t-[20px] text-[16px] font-medium text-[#2B2B2B]">
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'oneLineReview'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedCotent('oneLineReview')}
              >
                한 줄 리뷰
              </div>
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'relatedContents'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedCotent('relatedContents')}
              >
                연관 콘텐츠
              </div>
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center ${
                  selectedContent === 'post'
                    ? 'border-b-[#08C818] font-semibold text-[#08C818]'
                    : 'border-b-[#D8D8D8]'
                } border-b-[3px]`}
                onClick={() => setSelectedCotent('post')}
              >
                포스트
              </div>
            </div>

            {selectedContent === 'oneLineReview' && <OneLineReview />}
            {selectedContent === 'relatedContents' && <RelatedContents />}
            {selectedContent === 'post' && <BookPost />}
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
