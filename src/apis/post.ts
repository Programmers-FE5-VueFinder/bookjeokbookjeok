import supabase from '../utils/supabase';

/* 전체 게시물 조회 */
export async function fetchPosts(category: string = 'all') {
  switch (category) {
    case 'all': {
      const result = await supabase.from('post').select(
        `id,
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
      );

      return result.data;
    }
    case 'diary': {
      const result = await supabase
        .from('post')
        .select(
          `id,
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
        .eq('category', 'diary');

      return result.data;
    }
    case 'community': {
      const result = await supabase
        .from('post')
        .select(
          `id,
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
        .eq('category', 'community');

      return result.data;
    }
    case 'book_club': {
      const result = await supabase
        .from('post')
        .select(
          `id,
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
        .eq('category', 'book_club');

      return result.data;
    }
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
  category: 'diary' | 'community' | 'book_club',
  book?: {
    id: string;
    star?: number;
  }[],
) {
  const post = await supabase
    .from('post')
    .insert({ title: title, body: body, image: image, category: category })
    .select()
    .single();

  if (book) {
    for (const b of book) {
      await supabase.from('book_tag').insert({
        book_id: b.id,
        star: b.star,
        reference_category: 'newPost.data!.category',
        reference_id: 'newPost.data!.id',
      });
    }
  }

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
