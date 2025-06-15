import supabase from '../utils/supabase';

/* 북클럽 오너 판별 */
export async function isBookClubOwner(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: book_club } = await supabase
    .from('book_club')
    .select('owner_id')
    .eq('id', id)
    .single();

  return book_club!.owner_id === user.id;
}

/* 북클럽 상세 조회 */
export async function fetchBookClub(id: string) {
  const { data: book_club } = await supabase
    .from('book_club')
    .select(`*, book_club_member(*)`)
    .eq('id', id)
    .single();

  const userIds = book_club!.book_club_member.map(
    (member: BookclubMember) => member.user_id,
  );
  const { data: user } = await supabase
    .from('profile')
    .select('*')
    .in('id', userIds);

  const { book_club_member, ...rest } = book_club;
  return { ...rest, member: user };
}

/* 북클럽 생성 */
export async function createBookClub(name: string, info: string | null) {
  const { data: book_club } = await supabase
    .from('book_club')
    .insert({ name: name, info: info })
    .select()
    .single();
  await supabase
    .from('book_club_member')
    .insert({ user_id: book_club!.owner_id, book_club_id: book_club!.id });

  return book_club!.id;
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
  await supabase.from('book_club_chat').delete().eq('book_club_id', id);
  await supabase.from('book_club_member').delete().eq('book_club_id', id);
  await supabase.from('book_club').delete().eq('id', id);
}

/* 북클럽 채팅 조회 */
export async function fetchChat(id: string) {
  const { data: chat } = await supabase
    .from('book_club_chat')
    .select(`id, profile(*), message, created_at`)
    .eq('book_club_id', id);

  return chat;
}

/* 북클럽 채팅 전송 */
export async function sendChat(id: string, message: string) {
  await supabase
    .from('book_club_chat')
    .insert({ book_club_id: id, message: message });
}
