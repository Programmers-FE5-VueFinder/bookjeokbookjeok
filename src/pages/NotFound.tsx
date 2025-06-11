import { useNavigate } from 'react-router';
import errorImg from '../assets/imgs/404Error.svg';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center border-1 text-center">
        <img
          src={errorImg}
          alt="404 찢어진 책 이미지"
          className="mb-[40px] w-[250px]"
        />
        <h1 className="text-[24px] font-bold">페이지를 찾을 수 없습니다</h1>
        <div className="mt-[20px] text-[16px]">
          <span>일시적인 문제가 발생하여 페이지를 찾을 수 없습니다.</span>
          <br />
          <span>
            문제를 해결하기 위해 이전 페이지로 이동하거나 홈페이지로 이동해
            주세요
          </span>
        </div>
        <div className="mt-[43px] flex gap-[20px]">
          <button
            className="errorButton cursor-pointer bg-[#F1F1F1] text-[16px]"
            onClick={() => navigate(-1)}
          >
            이전 페이지
          </button>
          <button
            className="errorButton cursor-pointer bg-[#08C818] text-[16px] font-semibold text-white"
            onClick={() => navigate('/')}
          >
            홈페이지
          </button>
        </div>
      </div>
    </>
  );
}
