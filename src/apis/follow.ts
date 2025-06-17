import supabase from '../utils/supabase';

export async function fetchAddFollow(currentUser: string, targetUser: string) {
  const { data: follow, error } = await supabase
    .from('follow')
    .insert([{ follower_id: currentUser, following_id: targetUser }])
    .select();
  if (error) throw error;
  return follow;
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
