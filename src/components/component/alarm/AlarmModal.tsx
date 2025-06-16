import { useEffect, useRef } from 'react';
import AlarmList from './AlarmList';

export default function AlarmModal({
  alarms,
  onClose,
}: {
  alarms: Alarm[];
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <>
      <div
        ref={modalRef}
        className="absolute top-10 right-1 z-1 w-[280px] cursor-default rounded-[5px] bg-white px-[10px] shadow-[0_0_5px_rgba(0,0,0,0.25)]"
      >
        <h2 className="flex h-[36px] w-full items-center justify-center border-b border-[#E4E4E4] text-[16px] font-semibold">
          알림
        </h2>
        <div className="flex h-[50px] items-center justify-between text-[14px]">
          <p>
            <span className="font-bold text-[#08C818]">{alarms.length}</span>
            개의 알림
          </p>
          {alarms.length > 0 && (
            <button className="cursor-pointer rounded p-1 text-[#9E9E9E] hover:bg-[#EDEDED] hover:text-[#525252]">
              모두 읽음
            </button>
          )}
        </div>

        <ul className="mr-[-5px] flex max-h-[250px] flex-col gap-3 overflow-scroll">
          {alarms.length > 0 ? (
            alarms.map((alarm) => <AlarmList alarm={alarm} key={alarm.id} />)
          ) : (
            <p className="text-sm text-[#9E9E9E]">알림이 없습니다.</p>
          )}
        </ul>
      </div>
    </>
  );
}
