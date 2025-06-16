import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCheckmark } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import supabase from '../../utils/supabase';

type ConsentKey = 'use' | 'personal' | 'marketing';

export default function SignUpModal() {
  const [view, setView] = useState(true);
  const [checkValid, setCheckValid] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [consent, setConsent] = useState({
    use: false,
    personal: false,
    marketing: false,
  });
  const background = useRef(null);
  const closeButton = useRef(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleConsentClick = (type: ConsentKey) => {
    setConsent((prev) => {
      return { ...prev, [type]: !prev[type] };
    });
    setChecked(false);
  };

  const isNameDuplicated = async (name: string) => {
    const { data, error } = await supabase
      .from('profile')
      .select('id')
      .eq('name', name);

    if (error) {
      console.error('중복 확인 실패:', error.message);
      return false;
    }

    return data.length > 0;
  };

  const isEmailDuplicated = async (email: string) => {
    const { data, error } = await supabase
      .from('profile')
      .select('id')
      .eq('email', email);

    if (error) {
      console.error('이메일 중복 확인 실패:', error.message);
      return false;
    }

    return data.length > 0;
  };

  const handleCheckValid = () => {
    if (consent.use === true && consent.personal === true) {
      setCheckValid(false);
      return;
    }
    if (
      consent.use === false ||
      consent.personal === false ||
      checkValid === null
    ) {
      setCheckValid(true);
    }
  };

  const handleCheckBoxValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vaild = e.target.checked;
    setChecked(vaild);
    setConsent((prev) => {
      return {
        ...prev,
        ...{
          use: vaild,
          personal: vaild,
          marketing: vaild,
        },
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  return (
    <>
      {view && (
        <div
          ref={background}
          onClick={() => setView(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-[410px] flex-col rounded-[20px] bg-[#fff] px-[35px] py-[20px] shadow-[0_0_5px_rgba(0,0,0,0.25)]"
          >
            <div
              ref={closeButton}
              onClick={() => setView(false)}
              className="absolute top-[11px] right-[12px] flex cursor-pointer items-center justify-center text-[#333]"
            >
              <IoMdClose />
            </div>

            <h2 className="my-[18px] mt-[22px] flex w-full cursor-default justify-center font-medium">
              이메일 회원가입
            </h2>

            <form
              noValidate
              onSubmit={handleSubmit(async (data) => {
                if (!consent.use || !consent.personal) {
                  setCheckValid(true);
                  return;
                }

                const { name, email, password } = data;

                const { data: signUpData, error: signUpError } =
                  await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                      data: {
                        name: name,
                      },
                    },
                  });

                if (signUpError) {
                  console.error('회원가입 실패:', signUpError.message);
                  return;
                }

                const userId = signUpData.user?.id;

                if (!userId) {
                  console.error('회원가입은 되었지만 사용자 ID가 없습니다.');
                  return;
                }

                const { error: profileError } = await supabase
                  .from('profile')
                  .upsert([{ id: userId, name: name, email: email }]);

                if (profileError) {
                  console.error('프로필 저장 실패:', profileError.message);
                  return;
                }

                console.log('회원가입 성공');
                setView(false); // 모달 닫기
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
                    value: /^[A-Za-z가-힣0-9]{2,10}$/,
                    message:
                      '2자 이상 10자 이하로 작성해주세요. 특수문자는 불가능합니다.',
                  },
                  setValueAs: (value) => value.trim(),
                  validate: (value) => {
                    return new Promise((resolve) => {
                      if (debounceTimer.current) {
                        clearTimeout(debounceTimer.current);
                      }

                      debounceTimer.current = setTimeout(async () => {
                        const duplicated = await isNameDuplicated(value);
                        resolve(
                          duplicated ? '이미 사용 중인 이름입니다.' : true,
                        );
                      }, 500);
                    });
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
                  required: '이메일을 입력해 주세요.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '이메일 형식에 맞지 않습니다',
                  },
                  setValueAs: (value) => value.trim(),
                  validate: (value) => {
                    return new Promise((resolve) => {
                      if (debounceTimer.current) {
                        clearTimeout(debounceTimer.current);
                      }

                      debounceTimer.current = setTimeout(async () => {
                        const duplicated = await isEmailDuplicated(value);
                        resolve(
                          duplicated ? '이미 사용 중인 이메일입니다.' : true,
                        );
                      }, 500);
                    });
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

              <label
                htmlFor="password"
                className="flex items-center gap-[5px] font-bold text-[#333]"
              >
                비밀번호
                <Tooltip title="비밀번호는 8자 이상 16자 이하, 영문 대소문자 숫자, 특수문자를 포함하여 입력해주세요.">
                  <div className="size-[16px] items-center justify-center rounded-full border-1 text-center text-[10px]">
                    ?
                  </div>
                </Tooltip>
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                {...register('password', {
                  required: '비밀번호를 입력해 주세요.',
                  minLength: {
                    value: 8,
                    message:
                      '8자리 이상 16자리 이하의 비밀번호를 입력해주세요.',
                  },
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,16}$/,
                    message: '비밀번호 형식에 맞지 않습니다.',
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
                <div className="flex h-fit items-center gap-[5px]">
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        sx={{
                          color: 'black',
                          '&.Mui-checked': { color: '#08C818' },
                          padding: '0px',
                          margin: '0px',
                          paddingRight: '8px',
                          paddingLeft: '9px',
                        }}
                        checked={checked}
                        onChange={(e) => handleCheckBoxValid(e)}
                        size="small"
                        disableRipple
                      />
                    }
                    label="모두 동의 (선택 포함)"
                    sx={{
                      color: checked ? '#08c818' : 'black',
                      '& .MuiTypography-root': { fontSize: '14px' },
                    }}
                  />
                </div>
                <div className="flex items-center gap-[5px]">
                  <IoMdCheckmark
                    className={`cursor-pointer ${consent.use ? 'text-[#08C818]' : ''}`}
                  />
                  <span
                    onClick={() => handleConsentClick('use')}
                    className={`cursor-pointer text-[14px] ${consent.use ? 'text-[#08C818]' : ''}`}
                  >
                    (필수) 이용약관
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <IoMdCheckmark
                    className={`cursor-pointer ${consent.personal ? 'text-[#08C818]' : ''}`}
                  />
                  <span
                    onClick={() => handleConsentClick('personal')}
                    className={`cursor-pointer text-[14px] ${consent.personal ? 'text-[#08C818]' : ''}`}
                  >
                    (필수) 개인정보 취급방침
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <IoMdCheckmark
                    className={`cursor-pointer ${consent.marketing ? 'text-[#08C818]' : ''}`}
                  />
                  <span
                    onClick={() => handleConsentClick('marketing')}
                    className={`cursor-pointer text-[14px] ${consent.marketing ? 'text-[#08C818]' : ''}`}
                  >
                    (선택) 마케팅 정보 이메일 수신
                  </span>
                </div>
                {checkValid && (
                  <small role="errorAlert" className="pl-[2px] text-[#FF3333]">
                    필수 동의 항목을 체크해 주세요.
                  </small>
                )}
              </div>

              <button
                onClick={handleCheckValid}
                disabled={isSubmitting}
                className="h-[45px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-[#08C818] font-semibold text-[#f1f1f1]"
              >
                회원가입
              </button>

              <div className="mt-[10px] flex justify-center gap-[10px] text-[12px]">
                <span className="text-[#6E6E6E]">이미 회원이신가요?</span>
                <button className="cursor-pointer text-[#08C818]">
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
