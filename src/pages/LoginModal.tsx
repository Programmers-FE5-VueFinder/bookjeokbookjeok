import Login from "./Login";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center items-center px-[20px] py-[40px] bg-white rounded-lg relative w-[380px]">
        <button 
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 text-xl"
        >
            &times;
        </button>
        <Login onClose={onClose} />
      </div>
    </div>
  );
}
