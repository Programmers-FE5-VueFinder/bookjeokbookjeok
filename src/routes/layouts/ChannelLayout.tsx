import { Navigate, Outlet, useParams } from 'react-router';

export default function ChannelLayout() {
  const params = useParams();
  const validChannelIds = ['diary', 'book_club', 'community'];

  if (!params.channelId || !validChannelIds.includes(params.channelId)) {
    return <Navigate to="/notfound" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}