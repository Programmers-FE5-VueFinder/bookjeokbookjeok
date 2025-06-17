import { create } from 'zustand';

type ProfileStore = {
  Image: string | null;
  setProfileImage: (image: string | null) => void;
  profileName: string | null;
  setProfileName: (text: string | null) => void;
  intro: string | null;
  setProfileIntro: (text: string | null) => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  Image: null,
  setProfileImage: (imageUrl) => {
    set({ Image: imageUrl });
  },
  profileName: null,
  setProfileName: (text) => set({ profileName: text }),
  intro: null,
  setProfileIntro: (text) => set({ intro: text }),
}));
