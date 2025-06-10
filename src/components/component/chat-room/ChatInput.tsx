import { IoSend } from 'react-icons/io5';

export default function ChatInput() {
  const sendMessage = () => {};

  return (
    <>
      <style>
        {`
          @keyframes bounce-x {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-10px); }
          }
        `}
      </style>

      <form
        className="relative flex h-[110px] w-[100%] items-center"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="의견을 남겨주세요"
          className="h-[80px] w-[100%] rounded-full pr-25 pl-10 text-2xl leading-[80px] placeholder-[#ADADAD] shadow-[0_0_4px_rgba(0,0,0,0.25)] focus:outline-none"
        ></input>
        <button
          type="submit"
          className="absolute right-7 hover:[animation:bounce-x_1s_infinite] hover:cursor-pointer"
        >
          <IoSend size={40} />
        </button>
      </form>
    </>
  );
}
