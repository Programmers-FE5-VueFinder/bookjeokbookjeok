import { useState } from 'react';
import Rating from '@mui/material/Rating';
const persons = [
  {
    id: 1,
    name: '김뿡빵뺑',
    date: '2025년 05월 21일',
    review:
      '사노 요코 ~하는게 뭐라고 시리즈 저도 정말 좋아해요! 초연한 태도 삶에서 정말 중요한 거 같아요',
    rating: 1,
  },
  {
    id: 2,
    name: '김뿡빵뺑',
    date: '2025년 05월 21일',
    review:
      '사노 요코 ~하는게 뭐라고 시리즈 저도 정말 좋아해요! 초연한 태도 삶에서 정말 중요한 거 같아요',
    rating: 2,
  },
  {
    id: 3,
    name: '김뿡빵뺑',
    date: '2025년 05월 21일',
    review:
      '사노 요코 ~하는게 뭐라고 시리즈 저도 정말 좋아해요! 초연한 태도 삶에서 정말 중요한 거 같아요',
    rating: 3,
  },
  {
    id: 4,
    name: '김뿡빵뺑',
    date: '2025년 05월 21일',
    review:
      '사노 요코 ~하는게 뭐라고 시리즈 저도 정말 좋아해요! 초연한 태도 삶에서 정말 중요한 거 같아요',
    rating: 4,
  },
];

const ratingText = [
  '이 도서 어떠셨나요?',
  '매우 불만족 😡',
  '불만족 😟',
  '보통 😊',
  '만족 😄',
  '매우 만족 🥰',
];

export default function OneLineReview() {
  const [review, setReview] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 30) {
      setReview(inputValue);
    } else {
      setReview(inputValue.slice(0, 30));
    }
  };

  return (
    <>
      <div className="custom-scrollbar h-full max-h-[67vh] overflow-auto rounded-[10px]">
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
              onChange={(_event, rating) => {
                if (rating === null) {
                  setSelectedRating(0);
                } else {
                  setSelectedRating(rating);
                }
              }}
            />
          </div>
          <div className="relative mt-[14px] flex justify-center gap-[12px]">
            {/* 인풋창 */}
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
            <button className="h-[47px] w-[68px] cursor-pointer rounded-[5px] bg-[#08C818]/20 text-[16px] font-medium">
              작성
            </button>
          </div>
        </div>

        {persons.map((person) => (
          <div
            key={person.id}
            className="max-h-full border-t border-t-[#D8D8D8] p-[15px] pl-[20px]"
          >
            <div className="flex flex-col gap-[10px] font-medium">
              <div className="flex">
                <div className="flex cursor-pointer">
                  <div className="h-[30px] w-[30px] rounded-4xl bg-gray-500"></div>
                  <p className="mx-[10px] mt-[2px] text-[16px] text-[#333333]">
                    {person.name}
                  </p>
                </div>
                <Rating
                  name="half-rating-read"
                  defaultValue={person.rating}
                  precision={1}
                  size="small"
                  readOnly
                  className="mt-[5px]"
                />
              </div>
              <p className="ml-[40px] text-[16px] text-[#333333]">
                {person.review}
              </p>
              <p className="ml-[40px] text-[16px]">{person.date}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
