import supabase from '../utils/supabase';

export async function fetchAddFollow(currentUser: string, targetUser: string) {
  const { data: follow, error } = await supabase
    .from('follow')
    .insert([{ follower_id: currentUser, following_id: targetUser }])
    .select();
  if (error) throw error;
  return follow;
}

export async function isFollowing(targetUser: string, currentUser: string) {
  if (!targetUser || !currentUser) {
    console.warn('isFollowing: 유효하지 않은 사용자 ID', {
      targetUser,
      currentUser,
    });
    return false;
  }

  const { data, error } = await supabase
    .from('follow')
    .select('id')
    .eq('follower_id', currentUser)
    .eq('following_id', targetUser)
    .maybeSingle();

  if (error) {
    console.error('팔로우 여부 조회 실패:', error);
    return false;
  }

  return !data;
}

export async function fetchDeleteFollow(
  currentUser: string,
  targetUser: string,
) {
  const { data: data, error } = await supabase
    .from('follow')
    .delete()
    .eq('follower_id', currentUser)
    .eq('following_id', targetUser);
  if (error) throw error;
  return data;
}

export async function fetchSendFollow(currentUser: string, targetUser: string) {
  const { data, error } = await supabase
    .from('notification')
    .insert([{ user_id: targetUser, sender_id: currentUser, type: 'follow' }])
    .select();
  if (error) throw error;
  return data;
}
