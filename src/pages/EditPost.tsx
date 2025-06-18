import WritePost from '../components/component/write-post/WritePost';
import { fetchPostDetail } from '../apis/post';
import type { PostDetail } from '../types/post';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuthStore } from '../store/authStore';

export default function EditPost() {
  const { post_id } = useParams();
  const [content, setContent] = useState<PostDetail>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLogIn = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    if (!isLogIn) navigate('/');
  }, [isLogIn]);

  useEffect(() => {
    async function postDetail() {
      try {
        const response = await fetchPostDetail(post_id as string);
        console.log(response);
        setContent(response);
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    }
    postDetail();
  }, [post_id]);

  return (
    <>
      {loading && (
        <WritePost editPostData={content} bookTitle={content?.book?.title} />
      )}
    </>
  );
}
