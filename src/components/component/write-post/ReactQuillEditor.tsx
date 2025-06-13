import supabase from '../../../utils/supabase.ts';
import { Size } from './quillOverride.ts';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo, useRef } from 'react';
import '../../../css/reactQuillCustom.css';
import { formats } from './quillAttribute.ts';

export default function ReactQuillEditor({
  setValue,
  value,
}: {
  setValue: (value: string) => void;
  value: string;
}) {
  const quillRef = useRef<ReactQuill | null>(null);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: Size.whitelist }],
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
  // useEffect(() => {
  //   if (!selectedBook) return;

  //   setTimeout(() => {
  //     if (!quillRef.current) return;
  //     try {
  //       const editor = quillRef.current.getEditor();
  //       console.log(editor.getContents());
  //       const html = ReactDOMServer.renderToStaticMarkup(
  //         <BookHTML selectedBook={selectedBook} />,
  //       );
  //       editor.clipboard.dangerouslyPasteHTML(0, html);
  //     } catch (e) {
  //       console.error('에디터가 연결 되기 전에 접근:', e);
  //     }
  //   }, 0);
  // }, [selectedBook]);

  return (
    <>
      <div className="flex grow-1 flex-col">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>
    </>
  );
}
