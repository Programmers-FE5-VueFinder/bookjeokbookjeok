import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { deletePost } from '../../../apis/post';
import { useNavigate, useParams } from 'react-router';
import { type Dispatch, type SetStateAction } from 'react';

export default function EditSelectBox({
  selectBoxShow,
  setter,
  active,
}: {
  selectBoxShow: boolean;
  setter: Dispatch<SetStateAction<{ show: boolean; active: boolean }>>;
  active: boolean;
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  console.log(postId);

  return (
    <>
      {selectBoxShow && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-[-90px] flex w-[100px] -translate-x-[40%] transform flex-col justify-center rounded-[3px] bg-[#fff] text-[16px] text-[#333] shadow-[0_0_5px_rgba(0,0,0,0.25)]"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/editpost/${postId}`);
            }}
            className="flex h-[40px] cursor-pointer items-center justify-center gap-[5px] hover:bg-[#f1f1f1] hover:font-semibold"
          >
            <CiEdit />
            수정
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (active) {
                await deletePost(postId as string);
                navigate(-1);
              }
              setter((prev) => {
                return { ...prev, show: true, active: false };
              });
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
