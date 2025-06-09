import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const sortOptionsMap: Record<string, string[]> = {
  'diary': ['인기글', '최신글', '팔로잉'],
  'book-club': ['최신글', '인기글', '내 모임'],
  'free-board': ['인기글', '최신글', '팔로잉'],
};

export default function PostList() {
  const params = useParams();
  const channelId = params.channelId;

  const channelNames: { [key: string]: string } = {
    diary: '다이어리',
    'book-club': '독서모임',
    'free-board': '자유채널',
  };

  const channelName = channelId
    ? channelNames[channelId] || '알 수 없는 채널'
    : '';
  const sortOptions = channelId ? sortOptionsMap[channelId] || [] : [];
  const [selectedSort, setSelectedSort] = useState<string>('');

  useEffect(() => {
    if (channelId && sortOptionsMap[channelId]) {
      setSelectedSort(sortOptionsMap[channelId][0]);
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
      </div>

      <Link to={`/channel/${params.channelId}/post/1`}>
        {params.channelId}채널 1번글
      </Link>
    </>
  );
}
