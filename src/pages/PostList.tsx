import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchPosts } from '../apis/post';
import BookCard from '../components/common/BookCard';

const sortOptionsMap: Record<string, string[]> = {
  'diary': ['최신글', '인기글', '팔로잉'],
  'book_club': ['최신글', '인기글', '내 모임'],
  'community': ['최신글', '인기글', '팔로잉'],
};

export default function PostList() {
  const params = useParams();
  const channelId = params.channelId;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const channelNames: { [key: string]: string } = {
    'diary': '다이어리',
    'book_club': '독서모임',
    'community': '자유채널',
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (selectedSort === '최신글') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (selectedSort === '인기글') {
      // return b.likes - a.likes;
    }
    return 0;
  })

  const channelName = channelId
    ? channelNames[channelId] || '알 수 없는 채널'
    : '최신글';
  const sortOptions = channelId ? sortOptionsMap[channelId] || [] : [];
  const [selectedSort, setSelectedSort] = useState<string>('');

  useEffect(() => {
    console.log('channelId:', channelId);
    const loadPosts = async () => {
      setLoading(true);
      const category = channelId ?? 'all';

      const result = await fetchPosts(category);

      
      if (!result) {
        console.error('게시글 응답 없음');
        setLoading(false);
        return;
      }
      
      if (result.error) {
        console.error('게시글 불러오기 실패');
      } else if (result.data) {
        setPosts(result.data);
      }
      
      if (result.data) {
        console.log('백엔드 응답 데이터:', result.data);
      }
      
      setLoading(false);
    };

    loadPosts();
     
    const options = sortOptionsMap[channelId ?? ''];
    if (options && options.length > 0) {
      setSelectedSort(options[0]);
    }

  }, [channelId]);

  return (
    <>
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <h1 className="my-[80px] text-[32px] font-bold">{channelName}</h1>

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

        <div className='my-[132px] bg-red-50'>
          {loading ? (
            <div>로딩중...</div>
          ) : posts.length === 0 ? (
            <div>게시글이 없습니다.</div>
          ) : (
            // 카드 컴포
            <div className='w-fit space-y-4'>
              {sortedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/channel/${post.category}/post/${post.id}`}
                >
                  <BookCard 
                    nickname='잉크묻은 고양이' // 임시 닉네임
                    badge='' // 임시 뱃지
                    title={post.title}
                    body={post.body}
                    image={post.image}
                    likes={34} // 임시 좋아요 값
                    comments={6} // 임시 댓글 값
                    createdAt={new Date(post.created_at).toLocaleDateString()}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>


      <Link to={`/channel/${params.channelId}/post/1`}>
        {params.channelId}채널 1번글
      </Link>
    </>
  );
}
