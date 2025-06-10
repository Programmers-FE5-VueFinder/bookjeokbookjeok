import { useState } from 'react';
import BookSearchModal from '../components/component/BookSearchModal';
import type { BookDetail } from '../types/book';

export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null); //도서 정보

  const onClose = () => setShowModal(false);
  return (
    <>
      <h1>CreatePost Component</h1>

      {/* 책 입력 버튼 */}
      <div className="bg-amber-200" onClick={() => setShowModal(true)}>
        모달 오픈
      </div>
      {/* 책 검색 모달 */}
      <BookSearchModal
        showModal={showModal}
        onClose={onClose}
        setSeletedBook={setSeletedBook}
      />
      {/* 선택한 책 이미지 */}
      {selectedBook && <img src={selectedBook.cover} />}
    </>
  );
}
