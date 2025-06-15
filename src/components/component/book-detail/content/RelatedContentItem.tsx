import { formatAuthor } from '../../../../utils/format-author';
import type { BookDetail } from '../../../../types/book';

interface RelatedContentItemProps {
  book: BookDetail;
  isOpen: boolean;
  selectedBook: BookDetail | null;
  onClick: () => void;
}

export function RelatedContentItem({
  book,
  isOpen,
  selectedBook,
  onClick,
}: RelatedContentItemProps) {
  return (
    <div
      className="relative w-[150px] flex-shrink-0 cursor-pointer perspective-[2000px]"
      onClick={onClick}
    >
      <img
        src={book.cover}
        className={`origin-left transition-all duration-600 ease-in-out ${
          isOpen && selectedBook?.isbn13 === book.isbn13
            ? 'pointer-events-none z-2 mt-[-50px] h-[220px] w-[150px] translate-x-[-5px] scale-300 -rotate-y-180 rounded-2xl opacity-0'
            : 'h-[220px] w-[150px] cursor-pointer rounded-sm hover:origin-center hover:-translate-y-2 hover:scale-110 hover:shadow-lg'
        }`}
      />
      <div className="text-center text-[14px] font-semibold">{book.title}</div>
      <div className="text-center text-[14px] font-medium text-[#797979]">
        {formatAuthor(book.author)}
      </div>
    </div>
  );
}
