import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onIntersect: () => void;
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onIntersect,
}: UseInfiniteScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observer.current?.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 1 },
    );

    observer.current.observe(ref.current);

    return () => observer.current?.disconnect();
  }, [hasMore, isLoading, onIntersect]);

  return ref;
}
