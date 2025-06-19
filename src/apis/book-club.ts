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
    .select('*')
    .eq('id', id)
    .single();

  const { data: book_club_member } = await supabase
    .from('book_club_member')
    .select('*')
    .eq('book_club_id', id)
    .order('created_at', { ascending: true });

  const userIds = book_club_member?.map((m) => m.user_id) ?? [];

  const { data: users } = await supabase
    .from('profile')
    .select('id, name, image, intro, appellation, created_at')
    .in('id', userIds);

  const orderedUsers: User[] = userIds
    .map((uid) => users?.find((u) => u.id === uid))
    .filter((u): u is User => u !== undefined);

  return {
    id: book_club!.id,
    name: book_club!.name,
    info: book_club!.info,
    is_recruiting: book_club!.is_recruiting,
    created_at: book_club!.created_at,
    member: orderedUsers,
  };
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
    .update({ id: id, name: name, info: info })
    .eq('id', id)
    .select()
    .single();

  return book_club.data;
}

/* 북클럽 삭제 */
export async function deleteBookClub(id: string) {
  await supabase.from('book_club_chat').delete().eq('book_club_id', id);
  await supabase.from('book_club_member').delete().eq('book_club_id', id);
  await supabase.from('post').delete().eq('object_id', id);
  await supabase.from('book_club').delete().eq('id', id);
}

/* 모집글 작성 */
export async function createBookClubPost(
  title: string,
  body: string,
  image: string | null,
  book_club_id: string,
) {
  console.log('aa');
  const { data: post } = await supabase
    .from('post')
    .insert({
      title: title,
      body: body,
      image: image,
      category: 'book_club',
      book_club_id: book_club_id,
    })
    .select()
    .single();

  return post!.id;
}

/* 북클럽 신청 */
export async function applyBookClub(user_id: string, book_club_id: string) {
  await supabase
    .from('notification')
    .insert({ type: 'book-club', user_id: user_id, object_id: book_club_id });
}

/* 북클럽 신청 상태거나 멤버인지 판별 */
export async function getApplyState(book_club_id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 'before';

  const { data: isMember } = await supabase
    .from('book_club_member')
    .select()
    .eq('user_id', user.id)
    .eq('book_club_id', book_club_id);

  if (isMember && isMember.length > 0) return 'member';

  const { data: isApplying } = await supabase
    .from('notification')
    .select()
    .eq('type', 'book-club')
    .eq('sender_id', user.id)
    .eq('object_id', book_club_id);

  if (isApplying && isApplying.length > 0) return 'after';
  else return 'before';
}

/* 북클럽 신청 조회 */
export async function fetchApplyList(book_club_id: string) {
  const { data: applys } = await supabase
    .from('notification')
    .select('sender_id')
    .eq('type', 'book-club')
    .eq('object_id', book_club_id)
    .order('created_at', { ascending: false });

  const senderIds = applys!.map((n) => n.sender_id);

  const { data: users } = await supabase
    .from('profile')
    .select('*')
    .in('id', senderIds);

  return users;
}

/* 북클럽 신청 승인 */
export async function approveApply(user_id: string, book_club_id: string) {
  // 멤버 추가
  await supabase
    .from('book_club_member')
    .insert({ user_id: user_id, book_club_id: book_club_id });
  // 승인 알림 발송
  await supabase.from('notification').insert({
    type: 'book-club-approve',
    user_id: user_id,
    object_id: book_club_id,
  });
  // 알림 삭제
  await supabase
    .from('notification')
    .delete()
    .eq('type', 'book-club')
    .eq('sender_id', user_id)
    .eq('object_id', book_club_id);
}

/* 북클럽 신청 거절 */
export async function rejectApply(user_id: string, book_club_id: string) {
  // 거절 알림 발송
  await supabase.from('notification').insert({
    type: 'book-club-reject',
    user_id: user_id,
    object_id: book_club_id,
  });
  // 알림 삭제
  await supabase
    .from('notification')
    .delete()
    .eq('type', 'book-club')
    .eq('sender_id', user_id)
    .eq('object_id', book_club_id);
}

/* 북클럽 탈퇴 */
export async function leaveBookClub(id: string) {
  await supabase.from('book_club_member').delete().eq('book_club_id', id);
}

/* 북클럽 채팅 조회 */
export async function fetchChat(id: string) {
  const { data: chat } = await supabase
    .from('book_club_chat')
    .select(`id, profile(*), message, created_at`)
    .eq('book_club_id', id)
    .order('created_at', { ascending: true });

  return chat;
}

/* 북클럽 채팅 전송 */
export async function sendChat(id: string, message: string) {
  await supabase
    .from('book_club_chat')
    .insert({ book_club_id: id, message: message });
}
