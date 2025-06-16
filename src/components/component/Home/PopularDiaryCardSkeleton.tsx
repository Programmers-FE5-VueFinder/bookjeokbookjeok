export default function PopularDiaryCardSkeleton() {
    return (
      <div className="flex flex-col gap-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex w-[590px] h-[150px] rounded-[20px] px-[8px] py-[10px] animate-pulse"
            style={{
              boxShadow: '0px 0px 4px rgba(0, 141, 16, 0.3)',
            }}
          >
            <div className="w-[130px] h-[130px] rounded-[15px] bg-gray-200 mr-[15px]" />
  
            <div className="flex flex-col gap-y-[10px] flex-1 py-2">
              <div className="w-[80px] h-[16px] bg-gray-200 rounded" />
              <div className="w-[300px] h-[16px] bg-gray-200 rounded" />
              <div className="w-[350px] h-[20px] bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  