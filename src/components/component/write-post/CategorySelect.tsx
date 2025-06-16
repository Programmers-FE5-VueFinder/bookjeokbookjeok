import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default function CategorySelect({
  setCategory,
}: {
  setCategory: (category: string) => void;
}) {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [seletText, setSelectText] = useState('채널선택');

  const categoryChangeHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const text = e.currentTarget.textContent as string;
    if (text === '다이어리') {
      setCategory('diary');
    } else {
      setCategory('');
    }

    setSelectText(text);
    setCategoryToggle((toggle) => !toggle);
  };

  return (
    <>
      <div
        id="categorySelect"
        onClick={() => setCategoryToggle((toggle) => !toggle)}
        style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
        className="ml-[calc(1300px - 1200px)] relative mt-[15px] flex w-fit cursor-pointer items-center justify-center gap-[4px] rounded-[5px] bg-[#F1F1F1] px-[10px] py-[2px] text-[14px]"
      >
        {seletText} <IoIosArrowDown />
        {categoryToggle && (
          <div className="absolute top-[25px] z-1 w-full rounded-br-[5px] rounded-bl-[5px] bg-[#fff]">
            <ul className="shadow-[0_0_5px_rgba(0,0,0,0.25)]">
              <li
                onClick={(e) => categoryChangeHandler(e)}
                className="cursor-pointer px-[10px] py-[5px] hover:bg-[#f1f1f1]"
              >
                다이어리
              </li>
              <li
                onClick={(e) => categoryChangeHandler(e)}
                className="cursor-pointer rounded-br-[4px] rounded-bl-[4px] px-[10px] py-[5px] hover:bg-[#f1f1f1]"
              >
                자유채널
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
