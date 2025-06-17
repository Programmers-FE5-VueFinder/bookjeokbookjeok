import WritePost from '../components/component/write-post/WritePost';
import { fetchPostDetail } from '../apis/post';
import type { PostDetail } from '../types/post';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function EditPost() {
  const { post_id } = useParams();
  const [content, setContent] = useState<PostDetail | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function postDetail() {
      const response = await fetchPostDetail(post_id as string);
      setContent(response);
      setLoading(true);
    }
    postDetail();
  }, [post_id]);

  return <>{loading && <WritePost editPostData={content} />}</>;
}
