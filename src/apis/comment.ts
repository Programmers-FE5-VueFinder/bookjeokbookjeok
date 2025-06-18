import supabase from '../utils/supabase';

export async function addComment(
  postId: string,
  userId: string,
  body: string,
  parentCommentId?: string,
) {
  const { data, error } = await supabase.from('comment').insert([
    {
      post_id: postId,
      user_id: userId,
      body: body,
      parent_comment_id: parentCommentId ?? null,
    },
  ]);

  if (error) {
    console.error('댓글 등록 실패:', error.message);
    throw error;
  }

  return data;
}

export async function getComments(postId: string) {
  const { data, error } = await supabase
    .from('comment')
    .select('*, profile(name, image)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateComment(id: string, body: string) {
  const { error } = await supabase
    .from('comment')
    .update({ body })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from('comment').delete().eq('id', id);

  if (error) throw error;
}

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
