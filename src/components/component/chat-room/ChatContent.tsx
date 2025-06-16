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

  const messageGroup = chats.reduce<{ [key: string]: Chat[] }>((acc, chat) => {
    const userId = chat.profile.id;
    if (!acc[userId]) acc[userId] = [];
    acc[userId].push(chat);
    return acc;
  }, {});

  useEffect(() => {
    bottomRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <>
      <div className="flex h-[calc(100%-220px)] w-full flex-col gap-5 overflow-y-auto whitespace-pre-line">
        {Object.entries(messageGroup).map(([userId, messages]) => (
          <ChatBubbleGroup
            key={`${userId}-${messages[0].id}`}
            isMy={userId === myId}
            user={messages[0].profile}
            message={messages.map((msg) => ({
              id: msg.id,
              message: msg.message,
              time: msg.created_at,
            }))}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
