import { Outlet } from 'react-router';
import Header from '../../components/common/Header';

export default function CreatePostLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
