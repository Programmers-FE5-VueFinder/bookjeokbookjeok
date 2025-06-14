import { useEffect, useState } from 'react';
import type { Post } from '../../../types/type';
import SkeletonCard from '../../common/CardSkeleton2';
import BookCard from '../../common/BookCard';

export default function BookMarkArea({
  post,
  profileImage,
  profileName,
}: {
  post: Post[] | null;
  profileImage: string | null;
  profileName: string | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const finish = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(finish);
  }, []);

  return (
    <>
      <div className="relative items-center justify-center">
        {loading ? null : post?.length === 0 ? (
          <div className="h-[440px]">
            <div className="absolute top-[47%] left-0 w-[261px] text-center">
              <span className="textT1">북마크한 도서가 없습니다.</span>
            </div>
          </div>
        ) : null}
        <div className="grid h-auto gap-[28px] p-[100px] text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <SkeletonCard />
          ) : (
            post?.map((item) => {
              {
                return (
                  <BookCard
                    profileImage={profileImage}
                    key={item.id}
                    body={item.body}
                    title={item.title}
                    nickname={profileName!}
                    createdAt={new Date(item.created_at).toLocaleDateString(
                      'ko-KR',
                    )}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    </>
  );
}
