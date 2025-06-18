import supabase from '../utils/supabase';

export const toggleLikeToPost = async (user_id: string, post_id: string) => {
  const { data: existing, error: selectError } = await supabase
    .from('like')
    .select('id')
    .eq('user_id', user_id)
    .eq('post_id', post_id)
    .maybeSingle();

  if (selectError) {
    console.error('좋아요 상태 조회 실패:', selectError.message);
    return null;
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from('like')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      console.error('좋아요 취소 실패:', deleteError.message);
      return null;
    }

    return { status: 'unliked' };
  } else {
    const { error: insertError } = await supabase
      .from('like')
      .insert([{ user_id, post_id }]);

    if (insertError) {
      console.error('좋아요 추가 실패:', insertError.message);
      return null;
    }

    return { status: 'liked' };
  }
};

export const hasUserLikedPost = async (user_id: string, post_id: string) => {
  const { data, error } = await supabase
    .from('like')
    .select('id')
    .eq('user_id', user_id)
    .eq('post_id', post_id)
    .maybeSingle();

  if (error) {
    console.error('좋아요 여부 조회 실패:', error.message);
    return false;
  }

  return !!data;
};
