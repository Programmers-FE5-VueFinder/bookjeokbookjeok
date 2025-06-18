import { useEffect, useState } from 'react';
import SkeletonCard from '../../common/CardSkeleton2';
// import BookCard from '../../common/BookCard';
import type { book_club } from '../../../pages/Profile';
import { Link } from 'react-router';
import BookClubCard from './BookClubCard';

export default function BookClubArea({
  post,
  profileImage,
  profileName,
  id,
}: {
  post: book_club[] | null | undefined;
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
          <div className="min-h-[calc(100vh-770px)]">
            <div className="absolute top-[47%] left-0 w-[270px] text-center">
              <span className="textT1">참가한 북클럽이 없습니다.</span>
            </div>
          </div>
        ) : null}
        <div className="grid min-h-[calc(100vh-570px)] gap-[28px] p-[100px] text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <SkeletonCard />
          ) : (
            post?.map((item) => {
              {
                return (
                  <Link to={`/bookclub/${item[0].id}`}>
                    <BookClubCard
                      profileImage={profileImage}
                      key={item[0].id}
                      body={item[0].info}
                      title={item[0].name}
                      nickname={profileName!}
                      createdAt={new Date(item[0].created_at).toLocaleDateString(
                        'ko-KR',
                      )}
                      id={id}
                      post_id={item[0].id}
                    />
                  </Link>
                );
              }
            })
          )}
        </div>
      </div>
    </>
  );
}
