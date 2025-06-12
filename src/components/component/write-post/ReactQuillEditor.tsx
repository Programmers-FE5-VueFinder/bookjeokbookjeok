import './quillOverride.ts';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../../css/reactQuillCustom.css';
import BookSearchModal from '../BookSearchModal';
import type { BookDetail } from '../../../types/book';
import CustomToolBar from './CustomToolBar.tsx';
import BookHTML from './BookHTML.tsx';
import ReactDOMServer from 'react-dom/server';

export default function ReactQuillEditor({
  category,
  bodyRef,
}: {
  category: string | undefined;
  bodyRef: React.RefObject<ReactQuill | null>;
}) {
  const quillRef = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null); //도서 정보
  const [quillReady, setQuillReady] = useState(false);

  const onClose = () => setShowModal(false);

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'image',
    'size',
    'color',
  ];

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        //custom tool handler 지정
        searchbook: () => {
          setShowModal(true);
        },
      },
    },
  };

  useEffect(() => {
    if (quillRef.current) {
      setQuillReady(true);
    }
  }, []); // 최초 렌더 시점

  useEffect(() => {
    if (selectedBook && quillRef.current && quillReady) {
      const editor = quillRef.current.getEditor();
      const htmlString = ReactDOMServer.renderToStaticMarkup(
        <BookHTML selectedBook={selectedBook} />,
      );
      editor.clipboard.dangerouslyPasteHTML(0, htmlString);
    }
  });

  return (
    <>
      <div className="flex grow flex-col">
        <CustomToolBar category={category} />
        {/* 선택된 도서 정보 */}
        {/* <BookHTML selectedBook={selectedBook} /> */}
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
