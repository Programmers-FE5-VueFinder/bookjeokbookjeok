import supabase from '../utils/supabase';

/* 북클럽 상세 조회 */
export async function fetchBookClub(id: string) {
  const { data, error } = await supabase
    .from('book_club')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
  }

  return data;
}

/* 북클럽 생성 */
export async function createBookClub(name: string, info: string | null) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const book_club = await supabase
    .from('book_club')
    .insert({ name: name, info: info })
    .select()
    .single();
  await supabase
    .from('book_club_member')
    .insert({ user_id: user!.id, book_club_id: book_club.data!.id });

  return book_club.data!.id;
}

/* 북클럽 수정 */
export async function editBookClub(
  id: string,
  name: string,
  info: string | null,
) {
  const book_club = await supabase
    .from('book_club')
    .update({ name: name, info: info })
    .eq('id', id)
    .select()
    .single();

  return book_club.data;
}

/* 북클럽 삭제 */
export async function deleteBookClub(id: string) {
  const post = await supabase
    .from('post')
    .select('id')
    .eq('book_club_id', id)
    .single();

  await supabase.from('like').delete().eq('post_id', post.data!.id);
  await supabase.from('comment').delete().eq('post_id', post.data!.id);
  await supabase.from('post').delete().eq('book_club_id', id);
  await supabase.from('book_club_chat').delete().eq('book_club_id', id);
  await supabase.from('book_club_member').delete().eq('book_club_id', id);
  await supabase.from('book_club').delete().eq('id', id);
}
