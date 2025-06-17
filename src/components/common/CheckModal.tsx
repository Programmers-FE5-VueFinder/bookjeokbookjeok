import { type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router';

export default function CheckModal({
  message,
  action,
  setter,
  postId,
}: {
  message: string;
  setter: Dispatch<SetStateAction<boolean>>;
  action: (id: string) => void;
  postId: string;
}) {
  const navigate = useNavigate();
  const handleOnclickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const text = e.currentTarget.textContent;
    if (text === '확인') {
      action(postId);
      setter(false);
      navigate(-1);
      return;
    }
    if (text === '취소') {
      setter(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="absolute h-[150px] w-[350px] rounded-[5px] bg-[#fff] shadow-[0_0_5px_rgba(0,0,0,0.25)]">
          <div className="flex h-[35px] w-full items-center justify-center rounded-tl-[5px] rounded-tr-[5px] border-b border-[#f1f1f1]">
            알림
          </div>
          <div className="flex h-[83px] items-center justify-center font-semibold">
            {message}
          </div>
          <div className="flex">
            <button
              onClick={(e) => handleOnclickButton(e)}
              className="flex h-[32px] w-[50%] cursor-pointer items-center justify-center rounded-bl-[5px] bg-[rgba(8,200,24,.7)] font-semibold text-[#fff]"
            >
              확인
            </button>
            <button
              onClick={(e) => handleOnclickButton(e)}
              className="flex h-[32px] w-[50%] cursor-pointer items-center justify-center rounded-br-[5px] bg-[#c6c6c6] font-semibold text-[#fff]"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
