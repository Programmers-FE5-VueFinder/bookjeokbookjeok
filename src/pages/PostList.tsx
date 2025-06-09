import { Link, useParams } from 'react-router';
import clsx from 'clsx';
import { useEffect ,useState } from 'react';

const sortOptionsMap: Record<string, string[]> = {
  'diary' : ['인기글', '최신글', '팔로잉'],
  'book-club' : ['최신글', '모집중', '내 모임'],
  'free-board' : ['인기글', '최신글', '팔로잉'],
}

export default function PostList() {
  const params = useParams();
  const channelId = params.channelId;
  
  const channelNames: { [key: string]: string} = {
    'diary' : '다이어리',
    'book-club' : '북클럽',
    'free-board' : '자유채널'
  };
  
  const channelName = channelId ? channelNames[channelId] || '알 수 없는 채널' : '';
  const sortOptions = channelId ? sortOptionsMap[channelId] || [] : [];
  const [selectedSort, setSelectedSort] = useState<string>('');

  useEffect(() => {
    if (channelId && sortOptionsMap[channelId]) {
      setSelectedSort(sortOptionsMap[channelId][0]);
    }
  }, [channelId])

  return (
    <>
      <div className='px-[362px]'>

        <h1 className='text-[32px] font-bold my-[80px]'>{channelName}</h1>

        <div className='flex gap-x-[10px]'>
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedSort(option)}
              className={clsx(
                'flex justify-center items-center w-[100px] h-[34px] px-4 py-2 rounded-[20px] border-none text-[16px]',
                selectedSort === option
                  ? 'bg-[#08C818] text-[#FFFFFF] font-bold'
                  : 'bg-[#F3F1F1] text-[#333333] font-bold hover:bg-gray-300'
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
