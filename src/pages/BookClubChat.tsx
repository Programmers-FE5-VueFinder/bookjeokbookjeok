import { useEffect, useState } from 'react';
import ChatContent from '../components/component/chat-room/ChatContent';
import ChatHeader from '../components/component/chat-room/ChatHeader';
import ChatInput from '../components/component/chat-room/ChatInput';
import { useParams } from 'react-router';
import { fetchChat } from '../apis/book-club';
import { fetchAuthId } from '../apis/auth';

export default function BookClubChat() {
  const [isLoading, setIsLoading] = useState(true);

  const bookclub_id = useParams().bookclub_id!;
  const [myId, setMyId] = useState();
  const [chats, setChats] = useState<Chat[]>();

  useEffect(() => {
    const fetchChats = async () => {
      setChats(await fetchChat(bookclub_id));
      setMyId(await fetchAuthId());
      setIsLoading(false);
    };
    fetchChats();
  }, [bookclub_id]);

  console.log(chats);

  if (isLoading) return <>로딩중..</>;
  return (
    <>
      <div className="flex h-screen w-screen justify-center">
        <div className="h-[100%] w-[80%] max-w-[1200px]">
          <ChatHeader />
          <ChatContent chats={chats} myId={myId} />
          <ChatInput bookclub_id={bookclub_id} />
        </div>
      </div>
    </>
  );
}
