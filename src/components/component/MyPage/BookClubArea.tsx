import { useEffect, useState } from 'react';
import SkeletonCard from '../../common/CardSkeleton2';
import BookCard from '../../common/BookCard';
import type { book_club } from '../../../pages/Profile';

export default function BookClubArea({
  post,
  profileImage,
  profileName,
  id,
}: {
  post: book_club[] | null;
  profileImage: string | null;
  profileName: string | null;
  id: string | undefined;
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
      <div className="relative items-center">
        {loading ? null : post?.length === 0 ? (
          <div className="h-[440px]">
            <div className="w-[270px absolute top-[47%] left-0 text-center">
              <span className="textT1">참가한 북클럽이 없습니다.</span>
            </div>
          </div>
        ) : null}
        <div className="grid gap-[28px] p-[100px] text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <SkeletonCard />
          ) : (
            post?.map((item) => {
              {
                return (
                  <BookCard
                    profileImage={profileImage}
                    key={item.id}
                    body={item.info}
                    title={item.name}
                    nickname={profileName!}
                    createdAt={new Date(item.created_at).toLocaleDateString(
                      'ko-KR',
                    )}
                    id={id}
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
