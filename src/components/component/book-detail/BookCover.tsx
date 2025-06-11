type BookCoverProps = {
  isOpen: boolean;
  onClick: () => void;
  bookCover: string;
};

export default function BookCover({
  isOpen,
  onClick,
  bookCover,
}: BookCoverProps) {
  return (
    <>
      <img
        src={bookCover}
        alt="book-cover"
        className={`fixed top-1/2 origin-left -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
          isOpen
            ? 'pointer-events-none z-2 mt-[-50px] h-[590px] w-[500px] translate-x-[-5px] -rotate-y-180 rounded-2xl opacity-0'
            : 'z-4 h-[140px] w-[100px] cursor-pointer rounded-sm'
        } `}
        onClick={onClick}
      />
    </>
  );
}
