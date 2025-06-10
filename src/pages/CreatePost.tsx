import WritePost from '../components/component/write-post/WritePost';

export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSeletedBook] = useState<BookDetail | null>(null); //도서 정보

  const onClose = () => setShowModal(false);
  return (
    <>
      <WritePost />
    </>
  );
}
