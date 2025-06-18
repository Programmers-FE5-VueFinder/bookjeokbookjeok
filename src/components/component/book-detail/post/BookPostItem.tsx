import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import getElapsedTime from '../../../../utils/format-time';
import type { Post } from '../../../../types/post';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { getCommentCount } from '../../../../apis/comment';
import ProfileImage from '../../MyPage/ProfileImg';

export function BookPostItem({ post }: { post: Post }) {
  const navigate = useNavigate();
  const [countComment, setCountComment] = useState(0);

  const commentAmount = useCallback(async () => {
    setCountComment(await getCommentCount(post.id));
  }, [post.id]);

  useEffect(() => {
    commentAmount();
  }, [post.id, commentAmount]);
  return (
    <div className="max-h-full w-full flex-col justify-center border-b border-b-[#D8D8D8] py-[15px] text-[16px]">
      <div className="mb-[10px] flex">
        <div
          onClick={() => navigate(`/profile/${post.user_id}`)}
          className="flex cursor-pointer items-center gap-[10px]"
        >
          {/* <img
            src={post.profile.image!}
            alt="작성자 프로필"
            className="mt-[2px] h-[25px] w-[25px] rounded-full object-cover"
          /> */}
          <ProfileImage
            id={post.user_id}
            className="mt-[2px] h-[25px] w-[25px] rounded-full object-cover"
          />
          <p className="text-[16px] text-[#333333]">{post.profile.name}</p>
        </div>
      </div>

      <div
        onClick={() => navigate(`/channel/${post.category}/post/${post.id}`)}
        className="flex cursor-pointer flex-col gap-[10px] font-medium"
      >
        <span className="line-clamp-1 text-[16px] font-semibold">
          {post.title}
        </span>
        <span className="line-clamp-2 text-[16px]">{post.body}</span>
        <div className="flex justify-between text-[14px] font-medium">
          <div className="flex items-center justify-center gap-[4px]">
            <FaRegHeart fontSize="small" className="mt-[2px]" />
            <span className="mr-[4px]">34</span>
            <FaRegComment fontSize="small" className="mt-[2px]" />
            <span>{countComment}</span>
          </div>
          <div>{getElapsedTime(post.created_at)}</div>
        </div>
      </div>
    </div>
  );
}
