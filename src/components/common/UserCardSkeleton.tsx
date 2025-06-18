import Skeleton from '@mui/material/Skeleton';

export default function UserCardSkeleton() {
  return (
    <div className="flex h-[211px] w-[160px] flex-col items-center gap-2">
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" width={100} height={24} />
      <Skeleton variant="rectangular" width={160} height={40} />
    </div>
  );
}
