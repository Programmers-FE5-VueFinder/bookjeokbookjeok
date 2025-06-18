import { useEffect, useState } from 'react';
import BookCard from '../../common/BookCard';
import SkeletonCard from '../../common/CardSkeleton2';
import { Link } from 'react-router';
import type { Post } from '../../../pages/Profile';

export default function CommunityArea({
  post,
  profileImage,
  profileName,
  id,
}: {
  post: Post[] | null;
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
      <div className="relative w-full items-center justify-center">
        {loading ? null : post?.length === 0 ? (
          <div className="min-h-[calc(100vh-1570px)]">
            <div className="absolute top-[47%] left-[15%] text-center">
              <span className="textT1">게시글이 없습니다.</span>
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
                  <Link to={`/post/${item.id}`}>
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
                      book_id={item.book_id}
                      post_id={item.id}
                      image={post[0].image}
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
