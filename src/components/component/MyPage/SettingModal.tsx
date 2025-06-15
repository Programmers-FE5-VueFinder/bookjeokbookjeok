import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FaGear } from 'react-icons/fa6';
import ProfileImg from './ProfileImg';
import { useProfileStore } from '../../../store/profileStore';
import { useAuthStore } from '../../../store/authStore';
import supabase from '../../../utils/supabase';
import {
  useProfileImgStore,
  type UserProfile,
} from '../../../store/profileImgStore';
import CheckModal from '../../common/CheckModal';

interface SettingModalProps {
  onClose: () => void;
}

export default function SettingModal({ onClose }: SettingModalProps) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { session } = useAuthStore();
  const { profileCache, setProfileToCache } = useProfileImgStore();
  const currentUserCache = session?.user.id
    ? profileCache[session.user.id]
    : undefined;
  const globalAvatarUrl = currentUserCache?.image; // 캐시된 이미지 URL
  const {
    setProfileName: setGlobalProfileName,
    setProfileIntro: setGlobalProfileIntro,
  } = useProfileStore();

  const [initialName, setInitialName] = useState('');
  const [initialIntro, setInitialIntro] = useState('');
  const [initialAvatarPath, setInitialAvatarPath] = useState<string | null>(
    null,
  );

  const [newName, setNewName] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newProfImgFile, setNewProfImgFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewProfImgFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleDeleteUser = async () => {
  //   if (session?.user.id !== undefined) {
  //     const { error } = await supabase
  //       .from('profile')
  //       .delete()
  //       .eq('id', session?.user.id);
  //     console.error(error);
  //   }
  // };

  const handleSave = async () => {
    const user = session?.user;
    if (!user) {
      alert('사용자 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      const updatedProfileData: UserProfile = {};

      if (newName !== initialName || newIntro !== initialIntro) {
        const { error: textUpdateError } = await supabase
          .from('profile')
          .update({ name: newName, intro: newIntro })
          .eq('id', user.id);
        if (textUpdateError) throw textUpdateError;
        setGlobalProfileName(newName);
        setGlobalProfileIntro(newIntro);
      }

      if (newProfImgFile) {
        if (initialAvatarPath) {
          await supabase.storage.from('image').remove([initialAvatarPath]);
        }

        const fileExt = newProfImgFile.name.split('.').pop();
        const newFilePath = `public/avatars/${user.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('image')
          .upload(newFilePath, newProfImgFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { error: imageUpdateError } = await supabase
          .from('profile')
          .update({ image: newFilePath })
          .eq('id', user.id);
        if (imageUpdateError) throw imageUpdateError;

        const { data } = supabase.storage
          .from('image')
          .getPublicUrl(newFilePath);
        const publicUrlWithCacheBust = `${data.publicUrl}?t=${new Date().getTime()}`;
        updatedProfileData.image = publicUrlWithCacheBust;
      }

      if (Object.keys(updatedProfileData).length > 0) {
        setProfileToCache(user.id, updatedProfileData);
      }
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error('프로필 업데이트 중 오류 발생:', error.message);
        alert(`오류 발생: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const user = session?.user;
      if (!user) return;

      const { data: profile } = await supabase
        .from('profile')
        .select('name, intro, image')
        .eq('id', user.id)
        .single();

      if (profile) {
        setInitialName(profile.name || '');
        setInitialIntro(profile.intro || '');
        setInitialAvatarPath(profile.image || null);

        setNewName(profile.name || '');
        setNewIntro(profile.intro || '');
      }
    };

    fetchInitialData();
  }, [session?.user]);

  return (
    <div className="modal-overlay">
      <div
        className="relative flex h-[567px] w-[383px] flex-col items-center rounded-xl bg-white px-[20px] py-[18px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button
            className="absolute top-0 left-0 mx-[20px] my-[18px] cursor-pointer"
            onClick={onClose}
          >
            <IoIosArrowBack size={24} />
          </button>
          <span className="text-[14px] font-bold">정보 수정</span>
        </div>

        <div className="relative my-[20px]">
          <div className="size-[100px] overflow-hidden rounded-full">
            <ProfileImg src={previewImage || globalAvatarUrl} />
          </div>
          <label
            htmlFor="profileImg"
            className="absolute top-0 right-1 flex size-[25px] cursor-pointer items-center justify-center rounded-full border-3 border-white bg-gray-100 text-center"
          >
            <FaGear />
          </label>
          <input
            type="file"
            id="profileImg"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="mb-[20px] flex gap-[13px]">
          <input
            type="text"
            className="inputBox h-[35px] w-[234px]"
            placeholder="닉네임은 8자 이내로 작성해주세요"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="w-[73px] cursor-pointer">중복 검사</button>
        </div>

        <textarea
          className="inputBox mb-[20px] h-[215px] w-[320px] resize-none pt-[15px]"
          placeholder="자신에 대한 간략한 소개를 써주세요"
          value={newIntro}
          onChange={(e) => setNewIntro(e.target.value)}
        />

        <div className="grid gap-[18px]">
          <button
            className="h-[40px] w-[323px] cursor-pointer rounded-sm bg-[#08c818] text-[16px] font-bold text-white opacity-[70%]"
            onClick={handleSave}
          >
            저장하기
          </button>
          <button
            className="cursor-pointer text-[12px] text-gray-300"
            onClick={() => setOpenDelete(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      {openDelete ? (
        <div>
          <CheckModal
            content={'정말 회원 탈퇴 하시겠습니까?'}
            onClose={() => setOpenDelete(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
