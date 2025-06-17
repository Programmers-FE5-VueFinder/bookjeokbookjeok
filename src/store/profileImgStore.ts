import { create } from 'zustand';

// 한 유저의 프로필 데이터 타입을 정의합니다.
// optional(?)로 만들어 이미지, 이름, 소개 중 일부만 업데이트하는 것도 가능하게 합니다.
export type UserProfile = {
  image?: string | null;
  name?: string | null;
  intro?: string | null;
};

// 새로운 스토어 타입을 정의합니다.
type ProfileStore = {
  // key는 유저 ID, value는 해당 유저의 프로필 정보가 됩니다.
  // 예: { 'user-id-1': { image: 'url', name: 'Kim' }, 'user-id-2': { ... } }
  profileCache: { [userId: string]: UserProfile };

  // 특정 유저의 프로필 정보를 캐시에 저장하거나 업데이트하는 액션
  setProfileToCache: (id: string, profileData: UserProfile) => void;
};

export const useProfileImgStore = create<ProfileStore>()((set) => ({
  // 초기 상태는 비어있는 객체입니다.
  profileCache: {},

  // 새로운 액션: id와 profileData를 받습니다.
  setProfileToCache: (id, profileData) =>
    set((state) => ({
      profileCache: {
        ...state.profileCache, // 기존 캐시 전체를 복사하고
        [id]: {
          // 특정 id의 유저에 대해, 기존 캐시된 정보와 새로운 정보를 합칩니다.
          ...state.profileCache[id],
          ...profileData,
        },
      },
    })),
}));
