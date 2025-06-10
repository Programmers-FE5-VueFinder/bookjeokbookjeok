import ChatBubble from './ChatBubble';
import Avatar from '@mui/material/Avatar';

export default function ChatBubbleGroup({
  isMy,
  name,
  message,
}: {
  isMy: boolean;
  name: string;
  message: {
    message: string;
    time: string;
  }[];
}) {
  return (
    <>
      <div className="flex w-full flex-row gap-3">
        {!isMy && <Avatar />}
        <div className="flex w-full flex-col gap-1">
          {isMy ? '\n' : name}
          {message.map((m) => (
            <>
              <ChatBubble isMy={isMy} message={m.message} time={m.time} />
            </>
          ))}
        </div>
        {isMy && <Avatar />}
      </div>
    </>
  );
}
