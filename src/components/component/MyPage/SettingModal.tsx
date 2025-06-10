import { IoIosArrowBack } from 'react-icons/io';
import { FaGear } from 'react-icons/fa6';
import ProfileImg from './ProfileImg';
import { useRef, useState } from 'react';
import { useProfileStore } from '../../../store/profileStore';

export default function SettingModal({
  setOpenSetting,
  onClose,
}: {
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) {
  const [Image, setImage] = useState<string | null>('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const setProfileImg = useProfileStore((state) => state.setProfileImage);

  const isChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('image', e.target.files![0]);
    let profURL: string | undefined = undefined;

    if (e.target.files && e.target.files.length > 0) {
      profURL = URL.createObjectURL(e.target.files[0]);
      setProfileImg(profURL);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files![0]);
  };
  return (
    <>
      {/* 모달 외부 클릭 시 닫힘 */}
      <div className="modal-overlay" onClick={onClose}>
        {/* 모달 내부 클릭 시 닫힘 방지 */}
        <div
          className="relative flex h-[567px] w-[383px] flex-col items-center rounded-xl bg-white px-[20px] py-[18px] text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <button
              className="absolute top-0 left-0 mx-[20px] my-[18px] cursor-pointer"
              onClick={() => {
                setOpenSetting(false);
              }}
            >
              <IoIosArrowBack size={24} />
            </button>
            <span className="text-[14px] font-bold">정보 수정</span>
          </div>
          <div className="relative my-[20px]">
            <ProfileImg Image={Image} />
            <label
              htmlFor="profileImg"
              className="absolute top-0 right-1 flex size-[25px] cursor-pointer items-center justify-center rounded-full border-3 border-white bg-gray-100 text-center"
            >
              <FaGear />
            </label>
            <input
              type="file"
              id="profileImg"
              className=""
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={isChanged}
              accept="image/*"
            />
          </div>
          <div className="mb-[20px] flex gap-[13px]">
            <input
              type="text"
              className="inputBox h-[35px] w-[234px]"
              placeholder="닉네임은 8자 이내로 작성해주세요"
            />
            <button className="w-[73px] cursor-pointer">중복 검사</button>
          </div>
          <textarea
            className="inputBox mb-[20px] h-[215px] w-[320px] resize-none pt-[15px]"
            placeholder="자신에 대한 간략한 소개를 써주세요"
          />
          <div className="grid gap-[18px]">
            <button className="h-[40px] w-[323px] cursor-pointer rounded-sm bg-[#08c818] text-[16px] font-bold text-white opacity-[70%]">
              저장하기
            </button>
            <button className="cursor-pointer text-[12px] text-gray-300">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
