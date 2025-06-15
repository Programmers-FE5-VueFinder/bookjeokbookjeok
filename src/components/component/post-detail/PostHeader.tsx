import { RxDotsVertical } from 'react-icons/rx';
import FollowButton from './FollowButton';
export default function PostHeader() {
  return (
    <>
      <section className="flex w-full justify-center pt-[60px]">
        <div className="w-[1200px] border-b border-[#d8d6d6]">
          <h1 className="mb-[55px] text-[40px] font-bold text-[#333]">title</h1>
          <div className="mb-[35px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-[30px]">
                <span className="text-[16px] text-[#565656]">user name</span>
                <span className="text-[16px] text-[#565656]">channel name</span>
                <span className="text-[16px] text-[#565656]">
                  2025년06월19일
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <FollowButton />
                <RxDotsVertical className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
