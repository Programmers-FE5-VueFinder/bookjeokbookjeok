import { useEffect, useState, useCallback } from 'react';
import { getRelatedBooks } from '../../../../apis/book-search';
import type { BookDetail } from '../../../../types/book';
import { useInfiniteScroll } from '../../../../hooks/use-infinite-scroll';
import Snackbar from '@mui/material/Snackbar';
import ReactDOM from 'react-dom';
import RelatedContentSkeleton from './RelatedContentSkeleton';
import BookPage from '../BookPage';
import { RelatedContentItem } from './RelatedContentItem';

const MAX_PAGE = 10;

export function RelatedContents({ genre }: { genre: number }) {
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

  const handleSnackbarClose = () => setSnackbarOpen(false);

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
    <div className="custom-scrollbar h-full max-h-[calc(75vh-68px)] overflow-auto rounded-[10px]">
      <p className="my-[30px] text-center text-[20px] font-semibold">
        연관 컨텐츠
      </p>
      {isFetching && <RelatedContentSkeleton />}

      <div className="flex flex-wrap justify-between gap-y-[40px] px-[25px] pb-[15px]">
        {relatedBooks.map((book) => (
          <RelatedContentItem
            key={book.isbn13 + book.title}
            book={book}
            isOpen={isOpen}
            selectedBook={selectedBook}
            onClick={() => handleOpen(book)}
          />
        ))}
        {relatedBooks.length % 3 === 1 && <div className="w-[150px]" />}
        {relatedBooks.length % 3 === 2 && <div className="w-[150px]" />}
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
        message="더 이상 불러올 콘텐츠가 없습니다."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}
