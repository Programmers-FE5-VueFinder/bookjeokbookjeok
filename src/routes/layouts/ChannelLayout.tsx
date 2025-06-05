import { Link, Navigate, Outlet, useParams } from 'react-router';

export default function ChannelLayout() {
  const params = useParams();
  const validChannelIds = ['1', '2', '3'];

  if (!params.channelId || !validChannelIds.includes(params.channelId)) {
    return <Navigate to="/notfound" replace />;
  }
  return (
    <>
      <Link to={'/channel/1'}>1채널</Link>
      <Link to={'/channel/2'}>2채널</Link>
      <Link to={'/channel/3'}>3채널</Link>
      <Outlet />
    </>
  );
}
