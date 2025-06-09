import supabase from "../apis";
import { useNavigate } from "react-router";
import { GoMail } from "react-icons/go";
import kakaoLogo from "../assets/images/kakaoLogo.png";

interface LoginProps {
  onClose: () => void;
}


export default function Login({ onClose }: LoginProps) {
  const navigate = useNavigate();
  
  const goToSignUp = () => {
    onClose();
    navigate("/signup");
  };

  const handleLogin = async (method: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider: method,
    });
  }

  return (
    <div className="flex-row">
      <h1 className="flex justify-center items-center mb-[40px] font-medium text-[16px]">북적북적 로그인</h1>
      <div className="flex flex-col gap-y-[15px]">
        <button 
          // onClick={() => handleLogin("google")} 
          className="relative w-[340px] h-[45px] border border-[#EBEBEB] rounded-[5px] text-[14px] cursor-pointer"
        >
          <GoMail className="absolute left-[30px] top-1/2 -translate-y-1/2 w-5 h-5 text-[#767676]" />       
          <span className="absolute inset-0 flex items-center justify-center">
            이메일 로그인
          </span>
        </button>

        <button 
          onClick={() => handleLogin("google")} 
          className="relative w-[340px] h-[45px] border border-[#EBEBEB] rounded-[5px] text-[14px] cursor-pointer"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="absolute left-[30px] top-1/2 -translate-y-1/2 w-5 h-5"
          />       
          <span className="absolute inset-0 flex items-center justify-center">
            Google 로그인
          </span>
        </button>

        <button 
          onClick={() => handleLogin("kakao")} 
          className="relative w-[340px] h-[45px] bg-[#FEE500] rounded-[5px] text-[14px] cursor-pointer"
        >
          <img
            src={kakaoLogo}
            alt="Kakao"
            className="absolute left-[32px] top-1/2 -translate-y-1/2 w-auto h-5"
          />     
          <span className="absolute inset-0 flex items-center justify-center">
            카카오 로그인
          </span>  
        </button>
      </div>

      <div className="flex justify-center items-center mt-[30px] gap-x-[6px] font-medium text-[12px]">
        <h1 className="text-[#6E6E6E]">아직 회원이 아니신가요?</h1>
        <button 
          onClick={goToSignUp}
          className="text-[#08C818] cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
