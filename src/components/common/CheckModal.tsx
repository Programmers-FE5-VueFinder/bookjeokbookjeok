import { Link } from 'react-router';

interface CheckModalProps {
  onClose: () => void;
  content: string;
  click: () => Promise<void>;
}

export default function CheckModal({
  content,
  onClose,
  click,
}: CheckModalProps) {
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
              <button
                className="h-[32px] w-[50%] cursor-pointer content-center items-center justify-center bg-[#bdbfbd] text-center"
                onClick={click}
              >
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
    </>
  );
}
