import { Link, useParams } from 'react-router';

export default function PostList() {
  const params = useParams();
  return (
    <>
      <h1>PostList Component</h1>
      <Link to={`/channel/${params.channelId}/post/1`}>
        {params.channelId}채널 1번글
      </Link>
    </>
  );
}
