import type { BookDetail } from '../../../types/book';

export default function BookHTML({
  selectedBook,
  setSeletedBook,
  setShowModal,
}: {
  selectedBook: BookDetail | null;
  setSeletedBook: (book: BookDetail | null) => void;
  setShowModal: (bol: boolean) => void;
}) {
  if (selectedBook === null) return;

  const handleResearchBook = () => {
    setSeletedBook(null);
    setShowModal(true);
  };
  return (
    <>
      <div
        style={{ marginLeft: 'calc((100% - 1200px) / 2)' }}
        className="flex h-[130px] w-fit cursor-default items-center gap-[5px] border border-dashed border-[#333] px-[5px] py-[5px] text-[#333]"
      >
        <img
          src={selectedBook.cover}
          alt={selectedBook.title}
          className="h-[120px] shadow-[0_0_5px_rgba(0,0,0,0.25)]"
        />
        <div className="relative flex h-full flex-col justify-between text-[16px] font-medium">
          <div>
            <p className="mb-[10px] text-[15px] font-semibold">
              {selectedBook.title}
            </p>
            <p>{selectedBook.author.split(' (')[0]}</p>
          </div>
          <button
            onClick={handleResearchBook}
            className="flex h-[30px] w-[80px] cursor-pointer items-center justify-center rounded-[5px] bg-[#F1F1F1] text-[14px] hover:bg-[#41D94D] hover:font-semibold hover:text-[#fff]"
          >
            다시 찾기
          </button>
        </div>
      </div>
    </>
  );
}
