import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';

export default function EditSelectBox({
  selectBoxShow,
}: {
  selectBoxShow: boolean;
}) {
  return (
    <>
      {selectBoxShow && (
        <div className="absolute bottom-[-90px] flex w-[100px] -translate-x-[40%] transform flex-col justify-center rounded-[3px] bg-[#fff] text-[16px] text-[#333] shadow-[0_0_5px_rgba(0,0,0,0.25)]">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="flex h-[40px] cursor-pointer items-center justify-center gap-[5px] hover:bg-[#f1f1f1] hover:font-semibold"
          >
            <CiEdit />
            수정
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="flex h-[40px] cursor-pointer items-center justify-center gap-[5px] hover:bg-[#f1f1f1] hover:font-semibold"
          >
            <AiOutlineDelete />
            삭제
          </button>
        </div>
      )}
    </>
  );
}
