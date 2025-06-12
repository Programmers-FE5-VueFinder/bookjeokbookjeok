import { useEffect, useState, useCallback } from 'react';
import { getRelatedBooks } from '../../../apis/book-search';
import type { BookDetail } from '../../../types/book';
import BookPage from './BookPage';
import ReactDOM from 'react-dom';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import RelatedContentSkeleton from './RelatedContentSkeleton';
import Snackbar from '@mui/material/Snackbar';

const MAX_PAGE = 10;

export default function RelatedContents({ genre }: { genre: number }) {
  const [selectedBook, setSelectedBook] = useState<BookDetail | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<BookDetail[]>([]);
  const [fetchedPages, setFetchedPages] = useState<Set<number>>(new Set());
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = (book: BookDetail) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBook(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchBooks = useCallback(async () => {
    if (!hasMore || isFetching || fetchedPages.size >= MAX_PAGE) return;

    setIsFetching(true);

    let randomPage;
    let attempt = 0;

    do {
      randomPage = Math.floor(Math.random() * MAX_PAGE) + 1;
      attempt++;
    } while (fetchedPages.has(randomPage) && attempt < 10);

    if (fetchedPages.has(randomPage)) {
      setHasMore(false);
      setSnackbarOpen(true);
      setIsFetching(false);
      return;
    }

    setFetchedPages((prev) => new Set(prev).add(randomPage));

    try {
      const books = await getRelatedBooks(genre, randomPage);
      if (books.length === 0) {
        setHasMore(false);
        setSnackbarOpen(true);
      } else {
        setRelatedBooks((prev) => [...prev, ...books]);
      }
    } catch (error) {
      console.error('연관 컨텐츠 불러오기 실패:', error);
    } finally {
      setIsFetching(false);
    }
  }, [genre, hasMore, isFetching, fetchedPages]);

  useEffect(() => {
    setRelatedBooks([]);
    setHasMore(true);
    setFetchedPages(new Set());
    setIsFetching(false);
  }, [genre]);

  const loadMoreRef = useInfiniteScroll({
    hasMore,
    isLoading: isFetching,
    onIntersect: fetchBooks,
  });

  return (
    <div className="custom-scrollbar h-full max-h-[calc(75vh-60px)] overflow-auto rounded-[10px]">
      <p className="my-[30px] text-center text-[20px] font-semibold">
        연관 컨텐츠
      </p>
      {isFetching && <RelatedContentSkeleton />}

      <div className="flex flex-wrap justify-between gap-y-[40px] px-[25px] pb-[15px]">
        {relatedBooks.map((book) => (
          <div
            key={book.isbn13 + book.title}
            className="relative w-[150px] flex-shrink-0 cursor-pointer perspective-[2000px]"
            onClick={() => handleOpen(book)}
          >
            <img
              src={book.cover}
              className={`origin-left transition-all duration-700 ease-in-out ${
                isOpen && selectedBook?.isbn13 === book.isbn13
                  ? 'pointer-events-none z-2 mt-[-50px] h-[220px] w-[150px] translate-x-[-5px] -rotate-y-180 rounded-2xl opacity-0'
                  : 'h-[220px] w-[150px] cursor-pointer rounded-sm'
              }`}
            />
            <div className="text-center text-[14px] font-semibold">
              {book.title}
            </div>
            <div className="text-center text-[14px] font-medium">
              {book.author.split('(')[0]}
            </div>
          </div>
        ))}
        {relatedBooks.length % 3 === 1 && <div className="w-[150px]"></div>}
        {relatedBooks.length % 3 === 2 && <div className="w-[150px]"></div>}
      </div>

      {isOpen &&
        selectedBook &&
        ReactDOM.createPortal(
          <BookPage
            isOpen={isOpen}
            closeModal={closeModal}
            bookDetail={selectedBook}
          />,
          document.body,
        )}

      <div ref={loadMoreRef} className="h-[1px]" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={'더 이상 불러올 콘텐츠가 없습니다.'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}
