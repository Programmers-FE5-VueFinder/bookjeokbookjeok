import { useEffect, useState } from 'react';
import SkeletonCard from '../../common/CardSkeleton2';
import BookMarkCard from '../MyPage/BookMarkCard';
import type { BookMark } from '../../../pages/Profile';

export default function BookMarkArea({
  post,
  profileImage,
  profileName,
  id,
}: {
  post: BookMark[] | null;
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
                  <BookMarkCard
                    profileImage={profileImage}
                    key={item.id}
                    body={item.book_id}
                    title={item.id}
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
