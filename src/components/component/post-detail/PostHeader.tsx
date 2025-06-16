import { RxDotsVertical } from 'react-icons/rx';
import FollowButton from './FollowButton';
import EditSelectBox from './EditSelectBox';
import { useState } from 'react';
export default function PostHeader({
  title,
  name,
  time,
  category,
}: {
  title: string;
  name: string;
  time: string;
  category: string;
}) {
  const [selectBoxShow, setSelectBoxShow] = useState(false);

  return (
    <>
      <section className="flex w-full justify-center pt-[60px]">
        <div className="w-[1200px] border-b border-[#d8d6d6]">
          <h1 className="mb-[55px] cursor-default text-[40px] font-bold text-[#333]">
            {title}
          </h1>
          <div className="mb-[30px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex cursor-default items-center gap-[30px]">
                <span className="text-[16px] text-[#565656]">{name}</span>
                <span className="text-[16px] text-[#565656]">
                  {category.toLocaleUpperCase()}
                </span>
                <span className="text-[16px] text-[#565656]">{time}</span>
              </div>
              <div className="flex items-center gap-[5px]">
                <FollowButton />
                <div
                  onClick={() => setSelectBoxShow((prev) => !prev)}
                  className="relative"
                >
                  <RxDotsVertical className="cursor-pointer" />
                  <EditSelectBox selectBoxShow={selectBoxShow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
