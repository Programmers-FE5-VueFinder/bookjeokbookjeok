import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface BookSearchModal {
  showModal: boolean;
  onClose: () => void;
}

export default function BookSearchModal({
  showModal,
  onClose,
}: BookSearchModal) {
  const [query, setQuery] = useState('');

  if (!showModal) return null;

  return (
    <>
      {showModal && (
        <div
          className={
            'fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          }
          onClick={onClose}
        >
          <div
            className={`relative w-[628px] rounded-[5px] bg-[#FFFFFF] px-[30px]`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="my-[12px] text-center text-[16px] font-medium">
              도서 검색
            </p>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="도서를 검색 해주세요"
              className="mb-[35px] h-[40px] w-full rounded border border-[#D6D6D6] px-[10px] placeholder:text-[16px] placeholder:text-[#B3B3B3]"
            />
            <IoSearch className="absolute top-[68px] right-[44px] h-[24px] w-[24px] -translate-y-1/2" />
          </div>
        </div>
      )}
    </>
  );
}
