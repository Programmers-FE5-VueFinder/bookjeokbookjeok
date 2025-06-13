import BookCard from '../../common/BookCard';

export default function BookMarkArea() {
  return (
    <>
      <div className="grid gap-[28px] p-[100px] md:grid-cols-2 lg:grid-cols-4">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </>
  );
}
