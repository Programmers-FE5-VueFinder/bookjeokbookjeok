import type { FC } from 'react';

const SkeletonCard: FC = () => {
  return (
    <div className="relative h-[440px] w-[278px] flex-col justify-center rounded-2xl bg-white shadow-md">
      <div className="h-[247px] w-full animate-pulse rounded-t-2xl bg-gray-300"></div>

      <div className="p-[13px] text-start">
        <div className="flex items-center">
          <div className="mr-2 h-5 w-20 animate-pulse rounded bg-gray-300"></div>
        </div>

        <div className="mt-[15px] h-7 w-3/4 animate-pulse rounded bg-gray-300"></div>

        <div className="mt-[15px] space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between px-[13px] pb-[20px]">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-[80px] animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
