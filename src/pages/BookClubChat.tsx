import { useEffect, useState } from 'react';
import ChatContent from '../components/component/chat-room/ChatContent';
import ChatHeader from '../components/component/chat-room/ChatHeader';
import ChatInput from '../components/component/chat-room/ChatInput';
import { useParams } from 'react-router';
import { fetchBookClub, fetchChat } from '../apis/book-club';
import { fetchAuthId } from '../apis/auth';
import supabase from '../utils/supabase';

export default function BookClubChat() {
  const [isLoading, setIsLoading] = useState(true);

  const bookclub_id = useParams().bookclub_id!;
  const [myId, setMyId] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [bookclub, setBookclub] = useState<Bookclub>();

  useEffect(() => {
    const fetchBookClubInfo = async () => {
      setBookclub(await fetchBookClub(bookclub_id));
    };
    fetchBookClubInfo();
  }, [bookclub_id]);

  useEffect(() => {
    const fetchChats = async () => {
      setChats((await fetchChat(bookclub_id)) ?? []);
      setMyId(await fetchAuthId());
      setIsLoading(false);
    };
    fetchChats();

    const channel = supabase
      .channel(`${bookclub_id}-chat`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'book_club_chat',
          filter: `book_club_id=eq.${bookclub_id}`,
        },
        async () => {
          const newChats = await fetchChat(bookclub_id);
          setChats(newChats ?? []);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // cleanup
    };
  }, [bookclub_id, chats]);

  if (isLoading) return <>로딩중..</>;
  return (
    <>
      <div className="flex h-screen w-screen justify-center">
        <div className="h-[100%] w-[80%] max-w-[1200px]">
          <ChatHeader
            memberCount={bookclub!.member?.length ?? 0}
            bookclubName={bookclub!.name}
          />
          <ChatContent chats={chats} myId={myId} />
          <ChatInput bookclub_id={bookclub_id} />
        </div>
      </div>
    </>
  );
}
