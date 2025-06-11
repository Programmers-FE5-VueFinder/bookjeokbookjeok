export default function ChatBubble({
  isMy,
  message,
  time,
}: {
  isMy: boolean;
  message: string;
  time: string;
}) {
  return (
    <>
      <div className={`relative mb-3 flex gap-3 ${isMy ? 'justify-end' : ''}`}>
        {!isMy && (
          <div className="max-w-[50%] rounded-r-xl rounded-bl-xl bg-[#d9d9d930] p-[20px] text-base break-all">
            {message}
          </div>
        )}
        <div className="self-end text-sm text-[#A8A8A8]">{time}</div>
        {isMy && (
          <div className="max-w-[50%] rounded-l-xl rounded-br-xl bg-[#08C81830] p-[20px] text-base break-all text-[#333333]">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
