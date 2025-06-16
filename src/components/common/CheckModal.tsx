import { type Dispatch, type SetStateAction } from 'react';

export default function CheckModal({
  message,
  setter,
  show,
}: {
  message: string;
  setter: Dispatch<SetStateAction<{ show: boolean; active: boolean }>>;
  show: boolean;
}) {
  const handleOnclickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const text = e.currentTarget.textContent;
    if (text === '확인') {
      return setter((prev) => {
        return { ...prev, show: false, active: true };
      });
    }
    if (text === '취소') {
      return setter((prev) => {
        return { ...prev, show: false, active: false };
      });
    }
  };

  return (
    <>
      {show && (
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
      )}
    </>
  );
}
