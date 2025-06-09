import Login from './Login';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex w-[380px] items-center justify-center rounded-lg bg-white px-[20px] py-[40px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500"
        >
          &times;
        </button>
        <Login onClose={onClose} />
      </div>
    </div>
  );
}
