import { create } from 'zustand';

type ProfileStore = {
  Image: string | null;
  setProfileImage: (image: string | undefined) => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  Image: null,
  setProfileImage: (image) => set({ Image: image }),
}));
