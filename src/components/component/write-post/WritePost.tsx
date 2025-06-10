import ReactQuillEditor from './ReactQuillEditor';
import { MdArrowBack } from 'react-icons/md';

export default function WritePost() {
  return (
    <>
      <section className="h-screen">
        <form className="flex h-full w-full flex-col">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="mx-auto mt-[30px] mb-[20px] block h-[60px] w-[1200px] max-w-[1200px] pl-[5px] text-[36px] text-[#666666]"
          />
          <input
            type="text"
            placeholder="태그를 입력해주세요."
            className="mx-auto mb-[20px] block h-[40px] w-[1200px] max-w-[1200px] pl-[5px] text-[20px]"
          />
          <ReactQuillEditor />
          <div className="flex h-[60px] min-h-[60px] w-[100%] justify-center border-t border-t-[#D5D5D5]">
            <div className="flex h-[100%] w-[1200px] items-center justify-between">
              <button className="flex items-center gap-[10px] text-[16px] hover:cursor-pointer hover:font-bold">
                <MdArrowBack />
                뒤로가기
              </button>
              <button className="rounded-[5px] bg-[#F1F1F1] px-[23px] py-[8px]">
                저장하기
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
