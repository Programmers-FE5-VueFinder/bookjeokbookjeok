import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import PostList from '../pages/PostList';
import NotFound from '../pages/NotFound';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import RootLayout from './layouts/RootLayout';
import SearchResult from '../pages/SearchResult';
import ChannelLayout from './layouts/ChannelLayout';
import { fetchUserData } from './loader/auth.loader';
import BookClub from '../pages/BookClub';
import CreateBookClub from '../pages/CreateBookClub';
import BookClubChat from '../pages/BookClubChat';
import EditPost from '../pages/EditPost';
import CreatePostLayout from './layouts/CreatPostLayout';

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
        path: '/post/:postId',
        Component: PostDetail,
      },
      {
        path: '/channel/:channelId',
        Component: ChannelLayout,
        children: [
          {
            index: true,
            Component: PostList,
          },
        ],
      },
      {
        path: '/profile/:userId',
        Component: Profile,
      },
      {
        path: '/signup',
        Component: SignUp,
      },
      {
        path: '/search',
        Component: SearchResult,
      },
      {
        path: '/bookclub/:bookclub_id',
        Component: BookClub,
      },
    ],
  },
  {
    Component: CreatePostLayout,
    loader: fetchUserData,
    children: [
      {
        path: '/create-post',
        Component: CreatePost,
      },
      {
        path: '/create-post/:bookclub_id',
        Component: CreatePost,
      },
      {
        path: '/create-bookclub',
        Component: CreateBookClub,
      },
      {
        path: '/editpost/:postId',
        Component: EditPost,
      },
      {
        path: '/edit-bookclub/:bookclub_id',
        Component: CreateBookClub,
      },
    ],
  },
  {
    path: '/bookclub/:bookclub_id/chat',
    Component: BookClubChat,
  },
  {
    path: '/createpost',
    loader: fetchUserData,
    Component: CreatePost,
  },
  {
    path: '/editpost/:post_id',
    loader: fetchUserData,
    Component: EditPost,
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
