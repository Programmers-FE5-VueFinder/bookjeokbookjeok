import './customBlot.ts';
import './quillOverride.ts';
import supabase from '../../../utils/supabase.ts';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo, useRef, useEffect } from 'react';
import '../../../css/reactQuillCustom.css';
import { formats } from './quillAttribute.ts';
import type { BookDetail } from '../../../types/book';

export default function ReactQuillEditor({
  setValue,
  value,
  selectedBook,
}: {
  setValue: (value: string) => void;
  value: string;
  selectedBook: BookDetail | null;
}) {
  const quillRef = useRef<ReactQuill | null>(null);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [
            {
              size: [
                '10px',
                '12px',
                '14px',
                '16px',
                '18px',
                '20px',
                '24px',
                '32px',
              ],
            },
          ],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }],
          [{ align: [] }],
          [{ color: [] }],
          ['image'],
        ],
        handlers: {
          image: () => {
            imageHandler();
          },
        },
      },
    };
  }, []);

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;
      const file = input.files[0];
      const safeFileName = encodeURIComponent(file.name);
      const fileName = `public/posts/${Date.now()}_${safeFileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        });

      console.log(data);

      if (error) {
        console.error('Upload error:', error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(fileName);

      const quill = quillRef!.current!.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range!.index, 'image', publicUrl);
      quill.setSelection(range!.index + 1);
    };
  };

  //트러블 슈팅-생명주기, 라이브러리 인스턴스 생성 시기
  useEffect(() => {
    if (!selectedBook) return;

    setTimeout(() => {
      if (!quillRef.current) return;
      const quill = quillRef!.current!.getEditor();

      quill.insertEmbed(0, 'detailBook', {
        bookId: selectedBook.isbn,
        imgSrc: selectedBook.cover,
        title: selectedBook.title,
        author: selectedBook.author.split(' (')[0],
      });
    }, 0);
  }, [selectedBook]);

  return (
    <>
      <div className="flex grow-1 flex-col">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={['detailBook', ...formats]}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </>
  );
}
