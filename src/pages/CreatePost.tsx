import RequireLoginModal from '../components/common/RequireLoginModal';
import WritePost from '../components/component/write-post/WritePost';

export default function CreatePost() {
  return (
    <>
      <RequireLoginModal />
      <WritePost />
    </>
  );
}
