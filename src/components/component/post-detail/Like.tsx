import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';

export default function Like() {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="flex h-[150px] w-[1200px] items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setState((state) => !state);
          }}
          className={`gap-3px h-[45px] w-[110px] rounded-[10px] border-[2px] ${state ? 'border-[#08C818] bg-[#BFFFC5]' : 'border-[#D0D0D0] bg-[#F9F9F9]'} text-[16px] font-semibold`}
        >
          <IoMdHeartEmpty
            className={`${state ? 'text-[#08C818]' : 'text-[#D0D0D0]'}`}
          />
          좋아요
        </button>
      </div>
    </>
  );
}
