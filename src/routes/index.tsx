import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CreatePost from '../pages/CreatePost';
import ChannelLayout from './layouts/ChannelLayout';
import PostList from '../pages/PostList';
import PostDetail from '../pages/PostDetail';
import Profile from '../pages/Profile';
import SearchResult from '../pages/SearchResult';
import NotFound from '../pages/NotFound';

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
