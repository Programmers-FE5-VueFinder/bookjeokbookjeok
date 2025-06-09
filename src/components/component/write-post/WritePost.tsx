import ReactQuillEditor from './ReactQuillEditor';

export default function WritePost() {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="mb-[30px] h-[60px] w-[1200px] max-w-[1200px] text-[36px] text-[#666666]"
        />
        <input
          type="text"
          placeholder="태그를 입력해주세요."
          className="h-[40px] w-[1200px] max-w-[1200px] text-[20px]"
        />
        <input type="text" />
        <ReactQuillEditor />
        <div>
          <button>뒤로가기</button>
          <button>저장하기</button>
        </div>
      </form>
    </>
  );
}
