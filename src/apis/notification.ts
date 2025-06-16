import supabase from '../utils/supabase';

/* 알림 리스트 조회 */
export async function fetchAlarmList() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: alarms } = await supabase
    .from('notification')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  const senderIds = alarms!.map((alarm) => alarm.sender_id);

  const { data: senders } = await supabase
    .from('profile')
    .select('*')
    .in('id', senderIds);

  const postIds = alarms!
    .filter((a) => a.type === 'comment' || a.type === 'like')
    .map((a) => a.object_id)
    .filter((id): id is string => Boolean(id));

  const bookClubIds = alarms!
    .filter((a) => a.type === 'book-club')
    .map((a) => a.object_id)
    .filter((id): id is string => Boolean(id));

  const [postResult, bookClubResult] = await Promise.all([
    postIds.length
      ? supabase.from('post').select('id, title').in('id', postIds)
      : Promise.resolve({ data: [] }),
    bookClubIds.length
      ? supabase.from('book_club').select('id, name').in('id', bookClubIds)
      : Promise.resolve({ data: [] }),
  ]);

  const posts = postResult.data || [];
  const bookClubs = bookClubResult.data || [];

  return alarms!.map((alarm) => {
    const sender = senders?.find((s) => s.id === alarm.sender_id);

    let objectName: string | undefined;
    if (
      (alarm.type === 'comment' || alarm.type === 'like') &&
      alarm.object_id
    ) {
      objectName = posts.find((p) => p.id === alarm.object_id)?.title;
    } else if (alarm.type === 'book-club' && alarm.object_id) {
      objectName = bookClubs.find((b) => b.id === alarm.object_id)?.name;
    }

    return {
      ...alarm,
      sender,
      objectName: objectName ?? '',
    };
  });
}

/* 알림 대상 객체 이름 조회 */
export async function getObjectName(
  category: 'comment' | 'like' | 'follow' | 'book-club',
  objectId: string,
) {
  let objectName;
  if (category === 'comment' || category === 'like') {
    objectName = (
      await supabase.from('post').select('title').eq('id', objectId).single()
    ).data!.title;
  } else if (category === 'book-club') {
    objectName = (
      await supabase
        .from('book_club')
        .select('name')
        .eq('id', objectId)
        .single()
    ).data!.name;
  } else {
    objectName = '';
  }

  return objectName;
}
