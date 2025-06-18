export default function PopularDiaryCardSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[150px] w-[590px] animate-pulse rounded-[20px] px-[8px] py-[10px]"
          style={{
            boxShadow: '0px 0px 4px rgba(0, 141, 16, 0.3)',
          }}
        >
          <div className="mr-[15px] h-[130px] w-[130px] rounded-[15px] bg-gray-200" />

          <div className="flex flex-1 flex-col gap-y-[10px] py-2">
            <div className="h-[16px] w-[80px] rounded bg-gray-200" />
            <div className="h-[16px] w-[300px] rounded bg-gray-200" />
            <div className="h-[20px] w-[350px] rounded bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
