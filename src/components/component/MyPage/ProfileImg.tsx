// components/ProfileImage.jsx (또는 .tsx)

import { useState, useEffect } from 'react';
import supabase from '../../../utils/supabase';
import { useProfileImgStore } from '../../../store/profileImgStore';
import { useAuthStore } from '../../../store/authStore';

type ProfileImageProps = {
  id?: string | null;
  src?: string | null | File;
};
/**
 * @param {ProfileImageProps} props
 * @param {string} [props.id]
 */
const ProfileImage: React.FC<ProfileImageProps> = ({ id: propId, src }) => {
  const { session } = useAuthStore();
  const { profileCache, setProfileToCache } = useProfileImgStore();

  const targetId = propId || session?.user.id;

  const [imageUrl, setImageUrl] = useState<string | null>(
    targetId ? profileCache[targetId]?.image || null : null,
  );
  useEffect(() => {
    if (!targetId) {
      setImageUrl(null);
      return;
    }

    const cachedProfile = profileCache[targetId];
    if (cachedProfile?.image) {
      setImageUrl(cachedProfile.image);
      return;
    }

    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profile')
          .select('image, name, intro')
          .eq('id', targetId)
          .single();

        if (error) throw error;

        if (profile) {
          let finalUrl = null;
          if (profile.image) {
            if (profile.image.startsWith('http')) {
              finalUrl = profile.image;
            } else {
              const { data: urlData } = supabase.storage
                .from('image')
                .getPublicUrl(profile.image);
              finalUrl = `${urlData.publicUrl}?t=${new Date().getTime()}`;
            }
          }

          if (isMounted) {
            setImageUrl(finalUrl);
            setProfileToCache(targetId, {
              image: finalUrl,
              name: profile.name,
              intro: profile.intro,
            });
          }
        }
      } catch (err) {
        console.error(
          `ID '${targetId}'의 프로필 정보를 가져오는 데 실패했습니다.`,
          err,
        );
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [targetId, profileCache, setProfileToCache]);

  return (
    <img
      src={src || imageUrl || session?.user.user_metadata.avatar_url}
      alt={'프로필 이미지'}
      className='justify-center items-center w-[100px]'
    />
  );
};

export default ProfileImage;
