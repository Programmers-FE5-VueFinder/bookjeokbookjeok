import type { FC } from 'react';

// 이 컴포넌트는 props를 받지 않으므로, 제네릭 타입은 비워둡니다.
const SkeletonCard: FC = () => {
  return (
    <div className="relative h-[440px] w-[278px] flex-col justify-center rounded-2xl bg-white shadow-md">
      {/* 이미지 영역 스켈레톤 */}
      <div className="h-[247px] w-full animate-pulse rounded-t-2xl bg-gray-300"></div>

      <div className="p-[13px] text-start">
        <div className="flex items-center">
          {/* 닉네임 및 뱃지 영역 스켈레톤 */}
          <div className="mr-2 h-5 w-20 animate-pulse rounded bg-gray-300"></div>
        </div>

        {/* 게시글 제목 스켈레톤 */}
        <div className="mt-[15px] h-7 w-3/4 animate-pulse rounded bg-gray-300"></div>

        {/* 게시글 내용 스켈레톤 */}
        <div className="mt-[15px] space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
        </div>

        {/* 하단 정보 영역 */}
        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between px-[13px] pb-[20px]">
          {/* 좋아요, 댓글 스켈레톤 */}
          <div className="flex items-center space-x-4">
            <div className="h-4 w-[80px] animate-pulse rounded bg-gray-300"></div>
          </div>
          {/* 게시일 스켈레톤 */}
          <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
