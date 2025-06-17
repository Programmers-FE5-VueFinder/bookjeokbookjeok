<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f0f701e6f1d82f1e858ac7bc113801a9ec1ffcfb
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
<<<<<<< HEAD
=======
import { Link } from 'react-router';

interface CheckModalProps {
  onClose: () => void;
  content: string;
}

export default function CheckModal({ content, onClose }: CheckModalProps) {
  return (
    <>
      <div className="modal-overlay">
        <div className="h-[150px] w-[350px] items-center justify-center overflow-hidden rounded-lg bg-[var(--color-white)]">
          <div className="h-[36px] content-center items-center justify-center border-b-1 border-[#e8e8e8] text-center">
            <span>알림</span>
          </div>
          <div className="h-[82px] content-center items-center justify-center text-center text-[16px] font-semibold">
            <span>{content}</span>
          </div>
          <div className="w-[350px]">
            <Link to={'/'}>
              <button className="h-[32px] w-[50%] cursor-pointer content-center items-center justify-center bg-[#bdbfbd] text-center">
                <span className="text-[16px] font-semibold text-white">
                  확인
                </span>
              </button>
            </Link>
            <button
              className="h-[32px] w-[50%] cursor-pointer content-center items-center justify-center bg-[var(--color-main)] text-center"
              onClick={onClose}
            >
              <span className="text-[16px] font-semibold text-white">취소</span>
            </button>
          </div>
        </div>
      </div>
>>>>>>> feature/write-post
=======
>>>>>>> f0f701e6f1d82f1e858ac7bc113801a9ec1ffcfb
    </>
  );
}
