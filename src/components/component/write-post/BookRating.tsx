import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function BookRating({
  setRating,
}: {
  setRating: (num: number) => void;
}) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [clickIndex, setClickIndex] = useState(0);

  const fillStarOfIndex = (num: number, event: string) => {
    if (event === 'enter' && hoverIndex < num) {
      return '#DFDFDF';
    }
    if (event === 'leave' && clickIndex < num) {
      return '#DFDFDF';
    }
    return '#FFCC00';
  };
  return (
    <>
      <div
        onMouseLeave={() => {
          if (clickIndex === 0) return;
          setHoverIndex(0);
        }}
        style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
        className="mt-[15px] flex w-fit gap-[5px]"
      >
        {[1, 2, 3, 4, 5].map((num) => {
          return (
            <button
              key={num}
              onMouseEnter={() => setHoverIndex(num)}
              onMouseLeave={() => setHoverIndex(0)}
              onClick={() => {
                setClickIndex(num);
                setRating(num);
              }}
              className="cursor-pointer"
            >
              <FaStar
                fill={fillStarOfIndex(
                  num,
                  hoverIndex === 0 ? 'leave' : 'enter',
                )}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
