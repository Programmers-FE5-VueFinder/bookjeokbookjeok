import supabase from '../utils/supabase';

export async function addBookmark(bookId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 인증 실패');

  const { data, error } = await supabase.from('bookmark').insert([
    {
      user_id: user.id,
      book_id: bookId,
    },
  ]);

  if (error) throw error;
  return data;
}

export async function removeBookmark(bookId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 인증 실패');

  const { data, error } = await supabase
    .from('bookmark')
    .delete()
    .eq('user_id', user.id)
    .eq('book_id', bookId);

  if (error) throw error;
  return data;
}

export async function isBookBookmarked(bookId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('유저 인증 실패');

  const { data, error } = await supabase
    .from('bookmark')
    .select('id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}
