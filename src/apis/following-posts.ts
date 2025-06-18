import supabase from '../utils/supabase';

export async function fetchFollowingPosts(myProfileId: string) {
  // 내가 팔로우하는 유저 목록 가져오기
  const { data: followingIds, error: followError } = await supabase
    .from('follow')
    .select('following_id')
    .eq('follower_id', myProfileId);

  if (followError) {
    console.error('Error fetching following IDs:', followError);
    return [];
  }

  const followingIdList = followingIds?.map((item) => item.following_id);

  if (!followingIdList || followingIdList.length === 0) {
    return []; // 팔로우한 유저가 없으면 빈 배열 리턴
  }

  const { data: posts, error: postError } = await supabase
    .from('post')
    .select(
      `
      *,
      profile (
        id,
        name,
        image,
        intro,
        appellation,
        created_at
      ),
      comment (
        id,
        post_id,
        body,
        user_id,
        created_at
      ),
      like (
        id,
        user_id,
        post_id,
        created_at
      )
      `,
    )
    .in('user_id', followingIdList)
    .order('created_at', { ascending: false });

  if (postError) {
    console.error('Error fetching posts:', postError);
    return [];
  }

  return posts;
}
