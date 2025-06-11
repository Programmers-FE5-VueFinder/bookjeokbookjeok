import { useForm } from 'react-hook-form';
import { IoMdCheckmark } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';

export default function SignUpModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  return (
    <>
      <div className="relative flex w-[410px] flex-col rounded-[10px] bg-[#fff] px-[35px] py-[20px] shadow-[0_0_5px_rgba(0,0,0,0.25)]">
        <div className="absolute top-[11px] right-[12px] cursor-pointer text-[#333]">
          <IoMdClose />
        </div>

        <h2 className="my-[18px] mt-[22px] flex w-full cursor-default justify-center font-medium">
          이메일 회원가입
        </h2>

        <form
          noValidate
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
          })}
          className="flex w-full flex-col gap-[10px] text-[#333]"
        >
          <label htmlFor="name" className="font-bold text-[#333]">
            이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해 주세요."
            {...register('name', {
              required: '이름을 입력해 주세요',
              pattern: {
                value: /^[가-힣]{2,5}$/,
                message: '2자 이상 5자이하 한글로 작성해 주세요.',
              },
            })}
            aria-invalid={
              isSubmitted ? (errors.name ? 'true' : 'false') : undefined
            }
            className="h-[45px] w-full rounded-[5px] border border-[#bfbfbf] pl-[8px]"
          />
          {errors.name && (
            <small role="errorAlert" className="pl-[2px] text-[#FF3333]">
              {errors.name.message as string}
            </small>
          )}

          <label htmlFor="email" className="font-bold text-[#333]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            {...register('email', {
              required: '이메일을 입력해 주세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식에 맞지 않습니다',
              },
            })}
            aria-invalid={
              isSubmitted ? (errors.email ? 'true' : 'false') : undefined
            }
            className="h-[45px] w-full rounded-[5px] border border-[#bfbfbf] pl-[8px]"
          />
          {errors.email && (
            <small role="errorAlert" className="pl-[2px] text-[#FF3333]">
              {errors.email.message as string}
            </small>
          )}

          <label htmlFor="password" className="font-bold text-[#333]">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            {...register('password', {
              required: '비밀번호를 입력해 주세요',
              minLength: {
                value: 8,
                message: '8자리 이상 16자리 이하의 비밀번호를 입력해주세요',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/,
                message: '비밀번호 형식에 맞지 않습니다',
              },
            })}
            aria-invalid={
              isSubmitted ? (errors.password ? 'true' : 'false') : undefined
            }
            className="h-[45px] w-full rounded-[5px] border border-[#bfbfbf] pl-[8px]"
          />
          {errors.password && (
            <small role="errorAlert" className="pl-[2px] text-[#FF3333]">
              {errors.password.message as string}
            </small>
          )}

          <div className="my-[10px] flex flex-col gap-[8px]">
            <div className="flex h-fit items-center gap-[5px] pl-[2px]">
              <input type="checkbox" id="AllConsentCheckbox"></input>
              <label htmlFor="AllConsentCheckbox" className="text-[14px]">
                모두 동의 (선택포함)
              </label>
            </div>
            <div className="flex items-center gap-[5px]">
              <IoMdCheckmark />
              <span className="text-[14px]">(필수) 이용약관</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <IoMdCheckmark />
              <span className="text-[14px]">(필수) 개인정보 취급방침</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <IoMdCheckmark />
              <span className="text-[14px]">
                (선택) 마케팅 정보 이메일 수신
              </span>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="h-[45px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-[#08C818] font-semibold text-[#f1f1f1]"
          >
            회원가입
          </button>

          <div className="mt-[10px] flex justify-center gap-[10px] text-[12px]">
            <span className="text-[#6E6E6E]">이미 회원이신가요?</span>
            <button className="cursor-pointer text-[#08C818]">로그인</button>
          </div>
        </form>
      </div>
    </>
  );
}
