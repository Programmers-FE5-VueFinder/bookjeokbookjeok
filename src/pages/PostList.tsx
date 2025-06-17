import clsx from 'clsx';
import { Link, useParams } from 'react-router';
import { useEffect, useState, useMemo } from 'react';
import BookCard from '../components/common/BookCard';
import type { Post, PostDetail } from '../types/type';
import { fetchPostDetail, fetchPosts } from '../apis/post';
import SkeletonCard from '../components/common/CardSkeleton2';
import { useAuthStore } from '../store/authStore';
import { fetchFollowingPosts } from '../apis/following-posts';

const sortOptionsMap: Record<string, string[]> = {
  diary: ['최신글', '인기글', '팔로잉'],
  book_club: ['최신글', '인기글', '내 모임'],
  community: ['최신글', '인기글', '팔로잉'],
};

export default function PostList() {
  const params = useParams();
  const channelId = params.channelId;

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostDetail[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostDetail[]>([]);
  const myProfileId = useAuthStore((state) => state.session?.user.id);

  const channelNames: { [key: string]: string } = {
    diary: '다이어리',
    book_club: '북클럽',
    community: '자유채널',
  };

  const channelName = channelId
    ? channelNames[channelId] || '알 수 없는 채널'
    : '최신글';
  const sortOptions = channelId ? sortOptionsMap[channelId] || [] : [];
  const [selectedSort, setSelectedSort] = useState<string>('');

  useEffect(() => {
    // console.log('channelId:', channelId);
    const loadPosts = async () => {
      setLoading(true);
      const category = channelId ?? 'all';

      const result = await fetchPosts(category);

      if (!result || !result.data) {
        console.error('게시글 불러오기 실패', result?.error);
        setPosts([]);
        setLoading(false);
        return;
      }
      
      const detailPosts: PostDetail[] = await Promise.all(
        result.data.map(async (post: Post) => {
          const detail = await fetchPostDetail(post.id);
          // console.log('Post Detail 응답 데이터:', detail);
          return {
            ...post,
            profile: detail?.profile ?? {
              id: 'unknown',
              name: '익명',
              image: null,
              intro: null,
              appellation: null,
              created_at: new Date().toISOString(),
            },
            like: detail?.like ?? [],
            comment: detail?.comment ?? [],
            book: detail?.book
              ? {
                  id: detail.book.id,
                  cover: detail.book.cover ?? '',
                }
              : undefined,
          };
        }),
      );
      
      setPosts(detailPosts);
      setLoading(false);
    };
    
    loadPosts();
    
    const options = sortOptionsMap[channelId ?? ''];
    if (options && options.length > 0) {
      setSelectedSort(options[0]);
    }
  }, [channelId]);
  
  // 팔로잉 포스트 목록
  useEffect(() => {
    const loadFollwingPosts = async () => {
      if (!myProfileId) return; 
      setLoading(true);

      const fetchedPosts = await fetchFollowingPosts(myProfileId);
      setFollowingPosts(fetchedPosts);
      setLoading(false);
    };

    if (selectedSort === '팔로잉') {
      loadFollwingPosts();
    }
  }, [myProfileId, selectedSort]);

  const sortedPosts = useMemo(() => {
    // 팔로잉
    if (selectedSort === '팔로잉') {
      return [...followingPosts].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    // // 인기글 정렬
    if (selectedSort === '인기글') {
      return [...posts].sort((a, b) => b.like.length - a.like.length);
    }
    // 최신글(기본)
    return [...posts].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [posts, followingPosts, selectedSort]);

  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h1 className="my-[80px] text-[32px] font-bold">{channelName}</h1>
        <div className="flex justify-between">
          <div className="flex gap-x-[10px]">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSort(option)}
                className={clsx(
                  'flex h-[34px] w-[100px] items-center justify-center rounded-[20px] border-none px-4 py-2 text-[16px]',
                  selectedSort === option
                    ? 'bg-[#08C818] font-bold text-[#FFFFFF]'
                    : 'bg-[#F3F1F1] font-bold text-[#333333] hover:bg-gray-300',
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {channelName === '북클럽' && (
            <Link
              to={`/create-bookclub`}
              className="flex h-[34px] w-[140px] cursor-pointer items-center justify-center rounded-full bg-[#F3F1F1] text-[16px] font-bold text-[#333333] hover:bg-gray-300"
            >
              북클럽 만들기
            </Link>
          )}
        </div>

        <div className="my-[132px] w-full">
          {loading ? (
            <SkeletonCard />
          ) : sortedPosts.length === 0 ? (
            <div>게시글이 없습니다.</div>
          ) : (
            // 카드 컴포
            <div className="grid h-fit w-[1200px] grid-cols-4 gap-[28px]">
              {sortedPosts.map((post) => {
                return (
                  <Link key={post.id} to={`/channel/${post.category}/post/${post.id}`}>
                    <BookCard
                      nickname={post.profile.name || '잉크묻은 고양이'}
                      title={post.title}
                      body={post.body}
                      image={
                        post.category === 'diary'
                          ? post.book?.cover ?? ''  
                          : post.image             
                      }
                      profileImage={post.profile.image}
                      likes={post.like.length}
                      comments={post.comment.length}
                      id={post.profile.id}
                      createdAt={new Date(post.created_at).toLocaleDateString()}
                      category={post.category}
                      book_id={post.book?.id}
                    />
                  </Link>
                );
              })}

            </div>
          )}
        </div>
      </div>
    </>
  );
}
