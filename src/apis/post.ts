import supabase from './index';

/* 전체 게시물 조회 */
export async function fetchPosts(category: string = 'all') {
  try {
    switch (category) {
      case 'all':
        return await supabase.from('post').select('*');
      case 'diary':
        return await supabase
          .from('post')
          .select('*')
          .eq('category', 'diary');
      case 'community':
        return await supabase
          .from('post')
          .select('*')
          .eq('category', 'community');
      case 'book_club':
        return await supabase
          .from('post')
          .select('*')
          .eq('category', 'book_club');
    }
  } catch (e) {
    console.error(e);
    return { data: null, error: e};
  }
}

/* 게시물 상세 조회 */
export async function fetchPostDetail(id: string) {
  const post = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      body,
      image,
      profile(*),
      category,
      like(*),
      comment(*),
      vote(*),
      created_at
    `,
    )
    .eq('id', id)
    .single();

  return post.data;
}

/* 게시물 생성 */
export async function createPost(
  title: string,
  body: string,
  image: string | null = null,
  category: string,
) {
  await supabase
    .from('post')
    .insert([{ title: title, body: body, image: image, category: category }])
    .select();
}

/* 게시물 수정 */
export async function editPost(
  id: string,
  title: string,
  body: string,
  image: string | null = null,
  category: string,
) {
  return await supabase
    .from('post')
    .update({ title: title, body: body, image: image, category: category })
    .eq('id', id)
    .select();
}

/* 게시물 삭제 */
export async function deletePost(id: string) {
  await supabase.from('post').delete().eq('id', id);
}
