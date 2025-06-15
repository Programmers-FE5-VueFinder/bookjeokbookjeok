import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function BookRating() {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [clickIndex, setClickIndex] = useState(0);

  const fillStarOfIndex = (num: number, event: string) => {
    if (event === 'enter' && hoveredStarIndex >= num) {
      return '#DFDFDF';
    }
    if (event === 'leave' && clickedStarIndex >= num) {
      return '#DFDFDF';
    }
    return '#FFCC00';
  };
  return (
    <>
      <div>
        <button className="cursor-pointer">
          <FaStar
            fill={fillStarOfIndex(idx, hoverIndex === 0 ? 'leave' : 'enter')}
          />
        </button>
      </div>
    </>
  );
}
