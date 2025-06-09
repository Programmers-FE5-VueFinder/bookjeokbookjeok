import supabase from './index';

/* 게시물 리스트 fetch */
export async function fetchPosts(category: string = 'all') {
  try {
    switch (category) {
      case 'all':
        return await supabase.from('post').select('*');
      case 'diary':
        return await supabase.from('post').select('*').eq('category', 'diary');
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
  }
}

/* 게시물 상세보기 */
export async function fetchPostDetail(id: string) {
  try {
    return await supabase.from('post').select('*').eq('id', id);
  } catch (e) {
    console.error(e);
  }
}

/* 게시물 생성 */
export async function createPost(
  title: string,
  body: string,
  image: string | null = null,
  category: string,
) {
  return await supabase
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
