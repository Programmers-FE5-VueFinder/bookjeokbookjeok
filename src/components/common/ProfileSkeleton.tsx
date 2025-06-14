export default function ProfileSkeleton() {
  return (
    <div
      className="relative size-[100px] overflow-hidden rounded-full bg-gray-300"
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"
      ></div>
    </div>
  );
}
