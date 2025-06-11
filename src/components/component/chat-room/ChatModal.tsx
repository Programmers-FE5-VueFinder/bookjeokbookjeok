import ChatContent from './ChatContent';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

export default function ChatModal() {
  return (
    <>
      <div className="fixed inset-0 z-1 flex h-screen w-screen justify-center bg-white">
        <div className="h-[100%] w-[80%] max-w-[1200px]">
          <ChatHeader />
          <ChatContent />
          <ChatInput />
        </div>
      </div>
    </>
  );
}
