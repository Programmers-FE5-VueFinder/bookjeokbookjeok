import { Link, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <>
      <div>
        <Link to="/">홈</Link>
        <Link to="/login">로그인</Link>
      </div>
      <Outlet />
      <div>
        <Link to={'/'}>홈</Link>
        <Link to={'/create-post'}>글작성</Link>
        <Link to={'/channel/1'}>글목록</Link>
        <Link to={'/profile'}>프로필</Link>
      </div>
    </>
  );
}
