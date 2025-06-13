import { useState } from 'react';

export default function BookRating() {
  const [rating, setRating] = useState(0);
  return (
    <>
      <button className="cursor-pointer">
        <FaStar
          key={num}
          onClick={(e) => {
            e.preventDefault();
            setRating(num);
          }}
          className="text-[#DFDFDF] hover:text-[#FFCC00]"
        />
      </button>
    </>
  );
}
