import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import getElapsedTime from '../../../../utils/format-time';
import type { Post } from '../../../../types/post';

export function BookPostItem({ post }: { post: Post }) {
  return (
    <div className="max-h-full w-full flex-col justify-center border-b border-b-[#D8D8D8] py-[15px] text-[16px]">
      <div className="mb-[10px] flex">
        <div className="flex cursor-pointer items-center gap-[10px]">
          <img
            src={post.profile.image!}
            alt="작성자 프로필"
            className="mt-[2px] h-[25px] w-[25px] rounded-full object-cover"
          />
          <p className="text-[16px] text-[#333333]">{post.profile.name}</p>
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-[10px] font-medium">
        <span className="line-clamp-1 text-[16px] font-semibold">
          {post.title}
        </span>
        <span className="line-clamp-2 text-[16px]">{post.body}</span>
        <div className="flex justify-between text-[14px] font-medium">
          <div className="flex items-center justify-center gap-[4px]">
            <FaRegHeart fontSize="small" className="mt-[2px]" />
            <span className="mr-[4px]">34</span>
            <FaRegComment fontSize="small" className="mt-[2px]" />
            <span>6</span>
          </div>
          <div>{getElapsedTime(post.created_at)}</div>
        </div>
      </div>
    </div>
  );
}
