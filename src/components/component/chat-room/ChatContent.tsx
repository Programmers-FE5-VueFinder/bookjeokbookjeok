import { useEffect, useRef } from 'react';
import ChatBubbleGroup from './ChatBubbleGroup';

export default function ChatContent({
  chats,
  myId,
}: {
  chats: Chat[];
  myId: string;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const messageGroup: Chat[][] = [];
  let lastId = '';
  let message: Chat[] = [];

  for (const chat of chats) {
    if (chat.profile.id !== lastId) {
      if (message.length) messageGroup.push([...message]);
      message = [chat];
      lastId = chat.profile.id;
    } else {
      message.push(chat);
    }
  }
  if (message.length) messageGroup.push(message);

  useEffect(() => {
    bottomRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <>
      <div className="flex h-[calc(100%-220px)] w-full flex-col gap-5 overflow-y-auto whitespace-pre-line">
        {messageGroup.map((messages) => {
          return (
            <ChatBubbleGroup
              key={`${messages[0].profile.id}-${messages[0].id}`}
              isMy={messages[0].profile.id === myId}
              user={messages[0].profile}
              message={messages.map((msg) => ({
                id: msg.id,
                message: msg.message,
                time: msg.created_at,
              }))}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
