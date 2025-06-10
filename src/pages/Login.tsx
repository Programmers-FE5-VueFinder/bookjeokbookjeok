import { GoMail } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { kakaoLogin } from '../apis/auth';
import { googleLogin } from '../apis/auth';
import kakaoLogo from '../assets/images/kakaoLogo.png';

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const navigate = useNavigate();

  const goToSignUp = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div className="flex-row">
      <h1 className="mb-[40px] flex items-center justify-center text-[16px] font-medium">
        북적북적 로그인
      </h1>
      <div className="flex flex-col gap-y-[15px]">
        <button
          // onClick={() => handleLogin("google")}
          className="relative h-[45px] w-[340px] cursor-pointer rounded-[5px] border border-[#EBEBEB] text-[14px]"
        >
          <GoMail className="absolute top-1/2 left-[30px] h-5 w-5 -translate-y-1/2 text-[#767676]" />
          <span className="absolute inset-0 flex items-center justify-center">
            이메일 로그인
          </span>
        </button>

        <button
          onClick={googleLogin}
          className="relative h-[45px] w-[340px] cursor-pointer rounded-[5px] border border-[#EBEBEB] text-[14px]"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="absolute top-1/2 left-[30px] h-5 w-5 -translate-y-1/2"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            Google 로그인
          </span>
        </button>

        <button
          onClick={kakaoLogin}
          className="relative h-[45px] w-[340px] cursor-pointer rounded-[5px] bg-[#FEE500] text-[14px]"
        >
          <img
            src={kakaoLogo}
            alt="Kakao"
            className="absolute top-1/2 left-[32px] h-5 w-auto -translate-y-1/2"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            카카오 로그인
          </span>
        </button>
      </div>

      <div className="mt-[30px] flex items-center justify-center gap-x-[6px] text-[12px] font-medium">
        <h1 className="text-[#6E6E6E]">아직 회원이 아니신가요?</h1>
        <button onClick={goToSignUp} className="cursor-pointer text-[#08C818]">
          회원가입
        </button>
      </div>
    </div>
  );
}
