import Avatar from '@mui/material/Avatar';

export default function UserCard({
  isRecruiting,
  user,
}: {
  isRecruiting?: boolean;
  user: User;
}) {
  return (
    <>
      <div className="flex h-[211px] w-[160px] flex-col items-center gap-2">
        <Avatar
          sx={{ width: 80, height: 80 }}
          src={user.image!}
          className="cursor-pointer shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
        />
        <p className="cursor-pointer font-medium">{user.name}</p>
        {isRecruiting ? (
          <div className="flex w-full flex-row justify-center gap-2">
            <button className="h-[30px] w-[60px] cursor-pointer rounded bg-[#08C818] pb-[2px] font-medium text-white">
              수락
            </button>
            <button className="h-[30px] w-[60px] cursor-pointer rounded bg-[#CBCBCB] pb-[2px] font-medium text-white">
              거절
            </button>
          </div>
        ) : (
          <p
            className={`${!user.intro && 'text-gray-400'} line-clamp-2 w-full cursor-default text-center text-sm break-all`}
          >
            {!user.intro ? '한 줄 소개를 작성하지 않았습니다.' : user.intro}
          </p>
        )}
      </div>
    </>
  );
}
