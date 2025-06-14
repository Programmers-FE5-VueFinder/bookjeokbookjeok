import Rating from '@mui/material/Rating';

const ratingText = [
  '이 도서 어떠셨나요?',
  '매우 불만족 😡',
  '불만족 😟',
  '보통 😊',
  '만족 😄',
  '매우 만족 🥰',
];

interface ReviewInputProps {
  review: string;
  selectedRating: number;
  onReviewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
}

export function ReviewInput({
  review,
  selectedRating,
  onReviewChange,
  onRatingChange,
  onSubmit,
}: ReviewInputProps) {
  return (
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
          onChange={(_e, rating) => onRatingChange(rating ?? 0)}
        />
      </div>
      <div className="relative mt-[14px] flex justify-center gap-[12px]">
        <input
          type="text"
          value={review}
          onChange={onReviewChange}
          maxLength={50}
          placeholder="리뷰를 작성해주세요."
          className="h-[47px] w-[480px] rounded-[5px] border border-[#D6D6D6] pr-[60px] pl-[10px] placeholder:text-[16px] placeholder:text-[#B3B3B3] focus:border-[#08C818] focus:outline-none"
        />
        <span className="absolute top-1/2 right-[90px] -translate-y-1/2 text-[16px] font-medium text-[#969696]">
          {review.length}/50
        </span>
        <button
          className="h-[47px] w-[68px] cursor-pointer rounded-[5px] bg-[#08C818]/20 text-[16px] font-medium"
          onClick={onSubmit}
        >
          작성
        </button>
      </div>
    </div>
  );
}
