import { Link } from 'react-router';
import getElapsedTime from '../../../utils/format-time';

export default function AlarmList({ alarm }: { alarm: Alarm }) {
  return (
    <li className="relative flex flex-col gap-1 text-left text-[14px]">
      <div className="absolute top-[8px] h-[5px] w-[5px] rounded-full bg-[#FF3333]" />
      <div className="ml-3 flex flex-col gap-1">
        <p className="line-clamp-2 cursor-pointer break-all">
          <Link to={`/profile/${alarm.sender.id}`} className="font-semibold">
            {alarm.sender.name}
          </Link>
          님이
          {alarm.type === 'book-club' && (
            <Link to={`/bookclub/${alarm.object_id}`}>
              {' '}
              "{alarm.objectName}" 북클럽에 가입을 신청했습니다.
            </Link>
          )}
          {alarm.type === 'comment' && (
            <Link to={`/post/${alarm.object_id}`}>
              {' '}
              "{alarm.objectName}" 게시글에 댓글을 남겼습니다.
            </Link>
          )}
          {alarm.type === 'like' && (
            <Link to={`/post/${alarm.object_id}`}>
              {' '}
              "{alarm.objectName}" 게시글을 좋아합니다.
            </Link>
          )}
          {alarm.type === 'follow' && (
            <Link to={`/profile/${alarm.sender.id}`}>
              {' '}
              당신을 팔로우합니다.
            </Link>
          )}
        </p>
        <p className="text-[#898989]">{getElapsedTime(alarm.created_at)}</p>
      </div>
    </li>
  );
}
