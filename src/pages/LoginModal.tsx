import Login from './Login';

interface LoginModalProps {
  onClose: () => void;
  onOpenSignUp: () => void;
}

export default function LoginModal({ onClose, onOpenSignUp }: LoginModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[380px] items-center justify-center rounded-lg bg-white px-[20px] py-[40px]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500"
        >
          &times;
        </button>
        <Login onClose={onClose} onOpenSignUp={onOpenSignUp} />
      </div>
    </div>
  );
}
