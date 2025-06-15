import { useEffect, useState } from 'react';
import type { Post } from '../../../types/type';
import BookCard from '../../common/BookCard';
import SkeletonCard from '../../common/CardSkeleton2';
import { Link } from 'react-router';

export default function DiaryArea({
  post,
  profileImage,
  profileName,
  id
}: {
  post: Post[] | null;
  profileImage: string | null;
  profileName: string | null;
  id: string | undefined
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
      <div className="relative w-full items-center justify-center">
        {loading ? null : post?.length === 0 ? (
          <div className="h-[440px]">
            <div className="absolute top-[47%] left-[15%] text-center">
              <span className="textT1">게시글이 없습니다.</span>
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
                  <Link to={`/channel/diary/post/${item.id}`}>
                    <BookCard
                      profileImage={profileImage}
                      key={item.id}
                      body={item.body}
                      title={item.title}
                      nickname={profileName!}
                      createdAt={new Date(item.created_at).toLocaleDateString(
                        'ko-KR',
                      )}
                      id={id}
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
