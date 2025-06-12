import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../../css/reactQuillCustom.css';
import BookSearchModal from '../BookSearchModal';
import type { BookDetail } from '../../../types/book';
import CustomToolBar from './CustomToolBar.tsx';

// const Size = Quill.import('attributors/style/size') as any;
// Size.whitelist = fontsize;
// Quill.register(Size, true);

// const colors = Quill.import('attributors/style/color') as any;
// Quill.register(colors, true);

export default function ReactQuillEditor({
  category,
  bodyRef,
}: {
  category: string | undefined;
  bodyRef: React.RefObject<ReactQuill | null>;
}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null); //도서 정보

  const onClose = () => setShowModal(false);

  const formats = ['bold', 'italic', 'underline', 'strike', 'image', 'size'];

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        //custom tool handler 지정
      },
    },
  };

  return (
    <>
      <div className="flex grow flex-col">
        <CustomToolBar category={category} setShowModal={setShowModal} />
        {/* 선택된 도서 정보 */}
        {selectedBook && (
          <div className="mx-auto mt-[60px] flex max-w-[600px] gap-[20px] bg-[#F6F6F6] p-[20px]">
            <img src={selectedBook.cover} alt={selectedBook.title} />
            <div className="text-[16px] font-medium">
              <p>{selectedBook.title}</p>
              <p className="mt-[20px]">{selectedBook.author.split(' (')[0]}</p>
            </div>
          </div>
        )}

        <ReactQuill
          ref={bodyRef}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>

      {/* 책 검색 모달 */}
      <BookSearchModal
        showModal={showModal}
        onClose={onClose}
        setSeletedBook={setSeletedBook}
      />
    </>
  );
}
