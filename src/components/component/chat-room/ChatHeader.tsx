import { BsFillPersonFill } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function ChatHeader() {
  const navigate = useNavigate();
  const backHandler = () => navigate(-1);

  return (
    <>
      <div className="flex h-[110px] w-[100%] items-center justify-between px-[20px]">
        <div className="flex cursor-default items-center gap-1">
          <BsFillPersonFill size={24} />
          21 {/* 멤버 수 */}
        </div>
        <div className="cursor-default text-xl font-bold">
          매주 한 권 {/* 북클럽 이름 */}
        </div>
        <div
          className="hover:scale-120 hover:cursor-pointer hover:duration-200 active:scale-90 active:duration-100"
          onClick={backHandler}
        >
          <IoCloseOutline size={30} />
        </div>
      </div>
    </>
  );
}
