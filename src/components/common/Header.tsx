import { Link } from 'react-router';
import { fetchAuthId, logout } from '../../apis/auth';
import supabase from '../../utils/supabase';
import LoginModal from '../../pages/LoginModal';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';

import SearchIcon from '@mui/icons-material/Search';
import { MdOutlinePersonOutline } from 'react-icons/md';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AlarmModal from '../component/alarm/AlarmModal';
import { fetchAlarmList } from '../../apis/notification';

export default function Header() {
  // const session = useAuthStore((state) => state.session); 나중에 프로필 받아올 때 사용
  const isLogin = useAuthStore((state) => state.isLogin);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const handleLogout = async () => {
    await logout();
    setLogout();
  };

  // 로그인 상태 관리는 zustand로 대체, logout만 auth.ts 사용
  useEffect(() => {
    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setLogin(session);
      } else {
        setLogout();
      }
    };
    syncSession();
  }, [setLogin, setLogout]);

  useEffect(() => {
    if (isLogin) {
      let channel: ReturnType<typeof supabase.channel> | null = null;

      const realimeAlarm = async () => {
        const authId = await fetchAuthId();
        setAlarms((await fetchAlarmList()) ?? []);

        channel = supabase
          .channel(`${authId}-alarm`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'notification',
              filter: `user_id=eq.${authId}`,
            },
            async () => {
              setAlarms((await fetchAlarmList()) ?? []);
            },
          )
          .subscribe();
      };
      realimeAlarm();

      return () => {
        if (channel) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, [isLogin]);
  console.log(alarms);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex h-[100px] w-full items-center justify-center border-b-[1px] border-[#EBEBEB]">
      <div className="flex w-[1200px] content-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-[20px] font-medium">
            북적북적
          </Link>
        </div>

        <nav className="flex gap-x-[65px] text-[16px] font-medium">
          <Link to={'/channel/diary'}>다이어리</Link>
          <Link to={'/channel/book_club'}>북클럽</Link>
          <Link to={'/channel/community'}>자유채널</Link>
          <Link to={'/create-post'}>글작성</Link>
        </nav>

        <div className="flex space-x-4" ref={dropdownRef}>
          <Link to={'/search'}>
            <SearchIcon className="text-black" />
          </Link>
          <div onClick={() => setIsAlarmModalOpen(true)} className="relative">
            <div className="relative">
              <NotificationsOutlinedIcon className="cursor-pointer text-black" />
              {alarms.length > 0 && (
                <div className="absolute top-0 right-0 h-[8px] w-[8px] rounded-full bg-red-500" />
              )}
            </div>
            {isAlarmModalOpen && (
              <AlarmModal
                onClose={() => setIsAlarmModalOpen(false)}
                alarms={alarms}
              />
            )}
          </div>

          {isLogin ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <MdOutlinePersonOutline size={24} className="text-black" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[100px] rounded-[5px] border border-[#E9E9E9] bg-white shadow-md">
                  <Link
                    to="/profile"
                    className="flex w-full items-center justify-center px-4 py-2 text-center text-[16px] font-medium text-black hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                  >
                    프로필
                  </Link>

                  <div className="mx-auto w-[87px] border-t border-[#E9E9E9]"></div>

                  <button
                    className="flex w-full items-center justify-center px-4 py-2 text-[16px] font-medium text-black hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setIsLoginModalOpen(true)}>로그인</button>
              {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
