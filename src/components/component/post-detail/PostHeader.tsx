import { RxDotsVertical } from 'react-icons/rx';
import FollowButton from './FollowButton';
import EditSelectBox from './EditSelectBox';
import { useEffect, useRef, useState } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { useAuthStore } from '../../../store/authStore';

export default function PostHeader({
  title,
  name,
  time,
  category,
  setModalShow,
  writeUserId,
  path,
}: {
  title: string;
  name: string;
  time: string;
  category: string;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  writeUserId: string;
  path: string;
}) {
  const [selectBoxShow, setSelectBoxShow] = useState(false);
  const accountValid = useRef(false);
  const session = useAuthStore((state) => state.session);
  console.log(accountValid.current);

  useEffect(() => {
    accountValid.current = writeUserId === session?.user.id ? true : false;
  }, [path]);

  return (
    <>
      <section className="flex w-full justify-center pt-[60px]">
        <div className="w-[1200px] border-b border-[#d8d6d6]">
          <h1 className="mb-[30px] cursor-default text-[40px] font-bold text-[#333]">
            {title}
          </h1>
          <div className="mb-[30px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex cursor-default items-center gap-[30px]">
                <span className="text-[16px] text-[#565656]">{name}</span>
                <span className="text-[16px] text-[#565656]">
                  {category.toLocaleUpperCase().replace(/_/g, ' ')}
                </span>
                <span className="text-[16px] text-[#565656]">{time}</span>
              </div>
              <div className="flex items-center gap-[5px]">
                {accountValid.current ? (
                  <div
                    onClick={() => setSelectBoxShow((prev) => !prev)}
                    className="relative"
                  >
                    <RxDotsVertical className="cursor-pointer" />
                    {selectBoxShow && (
                      <EditSelectBox
                        setSelectBoxShow={setSelectBoxShow}
                        setModalShow={setModalShow}
                      />
                    )}
                  </div>
                ) : (
                  <FollowButton />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
