export default function RelatedContentSkeleton() {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-y-[40px] px-[25px] pb-[15px]">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="w-[150px] flex-shrink-0 animate-pulse">
            <div className="mb-2 h-[220px] w-[150px] rounded-md bg-gray-300"></div>
            <div className="mx-auto mb-1 h-5 w-[140px] rounded bg-gray-300"></div>
            <div className="mx-auto h-4 w-[100px] rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </>
  );
}
