import { Link } from "react-router";
import { useAuthStore } from "../../store/authStore";

export default function Header () {
    const { isLoggedIn } = useAuthStore();

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

            <div className="flex space-x-4">
                <Link to={'/search'}>검색</Link>
                <Link to={'/notification'}>알림</Link>
                {isLoggedIn ? (
                    <Link to="/profile">마이페이지</Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </div>
        </header>
    );
}