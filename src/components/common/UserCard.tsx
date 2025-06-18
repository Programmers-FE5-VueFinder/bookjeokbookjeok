// import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router';
import ProfileImage from '../component/MyPage/ProfileImg';

export default function UserCard({
  isRecruiting,
  user,
  handleApprove,
  handleReject,
}: {
  isRecruiting?: boolean;
  user: User;
  handleApprove?: (user_id: string) => void;
  handleReject?: (user_id: string) => void;
}) {
  return (
    <>
      <div className="flex h-[211px] w-[160px] flex-col items-center gap-3">
        <Link to={`/profile/${user.id}`}>
          <div className="size-[100px] cursor-pointer overflow-hidden rounded-full shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
            <ProfileImage id={user.id} />
          </div>
        </Link>
        <Link to={`/profile/${user.id}`}>
          <p className="cursor-pointer font-medium">{user.name}</p>
        </Link>
        {isRecruiting ? (
          <div className="flex w-full flex-row justify-center gap-2">
            <button
              className="h-[30px] w-[60px] cursor-pointer rounded bg-[#08C818] pb-[2px] font-medium text-white"
              onClick={() => handleApprove!(user.id)}
            >
              수락
            </button>
            <button
              className="h-[30px] w-[60px] cursor-pointer rounded bg-[#CBCBCB] pb-[2px] font-medium text-white"
              onClick={() => handleReject!(user.id)}
            >
              거절
            </button>
          </div>
        ) : (
          <p
            className={`${!user.intro && 'text-gray-400'} line-clamp-2 w-full cursor-default text-center text-sm break-all whitespace-pre-line`}
          >
            {!user.intro ? '' : user.intro}
          </p>
        )}
      </div>
    </>
  );
}
