import type { BookDetail } from '../../../types/book';

export default function BookHTML({
  selectedBook,
}: {
  selectedBook: BookDetail | null;
}) {
  if (selectedBook === null) return;
  return (
    <>
      <div
        id="seletedBook"
        className="mx-auto mt-[60px] flex max-w-[600px] gap-[20px] bg-[#F6F6F6] p-[20px]"
      >
        <img src={selectedBook.cover} alt={selectedBook.title} />
        <div className="text-[16px] font-medium">
          <p>{selectedBook.title}</p>
          <p className="mt-[20px]">{selectedBook.author.split(' (')[0]}</p>
        </div>
      </div>
    </>
  );
}
