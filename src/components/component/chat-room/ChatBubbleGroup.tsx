import { Link } from 'react-router';
import ChatBubble from './ChatBubble';
import Avatar from '@mui/material/Avatar';

export default function ChatBubbleGroup({
  isMy,
  user,
  message,
}: {
  isMy: boolean;
  user: User;
  message: {
    message: string;
    time: string;
  }[];
}) {
  return (
    <>
      <div className="flex w-full flex-row gap-3">
        {!isMy && (
          <Link to={`/profile/${user.id}`}>
            <Avatar src={user.image!} />
          </Link>
        )}
        <div className="flex w-full flex-col gap-1">
          {isMy ? <p>&nbsp;</p> : user.name}
          {message.map((m) => (
            <>
              <ChatBubble isMy={isMy} message={m.message} time={m.time} />
            </>
          ))}
        </div>
        {isMy && (
          <Link to={`/profile/${user.id}`}>
            <Avatar src={user.image!} />
          </Link>
        )}
      </div>
    </>
  );
}
