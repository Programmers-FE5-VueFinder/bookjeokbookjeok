import { useState } from 'react';
import BookSearchModal from '../components/component/BookSearchModal';

export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);
  return (
    <>
      <h1>CreatePost Component</h1>

      <div className="bg-amber-200" onClick={() => setShowModal(true)}>
        모달 오픈
      </div>
      <BookSearchModal showModal={showModal} onClose={onClose} />
    </>
  );
}
