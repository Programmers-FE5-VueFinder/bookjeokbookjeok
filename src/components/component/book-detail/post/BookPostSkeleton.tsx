export default function BookPostSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="max-h-full w-full animate-pulse space-y-[14px] border-b border-b-[#D8D8D8] p-[15px] pl-[20px]"
        >
          <div className="flex items-center gap-[12px]">
            <div className="h-[25px] w-[25px] rounded-full bg-gray-300" />
            <div className="h-[18px] w-[100px] rounded bg-gray-300" />
          </div>

          <div className="space-y-[10px]">
            <div className="h-[22px] w-[30%] rounded bg-gray-300" />
            <div className="h-[18px] w-[40%] rounded bg-gray-200" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="h-[14px] w-[35px] rounded bg-gray-300" />
              <div className="h-[14px] w-[35px] rounded bg-gray-300" />
            </div>
            <div className="h-[14px] w-[60px] rounded bg-gray-300 text-right" />
          </div>
        </div>
      ))}
    </>
  );
}
