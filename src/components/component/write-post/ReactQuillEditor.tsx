import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../../css/reactQuillCustom.css';
import { IoIosArrowDown } from 'react-icons/io';

// const Size = Quill.import('attributors/style/size') as any;
// Size.whitelist = fontsize;
// Quill.register(Size, true);

// const colors = Quill.import('attributors/style/color') as any;
// Quill.register(colors, true);

const CustomToolbar = ({ category }: { category: string | undefined }) => (
  <div id="toolbar">
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-image" />
    <select className="ql-size" defaultValue="medium">
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
      <option value="huge">Huge</option>
    </select>
    {category === 'diary' && <button className="searchbook">도서찾기</button>}
  </div>
);

export default function ReactQuillEditor() {
  //path : diary, bookclub, freetalk
  const path = useParams();

  const quillRef = useRef(null);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(path.category);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const categoryToggleHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const text = e.target.textContent;

    if (text === '다이어리') setCategory('diary');
    if (text === '독서모임') setCategory('bookclub');
    if (text === '자유채널') setCategory('freetalk');

    setCategoryToggle(false);
  };

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
        <div className="flex h-[50px] items-center justify-between">
          <CustomToolbar category={category} />
          <div
            id="categorySelect"
            onClick={() => setCategoryToggle(true)}
            className="relative flex cursor-pointer items-center justify-center gap-[4px] rounded-[5px] bg-[#F1F1F1] px-[10px] py-[2px] text-[14px]"
          >
            {category} <IoIosArrowDown />
            {categoryToggle && (
              <div className="bg-red absolute top-[25px] z-1 w-full rounded-br-[5px] rounded-bl-[5px] bg-[#fff]">
                <ul className="w-full shadow-[0_0_5px_rgba(0,0,0,0.25)]">
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    다이어리
                  </li>
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    독서모임
                  </li>
                  <li
                    onClick={(e) => categoryToggleHandler(e)}
                    className="cursor-pointer rounded-br-[4px] rounded-bl-[4px] px-[10px] py-[5px] hover:bg-[#f1f1f1]"
                  >
                    자유채널
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
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
