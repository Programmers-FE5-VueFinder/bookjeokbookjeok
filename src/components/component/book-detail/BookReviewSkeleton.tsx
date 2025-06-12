export default function BookReviewSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="max-h-full animate-pulse border-t border-t-[#D8D8D8] p-[15px] pl-[20px]"
        >
          <div className="flex flex-col gap-[10px] font-medium">
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <div className="h-[30px] w-[30px] rounded-4xl bg-gray-300"></div>
                <div className="h-[20px] w-[50px] rounded bg-gray-300"></div>
              </div>
              <div className="h-[20px] w-[80px] rounded bg-gray-300"></div>
            </div>
            <div className="ml-[40px] space-y-2">
              <div className="mt-[10px] h-[18px] w-full max-w-[300px] rounded bg-gray-300"></div>
              <div className="mt-[20px] h-[18px] w-[100px] rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
