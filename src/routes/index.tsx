import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
// import Login from '../pages/Login';
import Profile from '../pages/Profile';
import PostList from '../pages/PostList';
import NotFound from '../pages/NotFound';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import RootLayout from './layouts/RootLayout';
import Notification from '../pages/Notification';
import SearchResult from '../pages/SearchResult';
import ChannelLayout from './layouts/ChannelLayout';
import { fetchUserData } from './loader/auth.loader';
import BookClub from '../pages/BookClub';
import CreateBookClub from '../pages/CreateBookClub';
import BookClubChat from '../pages/BookClubChat';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    loader: fetchUserData,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/channel/:channelId',
        Component: ChannelLayout,
        children: [
          {
            index: true,
            Component: PostList,
          },
          {
            path: 'post/:postId',
            Component: PostDetail,
          },
        ],
      },
      {
        path: '/profile/:userId',
        Component: Profile,
      },
      // {
      //   path: '/login',
      //   Component: Login,
      // },
      {
        path: '/signup',
        Component: SignUp,
      },
      {
        path: '/notification',
        Component: Notification,
      },
      {
        path: '/search',
        Component: SearchResult,
      },
      {
        path: '/create-bookclub',
        Component: CreateBookClub,
      },
      {
        path: '/edit-bookclub/:bookclub_id',
        Component: CreateBookClub,
      },
      {
        path: '/bookclub/:bookclub_id',
        Component: BookClub,
      },
      {
        path: '/create-post',
        Component: CreatePost,
      },
      {
        path: '/create-post/:bookclub_id',
        Component: CreatePost,
      },
    ],
  },
  {
    path: '/bookclub/:bookclub_id/chat',
    Component: BookClubChat,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
