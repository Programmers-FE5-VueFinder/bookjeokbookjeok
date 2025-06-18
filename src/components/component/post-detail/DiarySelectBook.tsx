export default function DiarySelectBook({
  imageSrc,
  title,
  author,
}: {
  [key: string]: string | null;
}) {
  const bookTitleSlice = (title: string) => {
    if (title.includes(' (')) return title?.split(' (')[0];
    if (title.includes(' -')) return title?.split(' -')[0];
    return title;
  };
  return (
    <>
      <div className="mb-[40px] flex max-w-[1200px] justify-center rounded-[5px] bg-[#F4F4F4] px-[30px] py-[30px] hover:shadow-[0_0_5px_rgba(0,0,0,.25)]">
        <div className="w-200px flex max-w-[200px] cursor-pointer flex-col items-center gap-[10px] text-center">
          <div className="w-220px cursor-pointerm mb-[5px] max-w-[150px]">
            <img
              className="w-full cursor-pointer"
              src={imageSrc ? imageSrc : ''}
            ></img>
          </div>
          <span className="mb-[10px] cursor-pointer font-semibold text-[#333]">
            {bookTitleSlice(title as string)}
          </span>
          <span className="cursor-pointer font-semibold text-[#666]">
            {author?.split(' (')[0]}
          </span>
        </div>
      </div>
    </>
  );
}
