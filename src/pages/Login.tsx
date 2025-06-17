import { kakaoLogin } from '../apis/auth';
import { googleLogin } from '../apis/auth';
import kakaoLogo from '../assets/images/kakaoLogo.png';
import { useAuthStore } from '../store/authStore';
import supabase from '../utils/supabase';
import { useState } from 'react';

interface LoginProps {
  onClose: () => void;
  onOpenSignUp: () => void;
}

export default function Login({ onClose, onOpenSignUp }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setLogin = useAuthStore((state) => state.setLogin);

  const handleSupabaseLogin = async () => {
    setErrorMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (email.length === 0) {
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }
    if (password.length === 0) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return;
    }
    if (error) {
      setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }
    if (data.session) {
      setLogin(data.session);
      onClose();
    }
  };
  const goToSignUp = () => {
    onClose();
    onOpenSignUp();
  };

  return (
    <div className="flex-row">
      <h1 className="mb-[40px] flex items-center justify-center text-[16px] font-medium">
        북적북적 로그인
      </h1>
      <div className="relative flex flex-col gap-y-[15px]">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
            setErrorMessage('');
          }}
          placeholder="이메일을 입력해 주세요."
          className="h-[45px] w-[340px] rounded-[5px] border border-[#EBEBEB] pl-[5px] text-[14px]"
        ></input>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
            setErrorMessage('');
          }}
          className="h-[45px] w-[340px] rounded-[5px] border border-[#EBEBEB] pl-[5px] text-[14px]"
        ></input>
        {errorMessage && (
          <div className="pl-[2px] text-[13px] text-[#FF3333]">
            {errorMessage}
          </div>
        )}
        <button
          onClick={handleSupabaseLogin}
          className="h-[45px] w-[340px] cursor-pointer rounded-[5px] border bg-[#08C818] text-[14px] font-semibold text-[#fff]"
        >
          로그인
        </button>

        <div className="my-[5px] h-[1px] w-full bg-[#F4F4F4]"></div>

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
