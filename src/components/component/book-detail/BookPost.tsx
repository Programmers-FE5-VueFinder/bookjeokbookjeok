import { FaRegComment, FaRegHeart } from 'react-icons/fa';

const posts = [
  {
    id: 1,
    name: '김뿡빵뺑',
    title: '제목이 뭘까요??',
    date: '2025년 05월 21일',
    text: '나는 완벽하지도 않은데 게으른 사람이다. 하지만 욕심은 많다. 나는 욕심 많은 게으른 나태한 사람이다.나는 완벽하지도 않은데 게으른 사람이다. 하지만 욕심은 많다. 나는 욕심 많은 게으른 나태한 사람이다.',
  },
  {
    id: 2,
    name: '김뿡빵뺑',
    title: '제목이 뭘까요??',
    date: '2025년 05월 21일',
    text: '나는 완벽하지도 않은데 게으른 사람이다. 하지만 욕심은 많다. 나는 욕심 많은 게으른 나태한 사람이다.',
  },
  {
    id: 3,
    name: '김뿡빵뺑',
    title: '제목이 뭘까요??',
    date: '2025년 05월 21일',
    text: '나는 완벽하지도 않은데 게으른 사람이다. 하지만 욕심은 많다. 나는 욕심 많은 게으른 나태한 사람이다.',
  },
  {
    id: 4,
    name: '김뿡빵뺑',
    title: '제목이 뭘까요??',
    date: '2025년 05월 21일',
    text: '나는 완벽하지도 않은데 게으른 사람이다. 하지만 욕심은 많다. 나는 욕심 많은 게으른 나태한 사람이다.',
  },
];

export default function BookPost() {
  return (
    <>
      <div className='h-full max-h-[67vh] overflow-auto custom-scrollbar rounded-[10px] '>
        <p className='text-center font-semibold text-[20px] my-[30px]'>포스트</p>
        {posts.map((post) => (
          <div
            key={post.id}
            className=' max-h-full w-full flex-col justify-center p-[15px] pl-[20px]  text-[16px]  border-t border-t-[#D8D8D8]'
          >
            <div className='flex mb-[10px]'>
              <div className='flex items-center gap-[10px] cursor-pointer'>
                <p className='text-[16px] text-[#333333] mt-[2px]'>{post.name}</p>
                <div className='w-[30px] h-[30px] rounded-4xl bg-gray-500'></div>
              </div>
            </div>
            <div className='font-medium flex flex-col gap-[10px] cursor-pointer '>
              <span className='font-semibold text-[16px]'>{post.title}</span>
              <span className=' text-[16px] line-clamp-2'>{post.text}</span>
              <div className='flex justify-between font-medium text-[14px]'>
                <div className='flex  items-center justify-center gap-[4px]'>
                  <span>
                    <FaRegHeart fontSize='small' className='mt-[2px]' />
                  </span>
                  <span className='mr-[4px]'>34</span>
                  <span>
                    <FaRegComment fontSize='small' className='mt-[2px]' />
                  </span>
                  <span>6</span>
                </div>
                <div>{post.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
