import { useState, useEffect, useCallback, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { searchBooks } from '../../apis/book-search';
import type { BookDetail } from '../../types/book';
import { MdCancel } from 'react-icons/md';

interface BookSearchModalProps {
  showModal: boolean;
  onClose: () => void;
  setSeletedBook: (book: BookDetail) => void;
}

export default function BookSearchModal({
  showModal,
  onClose,
  setSeletedBook,
}: BookSearchModalProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BookDetail[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = await searchBooks(query);
      setResults(items);
    } catch (error) {
      console.error('도서 검색 오류:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    }

    const delaySearch = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, handleSearch]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/50 backdrop-blur-[3px]"
      onClick={() => {
        onClose();
        setQuery('');
      }}
    >
      <div
        className={`relative mt-[20vh] w-[628px] justify-center rounded-[5px] bg-white px-[30px] py-[20px] transition-all duration-200 ${
          results.length > 0 || isLoading ? 'max-h-[550px]' : 'max-h-[130px]'
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-[12px] text-center text-[16px] font-bold">도서 검색</p>

        <div className="relative mb-[20px]">
          <input
            type="text"
            value={query}
            ref={searchRef}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="도서를 검색 해주세요"
            className="h-[40px] w-full rounded border border-[#D6D6D6] px-[10px] placeholder:text-[16px] placeholder:text-[#B3B3B3]"
          />
          {query && (
            <MdCancel
              className="absolute top-1/2 right-[14px] h-[24px] w-[24px] -translate-y-1/2 cursor-pointer text-[#2F2F2F]"
              onClick={() => {
                setResults([]);
                setQuery('');
                searchRef.current?.focus();
              }}
            />
          )}
          {!query && (
            <IoSearch className="absolute top-1/2 right-[14px] h-[24px] w-[24px] -translate-y-1/2 cursor-pointer text-[#2F2F2F]" />
          )}
        </div>

        {/* 검색 결과 리스트 */}

        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#08C818] border-t-transparent"></div>
          </div>
        ) : (
          results.length > 0 && (
            <ul className="max-h-[410px] overflow-y-auto transition-opacity duration-200">
              {results.map((book: BookDetail) => (
                <li
                  key={book.isbn}
                  className="group flex cursor-pointer p-2 hover:bg-[#08C818]/20"
                  onClick={() => {
                    setSeletedBook(book);
                    console.log(book.isbn);
                    onClose();
                    setQuery('');
                  }}
                >
                  <div className="flex w-full flex-col text-left">
                    <p className="line-clamp-1 max-w-full font-medium group-hover:font-semibold">
                      {book.title}
                    </p>
                    <p className="font-medium whitespace-nowrap text-black/50">
                      {book.author.split('(')[0]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
