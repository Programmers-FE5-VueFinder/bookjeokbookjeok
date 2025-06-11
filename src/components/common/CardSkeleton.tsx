import type { FC } from "react";

const LoadingCardSimple: FC = () => {
  return (
    // 카드 전체에 animate-pulse 적용
    <div className="h-[440px] w-[278px] animate-pulse rounded-2xl bg-gray-200 shadow-md"></div>
  );
};

export default LoadingCardSimple;
