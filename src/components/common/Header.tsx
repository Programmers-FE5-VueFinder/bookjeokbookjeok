import { Link } from "react-router";
import supabase from "../../utils/supabase";
import LoginModal from "../../pages/LoginModal";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";

import SearchIcon from '@mui/icons-material/Search';
import { MdOutlinePersonOutline } from "react-icons/md";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function Header () {
    // const session = useAuthStore((state) => state.session); 나중에 프로필 받아올 때 사용
    const isLogin = useAuthStore((state) => state.isLogin);
    const setLogout = useAuthStore((state) => state.setLogout);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) setLogout();
      }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex items-center justify-between w-full h-[100px] px-[362px] border-b-[1px] border-[#EBEBEB]">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-[20px] font-medium">북적북적</Link>
            </div>

            <nav className="flex gap-x-[65px] text-[16px] font-medium">
                <Link to={'/channel/diary'}>다이어리</Link>
                <Link to={'/channel/book-club'}>북클럽</Link>
                <Link to={'/channel/free-board'}>자유채널</Link>
                <Link to={'/create-post'}>글작성</Link>
            </nav>

            <div className="flex space-x-4" ref={dropdownRef}>
                <Link to={'/search'}>
                    <SearchIcon className="text-black" />
                </Link>
                <Link to={'/notification'}>
                    <NotificationsOutlinedIcon className="text-black" />
                </Link>

                {isLogin ? (
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(prev => !prev)}>
                            <MdOutlinePersonOutline size={24} className="text-black" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute mt-2 right-0 w-[100px] bg-white rounded-[5px] border border-[#E9E9E9] z-50 shadow-md">
                                <Link 
                                    to="/profile"
                                    className="flex justify-center items-center w-full text-center px-4 py-2 text-black font-medium text-[16px] hover:bg-gray-100"
                                    onClick={() => {setIsDropdownOpen(false);}}
                                >
                                    프로필
                                </Link>

                                <div className="mx-auto w-[87px] border-t border-[#E9E9E9]"></div>

                                <button
                                    className="flex justify-center items-center w-full px-4 py-2 text-black font-medium text-[16px] hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button onClick={() => setIsModalOpen(true)}>로그인</button>
                        {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
                    </>
                )}
            </div>
        </header>
    );
}