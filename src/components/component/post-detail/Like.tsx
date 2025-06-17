import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';

export default function Like() {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="flex h-[200px] w-[1200px] items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setState((state) => !state);
          }}
          className={`flex h-[45px] w-[110px] cursor-pointer items-center justify-center gap-[3px] rounded-[12px] border-[3px] text-[#333] ${state ? 'border-[#08C818] bg-[#BFFFC5] text-[#08C818]' : 'border-[#D0D0D0] bg-[#F9F9F9] text-[#D0D0D0]'} text-[16px] font-semibold`}
        >
          <IoMdHeartEmpty
            className={`text-[24px] ${state ? 'text-[#08C818]' : 'text-[#D0D0D0]'}`}
          />
          좋아요
        </button>
      </div>
    </>
  );
}
