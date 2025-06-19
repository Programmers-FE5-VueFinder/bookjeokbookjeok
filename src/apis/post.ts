import supabase from '../utils/supabase';
import type { APIDiaryPost, Book } from '../types/type';

/* 전체 게시물 조회 */
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
    return { data: null, error: e };
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
      created_at,
      book_club_id,
      book(*)
    `,
    )
    .eq('id', id)
    .single();

  return post.data;
}

export async function createPost(
  userId: string,
  title: string,
  body: string,
  image: string | null = null,
  category: 'diary' | 'community',
  book_id?: string,
  book?: {
    id: string | undefined;
    star: number | undefined;
  },
  book_club_id?: string,
) {
  const post = await supabase
    .from('post')
    .insert({
      user_id: userId,
      title: title,
      body: body,
      image: image,
      category: category,
      book_id: book_id,
      book_club_id: book_club_id,
    })
    .select()
    .single();

  if (book) {
    await supabase.from('book_tag').insert({
      book_id: book.id as string,
      star: book.star,
      reference_category: category,
      reference_id: post.data!.id,
    });
  }

  return post.data!.id;
}

export async function checkBook(bookId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('book_tag')
    .select('id')
    .eq('book_id', bookId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('조회 실패 : ', error.message);
    return false;
  }

  return data !== null;
}

/* 게시물 수정 */
export async function editPost(
  id: string,
  title: string,
  body: string,
  image: string | null = null,
  category: string,
) {
  const post = await supabase
    .from('post')
    .update({ title: title, body: body, image: image, category: category })
    .eq('id', id)
    .select()
    .single();

  return post.data!.id;
}

/* 게시물 삭제 */
export async function deletePost(id: string) {
  await supabase.from('like').delete().eq('reference_id', id);
  await supabase.from('comment').delete().eq('post_id', id);
  await supabase.from('post').delete().eq('id', id);
}

/* 금주의 인기 다이어리 */
export async function fetchPopularDiaries(): Promise<APIDiaryPost[]> {
  const { data, error } = await supabase
    .from('post')
    .select(
      `
      id,
      category,
      like(*),
      book (
        id,
        categoryName,
        title,
        description
      )
    `,
    )
    .eq('category', 'diary')
    .order('created_at', { ascending: false })
    .limit(50); // limit 10 → 50으로 조정

  if (error || !data) {
    console.error('Failed to fetch popular diaries:', error);
    return [];
  }

  // 1. book이 null인 데이터 제거 + 배열일 경우 첫 요소만 추출
  const adapted = data
    .filter((post) => post.book !== null)
    .map((post) => ({
      ...post,
      book: Array.isArray(post.book) ? post.book[0] : post.book,
    })) as APIDiaryPost[];

  // 2. categoryName별로 like 수가 가장 높은 post만 추출
  const topPostsMap = new Map<string, APIDiaryPost>();

  adapted.forEach((post) => {
    const categoryName = (post.book as Book).categoryName ?? 'Unknown';
    const currentTop = topPostsMap.get(categoryName);

    if (
      !currentTop ||
      (post.like?.length ?? 0) > (currentTop.like?.length ?? 0)
    ) {
      topPostsMap.set(categoryName, post);
    }
  });

  const topPosts = Array.from(topPostsMap.values());

  console.log('categoryName별 좋아요 최고 다이어리:', topPosts);

  return topPosts;
}

export async function getBookPost(bookId: string, from: number, to: number) {
  const { data, error } = await supabase
    .from('post')
    .select(
      `
      id,
      title,
      body,
      created_at,
      category,
      user_id,
      profile (
        name,
        image
      )
    `,
    )
    .eq('book_id', bookId)
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) {
    console.error('게시글  가져오기 실패:', error.message);
    return [];
  }
  return data;
}

// 내가 가입한 북클럽 글 가져오기 API
export const fetchMyBookClubPosts = async (userId: string) => {
  // 가입한 북클럽 id 가져오기
  const { data: myClubs, error: clubError } = await supabase
    .from('book_club_member')
    .select('book_club_id')
    .eq('user_id', userId);

  if (clubError) {
    console.error('Error fetching my book clubs:', clubError.message);
    throw clubError;
  }

  const myClubIds = myClubs?.map((row) => row.book_club_id) ?? [];

  if (myClubIds.length === 0) {
    return []; // 가입한 북클럽 없으면 빈 배열 반환
  }

  // 북클럽 글 가져오기
  const { data: posts, error: postError } = await supabase
    .from('post')
    .select('*')
    .eq('category', 'book_club')
    .in('book_club_id', myClubIds)
    .order('created_at', { ascending: false });

  if (postError) {
    console.error('Error fetching posts:', postError.message);
    throw postError;
  }

  console.log('내가 가입한 북클럽의 게시물:', posts);

  return posts;
};
