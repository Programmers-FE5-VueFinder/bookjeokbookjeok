import Rating from '@mui/material/Rating';
import getElapsedTime from '../../../../utils/format-time';
import type { Review } from '../../../../types/book';

export function ReviewItem({ item }: { item: Review }) {
  return (
    <div className="max-h-full border-t border-t-[#D8D8D8] py-[15px]">
      <div className="flex flex-col gap-[10px] font-medium">
        <div className="flex">
          <div className="flex cursor-pointer">
            <img
              src={item.author.image!}
              alt="작성자 프로필"
              className="mt-[2px] h-[25px] w-[25px] rounded-full object-cover"
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
        <p className="ml-[40px] text-[16px] text-[#333333]">{item.review}</p>
        <p className="ml-[40px] text-[16px]">{getElapsedTime(item.date)}</p>
      </div>
    </div>
  );
}
