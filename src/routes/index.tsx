import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import PostList from '../pages/PostList';
import NotFound from '../pages/NotFound';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import RootLayout from './layouts/RootLayout';
import Notification from '../pages/Notification';
import SearchResult from '../pages/SearchResult';
import ChannelLayout from './layouts/ChannelLayout';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/create-post',
        Component: CreatePost,
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
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/notification',
        Component: Notification,
      },
      {
        path: '/search',
        Component: SearchResult,
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
