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
      book(*)
    `,
    )
    .eq('id', id)
    .single();

  return post.data;
}

/* 게시물 생성 */
// export async function createPost(
//   title: string,
//   body: string,
//   image: string | null = null,
//   category: 'diary' | 'community',
//   book_id: string,
//   book:string,
//   book_club_id?: string,
// ) {
//   const post = await supabase
//     .from('post')
//     .insert({
//       title: title,
//       body: body,
//       image: image,
//       category: category,
//       book_id: book_id,
//       book_club_id: book_club_id,
//     })
//     .select()
//     .single();

//   if (book) {
//     await supabase.from('book_tag').insert({
//       book_id: book.id,
//       star: book.star,
//       reference_category: 'newPost.data!.category',
//       reference_id: 'newPost.data!.id',< 여기가 포스트 아이디
//     });
//   }

//   return post.data!.id;
// }

export async function createPost(
  userId: string,
  title: string,
  body: string,
  image: string | null = null,
  category: 'diary' | 'community',
  book_id: string,
  bookInfo: {
    id: string;
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

  // if (bookInfo) {
  //   await supabase.from('book_tag').insert({
  //     book_id: bookInfo.id,
  //     star: bookInfo.star,
  //     reference_category: category,
  //     reference_id: post.data!.id,
  //   });
  // }

  return post.data!.id;
}

/* 게시물 수정 */
export async function editPost(
  id: string,
  title: string,
  body: string,
  image: string | null = null,
  category: string,
  book?: {
    id: string;
    star?: number;
  }[],
) {
  const post = await supabase
    .from('post')
    .update({ title: title, body: body, image: image, category: category })
    .eq('id', id)
    .select()
    .single();

  if (book) {
    for (const b of book) {
      await supabase.from('book_tag').insert({
        book_id: b.id,
        star: b.star,
        reference_category: post.data!.category,
        reference_id: post.data!.id,
      });
    }
  }
}

/* 게시물 삭제 */
export async function deletePost(id: string) {
  await supabase.from('like').delete().eq('post_id', id);
  await supabase.from('comment').delete().eq('post_id', id);
  await supabase.from('book_tag').delete().eq('reference_id', id);
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
