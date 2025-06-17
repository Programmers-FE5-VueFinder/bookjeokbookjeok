import supabase from '../utils/supabase';

export async function getCommentCount(postId: string) {
  const { count, error } = await supabase
    .from('comment')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  if (error) {
    console.error('댓글 수 조회 실패:', error);
    return 0;
  }

  return count ?? 0;
}
