import { Link, useNavigate } from 'react-router';
import getElapsedTime from '../../../utils/format-time';
import { readAlarm } from '../../../apis/notification';

export default function AlarmList({ alarm }: { alarm: Alarm }) {
  const navigate = useNavigate();

  const handleReadAlarm = async () => {
    await readAlarm(alarm.id);

    if (alarm.type === 'comment' || alarm.type === 'like') {
      navigate(`/post/${alarm.object_id}`);
    } else if (alarm.type === 'follow') {
      navigate(`/profile/${alarm.sender.id}`);
    } else if (alarm.type === 'book-club') {
      navigate(`/bookclub/${alarm.object_id}`);
    }
  };

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
            <span onClick={handleReadAlarm}>
              {' '}
              "{alarm.objectName}" 북클럽에 가입을 신청했습니다.
            </span>
          )}
          {alarm.type === 'comment' && (
            <span onClick={handleReadAlarm}>
              {' '}
              "{alarm.objectName}" 게시글에 댓글을 남겼습니다.
            </span>
          )}
          {alarm.type === 'like' && (
            <span onClick={handleReadAlarm}>
              {' '}
              "{alarm.objectName}" 게시글을 좋아합니다.
            </span>
          )}
          {alarm.type === 'follow' && (
            <span onClick={handleReadAlarm}> 당신을 팔로우합니다.</span>
          )}
        </p>
        <p className="text-[#898989]">{getElapsedTime(alarm.created_at)}</p>
      </div>
    </li>
  );
}
