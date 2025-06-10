import { Link } from 'react-router';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="flex h-[100px] w-full justify-center bg-[#333]">
        <div className="flex h-full w-[1200px] items-center justify-between font-bold text-[#fff]">
          <Link to={'/'}>북적북적</Link>
          <div className="flex gap-[15px]">
            <span>이지윤</span>
            <span>이서영</span>
            <span>김태연</span>
            <span>강하영</span>
            <span>이준호</span>
          </div>
          <button>
            <FaGithub className="text-[30px] text-[#fff]" />
          </button>
        </div>
      </footer>
    </>
  );
}
