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
import CreatePostLayout from './layouts/CreatPostLayout';
import BookClub from '../pages/BookClub';

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
        path: '/profile',
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
        path: '/bookclub',
        Component: BookClub,
      },
    ],
  },
  {
    Component: CreatePostLayout,
    loader: fetchUserData,
    children: [
      {
        path: '/create-post/:category',
        Component: CreatePost,
      },
    ],
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
